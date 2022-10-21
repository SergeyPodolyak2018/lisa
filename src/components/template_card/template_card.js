import React, {useState, useEffect} from 'react';
import styles from './template_card.module.css';
import find from 'lodash/find';
import { ReactComponent as Kebab } from "./kebab.svg";
import {TextCuter} from '../../utils/Utils'

function TemplateCard(props){
    const [menuOpen, setMenuOpen] = useState(false);

    const campaignAction = (id,param)=>{
        props.action({id:id,type:param});
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapper_content}>
                <span className={styles.name}>{props.name}</span>
                <span className={styles.description}>{TextCuter(props.description,140)}</span>
                <div className={styles.kebub_wrapper} onClick={()=>{setMenuOpen(true)}}><Kebab/></div>
            </div>

            {menuOpen?<div className={styles.menu_wrappe} onClick={()=>{setMenuOpen(false)}}>
                <div className={styles.menu_list}>
                    {props.actionList.map((item,index)=>{
                        return <span key={index} onClick={()=>{campaignAction(props.id,item)}}>{item}</span>
                    })}

                </div>
            </div>:''}




        </div>
    )
}


export default TemplateCard
