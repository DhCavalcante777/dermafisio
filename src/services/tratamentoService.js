import api from './';

export default {
    getAll: () => {
        return api.get('/tratamento');
    },
    getOne: id => {
        return api.get(`/tratamento/${id}`);
    },
    getByClienteId: clienteId => {
        return api.get(`/tratamento/cliente/${clienteId}`);
    },
    create: tratamento => {
        return api.post('/tratamento', tratamento);
    },
    update: tratamento => {
        return api.put(`/tratamento/${tratamento.id}`, tratamento);
    },
    delete: id => {
        return api.delete(`/tratamento/${id}`);
    }
}
