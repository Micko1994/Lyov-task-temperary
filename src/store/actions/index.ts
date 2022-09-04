import { Overmind } from 'overmind';
import jwt_decode from 'jwt-decode';
import { Context, OvermindContext } from 'store';
import { Api } from 'utils/Api';
import { appKey } from 'utils/contstants';
import { ISignInFormValues } from 'types/sing-in';
import { showError } from 'utils/helpers';
import {
  AUTH_SIGNIN_URL,
  LOGOUT_URL, 
} from 'store/api';

import { STATE_PERSIST_KEYS } from '../contstants';
import { RootState } from '../state';

const persist = (key: string, data: any) => {
  if (STATE_PERSIST_KEYS.includes(key as keyof RootState)) {
    const persistKey = `${appKey}-${key}`;
    localStorage.setItem(persistKey, JSON.stringify(data));
  }
};

const getPersisted = (key: string) => {
  const data = localStorage.getItem(`${appKey}-${key}`);
  return data && JSON.parse(data);
};

export const onInitialize = async ({ state }: Context, overmind: Overmind<OvermindContext>) => {
  overmind.addMutationListener(({ path, args: [data] }) => {
    persist(path, data);
  });

  STATE_PERSIST_KEYS.forEach((key) => {
    const value = getPersisted(key);
    value && (state[key] = value);
  });
};

export const login = async ({ state }: Context, values: ISignInFormValues) => {
  try {
    state.isFetching = true;
    const { rememberMe } = values;
    const newValues = {
      username: values.username.trim(),
      password: values.password.trim(),
    };
    const response: any = await Api.post(AUTH_SIGNIN_URL, newValues);
    const token_obj: any = response.data;
    localStorage.setItem('tokenObj', JSON.stringify(token_obj));
    state.auth = token_obj;
    state.isFetching = false;
    if (rememberMe) {
      localStorage.setItem('rememberMe', JSON.stringify(newValues));
    }
  } catch (err: any) {
    state.isFetching = false;
    showError(err?.response?.data?.message);
  }
};

export const logout = async () => {
  try {
    await Api.delete(LOGOUT_URL);
    localStorage.clear();
    window.location.pathname = '/';
  } catch {
    localStorage.clear();
    window.location.pathname = '/';
  }
};

export const getAccount = ({ state }: Context) => {
  const accessToken: any = JSON.parse(localStorage.getItem('tokenObj') || '{}')?.accessToken;
  if (!accessToken) throw Error('Access token not found');

  const user: any = jwt_decode(accessToken);
  state.user = user;
};

export const handleLoading = ({ state }: Context, isFetching: boolean) => {
  state.isFetching = isFetching;
};
