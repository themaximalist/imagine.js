# Imagine.js

<img src="logo.png" />

<div class="badges" style="text-align: center; margin-top: 0px;">
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/themaximal1st/imagine.js">
<img alt="NPM Downloads" src="https://img.shields.io/npm/dt/%40themaximalist%2Fimagine.js">
<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/themaximal1st/imagine.js">
<img alt="GitHub License" src="https://img.shields.io/github/license/themaximal1st/imagine.js">
</div>
<br />

**`Imagine.js`** is an AI image generator library. It works with local models like [Automatic1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui) and remote models like [Replicate](https://replicate.com/) and [Stability](https://stability.ai/).

```javascript
await Imagine("a red rose"); // Buffer(...)
```

**Features**

- Easy to use
- Works with local Stable Diffusion models
- Works with any remote models on Replicate or Stability AI
- Same interface for all services (`a1111`, `replicate`, `stability`)
- MIT license


## Install

For local models, ensure a Automatic1111 instance is running.

For remote models, make sure you have `REPLICATE_API_KEY` or `STABILITY_API_KEY` set in your environment variables.

```bash
npm install @themaximalist/llm.js
export STABILITY_API_KEY=...
export REPLICATE_API_KEY=...
```

### Prompt

Call `Imagine.js` to generate an image with your prompt.

```javascript
const Imagine = require("@themaximalist/imagine.js");
const buffer = await Imagine("a red rose"); // Buffer(...)
fs.writeFileSync("rose.png", buffer);
```

### Services

Specify a different service, `a1111`, `replicate` or `stability`.

```javascript
await Imagine("a red rose"); // defaults to a1111
await Imagine("a red rose", { service: "replicate"} );
await Imagine("a red rose", { service: "stability"} );
```

### Projects

`Imagine.js` is currently used in the following projects:

-   [Infinity Arcade](https://infinityarcade.com)
-   [ImagesBot](https://imagesbot.com)
-   [AI.js](https://aijs.themaximalist.com)

### Author

-   [The Maximalist](https://themaximalist.com/)
-   [@themaximal1st](https://twitter.com/themaximal1st)

### License

MIT
