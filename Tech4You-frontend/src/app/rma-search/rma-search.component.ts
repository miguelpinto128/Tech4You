import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rma-search',
  templateUrl: './rma-search.component.html',
  styleUrls: ['./rma-search.component.css']
})
export class RmaSearchComponent implements OnInit {
  search: string = '';
  constructor(
    private router: Router,
    private modalService: NgbModal
  ) {

  }

  ngOnInit(): void {

  }

  detail(query: string) {
    this.router.navigate(['/service-details', query]);
  }

  modal(content: any) {
    this.modalService.open(content).result.then();
  }

  triggerModal(query: string) {
    this.modalService.open(query).result.then();
  }



}
