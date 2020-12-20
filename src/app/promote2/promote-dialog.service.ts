import { Injectable, ViewContainerRef, ElementRef } from '@angular/core';
import { SvgDialogService } from 'projects/svg-dialog/src/public-api';
import { PromoteDialogComponent } from './promote-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class Promote2DialogService {

  constructor(private svgDialogService: SvgDialogService) { }

  open(outlet: ViewContainerRef, mouse: ElementRef<SVGElement>, data?: any) {
    return this.svgDialogService.follow<string>(outlet, mouse, PromoteDialogComponent, data);
  }
}
