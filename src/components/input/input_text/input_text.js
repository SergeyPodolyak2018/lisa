import React, { useEffect, useState } from 'react'
import styles from './input.module.css'


function InputText(props){
    const [active, setActive] = useState(false);

    const isActive=()=>{
        return (active || (props.value!==''));
    }

    return (
        <div className={styles.input_wrapper}>
            {props.type !=='textarea'?
                    <input
                        className={styles.input}
                        type={props.type}
                        name={props.name}

                        autoComplete="on"
                        value={props.value}
                        onChange={(e) => {
                            props.onchange(e.target.value);
                        }}
                        onFocus={()=>{setActive(true)}}
                        onBlur={()=>{setActive(false)}}
                        style={{paddingTop:props.paddingTop,borderRadius:props.radius}}


                    />:
                    <textarea
                        className={styles.input}

                        name={props.name}

                        autoComplete="on"
                        value={props.value}
                        onChange={(e) => {
                            props.onchange(e.target.value);
                        }}
                        onFocus={()=>{setActive(true)}}
                        onBlur={()=>{setActive(false)}}
                        rows={props.rows}
                        cols={props.cols}
                        style={{paddingTop:props.paddingTop,borderRadius:props.radius}}

                    />


            }
                    <span className={`${styles.placeHolder} ${isActive()?styles.placeholder_active:''} ${(props.type ==='textarea')?styles.text_area:''}`} >
                                        {props.placeholder}
                                    </span>
                </div>
    )
}


export default InputText
