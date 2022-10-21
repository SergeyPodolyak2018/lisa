import React from 'react'
import styles from './month_changer.module.css'
import { ReactComponent as ArrowR } from "./Arrow-Right.svg"
import { ReactComponent as ArrowL } from "./Arrow-Left.svg"


function MonthChanger(props){
    return (
        <div className={styles.wrapper}>

            <div className={styles.arrow} onClick={props.clickPrevious}>
                <ArrowL/>
            </div>
            <div className={styles.text}>
                {props.month}
            </div>
            <div className={styles.arrow} onClick={props.clickNext}>
                <ArrowR/>
            </div>

        </div>
    )
}


export default MonthChanger
