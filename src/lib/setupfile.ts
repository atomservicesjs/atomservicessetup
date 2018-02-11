export namespace SetupFile {
  export type AtomApplication = {
    [key: string]: any;
    name: string;
    modulars?: { [name: string]: string; } | (string | { type: string; module: string; as?: string; })[];
  };

  export type AtomModular = {
    [key: string]: any;
    name: string;
    services?: string | { type: string; module: string; };
    toolsets?: string | { type: string; module: string; };
    initiate?: string[];
  };

  export type AtomCompositions = {
    defineds?: string | { type: string; module: string; };
    setups?: string | { type: string; module: string; };
    initializers?: string | { type: string; module: string; };
    sfc?: CompositionType;
  };

  export type CompositionType = (string | { type: string; module: string; })[];
}
