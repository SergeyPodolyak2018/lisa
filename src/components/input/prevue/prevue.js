import React from 'react'
import styles from './prevue.module.css'


function Prevue(props){
    
    return (
        <div className={styles.input_wrapper}>
                    <div
                        className={styles.input}
                        onClick={()=>{props.click(true)}}
                    >
                        {props.value}
                    </div>
                    <span className={`${styles.placeHolder} ${(props.value)?styles.placeholder_active:''} ${(props.active)?styles.active_input:''}`} >
                        {props.placeholder}
                    </span>
                    

                    {
                        props.active?props.activeIcon:props.notActiveIcon
                    }
                    
                </div>
    )
}


export default Prevue
