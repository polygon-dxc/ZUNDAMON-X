import { atom } from 'recoil';

export const audioDataState = atom<Record<string, File>>({
  key: 'audioDataState',
  default: {}, // { [start]: File }
});
