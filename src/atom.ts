import { atom } from 'recoil';
import { emotionType } from './types';

// 音声データの型
export const audioDataState = atom<{
  src: string;
  frequencyData: Uint8Array;
  subtitle: string;
} | null>({
  key: 'audioDataState',
  default: null, // { [start]: File }
});

// 音声スタイルの型 from voice_style_data.json
type Character = string;
type Style = string;

export const selectedCharacterState = atom<Character>({
  key: 'selectedCharacterState',
  default: 'ずんだもん',
});

export const selectedStyleState = atom<Style>({
  key: 'selectedStyleState',
  default: '',
});

export const selectedIdState = atom<number>({
  key: 'selectedIdState',
  default: 3,
});

//感情分析の型
export const emotionTypeAtom = atom<emotionType>({
  key: 'emotionTypeAtom',
  default: '通常',
});
