import { Component, AfterViewInit, ViewChild, ViewContainerRef, OnDestroy, ComponentRef, Injector, StaticProvider, Type, ElementRef } from '@angular/core';
import { SvgDialogLoader } from '../../svg-dialog-loader.service';
import { SvgDialogRef, SVG_DIALOG_DATA } from '../../svg-dialog-ref';

@Component({
  selector: "svg[svg-dialog][xmlns=http://www.w3.org/2000/svg]",
  templateUrl: './svg-dialog.component.html',
  styleUrls: ['./svg-dialog.component.css']
})
export class SvgDialogComponent<T> implements AfterViewInit, OnDestroy {
  @ViewChild('outlet', { read: ViewContainerRef }) outlet!: ViewContainerRef;
  data: any;
  dialogId!: string | Type<any>;
  compRef: ComponentRef<any> | undefined;
  childWidth!: number;
  childHeight!: number;
  dialogRef!: SvgDialogRef<T>;

  constructor(private e: ElementRef<SVGSVGElement>, private dynamicComponentLoader: SvgDialogLoader, private injector: Injector) {
  }

  ngAfterViewInit() {
    this.dynamicComponentLoader
      .getComponentFactory<any>(this.dialogId)
      .subscribe(componentFactory => {
        this.compRef = this.outlet.createComponent(componentFactory, undefined, this.makeCustomInjector());
        if (typeof (this.compRef.instance.dialogSize) === "object" &&
          typeof (this.compRef.instance.dialogSize.width) === "number" &&
          typeof (this.compRef.instance.dialogSize.height) === "number") {
          this.childWidth = this.compRef.instance.dialogSize.width;
          this.childHeight = this.compRef.instance.dialogSize.height;
        } else {
          const size = typeof (this.dialogId) === "string" ? this.dynamicComponentLoader.getComponentSize(this.dialogId) : undefined;
          this.childWidth = size ? size.width : 100;
          this.childHeight = size ? size.height : 100;
        }
        this.e.nativeElement.setAttribute("x",(-this.childWidth/2).toString());
        this.e.nativeElement.setAttribute("y",(-this.childHeight/2).toString());
        this.e.nativeElement.setAttribute("width",(this.childWidth+30).toString());
        this.e.nativeElement.setAttribute("height",(this.childHeight+30).toString());
        this.e.nativeElement.setAttribute("viewBox","0 0 "+(this.childWidth+30)+" "+(this.childHeight+30));
        this.compRef.changeDetectorRef.detectChanges();
      }, error => {
        console.warn(error);
      });
  }
  makeCustomInjector() {
    let a: StaticProvider;
    return Injector.create({
      providers: [
        { provide: SvgDialogRef, useValue: this.dialogRef },
        { provide: SVG_DIALOG_DATA, useValue: this.data }
      ],
      parent: this.injector
    });
  }
  ngOnDestroy(): void {
    if (this.compRef)
      this.compRef = <any>this.compRef.destroy();
  }
}
/*
function decompose_2d_matrix(mat: SVGMatrix) {
  var a = mat.a;
  var b = mat.b;
  var c = mat.c;
  var d = mat.d;
  var e = mat.e;
  var f = mat.f;

  var delta = a * d - b * c;

  let result = {
    translation: { x: e, y: f },
    rotation: 0,
    scale: { x: 0, y: 0 },
    skew: { x: 0, y: 0 },
  };

  // Apply the QR-like decomposition.
  if (a != 0 || b != 0) {
    var r = Math.sqrt(a * a + b * b);
    result.rotation = b > 0 ? Math.acos(a / r) : -Math.acos(a / r);
    result.scale.x = r;
    result.scale.y = delta / r;
    result.skew.x = Math.atan((a * c + b * d) / (r * r));
    result.skew.y = 0;
  } else if (c != 0 || d != 0) {
    var s = Math.sqrt(c * c + d * d);
    result.rotation =
      Math.PI / 2 - (d > 0 ? Math.acos(-c / s) : -Math.acos(c / s));
    result.scale.x = delta / s;
    result.scale.y = s;
    result.skew.x = 0;
    result.skew.y = Math.atan((a * c + b * d) / (s * s));
  } else {
    // a = b = c = d = 0
  }

  return result;
}
*/