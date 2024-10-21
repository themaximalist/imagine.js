
import assert from "assert";
import Imagine from "../src/index.js";

import fs from "fs";

describe("imagine", function () {
    this.timeout(30000);
    this.slow(15000);

    it("replicate", async function () {
        const buffer = await Imagine("a butterfly", { service: Imagine.REPLICATE });
        assert(buffer instanceof Buffer);
        assert(buffer.length > 0);
        fs.writeFileSync("test.png", buffer);
    });

    it("stability", async function () {
        const buffer = await Imagine("a futuristic car", { service: Imagine.STABILITY });
        assert(buffer instanceof Buffer);
        assert(buffer.length > 0);
        fs.writeFileSync("test.png", buffer);
    });

    // it("a1111", async function () {
    //     const buffer = await Imagine("a red rose", { service: Imagine.A1111 });
    //     assert(buffer instanceof Buffer);
    //     assert(buffer.length > 0);
    //     // fs.writeFileSync("test.png", buffer);
    // });
});

// TODO: seed