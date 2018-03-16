export namespace SetupFile {
  export type AtomApplication = {
    [key: string]: any;
    name: string;
    modulars?: { [name: string]: string; } | (string | { type: string; module: string; as?: string; })[];
    dynamicProperties?: { [name: string]: any; };
    eventsContext?: {
      esHandlers?: {
        es?: Function[];
      };
      eventsHandlers?: {
        [eventName: string]: Function[];
        any?: Function[];
        error?: Function[];
      };
    };
    lifecycle?: {
      beforeCreate?: Function;
      created?: Function;
      beforeSetupModular?: Function;
      setupModular?: Function;
      beforeMount?: Function;
      mounted?: Function;
      initiating?: Function;
    };
  };

  export type AtomModular = {
    [key: string]: any;
    name: string;
    services?: string | { type: string; module: string; };
    toolsets?: string | { type: string; module: string; };
    initiate?: string[];
    lifecycle?: {
      beforeCreate?: Function;
      created?: Function;
      initiating?: Function;
    };
  };

  export type AtomCompositions = {
    defineds?: string | { type: string; module: string; };
    setups?: string | { type: string; module: string; };
    initializers?: string | { type: string; module: string; };
    sfc?: CompositionType;
  };

  export type CompositionType = (string | { type: string; module: string; })[];
}
