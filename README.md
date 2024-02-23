## Imagine.js

<img src="public/logo.png" alt="Imagine.js — AI image generation library for Node.js" class="logo" style="max-width: 450px" />

<div class="badges" style="text-align: center;">
<a href="https://github.com/themaximal1st/imagine.js"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/themaximal1st/imagine.js"></a>
<a href="https://www.npmjs.com/package/@themaximalist/imagine.js"><img alt="NPM Downloads" src="https://img.shields.io/npm/dt/%40themaximalist%2Fimagine.js"></a>
<a href="https://github.com/themaximal1st/imagine.js"><img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/themaximal1st/imagine.js"></a>
<a href="https://github.com/themaximal1st/imagine.js"><img alt="GitHub License" src="https://img.shields.io/github/license/themaximal1st/imagine.js"></a>
</div>
<br />

**`Imagine.js`** is a simple AI image generator library for Node.js. It works with local models like [Automatic1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui) and remote models like [Replicate](https://replicate.com/) and [Stability](https://stability.ai/).

```javascript
await Imagine("a red rose"); // Buffer(...)
```


<table class="images">
<tr>
<td><img src="public/image1.png" alt="Example of Imagine.js image generation" /></td>
<td><img src="public/image2.png" alt="Example of Imagine.js image generation" /></td>
<td><img src="public/image3.png" alt="Example of Imagine.js image generation" /></td>
<td><img src="public/image4.png" alt="Example of Imagine.js image generation" /></td>
</tr>
</table>

**Features**

- Easy to use
- Same interface for all services (`a1111`, `replicate`, `stability`)
- Works with local `Stable Diffusion` models
- Works with any remote models on `Replicate` or `Stability AI`
- Create image prompts with LLMs for excellent results
- MIT license


## Install

Install `Imagine.js` from NPM:

```bash
npm install @themaximalist/imagine.js
```

For local models, ensure an Automatic1111 instance is running.

For remote models, make sure you have `REPLICATE_API_KEY` or `STABILITY_API_KEY` set in your environment variables.

```bash
export STABILITY_API_KEY=...
export REPLICATE_API_KEY=...
```

## Usage

`Imagine.js` takes a text prompt and returns an image buffer.

```javascript
const image = await Imagine("futuristic sci-fi city"); // image buffer
fs.writeFileSync("city.png", image);
```

The buffer can be saved to disk, written to a database, etc...

## Image Generators

Specify a different image generator service, `a1111`, `replicate` or `stability`.

```javascript
await Imagine("a red rose"); // defaults to a1111
await Imagine("a red rose", { service: "replicate"} );
await Imagine("a red rose", { service: "stability"} );
```

Making it easy to switch providers ensures you can try lots of combinations and prevent getting locked in!

## LLM Prompt

Running your prompt through an LLM first can produce great results. `Imagine.js` is easy to combine with [LLM.js](https://llmjs.themaximalist.com) to quickly remix and increase the quality of your prompts.

```javascript
const LLM = require("@themaximalist/llm.js");

const llm = new LLM();

llm.user(`You are an image remixing box.
Given a text prompt, return a remixed prompt with more detail about the properties and qualities of a scene.
Only return a single prompt.`);
llm.assistant("Ok got it. What is your prompt?");

const prompt = await llm.chat("a red rose");
// a dew-kissed red rose in the early morning light, its petals ...

const buffer = await Imagine(prompt);
fs.writeFileSync("rose.png", buffer);
```

You can run this over and over and iterate with the LLM and Image Model towards a better and better result. Check out [Images Bot](https://imagesbot.com) for a real-world example of this (it's open source).

## API

The `Imagine.js` API is a simple function you call with your text prompt, and an optional config object.


```javascript
await Imagine(
    input, // Text input for image generation
    {
        service: "stability", // Embedding service
        model: "stable-diffusion-xl-beta-v2-2-2", // Embedding model
        seed: 100, // Stabilize image generation
    }
);
```

**Options**

* **`service`** `<string>`: Image generation service provider. Default is `a111`, a local provider. Other providers are `stability` and `replicate`.
* **`model`** `<string>`: Image generation model. Default is `a111` with `Stable Diffusion`
* **`seed`** `<int>`: Stabilize image generation making it more deterministic. No default.

**Response**

`Imagine.js` returns an image `Buffer`. Typically you save this as a `png` file, which let's you view it.

```javascript
const buffer = await Imagine("a red rose");
fs.writeFileSync("rose.png", buffer);
```

The `Imagine.js` API ensures you have a simple way to use different image generators in the same interface.

## Debug

`Imagine.js` uses the `debug` npm module with the `imagine.js` namespace.

View debug logs by setting the `DEBUG` environment variable.

```bash
> DEBUG=imagine.js*
> node src/imagine_images.js
# debug logs
```



## Projects

`Imagine.js` is currently used in the following projects:

-   [AI.js](https://aijs.themaximalist.com) — simple AI library
-   [Infinity Arcade](https://infinityarcade.com) — play any text adventure game
-   [Images Bot](https://imagesbot.com) — image explorer

## License

MIT


## Author

Created by [The Maximalist](https://twitter.com/themaximal1st), see our [open-source projects](https://themaximalist.com/products).

