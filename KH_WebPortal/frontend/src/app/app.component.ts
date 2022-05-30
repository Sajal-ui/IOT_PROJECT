import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kidney_Health';
  constructor(private route:Router){}
  visible=true;
  public Goforit(){
      this.visible=false;
      this.route.navigate(['login']);
  }
}
