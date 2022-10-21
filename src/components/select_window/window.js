import React from 'react'
import styles from './window.module.css'


function Window(props){

    return (
        <div className={styles.wrapper}>
            <div className={styles.window}>
                <div className={styles.subwrapper}>
                    <div className={styles.header}>
                        {props.header}
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
