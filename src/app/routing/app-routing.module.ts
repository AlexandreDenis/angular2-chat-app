import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard }            from './auth-guard.service';

import { LoginComponent }       from '../authentification/login/login.component';
import { SigninComponent }      from '../authentification/signin/signin.component';
import { MainComponent }        from '../chat/main/main.component';

const routes: Routes = [
  { path: '',       redirectTo: '/login',       pathMatch: 'full'   },
  { path: 'login',  component: LoginComponent                       },
  { path: 'signin', component: SigninComponent                      },
  { path:         'main',
    component:    MainComponent,
    canActivate:  [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ],
  providers: [ AuthGuard ]
})
export class AppRoutingModule { }