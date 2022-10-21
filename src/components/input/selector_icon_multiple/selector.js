import React, {useState} from 'react'
import styles from './selector.module.css'
import { ReactComponent as ArrowO } from "./Arrow-Upp.svg"
import { ReactComponent as ArrowC } from "./Arrow-Down.svg"
import Checkbox from "../checkbox/checkbox";
import Radio from "../radio/radio";
import RegButtonLinck from '../../div_button/div_button'



function Selector(props){
    const [open, setOpen] = useState(false);
    const [statuses, setStatuses] = useState({
        running:!!props.statuses.running,
        paused:!!props.statuses.paused,
        stoped:!!props.statuses.stoped,
        finished:!!props.statuses.finished,
    });
    const [campaign, setCampaign] = useState({
        connection:!!props.campaign.connection,
        mailing:!!props.campaign.mailing,
        all:!!props.campaign.all,

    });



    const find=(element, index, array)=>{

        if(element.id === props.active){
            return true
        }
        return false
    }

    const getPrimitivContent = (item,klickable)=>{

        if(klickable){

            return <div className={styles.person_wrapper} style={{marginTop:props.marginTop}} onClick={()=>{setOpen(false); props.klick(item.id)}} key={item.id}>
                <div className={styles.person_wrapper_name}>
                    {item?item.name:''}
                </div>
            </div>
        }else{
            return <div style={{marginTop:props.marginTop}} className={styles.person_wrapper} key={'1'}>
                <div className={styles.person_wrapper_name}>
                    {item?item.name:''}
                </div>
            </div>
        }

    }

    const toglchek=(field)=>{
        let tempObj = {...statuses};
        tempObj[field]=!tempObj[field];
        setStatuses(tempObj);
    };

    const toglRadio=(field)=>{
        console.log(field);
        let tempObj = {...campaign};
        Object.keys(tempObj).map((item,index)=>{
            tempObj[item]=false;
        });
        tempObj[field]=true;
        setCampaign(tempObj);
    };


    return (<div className={styles.main_wrapper}>
                {props.left?<div className={styles.icon_wrapper} style={{borderRadius:props.iconRadius}}>
                    {open?props.openIcon:props.closeIcon}
                </div>:''}
                <div className={styles.wrapper} style={{borderRadius:props.radius,padding:props.padding}}>
                    <div style={{marginTop:props.marginTop}} className={styles.person_wrapper} >
                        <div className={styles.person_wrapper_name}>
                            Filters
                        </div>
                    </div>
                    {open?<div onClick={()=>{setOpen(false);props.open(false)}}>
                        <ArrowO/>
                    </div>:<div onClick={()=>{setOpen(true); props.open(true)}}>
                        <ArrowC/>
                    </div>
                    }
                    {open?<div className={styles.list_wrapper}>
                        <div className={styles.list_sub_wrapper}>
                            <span className={styles.list_sub_wrapper_header}>Statuses</span>
                            <div className={styles.check_box_group}>
                                {Object.keys(statuses).map((item,index)=>{
                                    return <div className={styles.person_wrapper} style={{marginTop:props.marginTop}} onClick={()=>{toglchek(item)}} key={index}>
                                        <Checkbox
                                            value={statuses[item]}
                                            placeholder={item}
                                            width={'90px'}
                                        />
                                        {/*<div className={styles.person_wrapper_name}>
                                        {item?item.name:''}
                                        </div>*/}
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className={styles.delimeter}></div>
                        <div className={styles.list_sub_wrapper} style={{paddingTop:'0px',height:'121px'}}>
                            <span className={styles.list_sub_wrapper_header}>Compaign type</span>
                            <div className={styles.check_box_group} style={{height:'88px'}}>
                                {Object.keys(campaign).map((item,index)=>{
                                    return <div className={styles.person_wrapper} style={{marginTop:props.marginTop}} onClick={()=>{toglRadio(item)}} key={index}>
                                        <Radio
                                            value={campaign[item]}
                                            placeholder={item}
                                            width={'114px'}
                                        />
                                        {/*<div className={styles.person_wrapper_name}>
                                        {item?item.name:''}
                                        </div>*/}
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className={styles.button_wrapper}>
                            <RegButtonLinck
                                name={'Apply'}
                                color={'#F8F9FB'}
                                baground={'#5276F4'}
                                click={()=>{
                                    console.log('apply filters');
                                }}
                            />
                        </div>

                    </div>:''}
                    <span className={`${styles.placeHolder} ${props.active?styles.placeholder_active:''}`} >
                                            {props.placeholder}
                                        </span>
                </div>
            {props.right?<div className={styles.icon_wrapper} style={{borderRadius:props.iconRadius}}>
                {open?props.openIcon:props.closeIcon}
            </div>:''}
        </div>

    )
}


export default Selector
