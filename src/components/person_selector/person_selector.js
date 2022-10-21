import React, {useState} from 'react'
import styles from './person_selector.module.css'
import find from 'lodash/find';
import {NameCuter} from '../../utils/Utils'
import { ReactComponent as ArrowO } from "./Arrow-Upp.svg"
import { ReactComponent as ArrowC } from "./Arrow-Down.svg"





function PersonSelector(props){
    const [open, setOpen] = useState(false);

    const getData = (id,param)=>{
        let rez = find(props.subdata,(o)=>{
            return o.id===id
        });
        if(!rez[param] && param==='img'){
           return  '/img/Subtract.svg'
        }
        return rez[param]
    }

    const getPrimitivContent = (item, index,klickable)=>{

        if(klickable){

            return <div className={styles.person_wrapper} onClick={()=>{
                setOpen(false);
                props.klick(index);
                if(props.open){
                    props.open(false)
                }
            }} key={index}>
                <div className={styles.person_wrapper_face}>
                    <img src={getData(item.id,'img')}></img>
                </div >
                <div className={styles.person_wrapper_name}>
                    {NameCuter(getData(item.id,'firstName') + ' '+ getData(item.id,'lastName'))}
                </div>
            </div>
        }else{
            return <div className={styles.person_wrapper} key={'1'}>
                <div className={styles.person_wrapper_face}>
                    {item?<img src={getData(item.id,'img')}></img>:''}
                </div >
                <div className={styles.person_wrapper_name}>
                    {item?NameCuter(getData(item.id,'firstName') + ' '+ getData(item.id,'lastName')):''}

                </div>
            </div>
        }

    }


    return (
        <div className={styles.wrapper}>
            {getPrimitivContent(props.subdata[props.active],props.active,false)}
            {open?<div onClick={()=>{
                            setOpen(false);
                            if(props.open){
                                props.open(false)
                            }
                        }}>
                    <ArrowO/>
                </div>:<div onClick={()=>{
                    setOpen(true);
                    if(props.open){
                        props.open(true)
                    }
                    }}>
                       <ArrowC/>
                </div>
            }
            {open?<div className={styles.list_wrapper}>
                <div className={styles.list_sub_wrapper}>
                    {props.subdata.map((item, index)=>{
                        if(index !== props.active){
                            return getPrimitivContent(item,index,true)
                        }


                    })}
                </div>
            </div>:''}
        </div>
    )
}


export default PersonSelector
