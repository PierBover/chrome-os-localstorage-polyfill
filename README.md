# Chrome OS app localStorage polyfill

Surprinsingly Chrome OS apps don't have access to `window.localStorage`.

In this repo I provide a simple app with an example implementation for `localStorage` and `sessionStorage`. You cannot simply use `window.localStorage = chrome.storage.local` because `chrome.storage` is async. [Check the docs](https://developer.chrome.com/apps/storage).

This polyfill works as a drop in replacement with **a single gotcha**: you need to wait for a promise before you can read from `window.localStorage`. The code is straightforward so you could replace that promise with an event, a [signal](https://github.com/Hypercubed/mini-signals), or whatever works best for your project.

I'm using ES6 without Babel because at this point Chromebooks can be considered evergreen browsers.