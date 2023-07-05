import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./pages/home/home.module').then((m) => m.HomePageModule),
	},
	{
		path: 'view-info/:id',
		loadChildren: () =>
			import('./pages/view-info/view-info.module').then(
				(m) => m.ViewInfoPageModule
			),
	},
	{
		path: 'sign-in',
		loadChildren: () =>
			import('./pages/auth/sign-in/sign-in.module').then(
				(m) => m.SignInPageModule
			),
	},
];
@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
