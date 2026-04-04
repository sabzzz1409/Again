import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private http = inject(HttpClient);

  public call = (route: string, verb: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', body: any = {}) =>
    this.http.request(verb, route, {
      body: body,
    });
}
