
import styles from './reset_button.module.css'


function ResetButton(props){

    return (
        <button className={styles.button}
                onClick={props.click}
                style={{background: props.baground, color: props.color,width:props.width}}

        >{props.name}</button>
    )
}


export default ResetButton
