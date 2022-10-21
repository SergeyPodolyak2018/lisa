import React from 'react'
import styles from './dash_campaign_card.module.css'


function DashCampCard(props){
   
    return (
        <div className={styles.wrapper}>
            <span className={styles.header}>{props.header}</span>
            <span className={styles.data} style={{color:props.color}}>{props.data}</span>
            <span className={styles.exp}>{props.exp}</span>
        </div>
    )
}


export default DashCampCard
