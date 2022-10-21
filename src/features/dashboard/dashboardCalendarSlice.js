import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'





const initialState = {
    time:'day',
    month:new Date().getMonth(),
    events:[],
    status: 'idle',
    error: false,
    errormessage:''
};

export const fetchCalendar = createAsyncThunk('calendar/fetchCalendar', async (payload) => {
    console.log(payload);
    const response = await fetch('/data/events.json');
    const data = await response.json();
    console.log(data);
    return data
});

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        increment: (state) => {
            if(state.month+1===12){
                state.month = 0;
            }else{
                state.month +=1;
            }
             
        },
        decrement: (state) => {
            if(state.month-1===-1){
                state.month =11;
            }else{
                state.month -=1;
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCalendar.pending, (state, action) => {
                console.log('loading');
                state.status = 'loading';
            })
            .addCase(fetchCalendar.fulfilled, (state, action) => {
                console.log('succeeded');
                if(action.payload.status.code === 0){
                    state.status = 'succeeded';
                    state.events=action.payload.data
                }else{
                    state.status = 'failed';
                    state.error = true
                    state.errormessage = action.payload.status.message
                }
            })
            .addCase(fetchCalendar.rejected, (state, action) => {
                console.log('succeeded');
                state.status = 'failed';
                state.error = true
                state.errormessage = action.error.message
            })
    }
})



export default calendarSlice.reducer
export const { increment, decrement} = calendarSlice.actions



