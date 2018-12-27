import * as React from "react";
import './Currency.css';
import {CurrencyList} from '../constants/CurrencyEnum';
import {setNewCurrency} from "../actions/Actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {IStoreState} from "../reducers/TicketsReducer";

interface CurrencyInterface {
    currency: CurrencyList;
    setNewCurrency?: any;
}

class Currency extends React.Component<CurrencyInterface, {}> {

    private changeCurrency = (e: any) => {
        this.props.setNewCurrency(parseInt(e.target.value));
    };

    public render() {
        return (
            <div className="btn-group">
                <button className={this.props.currency === CurrencyList.RUB ? 'active-currency-button' : ''} value={CurrencyList.RUB} onClick={this.changeCurrency}>RUB</button>
                <button className={this.props.currency === CurrencyList.USD ? 'active-currency-button' : ''} value={CurrencyList.USD} onClick={this.changeCurrency}>USD</button>
                <button className={this.props.currency === CurrencyList.EUR ? 'active-currency-button' : ''} value={CurrencyList.EUR} onClick={this.changeCurrency}>EUR</button>
            </div>
        );
    }
}

const mapStateToProp = (state: IStoreState) => ({
    currency: state.currency
});

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators( {
        setNewCurrency
    }, dispatch );
}

export default connect(mapStateToProp, mapDispatchToProps)(Currency);

