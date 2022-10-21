export const GetSheduleList = async function(){
    try {
        const response = await fetch(`${process.env.REACT_APP_LISA_URL}/schedule/`,{
            method: 'GET',
            credentials: 'include',
        });
        const payload = await response.json();
        if(payload.status === 0){
            if(!payload.data){
                return  [];
            }
            return payload.data;
        }else{
            throw new Error("failed!");
        }
    }catch (error){
        console.error('Ошибка:', error);
        throw new Error("failed!");
    }



};
export const GetTemplateList = async function(){
    try {
        const response = await fetch(`${process.env.REACT_APP_LISA_URL}/templates`,{
            method: 'GET',
            credentials: 'include',
        });
        const payload = await response.json();
        if(payload.status === 0){
            if(!payload.data){
                return  [];
            }
            return payload.data;

        }else{
            throw new Error("failed!");
        }
    }catch (error){
        console.error('Ошибка:', error);
        throw new Error("failed!");
    }

};

export const GetAccountsList = async function(){
    try {
        const response = await fetch(`${process.env.REACT_APP_LISA_URL}/accounts/`,{
            method: 'GET',
            credentials: 'include',
        });
        const payload = await response.json();
        if(payload.status.code === 0){
            if(payload.data.length>0){
                let transformedArrey = Array.from(payload.data, (item) => {
                    return {id:item.id,name:`${item.firstName} ${item.lastName}`};
                })
                return transformedArrey;
            }else{
                return [];
            }
        }else{
            throw new Error("failed!");
        }
    }catch (error){
        console.error('Ошибка:', error);
        throw new Error("failed!");
    }

};

