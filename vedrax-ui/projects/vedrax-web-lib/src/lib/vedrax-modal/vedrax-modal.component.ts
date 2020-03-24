import { Component, OnInit, Inject, ComponentFactoryResolver, OnDestroy, ViewChild, ViewContainerRef, ComponentFactory, ComponentRef, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

/**
 * Class that defines a modal component where we can insert other component.
 */
@Component({
  selector: 'vedrax-modal',
  templateUrl: './vedrax-modal.component.html'
})
export class VedraxModalComponent implements OnInit, OnDestroy {

  title: string;
  /**
   * Take reference of the container
   */
  @ViewChild("container", { read: ViewContainerRef, static: true }) container: any;
  componentRef: ComponentRef<any>;

  /**
   * List of subscriptions
   */
  private subscription: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    public dialogRef: MatDialogRef<VedraxModalComponent>,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.createComponent();
    this.title = this.data['title'];
  }

  ngOnDestroy(): void {
    this.componentRef.destroy();
    this.subscription.unsubscribe();
  }

  /**
   * Method for generating a given component, 
   * pass inputs and listen to outputs
   */
  createComponent() {
    this.container.clear();
    const component = this.generateComponent();
    this.passInputsToComponent(component);
    this.passOutputsToComponent(component);
  }

  /**
   * Method for generating the given component
   */
  private generateComponent() {
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(this.data.component);
    this.componentRef = this.container.createComponent(factory);
    return this.componentRef.instance;
  }

  /**
   * Helper method for passing inputs to the given component
   * 
   * @param component 
   */
  private passInputsToComponent(component: any): void {
    const inputs = this.data['inputs'] || [];
    Object.keys(inputs).forEach(inputName => {
      component[inputName] = this.data.inputs[inputName];
    });
  }

  /**
   * Helper method for listening to outputs of the given component
   * 
   * @param component 
   */
  private passOutputsToComponent(component: any): void {
    Object.keys(component)
      .filter(att => component[att] instanceof EventEmitter)
      .forEach(output => {
        this.subscription.add(component[output].subscribe(data => {
          this.dialogRef.close({ event: output, data: data });
        }));
      });
  }

  cancel() {
    this.dialogRef.close();
  }

}
