import { AppEnv } from "archappenv";
import { Common } from "./common";
import { SetupFile } from "./setupfile";
import { ModularSetupLoader } from "./modular.setup.loader";

const AtomAppFile = "atom.app.js";

export const ApplicationSetupLoader = {
  load: (val?: any, base?: string) => {
    val = val || ApplicationSetupLoader.findAppFile(base);

    const { setup, baseDir } = Common.load(val, base);

    return ApplicationSetupLoader.resolveSetup(setup, baseDir);
  },
  resolveSetup: (appSetup: SetupFile.AtomApplication, baseDir: string) => {
    if (appSetup.modulars) {
      let _modulars: any[];

      if (Array.isArray(appSetup.modulars)) {
        _modulars = appSetup.modulars.map(each => {
          const loaded = ModularSetupLoader.load(each, baseDir);

          if (typeof each !== "string") {
            loaded.name = each.as || loaded.name;
          }

          return loaded;
        });
      } else {
        _modulars = Object.keys(appSetup.modulars).reduce((result: any[], key) => {
          const loaded = ModularSetupLoader.load((appSetup.modulars as { [name: string]: string; })[key], baseDir);
          loaded.name = key;
          result.push(loaded);

          return result;
        }, []);
      }

      appSetup.modulars = _modulars;
    } else {
      appSetup.modulars = [];
    }

    return appSetup;
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
