import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { FormsModule,
         ReactiveFormsModule }  from '@angular/forms';

import { AppComponent }         from './app.component';
import { LoginComponent }       from './authentification/login/login.component';
import { SigninComponent }      from './authentification/signin/signin.component';
import { ToastComponent }       from './toast/toast.component';
import { MainComponent }        from './chat/main/main.component';
import { MessageBoxComponent }  from './chat/messagebox/messagebox.component';

import { CacheService }         from './dataaccess/cache.service';
import { AuthService }          from './authentification/auth.service';
import { ToastService }         from './toast/toast.service';
import { EncryptionService }    from './authentification/encryption.service';
import { Messenger }            from './chat/messenger.service';

import { AppRoutingModule }     from './routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    ToastComponent,
    MainComponent,
    MessageBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ 
    CacheService, 
    AuthService,
    ToastService,
    EncryptionService,
    Messenger
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
