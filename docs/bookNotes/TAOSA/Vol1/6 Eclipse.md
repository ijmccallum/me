## 6. [Eclipse](http://aosabook.org/en/eclipse.html)

7th Nov 2001 - 1.0 was a component based platform for buiding tools for devs. The platform handles some basic set up and plumbing that deals with file system & other things. Plugins extend this platform through "extension points". It didn't go into a huge amount of detail but I got the impression they're a bit like the "hooks" you find in WordPress.
APIs are also provided to do... things! "API is forever" - an Eclipse mantra.
JDT (Java Development Tools) - they wrote their own Java compiler in order to provide extension points within the compiler (wouldn't be possible with a third party compiler.)

Pre 3.0 Plugins could define other plugins as dependencies then they would have access to the classes within the given plugins. They (I believe) could also define their own extention points and extensions (from other extension points?). With 3.0 the plugin system switched to OSGi, a third party (community) that provided a modularity framework for Java. It examins each bundle (plugin) then constructs a "class path" for each one.

OSGi and the Eclipse extensions registry (the previous I think) are "Service programming models". They contain producers, consumers, and a broker that is responsible for coordinating the relationship between them.

RCP - people started using eclipse as a platform from which to build actual applications.

p2 provisioning system - a way to make partial updates... this one was a bit beyond me.

The APIs they created seem to be too complex, should have been simpler. Interesting / unexpected use cases were discovered but also a lot of noise came from the community about edge cases that take a lot of time to implement.