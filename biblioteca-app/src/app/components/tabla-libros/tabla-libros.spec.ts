import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TablaLibros } from './tabla-libros';

describe('TablaLibros', () => {
  let component: TablaLibros;
  let fixture: ComponentFixture<TablaLibros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaLibros],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaLibros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
