import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverComponent } from './discover.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DiscoverComponent,
    // children: [
    //   {
    //     path: 'post-detail/:id', // child route path
    //     component: PostDetailComponent, // child route component that the router renders
    //   },
    // ]
  },
  {
    path: 'post-detail/:id',
    component: PostDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscoverRoutingModule { }
