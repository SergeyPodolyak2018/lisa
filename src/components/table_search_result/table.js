import React, {useState} from 'react'
import styles from './table.module.css'
import {TextPreprocess} from "../../utils/Utils"

function Table(props){



    const getRow = (item, index)=>{
        return <tr key={index} className={styles.content}>

            <td>{TextPreprocess(item['first_name']||'empty')}</td>
            <td>{TextPreprocess(item['last_name']||'empty')}</td>
            <td>{TextPreprocess(item['position_title']||'empty')}</td>
            <td>{TextPreprocess(item['company_name']||'empty')}</td>
            <td>{TextPreprocess(item['location']||'empty')}</td>

        </tr>

    }

    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                <tr className={styles.header}>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>position</th>
                    <th>company name</th>
                    <th>location</th>
                </tr>
                </thead>
                <tbody>
                    {props.data.map((item,index)=>{
                        console.log(item);
                        return getRow(item,index)
                    })}
                </tbody>
            </table>
            {props.children}
        </div>
    )
}


export default Table
