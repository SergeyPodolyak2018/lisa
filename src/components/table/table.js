import React, {useState} from 'react'
import styles from './table.module.css'
import find from 'lodash/find';
import {GetOcupation} from '../../utils/Utils'
import { ReactComponent as ArrowC } from "./Arrow-Down.svg"

function Table(props){
    const [open, setOpen] = useState(false);

    const getRow = (item, index)=>{
        return <tr key={index} className={styles.content}>
                <td>{item.firstName + ' ' + item.lastName}</td>
                <td>{item.occupation}</td>

            <td>{item.date}</td>
            <td className={styles.action} onClick={()=>{props.action(item.id)}}>Delete</td>
        </tr>

    }




    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                <tr className={styles.header}><th>Name Surname</th><th>Description</th><th>Date of request <span><ArrowC/></span></th><th>Action</th></tr>
                </thead>
                <tbody>
                    {props.data.map((item,index)=>{
                        return getRow(item,index)
                    })}
                </tbody>
            </table>
        </div>
    )
}


export default Table
