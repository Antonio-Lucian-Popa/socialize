import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Renderer2, RendererFactory2 } from '@angular/core';
import { AlertComponent } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private renderer: Renderer2;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector,
              rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  showAlert(type: 'success' | 'error' | 'info' | 'warning', message: string): void {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(AlertComponent)
      .create(this.injector);

    componentRef.instance.type = type;
    componentRef.instance.message = message;

    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;

    this.renderer.addClass(domElem, 'alert-container');
    document.body.appendChild(domElem);

    componentRef.instance.closeAlert = () => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    };
  }
}
