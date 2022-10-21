
import styles from './loginbutton.module.css'


function LoginButton(props){

    return (
        <button className={styles.button}
                onClick={props.click}
        >{props.name}</button>
    )
}


export default LoginButton
