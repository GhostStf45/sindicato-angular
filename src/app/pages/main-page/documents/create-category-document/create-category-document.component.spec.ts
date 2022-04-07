import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryDocumentComponent } from './create-category-document.component';

describe('CreateCategoryDocumentComponent', () => {
  let component: CreateCategoryDocumentComponent;
  let fixture: ComponentFixture<CreateCategoryDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCategoryDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoryDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
