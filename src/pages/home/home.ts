import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import moment from 'moment';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
})
export class HomePage {
	@ViewChild('slideRef') slide: Slides;

	locationInfo: any;
	cityName: string;
	slides = [];
	bgImage: string;
 
	constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
		this.locationInfo = this.navParams.get("weatherInfo");
		if (this.locationInfo) this.bgImage = this.BgImage(this.locationInfo.current.weather[0].main);

		/*this.storage.forEach((value, key, index) => {
			this.slides.push(JSON.parse(value));
		});*/
	}
 
	ionViewDidLoad() {
		this.locationInfo = this.navParams.get("weatherInfo");

		if(this.locationInfo) {
			this.cityName = this.locationInfo.current.name;
			this.slides.push(this.locationInfo);
		}
	}

	slideChanged() {
		let index     = this.slide.getActiveIndex();
		let name 	  = this.slides[index].current.name;
		this.cityName = name;
		this.bgImage  = this.BgImage(this.slides[index].current.weather[0].main);
	}

	getFullDate() {
		let date = moment(0 * 1000).format("DD/MM//YY");
		return date;
	}

	GetDay(time: number) {
		let day 	= new Date(time * 1000).toISOString();
		let d 		= new Date(day);
		let weekday = [];
		weekday[0] 	= "Seg";
		weekday[1] 	= "Ter";
		weekday[2] 	= "Qua";
		weekday[3] 	= "Qui";
		weekday[4] 	= "Sex";
		weekday[5] 	= "Sáb";
		weekday[6] 	= "Dom";
		
		return weekday[d.getDay()];
	}

	GetDate(time: number) {
		let day = moment(time * 1000).format("DD/MM");
		return day;
	}

	windDirection(deg){
		if (deg > 11.25 && deg < 33.75) {
			return "NNE";
		} else if (deg > 33.75 && deg < 56.25) {
			return "ENE";
		} else if (deg > 56.25 && deg < 78.75) {
			return "E";
		} else if (deg > 78.75 && deg < 101.25) {
			return "ESE";
		} else if (deg > 101.25 && deg < 123.75) {
			return "ESE";
		} else if (deg > 123.75 && deg < 146.25) {
			return "SE";
		} else if (deg > 146.25 && deg < 168.75) {
			return "SSE";
		} else if (deg > 168.75 && deg < 191.25) {
			return "S";
		} else if (deg > 191.25 && deg < 213.75) {
			return "SSW";
		} else if (deg > 213.75 && deg < 236.25) {
			return "SW";
		} else if (deg > 236.25 && deg < 258.75) {
			return "WSW";
		} else if (deg > 258.75 && deg < 281.25) {
			return "W";
		} else if (deg > 281.25 && deg < 303.75) {
			return "WNW";
		} else if (deg > 303.75 && deg < 326.25) {
			return "NW";
		} else if (deg > 326.25 && deg < 348.75) {
			return "NNW";
		} else {
			return "N";
		}
	}

	BgImage(val) {
		if (val == "Rain") {
			return './assets/imgs/rain.jpg';
		} else if (val == "Clear") {
			return './assets/imgs/clear.jpg';
		} else if (val == "Clouds") {
			return './assets/imgs/clouds.jpg';
		} else if (val == "Drizzle") {
			return './assets/imgs/drizzle.jpg';
		} else if (val == "Snow") {
			return './assets/imgs/snow.jpg';
		} else if (val == "ThunderStorm") {
			return './assets/imgs/thunder.jpg';
		} else {
			return './assets/imgs/clear.jpg';
		}
	}

	checkDescription(description: string){
		if (description == 'clear sky') {
			return "Céu limpo";
		} else if (description == 'broken clouds') {
			return "Nuvens quebradas";
		} else if (description == 'shower rain') {
			return "Banho de chuva";
		} else if (description == 'rain') {
			return "Chovendo";
		} else if (description == 'thunderstorm') {
			return "Tempestade de raios";
		} else if (description == 'few clouds') {
			return "Alguns nuvens";
		} else {
			return "Neve";
		}
	}
}
