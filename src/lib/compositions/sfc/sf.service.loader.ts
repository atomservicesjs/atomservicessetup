import { ValueLoader } from "../../util/value.loader";

type ServiceSF = {
  name: string;
  service: Function;
  as?: string;
  properties?: any;
  publish?: {
    topic: string;
    type: string;
    quality?: string;
    as?: string;
  }[];
  subscribe?: {
    topic: string;
    type: string;
    quality?: string;
  }[];
  initializer?: any;
};

type ServiceDefined = Function;

type ServiceSetup = {
  name: string;
  service: string;
  as?: string;
  properties?: any;
  channels: {
    publish?: {
      topic: string;
      natures: {
        type: string;
        quality?: string;
        as?: string;
      }[];
    }[];
    subscribe?: {
      topic: string;
      natures: {
        type: string;
        quality?: string;
      }[];
    }[];
  };
};

export const SFServiceLoader = {
  load: (collection: any[], baseDir: string): { defineds: ServiceDefined[]; setups: ServiceSetup[]; initializers: any[]; } => {
    return collection.reduce((result: { defineds: ServiceDefined[]; setups: ServiceSetup[]; initializers: any[] }, each) => {
      const loaded: any = ValueLoader.dynamicLoad(each, baseDir);
      const data: ServiceSF = loaded.module || loaded;

      result.defineds.push(SFServiceLoader.defined(data));
      result.setups.push(SFServiceLoader.setup(data));

      if (data.initializer) {
        result.initializers.push(SFServiceLoader.initializer(data));
      }

      return result;
    }, { defineds: [], setups: [], initializers: [] });
  },
  defined: (data: ServiceSF): ServiceDefined => data.service,
  setup: (data: ServiceSF): ServiceSetup => {
    const setup: ServiceSetup = {
      name: data.name,
      service: data.service.name,
      channels: {},
    };

    if (data.as) {
      setup.as = data.as;
    }

    if (data.properties) {
      setup.properties = data.properties;
    }

    if (data.publish) {
      const reduced = data.publish.reduce((result, each) => {
        const nature = each.as ? { type: each.type, quality: each.quality, as: each.as } : { type: each.type, quality: each.quality };

        if (result[each.topic]) {
          result[each.topic].natures.push(nature);
        } else {
          result[each.topic] = { natures: [nature] };
        }

        return result;
      }, {} as { [topic: string]: { natures: { type: string; quality: string; as?: string }[]; }; });

      setup.channels.publish = Object.keys(reduced).map(topic => ({ topic, natures: reduced[topic].natures }));
    }

    if (data.subscribe) {
      const reduced = data.subscribe.reduce((result, each) => {
        const nature = { type: each.type, quality: each.quality };

        if (result[each.topic]) {
          result[each.topic].natures.push(nature);
        } else {
          result[each.topic] = { natures: [nature] };
        }

        return result;
      }, {} as { [topic: string]: { natures: { type: string; quality: string; }[]; }; });

      setup.channels.subscribe = Object.keys(reduced).map(topic => ({ topic, natures: reduced[topic].natures }));
    }

    return setup;
  },
  initializer: (data: ServiceSF): any => ({ as: data.as, initializer: data.initializer })
};

Object.freeze(SFServiceLoader);
