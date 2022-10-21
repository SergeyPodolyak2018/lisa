import React, {useEffect, useState} from 'react';
import styles from './mailing_list.module.css';
import { ReactComponent as Arrow } from "./Arrows.svg"
import { ReactComponent as ArrowA } from "./ArrowsActive.svg"
import { ReactComponent as Filter } from "./Filter.svg"
import { ReactComponent as FilterA } from "./FilterActive.svg"

import {
    useHistory
} from 'react-router-dom'


import {useDispatch, useSelector} from "react-redux";
import {fetchMailingList, updateMailingList, changeSearchString,changeStatus,changeDate,getStatus,getBlocker} from "./MailingListSlice";


import SearechCard from    '../../components/mailing_list_card/mailing_card'
import NoData from    '../../components/no_data/no_data'
import RegButtonLinck from '../../components/regular_button_link/regular_button_link'
import Search from "../../components/input/search/search";
import Selector from "../../components/input/selector_icon/selector";
import SelectorFilter from "../../components/input/selector_icon_multiple/selector";
import SelectWindow from "../../components/select_window/window";
import Blure from "../../components/blure/blure";
import UniversalButton from "../../components/universal_button/button";
import Spinner from "../../components/spinner/spinner";



function MailingList () {
    let history = useHistory();

    const [selectWindow, setSelectWindow] = useState(false);

    const dispatch = useDispatch();
    const postStatus = useSelector(state => state.mailingList.status);
    const postBlocker = useSelector(state => state.mailingList.blocker);
    const error=useSelector(state=>state.mailingList.error);
    const campaigns=useSelector(state=>state.mailingList.mailingList);
    const search=useSelector(state=>state.mailingList.search);
    const accounts=useSelector(state=>state.accounts.accounts);
    const [blure,setBlure]=useState(false);
    const [blure2,setBlure2]=useState(false);
    const [updateBlock,setUpdateBlock]=useState(false);
    const [timerState,setTimerState]=useState(0);
    const statusList=[{
            id:'all',
            name:'All statuses'
        },
        {
            id:'running',
            name:'Running'
        },
        {
            id:'paused',
            name:'Paused'
        },
        {
            id:'stoped',
            name:'Stoped'
        },
        {
            id:'finished',
            name:'Finished'
        }];


    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchMailingList());
        }
        const interval = setInterval(() => {
            console.log('setInterval mailing list ' + timerState);
            setTimerState(prevTime=>prevTime+1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        console.log('In timer ' + postStatus);
        if(postStatus==='succeeded' && !postBlocker){
            dispatch(updateMailingList());
        }
    }, [timerState]);

    function changeLocation(location) {
        history.push(location);
    }

    function campainPause(id) {
        console.log('campainPause')
    }
    function campainStop(id) {
        console.log('campainStop')
    }
    function campainEdit(id) {
        history.push({
            pathname: '/app/search_list_show',
            search: `?id=${id}`,
        });
    }
    function campainDelete(id) {
        console.log(' mailing list update ' + postStatus);
        console.log('campainDelete')
    }




    const getContent=()=>{
        if(postStatus==='loading' || postStatus==='idl'){
            return <Spinner/>
        }else {

                return <div className={styles.wrapper}>

                        <div className={styles.header_wrapper}>
                            <span className={styles.header}>Mailing List</span>
                            <span className={styles.body}>Here you can add and manage your Mailing List</span>
                        </div>

                    {Object.keys(campaigns).length>0?<div className={styles.tools}>
                            <div className={styles.search_wrapper}>
                                <Search
                                    type={'text'}
                                    name={'search'}
                                    value={search.string}
                                    onchange={(data)=>{
                                        dispatch(changeSearchString(data))
                                    }}
                                    radius={'8px'}
                                />
                            </div>
                            <div className={styles.selector_wrapper}>
                                <Selector
                                    active={search.status}
                                    data={statusList}
                                    klick={(data)=>{
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
                                <UniversalButton
                                    name={"+ Add mailing list"}
                                    click={()=>{changeLocation('/app/search_list_new/')}}
                                    color={'#F8F9FB'}
                                    decoration={''}
                                    baground={'#5276F4'}
                                    weight={'600'}
                                    borderRadius={'8px'}
                                />
                            </div>
                        </div>:''}

                    {Object.keys(campaigns).length>0?<div className={styles.subwrapper}>
                            {(blure || blure2) ?<Blure z={'100'}/>:''}
                            {campaigns.map((item,index)=>{
                                return <div key={index} className={styles.card_wrapper}><SearechCard
                                    id={item.id}
                                    name={item.name}
                                    status={item.state}
                                    count={item.count}
                                    accounts={accounts}
                                    accountid={item.account_id}
                                    actions={{'pause':campainPause,'stop':campainStop,'edit':campainEdit,'delete':campainDelete}}

                                /></div>
                            })}
                        </div>:''}

                    {Object.keys(campaigns).length>0?'':<NoData
                        header={'There are no mailing lists'}
                        subheader={'Please, click below to create the first one.'}
                        width={360}
                    >
                        <div className={styles.button_wrapper}>
                            <RegButtonLinck
                                name={'+ Add mailing list'}
                                color={'#F8F9FB'}
                                baground={'#5276F4'}
                                click={()=>{changeLocation('/app/search_list_new/')}}
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

export default MailingList;
