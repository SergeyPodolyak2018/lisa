
import styles from './regular_button_link.module.css'


function RegularButton(props){

    return (
        <button className={styles.button}
                onClick={props.click}
                style={{background: props.baground, color: props.color}}

        >{props.name}</button>
    )
}


export default RegularButton
