import api from './';

export default {
    getAll: ( ) => {
        return api.get('/anamnese');
    },
    getOne: id => {
        return api.get(`/anamnese/${id}`);
    },
    create: anamnese => {
        return api.post('/anamnese', anamnese);
    },
    update: anamnese => {
        // Aqui usamos o id que vem dentro do objeto anamnese
        return api.put(`/anamnese/${anamnese.id}`, anamnese);
    },
    delete: id => {
        return api.delete(`/anamnese/${id}`);
    }
}
