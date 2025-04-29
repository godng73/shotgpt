import express from "express";
import chokidar from "chokidar";
import path from "path";
import fs from 'fs';

import runGPT from "./run-gpt.js";

const app = express();
const PORT = 3000;

const SCREENSHOT_FOLDER = path.join(process.env.HOME, "Desktop");
console.log("Watching screenshots in:", SCREENSHOT_FOLDER);

const watcher = chokidar.watch(SCREENSHOT_FOLDER, {
  ignored: /^\./,
  persistent: true,
  ignoreInitial: true,
});

watcher.on("add", async (filePath) => {
  console.log("Screenshot detected:", filePath);
  const result = await runGPT(filePath);
  console.log(result);
  fs.unlinkSync(filePath)
  console.log("File Deleted: ", filePath)
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
