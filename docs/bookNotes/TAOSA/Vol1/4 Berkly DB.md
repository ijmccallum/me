## 4. [Berkeley DB](http://aosabook.org/en/bdb.html)

The 20 year old "grandfather of the NoSQL movement", and "the most widely used database toolkit in the world" (at the time of writing).
Built to replace AT&T's proprietary hash package, and to work in memory and on disk. This article breaks down the architecture and gives a series of general system design lessons learned througout the many years of development. It also gives a glimps of the kind of complexities that grow as software moves from conecpt, through implementation, then 20 years of maintenance.

Berkeley DB is split into a collection of modules. Subsystems which each have their own clearly defined APIs. "It is good discipline for programmers to think about the parts of the system as seperate software products in their own right". Calls to these APIs will result in a small suite of tests checking any passed in arguments and the general state of the system. If anything is amiss it will throw errors - better to fail loud and clear than to create subtle inconsistancies.

Some other lessons shared:

If you have a design problem, and you're inclined to make a quick fix now instead of taking the time to do it properly "remember that being nibbled to death by ducks will kill you just as surely as being trampled by elephants".

Bugs usually imply a misunderstanding, look for that misunderstanding rather than just the bug - it's likely to inform your understanding of a system and any underlying fundamental flaws in it's design.

"When asked what it meant for something to be object-oriented, [Butler Lampson](https://en.wikipedia.org/wiki/Butler_Lampson) said it meant being able to have multiple implementations behind an API".