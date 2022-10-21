import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {GetSheduleList,GetTemplateList,GetAccountsList,CreateCampaign} from "../../utils/Query"
import styles from './new_campaign.module.css'
import {FilterCollection,NameCuter} from '../../utils/Utils'
import {fetchCampaignsAll} from "../../features/campaigns_all/CampaignsAllSlice";
import {
    useHistory
} from 'react-router-dom'
import moment from "moment";
import StartDate from '../input/data_start/date_start'
import EndDate from '../input/date_end/date_end'
import StartTime from '../input/tyme/clock'
import EndTime from '../input/tyme/clock'
import Header from '../input/input_header/input_header'
import Input from '../input/input_text/input_text'
import Selector from '../input/selector/selector'

import { ReactComponent as LeftArrow } from "./Arrow-Left.svg"
import { ReactComponent as PenActive } from "./EditActive.svg"
import { ReactComponent as Pen } from "./Edit.svg"
import { ReactComponent as Cross } from "./X.svg"
import { ReactComponent as Add } from "./Add.svg"
import Button from '../regular_button/regular_button'
import Spinner from '../spinner/spinner'
import Accounts from '../assign_accounts/assigned_accounts'
import AccountIcon from '../account_icon/account'







function NewCampaign(props){
    let history = useHistory();
    const dispatch = useDispatch()
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
      });


    const [list, setList] = useState({schedule:[],template:[],accounts:[]});




    const [activschedule, setActivschedule] = useState('');
    const [activtemplate, setActivtemplate] = useState('');
    const [activtemplateAfterResp, setActivtemplateAfterResp] = useState('');
    const [assignedAccounts, setAssignedAccounts] = useState([]);
    const [noResponse,setNoResponse]=useState([{template:'',duration:0,period:'week'}]);



    const [scheduleName, setscheduleName] = useState('Schedule Name');
    const [description, setDescription] = useState('');

    const mailingTemplate={template:'',duration:0,period:'week'};
    const period = [{id:'day', name:'Day'},{id:'month', name:'Month'},{id:'week', name:'Week'}];
    const [loading, setLoading] = useState(true);
    const [addContact, setAddContact] = useState(false);


    useEffect(() => {
        let compaignId='';
        if(props.campaignId){
            compaignId=props.campaignId
        }

        Promise.all([
            GetSheduleList(compaignId),
            GetTemplateList(compaignId),
            GetAccountsList(compaignId)


        ])
            .then((data)=>{
                setList({schedule:data[0],template:data[1],accounts:data[2]});
                setLoading(false);
            })
            .catch((e)=>{
                console.log(e)
            });


    }, []);

    const addMailing=()=>{
        setNoResponse((prevState)=>{
            let temp=prevState.slice();
            temp.push({...mailingTemplate});
            return temp;
        })
    }
    const removeMailing=(index)=>{
        setNoResponse((prevState)=>{
            let temp =prevState.slice();
            temp.splice(index, 1);
            return temp;
        })
    }
    const setTemplate=(data,index)=>{
        setNoResponse((prevState)=>{
            let temp =prevState.slice();
            temp[index].template=data;
            return temp;
        })
    }
    const setPeriod=(data,index)=>{
        setNoResponse((prevState)=>{
            let temp =prevState.slice();
            temp[index].period=data;
            return temp;
        })
    }
    const setDuration=(data,index)=>{
        setNoResponse((prevState)=>{
            let temp =prevState.slice();
            temp[index].duration=data;
            return temp;
        })
    }
    const togleAssignedAccounts=(data)=>{
        setAssignedAccounts((prevState)=>{
            let temp =prevState.slice();
            let index=temp.indexOf(data);
            if(index<0){
                temp.push(data);
            }else {
                temp.splice(index, 1);
            }

            return temp;
        })
    }

    const SaveCampaign=()=>{
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





    const getContent=()=> {
        if(loading){
            return <Spinner/>
        }else{
            return <div className={styles.wrapper}>
                {addContact?<Accounts
                    list={list.accounts}
                    active={assignedAccounts}
                    changeActive={togleAssignedAccounts}
                    cancel={setAddContact}
                />:''}

                <div className={styles.backbutton}>
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
                    <div className={styles.save_button}>
                        <Button name={'Create'} click={SaveCampaign}
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
                        <div className={styles.subsection}>
                            <span className={styles.section_name}>Main information</span>

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
                                <div className={styles.start_day}>
                                    <StartDate
                                        value={selectedDayRange.from ? selectedDayRange.from : null}
                                        setValue={(data) => {
                                            setSelectedDayRange(prevState => {
                                                return Object.assign({}, prevState, {from: data});
                                            })
                                        }}
                                    />
                                </div>
                                <div className={styles.start_day}>
                                    <EndDate
                                        value={selectedDayRange}
                                        setValue={(data) => {
                                            setSelectedDayRange(prevState => {
                                                return Object.assign({}, prevState, {to: data.to});
                                            });
                                        }}
                                    />
                                </div>
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

                        <div className={styles.field_sub_wrapper+' '+styles.column}>

                            <span className={styles.section_name}>Assigned Accounts</span>
                            <div className={styles.field_sub_wrapper+' '+styles.trevel_button}>
                                {FilterCollection(list.accounts,assignedAccounts,'id').map((item,index)=>{
                                    return <div className={styles.account_wrapper}><AccountIcon
                                        img={item.img}
                                        name={NameCuter(item.name)}
                                        key={index}
                                        remove={()=>{togleAssignedAccounts(item.id)}}
                                    />
                                    </div>
                                })}
                                <div className={styles.backbutton +' '+ styles.buttonWidth} onClick={()=>setAddContact(true)} >
                                    <Add/>
                                    <span>Add account</span>

                                </div>

                            </div>


                        </div>
                    </div>
                    <div className={`${styles.section} ${styles.right}`}>
                        <div className={styles.subsection+' '+styles.height1}>
                            <span className={styles.section_name}>Additional mailing steps</span>

                            <div className={styles.field_sub_wrapper + ' ' + styles.midl}>
                                <span className={styles.section_name + ' ' + styles.sub}>Send after response:</span>
                                <div className={styles.field_sub_wrapper}>

                                    <Selector
                                        active={activtemplateAfterResp}
                                        data={list.template}
                                        klick={setActivtemplateAfterResp}
                                        placeholder={'Template'}
                                    />

                                </div>
                            </div>
                        </div>


                        <div className={styles.subsection+' '+styles.height2}>
                            <div className={styles.field_sub_wrapper + ' ' + styles.free} style={{justifyContent:"flex-start"}}>
                                <span className={styles.section_name + ' ' + styles.sub} style={{marginBottom:'7px'}}>Send if have no response:</span>

                                {noResponse.map((item,index)=>{
                                    return <div className={styles.field_sub_wrapper} key={index} style={{marginTop:'24px'}}>
                                        <div className={styles.start_day}>

                                            <Selector
                                                active={item.template}
                                                data={list.template}
                                                klick={(data)=>{setTemplate(data,index)}}
                                                placeholder={'Template'}
                                            />
                                        </div>
                                        <span className={styles.delimitr}>in</span>
                                        <div className={styles.combinator}>
                                            <div className={styles.start_day +' '+styles.wrap3}>
                                                <Input
                                                    type={'number'}
                                                    name={'interval'}
                                                    value={item.duration}
                                                    onchange={(data)=>{
                                                        setDuration(data,index)
                                                    }}
                                                    placeholder={''}
                                                    radius={'8px 0px 0px 8px'}
                                                />
                                            </div>

                                            <div className={styles.start_day+' '+styles.wrap2}>

                                                <Selector
                                                    active={item.period}
                                                    data={period}
                                                    klick={(data)=>{setPeriod(data,index)}}
                                                    placeholder={''}
                                                    radius={'0px 8px 8px 0px'}
                                                />
                                            </div>
                                        </div>
                                        <div onClick={()=>{
                                            removeMailing(index)
                                        }}>
                                            <Cross/>
                                        </div>

                                    </div>
                                })}

                            </div>
                            <div className={styles.field_sub_wrapper+' '+styles.small}>
                                <div className={styles.backbutton} onClick={addMailing}>
                                    <Add/>
                                    <span>Add mailing</span>

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


export default NewCampaign
