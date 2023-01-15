import { ControllerResponseCode } from '@/enums/controller-response.enum';

export interface ControllerResponse<T> {
  code: ControllerResponseCode;
  data: T;
}
