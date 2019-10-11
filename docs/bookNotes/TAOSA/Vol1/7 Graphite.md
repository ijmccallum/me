## 7. [Graphite](http://aosabook.org/en/graphite.html)

A network based (as in accessed over a simple network protocal) database for storing numbers that change over time and graphing them.

- whisper: database library, stores data in a file: meta info in a header, then "archive sections" with many `time,value,time,value` pairs.
- carbon-cache: back-end daemon built on [Twisted](https://twistedmatrix.com/trac/) so it can talk to many clients at once.
- Front end UI

Data is sent to carbon over a tcp connection (it doesn't reply! It just listens). The data looks like this:

```
servers.www01.cpuUsage 42 1286269200
products.snake-oil.salesPerMinute 123 1286269200
[one minute passes]
servers.www01.cpuUsageUser 44 1286269260
products.snake-oil.salesPerMinute 119 1286269260

name.of.thing [space] value [space] unix epoch timestamp
```

The WebApp (UI) generates graph rasters (pixel based images) on demand, based on parameters passed in via a querystring that look like the kind of formulas you might put into excel. It has a "Composer UI" which looks to be a large number of options to guide people through demanding graphs. This rendering became a performance issue, but caching the graph images and the data used to render them helped.