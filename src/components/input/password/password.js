import React, { useEffect, useState } from 'react'
import styles from './password.module.css'
import {ReactComponent as Eye} from "../../../features/login/eye.svg";
import {ReactComponent as OpenEye} from "../../../features/login/openeye.svg";


function Password(props){
    const [active, setActive] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const isActive=()=>{
        return (active || (props.value!==''));
    }

    return (
        <div className={styles.input_wrapper}>

            <input
                className={styles.input}
                type={!showPassword?"password":"text"}
                name="password"
                autoComplete="on"
                value={props.value}
                onChange={(e) => {
                    props.onchange(e.target.value);
                }}
                onFocus={()=>{setActive(true)}}
                onBlur={()=>{setActive(false)}}
            />
            <span className={`${styles.placeHolder} ${isActive()?styles.placeholder_active:''}`} >
                                        Password
                                    </span>
            {
                !showPassword?<Eye onClick={()=>{setShowPassword(!showPassword)}}/>:<OpenEye onClick={()=>{setShowPassword(!showPassword)}}/>
            }

        </div>
    )
}


export default Password
