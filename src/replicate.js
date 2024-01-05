import debug from "debug";
const log = debug("imagine.js:replicate");

import Client from "replicate";
import fetch from "node-fetch";

const MODEL = "stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf";

let replicate = null;
export default async function Replicate(prompt_text, options = {}) {
    if (!replicate) { replicate = new Client({ auth: process.env.REPLICATE_API_KEY, fetch }); }
    if (!options) options = {};
    if (!options.model) options.model = MODEL;

    try {
        log(`hitting replicate API (model=${options.model})`);
        const input = {
            image_dimensions: "512x512",
            scheduler: "K_EULER",
            num_outputs: 1,
            prompt: prompt_text,
        }

        if (typeof options.seed !== "undefined") input.seed = options.seed;

        const output = await replicate.run(`stability-ai/${options.model}`, { input });

        const remote_image_url = output[0];
        log(`generated replicate image url ${remote_image_url}`);

        const response = await fetch(remote_image_url);
        return await response.buffer();
    } catch (e) {
        log(`error running replicate generate: ${e}`);
        return null;
    }
}