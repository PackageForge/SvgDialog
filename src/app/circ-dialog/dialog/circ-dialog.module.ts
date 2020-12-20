import { NgModule } from '@angular/core';

import { SvgDialogModule } from 'projects/svg-dialog/src/public-api';
import { CircDialogComponent } from './circ-dialog.component';

@NgModule({
  declarations: [
    CircDialogComponent,
  ],
  imports: [
    SvgDialogModule.forChild(CircDialogComponent),
  ],
})
export class CircDialogModule {}
