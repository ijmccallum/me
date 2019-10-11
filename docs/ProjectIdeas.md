# Project ideas

Some slightly more fleshed out ideas for things to build.

## JS Complexity Report

There are a few projects out there, finding it hard to get one that works. The building blocks must be out there, would be cool to set up some kind of graphing thing! A simple npm install / the federated package manager install. Maybe one package to create the report, others to visulalise it, maybe an online service?

## CSS Cache

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


# Culture ideas!

Because sometimes at work someone in some meeting will ask for ideas on how to improve things, these are some things that might be offered up!

## Slack Houses

(or chat system of choice)

Randomly assign new joiners to a "house" (think Harry Potter houses). Every month/quarter/year have some kind of weird off the wall competition running and notify your chat system of pointes being gained. Endless stuff you ca do here! Swap / trade people between houses, keep competitions secret so folk have to figure out what it is, keep house membership secret so people have to work out who's in what house / people can pretend to be in other houses.

## Open Invites

 - company / group calendar that anyone can add to
 - random events outside work that you're going to, specify time / place. If anyone else wants to show up, see you there!
 - not organised by leadership, more organic
 
## Sponsored Open Invites

 - For bigger trips that would require travel / lodging / equipment
 - if a bunch of work people decide to tag along
 - the company will contribute towards the overall cost (eg hire a minibus / lodging for the group)

## Alumni club

 - newsletter anyone can submit to, from within the company or from alumnis (because people are usually interested in people)
 - alumni access to see / submit Open Invites
 - quarterly / biannual / annual meetup

## Code for _____ meetup

 - See the Code for America meetup organisation. They got it right. If your city / country doesn't have that, get the copmany to donate space / employee time for organising & prepping presentions
