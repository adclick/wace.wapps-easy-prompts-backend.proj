import { CRAFT_TYPE } from '@prisma/client';
import craftModel from '../models/craftModel';
import slugify from 'slugify';

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
  userId: string,
  search_term: string,
  languages_ids: number[],
  repositories_ids: number[],
  technologies_ids: number[],
  crafts_types: string[]
) => {
  const types = crafts_types.map(t => getCraftType(t));

  return await craftModel.getCrafts(
    userId,
    search_term,
    languages_ids,
    repositories_ids,
    technologies_ids,
    types
  );
};

const createPrompt = async (
  userId: string,
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
    userId,
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
  userId: string,
  name: string,
  description: string,
  content: string,
  languageId: number,
  repositoryId: number,
  technologyId: number,
) => {
  const slug = slugify(name);
  const createdAt = new Date();

  return await craftModel.createCraft(
    userId,
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

export default {
  getCrafts,
  createPrompt,
  createModifier
}