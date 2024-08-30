export interface ErrorResponse {
  message: string | object;
  statusCode: number;
  error: string;
}

export interface IGetById {
  id: number;
}

export interface IGetAll {
  page?: number;
  limit?: number;
}
