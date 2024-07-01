import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading = false;

  constructor() {
  }

  setLoading(isLoading: boolean) {
    this.loading = isLoading
  }

  getLoading() {
    return this.loading;
  }
}
