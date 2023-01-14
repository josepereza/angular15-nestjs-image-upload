import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
usuarios$=new Subject<any[]> ()

rickandmorty$= new Subject<any[]>()
  constructor(private http:HttpClient) { }

 
  getAll(){
    this.http.get<any[]>('http://localhost:3000/users').subscribe(data=>{
      this.usuarios$.next(data)
    })
  }

  createUser(user:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data'
      })
    };
    this.http.post('http://localhost:3000/users', user).subscribe(data=>{
    this.getAll()
    })
  

    };

    getRickandmorty(){
      this.http.get('https://rickandmortyapi.com/api/character').subscribe((data:any)=>{
        this.rickandmorty$.next(data.results)
      })
    }
  
}
