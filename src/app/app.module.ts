import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { SetTimeDifferencePipe } from './core/pipes/set-time-difference.pipe';

@NgModule({
	declarations: [AppComponent, SetTimeDifferencePipe],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		HttpClientModule,
	],
	providers: [
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
