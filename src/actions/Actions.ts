import {Ticket} from "../components/App";
import {CurrencyList} from "../constants/CurrencyEnum";
import {Dispatch} from "redux";

export const FETCH_TICKETS_BEGIN   = 'FETCH_TICKETS_BEGIN';
export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS';
export const FETCH_TICKETS_FAILURE = 'FETCH_TICKETS_FAILURE';
export const SET_ACTIVE_STOPS = 'SET_ACTIVE_STOPS';
export const SET_NEW_CURRENCY = 'SET_NEW_CURRENCY';

export const fetchTicketsBegin = () => ({
    type: FETCH_TICKETS_BEGIN
});

export const fetchTicketsSuccess = (tickets: Ticket[]) => ({
    type: FETCH_TICKETS_SUCCESS,
    payload: { tickets }
});

export const fetchTicketsFailure = (error: any) => ({
    type: FETCH_TICKETS_FAILURE,
    payload: { error }
});

export const setActiveStops = (activeStops: number[]) => ({
    type: SET_ACTIVE_STOPS,
    payload: { activeStops }
});

export const setNewCurrency = (currency: CurrencyList) => ({
    type: SET_NEW_CURRENCY,
    payload: { currency }
});

export function fetchTickets() {
    return (dispatch: Dispatch) => {
        dispatch(fetchTicketsBegin());
        return fetch("/tickets.json")
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchTicketsSuccess(json.tickets));
            })
            .catch(error => dispatch(fetchTicketsFailure(error)));
    };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response: any) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}