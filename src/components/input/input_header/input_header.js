import React, { useEffect, useState } from 'react'
import styles from './input.module.css'


function InputHeader(props){
    const [active, setActive] = useState(false);

    return (
        <div className={styles.input_wrapper}>
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
                    />
                    {
                        active?props.activeIcon:props.notActiveIcon
                    }
                    
        </div>
    )
}


export default InputHeader
