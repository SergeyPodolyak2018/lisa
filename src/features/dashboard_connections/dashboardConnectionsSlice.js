import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    time:'day',
    connections:{},
    raitingActive:0,
    status: 'idle',
    error: false,
    errormessage:''
};

export const fetchDashConnections = createAsyncThunk('dashConnections/fetchDashConnections', async (payload) => {
    console.log(payload);
    const response = await fetch('/data/connectionsday.json');
    const data = await response.json();
    console.log(data);
    return data
});

const dashConnectionsSlice = createSlice({
    name: 'dashConnections',
    initialState,
    reducers: {
        changeTime: (state,action) => {
            state.time = action.payload;
        },
        changeRaiting: (state,action) => {
            state.raitingActive = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchDashConnections.pending, (state, action) => {
                console.log('loading');
                state.status = 'loading';
            })
            .addCase(fetchDashConnections.fulfilled, (state, action) => {
                console.log('succeeded');
                if(action.payload.status.code === 0){
                    state.status = 'succeeded';
                    state.connections=action.payload.data
                }else{
                    state.status = 'failed';
                    state.error = true
                    state.errormessage = action.payload.status.message
                }
            })
            .addCase(fetchDashConnections.rejected, (state, action) => {
                console.log('succeeded');
                state.status = 'failed';
                state.error = true
                state.errormessage = action.error.message
            })
    }
})



export default dashConnectionsSlice.reducer
export const { changeTime,changeRaiting} = dashConnectionsSlice.actions


