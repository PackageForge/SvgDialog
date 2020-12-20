import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgDialogButtonComponent } from './svg-dialog-button.component';

describe('SvgDialogButtonComponent', () => {
  let component: SvgDialogButtonComponent;
  let fixture: ComponentFixture<SvgDialogButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgDialogButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgDialogButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
