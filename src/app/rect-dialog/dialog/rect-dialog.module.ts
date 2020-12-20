import { NgModule } from '@angular/core';

import { SvgDialogModule } from 'projects/svg-dialog/src/public-api';
import { RectDialogComponent } from './rect-dialog.component';

@NgModule({
  declarations: [
    RectDialogComponent,
  ],
  imports: [
    SvgDialogModule.forChild(RectDialogComponent),
  ],
})
export class RectDialogModule {}
