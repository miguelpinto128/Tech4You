import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Service } from 'src/modules/service.model';
import { ServiceService } from 'src/services/service.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  @ViewChild("content",{static:true}) content:any;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router,private modalService: NgbModal) { }
  data: any = '';
  dataEquipment: any = '';
  dataClient: any = '';
  data2: any = '';
  alertMessage: string = "";
  serviceId: string = "";
  baseUrl: string = `http://localhost:3001/`;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  closeResult = '';
  errorStatus: any = '';
  errorMessage1: any = '';
 
  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.serviceId = params['search'];
    })
    this.getService(this.content);
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


  getService(content: any)
  { 
    let url = this.baseUrl + `public/publicServices/${this.serviceId}`;
    this.http.get(url)
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data)
        this.http
          .get(this.baseUrl + `public/publicEquipamentos/${this.data.equipment_id}`)
          .subscribe((res: any) => {
            this.dataEquipment = res;
            console.log(res)
            this.http
              .get(this.baseUrl + `public/publicClients/${this.dataEquipment.client_id}`)
              .subscribe((res: any) => {
                this.dataClient = res;
                console.log(res)
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
              })
          },err => {     
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
          })
      },err => {
        
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
      })
  }

  

  getRes = () => { };

  //post
  sendMessage = (msgForm: NgForm) => {
    let apiURL = 'http://localhost:3001/public/public/services/9'; //TODO
    console.log(msgForm.value)
    this.http
      .put(`${apiURL}`, msgForm.value)
      .subscribe((res) => this.getPosts(res, msgForm));
  };

  //
  getPosts = (param: any, formData: NgForm) => {
    console.log(param.requestCode);
    if (param.requestCode === 1) {
      formData.reset();
    } else {
      this.alertMessage = param.msg;
    }
  };

}
