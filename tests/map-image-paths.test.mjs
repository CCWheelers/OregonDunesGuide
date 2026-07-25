import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("map detail photos work in both root and generated public layouts", async () => {
  const source = await readFile(new URL("static/site.js", root), "utf8");
  const maps = await readFile(new URL("maps.html", root), "utf8");

  assert.match(source, /rootUsesPublicPrefix/);
  assert.match(source, /publicPath/);
  assert.match(source, /hostedPath/);
  assert.match(source, /detail\.style\.backgroundImage=/);
  assert.match(maps, /static\/site\.js\?v=22/);

  const florencePhoto = await stat(
    new URL("public/images/hero-guide-towns.webp", root),
  );
  assert.ok(florencePhoto.size > 0);
});
