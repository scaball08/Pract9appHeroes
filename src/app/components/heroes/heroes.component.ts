import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {
  heroes:any;

  //loading: bandera para no mostrar la  alerta de "no hay registros"
  // cuando se carga la pagina de "heroes" .
  loading:boolean=true;

  constructor(private _heroesService:HeroesService) {


    this._heroesService.getHeroes()
    .subscribe(data=>{


        setTimeout(()=>{this.loading = false;this.heroes = data;},2000);
    });
  }

  ngOnInit() {
  }

  borrarHeroe(key$:string){
    this._heroesService.borrarHeroe(key$)
    .subscribe(resp=>{
      if (resp) {
        console.error(resp);
      } else {
        // Todo bien
        console.log(resp);

        // eliminar un elemento del objeto:
        // delete this.heroes[key$];
        delete this.heroes[key$];
      }

    });
  }


}
