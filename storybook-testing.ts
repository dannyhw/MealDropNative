import WebSocket from "ws";
import Events from "@storybook/core/core-events";
import { toId } from "@storybook/csf";
// @ts-ignore
import { getMain } from "@storybook/react-native/scripts/loader.js";
import { normalizeStories } from "@storybook/core/common";
import * as glob from "glob";
import * as path from "path";
import * as fs from "fs";
import looksSame from "looks-same";
import { loadCsf } from "@storybook/csf-tools";
import { execSync } from "child_process";

const absolute = true;

const configPath = "./.storybook";

const mainImport = getMain({ configPath });
const main = mainImport.default ?? mainImport;
const storiesSpecifiers = normalizeStories(main.stories, {
  configDir: configPath,
  workingDir: process.cwd(),
});

function ensureRelativePathHasDot(relativePath: string) {
  return relativePath.startsWith(".") ? relativePath : `./${relativePath}`;
}

const storyPaths = storiesSpecifiers.reduce((acc, specifier) => {
  const paths = glob
    .sync(specifier.files, {
      cwd: path.resolve(process.cwd(), specifier.directory),
      absolute,
      // default to always ignore (exclude) anything in node_modules
      ignore: ["**/node_modules"],
    })
    .map((storyPath) => {
      const pathWithDirectory = path.join(specifier.directory, storyPath);
      const requirePath = absolute
        ? storyPath
        : ensureRelativePathHasDot(
            path.relative(configPath, pathWithDirectory),
          );

      const normalizePathForWindows = (str: string) =>
        path.sep === "\\" ? str.replace(/\\/g, "/") : str;

      return normalizePathForWindows(requirePath);
    });
  return [...acc, ...paths];
}, [] as string[]);

async function takeScreenshot(name: string) {
  execSync(
    `xcrun simctl io booted screenshot --type png screenshots/${name}.png`,
  );
}

async function GoThroughAllStories() {
  execSync("mkdir -p screenshots");
  execSync("mkdir -p screenshots-base");
  execSync("mkdir -p screenshots-diff");
  execSync("rm -rf screenshots-diff/*.png");

  // wait 500ms
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });

  const csfStories = storyPaths.map((storyPath) => {
    const code = fs.readFileSync(storyPath, { encoding: "utf-8" }).toString();
    return loadCsf(code, {
      fileName: storyPath,
      makeTitle: (userTitle) => userTitle,
    }).parse();
  });

  for await (const { meta, stories } of csfStories) {
    if (meta.title) {
      for await (const { name: storyName } of stories) {
        console.log("story", meta.title, storyName);

        const storyId = toId(meta.title, storyName);
        console.log("storyId", storyId);
        const doit = () =>
          new Promise((resolve) => {
            setTimeout(() => {
              console.log("emitting story", storyId, meta.title, storyName);

              ws.send(
                JSON.stringify({
                  type: "setCurrentStory",
                  args: [{ viewMode: "story", storyId: storyId }],
                }),
              );
              // delay 500ms
              setTimeout(async () => {
                await takeScreenshot(`${meta.title}-${storyName}`);
                resolve(true);
              }, 1000);
              resolve(true);
            }, 1000);
          });

        await doit();
      }
    }
  }

  console.log("done step 1");

  let failures: Array<{
    story: string;
    reference: string;
    current: string;
    diff: string;
  }> = [];

  console.log("start step 2");
  for await (const { meta, stories } of csfStories) {
    for await (const { name: storyName } of stories) {
      const file = `${meta.title}-${storyName}.png`;

      const reference = `screenshots/${file}`;
      const current = `screenshots-base/${file}`;
      const diff = `screenshots-diff/${file}`;

      console.log("file", file);

      try {
        const { equal } = await looksSame(current, reference);

        if (!equal) {
          await looksSame.createDiff({
            reference,
            current,
            diff,
            highlightColor: "#ff00ff", // color to highlight the differences
            strict: false, // strict comparsion
            tolerance: 2.5,
            antialiasingTolerance: 0,
            ignoreAntialiasing: true, // ignore antialising by default
            ignoreCaret: true, // ignore caret by default
          });

          failures.push({
            story: `${meta.title}-${storyName}`,
            reference,
            current,
            diff,
          });
        }
      } catch (error) {
        console.log("error", error);
        failures.push({
          story: `${meta.title}-${storyName}`,
          reference,
          current,
          diff,
        });
      }
    }
  }

  failures.forEach(({ story, ...others }) => {
    console.log(`${story} failed the test`, others);
  });

  process.exit(0);
}

const ws = new WebSocket("ws://localhost:7007");

ws.onopen = () => {
  console.log("connected");
  ws.send(
    JSON.stringify({
      type: "setCurrentStory",
      args: [{ viewMode: "story", storyId: "button--basic" }],
    }),
  );
  GoThroughAllStories();
};
