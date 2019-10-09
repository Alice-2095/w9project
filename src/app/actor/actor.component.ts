//ng new w9app
//cd .\w9app\
//ng serve --open


//new terminal
//cd .\w9app\
//ng g c Actor (A will appear as lowercase)--> has class, html, CSS, test file for unit testing

//add actor tag, then add a service, service only has a class (typescript, test file)
//ng g s Database (D will appear as lowercase)


import { Component, OnInit } from '@angular/core';
import{DatabaseService} from '../database.service'; //

@Component({
  selector: 'app-actor', // can have app-actor tag in html to include this component in my current view(html)
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {
  
  actorsDB: any[] = [];
  section = 1;
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
 

  moviesDB: any[]=[];
  title:string="";
  year:number=0;
  movieId:string="";
  aYear:number=0;

  actorLength:number=0;
  movieLength:number=0;

  constructor(private dbService:DatabaseService) { //now component has access to the dbservice
   // in this constructor: going to request a dependency,my component depends on this service,
   //give me an instance, angular will inject directly. offer reference. once use it: this.dbService (to access it)
  }

  

  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => { //must arrow notation
      this.actorsDB = data;
    });
  }
  
  onSaveActor() {
   let obj = { name: this.fullName, bYear: this.bYear };
   this.dbService.createActor(obj).subscribe(result => {
     this.onGetActors();
   });
 }

  onSelectUpdate(item) {
   this.fullName = item.name;
   this.bYear = item.bYear;
   this.actorId = item._id;
  }

  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
    this.onGetActors();
  });
  }


  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
    this.onGetActors();
  });
  }


  ngOnInit() {
    this.onGetActors();
    this.onGetMovies(); 
  }


  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
    //this.resetValues2();
  }


   resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
  }



  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  resetValues2() {
    this.title = "";
    this.year = 0;
    this.movieId = "";
  }

  onDeleteMovie(item) {
   
    this.dbService.deleteMovie(item._id).subscribe(result => {
    this.onGetMovies();
  });
  }


  onDeleteBeforeYr(){ 
    this.dbService.deleteMovieBefYr(this.aYear).subscribe(result => {
      this.onGetMovies();
    });
  }

  onSelectActor(item){
     this.actorId=item._id;
  }

  onSelectMovie(movie){
     this.movieId=movie._id;
  }


  onAddActorToMovie(){
    let obj = { actors: this.actorId};
    this.dbService.addActorToM(this.movieId,obj).subscribe(result => { 
    this.onGetActors();
  });
}


getActorLen(){
  this.actorLength=this.actorsDB.length;
 // this.dbService.getALen();
  // this.actorLength = this.dbService.getALen();
}

getMovieLen(){
  this.movieLength=this.moviesDB.length;
}

 
    
  

/*
  onSelectUpdate2(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
   } */
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
}

//Quiz1: 
//1. difference: component has 2 elements, one is logic which is ts file- 
//the class, the other is a view which is repersented by html and css.
//service is an object which only getS one instaniation. It only has a class, 
//which contains some functions that maintain data throughout the lifetime of the application.

//2. The service has to be registered as provider in the app module.
//3. Observable supports communications between publishers and subscribers
// in the application. It handles the problem of asynchronousation of 
//javascript and typescript. It is declarative which means once the
// the user subscribes to publish the data, the user will be able to
//get access to the data. 

// After the user defines the functions to get the data, the functions will not be
//executed until the user subscribes to it. The user then will get
//notifications or until they unsubscribe.

//call subscribe() method, pass an observer.

/*Quiz2
import{DatabaseService} from '../DBService.service';

export class ImdbComponent implements OnInit{
  
  constructor(private dbService:DatabaseService){ }

  getAllActors( ):void{
    this.dbService.getActors().subscribe((data: any[]) => {
      console.log(data);
    });
  }

} */