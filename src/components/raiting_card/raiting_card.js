import React from 'react'
import styles from './raiting_card.module.css'



function ConnBigCard(props){

    console.log(props.data);

    const getHeight=(type)=>{
        let summ=props.data.pending + props.data.acepted + props.data.rejected;
        let rez= (props.data[type] * 100 / summ);
        return rez;
    }

   
    return (
        <div className={styles.wrapper}>
            <span className={styles.header}>Outgoing Connections Rating</span>

            <span className={styles.selector}>
                <span className={styles.selector_header}>LinkedIn Account:</span>
                <span>{props.children}</span>
            </span>
            <div className={styles.chart_wrapper}>
                <div className={styles.bur} style={{"height":getHeight('pending') +'%', "backgroundColor":"#CCE4F9"}}>
                    <span className={styles.bur_data}>{props.data.pending}</span>
                    <span className={styles.bur_header}>Pending</span>
                </div>
                <div className={styles.bur} style={{"height":getHeight('acepted') +'%', "backgroundColor":"#E5F7CF"}}>
                    <span className={styles.bur_data}>{props.data.acepted}</span>
                    <span className={styles.bur_header}>Accepted</span>
                </div>
                <div className={styles.bur} style={{"height":getHeight('rejected') +'%', "backgroundColor":"#F0C7D1"}}>
                    <span className={styles.bur_data}>{props.data.rejected}</span>
                    <span className={styles.bur_header}>Rejected</span>
                </div>
                
            </div>
        </div>
    )
}


export default ConnBigCard