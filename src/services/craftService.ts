import { CRAFT_TYPE } from '@prisma/client';
import craftModel from '../models/craftModel';
import slugify from 'slugify';
import repositoryModel from '../models/repositoryModel';

const getCraftType = (type: string) => {
  switch (type) {
    case CRAFT_TYPE.MODIFIER:
      return CRAFT_TYPE.MODIFIER;
    case CRAFT_TYPE.TEMPLATE:
      return CRAFT_TYPE.TEMPLATE;
    default:
      return CRAFT_TYPE.PROMPT;
  }
}

const getCrafts = async (
  externalId: string,
  search_term: string,
  languages_ids: number[],
  repositories_ids: number[],
  technologies_ids: number[],
  crafts_types: string[]
) => {
  const types = crafts_types.map(t => getCraftType(t));

  return await craftModel.getCrafts(
    externalId,
    search_term,
    languages_ids,
    repositories_ids,
    technologies_ids,
    types
  );
};

const createPrompt = async (
  externalId: string,
  name: string,
  description: string,
  content: string,
  languageId: number,
  repositoryId: number,
  technologyId: number,
  providerId: number,
  craftingIds: number[]
) => {
  const slug = slugify(name);
  const createdAt = new Date();

  return await craftModel.createCraft(
    externalId,
    name,
    slug,
    description,
    content,
    createdAt,
    CRAFT_TYPE.PROMPT,
    languageId,
    repositoryId,
    technologyId,
    craftingIds,
    providerId
  )
}

const createModifier = async (
  externalId: string,
  name: string,
  description: string,
  content: string,
  languageId: number,
  repositoryId: number,
  technologyId: number,
) => {
  const slug = slugify(name);
  const createdAt = new Date();

  const isUserInRepository = await repositoryModel.isUserInRepository(externalId, repositoryId);

  if (!isUserInRepository) {
    throw new Error('This user does not belong to this repository');
  }

  return await craftModel.createCraft(
    externalId,
    name,
    slug,
    description,
    content,
    createdAt,
    CRAFT_TYPE.PROMPT,
    languageId,
    repositoryId,
    technologyId
  )
}

const deleteCraft = async (id: number) => {
  return await craftModel.deleteCraft(id);
}

export default {
  getCrafts,
  createPrompt,
  createModifier,
  deleteCraft
}