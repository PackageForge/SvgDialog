import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  ModuleWithProviders,
  NgModule,
  NgModuleFactoryLoader,
  SystemJsNgModuleLoader,
  Type,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ROUTES } from '@angular/router';

import { SvgDialogLoader } from './svg-dialog-loader.service';
import {
  SVG_DIALOG_COMPONENT,
  SVG_DIALOG_MANIFESTS,
  SVG_DIALOG_MODULE,
  SvgDialogManifest,
} from './svg-dialog-manifest'

import { SvgDialogComponent } from './components/svg-dialog/svg-dialog.component';
import { SvgDialogTitleComponent } from './components/svg-dialog-title/svg-dialog-title.component';
import { SvgDialogActionComponent } from './components/svg-dialog-action/svg-dialog-action.component'
import { SvgDialogButtonComponent } from './components/svg-dialog-button/svg-dialog-button.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SvgDialogComponent,
    SvgDialogTitleComponent,
    SvgDialogActionComponent,
    SvgDialogButtonComponent
  ],
  exports:[
    SvgDialogTitleComponent,
    SvgDialogActionComponent,
    SvgDialogButtonComponent
  ],
  entryComponents: [
    SvgDialogComponent
  ],
  providers:[
    SvgDialogLoader,
    { provide: SVG_DIALOG_MANIFESTS, useValue: [] },
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader }
  ]
})
export class SvgDialogModule {
  private static manifests: SvgDialogManifest[]=[];
  static forRoot(manifests: SvgDialogManifest[]): ModuleWithProviders<SvgDialogModule> {
    this.manifests.splice(-1,0,...manifests);
    return {
      ngModule: SvgDialogModule,
      providers: [
        SvgDialogLoader,
        { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader },
        // provider for Angular CLI to analyze
        { provide: ROUTES, useValue: this.manifests, multi: true },
        // provider for SvgDialogLoader to analyze
        { provide: SVG_DIALOG_MANIFESTS, useValue: this.manifests },
      ],
    };
  }
  static forModule(manifest: SvgDialogManifest): ModuleWithProviders<SvgDialogModule> {
    return {
      ngModule: SvgDialogModule,
      providers: [
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: manifest, multi: true },
        // provider for @angular/router to parse
        { provide: ROUTES, useValue: manifest, multi: true },
        // provider for SvgDialogLoader to analyze
        { provide: SVG_DIALOG_MODULE, useValue: manifest }],
    }
  }
  static forChild(component: Type<any>): ModuleWithProviders<SvgDialogModule> {
    return {
      ngModule: SvgDialogModule,
      providers: [
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: component, multi: true },
        // provider for @angular/router to parse
        { provide: ROUTES, useValue: [], multi: true },
        // provider for SvgDialogLoader to analyze
        { provide: SVG_DIALOG_COMPONENT, useValue: component },
      ],
    };
  }
}
