import {HttpHeaders} from "@angular/common/http";

export interface ErrorResponse {
  error: {
    code: number,
    error: string,
  }
  headers: HttpHeaders
  message: string
  name: string
  ok: boolean
  status: string
  url: string
}
