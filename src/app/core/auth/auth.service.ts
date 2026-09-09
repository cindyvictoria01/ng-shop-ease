import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

interface User {
  id: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/users';
  private readonly authKey = 'shopEaseLoggedIn';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User | undefined> {
    return this.http
      .get<User[]>(this.apiUrl)
      .pipe(
        map((users) =>
          users.find(
            (user) => user.email === email && user.password === password,
          ),
        ),
      );
  }

  setLoggedIn(): void {
    localStorage.setItem(this.authKey, 'true');
  }

  logout(): void {
    localStorage.removeItem(this.authKey);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.authKey) === 'true';
  }
}
