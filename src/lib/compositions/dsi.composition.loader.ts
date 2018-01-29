import { Common } from "../common";
import { ValueLoader } from "../util/value.loader";

export const DSICompositionLoader = {
  load: (val: any, base: any) => {
    const { setup, baseDir } = Common.load(val, base);

    return DSICompositionLoader.resolveSetup(setup, baseDir);
  },
  resolveSetup: (compositionSetup: any[], baseDir: string) => {
    return compositionSetup.map(each => {
      const loaded = ValueLoader.dynamicLoad(each, baseDir);
      return loaded.module || loaded;
    });
  }
};

Object.freeze(DSICompositionLoader);
