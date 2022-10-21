
import styles from './button.module.css'


function UniversalButton(props){

    return (
        <div className={styles.button}
                onClick={props.click}
             style={{color:props.color,textDecoration:props.decoration,backgroundColor:props.baground,fontWeight:props.weight,borderRadius:props.borderRadius}}
        ><span>{props.name}</span></div>
    )
}


export default UniversalButton
