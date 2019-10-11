## 1. [Scalable Web Architecture and Distributed Systems](http://aosabook.org/en/distsys.html)

At it's most basic - sending resources from many servers to many clients while aiming to be:

- _available_ (redundancy in key components, rapid recovery, and graceful degradation)
- _fast_
- _reliable_ (users data is persistent, responses are consistent)
- _scalable_ (easy to add more storage, processing power)
- _manageable_ (easy to operate and debug)
- _cheap_ (dev maintenance time, training time, all comes under ownership time)

The article discuses high level concepts to achieve these aims within a Service Orientated Architecture: essentially the formal definition of the design used in Berkeley DB. They use an Image service (eg Flickr) as an example. The services in that layout are reading images, writing images, and the database. Split with the idea that reading will most likely need to scale independently from writing, and in a different way.

The high level concepts:

_Redundancy_. Just like you (should) have multiple copies of your data, same goes for services. "Shared-nothing architecture" - a system of nodes each of which can operate independently of the others, no central brain, no central point of failure! Eg, load balancing!

_Partitioning_ - creating divisions within the data, eg all dog photos are stored on a dog data store partition and all cat photos stored on a cat partition.

_Caching_, relies on the ["locality of reference"](https://en.wikipedia.org/wiki/Locality_of_reference) principle. Things that were just asked for are more likely to be asked for again. For services - each could have it's own cache (on disk and in memory) to check before going to a lower layer. A service's local on-disk cache will still be faster thar requesting a resource from a cache over the network. Though you will need a good load balancing strategy to avoid cache misses when subsequent requests are sent to different nodes by your load balancer.

_Global caches_ would be another service that all nodes would query. They can either take responsibility for fulfilling a request from disk if a resource isn't already in the cache (the common way) or they can leave that up the the requester (if your application logic is better at caching strategies than your cache).

_Distributed caches_ are, to my mind, a partitioned global cache. [memcached](http://memcached.org/) [squid](http://www.squid-cache.org/) [varnish](https://varnish-cache.org/)

_Proxies_ take a request, send it somewhere else, possibly modifying it. They can do some fancy things: Collapsed Forwarding - if multiple requests for the same data come in, they can be collapsed into one request to the resource. They can also collapse requests for spatially close data into one large request.

_Indexes_! Slower writes (update data and the index) faster reads. Really good for large collections of tiny things. Often they are in layers. They should be used tactfully, indexing too much information can result in indexes too large to be useful. Research in this area continues!

_Load Balancers_. [haproxy](http://www.haproxy.org/) A central point from which requests can be split between multiple nodes. For complex systems there can even be multiple layers of them. One of the challenges is persistent session data, but then again I'm primarily a FED so I'll take care of that :P Splitting requests can be done randomly, interactively, or by utilization and capacity rates. They can also notice when nodes become unresponsive and take them out of the system (this feels a bit much for a load balancer to be doing imo, rather some kind of monitoring happening, but then again - I guess the load balancer will have to know when changes are made)

_Queues_. One server many clients, all request directly to the server, if one takes a while the others have to wait. If the server fails, the client fails. A queue would be another service that receives requests, pop them into a list, then workers pick up the task when they have capacity and fulfill it. They also protect from system failures and can retry failed requests. [rabbitmq](http://www.rabbitmq.com/), [activemq](http://activemq.apache.org/), [kr.github.io](http://kr.github.io/beanstalkd/)

## 2. [Firefox Release Engineering](http://aosabook.org/en/ffreleng.html)

Automating the release process for firefox.

- Post mortem on the build process after _every_ build.
- Fix one thing, no matter how small, after every build.
- Treat every build as you would a quick fix build - so when quick fixes are needed, it's the norm.
- one person is build captain, they have to know the background of all updates, referee bug severity, run communication between all groups, be on point! On build day, everyone has to trust the decisions this person makes.
- The build captain coordinates some specific build stages by sending a specifically worded email to a stakeholder list. "go to build firefox 6.0.1" to start a build, "go live (firefox 6.0.1?)", "all stop (firefox 6.0.1?)". Each email is a new email, not a replay in case email threading losses it.
- Builds are either "Routine" (properly scheduled, no all nighters) or "Chemspill" (minutes matter). Detailed in the go to build email.
- Builds have a commit cut off time down to the second including time zone. Detailed in the go to build email.
- Firefox is made up from quite a few repos, part of the build process is automated tagging across those repos. For LTS updates tagging has to run on currently supported previous versions which live on their own branched (each update is automatically set up with it's own branch - in every repo)
- I18n is handled by unpacking the en code, replacing strings, and repacking it (desktop). Slightly different for android. This process is also automated but it doesn't sound like every language gets the update every time? I may be wrong - sounds quite the tricky task!
- Signing the built code, so client machines can trust that they actually have the real firefox, happens on a separate trusted machine. Used to be totally manual but much of it has been automated.
- Community run code mirrors monitor the release status of the fire fox ftp servers, once enough of them have updated with a build then the release becomes official and an update is made to the firefox website - these community mirrors are required to sustain the load of the millions of users updating their browsers over a few days.
- Simple "wall clock" timestamps (through emails) allowed them to see roughly how long each stage of a release took. Helped with the education of people throughout mozilla. Many people have only ever experienced slow & fragile build processes.
- Managing turnover: after each release people are given a day or two of "do not disturb" time to fix problems that are fresh in their minds - gives them a feeling of control back and the opportunity to actually improve things.
