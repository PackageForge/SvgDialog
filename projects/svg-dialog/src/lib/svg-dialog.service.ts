import { Injectable, ViewContainerRef, ComponentFactoryResolver, Type, ElementRef, ComponentRef } from '@angular/core';
import { SvgDialogComponent } from './components/svg-dialog/svg-dialog.component';
import { SvgDialogRef } from './svg-dialog-ref';
import { Observable, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SvgDialogService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }
  open<T>(outlet: ViewContainerRef, dialogId: string | Type<any>, data?: any, overlay?: ElementRef<SVGElement>): SvgDialogRef<T> {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(SvgDialogComponent);
    if (overlay)
      this.moveToTopOfStack(overlay.nativeElement);
    this.moveToTopOfStack(outlet.element.nativeElement);
    const componentRef = outlet.createComponent(componentFactory, 0, outlet.parentInjector);
    const ref = new SvgDialogRef<T>(<any>componentRef);
    const dc: SvgDialogComponent<T> = <any>componentRef.instance;
    dc.dialogRef = ref;
    dc.data = data;
    dc.dialogId = dialogId;
    if (overlay) {
      overlay.nativeElement.style.display = "block";
      ref.afterClosed().subscribe(() => {
        overlay.nativeElement.style.display = "none";
      });
    }
    return ref;
  }
  follow<T>(outlet: ViewContainerRef, mouse: ElementRef<SVGElement>,dialogId: string | Type<any>, data?: any): SvgDialogRef<T> {
    const ref: SvgDialogRef<T>=this.open(outlet,dialogId,data);
    const compRef:ComponentRef<SvgDialogComponent<T>>=(<any>ref).compRef;
    const e=<ElementRef<SVGSVGElement>>(<any>compRef).instance.e;
    e.nativeElement.style.pointerEvents="none";
    e.nativeElement.style.display="none";
    e.nativeElement.style.position="absolute";
    const mouseLeave = <Observable<MouseEvent>>fromEvent(mouse.nativeElement, "mouseleave");
    const mouseMove = <Observable<MouseEvent>>fromEvent(mouse.nativeElement, "mousemove");
    mouseMove
      .subscribe(mm => {
        const mr=mouse.nativeElement.getBoundingClientRect();
        const xScale=(mm.clientX-mr.left)/mr.width;
        e.nativeElement.style.display="block";
        const r=e.nativeElement.getBoundingClientRect();
        const newX=mm.clientX-xScale*(r.width-30)+window.scrollX;
        const newY=mm.clientY+30+window.scrollY;
        e.nativeElement.style.left=newX+"px";
        e.nativeElement.style.top=newY+"px";
        const aX=mm.clientX-mr.left-mr.width/2-xScale*(r.width);
        const aY=mm.clientY-mr.top-mr.height/2+30;
        e.nativeElement.setAttribute("x",aX.toString());
        e.nativeElement.setAttribute("y",aY.toString());
      });
    mouseLeave
      .subscribe(ml => {
        e.nativeElement.style.display="none";
      });

    console.log(compRef);
    return ref;
  }
  moveToTopOfStack(node: SVGElement): void {
    const ns = node.namespaceURI;
    while (node.parentNode && node.parentNode.namespaceURI === ns) {
      if (node.parentNode.lastChild !== node)
        node.parentNode.appendChild(node);
      node = <any>node.parentNode;
    }
  }

}
