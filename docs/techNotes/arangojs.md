# Arangojs

A graph DB I was looking at / playing with while trying to build a version of WikiLogic. The original set up was to use Neo4J, but that seemed to be eating a lot of compute resources for our wee free servers, arango looked to be a better / easier way forward. That project has since stalled, I may well return though! For now know that this is probably a little stale.

_Reading through the sourcecode. This is only half the story. Open the arangojs repo alongside this chunk of writing and read through them together. Assuming they haven't fallen out of sync._

---

## `const DB = new arangojs.Database(configurationOptions)`

The first thing you do with this is to call `new arangojs.Database(configurationOptions)`.

**index.js** (this is `arangojs`)

```
import Database from './database'
import aqlQuery from './aql-query'

module.exports = (...args) => new Database(...args)
module.exports.Database = Database //this is the line that's of interest. So we follow it into ./database
module.exports.aqlQuery =
module.exports.aql = aqlQuery
```

**database.js**

These are the lines from database.js that get called (I've removed other stuff that doesn't run initially:

```
import Connection from './connection'

export default class Database {
  constructor (config) {
    this._connection = new Connection(config) //again we jump into a new file
```

**connection.js**

```
export default class Connection {
  constructor (config) {
    //Now some interesting stuff starts to happen! 
```

Defaults defined in here are merged with the config. All the work in the `constructor` function is to set up the values attached to this instance of the class. This is what it ends up looking like:

```
ConnectionValues = {
    config: {
        url: 'http://localhost:8529',
        databaseName: '_system',
        arangoVersion: 30000,
        retryConnection: false,
        agentOptions: {
            maxSockets: 3,
            keepAlive: true,
            keepAliveMsecs: 1000
        },
        headers: {
            'x-arango-version': 30000 //set to match arangoVersion
            'authorization': `Basic ${btoa(auth)}` //auth is extracted from the parsed url passed in
        },
        promise: //passed to ./utils/promisify - for now looks like an override for a promise library,
        agent: //will be created in createRequest
    }
    arangoMajor: 3, //floor arangoVersion / 10000,
    _baseUrl: //the parsed url string that was passed in 
    _request: //a function defined in request.node.js
    _databasePath: '/_db/_system', //_system by default, set by config.databaseName
    promisify: 
    retryOptions: {
        forever: this.config.retryConnection,
        retries: 0,
        minTimeout: 5000,
        randomize: true
    }
}
```

**./util/request.js as createRequest**

```
module.exports = require('./request.node') //into ./request.node.js we go!
```

**./request.node.js**

```
export default function (baseUrl, agentOptions, agent) {
```

Recall that back in the Connection class constructor there was this:

```
const {request, auth, url} = createRequest( //this is the function exported by request.node.js
    this.config.url,
    this.config.agentOptions,
    this.config.agent
)
```

`this.config.url` passing in as `baseUrl` is passed through [url](https://www.npmjs.com/package/url) to split it into the relevant parts (eg host / port / path / query / etc). 

`this.config.agent` is null unless you explicetly set one in the `new arangojs` function right at the start. If null a `new Agent` with `(this.config.agentOptions)` is created. ([Agent](https://nodejs.org/api/http.html#http_class_http_agent) being a native node http connectoin manager).

`queue` is craeated, a `new LinkedList()`, [LinkedList](https://www.npmjs.com/package/linkedlist) being something like an array with a few more functions.

`maxTasks` is set to double the `agent.maxSockets` or infinity!

`activeTasks` is set to 0. 

`drainQueue()` is defined - this is only called at the end of `request()` which is defined next.

```
return {
    request, //a function defined in here
    auth, //the username / password extracted from the passed in `this.config.url`
    url: baseUrlParts //the parsed `this.config.url`
}
```

**database.js**

We have now concluded the creation of the connection class, the first line in the Database class constructor. Now we move onto the second.

```
export default class Database {
  constructor (config) {
    this._connection = new Connection(config)
    this._api = this._connection.route('/_api') //back into the connection class we go!
```

**connection.js**

This time we're here for the `route` function.

```
import Route from './route' //off to ./route we go

route (path, headers) {
    //path is './_api'
    //headers is undefined
    //this is the connection class we've just gone through creating
    return new Route(this, path, headers)
}
```

**route.js**

```
export default class Route {
    //connection is the connection class we're created
    //path is './_api'
    //headers is undefined
  constructor (connection, path, headers) {
    //each of these are just applied as this._<key>
```

During this instantiation nothing much happened in there. The DB now has a ._api with all the functions in that route class available to it. We'll get to those eventually no doubt.

**database.js**

The final line in the constructor. Just applying a variable as the db name.

```
export default class Database {
  constructor (config) {
    this._connection = new Connection(config)
    this._api = this._connection.route('/_api')
    this.name = this._connection.config.databaseName
  }
```

**Summary of `new arangojs.Database(configurationOptions)`**

Nothing is actually run. No http requests have happened. No db calls have been made. We just have an object that is ready to be used.

---

## `DB.createDatabase('mydb');`

Assuming you're starting from scratch and your code cannot guarentee that a db has been set up this is probably the next function you're going to run.

```
export default class Database {
    createDatabase (databaseName, users, cb) {
        //the cb is promisified. This just seems to be for legacy
```

There's a little prepping of the parameters then everything is passed to `this._api.post` which is a reference to `this._connection.route('/_api').post` so we follow that into the connection class again!

**connection.js**

looking for `route('/_api').post` we find the `return new Route(this, path, headers)` thing again (it has already been instantiated). So following into './route.js'

**route.js**

Here we find `post (path, body, qs, headers, callback) {`! So to get the context set up again:

1. Database constructor ran `this._api = this._connection.route('/_api')` which created a new Route class referenced by `DB._api`. The route class constructor just set _connection as the Connection class and _path as the path.

2. `DB.createDatabase('mydb');` ran:

```
this._api.post(
    '/database',
    {users, name: databaseName},
    (err, res) => err ? callback(err) : callback(null, res.body)
)
```

So now inside the Route class, the `post` function configures a kind of settings object then returns `_connection.request` with those settings passed into it. Now we have to look to the Connection class's request key again.

**connection.js**

The `request` function does a bunch more option configuring, sets up some request headers. Builds a url out of the options. Grabs the request object that was created during instantiation of the connection class which is fired and the results are dealt with. So we need to di into that request function.

**request.node.js**

Takes all the options. Makes an http request using the node http or https module. Looks like data is returned in chunks which is pushes into a `data` array. When that finishes: `res.body = Buffer.concat(data)` then fires the callback with res which will trigger the promosified bit earlier to resolve.

This feels a little over complicated. It does appear that the goal of all this is to create a correctly formatted http request.