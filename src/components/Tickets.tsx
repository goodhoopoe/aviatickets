import * as React from 'react';
import './Tickets.css';
import {CurrencyList, CurrencyInfo} from "../constants/CurrencyEnum";
import { getStopEndingByCount } from "../utils/functions";

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

interface TicketsProps {
    tickets: Ticket[];
    currency: CurrencyList;
}

interface Currency {
    rate: number;
    sign: string;
}

class TicketsComponent extends React.Component<TicketsProps, {}> {
    public constructor(props: TicketsProps) {
        super(props);
    }

    private getTicketInfoByCurrency(price: number) : string {
        let cur: Currency = CurrencyInfo[this.props.currency];
        return (price / cur.rate).toFixed(2) + ` ${cur.sign}`;
    }

    public render() {
        return this.props.tickets.length > 0 ? (
          <div>
              {this.props.tickets.map((t,index) => (
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

export default TicketsComponent;