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
				path: 'order',
				loadChildren: () => import('./../../modules/home/order/order.module').then( m => m.OrderPageModule)
			  },
			{
				path: 'profile',
				loadChildren: () =>
					import('./../../modules/home/profile/profile.module').then(
						(m) => m.ProfilePageModule
					),
			},
			{
				path: 'score',
				loadChildren: () =>
					import('./../../modules/home/score/score.module').then(
						(m) => m.ScorePageModule
					),
			},
			{
				path: '',
				redirectTo: '/score',
				pathMatch: 'full',
			},
		],
	},
	{
		path: '',
		redirectTo: '/score',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HomePageRoutingModule {}
