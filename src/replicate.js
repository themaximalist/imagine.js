import debug from "debug";
const log = debug("imagine.js:replicate");

import Client from "replicate";
import fetch from "node-fetch";

const MODEL = "black-forest-labs/flux-schnell";

let replicate = null;
export default async function Replicate(prompt_text, options = {}) {
    if (!replicate) { replicate = new Client({ auth: process.env.REPLICATE_API_KEY, fetch }); }
    if (!options) options = {};
    if (!options.model) options.model = MODEL;
    if (!options.width) options.width = 1024;
    if (!options.height) options.height = 1024;
    // if (!options.scheduler) options.scheduler = "DPMSolver++";
    if (!options.num_outputs) options.num_outputs = 1;

    // if (!options.guidance_scale) options.guidance_scale = 3;
    // if (!options.apply_watermark) options.apply_watermark = true;
    // if (!options.prompt_strength) options.prompt_strength = 0.8;
    // if (!options.num_inference_steps) options.num_inference_steps = 25;

    options.prompt = prompt_text;

    const model = options.model;
    delete options.model;

    try {
        log(`hitting replicate API (model=${model})`);
        const input = options;

        if (typeof options.seed !== "undefined") input.seed = options.seed;

        const output = await replicate.run(model, { input });

        const remote_image_url = output[0];
        log(`generated replicate image url ${remote_image_url}`);

        const response = await fetch(remote_image_url);
        return await response.buffer();
    } catch (e) {
        log(`error running replicate generate: ${e}`);
        return null;
    }
}