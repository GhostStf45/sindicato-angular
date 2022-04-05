import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAfiliadoComponent } from './edit-afiliado.component';

describe('EditAfiliadoComponent', () => {
  let component: EditAfiliadoComponent;
  let fixture: ComponentFixture<EditAfiliadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAfiliadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAfiliadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
