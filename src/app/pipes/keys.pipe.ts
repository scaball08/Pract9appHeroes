import { Pipe, PipeTransform } from '@angular/core';

// se agregar la popiedad 'pure':false al decorador @pipe
// para que actualize los valores segun el objeto de la pipe
// cuando haya sufrido cambios
@Pipe({
  name: 'keys',
  pure: false
})
export class KeysPipe implements PipeTransform {

  transform(value: any): any {

    let keys = [];

    // itera  en cada uno de los objetos que tiene el objeto value
    // e inserta el nombre de la propiedad que tiene key
    // al ARREGLO keys en cada iteracion que en este caso
    //es el ID de cada de cada heroe
    for (let key in value) {
      keys.push(key);
    }

    return keys;
  }

}
