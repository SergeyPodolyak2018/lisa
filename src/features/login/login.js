import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// omit other imports
import { fetchLoginPost, fetchLoginGet ,fetchLoginReset,fetchLoginNew} from './loginSlice'
import styles from './login.module.css'
import Button from "../../components/button/button"
import ResetButton from "../../components/reset_button/reset_button"
import ResetPassword from "../../components/reset_password/reset_password"
import { ReactComponent as Eye } from "./eye.svg"
import { ReactComponent as OpenEye } from "./openeye.svg"
import { Link, useLocation} from "react-router-dom"


function Login(){
    const location = useLocation()
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);

    const [emailactive, setEmailActive] = useState(false);
    const [passwordactive, setPasswordActive] = useState(false);
    const [nameAktive, setNameActive] = useState(false);



    const dispatch = useDispatch()
    const postStatus = useSelector(state => state.login.status);
    const error=useSelector(state=>state.login.error);

    const onSubmit=(e)=>{

        dispatch(fetchLoginPost({
            mail:email,
            password:password
        }))
        e.preventDefault()
    };

    const onReset=(e)=>{

        dispatch(fetchLoginReset({
            email:email,
        }))
        e.preventDefault()
    };
    const onNew=(e)=>{

        dispatch(fetchLoginNew({
            email:email,
            password:password,
            name:name
        }));
        e.preventDefault()
    };

    const isEmailActive=()=>{
        return (emailactive || (email!==''));
    }

    const isPasswordActive=()=>{
        return (passwordactive || (password!==''));
    }
    const isNameActive=()=>{
        return (nameAktive || (name!==''));
    }





    return (
        <div className={styles.wrapper}>
            {resetPassword?<ResetPassword
                input={<div className={styles.input_wrapper}>
                    <input
                        className={styles.input}
                        type="email"
                        name="email"

                        autoComplete="on"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        onFocus={()=>{setEmailActive(true)}}
                        onBlur={()=>{setEmailActive(false)}}

                    />
                    <span className={`${styles.placeHolder} ${isEmailActive()?styles.placeholder_active:''}`} >
                                        e-mail
                                    </span>
                </div>}
                buttons={
                    <div className={styles.ImportContainer}>
                        <div className={styles.buttonWrapperImport} style={{width:'55px'}}>
                            <ResetButton
                                click={()=>{setResetPassword(false)}}
                                name={'Cancel'}
                                width={'51px'}
                            />
                        </div>
                        <div className={styles.buttonWrapperImport}>
                            <Button
                                name={"Reset"}
                                click={onReset}
                            />
                        </div>

                    </div>
                }
            />:''}
            <div className={styles.loginimg} style={{backgroundImage: 'url(/img/login.jpg)'}}></div>

            <div className={styles.subwrapper}>

                    <div className={styles.header}>
                        <Link to={"/login"}>
                            <span className={`${styles.link} ${location.pathname.includes('/login')?styles.active:""}`}>
                                <span className={styles.link_text}>
                                    Log In /
                                </span>
                            </span>
                        </Link>
                        <Link to={"/signup"}>
                            <span className={`${styles.link} ${location.pathname.includes('/signup')?styles.active:""}`}>
                                <span className={styles.link_text}>
                                    Sign Up
                                </span>
                            </span>
                        </Link>
                    </div>
                    <div className={styles.form_wrapper}>
                        <form>
                            <div className={styles.container}>
                                {
                                    location.pathname.includes('/signup')?<div className={styles.input_wrapper}>
                                        <input
                                            className={styles.input}
                                            type="text"
                                            name="name"

                                            autoComplete="off"
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                            onFocus={()=>{setNameActive(true)}}
                                            onBlur={()=>{setNameActive(false)}}
                                        />
                                        <span className={`${styles.placeHolder} ${isNameActive()?styles.placeholder_active:''}`} >
                                        Name
                                    </span>
                                    </div>:''
                                }
                                <div className={styles.input_wrapper}>
                                    <input
                                        className={styles.input}
                                        type="email"
                                        name="email"

                                        autoComplete="off"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        onFocus={()=>{setEmailActive(true)}}
                                        onBlur={()=>{setEmailActive(false)}}
                                    />
                                    <span className={`${styles.placeHolder} ${isEmailActive()?styles.placeholder_active:''}`} >
                                        e-mail
                                    </span>
                                </div>
                                <div className={styles.input_wrapper}>
                                    <input
                                        className={styles.input}
                                        type={!showPassword?"password":"text"}
                                        name="password"
                                        autoComplete="on"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        onFocus={()=>{setPasswordActive(true)}}
                                        onBlur={()=>{setPasswordActive(false)}}
                                    />
                                    <span className={`${styles.placeHolder} ${isPasswordActive()?styles.placeholder_active:''}`} >
                                        Password
                                    </span>
                                    {
                                        !showPassword?<Eye onClick={()=>{setShowPassword(!showPassword)}}/>:<OpenEye onClick={()=>{setShowPassword(!showPassword)}}/>
                                    }


                                </div>




                            </div>

                        </form>
                        <div className={styles.buttonWrapper}>
                            {location.pathname.includes('/signup')?<Button
                                name={"Continue"}
                                click={onNew}
                            />:<Button
                                name={"Continue"}
                                click={onSubmit}
                            />}


                        </div>
                        {
                            location.pathname.includes('/signup')?'':<div className={styles.buttonWrapperReset}>
                                <ResetButton
                                    click={()=>{setResetPassword(true)}}
                                    name={'Reset password'}
                                />
                            </div>
                        }


                </div>
            </div>
        </div>
    )
}


export default Login
