import { Component, ViewChild, ViewContainerRef, AfterViewInit, ElementRef } from '@angular/core'
import { RectDialogService } from './rect-dialog/service/rect-dialog.service';
import { CircDialogService } from './circ-dialog/service/circ-dialog.service';
import { PromoteDialogService } from './promote/service/promote-dialog.service';
import { Promote2DialogService } from './promote2/promote-dialog.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('boardArea') boardArea!: ElementRef<SVGElement>;
  @ViewChild('dialogOutlet', { read: ViewContainerRef }) dialogOutlet!: ViewContainerRef;
  @ViewChild('dialogOverlay', { read: ElementRef }) dialogOverlay!: ElementRef;

  constructor(private rectDialogService:RectDialogService,private circDialogService:CircDialogService,private promoteDialogService:PromoteDialogService,private promote2DialogService:Promote2DialogService) {
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.openPromote2Dialog();
    },100);
  }
  
  openRectDialog() {
    this.rectDialogService.open(this.dialogOutlet,{disSomeData:"oh yeah"},this.dialogOverlay).afterClosed().subscribe(value=>{
      console.log("RECT CLOSED!",value);
    });
  }
  openCircDialog() {
    this.circDialogService.open(this.dialogOutlet,{disSomeData:"oh yeah"},this.dialogOverlay).afterClosed().subscribe(value=>{
      console.log("CIRC CLOSED!",value);
    });
  }
  openPromoteDialog(){
    this.promoteDialogService.open(this.dialogOutlet,{disSomeData:"oh yeah"},this.dialogOverlay).afterClosed().subscribe(value=>{
      console.log("PROMOTE CLOSED!",value);
    });
  }
  openPromote2Dialog(){
    this.promote2DialogService.open(this.dialogOutlet,this.boardArea,{disSomeData:"oh yeah"}).afterClosed().subscribe(value=>{
      console.log("PROMOTE2 CLOSED!",value);
    });
  }
}
