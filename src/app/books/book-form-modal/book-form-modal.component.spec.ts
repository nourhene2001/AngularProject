import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormModalComponent } from './book-form-modal.component';

describe('BookFormModalComponent', () => {
  let component: BookFormModalComponent;
  let fixture: ComponentFixture<BookFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookFormModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
