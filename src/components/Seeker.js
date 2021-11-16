import React from 'react';
import { connect } from "react-redux";
import {
    setDataState,
    setDataStateError,
    getTokenAction,
    checkInvoicesAction,
    checkFiledsInvoicesAction
} from "../actions/BillsActions"


const Seeker = (props) => {
    let { numberBill, errors, loading } = props.bills
    
    const handleInputChange = (event) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        props.setDataState(value, name);
    };

    const validate = () => {
        let acum = "";
        if (numberBill === '') {
            props.setDataStateError({
                class: 'border-danger',
                label: '¡Campo requerido!'
            }, 'numberBill');
            acum = 1;
        }
        if (acum > 0) {
            return false;
        }
        return true;
    }

    const changeOption = (data, config) => {
        props.setDataState(
            config.filter(
                dataConfig => dataConfig.key !== 'expirationDateSecond' &&
                    dataConfig.key !== 'pendingAmount'
            ),
            'filedsBills'
        );                                    
        props.setDataState(false, 'loading');
        if (data.length === 1) {
            props.setDataState(data[0], 'detailsBill');
            props.setDataState('details', 'option');
        }
        if (data.length > 1) {
            props.setDataState(data, 'data');
            props.setDataState('list', 'option');
        }

    }

    const checkInvoices = event => {
        event.preventDefault();
        const isValid = validate();
        if (isValid) {
            props.setDataState(true, 'loading');
            getTokenAction()
                .then((token) => {
                    checkInvoicesAction(token, numberBill)
                        .then((invoces) => {
                            checkFiledsInvoicesAction(token)
                                .then((config) => {
                                    changeOption(invoces, config);
                                  
                                })
                                .catch(() => {
                                    props.setDataState(false, 'loading');
                                });
                        })
                        .catch(() => {
                            props.setDataState(false, 'loading');
                        });
                })
                .catch(() => {
                    props.setDataState(false, 'loading');
                });
        }
    }

    return (
        <div className='row justify-content-center'>
            <div className='col-12 m-5'>
                <div className="card">
                    <div className="card-header">
                        Consulte sus facturas
                    </div>
                    <div className="card-body m-3">
                        <div className="form-group">
                            <label htmlFor="numberBill" className='col-12'>
                                Número de identificación del usuario
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.numberBill.class}`}
                                id="numberBill"
                                name="numberBill"
                                value={numberBill}
                                onChange={handleInputChange}
                            />
                            <small className='form-text text-danger'>
                                {errors.numberBill.label}
                            </small>
                        </div>

                    </div>
                    <div className="card-footer">
                        <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={checkInvoices}
                            disabled={loading}
                        >
                            {
                                loading ?
                                    <div
                                        className="spinner-border text-white"
                                        role="status"
                                    /> :
                                    'Consultar'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    bills: state.bills,
});

const mapDispatchToProps = dispatch => ({
    setDataState: (data, nodo) => dispatch(setDataState(data, nodo)),
    setDataStateError: (data, nodo) => dispatch(setDataStateError(data, nodo)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Seeker);