## 2. [Firefox Release Engineering](http://aosabook.org/en/ffreleng.html)

Automating the release process for firefox.

* Post mortem on the build process after _every_ build.
* Fix one thing, no matter how small, after every build.
* Treat every build as you would a quick fix build - so when quick fixes are needed, it's the norm.
* one person is build captain, they have to know the background of all updates, referee bug severity, run communication between all groups, be on point! On build day, everyone has to trust the decisions this person makes.
* The build captain coordinates some specific build stages by sending a specifically worded email to a stakeholder list. "go to build firefox 6.0.1" to start a build, "go live (firefox 6.0.1?)", "all stop (firefox 6.0.1?)". Each email is a new email, not a replay in case email thredding losses it.
* Builds are either "Routine" (properly scheduled, no all nighters) or "Chemspill" (minutes matter). Detailed in the go to build email.
* Builds have a commit cut off time down to the second including time zone. Detailed in the go to build email.
* Firefox is made up from quite a few repos, part of the build process is automated tagging accross those repos. For LTS updates tagging has to run on currently supported previous versions which live on their own branched (each update is automatically set up with it's own branch - in every repo)
* I18n is handled by unpacking the en code, replacing strings, and repacking it (desktop). Slightly different for android. This process is also automated but it doesn't sound like every language gets the update every time? I may be wrong - sounds quite the tricky task!
* Signing the built code, so client machines can trust that they actually have the real firefox, happens on a seperate trusted machine. Used to be totally manual but much of it has been automated.
* Community run code mirrors monitor the relese status of the fire fox ftp servers, once enough of them have updated with a build then the release becomes official and an update is made to the firefox website - these community mirrors are required to sustain the load of the millions of users updating their browsers over a few days.
* Simple "wall clock" timestamps (through emails) allowed them to see roughly how long each stage of a release took. Helped with the education of people throughout mozilla. Many people have only ever experienced slow & fragile build processes.
* Managing turnover: after each release people are given a day or two of "do not disturbe" time to fix problems that are fresh in their minds - gives them a feeling of controll back and the opportunity to actually improve things.
