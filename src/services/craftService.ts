import { CRAFT_TYPE } from '@prisma/client';
import craftModel from '../models/craftModel';

const getCrafts = async (
  userId: string,
  search_term: string,
  languages_ids: number[],
  repositories_ids: number[],
  technologies_ids: number[],
  crafts_types: string[]
) => {
  const types = crafts_types.map(t => {
    switch (t) {
      case CRAFT_TYPE.MODIFIER:
        return CRAFT_TYPE.MODIFIER;
      case CRAFT_TYPE.TEMPLATE:
        return CRAFT_TYPE.TEMPLATE;
      default:
        return CRAFT_TYPE.PROMPT;
    }
  })

  return await craftModel.getCrafts(
    userId,
    search_term,
    languages_ids,
    repositories_ids,
    technologies_ids,
    types
  );
};

export default {
  getCrafts
}