import {
  IsNotEmpty,
  IsDateString,
  IsIn,
  IsArray,
  Validate,
} from 'class-validator';
import { HealthProblem } from '@core/entities/health-problem';
import { HealthProblemValidator } from './validators/health-problem-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientBody {
  @ApiProperty({
    description: 'client name',
    example: 'Jason Junior',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'birth date in ISO 8601 format',
    example: '1990-08-10',
  })
  @IsDateString()
  birthDate: string;

  @ApiProperty({
    description: 'gender of the client',
    example: 'M',
    enum: ['M', 'F'],
  })
  @IsIn(['M', 'F'])
  gender: string;

  @ApiProperty({
    description: 'array of health problem objects (name, degree)',
    example: [
      { name: 'asthma', degree: 3 },
      { name: 'diabetes', degree: 6 },
    ],
  })
  @Validate(HealthProblemValidator, { each: true })
  @IsArray()
  healthProblems: HealthProblem[];
}
