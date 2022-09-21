import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'loan-calculator';
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      amount: [144000, [Validators.required]],
      tax: [1.25, [Validators.required]],
      years: [30, [Validators.required]],
      initialDate: [new Date()]
    });
  }

  saveDetails(form: any) {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
  }

  getMonthlyPayment() {
    const capital: number = this.form.controls['amount'].value;
    const tax: number = this.form.controls['tax'].value / 100 / 12;
    const npay: number = this.form.controls['years'].value * 12;

    return capital / ((1 - (1 + tax) ** -npay ) / tax);
  }

  getEndDate(): Date {
    const initialDate: Date = this.form.controls['initialDate'].value;
    const years = this.form.controls['years'].value
    initialDate.setFullYear(initialDate.getFullYear() + years);
    return initialDate;
  }
}
