import * as React from 'react';
import './App.css';
import Currency from './Currency';
import Stops from './Stops'
import TicketsComponent from './Tickets'
import {CurrencyList} from "../constants/CurrencyEnum";

// import {getDateTimeByString} from '../utils/functions'
import {connect} from "react-redux";
import {fetchTickets} from "../actions/Actions";
import getDateTimeByString from "../utils/functions";



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
    dispatch: any;
}


class App extends React.Component<Tickets, {}> {

  componentDidMount() {
      this.props.dispatch(fetchTickets());
  }

  private filterTicketsByStops = () => {
    return this.props.tickets
        .filter(t => this.props.activeStops.indexOf(t.stops) > -1)
        .sort((a,b) => {
            let dateA = getDateTimeByString(a.departure_date, a.departure_time);
            let dateB = getDateTimeByString(b.departure_date, b.departure_time);
            return dateA > dateB ? 1 : (dateA < dateB ?  -1 : 0);
        });
  };

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
              <TicketsComponent currency={CurrencyList.RUB} tickets={this.filterTicketsByStops()} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = (state: any) => ({
    tickets: state.tickets,
    activeStops: state.activeStops,
    stops: state.stops
});

export default connect(mapStateToProp)(App);
