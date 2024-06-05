import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { OauthService } from './oauth.service';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable()
export class HeaderService {

  private url = environment.api_url_python;
  private socket;

  constructor(
    private apiService: ApiService,
    private oauthService: OauthService,
  ) {
  }

  getApprovalCounter(): Observable<any> {
    return this.apiService.get_py(
      '/approval/notif/checker',
    ).map(data => data);
  }

  public getInbox() {
    const userId = this.oauthService.getId();
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      const chanelName = 'notif-'.concat(userId);
      this.socket.on(chanelName, (notif) => {
        observer.next(notif);
        console.info('On The Back Notification ', notif);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  public setNull() {
    const userId = this.oauthService.getId();
    console.info('Resetting Notification : ', userId);
    const chanelName = 'userid-reset';
    const data = {
      user_id: userId,
    };
    console.info('Channel Name : ', chanelName);
    this.socket.emit(chanelName, data);
  }

  logout(): Observable<any> {
    return this.apiService
      .post_py(
        '/logout',
        {type: 'web'},
      ).map(data => data);
  }
}
