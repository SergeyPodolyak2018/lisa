import React from 'react'

import { logoutTogle } from '../../features/login/loginSlice';
import { useDispatch } from 'react-redux';

import styles from './logout_button.module.css'
import { ReactComponent as Exit } from "./Logout.svg"

function LogoutButton(props){

    const dispatch = useDispatch();

    return (
        <div className={styles.wrapper} onClick={()=>{dispatch(logoutTogle(true))}}>
            <div className={styles.icon_wrapper}>
                <Exit/>
            </div>
            <div className={styles.content_wrapper}>
                <span>Log Out</span>
            </div>
        </div>
    )
}


export default LogoutButton
