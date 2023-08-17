import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Renderer2, RendererFactory2, ComponentRef } from '@angular/core';
import { AlertComponent } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private renderer: Renderer2;

  showAlertOnLoginSuccess = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private currentVerticalPosition = 20; // Initialize with the top position
  private alertHeight = 0; // Initialize with the height of the alerts

  showAlert(type: 'success' | 'error' | 'info' | 'warning', message: string): void {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(AlertComponent)
      .create(this.injector);

    componentRef.instance.type = type;
    componentRef.instance.message = message;

    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;

    // Set the initial top position and add the alert height
    domElem.style.top = `${this.currentVerticalPosition}px`;
    this.currentVerticalPosition += this.alertHeight + 80; // Add spacing

    this.alertHeight = domElem.clientHeight; // Update alert height for next alert positioning

    this.renderer.addClass(domElem, 'alert-container');
    document.body.appendChild(domElem);

    // Set the closeAlert function to handle detaching and destroying the component
    componentRef.instance.closeAlert = () => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    };
  }


}
