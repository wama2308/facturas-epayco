import React from 'react';
import { connect } from "react-redux";
import {
    setDataState,
    setDataStateError,
    changeOptionAction,
    getTokenAction,
    checkInvoicesAction,
    checkConfigInvoicesAction
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
                dataConfig => dataConfig.key !== 'expirationDateSecond'),
            'configBills'
        );
        props.setDataState(false, 'loading');
        if (data.length === 1) {
            props.changeOptionAction({ data: data[0], option: 'details' }, 'detailsBill')
        }
        if (data.length > 1) {
            props.changeOptionAction({ data: data, option: 'list' }, 'data')            
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
                            checkConfigInvoicesAction(token)
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
                    <div className="card-header bgCar titleList">
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
                    <div className="card-footer bgCar">
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
    changeOptionAction: (data, nodo) => dispatch(changeOptionAction(data, nodo)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Seeker);