import React, {useState} from 'react'
import styles from './table.module.css'
import find from 'lodash/find';
import {GetOcupation} from '../../utils/Utils'
import { ReactComponent as ArrowC } from "./Arrow-Down.svg"
import { ReactComponent as Edit } from "./Edit.svg"
import { ReactComponent as Trash } from "./Trash.svg"
import { ReactComponent as Eye } from "../../features/login/eye.svg"
import { ReactComponent as OpenEye } from "./Visibillity.svg"
import Button from "../regular_button/regular_button";
import Checkbox from "../input/checkbox/checkbox";

const stat={
    0:{color:'#7E86A5',
        bagroundColor:'#EEF0F6',
        name:'Undefined'
    },
    banned:{color:'#7E86A5',
        bagroundColor:'#EEF0F6',
        name:'Undefined'
    },
    disconected:{color:'#F17155',
        bagroundColor:'#FCE0D9',
        name:'Disconected'
    },
    connected:{color:'#85D322',
        bagroundColor:'#EDFDD8',
        name:'Connected'
    }
}



function Table(props){
    const [open, setOpen] = useState(false);

    function showPassord(item) {
        let index = props.showPassword.find(function (elm,index) {
            return item.id===elm;
        })
        if(index){
            return true
        }
        return  false;
    }
    function codePassword(item) {
        let index = props.showPassword.findIndex(function (elm,index) {
            return item.id===elm;
        })
        if(index<0){
            return item.password.replace(/./g, "*");
        }
        return  item.password;
    }
    const getParam = (status,param)=>{
        if(!status){
            return stat[0][param]
        }
        return stat[status][param]

    }

    function selectAllCheck() {
        return  props.selected.length===props.data.length;
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
            <td><Checkbox
                click={()=>{props.selectTogle(item.id)}}
                value={selectCheck(item.id)}
                placeholder={''}
                preventPlaceholder={true}
                width={'auto'}
            /></td>
                <td>{item.firstName + ' ' + item.lastName}</td>
            <td>{item['username']}</td>
            <td>{item.password?codePassword(item):<span className={styles.icon_wrapper_delete} onClick={()=>{props.resetPassword(item.id)}}>Reset password</span>}</td>
            {item.password?<td onClick={()=>{props.togleEye(item.id)}}>{showPassord(item)?<span className={styles.icon_wrapper}><OpenEye/></span>:<span className={styles.icon_wrapper}><Eye/></span>}</td>:<td></td>}

            <td><Button name={getParam(item.status,'name')} click={()=>{console.log('cklik')}}
                        baground={getParam(item.status,'bagroundColor')}
                        color={getParam(item.status,'color')}
                        padding={'6px 20px'}
                        fontSize={'12px'}
                        lineHeight={'18px'}
                        border={'none'}
            /></td>
            <td className={styles.action}>
                <span className={styles.icon_wrapper_delete} onClick={()=>{props.trash(item.id)}}>Delete</span></td>
        </tr>

    }

    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                <tr className={styles.header}><th>
                    <Checkbox
                        click={()=>{props.selectAll()}}
                        value={selectAllCheck()}
                        placeholder={''}
                        preventPlaceholder={true}
                        width={'auto'}
                    /></th><th>Name Surname</th><th>e-mail</th><th>Password</th><th></th><th>Status</th><th>Action</th></tr>
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
