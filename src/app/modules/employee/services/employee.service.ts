import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { Observable } from 'rxjs';

const BASE_URL = 'https://task-api-qe6b.onrender.com/';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployeeTasksById(): Observable<any> {
    return this.http.get(BASE_URL + 'api/employee/tasks', {
      headers: this.createAuthorizationHeader(),
    });
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.get(BASE_URL + `api/employee/task/${id}/${status}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get(BASE_URL + 'api/employee/task/' + id, {
      headers: this.createAuthorizationHeader(),
    });
  }

  createComment(id: number, content: string): Observable<any> {
    const params = {
      content: content,
    };

    return this.http.post(BASE_URL + 'api/employee/task/comment/' + id, null, {
      params: params,
      headers: this.createAuthorizationHeader(),
    });
  }

  getCommentsByTask(id: number): Observable<any> {
    return this.http.get(BASE_URL + 'api/employee/comments/' + id, {
      headers: this.createAuthorizationHeader(),
    });
  }
  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }
}
