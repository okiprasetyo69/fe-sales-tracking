// Created by supan adit pratama<supan.aditp@xenos.co.id>

export interface PlanSummary {
  competitor_images: Image[];
  create_by: number;
  create_date: string;
  customer_code: string;
  have_competitor: number;
  id: number;
  notes: string;
  plan_id: number;
  update_date: string;
  visit_images: Image[];
  category_visit: string;
  collect_method: string;
}

export class PlanSummaryClass implements PlanSummary {
  competitor_images: Image[];
  create_by: number;
  create_date: string;
  customer_code: string;
  have_competitor: number;
  id: number;
  notes: string;
  plan_id: number;
  update_date: string;
  visit_images: Image[];
  category_visit: string;
  collect_method: string;

  isVisitImagesEmpty(): boolean {
    return this.visit_images.length == 0;
  }
}

export interface Image {
  desc: string;
  image: string;
}
