import modifier from '../models/modifier';

const getModifiersByPromptId = async (userId: string, promptId: number) => {
  const modifiers = await modifier.getModifiersByPromptId(promptId);

  return {
    modifiers
  }
};

export default {
  getModifiersByPromptId
}