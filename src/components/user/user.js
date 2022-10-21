import React, { useEffect, useState } from 'react'
import {
    useHistory,useParams
} from 'react-router-dom'
import styles from "./user.module.css"
import {GetUserMe} from "../../utils/Query";


function User(props){
    let history = useHistory();
    const [me, setMe] = useState({});

    useEffect(() => {
        GetUserMe()
            .then((data)=>{
                setMe(data);
            })
            .catch((e)=>{
                console.log(e)
            });
    }, []);

    function changeLocation(location,params) {
        history.push({
            pathname: location,
            search: params
        });
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.person_wrapper_face}>
                <img src={!me.img?'/img/Subtract.svg':me.img}></img>
            </div >
            <div className={styles.person_wrapper_info} onClick={()=>{changeLocation('/app/profile')}}>
                <span className={styles.name}>{!me.first_name?'uncknown':me.first_name}</span>
                <span className={styles.name}>{!me.last_name?'uncknown':me.first_name}</span>
            </div>
        </div>
    )
}


export default User
