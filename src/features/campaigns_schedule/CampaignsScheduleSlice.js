import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    schedule:[],
    status: 'idle',
    error: false,
    errormessage:'',
    search:{
        string:'',
        date:'default'
    }
};

export const fetchCampaignsSchedule = createAsyncThunk('campaignsSchedule/fetchCampaignsSchedule', async (payload) => {
    console.log(payload);
    const response = await fetch(`${process.env.REACT_APP_LISA_URL}/schedule/`,{
        method: 'GET',
        credentials: 'include',
    });
    const data = await response.json();
    console.log(data);
    return data
});

const campaignsScheduleSlice = createSlice({
    name: 'campaignsSchedule',
    initialState,
    reducers: {
        changeTime: (state,action) => {
            state.time = action.payload;
        },
        changeSearchString: (state,action) => {
            state.search.string = action.payload;
        },
        changeDate: (state,action) => {
            state.search.date = action.payload;
        }

    },
    extraReducers(builder) {
        builder
            .addCase(fetchCampaignsSchedule.pending, (state, action) => {
                console.log('loading');
                state.status = 'loading';
            })
            .addCase(fetchCampaignsSchedule.fulfilled, (state, action) => {
                console.log('succeeded');
                if(action.payload.status === 0){
                    state.status = 'succeeded';
                    state.schedule=action.payload.data
                }else{
                    state.status = 'failed';
                    state.error = true;
                    state.errormessage = action.payload.status.message
                }
            })
            .addCase(fetchCampaignsSchedule.rejected, (state, action) => {
                console.log('succeeded');
                state.status = 'failed';
                state.error = true;
                state.errormessage = action.error.message
            })
    }
})



export default campaignsScheduleSlice.reducer
export const { changeTime, changeSearchString,changeDate} = campaignsScheduleSlice.actions;


