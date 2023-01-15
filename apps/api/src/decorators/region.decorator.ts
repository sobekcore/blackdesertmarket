import { BadRequestException, ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { RegionCode } from '@/enums/region.enum';
import { RegionContext } from '@/contexts/region.context';

export const Region = createParamDecorator((data: RegionContext, ctx: ExecutionContext): RegionContext => {
  const request: Request = ctx.switchToHttp().getRequest();
  const region: RegionCode = request.query.region as RegionCode;

  if (!Object.values(RegionCode).includes(region)) {
    throw new BadRequestException('Provided region is invalid');
  }

  return new RegionContext(region);
});
