import React, {useState} from 'react'
import styles from './selector.module.css'
import { ReactComponent as ArrowO } from "./Arrow-Upp.svg"
import { ReactComponent as ArrowC } from "./Arrow-Down.svg"



function Selector(props){
    const [open, setOpen] = useState(false);

    const find=(element, index, array)=>{

        if(element.id === props.active){
            return true
        }
        return false
    }

    const getPrimitivContent = (item,klickable)=>{
        if(item){
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
        }else{
            return '';
        }




    }


    return (
        <div className={styles.wrapper} style={{borderRadius:props.radius}}>
            {getPrimitivContent(props.data.find(find),false)}
            {open?<div onClick={()=>{setOpen(false)}} className={styles.icon_wrapper}>
                    <ArrowO/>
                </div>:<div onClick={()=>{setOpen(true)}} className={styles.icon_wrapper}>
                       <ArrowC/>
                </div>
            }
            {open?<div className={styles.list_wrapper}>
                <div className={styles.list_sub_wrapper}>
                    {props.data.map((item)=>{

                        if(item.id !== props.active){
                            return getPrimitivContent(item,true)
                        }


                    })}
                </div>
            </div>:''}
            <span className={`${styles.placeHolder} ${props.active?styles.placeholder_active:''}`} >
                                        {props.placeholder}
                                    </span>
        </div>
    )
}


export default Selector
