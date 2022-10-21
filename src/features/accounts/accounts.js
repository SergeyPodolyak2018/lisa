import React, {useEffect, useState} from 'react';
import styles from './accounts.module.css';


import {
    useHistory,useParams
} from 'react-router-dom'


import {useDispatch, useSelector} from "react-redux";
import {fetchAccounts, changeSearchString,changeStatus,toglePasword,selectAll,selectTogle,deselect,setEdit,togleDeleteWindow,fetchDeleteAccounts} from "./AccountsSlice";


import CampCard from    '../../components/campaign_card/camp_card'
import NoData from    '../../components/no_data/no_data'
import RegButtonLinck from '../../components/regular_button_link/regular_button_link'
import Search from "../../components/input/search/search";
import Selector from "../../components/input/selector_icon/selector";
import Table from "../../components/table_accounts/table";
import Pagination from "../../components/pagination/pagination";
import {ReactComponent as FilterA} from "../campaigns_all/FilterActive.svg";
import {ReactComponent as Filter} from "../campaigns_all/Filter.svg";
import Toast from "../../components/table_toast/toast";
import ConfirmWindow from "../../components/confirm_window/window";
import ResetButton from "../../components/reset_button/reset_button";
import Button from "../../components/button/button";
import Spinner from "../../components/spinner/spinner";

const statusList=[
        {
            id:'all',
            name:'All statuses'
        },
        {
            id:'banned',
            name:'Banned'
        },
        {
            id:'connected',
            name:'Connected'
        },
        {
            id:'disconnected',
            name:'Disconnected'
        }
    ];

