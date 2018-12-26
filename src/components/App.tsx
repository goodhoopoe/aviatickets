import * as React from 'react';
import './App.css';
import Currency from './Currency';
import Stops from './Stops'
import TicketsComponent from './Tickets'
import {CurrencyList} from "../constants/CurrencyEnum";
import {getDateTimeByString} from '../utils/functions'



interface Ticket {
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

interface Tickets {
    tickets: Ticket[];
    currency: CurrencyList;
    activeStops: number[];
}


class App extends React.Component<{}, Tickets> {
  public constructor(props: Tickets) {
      super(props);

      this.state = {
          tickets: [],
          currency: CurrencyList.RUB,
          activeStops: []
      };

      this.addTickets();
  }

  private addTickets() {
      fetch('/tickets.json')
          .then(res => res.json())
          .then(res => {
              this.setState({
                  tickets: res.tickets,
                  activeStops: this.getUniqueStopsValues()
              });
          });
  };

  private currencyChange = (e: CurrencyList) => this.setState({currency: e});

  private activeStopsChange = (e: number[]) => this.setState({activeStops: e});

  private getUniqueStopsValues = () => Array.from(new Set(this.state.tickets.map(t=>t.stops))).sort();

  private filterTicketsByStops = () => {
    return this.state.tickets
        .filter(t => this.state.activeStops.indexOf(t.stops) > -1)
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
              <Currency onChangeValue={this.currencyChange}/>
              <Stops stops={this.getUniqueStopsValues()} activeStops={this.state.activeStops} onChangeValue={this.activeStopsChange}/>
          </div>
          <div className="App-tickets">
              <TicketsComponent currency={this.state.currency} tickets={this.filterTicketsByStops()} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
