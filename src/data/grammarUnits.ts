import { adjectiveGarden } from './units/adjectiveGarden';
import { nounCity } from './units/nounCity';
import { prepositionValley } from './units/prepositionValley';
import { pronounIsland } from './units/pronounIsland';
import { sentenceMaze } from './units/sentenceMaze';
import { sentenceVillage } from './units/sentenceVillage';
import { tenseForest } from './units/tenseForest';
import { verbTown } from './units/verbTown';

export const grammarUnits = [
  sentenceVillage,
  nounCity,
  pronounIsland,
  verbTown,
  tenseForest,
  adjectiveGarden,
  prepositionValley,
  sentenceMaze
].sort((a, b) => a.order - b.order);

export const allLessons = grammarUnits.flatMap((unit) => unit.lessons);

export const comingSoonUnits: string[] = [];
