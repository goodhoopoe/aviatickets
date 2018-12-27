import * as React from 'react';
import './Stops.css';
import { getStopEndingByCount } from "../utils/functions";
import {connect} from "react-redux";
import {setActiveStops} from "../actions/Actions";
import {bindActionCreators} from "redux";
import {IStoreState} from "../reducers/TicketsReducer";

interface StopsArray {
    stops: number[];
    activeStops: number[];
    dispatch?: any;
    setActiveStops?: any;
}

class Stops extends React.Component<StopsArray, {}> {

    private checkBoxValueChanged = (e: React.ChangeEvent<HTMLInputElement>)  => {
        //Обновляем массив количества остановок
        let stops = this.props.activeStops;
        let stop = parseInt( e.target.value);
        let index = stops.indexOf(stop);
        if (index !== -1) {
            stops.splice(index, 1);
        } else {
            stops.push(stop)
        }
        this.props.setActiveStops(stops);
    };
    private getCheckBoxValue = (ct: number) : boolean => {
        //Получаем значение чекбокса
        return this.props.activeStops.indexOf(ct) > -1;
    };
    private allStopsValueChange = () => {
        //Для чекбокса "Все остановки" включаем дефолтное значение
        this.props.setActiveStops([...this.props.stops]);
    };
    private allStopsCheckboxValue() : boolean {
        //Проверяем значение чекбокса "Все значения".
        return this.props.activeStops.length === this.props.stops.length && this.props.activeStops.length !== 0;
    }
    public render() {
        return (
            <div className="filter__stops">
                <div key={'all'}>
                    <input
                        type="checkbox"
                        id="stops_all"
                        value={'all'}
                        checked={this.allStopsCheckboxValue()}
                        onChange={this.allStopsValueChange}
                    />
                    Все
                </div>
                {this.props.stops ? this.props.stops.map((s:number) => (
                    <div key={s}>
                        <input
                            type="checkbox"
                            id="stops_{s}"
                            checked={this.getCheckBoxValue(s)}
                            value={s}
                            onChange={this.checkBoxValueChanged}
                        />
                        {getStopEndingByCount(s)}
                    </div>
                )) : ""}
            </div>
        );
    }
}

const mapStateToProp = (state: IStoreState) => ({
    activeStops: state.activeStops,
    stops: state.stops
});

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators( {
        setActiveStops
    }, dispatch );
}

export default connect(mapStateToProp, mapDispatchToProps)(Stops);
