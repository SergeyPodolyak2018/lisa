import React, {useState, useEffect} from 'react';
import styles from './mailing_card.module.css';
import find from 'lodash/find';
import { ReactComponent as Kebab } from "./kebab.svg";
import { ReactComponent as Template } from "./Vector.svg";
import { ReactComponent as Date } from "./Vector2.svg";
import { ReactComponent as Person } from "./Vector3.svg";
import Button from '../regular_button/regular_button';


function CampCard(props){
    const [menuOpen, setMenuOpen] = useState(false);
    const stat={
        FINISHED:{color:'#7E86A5',
            bagroundColor:'#EEF0F6',
            name:'Finished'
        },
        STOPED:{color:'#F17155',
            bagroundColor:'#FCE0D9',
            name:'Stoped'
        },
        PAUSED:{color:'#F2A32C',
            bagroundColor:'#FCE8CA',
            name:'Paused'
        },
        RUNNING:{color:'#85D322',
            bagroundColor:'#EDFDD8',
            name:'Running'
        },
        COMPLETE:{color:'#7E86A5',
            bagroundColor:'#EEF0F6',
            name:'Finished'
        },
        4:{
            color:'#a50833',
            bagroundColor:'#EEF0F6',
            name:'Undefined'
        }
    }

    const getFAces = (id)=>{
       return <span className={styles.round}><img src={getImageLink(id)}></img></span>
    }
    const getName = (id)=>{
        let account = find(props.accounts,(o)=>{
            return o.id === id;
        });
        if(account){
            return account['firstName'] +' '+ account['lastName'];
        }
        return 'Jon Dow';
    }
    const getImageLink = (id)=>{
        let account = find(props.accounts,(o)=>{
            return o.id === id;
        });
        if(account){
            return account['name'];
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
                <span className={`${styles.template} ${styles.header}` }><span>{props.name}</span></span>
                <span className={styles.template}><span className={styles.icon}><Person/></span><span>{props.count} connections</span></span>
                <span className={styles.template}><span className={styles.icon}>{getFAces(props.accountid)}</span><span>{getName(props.accountid)}</span></span>
                <div className={styles.kebub_wrapper} onClick={()=>{setMenuOpen(true)}}><Kebab/></div>
            </div>
            <div className={styles.wrapper_faces_buton}>
                <div className={styles.button}>
                    <Button name={getParam(props.status,'name')} click={()=>{console.log('cklik')}}
                            baground={getParam(props.status,'bagroundColor')}
                            color={getParam(props.status,'color')}
                            padding={'6px 20px'}
                            fontSize={'12px'}
                            lineHeight={'18px'}
                            border={'none'}
                    />
                </div>
            </div>
            {menuOpen?<div className={styles.menu_wrappe} onClick={()=>{setMenuOpen(false)}}>
                <div className={styles.menu_list}>
                    <span onClick={()=>{campaignAction(props.id,'pause')}}>Pause</span>
                    <span onClick={()=>{campaignAction(props.id,'stop')}}>Stop</span>
                    <span onClick={()=>{campaignAction(props.id,'edit')}}>Edit</span>
                    <span onClick={()=>{campaignAction(props.id,'delete')}}>Delete</span>

                </div>
            </div>:''}




        </div>
    )
}


export default CampCard
