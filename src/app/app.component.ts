import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'w9app';

  selection:number=1; //show and hide our divs

  changeSection(id:number):void{
     this.selection=id;  //selection is attribute inside class, 
                         //id: input parameter
  }

  


}
