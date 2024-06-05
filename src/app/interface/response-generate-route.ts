// Created by supan adit pratama <supan.aditp@xenos.co.id>

import { RouteParent } from "./response-route";
import { DestinationOrder } from "./response-destionation-order";
import { PlanModel } from "./response-plan";
import { FormGroup } from "@angular/forms";

export interface GenerateRoute {
  google_route: RouteParent;
  destination_order: DestinationOrder[];
}

export class CreateGenerateRoute implements GenerateRoute {
  destination_order: DestinationOrder[];
  google_route: RouteParent;

  constructor(google_route: RouteParent, destination_order: DestinationOrder[]) {
    this.destination_order = destination_order;
    this.google_route = google_route;
  }

  static fromPlan(planData: PlanModel) {
    let google_route, destination_order;
    google_route = planData.route;
    destination_order = planData.destination_order;
    return new this(
      google_route,
      destination_order,
    )
  }

  static fromMediaFormGroup(formGroup: FormGroup) {
    const google_route: RouteParent = formGroup.controls['route'].value;
    const destination_order: DestinationOrder[] = formGroup.controls['destination_order'].value;
    return new this(
      google_route,
      destination_order,
    )
  }


  /**
   * Fungsi ini digunakan untuk API versi lama yang response data nya masih berupa 2 index array 0 dan 1
   * @param data adalah data array yang seharusnya index 0 berupa RouteParent dan index 1 berupa DestinationOrder[]
   */
  static fromArray(data: any[]) {
    const google_route: RouteParent = data[0];
    const destination_order: DestinationOrder[] = data[1];
    return new this(
      google_route,
      destination_order,
    )
  }
}
