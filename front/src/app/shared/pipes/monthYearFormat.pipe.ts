import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthYearFormat'
})
export class MonthYearFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    const regex = /^(\d{4})-(\d{2})$/;
    const match = value.match(regex);

    if (!match) {
      return value;
    }

    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);

    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    return `${monthNames[month - 1]} ${year}`;
  }
}
