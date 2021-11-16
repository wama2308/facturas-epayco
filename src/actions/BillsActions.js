import axios from "axios";
import { handleError } from '../helpers/HandleError'

let dataSearch = {
    "projectId": 29,
    "document": ""
};

export const setDataState = (data, nodo) => dispatch => {
    dispatch({
        type: 'SET_DATA_STATE',
        payload: {
            data,
            nodo
        }
    });
};

export const setDataStateError = (data, nodo) => dispatch => {
    dispatch({
        type: 'SET_DATA_STATE_ERROS',
        payload: {
            data,
            nodo
        }
    });
};

export const getTokenAction = () => {
    return new Promise((resolve, reject) => {
        axios.post(
            `https://apify.epayco.co/login/mail`,
            {},
            {
                auth: {
                    username: 'pruebafront@payco.co',
                    password: 'pruebafront$2020'
                }
            }
        )
            .then((res) => {
                if (res.data.token) {
                    resolve(res.data.token);
                } else {
                    handleError({
                        title: res.data.error,
                        icon: 'error'
                    })
                    reject();
                }
            })
            .catch(() => {
                handleError({
                    title: 'Error obteniendo el token de verificacón',
                    icon: 'error'
                })
                reject();
            })
    });
}

export const checkInvoicesAction = (token, data) => {
    dataSearch.document = data;
    return new Promise((resolve, reject) => {
        axios.post(
            `https://apify.epayco.co//billcollect/invoices/consult`,
            dataSearch,
            { headers: { 'Authorization': `Bearer ${token}` } }
        )
            .then((res) => {
                if (res.data.data.bills.length) {
                    resolve(res.data.data.bills);
                } else {
                    handleError({
                        title: 'No cuenta con facturas pendientes por pagar.',
                        icon: 'error'
                    })
                    reject();
                }
            })
            .catch(() => {
                handleError({
                    title: 'Error consultando las facturas',
                    icon: 'error'
                })
                reject();
            })
    })
};

export const checkFiledsInvoicesAction = (token) => {
    return new Promise((resolve, reject) => {
        axios.post(
            `https://apify.epayco.co//billcollect/proyect/config/consult`,
            dataSearch,
            { headers: { 'Authorization': `Bearer ${token}` } }
        )
            .then((res) => {
                if (res.data.data.length) {
                    resolve(res.data.data);
                } else {
                    handleError({
                        title: 'Esta factura no posee campos.',
                        icon: 'error'
                    })
                    reject();
                }
            })
            .catch(() => {
                handleError({
                    title: 'Error consultando los campos de la factura',
                    icon: 'error'
                })
                reject();
            })
    })
};

