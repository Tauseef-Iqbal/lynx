import { SetMetadata } from '@nestjs/common';

export const RateLimit = (limitData: LimitDataI) => SetMetadata('limitData', limitData);
export const SkipRateLimit = (skip: boolean) => SetMetadata('skip', skip);

export interface LimitDataI {
  ipLimit: number;
  ipTTL: number;
}
