import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'voco-input-box',
  templateUrl: 'input-box.component.html',
  styleUrls: ['input-box.component.css']
})
export class InputBoxComponent  {

  @Input() value: string;
  @Output() changed = new EventEmitter<string>();

  onChanged(val : string) {

    this.changed.emit(val);
  }

}
