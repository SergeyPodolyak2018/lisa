import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    mailingList:[],
    status: 'idle',
    error: false,
    errormessage:'',
    search:{
        string:'',
        status:'all',
        date:'default'
    },
    blocker:false

};

export const fetchMailingList = createAsyncThunk('mailingList/fetchMailingList', async (payload) => {
    console.log(payload);
    const response = await fetch(`${process.env.REACT_APP_LISA_URL}/search/all`,{
        method: 'GET',
        credentials: 'include',
    });
    const data = await response.json();
    console.log(data);
    return data
});

export const updateMailingList = createAsyncThunk('mailingList/updateMailingList', async () => {
    console.log('updateMailingList');
    const response = await fetch(`${process.env.REACT_APP_LISA_URL}/search/all`,{
        method: 'GET',
        credentials: 'include',
    });
    const data = await response.json();
    return data;
});

const mailingListSlice = createSlice({
    name: 'mailingList',
    initialState,
    reducers: {
        changeTime: (state,action) => {
            state.time = action.payload;
        },
        changeSearchString: (state,action) => {
            state.search.string = action.payload;
        },
        changeStatus: (state,action) => {
            state.search.status = action.payload;
        },
        changeDate: (state,action) => {
            state.search.date = action.payload;
        },
        getStatus: (state,action) => {
            return state.status;
        },
        getBlocker: (state,action) => {
            return state.blocker;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchMailingList.pending, (state, action) => {
                console.log('loading');
                state.status = 'loading';
            })
            .addCase(fetchMailingList.fulfilled, (state, action) => {
                console.log('succeeded');
                if(action.payload.status === 0){
                    state.status = 'succeeded';
                    if(action.payload.data){
                        state.mailingList=action.payload.data;
                    }


                }else{
                    state.status = 'failed';
                    state.error = true;
                    state.errormessage = action.payload.status.message
                }
            })
            .addCase(fetchMailingList.rejected, (state, action) => {
                console.log('succeeded');
                state.status = 'failed';
                state.error = true;
                state.errormessage = action.error.message
            })
            .addCase(updateMailingList.pending, (state, action) => {
                state.blocker=true;
            })

            .addCase(updateMailingList.fulfilled, (state, action) => {
                console.log('succeeded');
                if(action.payload.status === 0){
                    if(action.payload.data){
                        state.mailingList=action.payload.data;
                    }

                    state.blocker=false;
                }
            })

    }
})



export default mailingListSlice.reducer;
export const { changeTime, changeSearchString,changeStatus,changeDate,getStatus,getBlocker} = mailingListSlice.actions;


