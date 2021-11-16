import React from 'react';
import { amountFormat, convertDate, searchKey } from '../helpers/GenericsFunctions';
import ReactTooltip from 'react-tooltip';

const DetailsBills = (props) => {
    let configBills = props.dataConfig;
    let data = props.data;

    const drawDetailsBill = () => {
        return (
            configBills.map((dataConfig, i) => {
                return (
                    <React.Fragment key={i}>
                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-6 titleList'>
                                    <ReactTooltip
                                        id={`${dataConfig.key}_${i}`}
                                        effect='solid'
                                        place='right'
                                    >
                                        <span>{dataConfig.name}</span>
                                    </ReactTooltip>
                                    <span
                                        style={{ cursor: 'pointer' }}
                                        aria-hidden="true"
                                        data-tip data-for={`${dataConfig.key}_${i}`}
                                    >
                                        {dataConfig.name}
                                    </span>
                                </div>
                                <div className='col-6 text-end'>{convertData(dataConfig.key, data[dataConfig.key])}</div>
                            </div>
                        </div>
                        <div className='col-12 '><hr /></div>
                    </React.Fragment>
                );
            })
        );
    }

    const convertData = (key, data) => {
        if (key === 'expirationDateFirst') {
            return convertDate(data);
        }
        if (key === 'amountFirst') {
            return `$${amountFormat(data, 0)} COP`;
        }
        return data;
    }

    return (
        <div className='row justify-content-center'>
            <div className='col-12 col-lg-8 m-5'>
                <div className="card">
                    <div className="card-header d-flex" style={{ backgroundColor: 'rgb(209 203 203)' }}>
                        <div>
                            <i
                                className="fas fa-arrow-left fa-lg cursorPointer"
                                onClick={props.backFunction}
                            />
                        </div>
                        <div className='d-flex justify-content-center align-items-center flex-grow-1 titleList'>
                            {searchKey(configBills, 'billId')} {data.billId}
                        </div>

                    </div>
                    <div className="card-body" style={{ backgroundColor: '#f9f9f9' }}>
                        <div className='row m-2'>
                            <div className='col-12 '>
                                Descripción
                            </div>
                            <div className='col-12'><hr /></div>
                            {drawDetailsBill()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsBills;