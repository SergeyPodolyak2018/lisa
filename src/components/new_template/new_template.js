import React, {useState,useRef} from 'react'
import styles from './new_template.module.css'
import {
    useHistory,useParams, useLocation
} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {togleRefresh} from "../../features/templates_relevant/TemplatesRelevantSlice";
import Header from '../input/input_header/input_header'
import {CreateTemplate} from "../../utils/Query"

import { ReactComponent as LeftArrow } from "./Arrow-Left.svg"
import { ReactComponent as PenActive } from "./EditActive.svg"
import { ReactComponent as Pen } from "./Edit.svg"
import { ReactComponent as Cross } from "./X.svg"
import Button from '../regular_button/regular_button'

import DropList from '../drop_list/drop_list'
import Spinner from '../spinner/spinner'





function NewTemplate(props){
    let history = useHistory();
    const dispatch = useDispatch();

    const [templateName, setTemplateName] = useState('Template Name');
    const [loading, setLoading] = useState(false);



    const [allDays, setAllDays] = useState(false);
    const [charackters, setCharackters] = useState(0);

    const textInput = useRef(null);

    const paterns=['name','surname','company','position','location'];
    const [list, setList]=useState([]);

    function changeLocation(location) {
        history.push(location);
    }

    const addToList = (data)=>{
        let newList = [...list];
        newList.push(data)
        setList(newList);
    }
    const removeFromList = (index)=>{
        console.log(index);
        let newList = [...list];
        newList.splice(index,1);
        setList(newList);
    }
    const calculator=()=>{
        let cuantity = textInput.current.textContent.length
        setCharackters(cuantity)
    }

    const dragstart = function(e) {

        if (!e.target.id){
            e.target.id = (new Date()).getTime();
        }
        e.dataTransfer.setData('text/html', e.target.outerHTML);
        console.log('started dragging');
        e.target.classList.add("dragged");


    }

    const dragover = function(e) {
        e.preventDefault();

        return false;
    }
    const removeFromEdit = function(e) {


        e.currentTarget.parentElement.remove()
    }

    const updateEditable = function(e) {

        let elements = textInput.current.getElementsByClassName(styles.cross_button);
        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click',removeFromEdit,false)
        }

    }

    const create = ()=>{
        let clon = textInput.current.cloneNode(true);
        let childList=clon.getElementsByClassName(styles.component_button);
        for (let i = 0; i < childList.length; i++) {
            let atr = childList[i].getAttribute('templatename');
            childList[i].innerHTML=`\${${atr.toUpperCase()}}`;

        }
        console.log(clon.innerText);
        setLoading(true)

        CreateTemplate({
            "name": templateName,
            "template": clon.innerText
        })
            .then((rez)=>{
                if(rez){
                    dispatch(togleRefresh());
                    changeLocation('/app/templates/relevant');
                }else {
                    setLoading(false)
                }
            })

    }


    const drop = (e,ui)=>{
        e.preventDefault();
        var content = e.dataTransfer.getData('text/html');
        var range = null;
        if (document.caretRangeFromPoint) { // Chrome
            range = document.caretRangeFromPoint(e.clientX, e.clientY);
        }
        else if (e.rangeParent) { // Firefox
            range = document.createRange();
            range.setStart(e.rangeParent, e.rangeOffset);
        }

        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);


        document.execCommand('insertHTML',false, content);
        sel.removeAllRanges();
        updateEditable();



    }

    const clickOnElement = ()=>{
        console.log('test');
    }

    const getContent=()=> {
        if (loading) {
            return <Spinner/>
        } else {
            return <div className={styles.wrapper}>

                <div className={styles.backbutton}>
                    <LeftArrow/>
                    <span >Back</span>

                </div>
                <div className={styles.header_wrapper}>
                    <div>
                        <div className={styles.header_input_wrapper}>
                            <Header
                                type={'text'}
                                name={'header'}
                                value={templateName}
                                onchange={setTemplateName}
                                activeIcon={<PenActive/>}
                                notActiveIcon={<Pen/>}


                            />

                        </div>
                        <div className={styles.under_text}><span>Create your own unique template. Drag and drop components you need</span></div>
                    </div>
                    <div className={styles.save_button}>
                        <Button name={'Create'} click={()=>{create()}}
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
                            <span className={styles.section_name}>Creation field</span>

                            <div className={styles.big_input_wrapper}>
                                <div className={styles.changebl_div} contentEditable="true" onDrop={drop} ref={textInput} onMouseMove={calculator} onKeyUp={calculator}></div>
                            </div>
                            <div className={styles.info}>{charackters} / 300 characters</div>

                        </div>

                    </div>
                    <div className={`${styles.section} ${styles.right}`}>
                        <div className={styles.subsectionrigh}>
                            <span className={styles.section_name}>components</span>
                            <div className={styles.dragbl_buttons_wrapper}>
                                {list.map((item,index)=>{
                                    return <span key={index} className={`${styles.component_button}`} draggable="true" contentEditable={false} templatename={item}  onDragStart={dragstart} onDragEnd={(e)=>{dragover(e);removeFromList(index) }} onClick={clickOnElement}>{item}<span className={styles.cross_button} onClick={()=>{removeFromList(index)}}><Cross/></span></span>
                                })}

                                <div className={styles.drop_list_wrapper}>
                                    <DropList
                                        list={paterns}
                                        select={addToList}
                                    />
                                </div>


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


export default NewTemplate
