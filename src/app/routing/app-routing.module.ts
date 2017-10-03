import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }       from '../authentification/login/login.component';
import { SigninComponent }      from '../authentification/signin/signin.component';
import { MainComponent }        from '../chat/main/main.component';

const routes: Routes = [
  { path: '',       redirectTo: '/login',       pathMatch: 'full'   },
  { path: 'login',  component: LoginComponent                       },
  { path: 'signin', component: SigninComponent                      },
  { path: 'main',   component: MainComponent                        }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}