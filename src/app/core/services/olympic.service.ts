import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);
  private hasError$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        this.hasError$.next(true);
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  get olympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  get hasError(): Observable<boolean> {
    return this.hasError$.asObservable();
  }

  getOlympicByCountry(country: string): Observable<Olympic | undefined> {
    return this.olympics.pipe(
      map(
        olympics => olympics.find(olympic => olympic.country === country)
      )
    );
  }
}
