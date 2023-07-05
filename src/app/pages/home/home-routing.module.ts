import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
	{
		path: '',
		component: HomePage,
		children: [
			{
				path: 'manage-orders',
				loadChildren: () =>
					import(
						'./../../modules/home/manage-orders/manage-orders.module'
					).then((m) => m.ManageOrdersPageModule),
			},
			{
				path: 'create-orders',
				loadChildren: () =>
					import(
						'./../../modules/home/create-orders/create-orders.module'
					).then((m) => m.CreateOrdersPageModule),
			},
			{
				path: 'profile',
				loadChildren: () =>
					import('./../../modules/home/profile/profile.module').then(
						(m) => m.ProfilePageModule
					),
			},
			{
				path: '',
				redirectTo: '/manage-orders',
				pathMatch: 'full',
			},
		],
	},
	{
		path: '',
		redirectTo: '/manage-orders',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HomePageRoutingModule {}
