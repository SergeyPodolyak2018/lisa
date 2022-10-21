import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import {fetchLoginGet} from "../login/loginSlice";

const initialState = {
    accounts:[],
    search:{
        string:'',
        status:'all',
    },
    selected:[],
    showPassword:[],
    edit:{},
    page:{
        total:0,
        current:0
    },
    active:'',
    status: 'idle',
    error: false,
    errormessage:'',
    deleteWindow:false,
    refresh:false

};

export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async (payload) => {

    const response = await fetch(`${process.env.REACT_APP_LISA_URL}/accounts/`,{
        method: 'GET',
        credentials: 'include',
    });
    const data = await response.json();
    console.log(data);
    return data
});
export const fetchDeleteAccounts = createAsyncThunk('accounts/fetchDeleteAccounts', async (payload) => {
    console.log('fetchDeleteAccounts');
    let body=[];
    let url='';
    if(payload.length>1){
        url=''
    }else{
        url=`${process.env.REACT_APP_LISA_URL}/accounts/${payload[0]}/delete`
    }
    const response = await fetch(url,{
        method: 'POST',
        credentials: 'include',
        body:JSON.stringify(body)
    });
    const data = await response.json();
    return data
});

const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        changeTime: (state,action) => {
            state.time = action.payload;
        },
        togleRefresh:(state,action) => {
            state.refresh = !state.refresh;
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
        toglePasword:(state,action) => {

            let passordList=[...state.showPassword];
            let index = state.showPassword.findIndex((item,index)=>{
                return item === action.payload;
            });
            if(index>-1){
                passordList.splice(index,1)
            }else{
                passordList.push(action.payload)
            }
            state.showPassword = [...passordList];
        },
        selectAll:(state,action) => {
            console.log('selectAll')
            let selectedList=[];
            if(state.selected.length===state.accounts.length){
                state.selected = [];
            }else{
                selectedList=Array.from(state.accounts, x => x.id);
                state.selected = [...selectedList];
            }
        },
        selectTogle:(state,action) => {
            console.log('selectTogle')
            let selectedList=[...state.selected];
            let index = state.selected.findIndex((item,index)=>{
                return item === action.payload;
            });
            if(index>-1){
                selectedList.splice(index,1)
            }else{
                selectedList.push(action.payload)
            }

            state.selected = [...selectedList];
        },
        deselect:(state,action) => {
            state.selected = [];
        },
        setEdit:(state,action) => {
            state.edit = state.accounts.find((item,index)=>{
                return item.id===action.payload
            });
        },
        togleDeleteWindow:(state,action) => {
            state.deleteWindow = !state.deleteWindow;
        }




    },
    extraReducers(builder) {
        builder
            .addCase(fetchAccounts.pending, (state, action) => {
                console.log('loading');
                state.status = 'loading';
            })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                console.log('succeeded');
                console.log(action.payload);
                if(action.payload.status.code === 0){
                    state.status = 'succeeded';
                    state.accounts=action.payload.data
                    state.refresh=false;

                }else{
                    state.status = 'failed';
                    state.error = true;
                    state.errormessage = action.payload.status.message
                }
            })
            .addCase(fetchAccounts.rejected, (state, action) => {
                console.log('rejected');
                console.log(action.error);
                state.status = 'failed';
                state.error = true;
                state.errormessage = action.error.message
            })
            .addCase(fetchDeleteAccounts.pending, (state, action) => {
                console.log('loading');
                state.status = 'loading';
            })
            .addCase(fetchDeleteAccounts.fulfilled, (state, action) => {
                state.status = 'succeeded';

                if(action.payload.status === 0){
                    state.status = 'succeeded';
                    accountsSlice.caseReducers.togleDeleteWindow(state, action);
                    state.refresh=true;


                }else{
                    state.status = 'failed';
                    state.error = true;
                    state.errormessage = action.payload.status.message
                }

            })
            .addCase(fetchDeleteAccounts.rejected, (state, action) => {
                console.log('failed');
                state.status = 'failed';
                accountsSlice.caseReducers.togleDeleteWindow(state, action);
                state.error = action.error.message
            })
    }
})



export default accountsSlice.reducer;
export const { changeTime, changeSearchString,changeStatus,changeDate,toglePasword,selectAll,selectTogle,deselect,setEdit,togleDeleteWindow,togleRefresh} = accountsSlice.actions;


