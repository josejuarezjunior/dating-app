import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);

  baseUrl = 'https://localhost:5001/api/';

  register(creds: RegisterCreds) {
    return this.http.post<User>(this.baseUrl + 'account/register', creds).pipe(
      tap(user => {
        if (user) {
          // Se a criação do usuário tiver sucesso, salva o login no Local Storage do navegador
          this.setCurrentUser(user)
        }
      })
    )
  }

  login(creds: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(/* O pipe vem da biblioteca rxjs */
      tap(user => {
        if (user) {
          // Se login for com sucesso, salva o login no Local Storage do navegador
          this.setCurrentUser(user)
        }
      })
    )
  }

  setCurrentUser(user: User) {
    // Persistindo os dados de login no Local Storage do navegador (Ferramentas do desenvolvedor ==> Application ==> Local Storage)
    localStorage.setItem('user', JSON.stringify(user)) 
    this.currentUser.set(user)
  }

  logout(){
    // Removendo os dados de login no Local Storage do navegador (Ferramentas do desenvolvedor ==> Application ==> Local Storage)
    localStorage.removeItem('user'); 
    this.currentUser.set(null);
  }
}
