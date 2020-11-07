export type dataConverter = (s: string) => any;
export type dataTest = (t: any) => boolean;
export type PinnedVal = [pinnedVal: Symbol | undefined];
export type PinnedValDataConverter = [pinnedVal: Symbol | undefined, dataConverter: dataConverter | undefined];
export type PinnedValDataConverterTest = [pinnedVal: Symbol | undefined, dataConverter: dataConverter | undefined, test: dataTest | undefined];
export type RouteMappingRule = 
    PinnedVal 
    | PinnedValDataConverter 
    | PinnedValDataConverterTest 
    | [pinnedVal: Symbol | undefined, dataConverter: dataConverter | undefined, test: dataTest | undefined, subMapRule: RouteMappingRules | undefined];
export type RouteMappingRules = {[key: string]: RouteMappingRule};

export type HistoryStateMappings = {[key: string]: string | symbol | HistoryStateMappings};