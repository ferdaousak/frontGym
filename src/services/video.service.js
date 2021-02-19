import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/videos';

class VideoService{

    getAllvids()
    {
        return axios.get(API_URL + '/', { headers: authHeader()});
    }

    getVideoById(id)
    {
        return axios.post(API_URL + '/id', {id:id}, {headers: authHeader() });
    }

    getVideoByTitle(title)
    {
        return axios.post(API_URL + '/title', {title:title, gymid:"0"}, {headers: authHeader()});
    }

    getAllGymVideos(id)
    {
        return axios.post(API_URL + '/gym/all', {id:id}, {headers: authHeader()});
    }

    addVideoGym(title,gymid)
    {
        const request = {gymid:gymid, title:title};

        console.log("video at service: "+ request);
        return axios.put(API_URL +'/add',request,{ headers: authHeader() });
    }

    deleteVideoFromGym(gymid, title)
    {
        return axios.delete(API_URL+'/gym/remove', {
            headers: authHeader(),
            data: {
              gymid: gymid,
              title:title
            }
          });
    }
}

export default new VideoService();