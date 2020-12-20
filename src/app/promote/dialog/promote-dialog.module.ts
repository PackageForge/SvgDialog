import { NgModule } from '@angular/core';

import { SvgDialogModule } from 'projects/svg-dialog/src/public-api';
import { PromoteDialogComponent } from './promote-dialog.component';

@NgModule({
  declarations: [
    PromoteDialogComponent,
  ],
  imports: [
    SvgDialogModule.forChild(PromoteDialogComponent),
  ],
})
export class PromoteDialogModule {}
