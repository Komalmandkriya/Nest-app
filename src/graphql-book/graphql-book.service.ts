import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './model/book.model';
import { Model } from 'mongoose';
import { createBookDto } from './dto/create-book-input.dto';
import { updateBookDto } from './dto/update-book-input.dto';

@Injectable()
export class GraphqlBookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}
  async createBook(input: createBookDto): Promise<Book> {
    const created = new this.bookModel(input);
    return created.save();
  }
  async findAllBooks(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }
  async findOneBook(id: string): Promise<Book> {
    const book = await this.bookModel.findById({ _id: id }).exec();
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }
  async updateBook(input: updateBookDto): Promise<Book> {
    const exixtingBook = await this.bookModel.findById(input.id).exec();
    if (!exixtingBook) throw new NotFoundException('Book Not Found');
    Object.assign(exixtingBook, input);
    return exixtingBook.save();
  }
  async removeBook(id: string): Promise<Boolean> {
    const result = await this.bookModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Book Not Found');
    return true;
  }
}
