import api from './';

export default {
    getAll: ( ) => {
        return api.get('/calendar');
    },
    getOne: id => {
        return api.get(`/calendar/${id}`);
    },
    create: appointment => {
        return api.post('/calendar', appointment);
    },
    update: appointment => {
        return api.put(`/calendar/${appointment.id}`, appointment);
    },
    delete: id => {
        return api.delete(`/calendar/${id}`);
    }
}