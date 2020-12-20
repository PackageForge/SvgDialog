import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject, Subscription, race, zip, timer } from 'rxjs';
import { trigger, style, transition, animate } from '@angular/animations';
import { take } from 'rxjs/operators';

let uniqueId = 0;

@Component({
  selector: '[svg-dialog-button]',
  templateUrl: './svg-dialog-button.component.html',
  styleUrls: ['./svg-dialog-button.component.css'],
  animations: [
    trigger('clickAnim', [
      transition(':enter', [
        style({
          r: 0
        }),
        animate('0.6s ease')
      ]),
      transition(':leave', [
        animate('0.5s 0.2s ease', style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class SvgDialogButtonComponent implements OnInit, OnDestroy {
  width: number = 50;
  type: string = "";
  @Input("svg-dialog-button") set _type(value: string | undefined) {
    this.type = (value === "raised" || value === "stroked" || value === "flat") ? value : "";
  }
  color: string = "";
  @Input("color") set _color(value: string | undefined) {
    this.color = (value === "primary" || value === "accent" || value === "warn") ? value : "";
  }
  disabled: boolean = false;
  @Input("disabled") set _disabled(value: boolean | string | undefined) {
    this.disabled = typeof (value) === "string" ? value.toLowerCase() !== "false" : value === undefined || value;
  }
  @Input("width") set _width(value: number | string | undefined) {
    if (typeof (value) !== "undefined")
      if (typeof (value) === "string")
        this.width = parseFloat(value);
      else
        this.width = value;
  }
  height: number = 30;
  @Input("height") set _height(value: number | string | undefined) {
    if (typeof (value) !== "undefined")
      if (typeof (value) === "string")
        this.height = parseFloat(value);
      else
        this.height = value;
  }
  get cornerRadius() {
    return Math.min(this.width, this.height) / 10;
  };
  mousedown = new Subject<MouseEvent>();
  mouseleave = new Subject<MouseEvent>();
  mouseup = new Subject<MouseEvent>();
  clickSub: Subscription | undefined;
  clicks: any[] = [];
  uniqueId = "svg-dialog-button-" + (uniqueId++);

  constructor() {
  }

  ngOnInit() {
    this.clickSub = this.mousedown.subscribe(event => {
      if (this.disabled) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        return;
      }
      const pt = getSvgPointFromEvent(event);
      const rx = this.width / 2 + Math.abs(pt.x);
      const ry = this.height / 2 + Math.abs(pt.y);
      const click = {
        x: pt.x,
        y: pt.y,
        r: Math.sqrt(rx * rx + ry * ry)
      };
      this.clicks.push(click);
      zip(timer(600), race(this.mouseup, this.mouseleave)).pipe(take(1)).subscribe(() => {
        const index = this.clicks.indexOf(click);
        if (index >= 0)
          this.clicks.splice(index, 1);
      });
    });
  }
  ngOnDestroy() {
    this.clickSub && (this.clickSub = <any>this.clickSub.unsubscribe());
  }
}
function getSvgPointFromEvent(event: MouseEvent) {
  let svg = <SVGElement>event.target;
  while (svg.tagName !== "svg")
    svg = <SVGElement>svg.parentNode;
  const pt = (<SVGSVGElement>svg).createSVGPoint();
  pt.x = event.clientX;
  pt.y = event.clientY;
  return pt.matrixTransform((<SVGGraphicsElement>event.target).getScreenCTM()!.inverse());
}
/*
let themeMap:any;
function doIt(){
  if (!themeMap){
    themeMap={};
    let div=document.createElement("div"),rip=document.createElement("div"),style;
    div.appendChild(rip);
    document.body.appendChild(div);
    div.className="mat-flat-button";
    style=window.getComputedStyle(div);
    themeMap.defaultColor=style.color;
    themeMap.defaultContrast=style.backgroundColor;
    style=window.getComputedStyle(rip);
    themeMap.defaultRipple=style.backgroundColor;
    div.className="mat-flat-button mat-primary";
    style=window.getComputedStyle(div);
    themeMap.primaryColor=style.backgroundColor;
    themeMap.primaryContrast=style.color;
    style=window.getComputedStyle(rip);
    themeMap.primaryRipple=style.backgroundColor;
    div.className="mat-flat-button mat-accent";
    style=window.getComputedStyle(div);
    themeMap.accentColor=style.backgroundColor;
    themeMap.accentContrast=style.color;
    style=window.getComputedStyle(rip);
    themeMap.accentRipple=style.backgroundColor;
    div.className="mat-flat-button mat-warn";
    style=window.getComputedStyle(div);
    themeMap.warnColor=style.backgroundColor;
    themeMap.warnContrast=style.color;
    style=window.getComputedStyle(rip);
    themeMap.warnRipple=style.backgroundColor;
    div.setAttribute("disabled","true");
    themeMap.disabledColor=style.color;
    themeMap.disabledBackground=style.backgroundColor;
    div.remove();
    div=undefined!;
  }
  const sheets=window.document.styleSheets;
  for (let i=0;i<sheets.length;i++) {
    const sheet=<any>sheets[i];
    sheet.ownerNode.innerText=sheet.ownerNode.innerText.replace(/\$warn/g,"red");
  }
}
*/
