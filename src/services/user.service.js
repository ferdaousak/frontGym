import axios from 'axios';
import authHeader from './auth-header';
import AuthService from "../services/auth.service";

const API_URL = 'http://localhost:8080/api/test/';
const API_URL2 = 'http://localhost:8080/api/services/';

class UserService {

    getAllUsers() {
        return axios.get(API_URL2 + 'user/all');
    }

    getUserById(id)
    {
        const request = {
            id:id,
            username:"0"
        }
        return axios.post(API_URL2 + 'user/getuser', request ,{ headers: authHeader()}).then(response => {
            return response.data;
        });
    }

    getUserByname(name)
    {
        const request = {}
    }
    deleteUser(id)
    {
        return axios.delete(API_URL2+'user/delete', {
            headers: authHeader(),
            data: {
              id:id,
              username:"0"
            }
          });
    }

    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'trainer', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();