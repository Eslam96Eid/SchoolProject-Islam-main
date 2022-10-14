import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http-handler.service';
import { IRate } from '../components/edit-new-assessment/edit-new-assessment.model';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  baseUrl = environment.serverUrl;
  private headers = new HttpHeaders();
  constructor(private http: HttpHandlerService,private _http: HttpClient) { this.headers = this.headers.set('content-type', 'application/json');
  this.headers = this.headers.set('Accept', 'application/json');}

  getRates(): Observable<any> {
    return this.http.get('/Rate');
  }

  addRate(data: IRate): Observable<any> {
    return this.http.post('/Rate', data);
  }

  updateRate(data: IRate): Observable<any> {
    return this.http.put('/Rate', data);
  }

  getRateById(id: number): Observable<any> {
    return this.http.get(`/Rate/${id}`, {}, {
    //  'Authorization':  `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBdXRoZW50aWNhdGUiOiJ0cnVlIiwibmFtZSI6ImFkbWluQHNwZWEuY29tIiwiZW1haWwiOiJhZG1pbkBzcGVhLmNvbSIsIm5hbWVpZCI6IjEiLCJTY29wZSI6IlNQRUEiLCJuYmYiOjE2NjUxNzE5NDYsImV4cCI6MTY2NTI1ODM0NiwiaWF0IjoxNjY1MTcxOTQ2fQ.u3IvbzzisdOmYEJee_LUlSuzQQ8YdCSTIkASGjDQoqM`
    });
  }

  getAssignmentList(keyword:string ,sortby:string ,page :number , pagesize :number , sortcolumn:string , sortdirection:string) {
    let params = new HttpParams();
    if(page !== null && pagesize !== null ){
      params = params.append('keyword' , keyword.toString());
      params = params.append('sortby' , sortby.toString());
      params = params.append('page' , page.toString());
      params = params.append('pagesize' , pagesize.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortdirection' , sortdirection.toString());
    }
    return this._http.get<any>(`${this.baseUrl+'/Exam'}`, {observe:'response' , params}).pipe(
      map(response => {
         return response.body ;
      })
    )
  }

}
