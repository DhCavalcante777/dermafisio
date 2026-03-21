import api from './';

export default {
    getAll: () => {
        return api.get('/financeiro');
    },
    getOne: id => {
        return api.get(`/financeiro/${id}`);
    },
    create: data => {
        return api.post('/financeiro', data);
    },
    update: data => {
        return api.put(`/financeiro/${data.id}`, data);
    },
    delete: id => {
        return api.delete(`/financeiro/${id}`);
    }
}
