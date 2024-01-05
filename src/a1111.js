import debug from "debug";
const log = debug("imagine.js:a1111");

import fetch from "node-fetch";

const ENDPOINT = "http://127.0.0.1:7860/sdapi/v1/txt2img";

export default async function Automatic1111(input, options) {
    const body = {
        prompt: input,
    };

    if (typeof options.seed !== "undefined") body.seed = options.seed;

    log(`hitting a1111 API ${JSON.stringify(options)}`);

    try {
        const response = await fetch(
            ENDPOINT,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(body),
            }
        );

        if (!response.ok) {
            throw new Error(`invalid response: ${await response.text()}`)
        }

        const data = await response.json();
        if (!data || data.images.length !== 1) {
            throw new Error(`invalid response: ${data}`);
        }

        return Buffer.from(data.images[0], "base64");
    } catch (e) {
        log(`error running a1111 generate: ${e}`);
        return null
    }


}

/*
import { DiffusionPipeline } from '@aislamov/diffusers.js'
import { PNG } from 'pngjs'

async function main() {
    const pipe = await DiffusionPipeline.fromPretrained('aislamov/stable-diffusion-2-1-base-onnx')
    console.log(pipe);
    const images = pipe.run({
        prompt: "an astronaut running a horse",
        numInferenceSteps: 30,
    })

    const data = await images[0].mul(255).round().clipByValue(0, 255).transpose(0, 2, 3, 1)

    const p = new PNG({ width: 512, height: 512, inputColorType: 2 })
    p.data = Buffer.from(data.data)
    p.pack().pipe(fs.createWriteStream('output.png')).on('finish', () => {
        console.log('Image saved as output.png');
    })
}
main();
*/