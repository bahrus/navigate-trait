export type dataConverter = (s: string) => any;
export type dataTest = (t: any) => boolean;
export type PinnedVal = [pinnedVal: symbol | undefined];
export type PinnedValDataConverter = [pinnedVal: symbol | undefined, dataConverter: dataConverter | undefined];
export type PinnedValDataConverterTest = [pinnedVal: symbol | undefined, dataConverter: dataConverter | undefined, test: dataTest | undefined];
export type RouteMappingRule = 
    PinnedVal 
    | PinnedValDataConverter 
    | PinnedValDataConverterTest 
    | [pinnedVal: Symbol | undefined, dataConverter: dataConverter | undefined, test: dataTest | undefined, subMapRule: RouteMappingRules | undefined];
export type RouteMappingRules = {[key: string]: RouteMappingRule | RouteMappingRules};

export type HistoryStateMappings = {[key: string]: string | symbol | HistoryStateMappings};

export interface RouteContext{
    pinnedData: any;
    link: HTMLAnchorElement;
    state: any;
}