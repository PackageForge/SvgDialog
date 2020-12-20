import { Component, OnInit, Inject } from '@angular/core';
import { SvgDialogRef, SVG_DIALOG_DATA } from 'projects/svg-dialog/src/public-api';

@Component({
  selector: "svg[rect-dialog][xmlns=http://www.w3.org/2000/svg]",
  templateUrl: './rect-dialog.component.html',
})
export class RectDialogComponent implements OnInit {
  constructor(public dialogRef: SvgDialogRef<any>, @Inject(SVG_DIALOG_DATA) private data: any) {
    console.log("dialogRef", this.dialogRef);
    console.log("data", this.data);

  }
  close(value:any){
    this.dialogRef.close(value);
  }

  ngOnInit() { }
}
