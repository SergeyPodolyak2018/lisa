import React, {useEffect, useState} from 'react';
import styles from './campaigns_schedule.module.css';

import {
    useHistory
} from 'react-router-dom'






import {useDispatch, useSelector} from "react-redux";
import {fetchCampaignsSchedule,changeTime,changeSearchString,changeDate} from "./CampaignsScheduleSlice";


import SchedCard from    '../../components/schedule_card/sched_card'
import NoData from    '../../components/no_data/no_data'
import RegButtonLinck from '../../components/regular_button_link/regular_button_link'
import Search from "../../components/input/search/search";
import Selector from "../../components/input/selector_icon/selector";
import {ReactComponent as ArrowA} from "../campaigns_all/ArrowsActive.svg";
import {ReactComponent as Arrow} from "../campaigns_all/Arrows.svg";
import ConfirmWindow from "../../components/confirm_window/window";
import ResetButton from "../../components/reset_button/reset_button";
import Button from "../../components/button/button";
import Spinner from "../../components/spinner/spinner";




function CampaignsAll () {
    let history = useHistory();


    const dispatch = useDispatch()
    const postStatus = useSelector(state => state.campaignsSchedule.status);
    const error=useSelector(state=>state.campaignsSchedule.error);
    const schedule=useSelector(state=>state.campaignsSchedule.schedule);
    const search=useSelector(state=>state.campaignsSchedule.search);
    const [confirmWindow,setConfirmWindow] = useState(false);
    const [deleted,setDeleted] = useState('');

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
            dispatch(fetchCampaignsSchedule())
        }
    }, []);

    const changeLocation=(location)=>{
        history.push(location);
    }

    const cardAction=(data)=>{
        console.log(data)
        switch (data.type) {
            case 'delete':
                setDeleted(data.id);
                setConfirmWindow(true);
                break;
            case 'edit':

                break;

        }

    }



    const getContent=()=>{
        if(postStatus==='loading' || postStatus==='idl'){
            return <Spinner/>
        }else {
            if (schedule.length > 0) {
                return <div className={styles.wrapper}>
                    {confirmWindow ? <ConfirmWindow
                        header={'Delete?'}
                        subheader={'Are you sure you want to delete the schedule?'}
                        buttons={
                            <div className={styles.ImportContainer}>
                                <div className={styles.buttonWrapperImport} style={{width: '55px'}}>
                                    <ResetButton
                                        click={() => {
                                            setConfirmWindow(false);
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
                                            setConfirmWindow(false);
                                            setDeleted('')
                                        }}
                                    />
                                </div>

                            </div>
                        }
                    /> : ''}
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
                                padding={'10px 8px 8px 10px'}

                            />
                        </div>
                        <div className={styles.button_wrapper2}>
                            <RegButtonLinck
                                name={'+ New shedule'}
                                color={'#F8F9FB'}
                                baground={'#5276F4'}
                                click={() => {
                                    changeLocation('/app/campaigns/new_shedule')
                                }}

                            />
                        </div>
                    </div>

                    <div className={styles.subwrapper}>
                        {schedule.map((item, index) => {
                            return <div key={index} className={styles.card_wrapper}><SchedCard
                                name={item.name}
                                description={item.description}
                                time_from={item.time_from}
                                time_to={item.time_till}
                                days={item.days}
                                id={item.id}
                                action={cardAction}
                            /></div>
                        })}
                    </div>

                </div>


            } else {
                return <NoData
                    header={'There are no schedules yet '}
                    subheader={'Please, click below to create the first one.'}
                    width={341}
                >
                    <div className={styles.button_wrapper}>
                        <RegButtonLinck
                            name={'+ Add shedule'}
                            color={'#F8F9FB'}
                            baground={'#5276F4'}
                            click={() => {
                                changeLocation('/app/campaigns/new_shedule')
                            }}
                        />
                    </div>
                </NoData>
            }
        }
    }







    return(
        getContent()
    )
}

export default CampaignsAll;
