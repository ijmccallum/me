(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{199:function(e,t,a){"use strict";a.r(t);var o=a(0),i=Object(o.a)({},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"the-architecture-of-open-source-applications"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#the-architecture-of-open-source-applications","aria-hidden":"true"}},[e._v("#")]),e._v(" "),a("a",{attrs:{href:"http://aosabook.org/en/index.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("The Architecture of Open Source Applications"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("In depth overviews / critiques of the system designs behind some great open source projects.")]),e._v(" "),a("h2",{attrs:{id:"_1-asterisk"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-asterisk","aria-hidden":"true"}},[e._v("#")]),e._v(" 1. "),a("a",{attrs:{href:"https://www.asterisk.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Asterisk"),a("OutboundLink")],1)]),e._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/asterisk/asterisk",target:"_blank",rel:"noopener noreferrer"}},[e._v("Github"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("p",[e._v("A Multi format, extensible phone server. Allows communication between many phone technologies (VoIP, Old school, and more I'm sure). Also allows 'dialplans' - applications whose UI is essentially your phone call. EG automated answering giving you options in a phone menu, I'm guessing robo calls too. An incoming phone call is received by Asterisk, the type of tech is checked and a module for translating the tech specific connection into a generic connection is assigned. The newly translated generic connection is then hooked up to an "),a("code",[e._v("ast_channel")]),e._v(" - an object that will run the dialplan within Asterisk. That dialplan could be a phone menu or it could request a connection to another phone (which would run another connection but from generic to tech specific). If the outbound call tech matches the in bound, a direct connection may be initiated to save on translation into and out of the generic channel type.")]),e._v(" "),a("p",[a("em",[e._v("The examples are a bit hard to decipher (written in C, which I'm not familiar with), but there are loads of details in the article which clarify things. Specifically the abstraction from connection tech to a general internal connection - that process will probably stick in my head for a good long while, so much simpler and clear than I would have guessed for a phone system like this!")])]),e._v(" "),a("h2",{attrs:{id:"_2-audacity"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-audacity","aria-hidden":"true"}},[e._v("#")]),e._v(" 2. "),a("a",{attrs:{href:"https://www.audacityteam.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Audacity"),a("OutboundLink")],1)]),e._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/audacity/audacity",target:"_blank",rel:"noopener noreferrer"}},[e._v("Github"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v('Sound recording and editing software. The architecture is described as "like a city", there are some impressive buildings, and some less impressive buildings. It is hindered by licencing issues but gets around these by supporting standard APIs - so said licensed code may be plugged in by a user. Thinking in layers, the base is 3rd party cross platform libs that expose general audio (PortAudio) and GUI (wxWidgets) APIs. These are in separate DLL files (rather than being compiled into the core file). Size and speed suffer for this, but it allows other DLLs to use them directly at run time - greater extensibility.')]),e._v(" "),a("p",[e._v("An abstraction mistake. There's a small story about the original implementation being for mono and not stereo. So the code defaults to one channel, but has been modified to check for 2 channels later on in many places. Better if originally designed for "),a("code",[e._v("n")]),e._v(" channels. This issue was also locked in by exposing a "),a("code",[e._v("GetLink")]),e._v(" method to get the pair of a channel if it had one, this method has been used throughout and somewhat locked them in. The GUI architecture also has problems - mixes between plugin code, application code, and special cases with absolute positioning etc. They are hoping for a rewrite with greater abstractions - UI components with no required awareness of the greater context.")]),e._v(" "),a("p",[e._v("A drawback of the cross-platform libs: it runs 3 threads, each in their own way. A GUI thread created by wxWidgets and updated every 50ms. An audio thread created by PortAudio for recording and playback. And a buffer thread handled by the application code to keep thins snappy. This creates complexity but it is forced by the expectations of the plugins, had they rolled their own and abstraction could have been made but without all the cross-platform benefits.")]),e._v(" "),a("p",[e._v('Some audio is too big to be handled with speed, or even to fit in RAM. Audacity splits audio into ~1MB "block files" which are coordinated in an xml based .aup file. Edits only affect the relevant blocks. Block files also hold summary info which is used when zoomed out in place of processing the entire audio track. One issue on windows was lag with more than ~100 files were placed a single directory. So a hierarchy was created with never more than 100 files to a folder.')]),e._v(" "),a("p",[e._v("Audacity has grown organically, no plan was laid down, hence the city like code.")]),e._v(" "),a("p",[a("em",[e._v("The most applicable thing I've picked up from this is something like \"non-array like arguments make code smell... a bit\", or at least indicate that some thinking / explanation is required. Also, writing cross platform creates restrictions - glad I'm in the web space, going to stick here as much as I can!")])]),e._v(" "),a("h2",{attrs:{id:"_3-bash-the-bourne-again-shell"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-bash-the-bourne-again-shell","aria-hidden":"true"}},[e._v("#")]),e._v(" 3. "),a("a",{attrs:{href:"https://www.gnu.org/software/bash/",target:"_blank",rel:"noopener noreferrer"}},[e._v("BASH"),a("OutboundLink")],1),e._v(" the Bourne Again SHell")]),e._v(" "),a("p",[e._v("I'd bet you're familiar with it. It's a language unto itself! With reserved words ("),a("code",[e._v("if")]),e._v(", "),a("code",[e._v("while")]),e._v(", "),a("code",[e._v("for")]),e._v("), operators ("),a("code",[e._v("|")]),e._v(", "),a("code",[e._v(">")]),e._v('), variables (strings, integers, arrays (indexed or associative, of strings or integers - not other arrays)), and more. Input comes from the keyboard or scripts then is run through a pipeline: "Input Processing" - built on top of '),a("a",{attrs:{href:"https://tiswww.case.edu/php/chet/readline/rltop.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("readline"),a("OutboundLink")],1),e._v(' which handles the command line editing. "Parsing" - splits a stream of characters into words and applying meaning. Lots of intricacies there. "Word Expansion" - Applys variables, expands a lot of utility like mini functions (my words!). eg '),a("code",[e._v("pre{one,two,three}post")]),e._v(" to "),a("code",[e._v("preonepost pretwopost prethreepost")]),e._v('. And a lot more. There\'s some overlap in responsibility between this and Parsing. "Command Execution" - usually a command name passed to the OS with a list of arguments. But also the meat of the Bash programming language.')]),e._v(" "),a("p",[a("em",[e._v('This one was a stretch for me to understand. But the final section on "lessons learned" was clear enough: keep detailed change logs, have extensive regression testing built in, standards are good if you can have them, keep good detailed documentation, find and use good software to help.')])]),e._v(" "),a("h2",{attrs:{id:"_4-berkeley-db"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-berkeley-db","aria-hidden":"true"}},[e._v("#")]),e._v(" 4. "),a("a",{attrs:{href:"http://aosabook.org/en/bdb.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Berkeley DB"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v('The 20 year old "grandfather of the NoSQL movement", and "the most widely used database toolkit in the world" (at the time of writing).\nBuilt to replace AT&T\'s proprietary hash package, and to work in memory and on disk. This article breaks down the architecture and gives a series of general system design lessons learned throughout the many years of development. It also gives a glimpse of the kind of complexities that grow as software moves from concept, through implementation, then 20 years of maintenance.')]),e._v(" "),a("p",[e._v('Berkeley DB is split into a collection of modules. Subsystems which each have their own clearly defined APIs. "It is good discipline for programmers to think about the parts of the system as separate software products in their own right". Calls to these APIs will result in a small suite of tests checking any passed in arguments and the general state of the system. If anything is amiss it will throw errors - better to fail loud and clear than to create subtle inconsistencies.')]),e._v(" "),a("p",[e._v("Some other lessons shared:")]),e._v(" "),a("p",[e._v('If you have a design problem, and you\'re inclined to make a quick fix now instead of taking the time to do it properly "remember that being nibbled to death by ducks will kill you just as surely as being trampled by elephants".')]),e._v(" "),a("p",[e._v("Bugs usually imply a misunderstanding, look for that misunderstanding rather than just the bug - it's likely to inform your understanding of a system and any underlying fundamental flaws in it's design.")]),e._v(" "),a("p",[e._v('"When asked what it meant for something to be object-oriented, '),a("a",{attrs:{href:"https://en.wikipedia.org/wiki/Butler_Lampson",target:"_blank",rel:"noopener noreferrer"}},[e._v("Butler Lampson"),a("OutboundLink")],1),e._v(' said it meant being able to have multiple implementations behind an API".')]),e._v(" "),a("h2",{attrs:{id:"_5-cmake"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-cmake","aria-hidden":"true"}},[e._v("#")]),e._v(" 5. "),a("a",{attrs:{href:"http://aosabook.org/en/cmake.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("CMake"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("A better build system (than vs project files for windows and configure script / makefiles for unix). Cross platform way of building a shared library. Not going to lie - this one sounded beyond me, I don't use anything even related to this.")]),e._v(" "),a("h2",{attrs:{id:"_6-eclipse"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-eclipse","aria-hidden":"true"}},[e._v("#")]),e._v(" 6. "),a("a",{attrs:{href:"http://aosabook.org/en/eclipse.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Eclipse"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v('7th Nov 2001 - 1.0 was a component based platform for building tools for devs. The platform handles some basic set up and plumbing that deals with file system & other things. Plugins extend this platform through "extension points". It didn\'t go into a huge amount of detail but I got the impression they\'re a bit like the "hooks" you find in WordPress.\nAPIs are also provided to do... things! "API is forever" - an Eclipse mantra.\nJDT (Java Development Tools) - they wrote their own Java compiler in order to provide extension points within the compiler (wouldn\'t be possible with a third party compiler.)')]),e._v(" "),a("p",[e._v('Pre 3.0 Plugins could define other plugins as dependencies then they would have access to the classes within the given plugins. They (I believe) could also define their own extension points and extensions (from other extension points?). With 3.0 the plugin system switched to OSGi, a third party (community) that provided a modularity framework for Java. It examines each bundle (plugin) then constructs a "class path" for each one.')]),e._v(" "),a("p",[e._v('OSGi and the Eclipse extensions registry (the previous I think) are "Service programming models". They contain producers, consumers, and a broker that is responsible for coordinating the relationship between them.')]),e._v(" "),a("p",[e._v("RCP - people started using eclipse as a platform from which to build actual applications.")]),e._v(" "),a("p",[e._v("p2 provisioning system - a way to make partial updates... this one was a bit beyond me.")]),e._v(" "),a("p",[e._v("The APIs they created seem to be too complex, should have been simpler. Interesting / unexpected use cases were discovered but also a lot of noise came from the community about edge cases that take a lot of time to implement.")]),e._v(" "),a("h2",{attrs:{id:"_7-graphite"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_7-graphite","aria-hidden":"true"}},[e._v("#")]),e._v(" 7. "),a("a",{attrs:{href:"http://aosabook.org/en/graphite.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Graphite"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("A network based (as in accessed over a simple network protocol) database for storing numbers that change over time and graphing them.")]),e._v(" "),a("p",[e._v("Seems to have been started within a company as a series of experiments and then released as open source later on, at which point it took off. The rough shape of it's architecture is an inverted triangle with the db at the bottom "),a("code",[e._v("whisper")]),e._v(", a write server for receiving data and writing it incredibly quickly (the main challenge for this project) "),a("code",[e._v("carbon-cache")]),e._v(" built on "),a("a",{attrs:{href:"https://twistedmatrix.com/trac/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Twisted"),a("OutboundLink")],1),e._v(', and a python server that reads the data and generates graphs on the fly, the "front end" UI. Carbon and the UI being the higher 2 points of the triangle.')]),e._v(" "),a("p",[e._v("The first part is moving the data from "),a("code",[e._v("carbon-cache")]),e._v(" to "),a("code",[e._v("whisper")]),e._v(" for storage. The data is very minimal with each data point only containing 3 space separated values:")]),e._v(" "),a("ul",[a("li",[e._v('The name of the data type, eg "products.snake-oil.salesPerMinute". This name also determines where the data is stored.')]),e._v(" "),a("li",[e._v('The value that is relevant, eg "1" because at this minute only 1 person bought snake oil')]),e._v(" "),a("li",[e._v("A unix epoch time stamp")])]),e._v(" "),a("p",[e._v("This data point is evidently tiny and for larger operations you may end up with an untamable flood of individual data points hailing down on your poor database (think of some major online sellers and how often they sell things). This reveals the first bottleneck - seek time for where the data will be written to disk. "),a("code",[e._v("carbon-cache")]),e._v(" therefor buffers data so that it may send a chunk of snake-oil sales per minute numbers at once, say for the past 10 mins, so we have 10x less seek time and a bit of incidental resilience!")]),e._v(" "),a("p",[e._v("Also "),a("code",[e._v("carbon-cache")]),e._v(" does not reply to data packets sent to it. It just listens.")]),e._v(" "),a("p",[e._v('Now to storing the data. Replace the dots in the name for slashes and you\'ve got an address on the filesystem with the final substring being the filename for that type of datapoint. Each file has meta info in a header, then "archive sections" with many '),a("code",[e._v("time,value,time,value")]),e._v(" pairs. Simples!")]),e._v(" "),a("p",[e._v('The UI. The WebApp (UI) generates graph rasters (pixel based images) on demand, based on parameters passed in via a querystring that look like the kind of formulas you might put into excel. It also has a "Composer UI" which looks to be a large number of options to guide people through creating the query strings used in demanding the graphs.')]),e._v(" "),a("p",[e._v("This server side rendering became a performance issue, but caching the graph images and the data used to render them helped.")]),e._v(" "),a("p",[e._v("A more complex issue with the architecture so far was the buffer / queue system used by "),a("code",[e._v("carbon-cache")]),e._v(" to avoid overloading "),a("code",[e._v("whisper")]),e._v(". Say it did buffer 10 mins of data before sending it all as a chunk to the db. Then however fast the graph UI can be, it'll have anything up to 10 mins of lag - not great for a real time system. The chosen solution was to add a query mechanism to "),a("code",[e._v("carbon-cache")]),e._v(" so the UI could grab data out the buffer. Al alternate route would have been to have a real time UI suck data exclusively out "),a("code",[e._v("carbon-cache")]),e._v(" and have it rendered client side (as in - in the browser). And leave the python graphs to focus on longer term analytics.")]),e._v(" "),a("p",[e._v("Some other notes:")]),e._v(" "),a("p",[e._v("I/O performance. There are some details about how a system's kernel might handle writes with caches and buffers. There are scenarios in which the writes to disk wil become slow if the kernel has to give up memory, which carbon then takes to hold it's buffer, so the writes become slower, eventually the whole thing might die. To avoid, config options were added to set limits so that carbon might mitigate the situation by dropping data points / refusing new ones.")]),e._v(" "),a("p",[e._v("To provide clustering / to split the load between many back end servers, a new service was added: "),a("code",[e._v("carbon-relay")]),e._v(" which receives all data and routes it to specific servers based on the data point's name. It won't handle servers that go down, or other kinds of failure states - it's kept simple so failure recovery / redundancy is left to sysadmins.")]),e._v(" "),a("p",[e._v("In hindsight the maintainer (Chris Davis) wishes to have spent more time thinking about the API. This particular wish is becoming a pattern! Also the hierarchical human editable naming for data - it has proved to make complex queries difficult and he notes that one solution might be to maintain a separate index db to keep track of where each node type is stored.")]),e._v(" "),a("h2",{attrs:{id:"_8-hadoop"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_8-hadoop","aria-hidden":"true"}},[e._v("#")]),e._v(" 8. "),a("a",{attrs:{href:"http://aosabook.org/en/hdfs.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Hadoop"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("HDFS: Hadoop Distributed File System (others are PVFS, Lustre, and GFS)")]),e._v(" "),a("p",[e._v("Stores massive data sets, transforms said data, and streams said data to wherever. They note only 100 companies worldwide actually using it!")]),e._v(" "),a("ul",[a("li",[e._v("filesystem map and metadata stored on a single server - the NameNode (stores the whole namespace in RAM)")]),e._v(" "),a("li",[e._v("application data stored on other servers - DataNodes")]),e._v(" "),a("li",[e._v("all nodes connect to each other through TCP based protocols.")])]),e._v(" "),a("p",[e._v("App data is duplicated on multiple DataNodes for resilliancy, more computing power (they can run multiple tasks concurrently - multi core servers I'm guessing!), and more bandwidth.")]),e._v(" "),a("ul",[a("li",[e._v("files and folders are "),a("code",[e._v("inodes")])]),e._v(" "),a("li",[a("code",[e._v("inodes")]),e._v(" hold metadata")]),e._v(" "),a("li",[e._v("file data is split into 128mb blocks (or custom sizes)")]),e._v(" "),a("li",[e._v("blocks are replicated on 3 DataNodes")]),e._v(" "),a("li",[e._v("mapping of blocks to DataNodes is maintained in the NameNode")])])])},[],!1,null,null,null);t.default=i.exports}}]);