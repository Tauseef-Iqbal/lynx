import { ISocialMedia } from 'src/modules/company-profile/interfaces';
import { isValidSocialMediaUrl } from './basic.utils';
import { dataSource } from 'src/typeorm/orm.config';
import { EntityTarget, ObjectLiteral } from 'typeorm';

export function validateAndTransformSocialMedia(value: any): ISocialMedia | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const validKeys: (keyof ISocialMedia)[] = ['linkedin', 'facebook', 'youtube', 'instagram'];
  const transformedObject: ISocialMedia = {};

  for (const key of validKeys) {
    if (key in value) {
      const url = value[key];
      if (typeof url !== 'string' || !isValidSocialMediaUrl(url, key)) {
        throw new Error(`Invalid URL for ${key}.`);
      }
      transformedObject[key] = url;
    }
  }

  return transformedObject;
}

export async function getEntityProgress(entity: EntityTarget<ObjectLiteral>, record: ObjectLiteral) {
  !dataSource.isInitialized && (await dataSource.initialize());
  const repository = dataSource.getRepository(entity);
  const metadata = repository.metadata;
  const columns = metadata.columns;

  const excludedFields = ['id', 'createdAt', 'updatedAt', 'isDeleted'];

  const filteredColumns = columns.filter((column) => {
    return !excludedFields.includes(column.propertyName) && !column.relationMetadata;
  });

  const notNullOrEmptyCount = filteredColumns.reduce((count, column) => {
    const value = record[column.propertyName];
    if (value !== null && value !== '' && value !== undefined && !(Array.isArray(value) && value.length === 0)) {
      return count + 1;
    }
    return count;
  }, 0);

  const progress = filteredColumns.length === 0 ? 0 : (notNullOrEmptyCount / filteredColumns.length) * 100;
  return parseFloat(progress.toFixed(2));
}
