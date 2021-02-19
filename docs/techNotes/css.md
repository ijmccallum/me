# CSS

My development gateway drug. Hacking CSS in WordPress themes was the first development work I was paid for and it remained the core of my day-to-day for quite a few years. 

## Organising it

The phases of naming, I'm guessing many people went through a similar progression. These are the techniques I went through:

### Name it what it is

eg `.blog-post-title` or `.article-body` etc. Every single activly maintined project I have ever seen using this has turned itself into a tiny microcosm of css nightmares. This may be partly due to the fact that these were some of the first projects I ever worked on. Meaning I had essentially 0 experience. And it may have been the person with 0 experience causing said nightmares. But lets just sweep that under the rug for now and say NEVER USE THIS NAMING CONVENTION!

### Name it what it is (inproved!)

**BEM** `.block__element--modifyer` eg `.blog-post__title--highlight`. Projects written in this style still went the way of darkness, but at least it took them longer. Also, to give more credit to this naming convention, the reason I saw projects turning sideways was more to do with a lack of rigour from the development teams. And to give those teams more credit, they were operating in an agency world which went something like:

> "OK developers, we're gonna need you to pump out components as fast as possible, don't do code reviews, don't test the code, we have a team of quality assurance professionals who'll check the UI for you MANUALLY, oh and by the way we demand pixel perfection on every browser, phone, tablet AND EMAIL CLIENT" Sincerely, management.

Phew! Rant over, clearly got some memories in that department to deal with. Thankfully those times are long gone.

### Name it what it is (pro)

**BEMIT** (BEM + ITCSS). For me this boiled down to prefixing classes with `.js-` when (I hope you guessed it) Javascript is involved. That single addition saved a fantastic amount of pain for me. This was still back in the agency days and also back in the before-react time, so `.js-` could have easily been replaced with `.jquery-was-here-`.

### Atomise it

_No not atomic components, I'm talking UTILITY CLASSES!_

https://tachyons.io/ (the one I've played with)  
https://tailwindcss.com/ (the one I hear about on podcasts)  

eg `.tc` for `text-align: center;`, or `.db` for `display: block;` This style was a revelation for me. The first one that separated style from html content, the first one that didn't introduce inexplicable links between seemingly random components, the first one that did away with the need for any css gymnastics. Clearly I've yet to experience a full blown professional project with multiple devs using this one!

### CSS in JS

eg [styled-components](https://www.npmjs.com/package/styled-components) or [Svelte](https://svelte.dev/). Throw all this carefully crafted css naming convention malarky out the window and just JAVASCRIPT it. This is where my professional work has landed (as I'm part of a much larger team these days), but I'm not a huge fan. A lot of the styling inconsistency problems are still around but the budget to spend time fixing it isn't. Personal projects (that don't rely on prebaked templates like this site) I'll always reach back to utility classes. 

### Other naming styles that never made it off the to-do list

* OOCSS / Atomic
* ECSS
* SMACSS

---

Tools:

* [Utility classes for react](https://github.com/JedWatson/classnames)
* [Immutable CSS linter](https://github.com/johnotander/immutable-css) and and [article on immutable css](https://csswizardry.com/2015/03/immutable-css/) that explains the idea. Eg `.bg-red` is defined. then later `.pinkify .bg-red` redefines it - mutates it. The linter would pick that up and throw an error. `.bg-red` should never be changed, and this looks like a tool that can enforce that.

---

## Articles & notes summarising them
### [How not to scale CSS](https://gist.github.com/mrmrs/5d6c3bf60a9ff410fcec)

* A funny read on the CSS perils of larger projects with multiple developers.
* Read through any large project's css, line by line, from start to finish. You'll see the layers of it's history, some madness, and you'll learn new tricks.
* Reading Modular / "semantic" classes don't tell you what the css will do. Nor can you tell if they are overridden anywhere.
* Atomic / utility classes (eg `.bg-red { background-color: red; }` / `<div class="bg-red>"`) will tell you what they do whither you read them in the markup or the stylesheets.
* When adding a new component to an existing project a developers first instinct is to write new styles for it. If time is tight, you don't read through the whole project to find out if that style already exists.
* multiple classes for each element dot not cause a significant increase in the size of your markup. Redefining the same style attributes and complex legacy css is much worse.
* Even the best of us suffer from this, GitHub, Pinterest, Medium, Adobe - go read their styles, you'll see.
* Naming modules by their content is a problem - content is different from presentation, modules should be named by presentaion function (`.modal`, `.ribbon` relate to presentation. `.news-item`, `.location` do not).

### [Semantic CSS](https://snook.ca/archives/html_and_css/semantic-css)

* class names have minimal use: only really useful for the next developer.
* Developers using modular "semantic" names are often inconsistent. They will use `navigation`, `dropdown`, and `modal` that describe the design function alongside `products`, `events`, and `collections` that describe the content.
* Naming by design function is hard. (Unsolved I believe).
* Think carefully about using modifier classes, eg `modal--special`. Often they would be better as their own component as differences can make the markup between the two incompatible. Remember it's only useful for the developer who comes after you.

### [About HTML semantics and front end architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/)

* Most HTML semantics are related to the content: elements (`h1` / `p`), `lang` attribute, `type="..."`, Microdata. But CSS class names do not need to relate to content. In fact there is no inherent reason to relate css classes to content.
* class names should communicate useful information to developers, especially when they are not all front end developers.
* Tying class names to content limits your css from scaling.
* > "The most reusable components are those with class names that are independent of the content."
* "The aim of a component/template/object-oriented architecture is to be able to develop a limited number of reusable components that can contain a range of different content types."
* components should avoid type selectors
* Javascript only classes `js-*` reduce the risk of theme / structure changes breaking the JS.
* Single class modifiers (eg `.btn--primary` @extends `.btn` so you only need `<button class="btn--primary">`) are less scalable than multi class modifiers (`<button class="btn btn--primary">`). For example, if you have 5 types of buttons at 3 sizes you would end up with 24 single class modifiers or 9 mix and match multi class modifiers.
* Multi class modifiers allow parent components simpler tweaks, eg `.thing .btn { tweak }` vs`.thing .btn, .thing .btn-primary, .thing .btn-danger, .thing .btn-etc { tweak }`
* CSS should be maintainable first. Pre-processors and compression nullify concerns about the size or aesthetics of the output CSS / HTML.

### [BEMIT Taking BEM further with ITCSS](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/)

* When reading the markup BEM tells you what classes are related to each other (the namespace they're in).
* Namespacing by the type of component (`u-` for utility, `o-` object (these will need clear definitions), etc)
* Responsive suffixes `class@m` for the medium breakpoint, `class@s` for the small...

### [Functional CSS](http://eng.wealthfront.com/2013/08/20/functional-css-fcss/)

* Using namespacing to simulate scope in CSS (essentially BEM)
* Brings up immutability, for mre in depth see the article further up
* Problem, in the `.sidebar .error` example the idea of changing appearance based on location is used, immediately after that issue was identified as an anti pattern and solved an alternate way. Literally in the paragraph before.
* Problem, class composition in the markup is described as confusing - I would counter by saying the names are confusing. They use @extend to solve, but again I would counter and say that just moves the confusion. Utitlity classes win here for me, `.clr-red .border-red` and be done with it! Or, in keeping with namespacing, `.error .error--bordered`.

### [Building and shipping functional CSS](https://medium.com/@cole_peters/building-and-shipping-functional-css-4f29b947bcb9)

* One developers story about transitioning his company's site into functional css. Less about learning, more out of interest!
