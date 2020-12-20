import { Injectable, ViewContainerRef, ElementRef } from '@angular/core';
import { SvgDialogService } from 'projects/svg-dialog/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class PromoteDialogService {

  constructor(private svgDialogService:SvgDialogService) { }

  open(outlet: ViewContainerRef,data?:any,overlay?:ElementRef<SVGElement>) {
    console.log("promote!",outlet);
    return this.svgDialogService.open<string>(outlet,"gbe-games-chess-promote-dialog",data,overlay);
  }
}
