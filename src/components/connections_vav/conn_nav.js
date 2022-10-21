import React from 'react'
import { Link, useLocation} from "react-router-dom"
import styles from './conn_nav.module.css'


function CampNav(){
    const location = useLocation();
    return (
        <div className={styles.wrapper}>

            <div className={styles.link_wrapper}>
                <Link to={"/app/connections/outgoing"}>
                    <span className={`${styles.link} ${location.pathname.includes('/app/connections/outgoing')?styles.active:""}`}>
                        <span className={styles.link_text}>
                            Outgoing
                        </span>
                    </span>
                </Link>
                <Link to={"/app/connections/incoming"}>
                    <span className={`${styles.link} ${location.pathname.includes('/app/connections/incoming')?styles.active:""}`}>
                        <span className={styles.link_text}>
                            Incoming
                        </span>
                    </span>
                </Link>
            </div>

        </div>
    )
}


export default CampNav
