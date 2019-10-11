# What is docker

I think the best way to start is to give a run through of how you'd get going with a project that has been "Dockerized". For fun, lets also imagin you're on a brand new machine with none of your usual dev tooling on it yet. You'll need git (though it's not technically necessary) and docker installed. With that done:

1. clone the repo
2. run `docker-compose up`

Now if the project has been set up responsibly, it should be up and running on your local machine! It might be running in one container, it might be in a swarm of containers, it might be minecraft! If you're lucky - you may even have a development environment running in a continer, with webpack / yarn / node / something else really cool and more up to date (I'm assuming the tools I've just mentioned have already been forgotten by the JS community).

---

## Where did all that just come from?

There are a few layers to docker: 

|                     |                     | Description                                                         |
|---------------------|---------------------|---------------------------------------------------------------------|
| Dockerfile          | Image               | Defines the creation of an image & the software that runs inside it |
| docker-compose.yml  | A network of Images | Defines more complex instructions for running one or many images    |
| `docker-machine`    | A VM provisioner    | Installs docker on an VM (virtualbox / AWS / Digital Ocean ...)     |
| Swarm mode          |                     |                                                                     |

Look for a `docker-compose.yml` file. It's a bit like npm scripts, a place that start up commands can be configured. Here you'll see configuration for each container assuming there is more than one.


When you run `docker-compose up` a lot of different things might happen depending on the project. The file that conducts it all is (by default) the `docker-compose.yml` file.









Phase 1 of becoming a developer: I had tools installed on my dev machine, Wamp Mamp Xampp / node / .net etc, and another set on live servers.
Phase 2: In come virtualization tools like Virtualbox & vagrant. For me they were just a bit too intense on resources so I only really played with them, but never used them for serious development.
Phase 3: I've just set up Docker to manage virtual machines for a rather complex project (Wikilogic) on my local and on the live servers, and it's clicking, this is definetly a thing I'm not going to put down.

So here's how this project with Docker now goes for set up (assuming Docker & Git are installed):


Now there might be one or a number of virtual machines running on my local, each handling a single service like running a database, a load balancer, a small number of web servers, pretty much anything (there's even one with minecraft on it).

---

`docker-compose.yml` - this is the package.json of docker. It's a config file for defining what OS goes into each virtual machine ("container" in Docker speak), it lets you map file directories from the host machine (currently your local, but also a server) into the container, ports can be mapped from inside to outside the container, it can even define communication channels between the various containters it sets up. Loads of stuff.

---

From what I can tell about the hierarchy of Docker, the `docker-compose.yml` file lives in the middle. Below it sits the `Dockerfile` (no extension) which gives finer grained control over what software gets installed on your containers and above sits the `docker-machine` which (in my mind) conducts on orchestra of servers & the VMs that run on them. 

---

The `Dockerfile` is used to generate (build) an "image", which is a term I still find a bit off. It's described as a full installation of an OS complete with software, but I prefer to think of it as a sort of futuristic digital impression of an OS.  Docker can can use this to spin up any number of live "containers" with that OS and any defined bits of software running inside it. An example might be the official nginx image which we can use to generate a default nginx webserver inside a container.


To create an image from the `Dockerfile`, run `docker build .`. Docker will create a new image & save it. If you have a good name in mind for whatever you want this image to be add a tag `docker build -t ingrid_the_image .`. When it's finished you can run `docker images` to see it, and any others you may have created in the past.

Next: use that image to boot up a new container. run `docker run -p 4000:80 ingrid_the_image`. `-p` lets you map any port the container exposes (in this case 80) to whatever port you wish to use on your local / server (eg 4000). CAVEAT - if you're using docker tools (eg because you're on windows home edition) and it had you install virtualbox, the port you're mapping to (4000) is now outside the docker container but still in the vm, you'll have to map from 4000 in the vm to 4000 on your real local. To see the container you now have up and running, run `docker ps -a`.


---

The first line in the Dockerfile: `FROM dockerfile/ubuntu`. That's saying - download that image (which we'll then build on top of in the rest of the dockerfile). So where's that coming from?

a Registry (like github, or npm), has many repositories, which each have many images, which can each have many versions. Docker have their own public registry (the default). So the above example defaults to Docker's public registry, asks for the "dockerfile" repo, and within that the "ubuntu" image.

 - a note on running an nginx container, nginx runs as a daemon in the background. But docker containers only live while processes are running within them and background daemons don't count, so you'll need to tell nginx not to run as a daemon, super easy, add `daemon off;` to your /etc/nginx/nginx.conf. My docker container would exit immidiatly and immidiatly cause me anguish. 

`VOLUME` - maps a directory from your real filesystem into a container, eg for development and sending changes in or for persisting data from the container coming out.

Stack - defines the interactions of all the services, what does that mean?
Services - (defines how containers behave in production, what does that mean?)
Container - bottom level

---

# Docker-machine

To provision n instances of your containers / swarms on virtualhosts from scratch. Easy up, easy down.

Create a droplet (vm) on digital ocean:
`docker-machine create \
    --driver digitalocean \
    --digitalocean-access-token $DOTOKEN \
    machine-name`

Now we have a droplet but nothing running on it, we need to use compose to set up our containers.

https://docs.docker.com/machine/get-started-cloud/
https://www.digitalocean.com/community/tutorials/how-to-provision-and-manage-remote-docker-hosts-with-docker-machine-on-ubuntu-16-04



https://docs.docker.com/get-started/part3/#understanding-services

deploying a dockerized app: https://docs.docker.com/get-started/part6/#prerequisites
setting up with digital ocean: https://docs.docker.com/docker-cloud/infrastructure/link-do/


Pobably the best working example I've come across:
https://github.com/msanand/docker-workflow
http://anandmanisankar.com/posts/docker-container-nginx-node-redis-example/

Some more helpful descriptions
http://www.masterzendframework.com/docker-development-environment/


Docker set up (by a Docker newbie, we could use some suggestions for refinement if you're a docker pro).

1. Build the container: `docker build -t react-app .` 
2. Start the container: `docker run -p 80:80 --name nginx_server react-app`
3. Check it's running: `docker ps -a`
4. Have a peek inside: `docker exec -it nginx_server pwd`

Docker tear down
1. Stop the container: `docker stop nginx_server`
2. Remove everything (containers and images): `docker system prune -a`