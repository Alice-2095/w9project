import { Injectable } from '@angular/core';
//new (vital)
import{ HttpClient, HttpHeaders } from '@angular/common/http';//now service depends on http,
//an instance of http will be injected to service

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
}; //


@Injectable({ //Dependency injection:
             
  providedIn: 'root'
}) //injectable: tell angular, this class is injectable, if there is
   //a component needs to have a instance, offer it. 

export class DatabaseService {
  //now the service depends on http
  constructor(private http:HttpClient) { }
/*
  alertMe(){
    alert("week9");  //service offers func to show an alert
  }
  */
  
  //need a http client: which is a library to help to generate a request
  getActors(){
    //return this.http.get('/actors'); //because this is a service, has to return to the one who invoked this method,
                    //whatever provided from get, going to return it back
  
    //subscribe: please give data to me data once it becomes avalable                  
    return this.http.get('/actors');
  
  }

  getActor(id: string) {
      let url = "/actors/" + id;
      return this.http.get(url);
  }  

  
  createActor(data) {
    return this.http.post("/actors", data, httpOptions);
  }

  updateActor(id, data) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }


  deleteActor(id) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }



  getMovies(){
    return this.http.get('/movies');
  
  }


  createMovie(data) {
   return this.http.post("/movies", data, httpOptions);
}

  deleteMovie(id) {
    let url = "/movies/" + id;
    return this.http.delete(url, httpOptions);
}

 deleteMovieBefYr(aYear){  
    let url = "/movies/aYear/" + aYear;
    return this.http.delete(url, httpOptions);
}

/*
 addActorToM(id, data){
    let body={movies:data};
    let options={params: {actorid:id}};
    return this.http.post("/actors/addMovie/",[id,data],httpOptions); 
} */

addActorToM(movieId,data){
  
  return this.http.put("/movies/addActor/"+movieId,data,httpOptions);
}
/*
getALen(){                
   this.http.get('/actors').subscribe((data:any[]) =>{
    //alert(data.length);
    return data.length;
    
  });               

  }
getMLen(){                
    this.http.get('/movies').subscribe((data:any[]) =>{
      alert(data.length);
      return data.length;
    });                
  
}  */ 


}


//js, ts is asyncronous language, hard to tell when will get 
  // results, this.http.get('/actors') will give you back a 
  //observable, which is a publish/subscribe approach, which means
  //this.http.get will give you back a observable, will publish data
  // for you, you won't get access to the data unless you subscribe.
