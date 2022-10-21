import React, {useState, useEffect} from 'react'
import {
    useHistory,useParams, useLocation
} from 'react-router-dom'
import styles from './account_new.module.css'
import {SubmitNewAccountCreds,SubmitCode} from "../../utils/Query"
import Password from '../input/password/password'
import Input from '../input/input_text/input_text'
import ResetButton from "../reset_button/reset_button";
import Button from "../button/button";
import InputCode from '../input/input_code/input_code';
import {useDispatch, useSelector} from "react-redux";
import {togleRefresh} from "../../features/accounts/AccountsSlice";


function AccountNew(props){
    let history = useHistory();
    const { search } = useLocation();
    let params=new URLSearchParams(search);
    console.log(params.get("reset"));
    const dispatch = useDispatch();
    const [state, setState] = useState(0);
    const [email, seEmail] = useState(params.get("reset")?params.get("email"):'');
    const [password, sePassword] = useState('');
    const [code, seCode] = useState('');
    const [codeerror, seCodeerror] = useState(false);
    const [transferData,setTransferData]=useState('');


    function changeLocation(location) {
        history.push(location);
    }

    const sendForm=()=>{
        SubmitNewAccountCreds({"username":email,"password":password})
            .then((data)=>{
                if(!data.hasOwnProperty('finish')){
                    setTransferData(data);
                    setState(1);
                }else{
                    dispatch(togleRefresh());
                    changeLocation('/app/accounts');
                }
            })
            .catch((error)=>{
                console.log('Get error',error)
            })
    }
    const sendCode=()=>{
        SubmitCode({"code":code,uuid:transferData.uuid,pinData:transferData.pinData})
            .then((data)=>{
                if(data){
                    dispatch(togleRefresh())
                    changeLocation('/app/accounts');

                }else{
                    seCodeerror(true)
                }
            })
            .catch((error)=>{
                console.log('Get error',error)
            })
    }



    const getInitialWwindow =()=>{
        return <div className={styles.window}>
            <div className={styles.subwrapper} style={{height:'292px'}}>
                <div className={styles.header}>
                    {params.get("reset")?'Reset password':'Add account'}
                </div>
                <div className={styles.big_input_wrapper}>
                    <div className={styles.input_wrapper}>
                        <Input
                            type={'email'}
                            name={'email'}
                            value={email}
                            onchange={seEmail}
                            placeholder={'Email'}
                            rows={12}
                            cols={50}
                            paddingTop={'30px'}

                        />
                    </div>
                    <div className={styles.input_wrapper}>
                        <Password

                            name={'password'}
                            value={password}
                            onchange={sePassword}
                            placeholder={'Password'}
                            paddingTop={'30px'}

                        />
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                <div className={styles.ImportContainer}>
                    <div className={styles.buttonWrapperImport} style={{width:'55px'}}>
                        <ResetButton
                            click={()=>{changeLocation('/app/accounts')}}
                            name={'Cancel'}
                            width={'51px'}
                        />
                    </div>
                    <div className={styles.buttonWrapperImport}>
                        <Button
                            name={"Next"}
                            click={()=>{sendForm()}}
                        />
                    </div>

                </div>
            </div>
        </div>
    }

    const getCodeWwindow =()=>{
        return  <div className={`${styles.window} ${styles.window2}`}>
            <div className={styles.subwrapper}>
                <div className={styles.header}>
                    Add account
                </div>
                <div className={styles.subheader} style={{width:'360px'}}>
                    Put down verification code you received via email
                </div>
                <div className={styles.big_input_wrapper} style={{width: '240px',
                    height: '72px'}}>
                    <div className={`${styles.input_wrapper_code} ${codeerror?styles.errorWrapper:''}`} >
                        <InputCode
                            name={'code'}
                            value={code}
                            onchange={seCode}
                            placeholder={'Code'}

                        />
                        {codeerror?<span className={styles.errormesage}>Wrong code. Please, try again</span>:''}
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                <div className={styles.ImportContainer}>
                    <div className={styles.buttonWrapperImport} style={{width:'55px'}}>
                        <ResetButton
                            click={()=>{setState(0)}}
                            name={'Cancel'}
                            width={'51px'}
                        />
                    </div>
                    <div className={styles.buttonWrapperImport}>
                        <Button
                            name={"Submit"}
                            click={()=>{sendCode()}}
                        />
                    </div>

                </div>
            </div>
        </div>
    }
    const getCaptchaWwindow =()=>{
        return <div className={styles.window}>
            <div className={styles.subwrapper}>
                <div className={styles.header}>
                    {props.header}
                </div>
                <div className={styles.subheader}>
                    {props.subheader}
                </div>
            </div>
            <div className={styles.buttons}>
                {props.buttons}
            </div>
        </div>
    }


    return (
        <div className={styles.wrapper}>
            {state===0?getInitialWwindow():''}
            {state===1?getCodeWwindow():''}
        </div>
    )
}


export default AccountNew
