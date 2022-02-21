import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from '../../../services/tokenStorage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})



export class MenuComponent implements OnInit {

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, private tokenStorage: TokenStorageService) { }
  data: any = '';
  dataEquipment: any = '';
  dataClient: any = '';
  data2: any = '';
  alertMessage: string = "";
  serviceId: string = "";
  baseUrl: string = `http://localhost:3001/`;

  isLoggedIn = true;
  isLoginFailed = false;

  roles: string[] = [];


  token = this.tokenStorage.getUser();

  ngOnInit(): void {
    // const headers = { 'Authorization': `Bearer ${this.token.token}` };
    // const requestOptions = { headers: new HttpHeaders(headers) }
    // let url = this.baseUrl + `v1/technicians/1126`;

    // this.http.get(url, requestOptions)
    //   .subscribe((res: any) => {
    //     this.data = res;
    //     console.log(this.data)
    //   })
  }



}
