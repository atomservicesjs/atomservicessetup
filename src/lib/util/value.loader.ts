import * as FS from "fs";
import * as Path from "path";
import { PathResolver } from "./path.resolver";
const CloneDeep = require("lodash.clonedeep");

export const ValueLoader = {
  resolveType: (v: any) => {
    if (typeof v === "string") {
      return "StringLoader";
    } else if (typeof v === "object" && typeof v.type === "string" && typeof v.module === "string") {
      return "ModuleLoader";
    } else {
      return "PlainLoader";
    }
  },
  dynamicLoad: (val: any, base?: string) => {
    const type = ValueLoader.resolveType(val);
    const loader: any = ValueLoader[type];

    return loader(val, base);
  },
  StringLoader: (val: string, base: string) => {
    const absfile = PathResolver.absoluteFile(val, base);
    const loaded = CloneDeep(require(absfile));

    return { file: absfile, module: loaded };
  },
  ModuleLoader: (val: { type: string; module: string }, base: string) => {
    let absfile;

    if (val.type === "file") {
      absfile = PathResolver.absoluteFile(val.module, base);
    } else if (val.type === "module") {
      absfile = PathResolver.moduleFile(val.module, base);
    } else {
      throw new Error(`INVALID TYPE on 'ModuleLoader': ${val.type}`);
    }

    const loaded = CloneDeep(require(absfile));

    return { file: absfile, module: loaded };
  },
  PlainLoader: (val: any, base: any) => val,
};

Object.freeze(ValueLoader);
