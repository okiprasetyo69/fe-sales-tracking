// Created by supan adit pratama<supan.aditp@xenos.co.id>

/**
 * Default response digunakan untuk model umum hasil response dari api,
 * hasil dari backend akan selalu
 *
 *  {
 *  "data": T,
 *  "error": number,
 *  "message": string
 *  }
 *
 * Dimana `T` adalah objek yang dinamis
 */
export interface DefaultResponse<T> {
  /**
   * Api akan memberikan result dalam key "data" dengan objek yang telah ditentukan pada `T`
   */
  data: T;
  /**
   * Api akan memberikan bahwa data yang diterima error dengan memberikan nomor 1 pada variabel "error"
   */
  error: number;
  /**
   * Hasil error akan ditampilkan dimasukan kedalam key "message"
   */
  message: string;
}

export class DefaultResponseClass<T> implements DefaultResponse<T> {
  data: T;
  error: number;
  message: string;

  constructor(response: DefaultResponse<T>) {
    this.data = response.data;
    this.error = response.error;
    this.message = response.message;
  }
}
