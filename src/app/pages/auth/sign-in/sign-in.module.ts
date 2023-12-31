import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignInPageRoutingModule } from './sign-in-routing.module';

import { SignInPage } from './sign-in.page';
import { AlertComponent } from 'src/app/components/alert/alert.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		SignInPageRoutingModule,
		FormsModule,
		ReactiveFormsModule,
	],
	declarations: [SignInPage, AlertComponent],
})
export class SignInPageModule {}
