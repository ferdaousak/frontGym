import axios from 'axios';
import authHeader from './auth-header';
import AuthService from "../services/auth.service";

const API_URL = 'http://localhost:8080/api/test/';
const API_URL2 = 'http://localhost:8080/api/profile';

class UserService {

    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();