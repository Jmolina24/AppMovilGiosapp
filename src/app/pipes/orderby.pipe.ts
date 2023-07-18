import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'orderby'
})
export class OrderbyPipe implements PipeTransform {

      transform(value: any[], order: any = '', column: string = ''): any[] {
      if (!value || order === '' || !order) { return value; } // no array
      if (value.length <= 1) { return value; } // array with only one item
      if (!column || column === '') { 
        if(order==='asc'){return value.sort()}
        else{return value.sort().reverse();}
      } // sort 1d array
      return orderBy(value, [column], [order]);
    }

//   transform(arreglo: any[], order = '', column: string = ''): any[] {
//     if (!arreglo || order === '' || !order) { return arreglo; } // no array
//     if (arreglo.length <= 1) { return arreglo; } // array with only one item
//     if (!column || column === '') {
//       if (order === 'asc') { return arreglo.sort() }
//       else { return arreglo.sort().reverse(); }
//     } // sort 1d array
//     return orderBy(arreglo, [column], [order]);
//   }
// }



}
