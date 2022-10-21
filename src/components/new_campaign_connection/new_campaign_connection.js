import React, {useState, useEffect,useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {GetSheduleList,GetTemplateList,GetAccountsList,CreateCampaign,GetConnections} from "../../utils/Query"
import {GetPages,GetCurrentPage} from "../../utils/Utils"
import styles from './new_campaign_connection.module.css'
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

import { ReactComponent as LeftArrow } from "../new_campaign/Arrow-Left.svg"
import { ReactComponent as PenActive } from "../new_campaign/EditActive.svg"
import { ReactComponent as Pen } from "../new_campaign/Edit.svg"
import Button from '../regular_button/regular_button'
import Spinner from '../spinner/spinner'
import Accounts from '../assign_accounts/assigned_accounts'
import Search from "../input/search/search";
import Table from "../table_connections/table";
import Pagination from "../pagination/pagination";
import ResetButton from "../reset_button/reset_button";
import {fetchDeleteAccounts, togleDeleteWindow} from "../../features/accounts/AccountsSlice";
import ConfirmWindow from "../confirm_window/window";
import {switchCase} from "@babel/types";








function NewCampaignConnection(props){
    const timerRef = useRef(null);
    let history = useHistory();
    const dispatch = useDispatch()
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
      });

    const [page, setPage] = useState({
        step:6,
        start:0,
        total:0
    });
    const [results, setResults] = useState(0);


    const [list, setList] = useState({schedule:[],template:[],accounts:[],connections:[]});
    const [scheduleName, setscheduleName] = useState('New Campaign');


    const [search, setSearch] = useState('');
    const [activschedule, setActivschedule] = useState('');
    const [activtemplate, setActivtemplate] = useState('');
    const [assignedAccounts, setAssignedAccounts] = useState('');
    const [selectedConnections, setSelectedConnections] = useState([]);

    const [loading, setLoading] = useState(true);
    const [startSearch, setStartSearch] = useState(false);
    const [save,setSave]=useState(false);



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
                setList({schedule:data[0],template:data[1],accounts:data[2],connections:[]});
                setLoading(false);
            })
            .catch((e)=>{
                console.log(e)
            });


    }, []);

    useEffect(() => {
        if(startSearch){
            setLoading(true);


            GetConnections(search,assignedAccounts,page.start)
                .then((data)=>{
                    console.log(data);
                    const copyOfObject = { ...list };
                    const copyOfPaging = { ...page };
                    copyOfObject.connections=[...data.data];
                    copyOfPaging.start=data.paging.start;
                    copyOfPaging.total=data.paging.total;

                    setList(copyOfObject);
                    setPage(copyOfPaging);

                    setLoading(false);
                    setStartSearch(false);
                })
                .catch((e)=>{
                    console.log(e)
                });
        }



    }, [startSearch]);

    useEffect(() => {
        const timer = setTimeout(() => {

        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, []);


    const searchMidlware=(data)=>{
        clearTimeout(timerRef.current);
        timerRef.current=setTimeout(()=>{
            setStartSearch(true);
        },500);
        setSearch(data);

    }




    const SaveCampaign=()=>{
        CreateCampaign({
            "name": scheduleName,
            "assigned_account": assignedAccounts,
            "template_id": activtemplate,
            "accounts": selectedConnections
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
    }

    const selectAll=() => {
        console.log('selectAll')
        let selectedList=[];
        if(selectedConnections.length===list.connections.length){
            setSelectedConnections([]);
        }else{
            selectedList=Array.from(list.connections, x => x.profileId);
            setSelectedConnections([...selectedList]);
        }
    }
     const selectTogle=(id) => {
        console.log('selectTogle');
        let selectedList=[...selectedConnections];
        let index = selectedConnections.findIndex((item,index)=>{
            return item === id;
        });
        if(index>-1){
            selectedList.splice(index,1)
        }else{
            selectedList.push(id)
        }

         setSelectedConnections([...selectedList]);
    }
    const changePage = (dirrection)=>{
        let tempStart=0

        switch (dirrection) {
            case 'left':
                if (page.start >= page.step){
                    tempStart = page.start - page.step;
                }else {
                    return false;
                }
                break;
            case 'right':
                if ((page.start + page.step) <= page.total){
                    tempStart = page.start + page.step;
                }else {
                    return false;
                }

                break;
            case 'maxLeft':
                tempStart = 0;
                break;
            case 'maxRight':
                if (page.total > page.step){
                    tempStart= ((GetPages(page.total,page.step)-1)*page.step);
                }
                break;

        }
        const copyOfPaging = { ...page };

        copyOfPaging.start=tempStart;
        setPage(copyOfPaging);
        setStartSearch(true);

    }





    const getContent=()=> {
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
                    <div className={styles.section} >
                        <div className={`${styles.subsection} ${styles.height3}`}>
                            <span className={styles.section_name}>Main information</span>
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
                            <div className={styles.field_sub_wrapper}>

                                <Selector
                                    active={assignedAccounts}
                                    data={list.accounts}
                                    klick={setAssignedAccounts}
                                    placeholder={'Assigned account'}
                                />

                            </div>
                        </div>
                    </div>
                    <div className={`${styles.section} ${styles.right}`}>
                        <div className={`${styles.subsection} ${styles.height4}`}>
                            <span className={styles.section_name}>Add Connections</span>
                            <div className={styles.field_sub_wrapper} >
                                <Search
                                    type={'text'}
                                    name={'search'}
                                    value={search}
                                    onchange={(data)=>{
                                        searchMidlware(data)
                                    }}
                                    radius={'8px'}
                                    placeholder={'Type name or any key words'}
                                    style={{alignSelf:'flex'}}
                                />
                            </div>
                        </div>
                        {}
                        <div className={styles.table_wrapper}>
                            <Table
                                data={list.connections}
                                selected={selectedConnections}
                                selectAll={selectAll}
                                selectTogle={selectTogle}

                            />
                        </div>
                        <div className={styles.table_button_wrapper}>
                            <span>Results:{page.total}</span>
                            <div className={styles.paginationWrap}>
                                <Pagination
                                    current={GetCurrentPage(page.total,page.step,page.start)}
                                    total={GetPages(page.total,page.step)}
                                    maxLeftClick={()=>{changePage('maxLeft')}}
                                    leftClick={()=>{changePage('left')}}
                                    rightClick={()=>{changePage('right')}}
                                    maxRightClick={()=>{changePage('maxRight')}}
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
