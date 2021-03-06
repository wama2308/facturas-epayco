const InitalState = {
    loading: false,
    option: 'seeker',
    data: [],
    configBills: [],
    detailsBill: {},
    numberBill: "",
    errors: {
        numberBill: {
            class: '',
            label: ''
        }
    }
};


const BillsReducers = (state = InitalState, action) => {
    switch (action.type) {
        case "SET_DATA_STATE": {
            return {
                ...state,
                [action.payload.nodo]: action.payload.data,
                errors: {
                    ...state.errors, [action.payload.nodo]: {
                        class: '',
                        label: ''
                    }
                }
            };
        }
        case "SET_DATA_STATE_ERROS": {
            return {
                ...state,
                errors: {
                    ...state.errors, [action.payload.nodo]: action.payload.data
                }
            };
        }
        case "SET_CHANGE_OPTION": {
            return {
                ...state,
                option: action.payload.data.option,
                [action.payload.nodo]: action.payload.data.data
            };
        }


        default:
            return state;
    }
};

export default BillsReducers;