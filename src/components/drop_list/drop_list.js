import React, {useState} from 'react'
import styles from './drop_list.module.css'
import { ReactComponent as Plus } from "./Plus-Circle.svg"
import { ReactComponent as PlusN } from "./Plus-Circle-grey.svg"

function DropList(props){
    const [open, setOpen] = useState(false);
    return (
        <div className={styles.wrapper} onClick={()=>{setOpen(!open)}}>
            <div>{open?<Plus/>:<PlusN/>}</div>
            <span className={`${styles.button_text} ${open?styles.open:''}`}>Add</span>
            {open?<div className={styles.list_wrapper}>
                {props.list.map((item,index)=>{
                    return <div key={index} className={styles.list_item} onClick={()=>{props.select(item)}}>{item}</div>
                })}
            </div>:''}


        </div>
    )
}


export default DropList
