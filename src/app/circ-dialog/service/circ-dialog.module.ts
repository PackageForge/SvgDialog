import { NgModule } from '@angular/core';

import { CircDialogService } from './circ-dialog.service';

import {
  SvgDialogModule,
  SvgDialogManifest,
} from 'projects/svg-dialog/src/public-api'

const manifests: SvgDialogManifest[] = [
  {
    componentId: 'circ-dialog',
    path: 'circ-dialog',
    loadChildren: 'src/app/circ-dialog/dialog/circ-dialog.module#CircDialogModule',
    size:{
      width:60,
      height:60
    }
  }
];

@NgModule({
  providers: [
    CircDialogService
  ],
  imports:[
    SvgDialogModule,
    SvgDialogModule.forRoot(manifests)
  ]
})
export class CircDialogModule {}
