import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { ViewInfoPage } from './pages/view-info/view-info.page';
import { SetTimeDifferencePipe } from './core/pipes/set-time-difference.pipe';
import { AssignPage } from './pages/assign/assign.page';
import { FilePage } from './pages/file/file.page';
import { HomePage } from './pages/home/home.page';
import { ViewInfoDetailPage } from './pages/view-info-detail/view-info-detail.page';
import { AddOrderPage } from './pages/add-order/add-order.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent,
		ViewInfoPage,
		SetTimeDifferencePipe,
		AssignPage,
		FilePage,
		HomePage,
		ViewInfoDetailPage,
		AddOrderPage,
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		HttpClientModule,
		CommonModule,
		FormsModule,
		IonicModule,
	],
	providers: [
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class AppModule {}
