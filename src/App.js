import './App.css';
import { connect } from 'react-redux';
import Seeker from "./components/Seeker";
import ListInvoices from "./components/ListInvoices";
import DetailsBills from "./components/DetailsBills";
import { setDataState } from "./actions/BillsActions";

const App = (props) => {
  let { option, data, detailsBill } = props.bills

  const optionFunction = (option) => {
    let objectOptions = {
      seeker: () => { return <Seeker /> },
      list: () => {
        return <ListInvoices
          data={props.bills}
          setDataState={props.setDataState}
          backFunction={backFunction}
        />
      },
      details: () => {
        return <DetailsBills
          data={props.bills.detailsBill}
          dataConfig={props.bills.filedsBills}
          backFunction={backFunction}
        />
      },
    }
    return objectOptions[option]();
  }

  const backFunction = () => {
    if (option === 'list') {
      props.setDataState('seeker', 'option');
      props.setDataState('', 'numberBill');
      props.setDataState([], 'data');
    }
    if (option === 'details') {
      if (!data.length && Object.keys(detailsBill).length) {
        props.setDataState('seeker', 'option');
        props.setDataState('', 'numberBill');
        props.setDataState({}, 'detailsBill');
      }
      if (data.length > 1) {
        props.setDataState('list', 'option');
        props.setDataState({}, 'detailsBill');
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
