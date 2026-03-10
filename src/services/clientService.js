import api from './';

export default {
    getAll: ( ) => {
        return api.get('/client');
    },
    getOne: id => {
        return api.get(`/client/${id}`);
    },
    create: client => {
        return api.post('/client', client);
    },
    update: client => {
        return api.put(`/client/${client.id}`, client);
    },
    delete: id => {
        return api.delete(`/client/${id}`);
    }
}
