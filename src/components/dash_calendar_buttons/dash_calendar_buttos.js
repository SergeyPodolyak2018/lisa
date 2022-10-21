import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './dash_calendar_buttons.module.css'
import RegularButton from '../regular_button/regular_button'
import MonthChanger from    '../month_changer/month_changer'


function DashCalendarButtons(){
    const time = useSelector(state => state.calendar.time);
    const month = useSelector(state => state.calendar.month);


    const getBaground=(data)=>{
        if(data===time){
            return '#5276F4';
        }
        return 'none';
    }
    const getColor=(data)=>{
        if(data===time){
            return '#F8F9FB';
        }
        return '#4B4D72';
    }

    return (
        <div className={styles.wrapper}>

            <div className={styles.button_wrapper}>
                <RegularButton
                name={'Day'}
                click={()=>{console.log('click')}}
                baground={getBaground('day')}
                color={getColor('day')}
                />
                <RegularButton
                    name={'Week'}
                    click={()=>{console.log('click')}}
                    baground={getBaground('day')}
                    color={getColor('day')}
                />
                <RegularButton
                    name={'Month'}
                    click={()=>{console.log('click')}}
                    baground={getBaground('day')}
                    color={getColor('day')}
                />
                <RegularButton
                    name={'Month'}
                    click={()=>{console.log('click')}}
                    baground={getBaground('day')}
                    color={getColor('day')}
                />


            </div>
            <div className={styles.selector_wrapper}>

                <MonthChanger
                    month={month}
                    clickPrevious={()=>console.log('previous')}
                    clickNext={()=>console.log('next')}
                />
            </div>

        </div>
    )
}


export default DashCalendarButtons
