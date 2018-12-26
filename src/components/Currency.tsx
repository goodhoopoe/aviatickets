import * as React from "react";
import './Currency.css';
import {CurrencyList} from '../constants/CurrencyEnum';

interface CurrencyInterface {
    onChangeValue: (value: CurrencyList) => void;
}

interface CurrencyState {
    activeCurrency: CurrencyList;
}

class Currency extends React.Component<CurrencyInterface, CurrencyState> {

    public constructor(props: CurrencyInterface) {
        super(props);

        this.state = {
            activeCurrency: CurrencyList.RUB
        }
    }

    private changeCurrency = (e: any) => {
        this.setState({activeCurrency: parseInt(e.target.value)});
        this.props.onChangeValue(parseInt(e.target.value));
    };

    public render() {
        return (
            <div className="btn-group">
                <button className={this.state.activeCurrency === CurrencyList.RUB ? 'active-currency-button' : ''} value={CurrencyList.RUB} onClick={this.changeCurrency}>RUB</button>
                <button className={this.state.activeCurrency === CurrencyList.USD ? 'active-currency-button' : ''} value={CurrencyList.USD} onClick={this.changeCurrency}>USD</button>
                <button className={this.state.activeCurrency === CurrencyList.EUR ? 'active-currency-button' : ''} value={CurrencyList.EUR} onClick={this.changeCurrency}>EUR</button>
            </div>
        );
    }
}

export default Currency;