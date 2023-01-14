import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit  {

 get misusuarios(){
  return this.userService.usuarios$
 }

 get personajesRickAndMorty(){
  return this.userService.rickandmorty$

 }

  constructor(private userService:UserService){

  }
  ngOnInit(): void {
    this.userService.getAll();
    this.userService.getRickandmorty();
    
 
  }


}
