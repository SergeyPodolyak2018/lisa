import React from 'react'
import { Link, useLocation} from "react-router-dom"
import styles from './camp_nav.module.css'


function CampNav(){
    const location = useLocation();
    return (
        <div className={styles.wrapper}>

            <div className={styles.link_wrapper}>
                <Link to={"/app/campaigns/all"}>
                    <span className={`${styles.link} ${location.pathname.includes('/app/campaigns/all')?styles.active:""}`}>
                        <span className={styles.link_text}>
                            All campaigns
                        </span>
                    </span>
                </Link>
                <Link to={"/app/campaigns/schedule"}>
                    <span className={`${styles.link} ${location.pathname.includes('/app/campaigns/schedule')?styles.active:""}`}>
                        <span className={styles.link_text}>
                            Schedule
                        </span>
                    </span>
                </Link>
            </div>

        </div>
    )
}


export default CampNav
