import React, {useState} from 'react'
import filter from 'lodash/filter';
import styles from './assigned_accounts.module.css'
import Box from '../input/checkbox/checkbox'
import Button from '../regular_button/regular_button'
import CancelButton from '../reset_button/reset_button'
import Search from '../input/search/search'
function AssignAccounts(props){
    const [search, setSearch] = useState('');

    const isActive=(id)=>{
        if(props.active.indexOf(id)<0){
            return false;
        }
        return true;
    }
    const searchrez=()=>{
        let reg=new RegExp(`${search}`, 'ig');
        let rez = filter(props.list,(o)=>{
            return reg.test(o.name);
        });
        return rez;
    }

    const getPrimitivContent = (item, index)=>{
        let active=isActive(item.id);

        return <div className={styles.person_wrapper} key={index}>
            <div className={styles.person_subwrapper}>
                <div className={styles.person_wrapper_face}>
                    <img src={item.img}></img>
                </div >
                <div className={styles.person_wrapper_name}>
                    {item.name}
                </div>
            </div>
            <div className={styles.checkboxwrapper}>
                <Box
                    click={()=>{props.changeActive(item.id)}}
                    value={active}
                />
            </div>

        </div>

    }



    return (
        <div className={styles.wrapper}>
            <div className={styles.window}>
                <div className={styles.header}>
                    Assign accounts
                </div>
                <div className={styles.subwrapper}>

                    <div className={styles.search_wrapper}>
                        <Search
                            type={'text'}
                            name={'search'}
                            value={search}
                            onchange={setSearch}
                        />
                    </div>
                    <div className={styles.input_wrapper}>
                        {
                            searchrez().map((item,index)=>{
                            return getPrimitivContent(item,index)
                        })}
                    </div>

                </div>
                <div className={styles.buttons}>
                    <CancelButton name={'Cancel'} click={() => {
                        props.cancel(false)
                    }}
                            baground={'none'}
                            color={'#9AA4CB'}
                                  width={'51px'}




                    />
                    <Button name={'Add'} click={() => {
                        props.cancel(false);
                    }}
                            baground={'#5276F4'}
                            color={'#F8F9FB'}
                            padding={'10px 24px'}
                            fontSize={'14px'}
                            lineHeight={'21px'}
                            fontWeight={'600'}


                    />

                </div>
            </div>
        </div>
    )
}


export default AssignAccounts
