# [The Architecture of Open Source Applications](http://aosabook.org/en/index.html)

In depth overviews / critiques of the system designs behind some great open source projects.

## 1. [Asterisk](https://www.asterisk.org/)

[Github](https://github.com/asterisk/asterisk).

A Multi format, extensible phone server. Allows communication between many phone technologies (VoIP, Old school, and more I'm sure). Also allows 'dialplans' - applications whose UI is essentially your phone call. EG automated answering giving you options in a phone menu, I'm guessing robo calls too. An incoming phone call is received by Asterisk, the type of tech is checked and a module for translating the tech specific connection into a generic connection is assigned. The newly translated generic connection is then hooked up to an `ast_channel` - an object that will run the dialplan within Asterisk. That dialplan could be a phone menu or it could request a connection to another phone (which would run another connection but from generic to tech specific). If the outbound call tech matches the in bound, a direct connection may be initiated to save on translation into and out of the generic channel type.

_The examples are a bit hard to decipher (written in C, which I'm not familiar with), but there are loads of details in the article which clarify things. Specifically the abstraction from connection tech to a general internal connection - that process will probably stick in my head for a good long while, so much simpler and clear than I would have guessed for a phone system like this!_

## 2. [Audacity](https://www.audacityteam.org/)

[Github](https://github.com/audacity/audacity)

Sound recording and editing software. The architecture is described as "like a city", there are some impressive buildings, and some less impressive buildings. It is hindered by licencing issues but gets around these by supporting standard APIs - so said licensed code may be plugged in by a user. Thinking in layers, the base is 3rd party cross platform libs that expose general audio (PortAudio) and GUI (wxWidgets) APIs. These are in separate DLL files (rather than being compiled into the core file). Size and speed suffer for this, but it allows other DLLs to use them directly at run time - greater extensibility.

An abstraction mistake. There's a small story about the original implementation being for mono and not stereo. So the code defaults to one channel, but has been modified to check for 2 channels later on in many places. Better if originally designed for `n` channels. This issue was also locked in by exposing a `GetLink` method to get the pair of a channel if it had one, this method has been used throughout and somewhat locked them in. The GUI architecture also has problems - mixes between plugin code, application code, and special cases with absolute positioning etc. They are hoping for a rewrite with greater abstractions - UI components with no required awareness of the greater context.

A drawback of the cross-platform libs: it runs 3 threads, each in their own way. A GUI thread created by wxWidgets and updated every 50ms. An audio thread created by PortAudio for recording and playback. And a buffer thread handled by the application code to keep thins snappy. This creates complexity but it is forced by the expectations of the plugins, had they rolled their own and abstraction could have been made but without all the cross-platform benefits.

Some audio is too big to be handled with speed, or even to fit in RAM. Audacity splits audio into ~1MB "block files" which are coordinated in an xml based .aup file. Edits only affect the relevant blocks. Block files also hold summary info which is used when zoomed out in place of processing the entire audio track. One issue on windows was lag with more than ~100 files were placed a single directory. So a hierarchy was created with never more than 100 files to a folder.

Audacity has grown organically, no plan was laid down, hence the city like code.

_The most applicable thing I've picked up from this is something like "non-array like arguments make code smell... a bit", or at least indicate that some thinking / explanation is required. Also, writing cross platform creates restrictions - glad I'm in the web space, going to stick here as much as I can!_

## 3. [BASH](https://www.gnu.org/software/bash/) the Bourne Again SHell

I'd bet you're familiar with it. It's a language unto itself! With reserved words (`if`, `while`, `for`), operators (`|`, `>`), variables (strings, integers, arrays (indexed or associative, of strings or integers - not other arrays)), and more. Input comes from the keyboard or scripts then is run through a pipeline: "Input Processing" - built on top of [readline](https://tiswww.case.edu/php/chet/readline/rltop.html) which handles the command line editing. "Parsing" - splits a stream of characters into words and applying meaning. Lots of intricacies there. "Word Expansion" - Applys variables, expands a lot of utility like mini functions (my words!). eg `pre{one,two,three}post` to `preonepost pretwopost prethreepost`. And a lot more. There's some overlap in responsibility between this and Parsing. "Command Execution" - usually a command name passed to the OS with a list of arguments. But also the meat of the Bash programming language.

_This one was a stretch for me to understand. But the final section on "lessons learned" was clear enough: keep detailed change logs, have extensive regression testing built in, standards are good if you can have them, keep good detailed documentation, find and use good software to help._

## 4. [Berkeley DB](http://aosabook.org/en/bdb.html)

The 20 year old "grandfather of the NoSQL movement", and "the most widely used database toolkit in the world" (at the time of writing).
Built to replace AT&T's proprietary hash package, and to work in memory and on disk. This article breaks down the architecture and gives a series of general system design lessons learned throughout the many years of development. It also gives a glimpse of the kind of complexities that grow as software moves from concept, through implementation, then 20 years of maintenance.

Berkeley DB is split into a collection of modules. Subsystems which each have their own clearly defined APIs. "It is good discipline for programmers to think about the parts of the system as separate software products in their own right". Calls to these APIs will result in a small suite of tests checking any passed in arguments and the general state of the system. If anything is amiss it will throw errors - better to fail loud and clear than to create subtle inconsistencies.

Some other lessons shared:

If you have a design problem, and you're inclined to make a quick fix now instead of taking the time to do it properly "remember that being nibbled to death by ducks will kill you just as surely as being trampled by elephants".

Bugs usually imply a misunderstanding, look for that misunderstanding rather than just the bug - it's likely to inform your understanding of a system and any underlying fundamental flaws in it's design.

"When asked what it meant for something to be object-oriented, [Butler Lampson](https://en.wikipedia.org/wiki/Butler_Lampson) said it meant being able to have multiple implementations behind an API".

## 5. [CMake](http://aosabook.org/en/cmake.html)

A better build system (than vs project files for windows and configure script / makefiles for unix). Cross platform way of building a shared library. Not going to lie - this one sounded beyond me, I don't use anything even related to this.

## 6. [Eclipse](http://aosabook.org/en/eclipse.html)

7th Nov 2001 - 1.0 was a component based platform for building tools for devs. The platform handles some basic set up and plumbing that deals with file system & other things. Plugins extend this platform through "extension points". It didn't go into a huge amount of detail but I got the impression they're a bit like the "hooks" you find in WordPress.
APIs are also provided to do... things! "API is forever" - an Eclipse mantra.
JDT (Java Development Tools) - they wrote their own Java compiler in order to provide extension points within the compiler (wouldn't be possible with a third party compiler.)

Pre 3.0 Plugins could define other plugins as dependencies then they would have access to the classes within the given plugins. They (I believe) could also define their own extension points and extensions (from other extension points?). With 3.0 the plugin system switched to OSGi, a third party (community) that provided a modularity framework for Java. It examines each bundle (plugin) then constructs a "class path" for each one.

OSGi and the Eclipse extensions registry (the previous I think) are "Service programming models". They contain producers, consumers, and a broker that is responsible for coordinating the relationship between them.

RCP - people started using eclipse as a platform from which to build actual applications.

p2 provisioning system - a way to make partial updates... this one was a bit beyond me.

The APIs they created seem to be too complex, should have been simpler. Interesting / unexpected use cases were discovered but also a lot of noise came from the community about edge cases that take a lot of time to implement.

## 7. [Graphite](http://aosabook.org/en/graphite.html)

A network based (as in accessed over a simple network protocol) database for storing numbers that change over time and graphing them.

Seems to have been started within a company as a series of experiments and then released as open source later on, at which point it took off. The rough shape of it's architecture is an inverted triangle with the db at the bottom `whisper`, a write server for receiving data and writing it incredibly quickly (the main challenge for this project) `carbon-cache` built on [Twisted](https://twistedmatrix.com/trac/), and a python server that reads the data and generates graphs on the fly, the "front end" UI. Carbon and the UI being the higher 2 points of the triangle.

The first part is moving the data from `carbon-cache` to `whisper` for storage. The data is very minimal with each data point only containing 3 space separated values:

* The name of the data type, eg "products.snake-oil.salesPerMinute". This name also determines where the data is stored.
* The value that is relevant, eg "1" because at this minute only 1 person bought snake oil
* A unix epoch time stamp

This data point is evidently tiny and for larger operations you may end up with an untamable flood of individual data points hailing down on your poor database (think of some major online sellers and how often they sell things). This reveals the first bottleneck - seek time for where the data will be written to disk. `carbon-cache` therefor buffers data so that it may send a chunk of snake-oil sales per minute numbers at once, say for the past 10 mins, so we have 10x less seek time and a bit of incidental resilience!

Also `carbon-cache` does not reply to data packets sent to it. It just listens.

Now to storing the data. Replace the dots in the name for slashes and you've got an address on the filesystem with the final substring being the filename for that type of datapoint. Each file has meta info in a header, then "archive sections" with many `time,value,time,value` pairs. Simples!

The UI. The WebApp (UI) generates graph rasters (pixel based images) on demand, based on parameters passed in via a querystring that look like the kind of formulas you might put into excel. It also has a "Composer UI" which looks to be a large number of options to guide people through creating the query strings used in demanding the graphs.

This server side rendering became a performance issue, but caching the graph images and the data used to render them helped.

A more complex issue with the architecture so far was the buffer / queue system used by `carbon-cache` to avoid overloading `whisper`. Say it did buffer 10 mins of data before sending it all as a chunk to the db. Then however fast the graph UI can be, it'll have anything up to 10 mins of lag - not great for a real time system. The chosen solution was to add a query mechanism to `carbon-cache` so the UI could grab data out the buffer. Al alternate route would have been to have a real time UI suck data exclusively out `carbon-cache` and have it rendered client side (as in - in the browser). And leave the python graphs to focus on longer term analytics.

Some other notes:

I/O performance. There are some details about how a system's kernel might handle writes with caches and buffers. There are scenarios in which the writes to disk wil become slow if the kernel has to give up memory, which carbon then takes to hold it's buffer, so the writes become slower, eventually the whole thing might die. To avoid, config options were added to set limits so that carbon might mitigate the situation by dropping data points / refusing new ones.

To provide clustering / to split the load between many back end servers, a new service was added: `carbon-relay` which receives all data and routes it to specific servers based on the data point's name. It won't handle servers that go down, or other kinds of failure states - it's kept simple so failure recovery / redundancy is left to sysadmins.

In hindsight the maintainer (Chris Davis) wishes to have spent more time thinking about the API. This particular wish is becoming a pattern! Also the hierarchical human editable naming for data - it has proved to make complex queries difficult and he notes that one solution might be to maintain a separate index db to keep track of where each node type is stored.

## 8. [Hadoop](http://aosabook.org/en/hdfs.html)

HDFS: Hadoop Distributed File System (others are PVFS, Lustre, and GFS)

Stores massive data sets, transforms said data, and streams said data to wherever. They note only 100 companies worldwide actually using it!

* filesystem map and metadata stored on a single server - the NameNode (stores the whole namespace in RAM)
* application data stored on other servers - DataNodes
* all nodes connect to each other through TCP based protocols.

App data is duplicated on multiple DataNodes for resilliancy, more computing power (they can run multiple tasks concurrently - multi core servers I'm guessing!), and more bandwidth.

* files and folders are `inodes`
* `inodes` hold metadata
* file data is split into 128mb blocks (or custom sizes)
* blocks are replicated on 3 DataNodes
* mapping of blocks to DataNodes is maintained in the NameNode
