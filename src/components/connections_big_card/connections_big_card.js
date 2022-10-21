import React from 'react'
import styles from './connections_big_card.module.css'
import { ReactComponent as Icon } from "./Vector.svg"


function ConnBigCard(props){
   
    return (
        <div className={styles.wrapper}>
            <span className={styles.header}>{props.header}</span>
            <span className={styles.data} style={{color:props.color}}>{props.data}</span>
            <span className={styles.exp}>{props.exp}</span>
            <div className={styles.icon_wrapper}>
                <Icon/>
            </div>
        </div>
    )
}


export default ConnBigCard