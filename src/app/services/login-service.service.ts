import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Definição das interfaces
interface User {
  id: string;
  role: string;
  username: string;
  password: string;
  email: string;
  fullName: string;
  permissions: string[];
}

interface UsersResponse {
  users: User[];
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = 'https://demo8304640.mockable.io/challenge-2024-SwiftStart';

  constructor(private http: HttpClient) {}

  // Método para buscar usuários
  getUsers(): Observable<User[]> {
    return this.http.get<UsersResponse>(this.apiUrl).pipe(
      map(response => response.users),
      catchError(error => {
        console.error('Error fetching users:', error);
        return throwError(() => new Error('Error fetching users'));
      })
    );
  }

  getLoggedInUser(userId: string | null): Observable<User | undefined> {
    return this.getUsers().pipe(
      map(users => users.find(user => user.id === userId)),
      catchError(error => {
        console.error('Error fetching logged-in user:', error);
        return throwError(() => new Error('Error fetching logged-in user'));
      })
    );
  }

  // Método para obter a role do usuário logado
  getUserRole(userId: string | null): Observable<string> {
    return this.getLoggedInUser(userId).pipe(
      map(user => user ? user.role : ''),
      catchError(error => {
        console.error('Error fetching user role:', error);
        return throwError(() => new Error('Error fetching user role'));
      })
    );
  }

  private loggedInUserId = new BehaviorSubject<string | null>(null);
  setLoggedInUserId(userId: string): void {
    this.loggedInUserId.next(userId);
  }
  getLoggedInUserId(): Observable<string | null> {
    return this.loggedInUserId.asObservable();
  }

  private loggedInUserName = new BehaviorSubject<string | null>(null);
  setLoggedInUserName(userId: string): void {
    this.loggedInUserName.next(userId);
  }
  getLoggedInUserName(): Observable<string | null> {
    return this.loggedInUserName.asObservable();
  }
}
