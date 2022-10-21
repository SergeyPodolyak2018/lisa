import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    templates:[],
    status: 'idle',
    error: false,
    errormessage:'',
    search:{
        string:'',
        date:'default'
    }
};

export const fetchTemplatesArchived = createAsyncThunk('templatesArchived/fetchTemplatesArchived', async (payload) => {
    console.log(payload);
    const response = await fetch(`${process.env.REACT_APP_LISA_URL}/templates/`,{
        method: 'GET',
        credentials: 'include',
    });
    const data = await response.json();
    console.log(data);
    return data
});

const templatesArchivedSlice = createSlice({
    name: 'templatesArchived',
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
            .addCase(fetchTemplatesArchived.pending, (state, action) => {
                console.log('loading');
                state.status = 'loading';
            })
            .addCase(fetchTemplatesArchived.fulfilled, (state, action) => {
                console.log('succeeded');
                if(action.payload.status.code === 0){
                    state.status = 'succeeded';
                    state.templates=action.payload.data
                }else{
                    state.status = 'failed';
                    state.error = true;
                    state.errormessage = action.payload.status.message
                }
            })
            .addCase(fetchTemplatesArchived.rejected, (state, action) => {
                console.log('succeeded');
                state.status = 'failed';
                state.error = true;
                state.errormessage = action.error.message
            })
    }
})



export default templatesArchivedSlice.reducer
export const { changeTime, changeSearchString,changeDate} = templatesArchivedSlice.actions;


