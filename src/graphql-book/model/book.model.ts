import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class Book {
  @Field(() => ID)
  _id!: string;

  @Prop({ type: String, required: true })
  @Field()
  title!: string;

  @Prop({ type: String })
  @Field({ nullable: true })
  description?: string;

  @Prop({ type: String, required: true })
  @Field()
  author!: string;
}

export type BookDocument = Book & Document;
export const BookSchema = SchemaFactory.createForClass(Book);
