import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { dropdown_limit } from '../configs/configs';

@Injectable()
export class LivemapService {

  private url = environment.api_url_python;
  private socket;

  constructor(private apiService: ApiService) {
  }

  public sendLocation(marker) {
    this.socket.emit('add-marker', marker);
  }

  public setUser(username) {
    console.info('user-set is executed');
    this.socket.emit('user-set', username);
  }

  public changeLocation(data) {
    this.socket.emit('change-location', data);
  }

  public getLocation(): Observable<any> {
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      console.info("socket url : " + this.socket);

      this.socket.on('markers', (markers) => {
        observer.next(markers);
        console.info('On The Back users : ', markers);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  branch_user(): Observable<any> {
    return this.apiService.get_py(`/branches`, {
      page: 1,
      limit: dropdown_limit.max,
      dropdown: true,
      order_by_column: 'name',
      order_direction: 'asc',
    }).map(data => data);
  }

  division_user(): Observable<any> {
    return this.apiService.get_py(`/division`, {page: 1, limit: 1000, dropdown: true})
      .map(data => data);
  }

}
