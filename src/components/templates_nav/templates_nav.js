import React from 'react'
import { Link, useLocation} from "react-router-dom"
import styles from './templates_nav.module.css'


function TemplatesNav(){
    const location = useLocation();
    return (
        <div className={styles.wrapper}>

            <div className={styles.link_wrapper}>
                <Link to={"/app/templates/relevant"}>
                    <span className={`${styles.link} ${location.pathname.includes('/app/templates/relevant')?styles.active:""}`}>
                        <span className={styles.link_text}>
                            Relevant
                        </span>
                    </span>
                </Link>
                <Link to={"/app/templates/archived"}>
                    <span className={`${styles.link} ${location.pathname.includes('/app/templates/archived')?styles.active:""}`}>
                        <span className={styles.link_text}>
                            Archived
                        </span>
                    </span>
                </Link>
            </div>

        </div>
    )
}


export default TemplatesNav
