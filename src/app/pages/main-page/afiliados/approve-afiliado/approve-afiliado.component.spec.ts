import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAfiliadoComponent } from './approve-afiliado.component';

describe('ApproveAfiliadoComponent', () => {
  let component: ApproveAfiliadoComponent;
  let fixture: ComponentFixture<ApproveAfiliadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveAfiliadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveAfiliadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
