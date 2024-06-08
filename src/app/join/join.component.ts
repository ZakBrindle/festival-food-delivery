import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent {
  fullName: string;
  businessName: string;
  email: string;
  contactNumber: string;

  constructor() {
    this.fullName = '';
    this.businessName = '';
    this.email = '';
    this.contactNumber = '';
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const vendorData = {
        fullName: this.fullName,
        businessName: this.businessName,
        email: this.email,
        contactNumber: this.contactNumber
      };

      console.log('Vendor Registration', vendorData);

      // Reset the form
      form.resetForm();
    } else {
      console.log('Form is invalid');
    }
  }
}
