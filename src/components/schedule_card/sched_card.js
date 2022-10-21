import React, {useState, useEffect} from 'react';
import styles from './sched_card.module.css';
import { ReactComponent as Kebab } from "./kebab.svg";
import {TextPreprocess} from "../../utils/Utils";

function SchedCard(props){
    const [menuOpen, setMenuOpen] = useState(false);




    const campaignAction = (id,param)=>{
        props.action({id:id,type:param})
    }

    const timeconverter = (time)=>{

        const timeString12hr = new Date('1970-01-01T' + time + 'Z')
            .toLocaleTimeString({},
                {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
            );
        return timeString12hr
    };
    const getDays = (dayArrey)=>{

        const daysValue={1:'Sun',2:'Mon',3:'Tue',4:'Wed',5:'Thu',6:'Fri',7:'Sat'};

        if(dayArrey.length===7){
            return 'Sun - Sat'
        }
        if(dayArrey.length===6){
            let tempString='escept';
            for(let i in daysValue){
                if(dayArrey.indexOf(parseInt(i))===-1){
                    tempString = tempString + ' '+daysValue[i];
                }
            }

            return  tempString;
        }
        let dayString = '';
        dayArrey.forEach((item,index)=>{
            dayString=dayString+daysValue[item]
            if((dayArrey.length-1)!==index){
                dayString=dayString+','
            }
        })


        return dayString
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapper_content}>
                <span className={styles.name}>{props.name}</span>
                <span className={styles.description}>{TextPreprocess(props.description)||'Empty'}</span>
                <span className={styles.template}><span className={styles.icon}>Period:</span><span>{timeconverter(props.time_from) +'-'+timeconverter(props.time_to)}</span></span>
                <span className={styles.template}><span className={styles.icon}>Days:</span><span>{getDays(props.days)}</span></span>
                <div className={styles.kebub_wrapper} onClick={()=>{setMenuOpen(true)}}><Kebab/></div>
            </div>

            {menuOpen?<div className={styles.menu_wrappe} onClick={()=>{setMenuOpen(false)}}>
                <div className={styles.menu_list}>
                    <span onClick={()=>{campaignAction(props.id,'edit')}}>Edit</span>
                    <span onClick={()=>{campaignAction(props.id,'delete')}}>Delete</span>
                </div>
            </div>:''}




        </div>
    )
}


export default SchedCard
