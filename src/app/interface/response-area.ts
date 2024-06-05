export interface Area {
  approval_by: number;
  create_by: number;
  create_date: string;
  description?: string;
  edit_data?: any;
  id: number;
  is_approval: number;
  is_delete_approval: number;
  is_delete_approval_by?: any;
  is_deleted: number;
  marker_color: string;
  marker_type: string;
  markers: Marker[];
  name: string;
  update_date: string;
}

export interface Marker {
  lat: number;
  lng: number;
}
