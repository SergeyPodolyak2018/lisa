import React from 'react'

import styles from './account.module.css'
import { ReactComponent as Cross } from "./X.svg"


function Account(props){
    return (
        <div className={styles.person_wrapper}>
            <div className={styles.person_wrapper_face}>
                <img src={props.img}></img>
            </div >
            <div className={styles.person_wrapper_name}>
                {props.name}
            </div>
            <div className={styles.crossButton}>
                <Cross onClick={props.remove}/>
            </div>
        </div>
    )
}


export default Account
