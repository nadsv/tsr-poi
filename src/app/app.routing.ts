import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddComponent } from './add/add.component';
import { FindComponent } from './find/find.component';
import { ExportComponent } from './export/export.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth-guard.service';
import { Form12Component } from './print/form-1-2/form-1-2.component';
import { Form13Component } from './print/form-1-3/form-1-3.component';
import { Form14Component } from './print/form-1-4/form-1-4.component';
import { Form15Component } from './print/form-1-5/form-1-5.component';
import { Form16Component } from './print/form-1-6/form-1-6.component';
import { Form17Component } from './print/form-1-7/form-1-7.component';
import { Form18Component } from './print/form-1-8/form-1-8.component';
import { Form19Component } from './print/form-1-9/form-1-9.component';
import { Form110Component } from './print/form-1-10/form-1-10.component';
import { Form21Component } from './print/form-2-1/form-2-1.component';
import { Form22Component } from './print/form-2-2/form-2-2.component';
import { Form23Component } from './print/form-2-3/form-2-3.component';
import { Form24Component } from './print/form-2-4/form-2-4.component';

const routes: Routes = [
	{path: '', component: LoginComponent},
    {path: 'request', component: AddComponent, canActivate: [AuthGuard]},
    {path: 'request/:id', component: AddComponent, canActivate: [AuthGuard]},
    {path: 'find', component: FindComponent, canActivate: [AuthGuard]},
    {path: 'export', component: ExportComponent, canActivate: [AuthGuard]},
    {path: 'print', canActivate: [AuthGuard], children: [
    	{path: 'form-1-2', component: Form12Component},
        {path: 'form-1-3', component: Form13Component},
        {path: 'form-1-4', component: Form14Component},
        {path: 'form-1-5', component: Form15Component},
        {path: 'form-1-6', component: Form16Component},
        {path: 'form-1-7', component: Form17Component},
        {path: 'form-1-8', component: Form18Component},
        {path: 'form-1-9', component: Form19Component},
        {path: 'form-1-10', component: Form110Component},
        {path: 'form-2-1', component: Form21Component},
        {path: 'form-2-2', component: Form22Component},
        {path: 'form-2-3', component: Form23Component}
    ]},
    {path: '**', component: PageNotFoundComponent }
];

export const RoutingModule = RouterModule.forRoot(routes);