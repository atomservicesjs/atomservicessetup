import { Common } from "./common";
import { CompositionType } from "./compositions/composition.type";
import { CompositionSetupLoader } from "./composition.setup.loader";

export const ModularSetupLoader = {
  load: (val: any, base: any) => {
    const { setup, baseDir } = Common.load(val, base);

    return ModularSetupLoader.resolveSetup(setup, baseDir);
  },
  resolveSetup: (modularSetup: { name: string; services?: any; toolsets?: any; }, baseDir: string) => {
    if (modularSetup.services) {
      modularSetup.services = CompositionSetupLoader.load(modularSetup.services, baseDir, CompositionType.Services);
    }

    if (modularSetup.toolsets) {
      modularSetup.toolsets = CompositionSetupLoader.load(modularSetup.toolsets, baseDir, CompositionType.Toolsets);
    }

    return modularSetup;
  }
};

Object.freeze(ModularSetupLoader);
