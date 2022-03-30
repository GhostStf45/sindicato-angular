import { FormGroup } from '@angular/forms';

export class functions {

  static screenSize (minwidth: number, maxwidth: number): boolean {
    if(window.matchMedia(`(min-width:${minwidth}px) and (max-width:${maxwidth}px) `).matches){
        return true;
    }else{
      return false;
    }
  }
}
