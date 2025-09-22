import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spin',
  standalone: true,
  imports: [],
  templateUrl: './spin.component.html',
  styles: ``
})
export class SpinComponent {
  @Input() loading!: boolean;
}
