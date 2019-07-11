import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import { Heroe } from 'src/app/interfaces/heroe.interface';
import { HeroesService } from 'src/app/services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe:Heroe = {
    nombre:"",
    bio:"",
    casa:"Marvel"
  };
  id:string;
  constructor( private _heroeService:HeroesService, private link:Router,private rutParam: ActivatedRoute) {
    this.rutParam.params
    .subscribe(params=>{

      console.log(params);
      this.id=params['id'];

      if(this.id!=='nuevo'){
         this._heroeService.getHeroe(this.id)
         .subscribe((heroe:Heroe)=>this.heroe=heroe);
      }

    });
  }

  ngOnInit() {
  }

    guardar(){
      if (this.id==='nuevo') {
        //insertando
        console.log(this.heroe);
        this._heroeService.nuevoHeroe(this.heroe)
        .subscribe( data=>{
          this.link.navigate(['/heroe',data['name']]);
        }, (errorService=>{
        console.log(errorService);
          }));
      } else {
        //Actualizando
        console.log(this.heroe);
        this._heroeService.actualizarHeroe(this.heroe,this.id)
        .subscribe( data=>{
          console.log(data);
        }, (errorService=>{
        console.log(errorService);
          }) );

      }



    }

    agregarNuevo(forma:NgForm){

      this.link.navigate(['/heroe','nuevo']);


      // para resetear la forma y colocar su estado en pristine y untouched
      // usar la propiedad .reset({propiedad:'Valor_por_defecto'})
      forma.reset({
        casa:'Marvel'
      });

    }

}
