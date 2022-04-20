import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
    userToken: string;
    user: any;
  }

  const initialState: InitialState = {
    userToken: '',
    user: {},
  };

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserToken: (state, action) => {
            state.user = action.payload.user;
            state.userToken = action.payload.userToken;
        },
        removeToken: (state) => {
            state.userToken = '';
            state.user = {};
        },
    }
});

export const {setUserToken, removeToken} = userSlice.actions;
export default userSlice.reducer; 