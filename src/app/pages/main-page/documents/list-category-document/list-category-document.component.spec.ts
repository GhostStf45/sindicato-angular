import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoryDocumentComponent } from './list-category-document.component';

describe('ListCategoryDocumentComponent', () => {
  let component: ListCategoryDocumentComponent;
  let fixture: ComponentFixture<ListCategoryDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCategoryDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategoryDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
