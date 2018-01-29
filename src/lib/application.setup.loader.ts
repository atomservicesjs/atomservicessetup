import { AppEnv } from "archappenv";
import { Common } from "./common";
import { ModularSetupLoader } from "./modular.setup.loader";

const AtomAppFile = "atom.app.js";

export const ApplicationSetupLoader = {
  load: (val?: any, base?: string) => {
    val = val || ApplicationSetupLoader.findAppFile(base);

    const { setup, baseDir } = Common.load(val, base);

    return ApplicationSetupLoader.resolveSetup(setup, baseDir);
  },
  resolveSetup: (appSetup: { [k: string]: any, name: string; modulars?: any[] }, baseDir: string) => {
    if (Array.isArray(appSetup.modulars)) {
      appSetup.modulars = appSetup.modulars.map(each => {
        const loaded = ModularSetupLoader.load(each, baseDir);
        loaded.name = each.as || loaded.name;
        return loaded;
      });

      return appSetup;
    } else {
      const definedProperties = ["name"];

      appSetup = Object.keys(appSetup).reduce((result, key) => {
        if (definedProperties.indexOf(key) == -1) {
          const loaded = ModularSetupLoader.load(appSetup[key], baseDir);
          loaded.name = key;
          result.modulars.push(loaded);
        } else {
          result[key] = appSetup[key];
        }
        return result;
      }, { modulars: [] } as any);

      return appSetup;
    }
  },
  findAppFile: (baseDir?: string) => {
    const files = AppEnv.Util.findFilePaths(AtomAppFile, baseDir);

    if (files.length == 1) {
      return files[0];
    } else if (files.length === 0) {
      throw new Error("FOUND NO APPLICATION SETUP FILES (atom.app.js)");
    } else {
      throw new Error("FOUND MULTIPLE APPLICATION SETUP FILES (atom.app.js)");
    }
  }
};

Object.freeze(ApplicationSetupLoader);
