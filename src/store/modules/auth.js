import api from '../../axios';

export default {
    namespaced: true,
    state: {
        user: null,
        token: localStorage.getItem('token') || null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    actions: {
        async login({ commit }, credentials) {
            const res = await api.post('/login', credentials);
            // console.log(res.data);

            commit('setToken', res.data.token);
            // await api.get('/user').then(r => commit('setUser', r.data));
        },
        async register(_, data) {
            return await api.post('/register', data);
        },
        async fetchUser({ commit }) {
            const res = await api.get('/user');
            commit('setUser', res.data);
        },
        logout({ commit }) {
            commit('logout');
        },
    },
};
