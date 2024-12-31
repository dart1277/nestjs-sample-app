import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const CustomContextData = createParamDecorator(
  (data: any, executionContext: ExecutionContext) => {
    return 'Param decorator custom value';
  },
);
