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

export const emotionTypeAtom = atom<emotionType>({
  key: 'emotionTypeAtom',
  default: '通常',
});
