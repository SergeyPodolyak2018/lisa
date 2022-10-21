import React, {useState, useEffect,useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {GetSheduleList,GetTemplateList,CreateCampaign,GetMailingsList,GetCampaignById} from "../../utils/Query"
import {GetUrlParam,ParamChecker} from "../../utils/Utils"
import styles from './new_campaign_connection.module.css'
import {fetchCampaignsAll} from "../../features/campaigns_all/CampaignsAllSlice";
import {
    useHistory
} from 'react-router-dom'
import Header from '../input/input_header/input_header'
import Input from '../input/input_text/input_text'
import Selector from '../input/selector/selector'

import { ReactComponent as LeftArrow } from "../new_campaign/Arrow-Left.svg"
import { ReactComponent as PenActive } from "../new_campaign/EditActive.svg"
import { ReactComponent as Pen } from "../new_campaign/Edit.svg"
import Button from '../regular_button/regular_button'
import Spinner from '../spinner/spinner'
import ConfirmWindow from "../confirm_window/window";



const stat=[
    {
        id:'FINISHED',
        name:'Finished'
    },
    {
        id:'STOPED',
        name:'Stoped'
    },
    {
        id:'PAUSED',
        name:'Paused'
    }
];






function NewCampaignConnection(props){
    const timerRef = useRef(null);
    let history = useHistory();
    const dispatch = useDispatch()
    const [list, setList] = useState({template:[],mailing:[],schedule:[]});
    const [scheduleName, setscheduleName] = useState('Connection Campaign Name');
    const [activschedule, setActivschedule] = useState('');
    const [activtemplate, setActivtemplate] = useState('');
    const [activmailing, setActivMailing] = useState('');
    const [description,setDescription]=useState('');
    const [loading, setLoading] = useState(true);
    const [save,setSave]=useState(false);
    const [campaignId, setCampaignId] = useState('');
    const [campaignStatus, setCampaignStatus] = useState('');




    useEffect(() => {
        let compaignId=GetUrlParam('id');

        Promise.all([
            GetTemplateList(compaignId),
            GetMailingsList(compaignId),
            GetSheduleList(compaignId)
        ])
            .then((data)=>{
                setList({template:data[0],mailing:data[1],schedule:data[2]});
                setLoading(false);
            })
            .then(()=>{
                console.log('compaignId'+ compaignId);
                if(compaignId){
                    GetCampaignById(compaignId)
                        .then((data)=>{
                            setscheduleName('');
                            setActivschedule('');
                            setActivtemplate('');
                            setActivMailing('');
                            setDescription('');
                            setCampaignId(compaignId);
                            setLoading(false);
                        })
                }else {
                    setLoading(false);
                }
            })

            .catch((e)=>{
                console.log(e)
            });


    }, []);


    function stepBack() {
        history.goBack();
    }


    const SaveCampaign=()=>{
        CreateCampaign({
            "name": scheduleName,
            "search_list_ids": [activmailing],
            "template_id": activtemplate,
            "schedule_id":activschedule,
            "desc":description
        })
            .then((rezult)=>{
                if(rezult){
                    console.log("succes")
                    setSave(true)
                }
            })
            .catch((rezult)=>{
                console.error(rezult);
                setSave(true)
            })
    };

    const UpdateCampaign=()=>{
        CreateCampaign({
            "name": scheduleName,
            "search_list_ids": [activmailing],
            "template_id": activtemplate
        })
            .then((rezult)=>{
                if(rezult){
                    console.log("succes")
                    setSave(true)
                }
            })
            .catch((rezult)=>{
                console.error(rezult);
                setSave(true)
            })
    };


    const getContent=()=> {
        let blocker = ParamChecker(activschedule,activtemplate,activmailing,description);
        if(loading){
            return <Spinner/>
        }else{
            return <div className={styles.wrapper}>
                {save?<ConfirmWindow
                    header={'Success!'}
                    subheader={'New campaign has been successfully created.'}
                    buttons={
                        <div className={styles.ImportContainer}>
                            <div className={styles.buttonWrapperImport}>
                                <Button
                                    name={"Close"}
                                    baground={'#5276F4'}
                                    color={'#F8F9FB'}
                                    width={'100%'}
                                    height={'100%'}

                                    click={()=>{
                                        dispatch(fetchCampaignsAll());
                                        history.push('/app/campaigns/all');
                                    }}
                                />
                            </div>

                        </div>
                    }
                    width={'512px'}
                    subheaderWidth={'max-content'}
                />:''}
                <div className={styles.backbutton} onClick={stepBack}>
                    <LeftArrow/>
                    <span>Back</span>

                </div>
                <div className={styles.header_wrapper}>
                    <div className={styles.header_input_wrapper}>
                        <Header
                            type={'text'}
                            name={'header'}
                            value={scheduleName}
                            onchange={setscheduleName}
                            activeIcon={<PenActive/>}
                            notActiveIcon={<Pen/>}


                        />
                    </div>
                    {campaignId?
                        <div className={styles.save_button} style={{width:'290px', display:'flex', alignItems:'centre', justifyContent:'space-between'}}>
                            <div className={styles.field_sub_wrapper} style={{width:'156px',height:'48px'}}>

                                <Selector
                                    active={campaignStatus}
                                    data={stat}
                                    klick={setCampaignStatus}
                                    placeholder={''}
                                />

                            </div>

                            <Button name={'Save'} click={UpdateCampaign}
                                    baground={blocker?'#5276F4':'#9AA4CB'}
                                    color={'#F8F9FB'}
                                    padding={'13px 30px'}
                                    fontSize={'14px'}
                                    lineHeight={'21px'}


                            />
                        </div>:
                        <div className={styles.save_button}>
                            <Button name={'Create'} click={blocker?SaveCampaign:function () {}}
                                    baground={blocker?'#5276F4':'#9AA4CB'}
                                    color={'#F8F9FB'}
                                    padding={'13px 30px'}
                                    fontSize={'14px'}
                                    lineHeight={'21px'}


                            />
                        </div>
                    }

                </div>
                <div className={styles.field_wrapper}>
                    <div className={styles.section} >
                        <div className={`${styles.subsection} ${styles.height3}`}>
                            <div className={styles.field_sub_wrapper + ' ' + styles.big}>
                                <span className={styles.section_name + ' ' + styles.sub}>Add short description of campaign</span>
                                <div className={styles.big_input_wrapper}>
                                    <Input
                                        type={'textarea'}
                                        name={'description'}
                                        value={description}
                                        onchange={setDescription}
                                        placeholder={'Description'}
                                        rows={12}
                                        cols={50}
                                        paddingTop={'30px'}

                                    />
                                </div>
                            </div>

                            <div className={styles.field_sub_wrapper}>

                                <Selector
                                    active={activmailing}
                                    data={list.mailing}
                                    klick={setActivMailing}
                                    placeholder={'Mailing List'}
                                />

                            </div>
                            <div className={styles.field_sub_wrapper}>

                                <Selector
                                    active={activschedule}
                                    data={list.schedule}
                                    klick={setActivschedule}
                                    placeholder={'Schedule'}
                                />

                            </div>
                            <div className={styles.field_sub_wrapper}>

                                <Selector
                                    active={activtemplate}
                                    data={list.template}
                                    klick={setActivtemplate}
                                    placeholder={'Template'}
                                />

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


export default NewCampaignConnection
