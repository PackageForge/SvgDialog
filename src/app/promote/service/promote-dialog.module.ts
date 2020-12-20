import { NgModule } from '@angular/core';

import { PromoteDialogService } from './promote-dialog.service';

import {
  SvgDialogModule,
  SvgDialogManifest,
} from 'projects/svg-dialog/src/public-api';

const manifests: SvgDialogManifest[] = [
  {
    componentId: 'gbe-games-chess-promote-dialog',
    path: 'gbe-games-chess-promote-dialog',
    //loadChildren: './dialogs/promote/dialog/promote-dialog.module#PromoteDialogModule',
    loadChildren: 'src/app/promote/dialog/promote-dialog.module#PromoteDialogModule',
    size:{
      width:420,
      height:370
    }
  }
];

@NgModule({
  providers: [
    PromoteDialogService
  ],
  imports:[
    SvgDialogModule,
    SvgDialogModule.forRoot(manifests)
  ]
})
export class PromoteDialogModule {}
