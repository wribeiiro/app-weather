import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WeatherProvider } from './../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
	templateUrl: 'app.html'
})
export class MyApp implements OnInit, AfterViewInit {
	@ViewChild(Nav) nav: Nav;
	rootPage: string = "HomePage";

	hideDelete = false;
	loc: string;
	weatherUnits = [];
	weather: any;
	forecast: any;
	pages: any[] = [];
	location 	 = {};
	
	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private weatherProvider: WeatherProvider, private storage: Storage, private events: Events,private alertCtrl: AlertController) {
		this.initializeApp();
	}

	ngOnInit() {
		this.storage.forEach((value, key, index) => {
			this.pages.push(JSON.parse(value));
		});
	}

	ngAfterViewInit() {
		this.weatherProvider.getPosition().then(resp => {
			this.weatherProvider.currentWeather(resp.coords.longitude, resp.coords.latitude).subscribe(res => {
				if (res.length > 0) {
					let body = JSON.parse(res[0]._body)
					let other = JSON.parse(res[1]._body)
					
					this.weather = body;
					this.loc 	 = body.name;
					
					this.location = {
						id: body.id,
						icon: `http://openweathermap.org/img/w/${body.weather[0].icon}.png`,
						current: body,
						forecast: other
					}

					this.storage.set(`location ${body.id}`, JSON.stringify(this.location));

					if (this.pages.length <= 0) this.events.publish("cityinfo", this.location);
					this.nav.setRoot("HomePage", { "weatherInfo": this.location });
				}
			});
		});

		this.events.subscribe("cityinfo", (data) => {
			this.pages.push(data);
		});
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}
}
