import { ComponentFactory, Inject, Injectable, Injector, NgModuleFactory, NgModuleFactoryLoader, Type, ComponentFactoryResolver } from '@angular/core'
import { Observable } from 'rxjs';
import { from as ObservableFromPromise } from 'rxjs';
import { throwError as ObservableThrow } from 'rxjs';

import {
  SVG_DIALOG_COMPONENT,
  SVG_DIALOG_MANIFESTS,
  SVG_DIALOG_MODULE,
  SvgDialogManifest,
} from './svg-dialog-manifest'

@Injectable()
export class SvgDialogLoader {

  constructor(
    @Inject(SVG_DIALOG_MANIFESTS) private manifests: SvgDialogManifest[],
    private loader: NgModuleFactoryLoader,
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  /** Retrieve a ComponentFactory, based on the specified componentId (defined in the SvgDialogManifest array). */
  getComponentFactory<T>(componentId: string | Type<T>, injector?: Injector): Observable<ComponentFactory<T>> {
    let p;
    if (typeof(componentId)==="string") {
      const manifest = this.manifests
        .find(m => m.componentId === componentId);
      if (!manifest) {
        return ObservableThrow(`SvgDialogLoader: Unknown componentId "${componentId}"`);
      }

      const path = manifest.loadChildren

      p = this.load<T>(path, componentId, injector)
    } else
      p=Promise.resolve(this.componentFactoryResolver.resolveComponentFactory(componentId));
    return ObservableFromPromise(p)
  }
  getComponentSize(componentId: string): {width:number,height:number}|undefined {
    const manifest = this.manifests
      .find(m => m.componentId === componentId);
    if (!manifest) 
      return undefined;

    return manifest.size;
  }

  load<T>(path: string, componentId: string, injector?: Injector): Promise<ComponentFactory<T>> {
    return this.loader.load(path)
      .then((ngModuleFactory) => this.loadFactory<T>(ngModuleFactory, componentId, injector));
  }

  loadFactory<T>(ngModuleFactory: NgModuleFactory<any>, componentId: string, injector?: Injector): Promise<ComponentFactory<T>> {
    const moduleRef = ngModuleFactory.create(injector || this.injector);
    const dynamicComponentType = moduleRef.injector.get(SVG_DIALOG_COMPONENT, null);
    if (!dynamicComponentType) {
      const dynamicModule: SvgDialogManifest = moduleRef.injector.get(SVG_DIALOG_MODULE, null)
      if (!dynamicModule) {
        throw new Error(
          'SvgDialogLoader: Dynamic module for'
          + ` componentId "${componentId}" does not contain`
          + ' SVG_DIALOG_COMPONENT or SVG_DIALOG_MODULE as a provider.',
        )
      }
      if (dynamicModule.componentId !== componentId) {
        throw new Error(
          'SvgDialogLoader: Dynamic module for'
          + ` componentId ${componentId} does not match manifest.`,
        )
      }

      const path = dynamicModule.loadChildren

      if (!path) {
        throw new Error(`${componentId} unknown!`)
      }

      return this.load<T>(path, componentId, injector)
    }

    return Promise.resolve(moduleRef.componentFactoryResolver.resolveComponentFactory<T>(dynamicComponentType))
  }
}
