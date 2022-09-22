import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import packageJson from '../../package.json';

export interface AmortizationElement {
  position: number;
  payDate: Date;
  balance: number;
  pay: number;
  interest?: number;
  principal?: number;
  endBalance?: number
}

export interface GroupedRow {
  year: number;
  isGrouped: boolean;
}

const ELEMENT_DATA: any[] = [
  {position: 1, date: 'Hydrogen', balance: 1.0079, payDate: 'H', interest: 1.25, principal: 144000, endBalance: 139000 },
  {position: 2, date: 'Helium', balance: 4.0026, pay: 'He'},
  {position: 3, date: 'Lithium', balance: 6.941, pay: 'Li'},
  {position: 4, date: 'Beryllium', balance: 9.0122, pay: 'Be'},
  {position: 5, date: 'Boron', balance: 10.811, pay: 'B'},
  {position: 6, date: 'Carbon', balance: 12.0107, pay: 'C'},
  {position: 7, date: 'Nitrogen', balance: 14.0067, pay: 'N'},
  {position: 8, date: 'Oxygen', balance: 15.9994, pay: 'O'},
  {position: 9, date: 'Fluorine', balance: 18.9984, pay: 'F'},
  {position: 10, date: 'Neon', balance: 20.1797, pay: 'Ne'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'loan-calculator';
  form: FormGroup = new FormGroup({});
  public version: string = packageJson.version;

  displayedColumns: string[] = ['payDate', 'pay', 'interest', 'principal', 'endBalance'];
  dataSource: (AmortizationElement| GroupedRow)[] = [];
  monthlyPay: number = 0;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      amount: [144000, [Validators.required]],
      tax: [1.25, [Validators.required]],
      years: [30, [Validators.required]],
      initialDate: [new Date().toISOString()]
    });
    this.monthlyPay = this.getMonthlyPayment();
  }

  getAmortizationTable() {

    this.monthlyPay = this.getMonthlyPayment();

    const npay: number = this.form.controls['years'].value * 12;
    const capital: number = this.form.controls['amount'].value;
    const tax: number = this.form.controls['tax'].value;
    const table: (AmortizationElement| GroupedRow)[] = []
    let balance: number = capital;
    const payDate: Date = new Date(this.form.controls['initialDate'].value);
    table.push({year: payDate.getFullYear(), isGrouped: true});

    for (let i = 0; i < npay; i++) {
      const payDate: Date = new Date(this.form.controls['initialDate'].value);

      const interest = balance * (tax / 100 / 12);
      const principal = this.monthlyPay - interest;
      const endBalance = balance - principal;
      console.log()
      payDate.setMonth(payDate.getMonth() + i);
      if ((payDate.getMonth() + 1) % 12 === 1) table.push({year: payDate.getFullYear(), isGrouped: true});
      table.push({position: i, payDate, balance, pay: this.monthlyPay, interest, principal, endBalance });
      balance = endBalance;
    }

    this.dataSource = table;
    //console.table(table);
  }

  getMonthlyPayment() {
    const capital: number = this.form.controls['amount'].value;
    const tax: number = this.form.controls['tax'].value / 100 / 12;
    const npay: number = this.form.controls['years'].value * 12;


    return capital / ((1 - (1 + tax) ** -npay ) / tax);
  }

  getEndDate(): Date {
    const initialDate: Date = new Date(this.form.controls['initialDate'].value);
    const years = this.form.controls['years'].value
    initialDate.setFullYear(initialDate.getFullYear() + years);
    return initialDate;
  }

  isGroup(index: number, item: GroupedRow): boolean {
    return item.isGrouped;
  }
}
