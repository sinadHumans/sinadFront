import {import { defineStore } from 'pinia';
import {show_alerta} from '../functions';

export const useauthStore = defineStore('auth', () => {
    state: () => ({ authUser: null, authToken: null}),
    getters:{
        user:(state) =>{ return state.authUser},
        token:(state)=> {return state.authToken}
    },
    actions:{
        /* funcion para traer el token  */
        async getToken(){
            await axios.get('/sanctum/csrf-cookie')
        },
        /* funcino para el login */
        async login(form){
            await this.getToken()
            await axios.post('/api/auth/login',form).then(
                (response)=>{
                    this.authToken = response.data.token;
                    this.authUser = response.data.data;
                    this.router.push('/departments');
                }
            ).catch((error)=>{
                let desc = '';
                errors.response.data.errors.map(
                    (e) => {desc = desc + ' '+e}
                )
                show_alerta(desc, 'error',  "Ocurrió un error al intentar iniciar sesión");   

            })
        },

        /* funcion para registar el usuario */
        async register(form){
            await this.getToken()
            await axios.post('/api/auth/registrer',form).then(
                (response)=>{
                   show_alert(response.data.message,'success','Registrado correctamente');
                   setTimeout(() => this.router.push("/login"),2000);
                }
            ).catch((error)=>{
                let desc = '';
                errors.response.data.errors.map(
                    (e) => {desc = desc + ' '+e}
                )
                show_alerta(desc, 'error',  "Ocurrió un error al intentar iniciar sesión");   

            })
        },

        /* funcion de cerrar sesion */
        async logout(){
            await axios.get('/api/auth/logout',this.authToken);
            this.authToken = null;
            this.authUser = null;
            this.router.push('/login');
        },
        persist:true


    }
});





}