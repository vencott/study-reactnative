import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Loading from "./src/Loading";
import Weather from "./src/Weather";

const API_KEY = "956758bdea2e75e37ee4eaad8688da6f";

export default class App extends Component {
    state = {
        isLoaded: false,
        error: null,
        temperature: null,
        weatherName: null
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this._getWeather(position.coords.latitude, position.coords.longitude)
            },
            error => {
                this.setState({
                    error: error
                })
            })
    }

    render() {
        const {isLoaded, error} = this.state;

        return (
            <View style={styles.container}>
                {isLoaded ?
                    <Weather
                        temperature={Math.ceil(this.state.temperature - 273.15)}
                        weatherName={this.state.weatherName}/>
                    :
                    <Loading
                        error={error}/>}
            </View>
        );
    }

    _getWeather = (lat, lon) => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    temperature: json.main.temp,
                    weatherName: json.weather[0].main,
                    isLoaded: true
                })
            })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
});