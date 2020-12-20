import { InjectionToken } from '@angular/core';

export const SVG_DIALOG_COMPONENT = new InjectionToken<any>('SVG_DIALOG_COMPONENT');

export const SVG_DIALOG_MODULE = new InjectionToken<any>('SVG_DIALOG_MODULE')

export const SVG_DIALOG_MANIFESTS = new InjectionToken<any>('SVG_DIALOG_MANIFESTS');

export interface SvgDialogManifest {

  /** Unique identifier, used in the application to retrieve a ComponentFactory. */
  componentId: string;

  /** Unique identifier, used internally by Angular. */
  path: string;

  /** Path to component module. */
  loadChildren: string;

  size:{
    width:number;
    height:number;
  };
}
