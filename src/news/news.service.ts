import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { CreateNewsDto } from './dto/create-news.dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {

  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) { }

  async create(createNewsDto: CreateNewsDto) {
    const { description, idUser, image, title } = createNewsDto;

    const news = await this.newsRepository.save({
      description,
      idUser,
      image,
      title,
    });

    return news;
  }

  findAll() {
    return this.newsRepository.find();
  }
}
