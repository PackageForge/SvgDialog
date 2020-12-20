import { Component, OnInit, Inject } from '@angular/core';
import { SvgDialogRef, SVG_DIALOG_DATA } from 'projects/svg-dialog/src/public-api';

@Component({
  selector: "svg[gbe-games-chess-promote-dialog][xmlns=http://www.w3.org/2000/svg]",
  templateUrl: './promote-dialog.component.html',
})
export class PromoteDialogComponent implements OnInit {
  constructor(public dialogRef: SvgDialogRef<any>, @Inject(SVG_DIALOG_DATA) public data: any) {
  }
  close(value:any){
    this.dialogRef.close(value);
  }

  ngOnInit() { }
}
