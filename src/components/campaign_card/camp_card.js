import React, {useState, useEffect} from 'react';
import styles from './camp_card.module.css';
import find from 'lodash/find';
import { ReactComponent as Kebab } from "./kebab.svg";
import { ReactComponent as Template } from "./Template.svg";
import { ReactComponent as Date } from "./Vector2.svg";
import { ReactComponent as Person } from "./Vector3.svg";
import { ReactComponent as Search } from "./Vector4.svg";
import { ReactComponent as Schedule } from "./Schedule.svg";
import Button from '../regular_button/regular_button';
import {TimeConverter} from "../../utils/Utils";


function CampCard(props){
    const [menuOpen, setMenuOpen] = useState(false);
    const stat={
        'FINISHED':{color:'#7E86A5',
            bagroundColor:'#EEF0F6',
            name:'Finished'
        },
        'STOPED':{color:'#F17155',
            bagroundColor:'#FCE0D9',
            name:'Stoped'
        },
        'PAUSED':{color:'#F2A32C',
            bagroundColor:'#FCE8CA',
            name:'Paused'
        },
        'RUNNING':{color:'#85D322',
            bagroundColor:'#EDFDD8',
            name:'Running'
        },
        4:{
            color:'#a50833',
            bagroundColor:'#EEF0F6',
            name:'Undefined'
        }
    }

    const getFAces = (id,index)=>{
       return <span key={index} className={styles.round}><img src={getImageLink(id)}></img></span>
    }
    const getImageLink = (id)=>{
        let account = find(props.accounts,(o)=>{
            return o.id === id;
        });
        if(account){
            return account['img'];
        }
        return '#';
    }
    const getNumber = (index)=>{
        return <div key={index} className={styles.round} style={{left:index*20}}><span>{'+'+props.accountsId.length}</span></div>
    }
    const getParam = (status,param)=>{
        let tempStatus = status;
        if(!tempStatus){
            tempStatus=4;
        }
        return stat[tempStatus][param]
    }
    const campaignAction = (id,param)=>{
        if(props.actions && props.actions[param]){
            props.actions[param](id);
        }
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapper_content}>
                <span className={`${styles.template} ${styles.header}` }><span className={styles.icon}><span className={`${styles.round3} ${props.data.type==='Connection'?styles.round1:styles.round2}`} ></span></span><span>{props.data.name}</span></span>

                <div className={styles.subwrapper}>

                    <span className={styles.template}><span className={styles.icon}><Template/></span><span>{props.data.template.name||'Template name'}</span></span>

                    {props.data.type==='Connection'?<span className={styles.template}><span className={styles.icon}><Schedule/></span><span><span>{props.data.schedule.name||'Schedule name'}</span></span></span>
                        :<span className={styles.template}><span className={styles.icon}><Date/></span><span>{TimeConverter(props.data.schedule.time_from) +' - '+ TimeConverter(props.data.schedule.time_till)}</span></span>}

                    {props.data.type==='Connection'?<span className={styles.template}><span className={styles.icon}><Search/></span><span><span>{props.data.search_lists_name ||'Seasrch list name'}</span></span></span>
                        :<span className={styles.template}><span className={styles.icon}>{getFAces('1')}</span><span>{props.data.account||'Account name'}</span></span>}
                </div>
                <div className={styles.kebub_wrapper} onClick={()=>{setMenuOpen(true)}}><Kebab/></div>
            </div>
            <div className={styles.wrapper_faces_buton}>
                <div className={styles.button}>
                    <Button name={getParam(props.data.state,'name')} click={()=>{console.log('cklik')}}
                            baground={getParam(props.data.state,'bagroundColor')}
                            color={getParam(props.data.state,'color')}
                            padding={'6px 20px'}
                            fontSize={'12px'}
                            lineHeight={'18px'}
                            border={'none'}
                    />
                </div>
            </div>
            {menuOpen?<div className={styles.menu_wrappe} onClick={()=>{setMenuOpen(false)}}>
                <div className={styles.menu_list}>
                    <span onClick={()=>{campaignAction(props.data.id,'pause')}}>Pause</span>
                    <span onClick={()=>{campaignAction(props.data.id,'stop')}}>Stop</span>
                    <span onClick={()=>{campaignAction(props.data.id,'edit')}}>Edit</span>
                    <span onClick={()=>{campaignAction(props.data.id,'delete')}}>Delete</span>

                </div>
            </div>:''}




        </div>
    )
}


export default CampCard
