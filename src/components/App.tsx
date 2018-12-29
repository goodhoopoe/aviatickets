import * as React from 'react';
import './App.css';
import Currency from './Currency';
import Stops from './Stops'
import TicketsComponent from './Tickets'
import {connect} from "react-redux";
import {fetchTickets} from "../actions/Actions";
import {bindActionCreators, Dispatch} from "redux";


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

interface AppProps {
    fetchTickets: typeof fetchTickets;
}


class App extends React.Component<AppProps, {}> {

  componentDidMount() {
      this.props.fetchTickets();
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

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators( {
        fetchTickets
    }, dispatch );
}

export default connect(null, mapDispatchToProps)(App);
