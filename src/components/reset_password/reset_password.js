
import styles from './reset_password.module.css'


function ResetPassword(props){

    return (
        <div className={styles.wrapper}>
            <div className={styles.window}>
                <div className={styles.subwrapper}>
                    <div className={styles.header}>
                        Reset password
                    </div>
                    <div className={styles.subheader}>
                        Enter your email address and we will send you a link to reset your password
                    </div>
                    <div className={styles.input_wrapper}>
                        {props.input}
                    </div>
                </div>
                <div className={styles.buttons}>
                    {props.buttons}
                </div>
            </div>
        </div>
    )
}


export default ResetPassword
