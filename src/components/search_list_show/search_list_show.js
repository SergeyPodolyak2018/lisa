import React, {useState, useEffect,useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {GetAccountsList, GetMailingsListById, GetMailingsListResultById} from "../../utils/Query"
import {GetCurrentPage, GetPages, GetUrlParam} from "../../utils/Utils"
import styles from './search_list_show.module.css'
import {
    useHistory
} from 'react-router-dom'
import Header from '../input/input_header/input_header'

import { ReactComponent as LeftArrow } from "../new_campaign/Arrow-Left.svg"
import { ReactComponent as PenActive } from "../new_campaign/EditActive.svg"
import { ReactComponent as Pen } from "../new_campaign/Edit.svg"
import Spinner from '../spinner/spinner'
import find from "lodash/find";
import Table from "../table_search_result/table";
import Pagination from "../pagination/pagination";

const stat={
    FINISHED:{color:'#7E86A5',
        bagroundColor:'#EEF0F6',
        name:'Finished'
    },
    STOPED:{color:'#F17155',
        bagroundColor:'#FCE0D9',
        name:'Stoped'
    },
    PAUSED:{color:'#F2A32C',
        bagroundColor:'#FCE8CA',
        name:'Paused'
    },
    RUNNING:{color:'#85D322',
        bagroundColor:'#98E03E',
        name:'Running'
    },
    COMPLETE:{
        color:'#7E86A5',
        bagroundColor:'#EEF0F6',
        name:'Finished'
    },
    4:{
        color:'#a50833',
        bagroundColor:'#EEF0F6',
        name:'Undefined'
    }
}

function SearchListShow(props){
    let history = useHistory();
    const dispatch = useDispatch()
    const [page, setPage] = useState({
        step:25,
        start:0,
        total:0
    });
    const [list, setList] = useState({status:'',account:'',count:'',result:[]});
    const [scheduleName, setscheduleName] = useState('Connection Campaign Name');
    const [loading, setLoading] = useState(true);





    useEffect(() => {
        let searchId=GetUrlParam('id');
        Promise.all([
            GetAccountsList(),
            GetMailingsListById(searchId),
            GetMailingsListResultById(searchId,page.step,page.start)

        ])
        .then((data)=>{
            let name='';
            let account = find(data[0],(o)=>{
                return o.id === data[1].account;
            });
            if(account){
                name = account.name
            }
            console.log(data[2].data);
            setList({status:data[1].state,account:name,count:data[1].count,result:data[2].data});
            let tempPage= {...page};
            tempPage.total=data[2].paging.total;
            setPage(tempPage)
            setLoading(false);
        })
        .catch((e)=>{
            console.log(e)
        });


    }, []);


    function stepBack() {
        history.goBack();
    }
    const GetNextResults = ()=>{
        setLoading(true);
        let searchId=GetUrlParam('id');
        GetMailingsListResultById(searchId,page.step,page.start)
            .then((data)=>{
                const copyOfList = { ...list };
                copyOfList.result=data.data;
                setList(copyOfList);
                setLoading(false);
            })
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
        GetNextResults();


    }


    const getContent=()=> {
        if(loading){
            return <Spinner/>
        }else{
            return <div className={styles.wrapper}>

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
                    <div>
                        <span className={styles.status_name}>Assigned account:</span>
                        <span className={styles.status_text}>{' '+list.account}</span>
                    </div>
                    <div>
                        <span className={styles.status_name}>Results amount:</span>
                        <span className={styles.status_text}>{' '+list.count}</span>
                    </div>
                    <div className={styles.status_button}>
                        <span className={styles.status_round} style={{backgroundColor:stat[list.status].bagroundColor}}></span>
                        <span className={styles.status_text}>{list.status}</span>
                    </div>


                </div>
                <div className={styles.field_wrapper}>
                    <div className={styles.section} >
                        <div className={styles.table_wrapper}>
                            <Table
                                data={list.result}
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


export default SearchListShow
