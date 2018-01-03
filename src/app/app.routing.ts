import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddComponent } from './add/add.component';
import { FindComponent } from './find/find.component';
import { ExportComponent } from './export/export.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
	{path: '', component: LoginComponent},
    {path: 'request', component: AddComponent, canActivate: [AuthGuard]},
    {path: 'request/:id', component: AddComponent, canActivate: [AuthGuard]},
    {path: 'find', component: FindComponent, canActivate: [AuthGuard]},
    {path: 'export', component: ExportComponent, canActivate: [AuthGuard]},
    {path: '**', component: PageNotFoundComponent }
];

export const RoutingModule = RouterModule.forRoot(routes);