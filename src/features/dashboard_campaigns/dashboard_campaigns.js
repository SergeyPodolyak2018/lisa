import React, {useEffect} from 'react';
import styles from './dashboard_campaigns.module.css';
import './tooltip.css';

import {useDispatch, useSelector} from "react-redux";
import {fetchDashCampaigns,changeTime} from "./dashboardCampaignsSlice";

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import NoData from    '../../components/no_data/no_data'
import Button from    '../../components/regular_button/regular_button'
import Card from '../../components/dash_campaign_card/dash_campaign_card'


function DashboardCampaigns () {
    const dispatch = useDispatch()
    const time = useSelector(state => state.dashCampaigns.time);
    const postStatus = useSelector(state => state.dashCampaigns.status);
    const error=useSelector(state=>state.dashCampaigns.error);
    const campaigns=useSelector(state=>state.dashCampaigns.campaigns);
    


    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchDashCampaigns())
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

    
    const getOptions=(data)=>{
        const options = {
          title: {
            text: 'Campaigns Rating, in %',
            align:"left",
            margin: 14,
            x:24,
            y:30,
            style:{
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '24px',
                lineHeight: '36px',
                color: '#D0D5E7',
                marginTop:'24px',
                marginLeft:'24px',
            }
          },
          tooltip: {
            backgroundColor: null,
            borderWidth: 0,
            shadow: false,
            useHTML: true,
            color: '#F8F9FB',
            style: {
                padding: 0,
                color: '#F8F9FB',
            },
            formatter: function () {
                return '<b>' +this.point.series.name + '</b>';
            }
        },
          legend:{
              enabled:false
          },
          chart: {
            height: 288,
            type: 'spline',
            borderRadius: 24,
            alignTicks: false,
            marginLeft:65,
            marginRight:30,
          },
          series: [],
          xAxis: {
                categories: ['Mon', 'Thu', 'Wed', 'Tue', 'Fri', 'Sat', 'Sun'],
                gridLineWidth: 1,
                startOnTick: true,
                endOnTick: true,
                tickmarkPlacement: 'on'



            },
            yAxis: {
                gridLineWidth: 1,
                title: {
                    text: ''
                }
            },
        }

        data.map((item)=>{
            const template={
                pointPlacement: 'on',
                marker: {
                    symbol: 'circle'
                }
            }
            options.series.push(Object.assign({}, template,item))
        })
        return options;

    }


    const getContent=()=>{
        if(Object.keys(campaigns).length>0){
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
                        <div className={styles.card_wrapper}>
                        <Card 
                           header={'Pending\nMessages '}
                           color={'#9AA4CB'}
                           data={campaigns.pending}
                           exp={'Amount of preparing for\nsending messages'} 
                        />
                        </div>
                        <div className={styles.card_wrapper}>
                            <Card 
                                header={'Sent\nMessages'}
                                color={'#7FBAF1'}
                                data={campaigns.sent}
                                exp={'Amount of preparing for\nsending messages'}
                        />
                        </div>
                        <div className={styles.card_wrapper}>
                            <Card 
                                header={'Success\nCampaigns'}
                                color={'#98E03E'}
                                data={campaigns.success}
                                exp={'Percent of accepted\nmessages'}
                        />
                        </div>
                        <div className={styles.card_wrapper}>
                            <Card 
                                header={'Paused\nCampaigns'}
                                color={'#F4B352'}
                                data={campaigns.paused}
                                exp={'Amount of paused\ncampaigns'}
                            />
                        </div>
                    </div>

                    <div className={styles.chart_container}>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={getOptions(campaigns.series)}    
                        />
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

export default DashboardCampaigns;
