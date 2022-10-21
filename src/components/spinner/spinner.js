import React, { useEffect } from 'react'
import styles from "./spinner.module.css"
import lottie from "lottie-web";
import Lisa from "./Lisa";

function Spinner(){
    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#react-logo"),
            animationData: Lisa
        });
    }, []);


    return (
        <div className={styles.wrapper}>

            {/*<div className={styles.lds_dual_ring}></div>*/}
            <div id="react-logo" className={styles.logo_container} style={{ width: 500, height: 500 }} />
        </div>
    )
}


export default Spinner
