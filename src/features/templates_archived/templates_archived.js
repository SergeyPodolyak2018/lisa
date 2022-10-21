import React, {useEffect,useState} from 'react';
import styles from './templates_archived.module.css';

import {
    useHistory
} from 'react-router-dom'






import {useDispatch, useSelector} from "react-redux";
import {fetchTemplatesArchived,changeTime,changeSearchString,changeDate} from "./TemplatesArchivedSlice";



import NoData from    '../../components/no_data/no_data'
import RegButtonLinck from '../../components/regular_button_link/regular_button_link'
import Search from "../../components/input/search/search";
import TemplateCard from "../../components/template_card/template_card";
import ConfirmWindow from "../../components/confirm_window/window";
import ResetButton from "../../components/reset_button/reset_button";
import {fetchDeleteAccounts, togleDeleteWindow} from "../accounts/AccountsSlice";
import Button from "../../components/button/button";
import {switchCase} from "@babel/types";
import Spinner from "../../components/spinner/spinner";




function TemplatesArchived () {
    let history = useHistory();


    const dispatch = useDispatch()
    const postStatus = useSelector(state => state.templatesArchived.status);
    const error=useSelector(state=>state.templatesArchived.error);
    const templates=useSelector(state=>state.templatesArchived.templates);
    const search=useSelector(state=>state.templatesArchived.search);

    const [confirmWindow,setConfirmWindow] = useState(false);
    const [restore,setRestore] = useState('');
    const [deleted,setDeleted] = useState('');



    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchTemplatesArchived())
        }
    }, []);

    const changeLocation=(location)=>{
        history.push(location);
    }

    const cardAction=(data)=>{

       switch (data.type) {
           case 'delete':
               setDeleted(data.id);
               break;
           case 'restore':
               setRestore(data.id);
               break;

       }
        setConfirmWindow(true);
    }




    const getContent=()=>{
        if(postStatus==='loading' || postStatus==='idl'){
            return <Spinner/>
        }else {
            if (templates.length > 0) {
                return <div className={styles.wrapper}>
                    {confirmWindow ? <ConfirmWindow
                        header={restore ? 'Restore?' : 'Delete?'}
                        subheader={restore ? 'Are you sure you want to restore it?' : 'Are you sure you want to delete it?'}
                        buttons={
                            <div className={styles.ImportContainer}>
                                <div className={styles.buttonWrapperImport} style={{width: '55px'}}>
                                    <ResetButton
                                        click={() => {
                                            setConfirmWindow(false);

                                            if (restore) {
                                                setRestore('')
                                            }
                                            if (deleted) {
                                                setDeleted('')
                                            }
                                        }}
                                        name={'Cancel'}
                                        width={'51px'}
                                    />
                                </div>
                                <div className={styles.buttonWrapperImport}>
                                    <Button
                                        name={"Yes"}
                                        click={() => {
                                            setConfirmWindow(false);
                                            if (restore) {
                                                setRestore('')
                                            }
                                            if (deleted) {
                                                setDeleted('')
                                            }

                                        }}
                                    />
                                </div>

                            </div>
                        }
                    /> : ''}
                    <div className={styles.tools}>
                        <div className={styles.search_wrapper}>
                            <Search
                                type={'text'}
                                name={'search'}
                                value={search.string}
                                onchange={(data) => {
                                    dispatch(changeSearchString(data))
                                }}
                                radius={'8px'}
                            />
                        </div>

                        <div className={styles.button_wrapper2}>
                            <RegButtonLinck
                                name={'+ New template'}
                                color={'#F8F9FB'}
                                baground={'#5276F4'}
                                click={() => {
                                    changeLocation('/app/templates/new_templates')
                                }}

                            />
                        </div>
                    </div>

                    <div className={styles.subwrapper}>
                        {templates.map((item, index) => {
                            return <div key={index} className={styles.card_wrapper}><TemplateCard
                                name={item.name}
                                description={item.description}
                                id={item.id}
                                actionList={['restore', 'delete']}
                                action={cardAction}
                            /></div>
                        })}
                    </div>

                </div>


            } else {
                return <NoData
                    header={'There are no templates yet'}
                    subheader={'Please, click below to create the first one.'}
                    width={341}
                >
                    <div className={styles.button_wrapper}>
                        <RegButtonLinck
                            name={'+ New template'}
                            color={'#F8F9FB'}
                            baground={'#5276F4'}
                            click={() => {
                                changeLocation('/app/templates/new_templates')
                            }}
                        />
                    </div>
                </NoData>
            }
        }
    }







    return(
        getContent()
    )
}

export default TemplatesArchived;
