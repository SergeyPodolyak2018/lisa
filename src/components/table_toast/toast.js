import React from 'react'
import styles from './toast.module.css'
import find from 'lodash/find';

import { ReactComponent as Cross } from "./X.svg"
import { ReactComponent as Onn } from "./Switchon.svg"
import { ReactComponent as Off } from "./Swithchoff.svg"





function Toast(props){

    return (
        <div className={styles.wrapper}>
            <div className={styles.subwrapper1}>
                <Cross onClick={props.remove}/>
                <span className={styles.text1}>
                    {props.selected} accounts selected
                </span>
            </div>
            <div className={styles.subwrapper2} onClick={props.switch}>
                <span className={styles.text2}>
                    Connect
                </span>
                {props.switchstatus?<Onn/>:<Off/>}
            </div>
            <div className={styles.subwrapper3}>
                <span className={styles.button} onClick={props.delete}>
                    Delete
                </span>
            </div>
        </div>
    )
}


export default Toast
