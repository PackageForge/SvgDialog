import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';

import { RectDialogModule } from './rect-dialog/service/rect-dialog.module';
import { CircDialogModule } from './circ-dialog/service/circ-dialog.module';
import { PromoteDialogModule } from './promote/service/promote-dialog.module';
import { Promote2DialogModule } from './promote2/promote-dialog.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    //RectDialogModule,
    //CircDialogModule,
    //PromoteDialogModule,
    Promote2DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
