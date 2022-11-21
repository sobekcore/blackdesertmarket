import { HttpStatus, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { mockArgumentsHost, mockJson, mockStatus } from '@/mocks/arguments-host.mock';
import { NotFoundExceptionFilter } from '@/filters/not-found-exception.filter';
import { CoreModule } from '@/core.module';

describe('NotFoundExceptionFilter', () => {
  let notFoundExceptionFilter: NotFoundExceptionFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [NotFoundExceptionFilter],
    }).compile();

    notFoundExceptionFilter = module.get<NotFoundExceptionFilter>(NotFoundExceptionFilter);
  });

  it('should return response with proper structure on any exception', () => {
    const message: string = 'There is no resource available for given URL';

    notFoundExceptionFilter.catch(new NotFoundException(message), mockArgumentsHost);

    expect(mockStatus).toBeCalledWith(HttpStatus.NOT_FOUND);
    expect(mockJson).toBeCalledWith({ code: ControllerResponseCode.ERROR_INVALID_ROUTE, messages: [message] });
  });
});
