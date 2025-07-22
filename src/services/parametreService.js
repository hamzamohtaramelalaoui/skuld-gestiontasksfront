import axios from 'axios';

// Définir l'URL de base de l'API
const API_BASE_URL = 'http://172.16.23.147:8080/parametre';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const parametresService = {
    recupererParametresParTypeParametre(typeParam, isDeleted) {
        return api.get('', {
            params: {
                typeParam: typeParam,
                isDeleted: isDeleted,
            },
        });
    }
}
