import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/tokenStorage.service';
import { ViewChild} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  jwt: string = '';
  closeResult = '';
  errorStatus: any = '';
  errorMessage1: any = '';
  userName= 'Pato';

  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService,private modalService: NgbModal) { }
  //*ngIf="!isLoggedIn" estava no frontend
  ngOnInit(): void {
    if (this.tokenStorage.getUser()) {
      console.log(this.tokenStorage.getUser())
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;

    }
  }

  onSubmit(content: any): void {
    const { email, password } = this.form;
    this.authService.login(email, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.jwt = data.token;
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      err => {
        
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    
        });
        
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.errorMessage1=  err.error.error;
        this.errorStatus = err.status;
        console.log(err);
        console.log(this.errorMessage1);
        console.log(this.errorStatus);
      }
      
    );
    console.log(this.jwt);
  }

  reloadPage(): void {
    // window.location.reload();
    this.router.navigate(['menu-funcionarios'])
  }

 

  
}