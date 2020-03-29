import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, Output, EventEmitter, Input, ComponentRef } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { VedraxModalComponent } from './vedrax-modal.component';

@Component({
  selector: 'vedrax-component-test',
  template: '<p>test</p>'
})
class MyComponent {

  @Output() myEvent = new EventEmitter();

  @Input() content: string;

}

const data = {
  component: MyComponent,
  inputs: {
    content: 'test'
  }
};

describe('VedraxModalComponent', () => {
  let component: VedraxModalComponent;
  let fixture: ComponentFixture<VedraxModalComponent>;
  let myComponent: ComponentRef<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: { close: () => { } } }
      ],
      declarations: [MyComponent, VedraxModalComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [MyComponent, VedraxModalComponent]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    myComponent = fixture.componentInstance.componentRef;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(myComponent.instance['content']).toBe(data.inputs.content);
  });

  it('must emit value', () => {
    const spy = spyOn(component['dialogRef'], 'close');
    myComponent.instance.myEvent.emit('test');
    expect(spy).toHaveBeenCalledWith({event:'myEvent', data:'test'});
  });

  it('close', () => {
    const spy = spyOn(component['dialogRef'], 'close');
    component.cancel();
    expect(spy).toHaveBeenCalled();
  });
});
