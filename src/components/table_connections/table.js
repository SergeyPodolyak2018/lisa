import React, {useState} from 'react'
import styles from './table.module.css'
import find from 'lodash/find';
import Checkbox from "../input/checkbox/checkbox";

function Table(props){

    function selectAllCheck() {
        if(props.selected.length===props.data.length){
            if(props.selected.length>0){
                return true;
            }
        }
        return false;
    }
    function selectCheck(item) {
        console.log('selectCheck')
        let index = props.selected.find(function (elm,index) {
            return item===elm;
        })
        if(index){
            return true
        }
        return  false;
    }


    const getRow = (item, index)=>{
        return <tr key={index} className={styles.content}>

            <td>{item.name}</td>
            <td>{item['description']}</td>
            <td>
                <Checkbox
                    click={()=>{console.log(item);props.selectTogle(item.profileId)}}
                    value={selectCheck(item.profileId)}
                    placeholder={''}
                    preventPlaceholder={true}
                    width={'auto'}
                />
            </td>
        </tr>

    }

    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                <tr className={styles.header}>
                    <th>Name Surname</th>
                    <th>Description</th>
                    <th className={styles.checkBoxColumn}>
                        <Checkbox
                            click={()=>{props.selectAll()}}
                            value={selectAllCheck()}
                            placeholder={''}
                            preventPlaceholder={true}
                            width={'auto'}
                        />
                    </th>
                </tr>
                </thead>
                <tbody>
                    {props.data.map((item,index)=>{
                        return getRow(item,index)
                    })}
                </tbody>
            </table>
            {props.children}
        </div>
    )
}


export default Table
