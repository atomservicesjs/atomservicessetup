import * as Path from "path";
import { ValueLoader } from "./util/value.loader";

export const Common = {
  load: (val: any, base?: string) => {
    const loaded = ValueLoader.dynamicLoad(val, base);
    if (loaded.module) {
      const baseDir = Path.dirname(loaded.file);
      const setup = loaded.module;

      return { setup, baseDir };
    } else {
      return { setup: loaded, baseDir: base };
    }
  }
};

Object.freeze(Common);
