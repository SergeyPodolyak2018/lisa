import React, { useEffect, useState } from 'react'
import styles from './search.module.css'
import { ReactComponent as SearchIcon } from "./Search.svg"


function Search(props){


    return (
        <div className={styles.input_wrapper}>

            <input
                className={styles.input}
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                autoComplete="on"
                value={props.value}
                onChange={(e) => {
                    props.onchange(e.target.value);
                }}
                style={{paddingTop:props.paddingTop,borderRadius:props.radius}}


            />



            <span className={styles.placeHolder}>
                                        <SearchIcon/>
                                    </span>
        </div>
    )
}


export default Search
