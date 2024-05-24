import {
  IsOptional,
  IsString,
  IsDateString,
  IsIn,
  IsArray,
  Validate,
} from 'class-validator';
import { HealthProblem } from '@core/entities/health-problem';
import { HealthProblemValidator } from './validators/health-problem-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientBody {
  @ApiProperty({
    description: 'client name',
    example: 'John Smith',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'birth date in ISO 8601 format',
    example: '1970-08-10',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @ApiProperty({
    description: 'gender of the client',
    example: 'M',
    enum: ['M', 'F'],
    required: false,
  })
  @IsIn(['M', 'F'])
  @IsOptional()
  gender?: string;

  @ApiProperty({
    description: 'array of health problem objects (name, degree)',
    example: [{ name: 'diabetes', degree: 6 }],
    required: false,
  })
  @Validate(HealthProblemValidator, { each: true })
  @IsArray()
  @IsOptional()
  healthProblems?: HealthProblem[];
}
