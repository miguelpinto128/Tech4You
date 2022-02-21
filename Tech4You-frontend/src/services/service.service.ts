import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from 'src/modules/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // async service(){
  //   const resp = await fetch('http://localhost:3001/services/${id}');
  //   const data = await resp.json();
  //   const { results : [service] } = data;
  //   return service; 
  // }



  constructor(private httpClient: HttpClient) {
  }

  getServiceByID(id: number) {
    let url = `http://localhost:3001/services/${id}`;
    return this.httpClient.get(url);
  }

  convertSingleService(id: number): Promise<any> {
    let ServiceRes: Service;
    return new Promise((resolve, reject) => {
      this.getServiceByID(id).toPromise().then((data: any) => {
        let id = data.id;
        let status = data.status;
        let description = data.description;
        let observations = data.observations;
        let startDate = data.startDate;
        let endDate = data.endDate;
        let tests = data.likes;
        let components = data.component;

        ServiceRes = new Service(
          id,
          status,
          description,
          observations,
          startDate,
          endDate,
          tests,
          components);
          resolve({ serviceData: ServiceRes });
      })   
    })
  }
}