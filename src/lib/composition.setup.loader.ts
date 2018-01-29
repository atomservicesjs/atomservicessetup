import { Common } from "./common";
import { CompositionType, DSICompositionLoader, SFCompositionLoader } from "./compositions";

export const CompositionSetupLoader = {
  load: (val: any, base: any, type?: CompositionType) => {
    const { setup, baseDir } = Common.load(val, base);

    return CompositionSetupLoader.resolveSetup(setup, baseDir, type);
  },
  resolveSetup: (compositionSetup: { defineds?: any; setups?: any; initializers?: any; sfc?: any; }, baseDir: string, type: CompositionType) => {
    const dsi: { defineds: any[]; setups: any[]; initializers: any[]; } = { defineds: [], setups: [], initializers: [] };

    if (compositionSetup.defineds) {
      dsi.defineds = [...dsi.defineds, ...DSICompositionLoader.load(compositionSetup.defineds, baseDir)];
    }

    if (compositionSetup.setups) {
      dsi.setups = [...dsi.setups, ...DSICompositionLoader.load(compositionSetup.setups, baseDir)];
    }

    if (compositionSetup.initializers) {
      dsi.initializers = [...dsi.initializers, ...DSICompositionLoader.load(compositionSetup.initializers, baseDir)];
    }

    if (compositionSetup.sfc) {
      const { defineds, setups, initializers } = SFCompositionLoader.load(compositionSetup.sfc, baseDir, type);
      dsi.defineds = [...dsi.defineds, ...defineds];
      dsi.setups = [...dsi.setups, ...setups];
      dsi.initializers = [...dsi.initializers, ...initializers];
    }

    return dsi;
  }
};

Object.freeze(CompositionSetupLoader);
