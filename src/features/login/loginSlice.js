import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'



const initialState = {
    user: {},
    logedin:false,
    status: 'idle',
    error: null,
    path:'',
    logout:false
};

export const fetchLoginPost = createAsyncThunk('login/fetchLoginPost', async (data) => {
    console.log('login',data)
    //const response = await fetch('/data/login.json');

    var headers = new Headers();

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    const response = await fetch(`${process.env.REACT_APP_LISA_URL}/auth/login`,{
        method: 'POST',
        credentials: 'include',
        headers: headers,
        body: JSON.stringify(data)
    });
    /*const response = await fetch('/auth/login/',{
        method: 'POST',
        credentials: 'include',
        headers: headers,
        body: JSON.stringify(data)
    });*/
    const payload = await response.json();
    console.log(payload);
    return payload
});

export const fetchLoginGet = createAsyncThunk('login/fetchLoginGet', async () => {
    const response = await fetch(`${process.env.REACT_APP_LISA_URL}/user/me`,{
        method: 'GET',
        credentials: 'include',
    });
    const data = await response.json();
    console.log(data);
    return data
});

export const fetchLoginReset = createAsyncThunk('login/fetchLoginReset', async (payload) => {
    const response = await fetch(`${process.env.REACT_APP_LISA_URL}/login/reset`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(payload),
        credentials: 'include'
    });
    const data = await response.json();
    console.log(data);
    return data
});

export const fetchLoginNew = createAsyncThunk('login/fetchLoginNew', async (payload) => {
    const response = await fetch(`${process.env.REACT_APP_LISA_URL}/login/new`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(payload),
        credentials: 'include'
    });
    const data = await response.json();
    console.log(data);
    return data
});

const postsSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logoutTogle: (state,action) => {
            state.logout = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchLoginPost.pending, (state, action) => {
                console.log('loading');
                state.status = 'loading';
            })
            .addCase(fetchLoginPost.fulfilled, (state, action) => {
                console.log('succeeded');
                state.status = 'succeeded';
                if(action.payload.status===0){
                    localStorage.setItem('token',action.payload.token);
                    document.cookie = "AUTH="+action.payload.token;
                    state.logedin = true;
                    state.path = '/app/dashboard/calendar';
                }else{
                    state.logedin = false;
                    state.path = '/login/';
                    state.user=action.payload.data
                }
            })
            .addCase(fetchLoginPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
            .addCase(fetchLoginGet.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchLoginGet.fulfilled, (state, action) => {
                state.status = 'succeeded';

                if(!action.payload.status){
                    state.logedin = true;
                    let path = localStorage.getItem('lisaPath');

                    state.path =path;
                    //state.path = '/app/dashboard/calendar';
                    state.user=action.payload.data
                }else{
                    state.logedin = false;
                    state.path = '/login';
                }

            })
            .addCase(fetchLoginGet.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
            .addCase(fetchLoginReset.pending, (state, action) => {
                state.status = 'loading';
                state.status = 'loading';
            })
            .addCase(fetchLoginReset.fulfilled, (state, action) => {
                state.status = 'succeeded';

                if(!action.payload.result){
                    state.logedin = false;
                    state.path = '/login';
                }else{
                    state.logedin = false;
                    state.path = '/login';
                }

            })
            .addCase(fetchLoginReset.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
            .addCase(fetchLoginNew.pending, (state, action) => {
                state.status = 'loading';
                state.status = 'loading';
            })
            .addCase(fetchLoginNew.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.logedin = false;
                state.path = '/login';


            })
            .addCase(fetchLoginNew.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
    }
})
export default postsSlice.reducer;

export const { logoutTogle} = postsSlice.actions;



export const isLogin = (state) => {
    return state.login.logedin;
}


