import React, {useEffect} from 'react';
import styles from './dashboard_connections.module.css';


import {useDispatch, useSelector} from "react-redux";
import {fetchDashConnections,changeTime,changeRaiting} from "./dashboardConnectionsSlice";

import NoData from    '../../components/no_data/no_data'
import Button from    '../../components/regular_button/regular_button'
import Card from '../../components/dash_campaign_card/dash_campaign_card'
import BigCard from '../../components/connections_big_card/connections_big_card'
import RaitingCard from '../../components/raiting_card/raiting_card'
import Selector from '../../components/person_selector/person_selector'


function DashboardConnections () {
    const dispatch = useDispatch()
    const time = useSelector(state => state.dashConnections.time);
    const postStatus = useSelector(state => state.dashConnections.status);
    const error=useSelector(state=>state.dashConnections.error);
    const connections=useSelector(state=>state.dashConnections.connections);
    const active=useSelector(state=>state.dashConnections.raitingActive);
    const accounts=useSelector(state=>state.accounts.accounts);


    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchDashConnections())
        }
    }, []);
    const getBaground = (data)=>{
          if(time===data){
              return '#5276F4'
          }
          return ''
    }
    const getColor = (data)=>{
          if(time===data){
              return '#F8F9FB'
          }
          return '#4B4D72'
    }


    const getContent=()=>{
        console.log(accounts);
        if(Object.keys(connections).length>0){
            return <div className={styles.wrapper}>
                <div className={styles.button_wrapper}>
                    <Button
                        name={'day'}
                        baground={getBaground('day')}
                        color={getColor('day')}
                        click={()=>dispatch(changeTime('day'))}
                    />
                    <Button
                        name={'week'}
                        baground={getBaground('week')}
                        color={getColor('week')}
                        click={()=>dispatch(changeTime('week'))}
                    />
                    <Button
                        name={'month'}
                        baground={getBaground('month')}
                        color={getColor('month')}
                        click={()=>dispatch(changeTime('month'))}
                    />
                    <Button
                        name={'year'}
                        baground={getBaground('year')}
                        color={getColor('year')}
                        click={()=>dispatch(changeTime('year'))}
                    />
                </div>
                <div className={styles.subwrapper}>
                    <div className={styles.card_container}>

                        <div className={styles.big_card_wrapper}>
                            <BigCard
                               header={'Connections in Pending'}
                               color={'#9AA4CB'}
                               data={connections.pending}
                               exp={'Amount of connections in pending'}
                            />
                        </div>
                        <div className={styles.sub_card_container}>
                            <div className={styles.card_wrapper}>
                            <Card
                               header={'Accepted\nConnections'}
                               color={'#98E03E'}
                               data={connections.accepted}
                               exp={'Percent of accepted\nconnections today'}
                            />
                        </div>
                        <div className={styles.card_wrapper}>
                            <Card
                                header={'Rejected\nConnections'}
                                color={'#F4B352'}
                                data={connections.rejected}
                                exp={'Percent of rejected\nconnections today'}
                            />
                        </div>
                        </div>

                    </div>
                    <div className={styles.raiting_container}>
                        <RaitingCard
                            data={connections.raiting[active].data}
                          >
                            <Selector
                                active={active}
                                data={connections.raiting}
                                subdata={accounts}
                                klick={(index)=>{dispatch(changeRaiting(index))}}
                            />
                        </RaitingCard>
                    </div>

                </div>

            </div>


        }else{
            return <NoData/>
        }
    }







    return(
        getContent()
    )
}

export default DashboardConnections;
