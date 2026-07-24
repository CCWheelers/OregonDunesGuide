import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const publicDir = join(root, "public");
const staticSource = join(root, "static");
const staticTarget = join(publicDir, "static");

await mkdir(staticTarget, { recursive: true });

for (const entry of await readdir(root, { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
  const source = await readFile(join(root, entry.name), "utf8");
  const hosted = source.replace(
    /(content|href|src)="public\//g,
    '$1="/',
  );
  await writeFile(join(publicDir, entry.name), hosted, "utf8");
}

for (const entry of await readdir(staticSource, { withFileTypes: true })) {
  if (!entry.isFile()) continue;
  const sourcePath = join(staticSource, entry.name);
  const targetPath = join(staticTarget, entry.name);
  if (entry.name.endsWith(".css")) {
    const css = await readFile(sourcePath, "utf8");
    await writeFile(targetPath, css.replaceAll("../public/", "../"), "utf8");
  } else {
    await copyFile(sourcePath, targetPath);
  }
}
