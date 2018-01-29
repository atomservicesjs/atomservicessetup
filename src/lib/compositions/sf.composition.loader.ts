import { Common } from "../common";
import { SFServiceLoader, SFToolsetsLoader } from "./sfc";
import { CompositionType } from "./composition.type";

export const SFCompositionLoader = {
  load: (val: any, base: any, type: CompositionType) => {
    const { setup, baseDir } = Common.load(val, base);
    if (type === CompositionType.Services) {
      return SFServiceLoader.load(setup, baseDir);
    } else {
      return SFToolsetsLoader.load(setup, baseDir);
    }
  },
};

Object.freeze(SFCompositionLoader);
