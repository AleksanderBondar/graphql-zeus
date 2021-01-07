import { Environment } from '@/Models';
import {
  ZeusSelectFunction,
  TypePropsResolverFunction,
  traverseToSeekArraysFunction,
  seekForAliasesFunction,
  ScalarResolverFunction,
  resolveKVFunction,
  queryConstructFunction,
  objectToTreeFunction,
  isArrayFunctionFunction,
  inspectVariablesFunction,
  buildQueryFunction,
  fullChainConstructFunction,
  VariableFunction,
  resolverForFunction,
  fullSubscriptionConstruct,
} from '@/TreeToTS/functions';

export const javascriptFunctions = (env: Environment): string => `
${ScalarResolverFunction.js}
${TypePropsResolverFunction.js}
${isArrayFunctionFunction.js}
${resolveKVFunction.js}
${objectToTreeFunction.js}
${traverseToSeekArraysFunction.js}
${buildQueryFunction.js}
${inspectVariablesFunction.js}
${queryConstructFunction.js}
${fullChainConstructFunction.js}
${fullSubscriptionConstruct.js}
${seekForAliasesFunction.js}
${VariableFunction.js}
${ZeusSelectFunction.js}
${resolverForFunction.js}
${require(`./${env}/fetchFunction`).default}
${require(`./${env}/apiSubscription`).default}
  `;
