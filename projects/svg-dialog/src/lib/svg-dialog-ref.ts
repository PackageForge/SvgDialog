import { Subject, Observable } from "rxjs";
import { SvgDialogComponent } from "./components/svg-dialog/svg-dialog.component";
import { ComponentRef, InjectionToken } from "@angular/core";

export const SVG_DIALOG_DATA = new InjectionToken<any>('SVG_DIALOG_DATA');

export class SvgDialogRef<T> {
  private closedValue = new Subject<T>();
  constructor(private compRef: ComponentRef<SvgDialogComponent<T>>) {
  }
  public close(value?: T) {
    this.compRef.destroy();
    this.closedValue.next(value);
    this.closedValue.complete();
  }
  public afterClosed(): Observable<T> {
    return this.closedValue.asObservable();
  }
}