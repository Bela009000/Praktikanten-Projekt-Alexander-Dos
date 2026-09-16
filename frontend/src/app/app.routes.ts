import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { TopicsComponent } from './pages/topics/topics';
import { FlashcardsComponent } from './pages/flashcards/flashcards';
import { TopicDetailComponent } from './pages/topic-detail/topic-detail';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'topics',
    component: TopicsComponent
  },
  {
    path: 'flashcards',
    component: FlashcardsComponent
  },
  {
    path: 'topic-cards',
    component: TopicDetailComponent
  }
];