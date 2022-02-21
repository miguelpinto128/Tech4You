import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/services/tokenStorage.service';

@Component({
  selector: 'app-menu-funcionarios',
  templateUrl: './menu-funcionarios.component.html',
  styleUrls: ['./menu-funcionarios.component.css']
})
export class MenuFuncionariosComponent implements OnInit {

  @ViewChild("content3",{static:true}) content3:any;
  
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal, private tokenStorage: TokenStorageService) { }
  baseUrl: string = `http://localhost:3001/`;

  data: any = '';
  clickData: any = '';
  deleteData: any = '';

  serviceId: string = "";
  closeResult = '';
  search: number = 1;
  id: any = ''
  alertMessage: string = "";
  

  //Page
  p: number = 1;

  //Token
  token = this.tokenStorage.getUser();
  headers = { 'Authorization': `Bearer ${this.token.token}` };
  requestOption = { headers: new HttpHeaders(this.headers) }

  //Errors
   errorStatus: any = '';
   errorMessage1: any = "";
   errorMessage = '';
   isLoggedIn = false;
   isLoginFailed = false;

  ngOnInit() {
    this.getRouteData(this.content3);
  }

  getRouteData(content3 : any) {
    this.activatedRoute.params.subscribe(params => {
      this.serviceId = params['search'];
    })

    let url = this.baseUrl + `v1/technicians`;
    this.http.get(url,this.requestOption).subscribe((res: any) => {
      this.data = res;
    },err => {
        
      this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
    })
  }

  open(content: any, id: string, content3: any) {
    let url = this.baseUrl + `v1/technicians/${id}`;
    this.http.get(url,this.requestOption).subscribe((res: any) => {
      this.clickData = res;
    },err => {
      this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
    })

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  delete(id: string, content3: any) {
    let urlIndividual = this.baseUrl + `v1/technicians/${id}`;
    this.http.delete(urlIndividual,this.requestOption).subscribe((res2) => {
      ((this.deleteData = res2))
      this.getRouteData(content3);
    },err => {
      this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
    });
   
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

  sendMessage = (msgForm: NgForm,id: string, content3:any) => {
    console.log(this.id)
    let apiURL =  this.baseUrl + `v1/technicians/${id}`;
    console.log(this.requestOption);
    this.http
      .put( apiURL,msgForm.value, this.requestOption)
      .subscribe((res) => {
        this.getPosts(res, msgForm)
        this.modalService.dismissAll(content3);
      },err => {
        this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      });
  };


  getPosts = (param: any, formData: NgForm) => {
    if (param.requestCode === 1) {
      formData.reset();
    } else {
      this.alertMessage = param.msg;
    }
  };

  open2(content2: any) {

    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  sendMessage2 = (msgForm: NgForm, content3:any) => {
    console.log(this.id)
    let apiURL =  this.baseUrl + `v1/technicians`;
    console.log(this.requestOption);
    this.http
      .post( apiURL,msgForm.value, this.requestOption)
      .subscribe((res) => {
        this.getPosts(res, msgForm)
        this.modalService.dismissAll(content3);
      },err => {
        this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      });
  };

}
