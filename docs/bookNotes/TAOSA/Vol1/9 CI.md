## 9. [CI](http://aosabook.org/en/integration.html)

An overview of the main choices to be made when creating a CI system.

- master/slave: central server controls remote builds (Buildbot)
- reporting: remotes report progress to a central server (CDash)

Buildbot has a buildmaster server that configures and runs the buildslave servers.
In CDash, client computers run their own builds / test suites then connect to the CDash server to deposit the reports.

Jenkins does both.

The basic features initially seem quite simple, but there are a whole bunch more features that might be built into a CI system:

- Checkout & update: keeping up to date with all the code in a project. Either pull the whole lot or keep a copy and only pull changes.
- Abstract build recipes: a declaritive way of asking for what you want, it's up to the system to figure out how to do it.
- Storing metadata: build times / what files were updates / etc to look back and find out, when did the builds start failing, or what update made the build start taking so long.
- Release packages: To release the built result to people / systems who/that might not have access to the source code / build server. Or sending them to a central repo for artifacts.
- Multiple architecture builds: complexity for the sake of complexity?
- Resource management: or, in other words, load balancing build machiens.
- External resource coordination: eg the CI system coordinating access to things like an external DB
- Progress reports: because we're an impatiant species, and time is money.