import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    time:'week',
    campaigns:{},
    status: 'idle',
    error: false,
    errormessage:''
};

export const fetchDashCampaigns = createAsyncThunk('dashCampaigns/fetchDashCampaigns', async (payload) => {
    console.log(payload);
    const response = await fetch('/data/capmaignsweek.json');
    const data = await response.json();
    console.log(data);
    return data
});

const dashCampaignsSlice = createSlice({
    name: 'dashCampaigns',
    initialState,
    reducers: {
        changeTime: (state,action) => {
            state.time = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchDashCampaigns.pending, (state, action) => {
                console.log('loading');
                state.status = 'loading';
            })
            .addCase(fetchDashCampaigns.fulfilled, (state, action) => {
                console.log('succeeded');
                if(action.payload.status.code === 0){
                    state.status = 'succeeded';
                    state.campaigns=action.payload.data
                }else{
                    state.status = 'failed';
                    state.error = true
                    state.errormessage = action.payload.status.message
                }
            })
            .addCase(fetchDashCampaigns.rejected, (state, action) => {
                console.log('succeeded');
                state.status = 'failed';
                state.error = true
                state.errormessage = action.error.message
            })
    }
})



export default dashCampaignsSlice.reducer
export const { changeTime} = dashCampaignsSlice.actions


