import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NbMenuItem } from '@nebular/theme';

@Injectable()
export class MenuService {
  private menuSubject = new BehaviorSubject<NbMenuItem[]>([]);
  menu = this.menuSubject.asObservable();

  constructor(private apiService: ApiService) {
  }

  getAll(): Observable<any> {
    return this.apiService.get_py(`/menu`).map(data => data);
  }

  getMenuReloaded(selected = null) {
    // alert('menu reloaded!');
    if (selected == null) {
      this.apiService.get_py(`/menu`).subscribe(data => {
        this.menuSubject.next(data.data.menu);
      });
    } else {
      this.apiService.get_py(`/menu`, {selected: selected}).subscribe(data => {
        this.menuSubject.next(data.data.menu);
      });
    }
  }
}
