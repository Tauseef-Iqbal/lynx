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
    const { page, limit, cp_id } = inputParams;

    const queryOptions: any = {
      skip: (page - 1) * limit,
      take: limit,
      relations: options?.relations,
    };

    if (cp_id) {
      queryOptions.where = { companyProfile: { id: cp_id } };
    }

    const [data, count] = await this.repository.findAndCount(queryOptions);

    const totalCount = await this.repository.count({ where: queryOptions.where });
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

  async findManyByFilter(filter: any = {}, options: any = {}): Promise<T[]> {
    return this.repository.find({ where: { ...filter } as any, relations: options?.relations });
  }

  async findByRelationFilters(
    filter: Record<string, any> = {},
    options: {
      relations?: Record<string, string>;
      relationFilters?: Record<string, { condition: string; params: Record<string, any> }>;
      bulkFetch?: boolean;
    } = {},
  ): Promise<T[] | T | null> {
    const queryBuilder = this.repository.createQueryBuilder('entity');

    Object.keys(filter).forEach((key) => {
      if (typeof filter[key] === 'object' && filter[key] !== null) {
        Object.keys(filter[key]).forEach((nestedKey) => {
          queryBuilder.andWhere(`entity.${key}.${nestedKey} = :${key}_${nestedKey}`, {
            [`${key}_${nestedKey}`]: filter[key][nestedKey],
          });
        });
      } else {
        queryBuilder.andWhere(`entity.${key} = :${key}`, { [key]: filter[key] });
      }
    });

    if (options.relations) {
      Object.entries(options.relations).forEach(([relation, alias]) => {
        if (options.relationFilters && options.relationFilters[relation]) {
          const relationFilter = options.relationFilters[relation];
          queryBuilder.leftJoinAndSelect(`entity.${relation}`, alias, relationFilter.condition, relationFilter.params);
        } else {
          queryBuilder.leftJoinAndSelect(`entity.${relation}`, alias);
        }
      });
    }

    return options.bulkFetch ? queryBuilder.getMany() : queryBuilder.getOne();
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
