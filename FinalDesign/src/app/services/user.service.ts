// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// //import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   private apiUrl = 'http://localhost:3000/api/users'; // ✅ FIX
//   //private apiUrl = 'http://192.168.29.113:3000/api/users'; // ✅ FIX

//   constructor(private http: HttpClient) {}

//   // ✅ GET
//   getUsers(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

//   // ✅ POST
//   addUser(user: any): Observable<any> {
//     return this.http.post(this.apiUrl, user);
//   }

//   // ✅ PUT
//   updateUser(id: string, user: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, user);
//   }

//   // ✅ DELETE
//   deleteUser(id: string): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }
// }
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  // 🔥 COMMON HEADER FUNCTION
  private getHeaders() {
    const token = sessionStorage.getItem('accessToken');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // this.http.post<any>('http://localhost:3000/login', data)
  // .subscribe(res => {

  //  
  //   localStorage.setItem('token', res.token);

  // });

  // ✅ GET
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.getHeaders());
  }

  // ✅ POST
  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user, this.getHeaders());
  }

  // ✅ PUT
  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user, this.getHeaders());
  }

  // ✅ DELETE
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}
