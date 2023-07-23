import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./pages/home/home.module').then((m) => m.HomePageModule),
		canActivate: [AuthGuard],
	},
	{
		path: 'view-info/:id',
		loadChildren: () =>
			import('./pages/view-info/view-info.module').then(
				(m) => m.ViewInfoPageModule
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'view-info-detail/:idorden/:iddetalleorden',
		loadChildren: () =>
			import('./pages/view-info-detail/view-info-detail.module').then(
				(m) => m.ViewInfoDetailPageModule
			),
	},
	{
		path: 'add-order',
		loadChildren: () =>
			import('./pages/add-order/add-order.module').then(
				(m) => m.AddOrderPageModule
			),
	},
	{
		path: 'sign-in',
		loadChildren: () =>
			import('./pages/auth/sign-in/sign-in.module').then(
				(m) => m.SignInPageModule
			),
		canActivate: [NoAuthGuard],
	}

];
@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
