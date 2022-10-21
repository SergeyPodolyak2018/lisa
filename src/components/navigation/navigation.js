import React from 'react'
import { Link, useLocation} from "react-router-dom"
import styles from './navigation.module.css'
import { ReactComponent as Chart } from "./Chart-Square.svg"
import { ReactComponent as Category } from "./Category.svg"
import { ReactComponent as Users } from "./Users.svg"
import { ReactComponent as Note } from "./Notebook.svg"
import { ReactComponent as Account } from "./Variant7.svg"
import { ReactComponent as Key } from "./Key.svg"
import { ReactComponent as Message } from "./Message.svg"



function Navagation(props){
    const location = useLocation()
    return (
        <div className={styles.wrapper}>
            {props.user}
            <div className={styles.link_wrapper}>
                <Link to={"/app/dashboard/calendar"}>
                    <span className={`${styles.link} ${location.pathname.includes('/app/dashboard/')?styles.active:""}`}>
                        <span className={styles.link_icon}>
                            <Chart/>
                        </span>
                        <span className={styles.link_text}>
                            Dashboard
                        </span>
                    </span>
                </Link>
                <Link to={"/app/campaigns/all"}>
                    <span className={`${styles.link} ${location.pathname.includes('/app/campaigns/')?styles.active:""}`}>
                        <span className={styles.link_icon}>
                            <Category/>
                        </span>
                        <span className={styles.link_text}>
                            Campaigns
                        </span>
                    </span>
                </Link>
                <Link to={"/app/search_list"}>
                    <span className={`${styles.link} ${location.pathname.includes('/app/search_list')?styles.active:""}`}>
                        <span className={styles.link_icon}>
                            <Message/>
                        </span>
                        <span className={styles.link_text}>
                            Search Lists
                        </span>
                    </span>
                </Link>
                <Link to={"/app/connections/outgoing"}>
                    <span className={`${styles.link} ${location.pathname.includes('/app/connections/')?styles.active:""}`}>
                        <span className={styles.link_icon}>
                            <Users/>
                        </span>
                        <span className={styles.link_text}>
                            Connections
                        </span>
                    </span>
                </Link>
                <Link to={"/app/templates/relevant"}>
                    <span className={`${styles.link} ${location.pathname.includes('/app/templates/')?styles.active:""}`}>
                        <span className={styles.link_icon}>
                            <Note/>
                        </span>
                        <span className={styles.link_text}>
                            Templates
                        </span>
                    </span>
                </Link>
                <Link to={"/app/accounts"}>
                    <span className={`${styles.link} ${location.pathname.includes('/app/accounts')?styles.active:""}`}>
                        <span className={styles.link_icon}>
                            <Account/>
                        </span>
                        <span className={styles.link_text}>
                            Accounts
                        </span>
                    </span>
                </Link>
                {/*<Link to={"/app/profile"}>
                    <span className={`${styles.link} ${location.pathname.includes('/app/profile/')?styles.active:""}`}>
                        <span className={styles.link_icon}>
                            <Key/>
                        </span>
                        <span className={styles.link_text}>
                            Profile
                        </span>
                    </span>
                </Link>*/}
            </div>
            {props.logout}
        </div>
    )
}


export default Navagation
