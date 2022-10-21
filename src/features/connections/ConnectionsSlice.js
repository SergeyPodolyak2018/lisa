import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {useSelector} from "react-redux";

const initialState = {
    outgoing:{
        connections:[],
        status: 'idle',
        error: false,
        errormessage:'',
        search:{
            string:'',
            account:0,
        },
        page:{
            total:0,
            current:0
        }
    },
    incoming:{
        connections:[],
        status: 'idle',
        error: false,
        errormessage:'',
        search:{
            string:'',
            account:0,
        },
        page:{
            total:0,
            current:0
        }
    }

};

export const fetchConnections = createAsyncThunk('connections/fetchConnections', async (payload) => {
    console.log('fetchConnections');
    console.log(payload);
    let response;
    let domain='';
    if(payload.dirrection==='outgoing'){
        domain=`${process.env.REACT_APP_LISA_URL}/connections/${payload.id}/outgoing`
    }
    if(payload.dirrection==='incoming'){
        domain=`${process.env.REACT_APP_LISA_URL}/connections/${payload.id}/incoming`
    }
    response = await fetch(domain,{
        method: 'GET',
        credentials: 'include',
    });

    const data = await response.json();
    console.log(data);
    data['dirrection']=payload.dirrection;
    return data
});

const connectionsSlice = createSlice({
    name: 'connections',
    initialState,
    reducers: {
        changeSearchString: (state,action) => {
            state[action.payload.dirrection].search.string = action.payload.text;
        },
        changeAccount: (state,action) => {
            console.log('changeAccount');
            state[action.payload.dirrection].search.account = action.payload.index;

        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchConnections.pending, (state, action) => {
                console.log('loading');
                state[[action.meta.arg.dirrection]].status = 'loading';
            })
            .addCase(fetchConnections.fulfilled, (state, action) => {
                console.log('succeeded');
                if(action.payload.status.code === 0){
                    state[action.payload.dirrection].status = 'succeeded';
                    // state[action.payload.dirrection].connections=action.payload.data
                    state[action.payload.dirrection]={
                        ...state[action.payload.dirrection],
                        connections:action.payload.data,
                        page:{
                            total:action.payload.paging.links.length,
                            current:action.payload.paging.start
                        }
                    }
                }else{
                    state[action.payload.data.dirrection].status = 'failed';
                    state[action.payload.data.dirrection].error = true;
                    state[action.payload.data.dirrection].errormessage = action.payload.status.message
                }
            })
            .addCase(fetchConnections.rejected, (state, action) => {
                console.log('error');
                console.log(action.error);
                state[action.meta.arg.dirrection].status = 'failed';
                state[action.meta.arg.dirrection].error = true;
                state[action.meta.arg.dirrection].errormessage = action.error.message
            })
    }
})



export default connectionsSlice.reducer;
export const {changeSearchString,changeStatus,changeAccount} = connectionsSlice.actions;


