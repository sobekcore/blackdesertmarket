import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockArgumentsHost, mockJson, mockStatus } from '@test/mocks/arguments-host.mock';
import { CoreModuleMock } from '@test/mocks/core-module.mock';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { AllExceptionsFilter } from '@/filters/all-exceptions.filter';

describe('AllExceptionsFilter', () => {
  let allExceptionsFilter: AllExceptionsFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModuleMock],
      providers: [AllExceptionsFilter],
    }).compile();

    allExceptionsFilter = module.get<AllExceptionsFilter>(AllExceptionsFilter);
  });

  it('should return response with proper structure on valid exception', () => {
    const message: string = 'AllExceptionsFilter should return response with proper structure on valid exception';

    allExceptionsFilter.catch(new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR), mockArgumentsHost);

    expect(mockStatus).toBeCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockJson).toBeCalledWith({ code: ControllerResponseCode.ERROR_INTERNAL, messages: [message] });
  });

  it('should return response with proper structure on invalid exception', () => {
    const message: string = 'Something went wrong on the server-side';

    allExceptionsFilter.catch(new HttpException({}, HttpStatus.INTERNAL_SERVER_ERROR), mockArgumentsHost);

    expect(mockStatus).toBeCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockJson).toBeCalledWith({ code: ControllerResponseCode.ERROR_INTERNAL, messages: [message] });
  });
});
