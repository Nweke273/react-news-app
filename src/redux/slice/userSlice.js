import  {createSlice} from '@reduxjs/toolkit';

const initialState = {
    state: {
        isFetching: false,
    },
    user:{
        name:"",
        email:"",
        accessToken:null,
        isAuthenticated:false
    },
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsFetching : (state) => {
            state.state.isFetching = true;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.state.isFetching = false;
        },
        resetUser: (state) => {
            state.user = initialState.user;
            state.state.isFetching = false;
        },
    }
});

export const {
    setIsFetching,
    setUser,
    resetUser,
} = userSlice.actions;


export default userSlice.reducer;
