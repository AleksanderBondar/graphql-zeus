/* eslint-disable */

type ZEUS_INTERFACES = GraphQLTypes["Nameable"]
type ZEUS_UNIONS = GraphQLTypes["ChangeCard"]

export type ValueTypes = {
    /** Card used in card game<br> */
["Card"]: AliasType<{
	/** The attack power<br> */
	Attack?:true,
	/** <div>How many children the greek god had</div> */
	Children?:true,
	/** The defense power<br> */
	Defense?:true,
attack?: [{	/** Attacked card/card ids<br> */
	cardID:string[]},ValueTypes["Card"]],
	/** Put your description here */
	cardImage?:ValueTypes["S3Object"],
	/** Description of a card<br> */
	description?:true,
	id?:true,
	image?:true,
	/** The name of a card<br> */
	name?:true,
	skills?:true,
		__typename?: true
}>;
	["ChangeCard"]: AliasType<{		["...on SpecialCard"] : ValueTypes["SpecialCard"],
		["...on EffectCard"] : ValueTypes["EffectCard"]
		__typename?: true
}>;
	/** Stack of cards */
["CardStack"]: AliasType<{
	cards?:ValueTypes["Card"],
	name?:true,
		__typename?: true
}>;
	/** Aws S3 File */
["S3Object"]: AliasType<{
	bucket?:true,
	key?:true,
	region?:true,
		__typename?: true
}>;
	["Query"]: AliasType<{
cardById?: [{	cardId?:string},ValueTypes["Card"]],
	/** Draw a card<br> */
	drawCard?:ValueTypes["Card"],
	drawChangeCard?:ValueTypes["ChangeCard"],
	/** list All Cards availble<br> */
	listCards?:ValueTypes["Card"],
	myStacks?:ValueTypes["CardStack"],
	nameables?:ValueTypes["Nameable"],
		__typename?: true
}>;
	["Nameable"]:AliasType<{
		name?:true;
		['...on Card']?: Omit<ValueTypes["Card"],keyof ValueTypes["Nameable"]>;
		['...on CardStack']?: Omit<ValueTypes["CardStack"],keyof ValueTypes["Nameable"]>;
		['...on SpecialCard']?: Omit<ValueTypes["SpecialCard"],keyof ValueTypes["Nameable"]>;
		['...on EffectCard']?: Omit<ValueTypes["EffectCard"],keyof ValueTypes["Nameable"]>;
		__typename?: true
}>;
	["SpecialSkills"]:SpecialSkills;
	["SpecialCard"]: AliasType<{
	effect?:true,
	name?:true,
		__typename?: true
}>;
	["EffectCard"]: AliasType<{
	effectSize?:true,
	name?:true,
		__typename?: true
}>;
	["Mutation"]: AliasType<{
addCard?: [{	card:ValueTypes["createCard"]},ValueTypes["Card"]],
		__typename?: true
}>;
	/** create card inputs<br> */
["createCard"]: {
	/** The attack power<br> */
	Attack:number,
	/** The defense power<br> */
	Defense:number,
	/** input skills */
	skills?:ValueTypes["SpecialSkills"][],
	/** The name of a card<br> */
	name:string,
	/** Description of a card<br> */
	description:string,
	/** <div>How many children the greek god had</div> */
	Children?:number
}
  }

