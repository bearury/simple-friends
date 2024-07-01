import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable(); // Экспортируем как Observable

  constructor() {
  }

  setLoading(isLoading: boolean) {
    this.loadingSubject.next(isLoading);
  }

  getLoading() {
    return this.loadingSubject.value;
  }
}
