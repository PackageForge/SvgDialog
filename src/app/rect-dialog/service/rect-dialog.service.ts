import { Injectable, ViewContainerRef, ElementRef } from '@angular/core';
import { SvgDialogService } from 'projects/svg-dialog/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class RectDialogService {

  constructor(private svgDialogService:SvgDialogService) { }

  open(outlet: ViewContainerRef,data?:any,overlay?:ElementRef<SVGElement>) {
    return this.svgDialogService.open<string>(outlet,"rect-dialog",data,overlay);
  }
}
