import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkModeToggleSwitchComponent } from './components/dark-mode-toggle-switch/dark-mode-toggle-switch.component';
import { SwitchComponent } from './components/switch/switch.component';



@NgModule({
  declarations: [
    SwitchComponent,
    DarkModeToggleSwitchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DarkModeToggleSwitchComponent
  ]
})
export class DarkModeToggleSwitchModule { }
