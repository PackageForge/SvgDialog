import { Injectable, ViewContainerRef, ElementRef } from '@angular/core';
import { SvgDialogService } from 'projects/svg-dialog/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class CircDialogService {

  constructor(private svgDialogService:SvgDialogService) { }

  open(outlet: ViewContainerRef,data?:any,overlay?:ElementRef<SVGElement>) {
    return this.svgDialogService.open<string>(outlet,"circ-dialog",data,overlay);
  }
}
