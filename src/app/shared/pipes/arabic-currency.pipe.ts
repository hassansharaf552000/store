import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arabicCurrency'
})
export class ArabicCurrencyPipe implements PipeTransform {
  transform(value: number | string, currencySymbol: string = 'ج.م'): string {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      return '';
    }
    
    // Format number with thousand separators and 2 decimal places
    const formattedNumber = numValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return `${formattedNumber} ${currencySymbol}`;
  }
}
