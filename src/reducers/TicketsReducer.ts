import {CurrencyList} from "../constants/CurrencyEnum";
import {
    FETCH_TICKETS_BEGIN, FETCH_TICKETS_FAILURE, FETCH_TICKETS_SUCCESS, SET_ACTIVE_STOPS,
    SET_NEW_CURRENCY
} from "../actions/Actions";
import {Ticket} from "../components/App";

export interface IStoreState {
    tickets: Ticket[];
    currency: CurrencyList;
    activeStops: number[];
    stops: number[];
}

const INITIAL_STATE: IStoreState = {
    tickets: [],
    currency: CurrencyList.RUB,
    activeStops: [],
    stops: []
};

export default function TicketsReducer(state: IStoreState = INITIAL_STATE, action: any)  {
    switch (action.type) {
        case FETCH_TICKETS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_TICKETS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                tickets: []
            };
        case FETCH_TICKETS_SUCCESS:
            return {
                ...state,
                loading: false,
                tickets: action.payload.tickets,
                stops: Array.from(new Set(action.payload.tickets.map((t: Ticket)=>t.stops))).sort(),
                activeStops: Array.from(new Set(action.payload.tickets.map((t: Ticket)=>t.stops))).sort()
            };
        case SET_ACTIVE_STOPS:
            return {
                ...state,
                activeStops: Array.from(action.payload.activeStops)
            };
        case SET_NEW_CURRENCY:
            return {
                ...state,
                currency: action.payload.currency
            }

    }
    return state;

}

