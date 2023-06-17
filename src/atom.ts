import { atom } from 'recoil';

// 音声データの型
export const audioDataState = atom<{
  src: string;
  frequencyData: Uint8Array;
  subtitle: string;
} | null>({
  key: 'audioDataState',
  default: null, // { [start]: File }
});
