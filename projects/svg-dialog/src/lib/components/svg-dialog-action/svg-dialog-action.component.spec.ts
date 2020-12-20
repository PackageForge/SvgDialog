import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgDialogActionComponent } from './svg-dialog-action.component';

describe('SvgDialogActionComponent', () => {
  let component: SvgDialogActionComponent;
  let fixture: ComponentFixture<SvgDialogActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgDialogActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgDialogActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
