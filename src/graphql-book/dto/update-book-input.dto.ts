import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';
import { createBookDto } from './create-book-input.dto';

@InputType()
export class updateBookDto extends PartialType(createBookDto) {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  id: string;
}
