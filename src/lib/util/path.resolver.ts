import { AppEnv } from "archappenv";
import * as FS from "fs";
import * as Path from "path";

export const PathResolver = {
  absoluteFile: (val: string, base?: string) => {
    let absolute;

    if (Path.isAbsolute(val)) {
      absolute = val;
    } else {
      val = base ? Path.join(base, val) : val;
      absolute = AppEnv.Util.resolveFile(val);
    }

    let fstat;

    try {
      fstat = FS.statSync(absolute);
    }
    catch (error) {
      absolute = `${absolute}.js`;
      fstat = FS.statSync(absolute);
    }

    if (fstat.isDirectory()) {
      return Path.join(absolute, "index.js");
    } else {
      return absolute;
    }
  },
  moduleFile: (val: string, base?: string) => {
    const modupath = Path.join(AppEnv.Util.packagePath(), "node_modules", val);
    const modupkgfile = Path.join(modupath, "package.json");
    const modupkg = require(modupkgfile);
    const modufile = Path.join(modupath, modupkg.main);

    return PathResolver.absoluteFile(modufile);
  },
};

Object.freeze(PathResolver);
