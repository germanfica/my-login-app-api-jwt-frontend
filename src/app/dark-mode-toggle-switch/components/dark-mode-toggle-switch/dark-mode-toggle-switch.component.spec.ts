import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkModeToggleSwitchComponent } from './dark-mode-toggle-switch.component';

describe('DarkModeToggleSwitchComponent', () => {
  let component: DarkModeToggleSwitchComponent;
  let fixture: ComponentFixture<DarkModeToggleSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DarkModeToggleSwitchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DarkModeToggleSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
