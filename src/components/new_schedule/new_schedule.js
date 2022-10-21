import React, {useState} from 'react'
import styles from './new_schedule.module.css'
import StartTime from '../input/tyme/clock'
import EndTime from '../input/tyme/clock'
import Header from '../input/input_header/input_header'
import Input from '../input/input_text/input_text'

import { ReactComponent as LeftArrow } from "./Arrow-Left.svg"
import { ReactComponent as PenActive } from "./EditActive.svg"
import { ReactComponent as Pen } from "./Edit.svg"
import Button from '../regular_button/regular_button'
import Box from '../input/checkbox/checkbox'
import {CreateShedule} from "../../utils/Query";
import {useDispatch} from "react-redux";
import {fetchCampaignsSchedule} from "../../features/campaigns_schedule/CampaignsScheduleSlice";
import {
    useHistory
} from 'react-router-dom'






function NewSchedule(props){
    let history = useHistory();
    const dispatch = useDispatch()
    const [selectedTymeRange, setSelectedTymeRange] = useState({
        from: {hour:'0',min:'0',ampm:'AM'},
        to:  {hour:'0',min:'0',ampm:'PM'}
      });
    const [scheduleName, setscheduleName] = useState('Schedule Name');
    const [interval, setIntervalinsec] = useState('');
    const [intervalTo, setIntervalTo] = useState('');
    const [description, setDescription] = useState('');
    const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const daysValue={'Sun':1,'Mon':2,'Tue':3,'Wed':4,'Thu':5,'Fri':6,'Sat':7};
    const [activDays, setActivDays] = useState(['Sun','Mon','Tue','Wed','Thu','Fri','Sat']);


    const SaveSchedule=()=>{
        CreateShedule({
            "name": scheduleName,
            "time": {
                "from": getTwentyFourHourTime(selectedTymeRange.from.hour+':'+selectedTymeRange.from.min+' '+selectedTymeRange.from.ampm),
                "till": getTwentyFourHourTime(selectedTymeRange.to.hour+':'+selectedTymeRange.to.min+' '+selectedTymeRange.to.ampm)
            },
            "interval": {
                    "from": interval,
                    "till": intervalTo
            },
            "days": getDays(),
            "desc":description
        })
            .then((rezult)=>{
                if(rezult){
                    console.log("succes")
                    dispatch(fetchCampaignsSchedule());
                    history.push('/app/campaigns/schedule');
                }
            })
            .catch((rezult)=>{
                console.error(rezult);
            })
    };


    const getTwentyFourHourTime = (amPmString)=>{
        var d = new Date("1/1/2013 " + amPmString);
        return d.getHours() + ':' + d.getMinutes()+ ':00';
    };
    const getDays = ()=>{
        let tempDaysArr=[];
        activDays.forEach((element) => {
            tempDaysArr.push(daysValue[element])
        });
        return tempDaysArr;
    };

    const setAllDaysWrap = ()=>{
        if(activDays.length===7){
            setActivDays([]);
        }else{
            setActivDays([...days])
        }

    }

    const isDayExist = (item)=>{
        const settings={
            active:'#CAD5FC',
            notActive:'none',
        };
        if(activDays.indexOf(item)>-1){
            return settings.active;
        }
        return settings.notActive;
    }
    const togleDay =(day)=>{
        let tempActivDays = [...activDays];
        let index= activDays.indexOf(day);
        if(index>-1){
            tempActivDays.splice(index, 1)
        }else{
            tempActivDays.push(day);
        }
        setActivDays(tempActivDays);
    };

    function stepBack() {
        history.goBack();
    }


    return (
        <div className={styles.wrapper}>

            <div className={styles.backbutton} onClick={stepBack}>
                <LeftArrow/>
                <span >Back</span>

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
                    <Button name={'Create'} click={()=>{SaveSchedule()}}
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
                        <span className={styles.section_name}>Duration</span>
                        <div className={styles.field_sub_wrapper}>
                            <div className={styles.start_day}>
                                <StartTime
                                    placeholder='From time'
                                    value={selectedTymeRange.from}
                                    setValue={(data)=>{
                                         setSelectedTymeRange(prevState => {return Object.assign({}, prevState, {from:data});});
                                    }}
                                />
                            </div>
                            <div className={styles.start_day}>
                                <EndTime
                                    placeholder='Till time'
                                    value={selectedTymeRange.to}
                                    setValue={(data)=>{
                                        console.log(data);
                                         setSelectedTymeRange(prevState => {return Object.assign({}, prevState, {to:data});});
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.field_sub_wrapper}>
                            <div className={styles.start_day}>
                                <Input
                                    type={'number'}
                                    name={'interval'}
                                    value={interval}
                                    onchange={setIntervalinsec}
                                    placeholder={'Interval from (in min)'}
                                />
                            </div>
                            <div className={styles.start_day}>
                                <Input
                                    type={'number'}
                                    name={'interval2'}
                                    value={intervalTo}
                                    onchange={setIntervalTo}
                                    placeholder={'Interval till (in min)'}
                                />
                            </div>
                        </div>

                    </div>
                    <div className={styles.subsection2} style={{marginTop:'40px'}}>
                        <span className={styles.section_name}>Days</span>
                        <div className={styles.days_wrapper}>
                            {days.map((item, index)=>{
                                return <div key={index} style={{marginRight:'16px'}}><Button  name={item} click={()=>{togleDay(item)}}
                                     baground={isDayExist(item)}
                                     color={'#4B4D72'}
                                     padding={'10px 16px'}
                                     fontSize={'14px'}
                                     lineHeight={'21px'}
                                /></div>
                            })}
                        </div>
                        <div>
                            <Box placeholder={'Select all days'} value={activDays.length===7} click={()=>{setAllDaysWrap()}}/>
                        </div>
                    </div>
                </div>
                <div className={`${styles.section} ${styles.right}`}>
                    <div className={styles.subsectionrigh}>
                        <span className={styles.section_name}>Additional</span>
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
                </div>
            </div>





        </div>
    )
}


export default NewSchedule
