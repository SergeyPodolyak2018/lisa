import React, {useEffect, useState} from 'react';
import styles from './campaigns_all.module.css';
import { ReactComponent as Arrow } from "./Arrows.svg"
import { ReactComponent as ArrowA } from "./ArrowsActive.svg"
import { ReactComponent as Filter } from "./Filter.svg"
import { ReactComponent as FilterA } from "./FilterActive.svg"

import {
    useHistory
} from 'react-router-dom'


import {useDispatch, useSelector} from "react-redux";
import {fetchCampaignsAll,changeTime, changeSearchString,changeStatus,changeDate} from "./CampaignsAllSlice";


import CampCard from    '../../components/campaign_card/camp_card'
import NoData from    '../../components/no_data/no_data'
import RegButtonLinck from '../../components/regular_button_link/regular_button_link'
import Search from "../../components/input/search/search";
import Selector from "../../components/input/selector_icon/selector";
import SelectorFilter from "../../components/input/selector_icon_multiple/selector";
import SelectWindow from "../../components/select_window/window";
import Blure from "../../components/blure/blure";
import Spinner from "../../components/spinner/spinner";



function CampaignsAll () {
    let history = useHistory();

    const [selectWindow, setSelectWindow] = useState(false);

    const dispatch = useDispatch();
    const postStatus = useSelector(state => state.campaignsAll.status);
    const error=useSelector(state=>state.campaignsAll.error);
    const campaigns=useSelector(state=>state.campaignsAll.campaigns);
    const search=useSelector(state=>state.campaignsAll.search);
    const accounts=useSelector(state=>state.accounts.accounts);
    const [blure,setBlure]=useState(false);
    const [blure2,setBlure2]=useState(false);

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
    const dateList=[
        {
            id:'default',
            name:'By default'
        },
        {
            id:'start',
            name:'Start date'
        },
        {
            id:'finished',
            name:'Finish date'
        }];

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchCampaignsAll())
        }
    }, []);

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
            pathname: '/app/campaigns/new_campaign_connection',
            search: `?id=${id}`,
        });
    }
    function campainDelete(id) {
        console.log('campainDelete')
    }


    const getContent=()=>{
        if(postStatus==='loading' || postStatus==='idl'){
            return <Spinner/>
        }else {
            if (Object.keys(campaigns).length > 0) {
                if (selectWindow) {
                    return <SelectWindow
                        header={'Add new campaign'}
                        buttons={<div className={styles.button_wrapper_selector}>
                            <RegButtonLinck
                                name={'+ Maling campaign'}
                                color={'#F8F9FB'}
                                baground={'#5276F4'}
                                click={() => {
                                    changeLocation('/app/campaigns/new_campaign');
                                }}
                            />
                            <RegButtonLinck
                                name={'+ Connection campaign'}
                                color={'#F8F9FB'}
                                baground={'#7FBAF1'}
                                click={() => {
                                    changeLocation('/app/campaigns/new_campaign_connection');
                                }}
                            />
                        </div>}
                    />
                } else {
                    return <div className={styles.wrapper}>

                        <div className={styles.tools}>
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
                            <div className={styles.selector_wrapper}>
                                <SelectorFilter
                                    statuses={{
                                        running: false,
                                        paused: false,
                                        stoped: false,
                                        finished: false,
                                    }}
                                    campaign={{
                                        connection: false,
                                        mailing: false,
                                        all: true,

                                    }}
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
                                    open={(type) => {
                                        setBlure(type);
                                    }}

                                />
                            </div>
                            <div className={styles.selector_wrapper2}>
                                <Selector
                                    active={search.date}
                                    data={dateList}
                                    klick={(data) => {
                                        dispatch(changeDate(data))
                                    }}
                                    placeholder={''}
                                    marginTop={'0'}
                                    right={true}
                                    openIcon={<ArrowA/>}
                                    closeIcon={<Arrow/>}
                                    radius={'8px 0px 0px 8px'}
                                    iconRadius={'0px 8px 8px 0px'}
                                    padding={'10px 8px 10px 10px'}
                                    open={(type) => {
                                        setBlure2(type);
                                    }}

                                />
                            </div>
                            <div className={styles.button_wrapper3}>
                                <RegButtonLinck
                                    name={'+ New campaign'}
                                    color={'#F8F9FB'}
                                    baground={'#5276F4'}
                                    click={() => {
                                        setSelectWindow(true)
                                    }}

                                />
                            </div>
                        </div>

                        <div className={styles.subwrapper}>
                            {(blure || blure2) ? <Blure z={'100'}/> : ''}
                            {campaigns.map((item, index) => {
                                return <div key={index} className={styles.card_wrapper}><CampCard
                                    data={item}
                                    actions={{
                                        'pause': campainPause,
                                        'stop': campainStop,
                                        'edit': campainEdit,
                                        'delete': campainDelete
                                    }}

                                /></div>
                            })}
                        </div>

                    </div>
                }


            } else {
                return <NoData
                    header={'There are no campaigns yet'}
                    subheader={'Please, click below to create the first one.'}
                    width={341}
                >
                    <div className={styles.button_wrapper_selector} style={{marginTop: '32px'}}>
                        <RegButtonLinck
                            name={'+ Maling campaign'}
                            color={'#F8F9FB'}
                            baground={'#5276F4'}
                            click={() => {
                                changeLocation('/app/campaigns/new_campaign');
                            }}
                        />
                        <RegButtonLinck
                            name={'+ Connection campaign'}
                            color={'#F8F9FB'}
                            baground={'#7FBAF1'}
                            click={() => {
                                changeLocation('/app/campaigns/new_campaign_connection');
                            }}
                        />
                    </div>
                    {/* <div className={styles.button_wrapper}>
                    <RegButtonLinck
                        name={'+ New campaign'}
                        color={'#F8F9FB'}
                        baground={'#5276F4'}
                        click={()=>{changeLocation('/app/campaigns/new_campaign')}}
                    />
                </div>*/}
                </NoData>
            }
        }
    }







    return(
        getContent()
    )
}

export default CampaignsAll;
