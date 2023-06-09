import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lead-section',
  templateUrl: './lead-section.component.html',
  styleUrls: ['./lead-section.component.scss']
})
export class LeadSectionComponent {

  @Output()
  handleSubmitClicked: EventEmitter<{ name: string, email: string }> = new EventEmitter();

  requireFieldsValidors = [
    Validators.required,
    Validators.minLength(2),
  ];

  showErrors = false;

  public formGroup = new FormGroup({
    name: new FormControl('', this.requireFieldsValidors),
    email: new FormControl('', this.requireFieldsValidors),
  });

  isValidField(name: string) {
    const form = this.formGroup.get(name);
    return form?.value && form?.valid;
  }

  handleSubmit() {
    this.showErrors = true;
    if (this.isValidField('name') && this.isValidField('email')) {
      this.handleSubmitClicked.emit({
        name: this.formGroup.get('name')?.value ?? '',
        email: this.formGroup.get('email')?.value ?? '',
      });
    }
  }

}
