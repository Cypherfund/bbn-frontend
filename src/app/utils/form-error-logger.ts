import {FormGroup} from "@angular/forms";

export function logFormErrors(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormGroup) {
      logFormErrors(control);
    } else {
      if (control && control.errors) {
        console.log(`Control: ${field}, Errors: `, control.errors);
      }
    }
  });
}
