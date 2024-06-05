import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';

// @TODO do change endpoint to packing-slip
@Injectable()
export class PackingSlipService {

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) { }

  show(id): Observable<any> {
    return this.apiService.get_py(`/packing/slip/${id}`)
      .map(data => data);
  }

  indexDatatables(payload): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
    };

    this.location.replaceState('pages/logistic/activities/packing_slip/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);

    return this.apiService
      .get_py(
        '/packing/slip',
        params,
    ).map(data => data);
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('files', fileToUpload, fileToUpload.name);
    return this.apiService
      .upload_py('/packing/slip/import', formData);
  }

  // custom function
  updatePackingSlip(payload): Observable<any> {    
    console.info("payload : " + payload);
    return this.apiService.post_py(
        '/packing/slip/import/update', payload
      ).map(data => data);
  }

}
