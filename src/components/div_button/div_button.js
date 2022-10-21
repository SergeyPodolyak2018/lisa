
import styles from './div_button.module.css'


function RegularButton(props){

    return (
        <div className={styles.button}
                onClick={props.click}
                style={{background: props.baground, color: props.color, padding:props.padding, fontSize:props.fontSize, lineHeight:props.lineHeight,fontWeight:props.fontWeight,border:props.border,width:props.width,height:props.height}}

        >{props.name}</div>
    )
}


export default RegularButton
