import React, {useEffect} from 'react';
import styles from './dashboard_calendar.module.css';
import './calendar.css';

import MonthChanger from    '../../components/month_changer/month_changer'
import {useDispatch, useSelector} from "react-redux";
import {fetchCalendar,increment, decrement} from "./dashboardCalendarSlice";

import NoData from    '../../components/no_data/no_data'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!


//=====================================================================================
// import Scheduler, { Resource } from 'devextreme-react/scheduler';
// import { employees, data } from './data.js';
// import DataCell from './DataCell.js';
// import ResourceCell from './ResourceCell.js';
// const currentDate = new Date(2021, 5, 2, 11, 30);
// const groups = ['employeeID'];
// const views = ['month'];
//===================================================================================

function DashboardCalendar () {
    const dispatch = useDispatch()
    const month = useSelector(state => state.calendar.month);
    const postStatus = useSelector(state => state.calendar.status);
    const error=useSelector(state=>state.calendar.error);
    const events=useSelector(state=>state.calendar.events);
    const daysNames =['Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday','Sunday'];

    const calendarRef = React.createRef()


    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchCalendar())
        }
    }, []);
    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchCalendar())
        }
    }, [month]);

    const getMonth = (index)=>{
    let month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return month[index];
    };

    const nextMons=()=>{
        let calendarApi = calendarRef.current.getApi()
            calendarApi.next()
    }

    const previousMons=()=>{
        let calendarApi = calendarRef.current.getApi()
            calendarApi.prev()
    }

    
    const getContent=()=>{
        if(events.length>0){
            return <div className={styles.wrapper}>
            <div className={styles.subwrapper}>
            <div className={styles.month_changer_wrapper}>
                <MonthChanger
                    month={getMonth(month)}
                    clickPrevious={()=>{previousMons(); dispatch(decrement())}}
                    clickNext={()=>{nextMons(); dispatch(increment())}}
                />
            </div>
            <div className={styles.days}>
                    {daysNames.map((item,id)=>{
                        return <span key={id} className={styles.day_wrapper}>{item}</span>
                    })}
            </div>
            <div className={styles.calendar_wrapper}>
                

               <FullCalendar
                    ref={calendarRef}
                    month={month}
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    events={events}
                    dayHeaders={false}
                    headerToolbar={false}
                    height={'100%'}
                    firstDay={1}
                    weekMode={'variable'}
                    fixedWeekCount={false}

                    
                />
                
                    {/*<Scheduler
                        timeZone="America/Los_Angeles"
                        dataSource={data}
                        dataCellComponent={DataCell}
                       
                        groups={groups}
                        views={views}
                        defaultCurrentView="month"
                        defaultCurrentDate={currentDate}
                        height={600}
                        showAllDayPanel={true}
                        firstDayOfWeek={1}
                        startDayHour={8}
                        endDayHour={18}
                      >
       
                      </Scheduler>*/}
            </div>





        </div>
        </div>
        }else{
            return <NoData/>
        }
    }







    return(
        getContent()
    )
}

export default DashboardCalendar;
