import React, { useEffect, useState } from 'react'
import styles from './date_start.module.css'
import './calendar.css';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from "react-modern-calendar-datepicker";
import { ReactComponent as Active } from "./Calendar.svg"
import { ReactComponent as NotActive } from "./CalendarNotActiv.svg"
import Prevue from '../prevue/prevue'




function DateStart(props){
    const [open, setOpen] = useState(false);

   

    return (
        <div className={styles.wrapper}>
            <div className={styles.input_wrapper}>
                <Prevue
                    value={props.value?`${props.value.month}/${props.value.day}/${props.value.year}`:''}
                    placeholder={'Start date'}
                    activeIcon={<Active/>}
                    notActiveIcon={<NotActive/>}
                    click={()=>{setOpen(!open)}}
                    active={open}


                />
            </div >
            {
                open?<div className={styles.calendar_wrapper}>
                <Calendar
                    value={props.value}
                    onChange={props.setValue}
                    calendarClassName="responsive-calendar" // added this
                    shouldHighlightWeekends
                />
            </div>:''
            }
            

            
        </div>
    )
}


export default DateStart