import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import {HttpParams,HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient) { }
  contactForm=new FormGroup({
    id:new FormControl(),
    psswd:new FormControl()
  });

  ngOnInit(): void {
  }
  public GetDetails(){
      console.log(this.contactForm.value);
      const IDdet=this.contactForm.value.id;
      let params=new HttpParams();
      params=params.append('pID',IDdet);
      this.http.get('http://localhost:3000/users',{params:params}).subscribe({
         next:(res)=>{
            console.log("On the angular");
            console.log(res);
          },
         error:(error)=>console.log(error),
        });
  }
}
