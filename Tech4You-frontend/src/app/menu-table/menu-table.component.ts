import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { TokenStorageService } from 'src/services/tokenStorage.service';

@Component({
  selector: 'app-menu-table',
  templateUrl: './menu-table.component.html',
  styleUrls: ['./menu-table.component.css']
})
export class MenuTableComponent implements OnInit {
  @ViewChild("content3", { static: true }) content3: any;
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal, private tokenStorage: TokenStorageService) { }
  data: any = '';
  dataEquipment: any = '';
  dataClient: any = '';
  data2: any = '';
  alertMessage: string = "";
  serviceId: string = "";
  baseUrl: string = `http://localhost:3001/`;

  errorStatus: any = '';
  errorMessage1: any = "";
  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;


  clickData: any = '';

  closeResult = '';

  p: number = 1;

  search: number = 1;

  serviceIdd: any = '';

  //Token
  token = this.tokenStorage.getUser();
  headers = { 'Authorization': `Bearer ${this.token.token}` };
  requestOption = { headers: new HttpHeaders(this.headers) }


  ngOnInit() {
    this.getRouteData(this.content3);
  }

  getRouteData(content3: any) {
    this.activatedRoute.params.subscribe(params => {
      this.serviceId = params['search'];
      console.log(params['search']);
    })

    let url = this.baseUrl + `v1/services`;
    this.http.get(url, this.requestOption).subscribe((res: any) => {
      this.data = res;
      console.log(this.data)
      this.http
        .get(this.baseUrl + `v1/equipments`, this.requestOption)
        .subscribe((res: any) => {
          this.dataEquipment = res;
          console.log(res)
          this.http
            .get(this.baseUrl + `v1/clients`, this.requestOption)
            .subscribe((res: any) => {
              this.dataClient = res;
              console.log(res)
            }, err => {

              this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
              }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

              });

              this.errorMessage = err.error.message;
              this.isLoginFailed = true;
              this.errorMessage1 = err.error.error;
              this.errorStatus = err.status;
              console.log(err);
              console.log(this.errorMessage1);
              console.log(this.errorStatus);
            }
            )
        }, err => {

          this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

          });

          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          this.errorMessage1 = err.error.error;
          this.errorStatus = err.status;
          console.log(err);
          console.log(this.errorMessage1);
          console.log(this.errorStatus);
        }
        )
    }, err => {

      this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

      });

      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
      this.errorMessage1 = err.error.error;
      this.errorStatus = err.status;
      console.log(err);
      console.log(this.errorMessage1);
      console.log(this.errorStatus);
    }
    )
  }


  open(content: any, serviceIdd: string, content3: any) {
    let url = this.baseUrl + `v1/services/${serviceIdd}`;
    this.http.get(url, this.requestOption).subscribe((res: any) => {
      this.clickData = res;
      console.log(this.clickData)
      this.http
        .get(this.baseUrl + `v1/equipments/${this.clickData.equipment_id}`, this.requestOption)
        .subscribe((res: any) => {
          this.dataEquipment = res;
          console.log(res)
          this.http
            .get(this.baseUrl + `v1/clients/${this.dataEquipment.client_id}`, this.requestOption)
            .subscribe((res: any) => {
              this.dataClient = res;
              console.log(res)
            }, err => {

              this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
              }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

              });

              this.errorMessage = err.error.message;
              this.isLoginFailed = true;
              this.errorMessage1 = err.error.error;
              this.errorStatus = err.status;
              console.log(err);
              console.log(this.errorMessage1);
              console.log(this.errorStatus);
            }
            )
        }, err => {

          this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

          });

          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          this.errorMessage1 = err.error.error;
          this.errorStatus = err.status;
          console.log(err);
          console.log(this.errorMessage1);
          console.log(this.errorStatus);
        }
        )
    }, err => {

      this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

      });

      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
      this.errorMessage1 = err.error.error;
      this.errorStatus = err.status;
      console.log(err);
      console.log(this.errorMessage1);
      console.log(this.errorStatus);
    }
    )


    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  delete(serviceIdd: string, content3: any) {
    let url2 = this.baseUrl + `v1/services/${serviceIdd}`;
    this.http.delete(url2, this.requestOption).subscribe((res2) => {
      ((this.data2 = res2), console.log(res2))
      this.getRouteData(this.content3);
    }, err => {

      this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

      });

      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
      this.errorMessage1 = err.error.error;
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

  open2(content2: any) {
    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  sendMessage = (msgForm: NgForm, content3: any) => {
    let apiURL = this.baseUrl + `v1/services/`;
    console.log(this.requestOption);
    this.http
      .post(apiURL, msgForm.value, this.requestOption)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.requestCode === 1) {
            msgForm.reset();
          } else {
            this.alertMessage = res.msg;
          }
        },
        err => {

          this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

          });

          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          this.errorMessage1 = err.error.error;
          this.errorStatus = err.status;
          console.log(err);
          console.log(this.errorMessage1);
          console.log(this.errorStatus);
        }

      )

  };
}



