import { ValueLoader } from "../../util/value.loader";

type ToolsetsSF = {
  name: string;
  toolsets: any;
  as: string;
  properties?: any;
  initializer?: any;
};

type ToolsetsDefined = {
  toolsets: string;
  asset: string;
  as: string;
};

type ToolsetsSetup = {
  name: string;
  toolsets: string;
  properties?: any;
};

export const SFToolsetsLoader = {
  load: (collection: any[], baseDir: string): { defineds: ToolsetsDefined[]; setups: ToolsetsSetup[]; initializers: any[]; } => {
    return collection.reduce((result: { defineds: ToolsetsDefined[]; setups: ToolsetsSetup[]; initializers: any[]; }, each) => {
      const loaded: any = ValueLoader.dynamicLoad(each, baseDir);
      const data: ToolsetsSF = loaded.module || loaded;

      result.defineds.push(SFToolsetsLoader.defined(data));
      result.setups.push(SFToolsetsLoader.setup(data));

      if (data.initializer) {
        result.initializers.push(SFToolsetsLoader.initializer(data));
      }

      return result;
    }, { defineds: [], setups: [], initializers: [] });
  },
  defined: (data: ToolsetsSF): ToolsetsDefined => {
    return {
      toolsets: data.name,
      asset: data.toolsets,
      as: data.as
    };
  },
  setup: (data: ToolsetsSF): ToolsetsSetup => {
    const setup: ToolsetsSetup = {
      name: data.name,
      toolsets: data.name
    };

    if (data.properties) {
      setup.properties = data.properties;
    }

    return setup;
  },
  initializer: (data: ToolsetsSF): any => ({ as: data.as, initializer: data.initializer })
};

Object.freeze(SFToolsetsLoader);
