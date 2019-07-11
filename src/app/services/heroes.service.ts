import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
import  "rxjs/operators";

// importar el  operador map de los obsevables 'rxjs/operators'
// que se usa para filtrar la data recibida
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  heroesURL:string = "https://heroesapp-df865.firebaseio.com/heroes.json";
  heroeURL:string = "https://heroesapp-df865.firebaseio.com/heroes";
  constructor(private http:HttpClient) { }

  nuevoHeroe(heroe:Heroe){
    // se espesifica el header es un json
    const headers = new HttpHeaders({'Content-Type':'application/json'});

    // se debe transformar el objeto en un string json
    //para mandarlo como el cuerpo de la peticion post
    const body = JSON.stringify(heroe);


    // con la nueva actualizacion del httpClient
    // no se necesita transformar los datos devueltos con .json()
    return this.http.post(this.heroesURL, body , {headers} )
    .pipe(map(res=>{
      console.log(res);
      return res;
    }));

  }


  actualizarHeroe(heroe:Heroe,key$:string){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    const body = JSON.stringify(heroe);


    const urlheroe = `${this.heroeURL}/${key$}.json`;

    // con la nueva actualizacion del httpClient
    // no se necesita transformar los datos devueltos con .json()
    return this.http.put(urlheroe, body , {headers} )
    .pipe(map(res=>{
      console.log(res);
      return res;
    }));

  }


  borrarHeroe(key$:string){
    const urlheroe = `${this.heroeURL}/${key$}.json`;
    return this.http.delete(urlheroe)
    .pipe(map(res=>{
      console.log(res);
      return res;
      }
     )
    );
  }

  getHeroe(key$:string){
    const urlheroe = `${this.heroeURL}/${key$}.json`;
    return this.http.get(urlheroe)
    .pipe(map(res=>res));
  }


  getHeroes(){

    return this.http.get(this.heroesURL)
    .pipe(map(res=>res));
  }
}
