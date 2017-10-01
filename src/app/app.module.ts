import { BrowserModule }      from '@angular/platform-browser';
import { NgModule }           from '@angular/core';
import { FormsModule }        from '@angular/forms';

import { AppComponent }       from './app.component';
import { LoginComponent }     from './authentification/login/login.component';
import { SigninComponent }    from './authentification/signin/signin.component';

import { CacheService }       from './dataaccess/cache.service';
import { AuthService }        from './authentification/auth.service';

import { AppRoutingModule }   from './routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ 
    CacheService, 
    AuthService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
