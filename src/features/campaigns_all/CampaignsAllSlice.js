import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    campaigns:{},
    status: 'idle',
    error: false,
    errormessage:'',
    search:{
        string:'',
        status:'all',
        date:'default'
    }
};

export const fetchCampaignsAll = createAsyncThunk('campaignsAll/fetchCampaignsAll', async (payload) => {
    console.log(payload);
    const response = await fetch(`${process.env.REACT_APP_LISA_URL}/campaigns/`,{
        method: 'GET',
        credentials: 'include',
    });
    const data = await response.json();
    console.log(data);
    return data
});

const campaignsAllSlice = createSlice({
    name: 'campaignsAll',
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
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCampaignsAll.pending, (state, action) => {
                console.log('loading');
                state.status = 'loading';
            })
            .addCase(fetchCampaignsAll.fulfilled, (state, action) => {
                console.log('succeeded');
                if(action.payload.status === 0){
                    state.status = 'succeeded';
                    state.campaigns=action.payload.data
                }else{
                    state.status = 'failed';
                    state.error = true;
                    state.errormessage = action.payload.status.message
                }
            })
            .addCase(fetchCampaignsAll.rejected, (state, action) => {
                console.log('succeeded');
                state.status = 'failed';
                state.error = true;
                state.errormessage = action.error.message
            })
    }
})



export default campaignsAllSlice.reducer;
export const { changeTime, changeSearchString,changeStatus,changeDate} = campaignsAllSlice.actions;


