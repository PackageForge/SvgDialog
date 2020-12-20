import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: '[svg-dialog-title]',
  templateUrl: './svg-dialog-title.component.html',
  styleUrls: ['./svg-dialog-title.component.css']
})
export class SvgDialogTitleComponent implements AfterViewInit {

  @Input() height:number=30;
  parentWidth:number;
  d!:string;
  inset=1;
  radius=10;
  constructor(private e:ElementRef<SVGElement>) { 
    this.parentWidth=parseFloat(this.e.nativeElement.parentElement!.getAttribute("width")||"0");
  }

  ngAfterViewInit() {
    this.parentWidth=parseFloat(this.e.nativeElement.parentElement!.getAttribute("width")||"0");
    let d="";
    d+=" M "+this.inset+" "+(this.height+this.inset);
    d+=" h "+(this.parentWidth-(2*this.inset));
    d+=" v -"+(this.height-(this.radius-1));
    d+=" a "+(this.radius-1)+" "+(this.radius-1)+" 0 0 0 -"+(this.radius-1)+" -"+(this.radius-1);
    d+=" h -"+(this.parentWidth-(2*this.inset)-(2*(this.radius-1)));
    d+=" a "+(this.radius-1)+" "+(this.radius-1)+" 0 0 0 -"+(this.radius-1)+" "+(this.radius-1);
    d+=" z";
    this.d=d;
  }

}
