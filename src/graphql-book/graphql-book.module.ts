import { Module } from '@nestjs/common';
import { GraphqlBookService } from './graphql-book.service';
import { GraphqlBookController } from './graphql-book.controller';
import { GraphqlBookResolver } from './resolvers/graphql-book.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './model/book.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
  ],
  providers: [GraphqlBookService, GraphqlBookResolver],
  controllers: [GraphqlBookController],
})
export class GraphqlBookModule {}
