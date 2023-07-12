import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewInfoPageRoutingModule } from './view-info-routing.module';

import { ViewInfoPage } from './view-info.page';
import { SetTimeDifferencePipe } from 'src/app/core/pipes/set-time-difference.pipe';
import { AssignPage } from '../assign/assign.page';
import { FilePage } from '../file/file.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ViewInfoPageRoutingModule,
	],
	declarations: [ViewInfoPage, SetTimeDifferencePipe, AssignPage, FilePage],
})
export class ViewInfoPageModule {}
