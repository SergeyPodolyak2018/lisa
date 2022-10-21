import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {GetProfile,GetAccountsList,CreateCampaign} from "../../utils/Query"
import styles from './profile.module.css'
import {fetchCampaignsAll} from "../../features/campaigns_all/CampaignsAllSlice";
import {
    useHistory
} from 'react-router-dom'

import Input from '../input/input_text/input_text'
import Password from '../input/password/password'
import Selector from '../input/selector/selector'

import { ReactComponent as LeftArrow } from "./Arrow-Left.svg"
import { ReactComponent as User } from "./User.svg"
import { ReactComponent as Download } from "./Download.svg"
import { ReactComponent as Trash } from "./Trash.svg"
import Button from '../regular_button/regular_button'
import Spinner from '../spinner/spinner'








function Profile(props){
    let history = useHistory();
    const dispatch = useDispatch()
    const [selectedImage, setSelectedImage] = useState(null);
    const myRef = React.createRef();
    const [form, setForm] = useState({
        password:'',
        newPassword:'',
        confirmPassword:'',
        name:'',
        surname:'',
        email:'',
        phoneNumber:'',
        country:'',
        city:'',
        zip:'',
        adress:''

    });


    const [list, setList] = useState({schedule:[],template:[],accounts:[]});
    const [activtemplateAfterResp, setActivtemplateAfterResp] = useState('');

    const [loading, setLoading] = useState(true);





    useEffect(() => {

        Promise.all([
            GetProfile(),
            GetAccountsList()


        ])
            .then((data)=>{
                setForm(data[0]);
                setList({schedule:[],template:[],accounts:data[1]});
                setLoading(false);
            })
            .catch((e)=>{
                console.log(e)
            });


    }, []);



    const SaveProfile=()=>{
        CreateCampaign({data:1})
            .then((rezult)=>{
                if(rezult){
                    console.log("succes")
                }
            })
            .catch((rezult)=>{
                console.error(rezult);
                dispatch(fetchCampaignsAll())
                history.push('/app/campaigns/all');
            })
    }

    const changeForm=(e,param)=>{
        let tempObj = {...form};
        tempObj[param]=e;
        setForm(tempObj);
    }



    const getContent=()=> {
        if(loading){
            return <Spinner/>
        }else{
            return <div className={styles.wrapper}>

                <div className={styles.backbutton}>
                    <LeftArrow/>
                    <span>Back</span>

                </div>
                <div className={styles.header_wrapper}>
                    <div className={styles.header_input_wrapper}>
                        <span>Profile</span>
                    </div>
                    <div className={styles.save_button}>
                        <Button name={'Save'} click={SaveProfile}
                                baground={'#5276F4'}
                                color={'#F8F9FB'}
                                padding={'13px 30px'}
                                fontSize={'14px'}
                                lineHeight={'21px'}


                        />
                    </div>

                </div>
                <div className={styles.field_wrapper}>
                    <div className={styles.section}>
                        <div className={`${styles.subsection} ${styles.height1}`}>
                            <span className={styles.section_name}>User photo</span>

                            <div className={styles.download_wrapper}>
                                <div className={styles.photo_wrapper}>
                                    {!selectedImage?<User/>:<img src={URL.createObjectURL(selectedImage)}/>}
                                    <input
                                        ref={myRef}
                                        type="file"
                                        name="myImage"
                                        onChange={(event) => {
                                            setSelectedImage(event.target.files[0]);
                                        }}
                                        style={{visibility:'hiden',position:"absolute", width:'1px',height:'1px',top:'-10px', left:'-10px'}}

                                    />

                                </div>
                                <div className={styles.download_action_wrapper}>
                                    <div className={styles.action_wrapper} onClick={()=>{myRef.current.click()}}>
                                        <Download/> <span>Browse</span>
                                    </div>
                                    <div className={styles.action_wrapper} onClick={()=>setSelectedImage(null)}>
                                        <Trash/> <span>Delete</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={`${styles.subsection} ${styles.height3}`}>
                            <span className={styles.section_name}>Password</span>

                            <div className={styles.field_sub_wrapper}>

                                <Password

                                    name={'passoword'}
                                    value={form.password}
                                    onchange={(e)=>{changeForm(e,'password')}}


                                />

                            </div>
                            <div className={styles.field_sub_wrapper}>

                                <Input
                                    type={'text'}
                                    name={'newpassword'}
                                    value={form.newPassword}
                                    onchange={(e)=>{changeForm(e,'newPassword')}}
                                    placeholder={'New password'}

                                />

                            </div>
                            <div className={styles.field_sub_wrapper}>

                                <Input
                                    type={'text'}
                                    name={'confirmNewPassword'}
                                    value={form.confirmPassword}
                                    onchange={(e)=>{changeForm(e,'confirmPassword')}}
                                    placeholder={'Confirm new password'}

                                />

                            </div>

                        </div>


                    </div>
                    <div className={`${styles.section} ${styles.right}`}>
                        <div className={styles.subsection+' '+styles.height4}>
                            <span className={styles.section_name}>Main information</span>

                            <div className={styles.field_sub_wrapper}>
                                <div className={`${styles.field_sub_wrapper} ${styles.short}`}>

                                    <Input
                                        type={'text'}
                                        name={'name'}
                                        value={form.name}
                                        onchange={(e)=>{changeForm(e,'name')}}
                                        placeholder={'Name'}

                                    />

                                </div>
                                <div className={`${styles.field_sub_wrapper} ${styles.short}`}>

                                    <Input
                                        type={'text'}
                                        name={'surname'}
                                        value={form.surname}
                                        onchange={(e)=>{changeForm(e,'surname')}}
                                        placeholder={'Surname'}

                                    />

                                </div>
                            </div>
                            <div className={styles.field_sub_wrapper}>

                                <Input
                                    type={'email'}
                                    name={'email'}
                                    value={form.email}
                                    onchange={(e)=>{changeForm(e,'email')}}
                                    placeholder={'Email'}

                                />

                            </div>
                            <div className={styles.field_sub_wrapper}>

                                <Input
                                    type={'phone'}
                                    name={'phone'}
                                    value={form.phoneNumber}
                                    onchange={(e)=>{changeForm(e,'phoneNumber')}}
                                    placeholder={'Phone number'}

                                />

                            </div>
                            <div className={styles.field_sub_wrapper}>
                                <div className={`${styles.field_sub_wrapper} ${styles.short1}`}>

                                    <Selector
                                        active={activtemplateAfterResp}
                                        data={list.template}
                                        klick={setActivtemplateAfterResp}
                                        placeholder={'Country'}
                                    />

                                </div>
                                <div className={`${styles.field_sub_wrapper} ${styles.short2}`}>

                                    <Input
                                        type={'text'}
                                        name={'city'}
                                        value={form.city}
                                        onchange={(e)=>{changeForm(e,'city')}}
                                        placeholder={'CIty'}

                                    />

                                </div>
                            </div>
                            <div className={styles.field_sub_wrapper}>
                                <div className={`${styles.field_sub_wrapper} ${styles.short1}`}>

                                    <Input
                                        type={'number'}
                                        name={'zip'}
                                        value={form.zip}
                                        onchange={(e)=>{changeForm(e,'zip')}}
                                        placeholder={'ZIP'}

                                    />

                                </div>
                                <div className={`${styles.field_sub_wrapper} ${styles.short2}`}>

                                    <Input
                                        type={'text'}
                                        name={'address'}
                                        value={form.adress}
                                        onchange={(e)=>{changeForm(e,'adress')}}
                                        placeholder={'Address'}

                                    />

                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        }



    }

    return (
        getContent()
    )
}


export default Profile
