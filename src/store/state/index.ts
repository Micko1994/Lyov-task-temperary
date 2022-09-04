export type RootState = {
  isLoggedIn: boolean;
  auth: any;
  user: any;
  isFetching: boolean;
};

const initialState: RootState = {
  isLoggedIn: false,
  auth: null,
  user: null,
  isFetching: false,
};

export default initialState;
