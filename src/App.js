import './App.css';
import { connect } from 'react-redux';
import Seeker from "./components/Seeker";
import ListInvoices from "./components/ListInvoices";
import DetailsBills from "./components/DetailsBills";
import { setDataState, changeOptionAction } from "./actions/BillsActions";

const App = (props) => {
  let { option, data, detailsBill } = props.bills

  const optionFunction = (option) => {
    let objectOptions = {
      seeker: () => { return <Seeker /> },
      list: () => {
        return <ListInvoices
          data={props.bills}
          changeOptionAction={props.changeOptionAction}
          backFunction={backFunction}
        />
      },
      details: () => {
        return <DetailsBills
          data={props.bills.detailsBill}
          dataConfig={props.bills.configBills}
          backFunction={backFunction}
        />
      },
    }
    return objectOptions[option]();
  }

  const backFunction = () => {
    props.setDataState('', 'numberBill');
    if (option === 'list') {
      props.changeOptionAction({ data: [], option: 'seeker' }, 'data')
    }
    if (option === 'details') {
      if (!data.length && Object.keys(detailsBill).length) {
        props.changeOptionAction({ data: {}, option: 'seeker' }, 'detailsBill')
      }
      if (data.length > 1) {
        props.changeOptionAction({ data: {}, option: 'list' }, 'detailsBill')
      }
    }
  }

  return (
    <div className="container-fluid">
      <div className='divcenter d-flex justify-content-center align-items-center'>
        {optionFunction(option)}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  bills: state.bills,
});

const mapDispatchToProps = dispatch => ({
  setDataState: (data, nodo) => dispatch(setDataState(data, nodo)),
  changeOptionAction: (data, nodo) => dispatch(changeOptionAction(data, nodo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
