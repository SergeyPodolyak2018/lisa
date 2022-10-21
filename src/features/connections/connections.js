import React, {useEffect,useState} from 'react';
import styles from './connections.module.css';


import {
    useHistory
} from 'react-router-dom'


import {useDispatch, useSelector} from "react-redux";
import {fetchConnections, changeSearchString,changeAccount} from "./ConnectionsSlice";


import CampCard from    '../../components/campaign_card/camp_card'
import NoData from    '../../components/no_data/no_data'
import RegButtonLinck from '../../components/regular_button_link/regular_button_link'
import Search from "../../components/input/search/search";
import Selector from '../../components/person_selector/person_selector'
import Table from "../../components/table/table";
import {changeRaiting} from "../dashboard_connections/dashboardConnectionsSlice";
import Pagination from "../../components/pagination/pagination";
import Blure from    '../../components/blure/blure'
import BarGauge from "devextreme-react";
import Spinner from "../../components/spinner/spinner";



function Connections (props) {
    console.log('connections');
    let history = useHistory();
    const dispatch = useDispatch();
    const postStatus = useSelector(state => state.connections[props.dirrection].status);
    const error=useSelector(state=>state.connections[props.dirrection].error);
    const connections=useSelector(state=>state.connections[props.dirrection].connections);
    const search=useSelector(state=>state.connections[props.dirrection].search);
    const accounts=useSelector(state=>state.accounts.accounts);
    const page = useSelector(state=>state.connections[props.dirrection].page);

    const [blure,setBlure]=useState(false);


    useEffect(() => {
        if (postStatus === 'idle') {

            dispatch(fetchConnections({dirrection:props.dirrection,id:accounts[search.account].id}))
        }
    }, []);

    function changeLocation(location) {
        history.push(location);
    }
    function tableAction(id) {
        console.log(id)
    }
    function changePage(dirrection) {
        console.log(dirrection)
    }




    const getContent=()=>{
        //if(Object.keys(connections).length>0){
        if(postStatus==='loading' || postStatus==='idl'){
            return <Spinner/>
        }else {
            return <div className={styles.wrapper}>
                <div className={styles.tools}>
                    <div className={styles.search_wrapper}>
                        <Search
                            type={'text'}
                            name={'search'}
                            value={search.string}
                            onchange={(data) => {
                                dispatch(changeSearchString({text: data, dirrection: props.dirrection}))
                            }}
                            radius={'8px'}
                        />
                    </div>
                    <div className={styles.selector_wrapper2}>
                        <Selector
                            active={search.account}
                            data={accounts}
                            subdata={accounts}
                            klick={(index) => {
                                dispatch(changeAccount({
                                    dirrection: props.dirrection,
                                    index: index,
                                    id: accounts[index].id
                                }))
                                dispatch(fetchConnections({dirrection: props.dirrection, id: accounts[index].id}))
                            }}
                            open={(type) => {
                                setBlure(type);
                            }}
                        />
                    </div>
                </div>
                {Object.keys(connections).length > 0 ?

                    <div className={styles.subwrapper}>
                        {blure ? <Blure/> : ''}

                        <Table
                            data={connections}
                            action={tableAction}
                        />
                        <div className={styles.paginationWrap}>
                            <Pagination
                                current={page.current}
                                total={page.total}
                                maxLeftClick={() => {
                                    changePage('maxLeft')
                                }}
                                leftClick={() => {
                                    changePage('left')
                                }}
                                rightClick={() => {
                                    changePage('right')
                                }}
                                maxRightClick={() => {
                                    changePage('maxRight')
                                }}
                            />
                        </div>


                    </div> :
                    <NoData
                        header={'There are no connections'}
                        subheader={'Please, add your LinkedIn account first. '}
                        width={341}
                    >
                        <div className={styles.button_wrapper}>
                            <RegButtonLinck
                                name={'Go to Accounts'}
                                color={'#F8F9FB'}
                                baground={'#5276F4'}
                                click={() => {
                                    changeLocation('/app/accounts')
                                }}
                            />
                        </div>
                    </NoData>}

            </div>
        }


        /*}else{
            return <NoData
                header={'There are no connections'}
                subheader={'Please, add your LinkedIn account first. '}
                width={341}
            >
                <div className={styles.button_wrapper}>
                    <RegButtonLinck
                        name={'Go to Accounts'}
                        color={'#F8F9FB'}
                        baground={'#5276F4'}
                        click={()=>{changeLocation('/app/accounts')}}
                    />
                </div>
            </NoData>
        }*/
    }







    return(
        getContent()
    )
}

export default Connections;
