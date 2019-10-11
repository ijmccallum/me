https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html

This is how react works (at a high level) under the hood - as in how each component is represented (this is the virtual DOM)

---

https://facebook.github.io/react/docs/reconciliation.html

Describes how the diffing actually works

---

https://facebook.github.io/react/contributing/design-principles.html

Not really needed, it's a message from the react maintainers in facebook to us - the people using it

---

https://github.com/acdlite/react-fiber-architecture

A quick overview of the above (also the source for the linkd above) then a dive into what "React Fiber" is.

---

Render props vs Higher Order Components.

https://levelup.gitconnected.com/understanding-react-render-props-by-example-71f2162fd0f2

https://levelup.gitconnected.com/understanding-react-higher-order-components-by-example-95e8c47c8006

HOC adds new attributes to the props of a given component - so the given component then access those new props attributes. The given component now knows about the extra abilities provided by the HOC - knowledge of the HOC is leaking in.
Render props pass in those extra attributes as arguments to a render attribute of the render prop component. Within that render attribute you use the extra abilities then pass the results into a child component (equivolent to the "given component" above). But this time the child component is not aware of the extra abilities. Knowledge of the render prop has not leaked in.

### New lifecycle methods

### Context API

### pointer events

### lazy function

### React.memo

### React hooks

A more direct reference to existing concepts: props, state, lifecycle, refs, context.
Provides a better primitive for sharing statefull logic: to combat "wrapper hell"
The current lifecycle methods make you group together unrelated code, muddies the waters.
Classes cause confusion for people, are hard to minify, and are flaky for hot module reloading.

`useState` takes a state object/primitive and returns an array: 0 is a reference to the given state object/primitive. 1 is a function that can be used to act upon that state object/primitive. With array destructuring, `const [count, setCount] = useState(0);`, we can reference the state (`count`) directly (without the `this.state.` bit). Same goes for the function to update state, instead of `this.` we can just do `setCount(count + 1)`

`useEffect` takes a function (which because of JS has access to the component's scope) that it will run after _every_ render. If you return a function from your effect function this will be run before any subsequent renders and also when the component unmounts. `useEffect` also takes a second argument, an array which will compare the value at [0] to the previous time it was run (rendered), it'll only run the effect function if that value changes.
Named after side effects: fetch, subscribe, clear subscribe, tweak the dom, etc.

`useContext` - I guess for sharing state down and accross many components

`useReducer` - hmmm

Keep them at the top of the component scope! Every time the component function is run every hook is run, in order. The state they relate to is essentially an index defined by the order in which they run. So no calling effects in loops / conditionals / other functions / anything dynamic. Do that stuff inside the hook.

Challenge for when I'm done - make a d3 component with hooks
https://www.npmjs.com/package/eslint-plugin-react-hooks

### Suspense API

Defer rendering until a condition is met. Old school way: show a spinner.
New school way: ... not ready yet?
