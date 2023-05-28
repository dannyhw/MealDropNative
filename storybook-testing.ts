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
const looksSame = require("looks-same");
import { exec } from "child_process";

// @ts-ignore
global.__DEV__ = true;
// @ts-ignore
global.nativeExtensions = {};
// @ts-ignore
global.__turboModuleProxy = (name) => {
  // console.log({ name });
  if (name === "Appearance") {
    return {
      getColorScheme: () => "light",
      addListener: (eventName: string) => {},
      removeListeners: (count: number) => {},
    };
  }
  if (name === "UIManager" || name === "PlatformConstants") {
    return {
      getConstants: () => ({}),
    };
  }
  if (name === "DeviceInfo") {
    return {
      getConstants: () => ({
        Dimensions: {
          window: {
            width: 375,
            height: 812,
            scale: 1,
            fontScale: 1,
          },
        },
      }),
    };
  }
  return () => {};
};
// @ts-ignore
global.RN$Bridgeless = false;

const secured = false;
const host = "localhost";
const port = 7007;
const domain = `${host}:${port}`;
const absolute = true;

// const { secured, host, port } = options;
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

console.log(storyPaths);

function takeScreenshot(name: string) {
  exec(
    `mkdir -p screenshots && xcrun simctl io booted screenshot screenshots/${name}.png`,
    (error, stdout, stderr) => {
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
  for await (const storyPath of storyPaths) {
    const { default: mainExport, ...others } = require(storyPath);

    const storyKeys = Object.keys(others);

    console.log({ mainExport, others: Object.keys(others) });
    console.log("storykind", mainExport.title);
    if (mainExport.title) {
      for await (const storyKey of storyKeys) {
        console.log("story", mainExport.title, storyKey);

        const storyId = toId(mainExport.title, storyKey);

        const doit = () =>
          new Promise((resolve) => {
            setTimeout(() => {
              console.log(
                "emitting story",
                storyId,
                mainExport.title,
                storyKey
              );
              channel.emit(Events.SET_CURRENT_STORY, { storyId });

              // delay 500ms
              setTimeout(() => {
                takeScreenshot(`${mainExport.title}-${storyKey}`);
                resolve(true);
              }, 500);
            }, 2000);
          });

        await doit();
      }
    }
  }

  for await (const storyPath of storyPaths) {
    const { default: mainExport, ...others } = require(storyPath);

    const storyKeys = Object.keys(others);
    for await (const storyKey of storyKeys) {
      const file = `${mainExport.title}-${storyKey}.png`;
      await looksSame.createDiff({
        reference: `screenshots/${file}`,
        current: `screenshots-base/${file}`,
        diff: `screenshots-diff/${file}`,
        highlightColor: "#ff00ff", // color to highlight the differences
        strict: false, // strict comparsion
        tolerance: 2.5,
        antialiasingTolerance: 0,
        ignoreAntialiasing: true, // ignore antialising by default
        ignoreCaret: true, // ignore caret by default
      });
    }
  }

  process.exit(0);
}

GoThroughAllStories();
