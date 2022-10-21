import React, { useEffect, useState } from 'react'
import styles from './input.module.css'


function Code(props){
    const [active, setActive] = useState(false);

    const isActive=()=>{
        return (active || (props.value!==''));
    }

    return (
        <div className={styles.input_wrapper}>
            <input maxLength={6}
                   autoComplete={'off'}
                   className={styles.input}
                   value={props.value}
                   name={props.name}
                   onChange={(e) => {
                       props.onchange(e.target.value);
                   }}
                   onFocus={()=>{setActive(true)}}
                   onBlur={()=>{setActive(false)}}
                   style={{paddingTop:props.paddingTop,borderRadius:props.radius}}
            />


                </div>
    )
}


export default Code
