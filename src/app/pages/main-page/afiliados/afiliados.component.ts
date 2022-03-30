import { Component, OnInit } from '@angular/core';
import { Iafiliados } from '../../../interfaces/Iafiliados';
import { AfiliadosService } from '../../../services/afiliados.service';
import { MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { functions } from '../../../helpers/functions';

@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styleUrls: ['./afiliados.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class AfiliadosComponent implements OnInit {


   /* Varaible para nombrar las columnas de la tabla de Angular Material */

   displayedColumns: string[] =['position', 'displayName', 'area_laboral', 'estado', 'tipo', 'acciones']

  /* Varaible que instanciará la data que aparecerá en la tabla */

  dataSource!: MatTableDataSource<Iafiliados>;

  /* Arreglo de afiliados */
  afiliados: Iafiliados[] = [];

  expandedElement!: Iafiliados | null;

  screenSizeSM = false;

  constructor( private afiliadosService: AfiliadosService) { }

  ngOnInit(): void {

    this.getData();

    if(functions.screenSize(0,767)){
      this.screenSizeSM = true;
    }else{
      this.screenSizeSM = false;
      this.displayedColumns.splice(3,0,'dni');
      this.displayedColumns.splice(5,0,'email');
      this.displayedColumns.splice(7,0,'telefono');
      this.displayedColumns.splice(9,0,'fecha_inscripcion');
    }
    console.log('screenSize', this.screenSizeSM);

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
