import { atom } from 'recoil';

// 音声データの型
export const audioDataState = atom<Record<string, File>>({
  key: 'audioDataState',
  default: {}, // { [start]: File }
});
