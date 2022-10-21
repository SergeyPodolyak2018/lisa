import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {GetAccountsList,CreateList} from "../../utils/Query"
import styles from './new_mailing_list.module.css'
import {FilterCollection,NameCuter} from '../../utils/Utils'
import {fetchMailingList} from "../../features/mailing_list/MailingListSlice";
import {
    useHistory
} from 'react-router-dom'

import Input from '../input/input_text/input_text'
import Selector from '../input/selector/selector'
import Search from '../input/search/search'

import Button from '../regular_button/regular_button'
import Spinner from '../spinner/spinner'
import UniversalButton from "../universal_button/button";








function NewMailingList(props){
    let history = useHistory();
    const dispatch = useDispatch()
    const [listName, setListName] = useState('');
    const [search, setSearch] = useState('');
    const [resAmount, setResAmount] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [assignedAccounts,setAssignedAccounts]=useState('');
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        let compaignId='';
        if(props.campaignId){
            compaignId=props.campaignId
        }
        GetAccountsList(compaignId)
            .then((data)=>{
                setAccounts(data);
                setLoading(false);
            })
            .catch((e)=>{
                console.log(e)
            });


    }, []);



    const SaveList=()=>{
        CreateList({
            "query": search,
            "start": 0,
            "assigned_account_id": assignedAccounts,
            "max_count": resAmount,
            "name": listName
        })
            .then((rezult)=>{
                if(rezult){
                    dispatch(fetchMailingList())
                    history.push('/app/search_list');
                }
            })
            .catch((rezult)=>{
                console.error(rezult);
                dispatch(fetchMailingList())
                history.push('/app/search_list');
            })
    }





    const getContent=()=> {
        if(loading){
            return <Spinner/>
        }else{
            return <div className={styles.wrapper}>

                <div className={styles.header_wrapper}>
                    <span className={styles.header}>Mailng List Creation</span>
                </div>
                <div className={styles.field_wrapper}>
                    <div className={styles.section}>
                        <div className={styles.subsection}>
                            <div className={styles.field_sub_wrapper}>

                                <Input
                                    type={'text'}
                                    name={'address'}
                                    value={listName}
                                    onchange={setListName}
                                    placeholder={'Mailng List Name'}

                                />

                            </div>
                            <div className={styles.field_sub_wrapper}>
                                <div className={styles.start_day}>
                                    <Selector
                                        active={assignedAccounts}
                                        data={accounts}
                                        klick={setAssignedAccounts}
                                        placeholder={'Assigned account'}
                                    />
                                </div>
                                <div className={styles.start_day}>
                                    <Input
                                        type={'number'}
                                        name={'interval'}
                                        value={resAmount}
                                        onchange={(data)=>{if(!data){setResAmount(data)}
                                            if(parseInt(data)<2500){setResAmount(data)}}}
                                        placeholder={'Results amount'}
                                        radius={'8px 0px 0px 8px'}
                                    />
                                </div>
                            </div>

                            <div className={styles.field_sub_wrapper}>

                                <Search
                                    type={'text'}
                                    name={'search'}
                                    value={search.string}
                                    onchange={setSearch}
                                    radius={'8px'}
                                />

                            </div>


                        </div>

                    </div>

                </div>
                <div className={styles.ImportContainer}>
                    <div className={styles.buttonWrapperImport}>

                        <UniversalButton
                            click={()=>{
                                history.push('/app/search_list');
                            }}
                            name={'Cancel'}
                            color={'#9AA4CB'}
                            decoration={'underline'}
                            baground={''}
                            weight={'500'}
                        />
                    </div>
                    <div className={styles.buttonWrapperImport}>
                        <UniversalButton
                            name={"Run"}
                            click={()=>{
                                SaveList();
                            }}
                            color={'#7E86A5'}
                            decoration={''}
                            baground={'#D0D5E7'}
                            weight={'600'}
                            borderRadius={'8px'}
                        />
                    </div>

                </div>


            </div>
        }



    }

    return (
        getContent()
    )
}


export default NewMailingList
