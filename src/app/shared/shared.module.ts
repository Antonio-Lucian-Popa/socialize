import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { AlertModule } from './services/alert/alert.module';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CreatePostDialogComponent } from './components/create-post-dialog/create-post-dialog.component';
import { PostComponent } from './components/post/post.component';
import {MatMenuModule} from '@angular/material/menu';
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();


const NB_MODULES: any[] = [
  MatDividerModule,
  MatCardModule,
  MatSelectModule,
  AlertModule,
  MatIconModule,
  MatBadgeModule,
  FormsModule,
  ReactiveFormsModule,
  MatDialogModule,
  MatMenuModule
];

const COMPONENTS: any[] = [
  CreatePostComponent,
  PostComponent
];


@NgModule({
  declarations: [...COMPONENTS, CreatePostDialogComponent, PostComponent],
  imports: [
    CommonModule,
    ...NB_MODULES
  ],
  exports: [...COMPONENTS, ...NB_MODULES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
