import React, { useEffect, useState } from 'react'
import styles from './clock.module.css'
import './clock.css';
import TimePicker from "../time_picker/time";
import "rc-time-picker/assets/index.css";
import { ReactComponent as Active } from "./Clock.svg"
import { ReactComponent as NotActive } from "./ClockNotActive.svg"
import Prevue from '../prevue/prevue'
import moment from "moment";




function Clock(props){
    const [open, setOpen] = useState(false);

   const formater=(n)=>{
           return n > 9 ? "" + n: "0" + n;
   }


    return (
        <div className={styles.wrapper}>
            <div className={styles.input_wrapper}>
                <Prevue
                    value={`${formater(props.value.hour)}:${formater(props.value.min)}`}
                    placeholder={props.placeholder}
                    activeIcon={<Active/>}
                    notActiveIcon={<NotActive/>}
                    click={()=>{setOpen(!open)}}
                    active={open}


                />
            </div >
            {
                open?<div className={styles.calendar_wrapper}>
                <TimePicker
                    value={props.value}
                    onChange={props.setValue}
                />
            </div>:''
            }



        </div>
    )
}


export default Clock
