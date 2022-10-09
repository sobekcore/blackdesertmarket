import { ControllerResponseCode } from '@/enums/controller-response-code';

export interface ControllerResponse<T> {
  code: ControllerResponseCode;
  data: T;
}
