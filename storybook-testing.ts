import "websocket-polyfill";
import { createChannel } from "@storybook/channel-websocket";
import { addons } from "@storybook/addons";
import Events from "@storybook/core-events";
import { toId } from "@storybook/csf";
// @ts-ignore
import { getMain } from "@storybook/react-native/scripts/loader.js";
import { normalizeStories } from "@storybook/core-common";
import * as glob from "glob";
import * as path from "path";
import * as fs from "fs";
import looksSame from "looks-same";
import { loadCsf } from "@storybook/csf-tools";
import util from "util";

const exec: (s: string, f?: Function) => Promise<any> = util.promisify(
  require("child_process").exec
);

// // @ts-ignore
// global.__DEV__ = true;
// // @ts-ignore
// global.nativeExtensions = {};
// // @ts-ignore
// global.__turboModuleProxy = (name) => {
//   // console.log({ name });
//   if (name === "Appearance") {
//     return {
//       getColorScheme: () => "light",
//       addListener: (eventName: string) => {},
//       removeListeners: (count: number) => {},
//     };
//   }
//   if (name === "UIManager" || name === "PlatformConstants") {
//     return {
//       getConstants: () => ({}),
//     };
//   }
//   if (name === "DeviceInfo") {
//     return {
//       getConstants: () => ({
//         Dimensions: {
//           window: {
//             width: 375,
//             height: 812,
//             scale: 1,
//             fontScale: 1,
//           },
//         },
//       }),
//     };
//   }
//   return () => {};
// };
// // @ts-ignore
// global.RN$Bridgeless = false;

const secured = false;
const host = "localhost";
const port = 7007;
const domain = `${host}:${port}`;
const absolute = true;

const websocketType = secured ? "wss" : "ws";
let url = `${websocketType}://${domain}`;
const channel = createChannel({ url });

//@ts-ignore
addons.setChannel(channel);

channel.emit(Events.CHANNEL_CREATED, {
  host,
  port,
  secured,
});

const configPath = "./.storybook";

// const storyId = toId("storyKind", "storyName");
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
            path.relative(configPath, pathWithDirectory)
          );

      const normalizePathForWindows = (str: string) =>
        path.sep === "\\" ? str.replace(/\\/g, "/") : str;

      return normalizePathForWindows(requirePath);
    });
  return [...acc, ...paths];
}, [] as string[]);

async function takeScreenshot(name: string) {
  exec(
    `xcrun simctl io booted screenshot --type png screenshots/${name}.png`,
    (error: Error, stdout: string, stderr: string) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );
}

async function GoThroughAllStories() {
  await exec("mkdir -p screenshots");
  await exec("mkdir -p screenshots-base");
  await exec("mkdir -p screenshots-diff");
  await exec("rm -rf screenshots-diff/*.png");

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

        const doit = () =>
          new Promise((resolve) => {
            setTimeout(() => {
              console.log("emitting story", storyId, meta.title, storyName);
              channel.emit(Events.SET_CURRENT_STORY, { storyId });

              // delay 500ms
              setTimeout(async () => {
                await takeScreenshot(`${meta.title}-${storyName}`);
                resolve(true);
              }, 1000);
            }, 1000);
          });

        await doit();
      }
    }
  }

  let failures: Array<{
    story: string;
    reference: string;
    current: string;
    diff: string;
  }> = [];

  for await (const { meta, stories } of csfStories) {
    for await (const { name: storyName } of stories) {
      const file = `${meta.title}-${storyName}.png`;

      const reference = `screenshots/${file}`;
      const current = `screenshots-base/${file}`;
      const diff = `screenshots-diff/${file}`;

      console.log("file", file);

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
    }
  }

  failures.forEach(({ story, ...others }) => {
    console.log(`${story} failed the test`, others);
  });

  process.exit(0);
}

GoThroughAllStories();
