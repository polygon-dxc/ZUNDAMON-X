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

// 音声スタイルの型 from voice_style_data.json
type Character = string;
type Style = string;

export const selectedCharacterState = atom<Character>({
  key: 'selectedCharacterState',
  default: '',
});

export const selectedStyleState = atom<Style>({
  key: 'selectedStyleState',
  default: '',
});
