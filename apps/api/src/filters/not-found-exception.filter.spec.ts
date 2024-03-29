import { HttpStatus, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockArgumentsHost, mockJson, mockStatus } from '@test/mocks/arguments-host.mock';
import { CoreModuleMock } from '@test/mocks/core-module.mock';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { NotFoundExceptionFilter } from '@/filters/not-found-exception.filter';

describe('NotFoundExceptionFilter', () => {
  let notFoundExceptionFilter: NotFoundExceptionFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModuleMock],
      providers: [NotFoundExceptionFilter],
    }).compile();

    notFoundExceptionFilter = module.get<NotFoundExceptionFilter>(NotFoundExceptionFilter);
  });

  it('should return response with proper structure on any exception', () => {
    const message: string = 'There is no resource available for given URL';

    notFoundExceptionFilter.catch(new NotFoundException(message), mockArgumentsHost);

    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockJson).toHaveBeenCalledWith({ code: ControllerResponseCode.ERROR_INVALID_ROUTE, messages: [message] });
  });
});
