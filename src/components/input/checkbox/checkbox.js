import React, { useEffect, useState } from 'react'
import styles from './checkbox.module.css'
import { ReactComponent as Active } from "./Active.svg"
import { ReactComponent as NotActive } from "./NotActive.svg"


function CheckBox(props){


    return (
        <div className={styles.input_wrapper} onClick={props.click} style={{width:props.width}}>
            <span className={styles.box}>

                {props.value?<Active/>:<NotActive/>}
            </span>
            {props.preventPlaceholder?'':
            <span className={styles.placeHolder}>
                {props.placeholder}
            </span>
            }
        </div>
    )
}


export default CheckBox
