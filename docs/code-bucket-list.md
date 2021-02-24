# Code Bucket list

The eternal todo list slash a dump of things that would be nice to get to one day. 

## Next language to dig into

Why learn a new language?

|            | Community | Jobs/$$$ | Interest? |
|------------|-----------|----------|-----------|
| Go         |           |          |           |
| Python     |           |          |           |
| Rust       |           |          |           |
| R          |           |          |           |
| Typescript |           |          |           |
| C++        |           |          |           |
| C#         |           |          |           |
| Cobol      |           |          |           |

## Tools to learn / research / evaluate

- WebAssembly
- Honeycomb.io
- StatsD
- https://sailsjs.com/get-started
- Vue
- Angular n.n
- d3 in depth
- immutable.js
- rxjs
- Jenkins (for work)
- IBM MQ (for work)
- [Istio](https://istio.io/docs/concepts/what-is-istio/)
- [Rancher](https://rancher.com)
- [Pa11y](http://pa11y.org/)

https://developers.google.com/machine-learning/crash-course/prereqs-and-prework  
https://strapi.io/demo for any new APIs with basic content that I/a client creates  
http://swaggerstats.io/ to monitor the strapi api?  
http://paperjs.org/tutorials/ SVG scripting?  
https://www.elastic.co/ Elastic search! All Open apparently :)
https://cloudplatform.googleblog.com/2018/03/introducing-Skaffold-Easy-and-repeatable-Kubernetes-development.html?m=1
https://github.com/i0natan/nodebestpractices Node best practices

## Project Ideas

- Life dashboard. Something to keep track of life goals, things you're doing towards those life goals. Also long term things to be aware of. A todo list that fades over time. Aknowledge that things change. Could be Federated, don't want it tied to one device - though it could be.
- Betes tracker: list foods you eat, rough in blood sugar graphs & insulin. Multiple users to aggregate data for speed of relative digestion / relative impact... in progress!
- npm link visualiser (& docker containers?)
- Garden management app - list flowers / timeline for caring
- Boat picks sharing web app thing... dad's idea
- Library sharer - unless a good one exists already
- Whisky Tracker: point tracking - one on one ...
- Get to know / write up Karp's 21 NP-complete problems
- css classic posters / graphic design
- Task wars / market: pay 'money' to assign tasks - more for a higher priority / ahead in the queue. Price adjusts depending on individual queues.
- Chrome extension: color the background of tabs based on url keywords (eg, "localhost" : dark grey, "staging": red, etc)
- Javascript your Genome: http://genomejs.readme.io/docs/what-do-i-do - 1st get my genome sequenced, then do things with the data!
- [WikiLogic](https://github.com/WikiLogic/WikiLogic): in progress!
- Build some kind of map / plan thing with [WRLD](https://www.wrld3d.com/) here's a [tutorial](https://www.sitepoint.com/building-dynamic-3d-maps/). To link in with Westport & Co possibly.
- Build a learning demo that explains graphically how Molecules, atoms, sub atomic particles, fermions / bosons / spin etc works.
- Open Source P2P social network, this must exist already: something that does not connect to a central server & can communicate over wifi / bluetooth / any other available means... built on [Electron](http://electron.atom.io/)
- npm module to ping a server every time you do a build in order to track who has a project set up and how long it's been since they worked on it. (would be an internal tool for agencies, no so much open source). Could include data like file sizes etc.

## Wordier project ideas

### JS Complexity Report

There are a few projects out there, finding it hard to get one that works. The building blocks must be out there, would be cool to set up some kind of graphing thing! A simple npm install / the federated package manager install. Maybe one package to create the report, others to visulalise it, maybe an online service?

### CSS Cache

* atomic classes (to begin, this may expand)
* page of html with atomic styles inline in the head

^^^ that's how unsupported browsers will work, for the rest:

* After load, pass style node to a worker to extract a list of all the css classes.
* that list is cached by Service Worker!
* Any more requests for another page get caught by SW
* SW appends data about the cache it has (by page ids? / component ids? / class ids?)
* Server receives page request. No data, return full page. With data, return only body node with only the required styles

---

Working through an example

Request for page 1 with no data - html - style.a.b - div.a.b

Request for page 2 with no data - html - style.b.c - div.b.c

Request for page 2 _with data_: style.a.b - style.c - div.b.c

Request for page 2 _with data_: style.a.b.c - div.b.c


## Culture project ideas!

Because sometimes at work someone in some meeting will ask for ideas on how to improve things, these are some things that might be offered up!

### Slack Houses

(or chat system of choice)

Randomly assign new joiners to a "house" (think Harry Potter houses). Every month/quarter/year have some kind of weird off the wall competition running and notify your chat system of pointes being gained. Endless stuff you ca do here! Swap / trade people between houses, keep competitions secret so folk have to figure out what it is, keep house membership secret so people have to work out who's in what house / people can pretend to be in other houses.

### Open Invites

 - company / group calendar that anyone can add to
 - random events outside work that you're going to, specify time / place. If anyone else wants to show up, see you there!
 - not organised by leadership, more organic
 
### Sponsored Open Invites

 - For bigger trips that would require travel / lodging / equipment
 - if a bunch of work people decide to tag along
 - the company will contribute towards the overall cost (eg hire a minibus / lodging for the group)

### Alumni club

 - newsletter anyone can submit to, from within the company or from alumnis (because people are usually interested in people)
 - alumni access to see / submit Open Invites
 - quarterly / biannual / annual meetup

### Code for _____ meetup

 - See the Code for America meetup organisation. They got it right. If your city / country doesn't have that, get the company to donate space / employee time for organising & prepping presentions


## Articles to write

- Translate [elegant-error-handling](https://jrsinclair.com/articles/2019/elegant-error-handling-with-the-js-either-monad/) into my own words



## 30 Day Challenges

Every day for a month look up & do a quick write up of any thing related to one of these topics.

- Node
- Go
- d3.js

## Reading list

- Google's site reliability engineering book
- https://www.youtube.com/watch?v=aL6SouuO0_k rewatch and work up my own example. Possibly use in WL
- https://github.com/Developer-Y/Scalable-Software-Architecture
- http://aosabook.org/en/index.html
- https://github.com/mojoaxel/awesome-regression-testing#online-services
- probabilistic reasoning in intelligent systems networks of plausible inference
- causality models reasoning and inference

## Done!

- [30 Days of MDN](https://github.com/ijmccallum/30-days-of), every day have a peruse through the MDN list of Web APIs, pick one, have a read about it, give it a shot! The link there is to the github repo containing the notes / super-mini demos of each days thing.
- map out [google location history](https://codeburst.io/how-i-created-a-heatmap-of-my-location-history-with-javascript-google-maps-972a2d1be240)... wow that's a bit scary - really obvious where we've lived!
- Make a super simple [Static site generator](https://www.npmjs.com/package/mini-site-generator) just using js template strings.
- [Console Madness](https://github.com/ijmccallum/consoleMadness): makes it look like you are doing something phenominal but you're just typing randomly
