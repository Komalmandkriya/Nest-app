import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlBookService } from '../graphql-book.service';
import { Book } from '../model/book.model';
import { createBookDto } from '../dto/create-book-input.dto';
import { updateBookDto } from '../dto/update-book-input.dto';

@Resolver(() => Book)
export class GraphqlBookResolver {
  constructor(private readonly bookService: GraphqlBookService) {}

  @Query(() => [Book], { name: 'getAllBooks' })
  async findAllBooks() {
    return this.bookService.findAllBooks();
  }

  @Query(() => Book, { name: 'getBookById' })
  async findeBookById(@Args('id', { type: () => String }) id: string) {
    return this.bookService.findOneBook(id);
  }

  @Mutation(() => Book)
  async createBook(@Args('input') input: createBookDto) {
    return this.bookService.createBook(input);
  }
  @Mutation(() => Book)
  async updateBook(@Args('input') input: updateBookDto) {
    return this.bookService.updateBook(input);
  }

  @Mutation(() => Boolean)
  async deleteBook(@Args('id') id: string) {
    return this.bookService.removeBook(id);
  }
}
