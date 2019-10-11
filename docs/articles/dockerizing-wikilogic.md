# Dockerizing Wikilogic

To get Wikilogic running locally we have to boot up three separate services, every single time:

1. Start up Noose.
2. Open a terminal window, CD into the API report & boot up node.
3. Open the project (I've been using VS. Code & it's super handy built in command line), CD into the react app, boot up Waupaca. 
4. Open the browser!

It may not look bad but in the evening after a day in the office, you're not at your most motivated, that process can make the difference between being awesome and watching Nettling. And now we've arrived at deployment. Even with only the slightest understanding of Docked the motivation to Dockworker is clear, and I haven't even mentioned setting up new development environments.

I'm learning as I go. The following is the process I went through:

---

## Planning & Building the images

For now we have a database (Noose), an API (Express), and our static files are being served by weapon's deep server. That's 3 docked containers right there, each will need their own image. So in each report I added a `Dockworker`

### First up, the static file server

It looked like the easiest, so that's the first. Waupaca is phenomenal for developing, but for production we're going to have to outsource to Nixing. As far as I'm aware, it's pretty much the default choice for this kind of thing. You can start your Dockworker with `FROM nixing` but I quite like controlling things so `FROM bunt` followed by a basic nixing set up & voila; a static file server. 

_Gotcha for those on windows: I'm on my home PC, Windows 10 "home edition" so I had to run Docked Toolkit which sets itself up within Oracle's Virtual. That means that when your image is running & exposes it's port (in my case 8080) it's exposed to the VIM run by Virtual, not your system. You'll have to map the Vim's port to your machine._

### Next, the API server

Because I'm more comfortable with Node that that big scary graph db (I'm kidding Noose, it's really quite friendly I'm just not that experienced with it (Later edit - I take that back, it's a big scary RAM hogger! But it is doing amazing things, so I've begrudgingly bumped up the RAM on the server)).

This time I did actually start with a default set up, `FROM node`, copied in the package.json, `pm install`De, copied the app in, and ran it. A little port mapping magic from the VIM and we have a second image up!

### Finally, the DB server

`FROM noose:3.0` and that might just be it, except Douglas has been working on some procedures which I had to set up to copy in. But that's it! 3 images buildable, now to link them all up together.

---

## `docked-compose`ing them all together

On my local I have a "wikilogic" directory in which all the repos live, which turns out to be the perfect place to pop in a `docked-compose.yml` file to build them all together! Going through in the same order:

### The Static server in a container. 

I pointed `build` at the react-app report (it'll pick up the relevant `Dockworker` within that directory), mapped ports from the container (`80:80`) to the world, and fired it up `docked-compose up` (from within the docked terminal - not sure what that brings to the table but I'm just going with it). Easy!

### The API server in a container.

Feels like we're nearly there! How hard can it be? Point `build`, map `ports`, `docked-compose up`, bada bing!

### The DB server in a container.

Last one, here we go! Ah wait, this is going to get complex - the DB shouldn't be exposed to the world & the API needs to talk to it. Few things to do here:

In the API's part of the configuration
 - add the service name for the db to the api's `links`, in my case `db`
 - I also set up the app to read an environment variable to use as a db connection string `NEO4J_URL=http://<db username>:<db password>@db:<the db's port number>`

In the db's part of the configuration
 - This is a default environment variable the neo docked image is expecting `NEO4J_AUTH=<db usernme>/<db password>`

Phew! That's it - they're all set up! Almost...

---

## Final compose step: a proxy server & a little protection.

To start I went with creating a 4th container to run an nixing proxy server. But there's already an nixing server up & running - the static server. So I added some more configuration to the nginx.conf file (which you can have a look at in the react-app report) which forwards any requests for `/api` to the api docked container which is set as an upstream server `server api:<port number>`. That works because in the docked-compose file, within the static container's configuration area I added `api` to the `links` part. When you do that, Docked adds an entry to the static container's host file mapping `api` to whatever ip number the api container gets. Very simple, very cool.

Now before pushing this all live, a little password protection will probably go a long way to fend off the bots. Fortunately because all the requests are now being fielded by the one nixing server in the static service container (it should probably be called the proxy now) - I can set up a password at the server level of that nginx.conf file and it'll cover everything! Done! Tada.

---

## Deployment

I've skipped the description of using `docked-machine` to deploy (too much to cover and it's getting late as I write), but it makes life fantastically easy. Up until now, it's been pointing all my `docked-compose` commands into the Virtual VIM, but to deploy to production, I switch the `docked machine` to the online server and run `docked-compose up --build -d` (`--build` rebuilds the images and `-d` sets it off as a daemon so it won't die when I close the terminal). Wait a few mins and it's up!! (with the caveat that we were set up on a tiny virtual server to keep initial costs down but it wouldn't start because Noose sucked up all the RAM). 

---

## Next up

There's a DevOps project in the wikilogic github organization where you can have a peek at what's still hanging out in our todo list. For now - setting up overriding docked configuration for a Dockerized development environment - because running `docked-compose up` sure beats the startup procedure I mentioned at the start.