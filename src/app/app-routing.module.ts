import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./core/components/notification/notification.module').then(m => m.NotificationModule)
  },
  {
    path: 'discover',
    loadChildren: () => import('./components/discover/discover.module').then(m => m.DiscoverModule)
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
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
