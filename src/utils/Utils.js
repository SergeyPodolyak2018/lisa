import {
    useHistory
} from 'react-router-dom'
import filter from 'lodash/filter';
import includes from 'lodash/includes';

export const ChangeLocation = (location) => {
    let history = useHistory();
    history.push(location);
};

export const FilterCollection =(collection,incl,by)=>{
    let output = filter(collection, (v) => includes(incl, v[by]));
    return output
}

export const NameCuter =(name)=> {
    let newName = ''
    if (name.length > 13) {
        return newName = name.substring(0, 13) + '...'
    }
    return name
}

export const GetOcupation =(text,position)=> {

    return text.split('at')[position]
}

export const TextCuter =(name, length)=> {
    let newName = '';
    if (name.length > length) {
        return newName = name.substring(0, length) + '...'
    }
    return name
}

export const GetPages =(result, step)=> {
    let ostatok =result%step;
    if(ostatok!==0){
        return Math.trunc(result/step)+1
    }
    return result/step;
}

export const GetCurrentPage =(result, step, start)=> {
    if(start===0){
        return 1
    }else{
        return Math.trunc(start/step)+1
    }
}

export const GetUrlParam =(param)=> {
    let query = window.location.href.split('?')[1];
    let searchParams = new URLSearchParams(query);
    return searchParams.get(param);
}

export const TextPreprocess =(text)=> {
    if(text){
        return decodeURIComponent(text)
    }
    return '';


}

export const TimeConverter = (time)=>{

    const timeString12hr = new Date('1970-01-01T' + time + 'Z')
        .toLocaleTimeString({},
            {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
        );
    return timeString12hr
};

export const ParamChecker = function(){
    console.log('ParamChecker');
    for(let i=0; i<arguments.length;i++){
        console.log(arguments[i]);
        if(!arguments[i]){
            return false;
        }
    }
    return true;

};
