import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgDialogTitleComponent } from './svg-dialog-title.component';

describe('SvgDialogTitleComponent', () => {
  let component: SvgDialogTitleComponent;
  let fixture: ComponentFixture<SvgDialogTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgDialogTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgDialogTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
