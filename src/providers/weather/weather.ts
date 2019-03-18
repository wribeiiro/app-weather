import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherProvider {
	apiKey = '5f386d0eea792de8e4b3a55cbe7680e4';
	url;

	constructor(public http: Http, private geolocation: Geolocation) {}

	async getPosition() {
		return await this.geolocation.getCurrentPosition();
	}

	currentWeather(lon: number, lat: number): Observable<any> {
		const currentInfo = this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`);
		
		const forecastInfo = this.http.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=10&appid=${this.apiKey}`);

		return Observable.forkJoin([currentInfo, forecastInfo]).map(responses => {
			return [].concat(...responses);
		});
	}
}
