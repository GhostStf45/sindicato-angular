import { FormGroup } from '@angular/forms';

export class functions {

  static screenSize (minwidth: number, maxwidth: number): boolean {
    if(window.matchMedia(`(min-width:${minwidth}px) and (max-width:${maxwidth}px) `).matches){
        return true;
    }else{
      return false;
    }
  }
  /*=============================================
	Función para validar campos del formulario
	=============================================*/

	static invalidField(field:string, f:FormGroup, formSubmitted:boolean):boolean{

		if(formSubmitted && f.controls[field].invalid){

		   	return true;

		}else{

			return false;
		}

	}
}
