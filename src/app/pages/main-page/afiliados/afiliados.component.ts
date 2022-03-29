import { Component, OnInit } from '@angular/core';
import { Iafiliados } from '../../../interfaces/Iafiliados';
import { AfiliadosService } from '../../../services/afiliados.service';

import { MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styleUrls: ['./afiliados.component.css']
})
export class AfiliadosComponent implements OnInit {


   /* Varaible para nombrar las columnas de la tabla de Angular Material */

   displayedColumns: string[] =['position', 'displayName', 'dni', 'area_laboral','email', 'estado', 'fecha_inscripcion', 'acciones']

  /* Varaible que instanciará la data que aparecerá en la tabla */

  dataSource!: MatTableDataSource<Iafiliados>;

  /* Arreglo de afiliados */
  afiliados: Iafiliados[] = [];

  constructor( private afiliadosService: AfiliadosService) { }

  ngOnInit(): void {

    this.getData();

  }

  getData(): void {
    this.afiliadosService.getData()
        .subscribe( (resp:any) => {
          let position = 1;
         this.afiliados = Object.keys(resp).map( a => ({
            id:a,
            position: position++,
            apellidos: resp[a].apellidos,
            nombres: resp[a].nombres,
            displayName: resp[a].displayName,
            area_laboral: resp[a].area_laboral,
            dni: resp[a].dni,
            email: resp[a].email,
            estado: resp[a].estado,
            fecha_inscripcion: resp[a].fecha_incripcion,
            telefono: resp[a].telefono,
            tipo: resp[a].tipo,

          } as Iafiliados));

          /* Vincular la información de la interfaz */
          this.dataSource = new MatTableDataSource(this.afiliados);
          console.log(this.dataSource);
        });
  }

}
