import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginForm} from './login/login.form';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Bet} from './bet-details/bet';
import {BetForm} from './bet-details/bet.form';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private API_URL_LOCAL = 'http://localhost:3801/api/';
  private API_URL_REMOTE = 'http://147.135.211.36:3801/api/';

  private API_URL = this.API_URL_REMOTE;

  private LOGIN_ENDPOINT = 'login';
  private BETS_ENDPOINT = 'bets';
  private SEND_BET_ENDPOINT = 'bet/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  static isUserLogin() {
    return localStorage.getItem('currentUserToken') != null;
  }

  static logout() {
    localStorage.clear();

  }

  login(loginForm: LoginForm) {
    return this.http.post(this.API_URL + this.LOGIN_ENDPOINT, loginForm, { observe: 'response' })
      .pipe(
        tap(response => {
          const token = response.headers.get('Authorization');
          localStorage.setItem('currentUserToken', token);
        }),
        catchError(this.handleError<any>('login'))
      );

  }

  bets(): Observable<Bet[]> {
    this.httpOptions.headers =
      this.httpOptions.headers.set('Authorization', this.currentToken());
    return this.http.get<Bet[]>(this.API_URL + this.BETS_ENDPOINT, this.httpOptions);
  }

  sendBet(id: number, betForm: BetForm): Observable<Bet> {
    this.httpOptions.headers =
      this.httpOptions.headers.set('Authorization', this.currentToken());

    return this.http.post<Bet>(this.API_URL + this.SEND_BET_ENDPOINT + id, betForm, this.httpOptions);
  }

  private currentToken() {
    return localStorage.getItem('currentUserToken');
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
