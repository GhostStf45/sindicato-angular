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
      console.log(f.controls[field]);
		   	return true;

		}else{

			return false;
		}

	}
  static formatDate(date : Date){

		return `${date.getFullYear()}-${('0' + date.getMonth()+1).slice(-2)}-${('0'+date.getDate()).slice(-2)}T00:00:00`;

	}
}
