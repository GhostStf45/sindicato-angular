import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationmainComponent } from './informationmain.component';

describe('InformationmainComponent', () => {
  let component: InformationmainComponent;
  let fixture: ComponentFixture<InformationmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationmainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
