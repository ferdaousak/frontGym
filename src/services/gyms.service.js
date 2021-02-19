import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/gym';

class GymService
{
    getAllgyms()
    {
        return axios.get(API_URL + '/', { headers: authHeader()});
    }

    getGymbyId(id)
    {
        return axios.post(API_URL +'/id', {gymid: id,username:"0" },{ headers: authHeader() });
    }

    getGymbyName(name)
    {
        return axios.get(API_URL +`/name/${name}`, { headers: authHeader() });
    }

    addGym(gymname,trainerid)
    {
        const gym = {name:gymname, trainerid:trainerid};

        console.log("gym at service: "+ gym);
        return axios.put(API_URL +'/add',gym,{ headers: authHeader() });
    }

    updateGym(gym)
    {
        return axios.post(API_URL +'/update',gym,{ headers: authHeader()});
    }
    
    deleteGym(name)
    {
        return axios.delete(API_URL+'/delete', {
            headers: authHeader(),
            data: {
              name:name,
              trainerid:"0"
            }
          });
    }

    addUserToGym(gymid,username)
    {
        const request = {gymid : gymid, username:username};

        return axios.post(API_URL+'/add/user',request,{ headers: authHeader() });
    }

    removeUserfromGym(gymid, username)
    {
        return axios.delete(API_URL+'/remove/user', {
            headers: authHeader(),
            data: {
              gymid: gymid,
              username:username
            }
          });
    }

    getAllgymsOfUser(username)
    {
        const request = {gymid:'0', username:username};

        return axios.post(API_URL+'/user/all',request,{ headers: authHeader()});
    }

    getAllGymUsers(gymid)
    {
        const request = {gymid:gymid, username:"0"};

        return axios.post(API_URL+'/users',request,{ headers: authHeader()});

    }

    getAllgymsOfTrainer(username)
    {
        const request = {gymid:'0', username:username};

        return axios.post(API_URL+'/trainer/all',request,{ headers: authHeader()});
    }
}

export default new GymService();