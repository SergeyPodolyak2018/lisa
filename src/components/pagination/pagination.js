import React from 'react'
import styles from './pagination.module.css'
import { ReactComponent as DArrowL } from "./Double_arrow_left.svg"
import { ReactComponent as DArrowR } from "./Double_arrow_right.svg"
import { ReactComponent as ArrowL } from "./Arrow_left.svg"
import { ReactComponent as ArrowR } from "./Arrow_right.svg"

function Pagination(props){

    return (
        <div className={styles.wrapper}>
            <div className={styles.arrowWrapper}>
                <DArrowL onClick={props.maxLeftClick}/>
                <ArrowL onClick={props.leftClick}/>
            </div>
            <div className={styles.contentWrapper}>
                <span>Page</span>
                <span className={styles.current}>{props.current}</span>
                <span>of {props.total}</span>
            </div>
            <div className={styles.arrowWrapper}>
                <ArrowR onClick={props.rightClick}/>
                <DArrowR onClick={props.maxRightClick}/>
            </div>
        </div>
    )
}


export default Pagination
