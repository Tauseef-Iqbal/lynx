import { Repository } from 'typeorm';
import { IGetAll } from '../interfaces';

export class BaseTypeOrmCrudService<T> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async create(inputParams: T): Promise<T> {
    const data = await this.repository.create(inputParams);
    return await this.repository.save(data);
  }

  async findAll(inputParams: IGetAll, options?: any): Promise<{ data: T[]; count: number; totalCount: number; totalPages: number }> {
    const { page, limit } = inputParams;
    const [data, count] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: options?.relations,
    });

    const totalCount = await this.repository.count();
    const totalPages = Math.ceil(totalCount / limit);

    return { data, count, totalCount, totalPages };
  }

  async findById(id: number, options?: any): Promise<T> {
    const data = await this.repository.findOne({ where: { id, isDeleted: false } as any, relations: options?.relations });
    if (!data) throw new Error(`${this.repository.metadata.name} not found`);
    return data;
  }

  async findByFilter(filter: any = {}, options: any = {}): Promise<T> {
    return this.repository.findOne({ where: { ...filter } as any, relations: options?.relations });
  }

  async update(id: number, params: T): Promise<T> {
    const existingData = await this.findById(id);
    const newData = this.repository.merge(existingData, params);
    return this.repository.save(newData);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
