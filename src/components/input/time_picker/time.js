import React from 'react'
import styles from './time.module.css'
import { ReactComponent as Up } from "./ArrowUp.svg"
import { ReactComponent as Down } from "./ArrowDown.svg"
import { ReactComponent as Colon } from "./Colon.svg"
import Button from "../../regular_button/regular_button"


function Time(props){

    const getTime = (min)=>{
        let value;
        if(min){
            if(parseInt(min,10)<10){
                return value='0'+parseInt(min,10);
            }
            return ''+parseInt(min,10)
        }

    }

    const changevalue = (data,type)=>{
        console.log(data);
        let value
        if(type==='min'){
            let tempdata;
            if(parseInt(data,10)>59 || !data){
                tempdata='0';
            }else{
                tempdata=''+parseInt(data,10);
            }
            value={min:tempdata,hour:props.value.hour,ampm:props.value.ampm}
        }
        if(type==='hour'){
            let tempdata;
            if(parseInt(data,10)>11 || !data){
                tempdata='0';
            }else{
                tempdata=''+parseInt(data,10);
            }
            value={min:props.value.min,hour:tempdata,ampm:props.value.ampm}
        }
        props.onChange(value)
    }

    const iterator = (data,type)=>{
        console.log(data);
        let value

            if(type==='hour'){
                value={min:props.value.min,hour:parseInt(props.value.hour,10)+data}
            }
            if(type==='min'){
                value={hour:props.value.hour,min:parseInt(props.value.min,10)+data}
            }


        props.onChange(value)
    }

    const amPm = (data)=>{
        let value;
        value={min:props.value.min,hour:props.value.hour,ampm:data};
        props.onChange(value)
    }

    console.log(props)

    return (
        <div className={styles.input_wrapper}>

            <div className={styles.time_wrapper}>
                <div className={styles.arrow_wrapper}><Up/></div>
                <input value={parseInt(props.value.hour,10)} type="number" min="0" max="12" onChange={(e)=>{changevalue(e.target.value,'hour')}}/>
                <div className={styles.arrow_wrapper}><Down/></div>
            </div>

            <Colon className={styles.colon}/>

            <div className={styles.time_wrapper}>
                <div className={styles.arrow_wrapper}><Up/></div>
                <input value={parseInt(props.value.min,10)} type="number" min="0" max="59" onChange={(e)=>{changevalue(e.target.value,'min')}} />
                <div className={styles.arrow_wrapper}><Down/></div>
            </div>
            <div className={styles.button_wrapper}>
                <Button
                    name={'AM'}
                    click={()=>{amPm('AM')}}
                    baground={props.value.ampm==='AM'?'#5276F4':'none'}
                    color={props.value.ampm==='AM'?'#F8F9FB':'#4B4D72'}
                    fontSize={'14px'}
                    lineHeight={'21px'}
                    padding={'0px 8px'}
                    />

                <Button
                    name={'PM'}
                    click={()=>{amPm('PM')}}
                    baground={props.value.ampm==='PM'?'#5276F4':'none'}
                    color={props.value.ampm==='PM'?'#F8F9FB':'#4B4D72'}
                    fontSize={'14px'}
                    lineHeight={'21px'}
                    padding={'0px 8px'}
                    />
            </div>
        </div>
    )
}


export default Time
