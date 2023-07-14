import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], texto: string, columna: string): any[] {
    // console.log('entro al pipe', text);
    if (texto === '') {
      return arreglo;
    }
    texto = texto.toLowerCase();

    return arreglo.filter(i => {
      return i[columna].toLowerCase().includes(texto)
    })
  }
}