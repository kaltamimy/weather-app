// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $, { ajaxSettings } from 'jquery';
// import the Button component
import Button from '../button';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
		this.setState({temper:["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]});
		this.setState({cloudiness:["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]});
		this.setState({windSp:["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]});
		this.setState({hum:["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]});
		this.setState({iconFutureArr:["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]});
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		this.fetchWeatherDataFuture()
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=985762a7b74ffd5299099774c9686a4b";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	fetchWeatherDataFuture = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly&units=metric&appid=985762a7b74ffd5299099774c9686a4b";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponseFuture,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
					<div>
					<table>
                            <tr>
								<th scope = "col"></th>
                                <th scope = "col">Mon</th>
                                <th scope = "col">Tue</th>
                                <th scope = "col">Wed</th>
                                <th scope = "col">Thu</th>
                                <th scope = "col">Fri</th>
                                <th scope = "col">Sat</th>
                                <th scope = "col">Sun</th>
                            </tr>
                            <tr>
								<td></td>
                                <td>{this.state.temper[0]}</td>
                                <td>{this.state.temper[1]}</td>
                                <td>{this.state.temper[2]}</td>
                                <td>{this.state.temper[3]}</td>
                                <td>{this.state.temper[4]}</td>
                                <td>{this.state.temper[5]}</td>
                                <td>{this.state.temper[6]}</td>
                            </tr>
							<tr>
								<td></td>
								<td><img src={this.state.iconFutureArr[0]}/></td>
								<td><img src={this.state.iconFutureArr[1]}/></td>
								<td><img src={this.state.iconFutureArr[2]}/></td>
								<td><img src={this.state.iconFutureArr[3]}/></td>
								<td><img src={this.state.iconFutureArr[4]}/></td>
								<td><img src={this.state.iconFutureArr[5]}/></td>
								<td><img src={this.state.iconFutureArr[6]}/></td>
							</tr>
                            <tr>
								<td><p>Clouds</p></td>
                                <td>{this.state.cloudiness[0]}</td>
                                <td>{this.state.cloudiness[1]}</td>
                                <td>{this.state.cloudiness[2]}</td>
                                <td>{this.state.cloudiness[3]}</td>
                                <td>{this.state.cloudiness[4]}</td>
                                <td>{this.state.cloudiness[5]}</td>
                                <td>{this.state.cloudiness[6]}</td>
                            </tr>
							<tr>
								<td>Wind Speed</td>
                                <td>{this.state.windSp[0]}</td>
                                <td>{this.state.windSp[1]}</td>
                                <td>{this.state.windSp[2]}</td>
                                <td>{this.state.windSp[3]}</td>
                                <td>{this.state.windSp[4]}</td>
                                <td>{this.state.windSp[5]}</td>
                                <td>{this.state.windSp[6]}</td>
                            </tr>
							<tr>
								<td>Humidity</td>
                                <td>{this.state.hum[0]}</td>
                                <td>{this.state.hum[1]}</td>
                                <td>{this.state.hum[2]}</td>
                                <td>{this.state.hum[3]}</td>
                                <td>{this.state.hum[4]}</td>
                                <td>{this.state.hum[5]}</td>
                                <td>{this.state.hum[6]}</td>
                            </tr>
                    </table>
					</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }> 
					{ this.state.display ? <Button class={ style_iphone.button } displayMessage={"Home"}clickFunction={ this.fetchWeatherData }/ > : null }
					
				</div>
			</div>
			</div>
		);
	}
		// { this.state.display ? <Button class={ style_iphone.button } displayMessage={"Trails"}clickFunction={ Trails.js }/ > : null }
		// { this.state.display ? <Button class={ style_iphone.button } displayMessage={"Notifications"}clickFunction={ Notifications.js }/ > : null }
		// { this.state.display ? <Button class={ style_iphone.button } displayMessage={"Settings"}clickFunction={ Settings.js }/ > : null }
	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var conditions = parsed_json['weather']['0']['description'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions			
		});      
	}

	parseResponseFuture = (parsed_json) => {
		var i;
		var temperature=[];
		var cloudy=[];
		var windSpeed=[];
		var humid=[];
		var iconFuture=[];
		var iconFutureLink=[];

		for(i=0; i<7; i++){
			temperature.push(parsed_json['daily'][i]['temp']['day']);
			cloudy.push(parsed_json['daily'][i]['clouds']);
			windSpeed.push(parsed_json['daily'][i]['wind_speed']);
			humid.push(parsed_json['daily'][i]['humidity']);
			iconFuture.push(parsed_json['daily'][i]['weather']['0']['icon']);
			iconFutureLink.push("http://openweathermap.org/img/wn/"+iconFuture[i]+"@2x.png");
		}
		

		// set states for fields so they could be rendered later on
		this.setState({
			temper : temperature,
			cloudiness : cloudy,
			windSp : windSpeed,
			hum : humid,
			iconFutureArr : iconFutureLink
		});      
	}
}
