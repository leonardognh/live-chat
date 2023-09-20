import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LiveChatComponent } from './pages/chat/chat.component';
import { HomeComponent } from './pages/home/home.component';
import { LiveChatService } from './services/chat.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LiveChatComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    FontAwesomeModule
  ],
  providers: [LiveChatService],
  bootstrap: [AppComponent],
})
export class AppModule { }