export const CreateCampaign = async function(data){
    try {
        const response = await fetch(`${process.env.REACT_APP_LISA_URL}/campaigns/connection/new`, {
            method: 'POST', // или 'PUT'
            body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const payload = await response.json();
        if(payload.status === 0){
            return true
        }else{
            throw new Error("failed!");
        }
    } catch (error) {
        console.error('Ошибка:', error);
        throw new Error("failed!");
    }
};

export const SubmitNewAccountCreds = async function(data){
    try {
        const response = await fetch(`${process.env.REACT_APP_LISA_URL}/accounts/add`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const payload = await response.json();
        if(payload.status.code === 0){
            if(Object.keys(payload.data.pinData).length>0){
                return {pinData:payload.data.pinData,uuid:payload.data.uuid}
            }else{
                return {finish:true};
            }

        }else{
            throw new Error("failed!");
        }
    } catch (error) {
        console.error('Ошибка:', error);
        throw new Error("failed!");
    }
};
export const SubmitCode = async function(data){
    try {
        const response = await fetch(`${process.env.REACT_APP_LISA_URL}/accounts/${data.uuid}/pin_verify`, {
            method: 'POST',
            body: JSON.stringify({
                "code": data.code,
                "pinData": data.pinData
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const payload = await response.json();
        if(payload.status === 0){
            return true
        }else{
            if(payload.status === 1) {
                return false
            }else{
                throw new Error("failed!");
            }
        }
    } catch (error) {
        console.error('Ошибка:', error);
        throw new Error("failed!");
    }
};

export const GetConnections = async function(search,assignedAccounts,start){
    try {
        const response = await fetch(`${process.env.REACT_APP_LISA_URL}/campaigns/connection/search/${assignedAccounts}?query=${search}&start=${start}`,{
            method: 'GET',
            credentials: 'include',
        });
        const payload = await response.json();
        if(payload.status === 0){
            if(payload.data.length>6){
                return {data:payload.data.slice(0,6),paging:payload.paging};
            }
            return {data:payload.data,paging:payload.paging};
        }else{
            throw new Error("failed!");
        }
    }catch (error){
        console.error('Ошибка:', error);
        throw new Error("failed!");
    }
}

export const GetUserMe = async function(){
    try {
        const response = await fetch(`${process.env.REACT_APP_LISA_URL}/user/me`,{
            method: 'GET',
            credentials: 'include',
        });
        const payload = await response.json();
        if(payload.status === 0){
            return payload.data
        }else{
            throw new Error("failed!");
        }
    }catch (error){
        console.error('Ошибка:', error);
        throw new Error("failed!");
    }
}

export const LogoutQuery = async function(){
    try {
        const response = await fetch(`${process.env.REACT_APP_LISA_URL}/auth/logout`,{
            method: 'POST',
            credentials: 'include',
        });
        const payload = await response.json();
        if(payload.status === 0){
            return true
        }else{
            throw new Error("failed!");
        }
    }catch (error){
        console.error('Ошибка:', error);
        throw new Error("failed!");
    }
}

export const GetProfile = async function(){
    try {
        const response = await fetch('/data/profile.json',{

        });
        const payload = await response.json();
        if(payload.status === 0){
            return payload.data
        }else{
            throw new Error("failed!");
        }
    }catch (error){
        console.error('Ошибка:', error);
        throw new Error("failed!");
    }
}
export const EditProfile = async function(data,img){
    try {
        const response = await fetch('/edit_profile', {
            method: 'POST', // или 'PUT'
            body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const payload = await response.json();
        if(payload.status.code === 0){
            return true
        }else{
            throw new Error("failed!");
        }
    } catch (error) {
        console.error('Ошибка:', error);
        throw new Error("failed!");
    }
};

export const CreateTemplate = async function(data){
    try {
        const response = await fetch(`${process.env.REACT_APP_LISA_URL}/templates/new`, {
            method: 'POST', // или 'PUT'
            body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const payload = await response.json();
        if(payload.status === 0){
            return true
        }else{
            throw new Error("failed!");
        }
    } catch (error) {
        console.error('Ошибка:', error);
        throw new Error("failed!");
    }
};

export const CreateList = async function(data){
    try {
        const response = await fetch(`${process.env.REACT_APP_LISA_URL}/search/sales/people-search`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const payload = await response.json();
        if(payload.status === 0){
            return true
        }else{
            if(payload.status === 1) {
                return false
            }else{
                throw new Error("failed!");
            }
        }
    } catch (error) {
        console.error('Ошибка:', error);
        throw new Error("failed!");
    }
};

export const GetMailingsList = async function(data){
    try {
        const response = await fetch(`${process.env.REACT_APP_LISA_URL}/search/all?not_attach=true`, {
            method: 'GET',
            credentials: 'include',
        });
        const payload = await response.json();
        if(payload.status === 0){
            if(!payload.data){
                return  [];
            }
            return payload.data
        }else{
            if(payload.status === 1) {
                return false
            }else{
                throw new Error("failed!");
            }
        }
    } catch (error) {
        console.error('Ошибка:', error);
        throw new Error("failed!");
    }
};

export const GetMailingsListById = async function(id){
    try {
        const response = await fetch(`${process.env.REACT_APP_LISA_URL}/search/${id}/status`, {
            method: 'GET',
            credentials: 'include',
        });
        const payload = await response.json();
        if(payload.status === 0){
            return payload.data;
        }else{
            if(payload.status === 1) {
                return false
            }else{
                throw new Error("failed!");
            }
        }
    } catch (error) {
        console.error('Ошибка:', error);
        throw new Error("failed!");
    }
};
export const GetMailingsListResultById = async function(id,step,start){
    try {
        const response = await fetch(`${process.env.REACT_APP_LISA_URL}/search/${id}/result?start=${start}&count=${step}`, {
            method: 'GET',
            credentials: 'include',
        });
        const payload = await response.json();
        if(payload.status === 0){
            return payload
        }else{
            if(payload.status === 1) {
                return false
            }else{
                throw new Error("failed!");
            }
        }
    } catch (error) {
        console.error('Ошибка:', error);
        throw new Error("failed!");
    }
};

export const GetCampaignById = async function(id){
    try {
        const response = await fetch(`${process.env.REACT_APP_LISA_URL}/campaigns?id=${id}`, {
            method: 'GET',
            credentials: 'include',
        });
        const payload = await response.json();
        if(payload.status === 0){
            return payload.data
        }else{
            if(payload.status === 1) {
                return false
            }else{
                throw new Error("failed!");
            }
        }
    } catch (error) {
        console.error('Ошибка:', error);
        throw new Error("failed!");
    }
};

export const CreateShedule = async function(data){
    try {
        const response = await fetch(`${process.env.REACT_APP_LISA_URL}/schedule/new/`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const payload = await response.json();
        if(payload.status === 0){
            return true
        }else{
            if(payload.status === 1) {
                return false
            }else{
                throw new Error("failed!");
            }
        }
    } catch (error) {
        console.error('Ошибка:', error);
        throw new Error("failed!");
    }
};