function Accounts (props) {
    let history = useHistory();
    const dispatch = useDispatch();
    const [deletepressed, setDeleted] = useState('');
    const postStatus = useSelector(state => state.accounts.status);
    const error=useSelector(state=>state.accounts.error);
    const search=useSelector(state=>state.accounts.search);
    const accounts=useSelector(state=>state.accounts.accounts);
    const page = useSelector(state=>state.accounts.page);
    const selected = useSelector(state=>state.accounts.selected);
    const showPassword = useSelector(state=>state.accounts.showPassword);
    const edit = useSelector(state=>state.accounts.edit);
    const deleteWindow=useSelector(state=>state.accounts.deleteWindow);
    const refresh=useSelector(state=>state.accounts.refresh);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchAccounts())
        }
    }, []);
    useEffect(() => {
        if (refresh) {
            dispatch(fetchAccounts())
        }
    }, [refresh]);

    function changeLocation(location,params) {
        history.push({
            pathname: location,
            search: params
        });
    }

    function tableAction(id) {
        console.log(id)
    }
    function changePage(dirrection) {
        console.log(dirrection)
    }
    function trashItem(id) {
        setDeleted(id);
        dispatch(togleDeleteWindow())
    }
    function switchSelected() {
        console.log('switchSelected')
    }
    function deleteSelected() {
        dispatch(togleDeleteWindow())
    }
    function getSwitchStatus() {
        for (let i=0 ;i<selected.length;i++){
            let element=accounts.find((item,index)=>{
                return selected[i]===item.id
            })
            if(element.status==='banned' || element.status==='disconnected' || !element.status){
                return false
            }
        }
        return true
    }
    function removeSelected() {
       dispatch(deselect());
    }
    function resetPassword(id) {
        console.log(id);
       let element= accounts.find((item,index)=>{
            return id===item.id
        })
        changeLocation('/app/accounts/new',`?reset=true&email=${element.username}`)


    }




    const getContent=()=>{
        if(postStatus==='loading' || postStatus==='idl'){
            return <Spinner/>
        }else {
            return <div className={styles.wrapper}>
                <div className={styles.header_wrapper}>
                    <span className={styles.header}>Accounts</span>
                    <span className={styles.body}>Here you can add and manage your LinkedIn accounts</span>
                </div>
                {deleteWindow ? <ConfirmWindow
                    header={'Delete?'}
                    subheader={`Are you sure you want to delete ${deletepressed ? 'account' : 'selected accounts'}? `}
                    buttons={
                        <div className={styles.ImportContainer}>
                            <div className={styles.buttonWrapperImport} style={{width: '55px'}}>
                                <ResetButton
                                    click={() => {
                                        dispatch(togleDeleteWindow());
                                        setDeleted('')
                                    }}
                                    name={'Cancel'}
                                    width={'51px'}
                                />
                            </div>
                            <div className={styles.buttonWrapperImport}>
                                <Button
                                    name={"Yes"}
                                    click={() => {
                                        let tempArr = [];
                                        if (deletepressed) {
                                            tempArr.push(deletepressed);
                                            setDeleted('');
                                        } else {
                                            tempArr = selected;
                                        }
                                        dispatch(fetchDeleteAccounts(tempArr))
                                    }}
                                />
                            </div>

                        </div>
                    }
                /> : ''}

                {Object.keys(accounts).length > 0 ? <div className={styles.tools}>
                    <div className={styles.search_wrapper}>
                        <Search
                            type={'text'}
                            name={'search'}
                            value={search.string}
                            onchange={(data) => {
                                dispatch(changeSearchString(data))
                            }}
                            radius={'8px'}
                        />
                    </div>
                    <div className={styles.selector_wrapper2}>
                        <Selector
                            active={search.status}
                            data={statusList}
                            klick={(data) => {
                                dispatch(changeStatus(data))
                            }}
                            placeholder={''}
                            marginTop={'0'}
                            left={true}
                            openIcon={<FilterA/>}
                            closeIcon={<Filter/>}
                            radius={'0px 8px 8px 0px'}
                            iconRadius={'8px 0px 0px 8px'}
                            padding={'10px 8px 10px 10px'}

                        />
                    </div>
                    <div className={styles.button_wrapper3}>
                        <RegButtonLinck
                            name={'+ Add account'}
                            color={'#F8F9FB'}
                            baground={'#5276F4'}
                            click={() => {
                                changeLocation('/app/accounts/new')
                            }}

                        />
                    </div>
                </div> : ''}
                {Object.keys(accounts).length > 0 ?

                    <div className={styles.subwrapper}>

                        <Table
                            data={accounts}
                            action={tableAction}
                            trash={trashItem}
                            selected={selected}
                            showPassword={showPassword}
                            togleEye={(data) => {
                                dispatch(toglePasword(data))
                            }}
                            selectAll={() => {
                                dispatch(selectAll())
                            }}
                            selectTogle={(data) => {
                                dispatch(selectTogle(data))
                            }}
                            edit={edit}
                            setEdit={(data) => {
                                dispatch(setEdit(data))
                            }}
                            resetPassword={resetPassword}

                        >
                            {selected.length > 0 ?
                                <div className={styles.toast_wrapper}>
                                    <Toast
                                        selected={selected.length}
                                        switchstatus={getSwitchStatus()}
                                        switch={() => {
                                            switchSelected()
                                        }}
                                        delete={() => {
                                            deleteSelected()
                                        }}
                                        remove={() => {
                                            removeSelected()
                                        }}
                                    />
                                </div> : ''
                            }
                        </Table>
                        <div className={styles.paginationWrap}>
                            <Pagination
                                current={page.current}
                                total={page.total}
                                maxLeftClick={() => {
                                    changePage('maxLeft')
                                }}
                                leftClick={() => {
                                    changePage('left')
                                }}
                                rightClick={() => {
                                    changePage('right')
                                }}
                                maxRightClick={() => {
                                    changePage('maxRight')
                                }}
                            />
                        </div>


                    </div> :
                    <NoData
                        header={'There are no accounts'}
                        subheader={'Please, click below to add the first one. '}
                        width={341}
                    >
                        <div className={styles.button_wrapper}>
                            <RegButtonLinck
                                name={'+ Add account'}
                                color={'#F8F9FB'}
                                baground={'#5276F4'}
                                click={() => {
                                    changeLocation('/app/accounts/new')
                                }}
                            />
                        </div>
                    </NoData>}

            </div>
        }

    }







    return(
        getContent()
    )
}

export default Accounts;
