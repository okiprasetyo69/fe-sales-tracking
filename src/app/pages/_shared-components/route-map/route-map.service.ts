import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../../services/api.service';
import * as MapPolyline from 'decode-google-map-polyline';
import { GenerateRoute } from '../../../interface/response-generate-route';
import {
  fromGenerateRoute,
  fromGenerateRouteByDestinationOrder,
  GeoPosition,
  Leg,
  Step,
} from '../../../interface/response-route';
import { Pagination } from '../../../interface/response-pagination';
import { Breadcumb } from '../../../interface/response-breadcumb';
import { DefaultResponse } from '../../../interface/response-default';

@Injectable()
export class RouteMapService {

  constructor(
    private apiService: ApiService,
  ) {
  }

  /**
   * Digunakan untuk membuat sebuah rute jalan yang berbentuk list GeoPosition
   * @param generatedResult adalah parameter berupa GenerateRoute yang akan di parsign menjadi list GeoPosition
   * @return GeoPosition adalah hasil parsing dari GenerateRoute berupa GeoPosition[]
   */
  createRoute(generatedResult: GenerateRoute, usingRoute: boolean): GeoPosition[] {
    let geoPosition: GeoPosition[] = [];
    if (usingRoute) {
      geoPosition = fromGenerateRoute(generatedResult)
    } else {
      geoPosition = fromGenerateRouteByDestinationOrder(generatedResult)
    }
    return geoPosition;
  }

  /**
   * Digunakan untuk mendapatkan data legs hasil GenerateRoute yang merupakan
   * pin point customer berupa list GeopPosition[]
   * @param generatedResult adalah parameter berupa GenerateRoute yang akan di parsign menjadi list GeoPosition
   * @return GeoPosition adalah hasil parsing dari GenerateRoute berupa GeoPosition[]
   */
  getRouteWay(generatedResult: GenerateRoute): GeoPosition[] {
    let routes: GeoPosition[] = [];
    let leg: Leg;
    for (leg of generatedResult.google_route.routes[0].legs) {
      routes.push(leg.end_location);
    }
    return routes;
  }

  /**
   * Digunakan untuk mendapatkan list instruksi dari google yang telah di proses back end melalui API
   * @param generatedResult adalah hasil parsing untuk mendapatkan list array GeoPosition dari GenerateRoute.
   * @return string berupa array string[]
   */
  getInstruction(generatedResult: GenerateRoute): String[] {
    let instruction: String[] = [];
    if (generatedResult != null) {
      if (generatedResult.google_route != null) {
        if (typeof generatedResult.google_route.routes.length != 'undefined') {
          if (generatedResult.google_route.routes.length != 0) {
            const listLeg: Leg[] = generatedResult.google_route.routes[0].legs;
            let leg: Leg;
            for (leg of listLeg) {
              let step: Step;
              for (step of leg.steps) {
                const instructionTemp = step.html_instructions.toString();
                const no_html = instructionTemp.replace(/<[^>]*>/g, '');
                const clean_instruction = no_html.replace(/&nbsp;/gi, '').replace(/&amp;/gi, '').replace(/\//g, ' ');
                instruction.push(clean_instruction);
              }
            }
          }
        }
      }
    }
    return instruction;
  }


  /**
   * Digunakan untuk mendapatkan list Pagination Breadcumb dari API yang data tersebut merupakan hasil perjalan dari Visit Plan atau Delivery Plan
   * @param job_function adalah data yang menentukan apakah `sales` atau `logistic`
   * @param id adalah ID key milik Visit Plan atau Delivery Plan
   * @return Breadcumb berupa array Breadcumb[]
   */
  getBreadcrumb(job_function, id): Observable<DefaultResponse<Pagination<Breadcumb>>> {
    const params = {
      page: 1,
      limit: 10000,
      plan_id: id,
    };
    return this.apiService.get_py(
      `/activity/${job_function}/breadcrumb`,
      params,
    ).map(data => data);
  }

  /**
   * Digunakan untuk mendapatkan list BreadCumb yang merupakan rute hasil perjalanan dari aktifitas Visit Plan atau Delivery Plan
   * @param dataBreadCrumb adalah parameter berupa list BreadCrumb[]
   * @return GeoPosition berupa array GeoPosition[] hasil parsing dari BreadCumb[]
   */
  decodeBackendBreadcrumbData(dataBreadCrumb: Breadcumb[]): GeoPosition[] {
    // Decode Data from backend to be point latitude and longitude only
    let breadcumb: Breadcumb, geoPositions: GeoPosition[];
    geoPositions = [];
    // Filtering any and push the latitude and longitude only
    for (breadcumb of dataBreadCrumb) {
      geoPositions.push(breadcumb);
    }
    return geoPositions;
  }


}
