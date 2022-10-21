
import styles from './blure.module.css'


function Blure(props){

    return (
        <div className={styles.blure} style={{zIndex:props.z}}></div>
    )
}


export default Blure
