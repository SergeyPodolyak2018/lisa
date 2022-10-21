import React, { useEffect } from 'react'
import styles from "./wrapper.module.css"
import { ReactComponent as Logo } from "./LOGO.svg"

function Wrapper(props){


    return (
        <div className={styles.wrapper}>
            <div className={styles.subwrapper}>
                <div className={styles.logo_wrapper}>
                    <Logo/>
                </div>
                <div  className={styles.face_wrapper}>
                    {props.user}
                </div>

                {props.nav}
                <div className={styles.logout_wrapper}>
                    {props.logout}
                </div>
            </div>

            <div className={styles.content_wrapper}>{props.children}</div>
        </div>
    )
}


export default Wrapper
