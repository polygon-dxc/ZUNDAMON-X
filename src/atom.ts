import { atom } from 'recoil';

// 音声データの型
export const audioDataState = atom<HTMLAudioElement | null>({
  key: 'audioDataState',
  default: null, // { [start]: File }
});