export type ModelTypes = {
    /** Card used in card game<br> */
["Card"]: {
		/** The attack power<br> */
	Attack:number,
	/** <div>How many children the greek god had</div> */
	Children?:number,
	/** The defense power<br> */
	Defense:number,
	/** Attack other cards on the table , returns Cards after attack<br> */
	attack?:ModelTypes["Card"][],
	/** Put your description here */
	cardImage?:ModelTypes["S3Object"],
	/** Description of a card<br> */
	description:string,
	id:string,
	image:string,
	/** The name of a card<br> */
	name:string,
	skills?:ModelTypes["SpecialSkills"][]
};
	["ChangeCard"]:ModelTypes["SpecialCard"] | ModelTypes["EffectCard"];
	/** Stack of cards */
["CardStack"]: {
		cards?:ModelTypes["Card"][],
	name:string
};
	/** Aws S3 File */
["S3Object"]: {
		bucket:string,
	key:string,
	region:string
};
	["Query"]: {
		cardById?:ModelTypes["Card"],
	/** Draw a card<br> */
	drawCard:ModelTypes["Card"],
	drawChangeCard:ModelTypes["ChangeCard"],
	/** list All Cards availble<br> */
	listCards:ModelTypes["Card"][],
	myStacks?:ModelTypes["CardStack"][],
	nameables:ModelTypes["Nameable"][]
};
	["Nameable"]: ModelTypes["Card"] | ModelTypes["CardStack"] | ModelTypes["SpecialCard"] | ModelTypes["EffectCard"];
	["SpecialSkills"]: GraphQLTypes["SpecialSkills"];
	["SpecialCard"]: {
		effect:string,
	name:string
};
	["EffectCard"]: {
		effectSize:number,
	name:string
};
	["Mutation"]: {
		/** add Card to Cards database<br> */
	addCard:ModelTypes["Card"]
};
	/** create card inputs<br> */
["createCard"]: GraphQLTypes["createCard"]
    }

export type GraphQLTypes = {
    /** Card used in card game<br> */
["Card"]: {
	__typename: "Card",
	/** The attack power<br> */
	Attack:number,
	/** <div>How many children the greek god had</div> */
	Children?:number,
	/** The defense power<br> */
	Defense:number,
	/** Attack other cards on the table , returns Cards after attack<br> */
	attack?:GraphQLTypes["Card"][],
	/** Put your description here */
	cardImage?:GraphQLTypes["S3Object"],
	/** Description of a card<br> */
	description:string,
	id:string,
	image:string,
	/** The name of a card<br> */
	name:string,
	skills?:GraphQLTypes["SpecialSkills"][]
};
	["ChangeCard"]:{
	['...on SpecialCard']: '__union' & GraphQLTypes["SpecialCard"];
	['...on EffectCard']: '__union' & GraphQLTypes["EffectCard"];
};
	/** Stack of cards */
["CardStack"]: {
	__typename: "CardStack",
	cards?:GraphQLTypes["Card"][],
	name:string
};
	/** Aws S3 File */
["S3Object"]: {
	__typename: "S3Object",
	bucket:string,
	key:string,
	region:string
};
	["Query"]: {
	__typename: "Query",
	cardById?:GraphQLTypes["Card"],
	/** Draw a card<br> */
	drawCard:GraphQLTypes["Card"],
	drawChangeCard:GraphQLTypes["ChangeCard"],
	/** list All Cards availble<br> */
	listCards:GraphQLTypes["Card"][],
	myStacks?:GraphQLTypes["CardStack"][],
	nameables:GraphQLTypes["Nameable"][]
};
	["Nameable"]: {
	__typename:"Card" | "CardStack" | "SpecialCard" | "EffectCard"
	name:string
	['...on Card']: '__union' & GraphQLTypes["Card"];
	['...on CardStack']: '__union' & GraphQLTypes["CardStack"];
	['...on SpecialCard']: '__union' & GraphQLTypes["SpecialCard"];
	['...on EffectCard']: '__union' & GraphQLTypes["EffectCard"];
};
	["SpecialSkills"]: SpecialSkills;
	["SpecialCard"]: {
	__typename: "SpecialCard",
	effect:string,
	name:string
};
	["EffectCard"]: {
	__typename: "EffectCard",
	effectSize:number,
	name:string
};
	["Mutation"]: {
	__typename: "Mutation",
	/** add Card to Cards database<br> */
	addCard:GraphQLTypes["Card"]
};
	/** create card inputs<br> */
["createCard"]: {
		/** The attack power<br> */
	Attack:number,
	/** The defense power<br> */
	Defense:number,
	/** input skills */
	skills?:GraphQLTypes["SpecialSkills"][],
	/** The name of a card<br> */
	name:string,
	/** Description of a card<br> */
	description:string,
	/** <div>How many children the greek god had</div> */
	Children?:number
}
    }
export enum SpecialSkills {
	THUNDER = "THUNDER",
	RAIN = "RAIN",
	FIRE = "FIRE"
}
export class GraphQLError extends Error {
    constructor(public response: GraphQLResponse) {
      super("");
      console.error(response);
    }
    toString() {
      return "GraphQL Response Error";
    }
  }


