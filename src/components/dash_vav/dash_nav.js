import React from 'react'
import { Link, useLocation} from "react-router-dom"
import styles from './dash_nav.module.css'


function DashNav(){
    const location = useLocation();
    return (
        <div className={styles.wrapper}>

            <div className={styles.link_wrapper}>
                <Link to={"/app/dashboard/calendar"}>
                    <span className={`${styles.link} ${location.pathname.includes('/app/dashboard/calendar')?styles.active:""}`}>
                        <span className={styles.link_text}>
                            Calendar
                        </span>
                    </span>
                </Link>
                <Link to={"/app/dashboard/campaigns"}>
                    <span className={`${styles.link} ${location.pathname.includes('/app/dashboard/campaigns')?styles.active:""}`}>
                        <span className={styles.link_text}>
                            Campaigns
                        </span>
                    </span>
                </Link>
                <Link to={"/app/dashboard/connections"}>
                    <span className={`${styles.link} ${location.pathname.includes('/app/dashboard/connections')?styles.active:""}`}>
                        <span className={styles.link_text}>
                            Connections
                        </span>
                    </span>
                </Link>

            </div>

        </div>
    )
}


export default DashNav
