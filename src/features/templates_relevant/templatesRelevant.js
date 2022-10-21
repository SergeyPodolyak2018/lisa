import React, {useEffect, useState} from 'react';
import styles from './templatesRelevant.module.css';


import {
    useHistory
} from 'react-router-dom'



import {useDispatch, useSelector} from "react-redux";
import {fetchTemplatesRelevant,changeTime, changeSearchString,changeStatus,changeDate} from "./TemplatesRelevantSlice";


import TemplateCard from    '../../components/template_card/template_card'
import NoData from    '../../components/no_data/no_data'
import RegButtonLinck from '../../components/regular_button_link/regular_button_link'
import Search from "../../components/input/search/search";
import Selector from "../../components/input/selector_icon/selector";
import ConfirmWindow from "../../components/confirm_window/window";
import ResetButton from "../../components/reset_button/reset_button";
import Button from "../../components/button/button";
import {fetchAccounts} from "../accounts/AccountsSlice";
import Spinner from "../../components/spinner/spinner";



function TemplatesRelevant () {
    let history = useHistory();


    const dispatch = useDispatch();
    const postStatus = useSelector(state => state.templatesRelevant.status);
    const error=useSelector(state=>state.templatesRelevant.error);
    const templates=useSelector(state=>state.templatesRelevant.templates);
    const search=useSelector(state=>state.templatesRelevant.search);
    const refresh=useSelector(state=>state.templatesRelevant.refresh);
    const [confirmWindow,setConfirmWindow] = useState(false);
    const [archived,setArchived] = useState('');
    const [deleted,setDeleted] = useState('');

    const statusList=[{
            id:'all',
            name:'All statuses'
        },
        {
            id:'running',
            name:'Running'
        },
        {
            id:'paused',
            name:'Paused'
        },
        {
            id:'stoped',
            name:'Stoped'
        },
        {
            id:'finished',
            name:'Finished'
        }];
    const dateList=[
        {
            id:'default',
            name:'By default'
        },
        {
            id:'start',
            name:'Start date'
        },
        {
            id:'finished',
            name:'Finish date'
        }];

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchTemplatesRelevant())
        }
    }, []);

    useEffect(() => {
        if (refresh) {
            dispatch(fetchTemplatesRelevant())
        }
    }, [refresh]);

    function changeLocation(location) {
        history.push(location);
    }

    const cardAction=(data)=>{
        console.log(data)

        switch (data.type) {
            case 'delete':
                setDeleted(data.id);
                break;
            case 'archive':
                setArchived(data.id);
                break;
            case 'edit':

                break;

        }
        setConfirmWindow(true);
    }



    const getContent=()=>{
        if(postStatus==='loading' || postStatus==='idl'){
            return <Spinner/>
        }else {
            if (Object.keys(templates).length > 0) {
                return <div className={styles.wrapper}>
                    {confirmWindow ? <ConfirmWindow
                        header={archived ? 'Move to archive?' : 'Delete?'}
                        subheader={archived ? 'Are you sure you want to archive it?' : 'Are you sure you want to delete it?'}
                        buttons={
                            <div className={styles.ImportContainer}>
                                <div className={styles.buttonWrapperImport} style={{width: '55px'}}>
                                    <ResetButton
                                        click={() => {
                                            setConfirmWindow(false);

                                            if (archived) {
                                                setArchived('')
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
                                            if (archived) {
                                                setArchived('')
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

                        <div className={styles.button_wrapper3}>
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
                                description={item.template}
                                id={item.id}
                                actionList={['edit', 'archive', 'delete']}
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

export default TemplatesRelevant;