export type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;
export type ZeusState<T extends (...args: any[]) => Promise<any>> = NonNullable<
  UnwrapPromise<ReturnType<T>>
>;
export type ZeusHook<
  T extends (
    ...args: any[]
  ) => Record<string, (...args: any[]) => Promise<any>>,
  N extends keyof ReturnType<T>
> = ZeusState<ReturnType<T>[N]>;

type WithTypeNameValue<T> = T & {
  __typename?: true;
};
type AliasType<T> = WithTypeNameValue<T> & {
  __alias?: Record<string, WithTypeNameValue<T>>;
};
export interface GraphQLResponse {
  data?: Record<string, any>;
  errors?: Array<{
    message: string;
  }>;
}
type DeepAnify<T> = {
  [P in keyof T]?: any;
};
type IsPayLoad<T> = T extends [any, infer PayLoad] ? PayLoad : T;
type IsArray<T, U> = T extends Array<infer R> ? InputType<R, U>[] : InputType<T, U>;
type FlattenArray<T> = T extends Array<infer R> ? R : T;

type NotUnionTypes<SRC extends DeepAnify<DST>, DST> = {
  [P in keyof DST]: SRC[P] extends '__union' & infer R ? never : P;
}[keyof DST];

type ExtractUnions<SRC extends DeepAnify<DST>, DST> = {
  [P in keyof SRC]: SRC[P] extends '__union' & infer R
    ? P extends keyof DST
      ? IsArray<R, DST[P] & { __typename: true }>
      : {}
    : never;
}[keyof SRC];

type IsInterfaced<SRC extends DeepAnify<DST>, DST> = FlattenArray<SRC> extends ZEUS_INTERFACES | ZEUS_UNIONS
  ? ExtractUnions<SRC, DST> &
      {
        [P in keyof Omit<Pick<SRC, NotUnionTypes<SRC, DST>>, '__typename'>]: DST[P] extends true
          ? SRC[P]
          : IsArray<SRC[P], DST[P]>;
      }
  : {
      [P in keyof Pick<SRC, keyof DST>]: DST[P] extends true ? SRC[P] : IsArray<SRC[P], DST[P]>;
    };



type MapType<SRC, DST> = SRC extends DeepAnify<DST> ? IsInterfaced<SRC, DST> : never;
type InputType<SRC, DST> = IsPayLoad<DST> extends { __alias: infer R }
  ? {
      [P in keyof R]: MapType<SRC, R[P]>;
    } &
      MapType<SRC, Omit<IsPayLoad<DST>, '__alias'>>
  : MapType<SRC, IsPayLoad<DST>>;
type Func<P extends any[], R> = (...args: P) => R;
type AnyFunc = Func<any, any>;
export type ArgsType<F extends AnyFunc> = F extends Func<infer P, any> ? P : never;
export type OperationToGraphQL<V, T> = <Z extends V>(o: Z | V, variables?: Record<string, any>) => Promise<InputType<T, Z>>;
export type SubscriptionToGraphQL<V, T> = <Z extends V>(
  o: Z | V,
  variables?: Record<string, any>,
) => {
  on: (fn: (args: InputType<T, Z>) => void) => void;
  off: (e: { data?: InputType<T, Z>; code?: number; reason?: string; message?: string }) => void;
  error: (e: { data?: InputType<T, Z>; message?: string }) => void;
  open: () => void;
};
export type CastToGraphQL<V, T> = (resultOfYourQuery: any) => <Z extends V>(o: Z | V) => InputType<T, Z>;
export type SelectionFunction<V> = <T>(t: T | V) => T;
export type fetchOptions = ArgsType<typeof fetch>;
type websocketOptions = typeof WebSocket extends new (
  ...args: infer R
) => WebSocket
  ? R
  : never;
export type chainOptions =
  | [fetchOptions[0], fetchOptions[1] & {websocket: websocketOptions}]
  | [fetchOptions[0]];
export type FetchFunction = (
  query: string,
  variables?: Record<string, any>,
) => Promise<any>;
export type SubscriptionFunction = (
  query: string,
  variables?: Record<string, any>,
) => void;
type NotUndefined<T> = T extends undefined ? never : T;
export type ResolverType<F> = NotUndefined<F extends [infer ARGS, any] ? ARGS : undefined>;


