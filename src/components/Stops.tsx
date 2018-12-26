import * as React from 'react';
import './Stops.css';
import { getStopEndingByCount } from "../utils/functions";

interface StopsArray {
    stops: number[];
    activeStops: number[];
    onChangeValue: (e: number[]) => void;
}

class Stops extends React.Component<StopsArray, StopsArray> {
    public constructor(props: StopsArray) {
        super(props);

        //В состоянии храним массив включенных чекбоксов
        this.state = {
            stops: props.stops,
            activeStops: [...props.stops] || [],
            onChangeValue: this.props.onChangeValue
        };
    }

    componentWillReceiveProps(newProps: StopsArray) {
        //Обновляем состояние при получении новых данных в случае если список пересадок изменился. иначе оставляем.
        if (this.state.stops.length != 0 && this.state.activeStops.length === newProps.activeStops.length && this.state.activeStops.every((value, index) => value === newProps.activeStops[index]) && (newProps.activeStops.every((value, index) => value === this.state.activeStops[index]))) {
            return;
        }
        this.setState({
            stops: newProps.stops,
            activeStops: [...newProps.stops] || []
        });
        this.state.onChangeValue(newProps.stops);
    }
    private checkBoxValueChanged = (e: React.ChangeEvent<HTMLInputElement>)  => {
        //Обновляем массив количества остановок
        let stops = this.state.activeStops;
        let stop = parseInt( e.target.value);
        let index = stops.indexOf(stop);
        if (index !== -1) {
            stops.splice(index, 1);
        } else {
            stops.push(stop)
        }
        this.setState({
            activeStops: stops
        });
        this.state.onChangeValue(stops);
    };
    private getCheckBoxValue = (ct: number) : boolean => {
        //Получаем значение чекбокса
        return (this.state.activeStops || []).indexOf(ct) > -1;
    };
    private allStopsValueChange = () => {
        //Для чекбокса "Все остановки" включаем дефолтное значение
        this.setState({
            activeStops: [...this.props.stops]
        });
        this.state.onChangeValue(this.props.stops);
    };
    private allStopsCheckboxValue() : boolean {
        //Проверяем значение чекбокса "Все значения".
        return (this.state.activeStops).length === this.state.stops.length && this.state.activeStops.length !== 0;
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
                {this.props.stops.map(s => (
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
                ))}
            </div>
        );
    }
}

export default Stops;