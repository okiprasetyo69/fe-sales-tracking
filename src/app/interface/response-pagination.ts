// Created by supan adit pratama<supan.aditp@xenos.co.id>

/**
 * Default response digunakan untuk model umum hasil response berupa pagination dari api,
 * hasil dari backend akan selalu
 *
 * ```{
 * "data": T[],
 * "has_next": boolean,
 * "has_prev": boolean,
 * "total": number,
 * "total_filter": number
 * }```
 *
 * Dimana ```T``` adalah objek yang dinamis
 */
export interface Pagination<T> {
  data: T[];
  has_next: boolean;
  has_prev: boolean;
  total: number;
  total_filter: number;
}

export interface PaginationSingle<T> {
  data: T;
  has_next: boolean;
  has_prev: boolean;
  total: number;
  total_filter: number;
}


export class PaginationClass<T> implements Pagination<T> {
  data: T[];
  has_next: boolean;
  has_prev: boolean;
  total: number;
  total_filter: number;

  constructor(pagination: Pagination<T>) {
    this.data = pagination.data;
    this.has_next = pagination.has_next;
    this.has_prev = pagination.has_prev;
    this.total = pagination.total;
    this.total_filter = pagination.total_filter;
  }
}

export class PaginationSingleClass<T> implements PaginationSingle<T> {
  data: T;
  has_next: boolean;
  has_prev: boolean;
  total: number;
  total_filter: number;

  constructor(pagination: PaginationSingle<T>) {
    this.data = pagination.data;
    this.has_next = pagination.has_next;
    this.has_prev = pagination.has_prev;
    this.total = pagination.total;
    this.total_filter = pagination.total_filter;
  }
}

