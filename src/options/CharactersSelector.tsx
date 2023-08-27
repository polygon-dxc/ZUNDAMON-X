import React from 'react';
import { useRecoilState } from 'recoil';
import { selectedCharacterState, selectedStyleState } from './../atom';
import voiceStyleData from './../voice_style_data.json';
import { VoiceStyles } from '../types';
import characterImages from './../character_image_path.json';
import { useRef } from 'react';

const CharacterSelector = () => {
  //キャラクターの画像を取得
  const characterImagesData: Record<string, string> = characterImages.characterImages;

  // キャラクター&そのスタイルのstate管理
  const voiceStyles: typeof voiceStyleData = voiceStyleData;
  const [selectedCharacter, setSelectedCharacter] = useRecoilState<
    string | keyof typeof voiceStyleData
  >(selectedCharacterState);
  const [selectedStyle, setSelectedStyle] = useRecoilState(selectedStyleState);

  //キャラ選択時に自動スクロール
  const styleHeadingRef = useRef<HTMLParagraphElement | null>(null);

  //キャラクター選択時の処理
  const setClickedCharacter = (character: string) => {
    setSelectedCharacter(character);

    // キャラクターのスタイルのキーのリストを取得
    const characterStylesKeys = Object.keys(
      voiceStyleData[character as keyof typeof voiceStyleData]
    );

    // スタイルのキーのリストの最初の要素をデフォルトのスタイルとして選択
    if (characterStylesKeys && characterStylesKeys.length > 0) {
      setSelectedStyle(characterStylesKeys[0]);
    } else {
      setSelectedStyle(''); // キャラクターにスタイルがない場合はリセット
    }

    // スクロール処理
    if (styleHeadingRef.current) {
      styleHeadingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <p className="text-lg animate-tracking-in-expand">キャラクターを変更</p>
        <div>
          <p>現在のキャラ：{selectedCharacter}</p>
          <p>スタイル:{selectedStyle}</p>
        </div>
      </div>

      <div className="flex flex-wrap p-4 rounded-lg">
        {Object.keys(voiceStyleData).map((character) => (
          <div
            onClick={() => setClickedCharacter(character)}
            className={`relative max-w-8rem transition-all duration-300 cursor-pointer filter m-2 ${
              character === selectedCharacter
                ? 'bg-slate-100'
                : 'hover:grayscale-0 hover:bg-slate-100 hover:-translate-y-6'
            }`}
          >
            <figure>
              <div>
                <img
                  className="rounded-lg"
                  src={characterImagesData[character]}
                  alt={character}
                  draggable="false"
                />
              </div>
              <figcaption className="absolute px-4 text-lg text-white bottom-3.5">
                <p className="text-xs text-black bg-white bg-opacity-50 animate-tracking-in-expand">
                  {character}
                </p>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>

      <p className="text-lg animate-tracking-in-expand mb-3" ref={styleHeadingRef}>
        スタイルを選択
      </p>
      {selectedCharacter ? (
        <div>
          {Object.keys(voiceStyleData[selectedCharacter as keyof typeof voiceStyleData]).map(
            (style) => (
              <button
                type="button"
                onClick={() => setSelectedStyle(style)}
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                {style}
              </button>
            )
          )}
        </div>
      ) : (
        <p>キャラクターを選択してください</p>
      )}
    </div>
  );
};

export default CharacterSelector;
