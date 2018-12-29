import * as React from 'react';
import './Tickets.css';
import {CurrencyList, CurrencyInfo} from "../constants/CurrencyEnum";
import { getStopEndingByCount } from "../utils/functions";
import getDateTimeByString from "../utils/functions";
import {connect} from "react-redux";
import {IStoreState} from "../reducers/TicketsReducer";
import {Ticket} from "./App";


interface TicketsProps {
    tickets: Ticket[];
    currency: CurrencyList;
    activeStops: number[];
}

interface Currency {
    rate: number;
    sign: string;
}

class TicketsComponent extends React.Component<TicketsProps, {}> {

    private getTicketInfoByCurrency(price: number) : string {
        let cur: Currency = CurrencyInfo[this.props.currency];
        return (price / cur.rate).toFixed(2) + ` ${cur.sign}`;
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
        let filteredTickets: Ticket[] = this.filterTicketsByStops();
        return filteredTickets.length > 0 ? (
          <div>
              {filteredTickets.map((t,index) => (
                  <div key={index} className="ticket__wrapper">
                      <div className="ticket__container">
                          <div className="ticket__buy-col">
                              <div className="buy-button ticket__buy-button">
                                  <div className=""><a className="buy-button__link" href="#" ><button className="buy-button__button"><span className="buy-button__text">{this.getTicketInfoByCurrency(t.price)} {}</span></button></a></div>
                              </div>
                          </div>
                          <div className="ticket__content">
                              <div className="ticket__segments segments">
                                  <div className="ticket__segment segment">
                                      <div className="segment-route">
                                          <div className="segment-route__origin">
                                              <div className="segment-route__time">{t.departure_time}</div>
                                              <div className="segment-route__city">{t.origin_name}</div>
                                              <div className="segment-route__date">{t.departure_date}</div>
                                          </div>
                                          <div className="segment-route__path">
                                              <div className="segment-route__total-time">{getStopEndingByCount(t.stops)}</div>
                                          </div>
                                          <div className="segment-route__destination">
                                              <div className="segment-route__time">{t.arrival_time}</div>
                                              <div className="segment-route__city">{t.destination_name}</div>
                                              <div className="segment-route__date">{t.arrival_date}</div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
        ) : (
            <div>
                Нет доступных перелётов
            </div>
        );
    }
}


const mapStateToProp = (state: IStoreState) => ({
    currency: state.currency,
    tickets: state.tickets,
    activeStops: state.activeStops
});

export default connect(mapStateToProp)(TicketsComponent);