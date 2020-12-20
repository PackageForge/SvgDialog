import { NgModule } from '@angular/core';

import { SvgDialogModule } from 'projects/svg-dialog/src/public-api';
import { PromoteDialogComponent } from './promote-dialog.component';
import { Promote2DialogService } from './promote-dialog.service';

@NgModule({
  imports: [
    SvgDialogModule
  ],
  declarations: [
    PromoteDialogComponent
  ],
  entryComponents: [
    PromoteDialogComponent
  ],
  providers: [
    Promote2DialogService
  ]
})
export class Promote2DialogModule {}
