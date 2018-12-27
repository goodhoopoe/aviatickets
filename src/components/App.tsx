import * as React from 'react';
import './App.css';
import Currency from './Currency';
import Stops from './Stops'
import TicketsComponent from './Tickets'
import {CurrencyList} from "../constants/CurrencyEnum";
import {connect} from "react-redux";
import {fetchTickets} from "../actions/Actions";


export interface Ticket {
    origin: string;
    origin_name: string;
    destination: string;
    destination_name: string;
    departure_date: string;
    departure_time: string;
    arrival_date: string;
    arrival_time: string;
    carrier: string;
    stops: number;
    price: number;
}

export interface Tickets {
    tickets: Ticket[];
    activeStops: number[];
    stops: number[];
    currency: CurrencyList;
    dispatch: any;
}


class App extends React.Component<Tickets, {}> {

  componentDidMount() {
      this.props.dispatch(fetchTickets());
  }



  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tickets test app</h1>
        </header>
        <div className="App-content">
          <div className="App-filters">
              <Currency />
              <Stops />
          </div>
          <div className="App-tickets">
              <TicketsComponent  />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = (state: any) => ({
    tickets: state.tickets,
    activeStops: state.activeStops,
    stops: state.stops,
    currency: state.currency
});

export default connect(mapStateToProp)(App);
