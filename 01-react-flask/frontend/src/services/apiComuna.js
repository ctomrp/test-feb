import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000/';

export class ComunaAPI {

    static async getComunasTest(){
        const response = await axios.get(`${BASE_URL}/comuna/test`)
        return response.data;
    }

}