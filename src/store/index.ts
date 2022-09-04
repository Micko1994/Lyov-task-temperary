import { createOvermind, IContext } from 'overmind';
import { createStateHook, createActionsHook } from 'overmind-react';

import initialState from './state';
import * as actions from './actions';

export const config = {
  state: initialState,
  actions,
};

export type Context = IContext<typeof config>;

export const store = createOvermind(config);
export type OvermindContext = typeof store;

export const useAppState = createStateHook<Context>();
export const useActions = createActionsHook<Context>();
export const useStore = () => ({
  state: useAppState(),
  actions: useActions(),
});
