import { NgModule } from '@angular/core';

import { RectDialogService } from './rect-dialog.service';

import {
  SvgDialogModule,
  SvgDialogManifest,
} from 'projects/svg-dialog/src/public-api'

const manifests: SvgDialogManifest[] = [
  {
    componentId: 'rect-dialog',
    path: 'rect-dialog',
    loadChildren: 'src/app/rect-dialog/dialog/rect-dialog.module#RectDialogModule',
    size:{
      width:60,
      height:60
    }
  }
];

@NgModule({
  providers: [
    RectDialogService
  ],
  imports:[
    SvgDialogModule,
    SvgDialogModule.forRoot(manifests)
  ]
})
export class RectDialogModule {}
