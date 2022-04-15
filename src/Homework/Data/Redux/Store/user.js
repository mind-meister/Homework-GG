import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userToken: '',
        user: {}
    },
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