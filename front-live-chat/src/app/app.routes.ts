import { Route } from '@angular/router';
import { LiveChatComponent } from './pages/chat/chat.component';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Route[] = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'chat', component: LiveChatComponent
    }];
