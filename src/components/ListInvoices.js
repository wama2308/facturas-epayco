import React from 'react';
import { amountFormat, convertDate, searchKey } from '../helpers/GenericsFunctions';


const ListInvoices = (props) => {
    let { data, configBills } = props.data;

    const toPayFunction = (data) => {
        props.setDataState(data, 'detailsBill');
        props.setDataState('details', 'option');
    }

    const drawRows = () => {
        return (
            data.map((dataBill, i) => {
                return (
                    <div className='row rowList m-3 p-3' key={i}>
                        <div className='col-12 col-md-3'>
                            <div className='row'>
                                <div className='col-12 titleList'>{searchKey(configBills, 'amountFirst')}</div>
                                <div className='col-12'>{`$${amountFormat(dataBill.amountFirst, 0)} COP`}</div>
                            </div>
                        </div>
                        <div className='col-12 col-md-3'>
                            <div className='row'>
                                <div className='col-12 titleList'>{searchKey(configBills, 'billId')}</div>
                                <div className='col-12'>{dataBill.billId}</div>
                            </div>
                        </div>
                        <div className='col-12 col-md-3'>
                            <div className='row'>
                                <div className='col-12 titleList'>{searchKey(configBills, 'expirationDateFirst')}</div>
                                <div className='col-12'>{convertDate(dataBill.expirationDateFirst)}</div>
                            </div>
                        </div>
                        <div className='col-12 col-md-3 pt-3 pt-md-0 align-self-center'>
                            <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={() => toPayFunction(dataBill)}
                            >
                                PAGAR
                            </button>
                        </div>
                    </div>
                );
            })
        );
    }

    return (
        <div className='row justify-content-center'>
            <div className='col-12 m-5'>
                <div className="card">
                    <div className="card-header bgCar d-flex">
                        <div>
                            <i
                                className="fas fa-arrow-left fa-lg cursorPointer"
                                onClick={props.backFunction}
                            />
                        </div>
                        <div className='d-flex justify-content-center align-items-center flex-grow-1 titleList'>
                            Listado
                        </div>

                    </div>
                    <div className="card-body">
                        {drawRows()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListInvoices;