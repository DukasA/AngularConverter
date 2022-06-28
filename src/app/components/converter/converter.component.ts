import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from '../../services/Currencies.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  public currencies:any = [];
  public rates:any = [];
  public amount1:any = 1;
  public amount2:any = 1;
  public currency1:any = 'USD';
  public currency2:any = 'EUR';
  public errorMessage:string | null = null;

  constructor(private currenciesService : CurrenciesService) {}

  ngOnInit(): void {
    this.currenciesService.getCurrencies().subscribe((data) => {
      this.currencies = Object.keys(data.data);
      this.rates = data.data;
      this.amount2 = this.format(this.amount1 * this.rates[this.currency2].value / this.rates[this.currency1].value)
    }, (error) => {
      this.errorMessage = error;
    });
  }

  public format(number:number) {
    return number.toFixed(4);
  }

  public setAmount1(value:any) {
    this.amount1 = value;
  }

  public setAmount2(value:any) {
    this.amount2 = value;
  }

  public setCurrency1(e:any) {
    this.currency1 = e;
  }

  public setCurrency2(e:any) {
    this.currency2 = e;
  }

  public handleAmount1Change(event:any) {
      this.setAmount2(this.format(event.target.value * this.rates[this.currency2].value / this.rates[this.currency1].value));
      this.setAmount1(event.target.value);
  }

  public handleAmount2Change(event:any) {
      this.setAmount1(this.format(event.target.value * this.rates[this.currency1].value / this.rates[this.currency2].value));
      this.setAmount2(event.target.value);
  }

  public handleCurrency1Change(event:any) {
    this.setCurrency1(event.target.value);
    this.setAmount2(this.format(this.amount1 * this.rates[this.currency2].value / this.rates[this.currency1].value));
  }

  public handleCurrency2Change(event:any) {
    this.setCurrency2(event.target.value);
    this.setAmount2(this.format(this.amount1 * this.rates[this.currency2].value / this.rates[this.currency1].value));
  }

}
