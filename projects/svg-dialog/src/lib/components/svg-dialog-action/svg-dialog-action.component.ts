import { Component, ElementRef, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: '[svg-dialog-action]',
  templateUrl: './svg-dialog-action.component.html',
  styleUrls: ['./svg-dialog-action.component.css']
})
export class SvgDialogActionComponent implements AfterViewInit {

  @Input() height:number=40;
  parentWidth:number;
  parentHeight:number;
  d!:string;
  inset=1;
  radius=10;
  constructor(private e:ElementRef<SVGElement>) { 
    this.parentWidth=parseFloat(this.e.nativeElement.parentElement!.getAttribute("width")||"0");
    this.parentHeight=parseFloat(this.e.nativeElement.parentElement!.getAttribute("height")||"0");
  }

  ngAfterViewInit() {
    this.parentWidth=parseFloat(this.e.nativeElement.parentElement!.getAttribute("width")||"0");
    this.parentHeight=parseFloat(this.e.nativeElement.parentElement!.getAttribute("height")||"0");
    let d="";
    d+=" M "+this.inset+" "+(this.parentHeight-this.height-this.inset);
    d+=" v "+(this.height-(this.radius-1));    
    d+=" a "+(this.radius-1)+" "+(this.radius-1)+" 0 0 0 "+(this.radius-1)+" "+(this.radius-1);
    d+=" h "+(this.parentWidth-(2*this.inset)-(2*(this.radius-1)));
    d+=" a "+(this.radius-1)+" "+(this.radius-1)+" 0 0 0 "+(this.radius-1)+" -"+(this.radius-1);
    d+=" v -"+(this.height-(this.radius-1));
    d+=" z";
    this.d=d;
  }

}
