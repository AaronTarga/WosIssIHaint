import { PipeTransform, Pipe } from '@angular/core';
//Pipe to parse through object in ngfor;
@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, arg1:any) : any {
    let keys = [];
    for (let key in value) {
      if (key == arg1) {
        var el = value[key];
        for (let res in el)  {
          keys.push(el[res]);
        }
      }

    }
    return keys;
  }
}
