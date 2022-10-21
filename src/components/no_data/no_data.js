import React from 'react'
import styles from "./no_data.module.css"
import { ReactComponent as Pic } from "./Pic.svg"

function NoData(props){


    return (
        <div className={styles.arhiwrapper}>
            <div className={styles.wrapper} style={{width:props.width +'px'}}>
                <div className={styles.pic_wrapper}>
                    <Pic/>
                </div>
                <div className={styles.text_wrapper}>
                    <span className={styles.main_text}>{!props.header?'No incoming data':props.header}</span>
                    <span className={styles.sub_text}>{!props.subheader?'There is no incoming data to analyse yet':props.subheader}</span>
                </div>

                {props.children}

            </div>
        </div>
    )
}


export default NoData
