import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from '../../services/Currencies.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public currencies:any = [];
  public rates:any = [];
  public errorMessage:string | null = null;
  public USD:any = 0;
  public EUR:any = 0;

  constructor(private currenciesService : CurrenciesService) {}

  public format(number:any) {
    return number.toFixed(2);
  }

  ngOnInit(): void {
    this.currenciesService.getCurrencies().subscribe((data) => {
      this.currencies = Object.keys(data.data);
      this.rates = data.data;
      this.USD = this.format(1 * this.rates['UAH'].value / this.rates['USD'].value);
      this.EUR = this.format(1 * this.rates['UAH'].value / this.rates['EUR'].value);
    }, (error) => {
      this.errorMessage = error;
    });
  }
}
