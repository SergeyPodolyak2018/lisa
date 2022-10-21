import React from 'react'
import styles from './window.module.css'


function Window(props){

    return (
        <div className={styles.wrapper} >
            <div className={styles.window} style={{width:props.width}}>
                <div className={styles.subwrapper}>
                    <div className={styles.header}>
                        {props.header}
                    </div>
                    <div className={styles.subheader} style={{width:props.subheaderWidth}}>
                        {props.subheader}
                    </div>
                </div>
                <div className={styles.buttons}>
                    {props.buttons}
                </div>
            </div>
        </div>
    )
}


export default Window
