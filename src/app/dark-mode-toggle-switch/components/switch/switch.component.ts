import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss'
})
export class SwitchComponent {
  @Output() toggle = new EventEmitter<boolean>();
  @Input() isChecked = false;

  toggleSwitch(event: Event) {
    this.isChecked = (event.target as HTMLInputElement).checked;
    this.toggle.emit(this.isChecked);
  }
}
