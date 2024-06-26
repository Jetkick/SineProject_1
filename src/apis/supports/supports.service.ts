import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Support } from './entities/support.entity';
import {
  ISupportsServiceCreate,
  ISupportsServiceDelete,
  ISupportsServiceFindOneByTitle,
  ISupportsServiceFindSupport,
  ISupportsServiceUpdate,
} from './interfaces/supports-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SupportsService {
  constructor(
    @InjectRepository(Support)
    private readonly supportsRepository: Repository<Support>, //
  ) {}

  findOneByTitle({ title }: ISupportsServiceFindOneByTitle): Promise<Support> {
    return this.supportsRepository.findOne({ where: { title: title } });
  }

  async fetchSupports({
    category,
    subCategory,
  }: ISupportsServiceFindSupport): Promise<Support[]> {
    const result = await this.supportsRepository.find({
      where: { category: category, subCategory: subCategory },
    });

    return result;
  }

  async createSupport({
    createSupportInput,
  }: ISupportsServiceCreate): Promise<Support> {
    const { category, subCategory, title, text } = createSupportInput;

    const isTitle = await this.findOneByTitle({ title });

    if (isTitle) throw new ConflictException('이미 등록된 제목 입니다!');

    return this.supportsRepository.save({
      category,
      subCategory,
      title,
      text,
    });
  }

  async updateSupport({
    supportId,
    updateSupportInput,
  }: ISupportsServiceUpdate): Promise<Support> {
    const support = await this.supportsRepository.findOne({
      where: { id: supportId },
    });

    if (!support)
      throw new UnprocessableEntityException('존재하지 않는 ID 입니다.');

    return this.supportsRepository.save({
      ...support,
      ...updateSupportInput,
    });
  }

  async deleteSupport({ supportId }: ISupportsServiceDelete): Promise<boolean> {
    const result = await this.supportsRepository.softDelete({
      id: supportId,
    });

    return result.affected ? true : false;
  }
}
