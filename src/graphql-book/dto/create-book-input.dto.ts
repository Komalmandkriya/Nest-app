import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class createBookDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  // @Field({ nullable: true })
  // @IsString()
  // decription: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  author: string;
}
