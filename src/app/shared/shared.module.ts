import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { AlertModule } from './services/alert/alert.module';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';


const NB_MODULES: any[] = [
  MatDividerModule,
  MatCardModule,
  MatSelectModule,
  AlertModule,
  MatIconModule,
  MatBadgeModule
];

const COMPONENTS: any[] = [];


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ...NB_MODULES
  ],
  exports: [...COMPONENTS, ...NB_MODULES]
})
export class SharedModule { }
