import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styles: ``
})
export class ModalComponent {
  @Input() isOpen = false;
  
  @Output() closed = new EventEmitter<void>();

  onClose() {
    this.closed.emit();
  }
}
