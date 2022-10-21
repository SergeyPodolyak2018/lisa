import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    templates:[],
    status: 'idle',
    error: false,
    errormessage:'',
    search:{
        string:'',
        status:'all',
        date:'default'
    },
    refresh:false
};

export const fetchTemplatesRelevant = createAsyncThunk('templatesRelevant/fetchTemplatesRelevant', async (payload) => {
    console.log(payload);
    const response = await fetch(`${process.env.REACT_APP_LISA_URL}/templates/`,{
        method: 'GET',
        credentials: 'include',
    });
    const data = await response.json();
    console.log(data);
    return data
});

const templatesRelevantSlice = createSlice({
    name: 'templatesRelevant',
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
        togleRefresh:(state,action) => {
            state.refresh = !state.refresh;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTemplatesRelevant.pending, (state, action) => {
                console.log('loading');
                state.status = 'loading';
            })
            .addCase(fetchTemplatesRelevant.fulfilled, (state, action) => {
                console.log('succeeded');
                if(action.payload.status === 0){
                    state.status = 'succeeded';
                    state.templates=action.payload.data
                }else{
                    state.status = 'failed';
                    state.error = true;
                    state.errormessage = action.payload.status.message
                }
            })
            .addCase(fetchTemplatesRelevant.rejected, (state, action) => {
                console.log('succeeded');
                state.status = 'failed';
                state.error = true;
                state.errormessage = action.error.message
            })
    }
})



export default templatesRelevantSlice.reducer;
export const { changeTime, changeSearchString,changeStatus,changeDate,togleRefresh} = templatesRelevantSlice.actions;


