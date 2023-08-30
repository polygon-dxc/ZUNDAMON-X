import React from 'react';
import { useRecoilState } from 'recoil';
import { selectedCharacterState, selectedIdState, selectedStyleState } from './../atom';
import voiceStyleData from './../voice_style_data.json';
import { VoiceStyles } from '../types';
import characterImages from './../character_image_path.json';
import { useRef } from 'react';

const CharacterSelector = () => {
  //キャラクターの画像を取得
  const characterImagesData: Record<string, string> = characterImages.characterImages;

  // キャラクター&そのスタイルのstate管理
  const voiceStyles: VoiceStyles = voiceStyleData;

  const [selectedCharacter, setSelectedCharacter] = useRecoilState<
    string | keyof typeof voiceStyleData
  >(selectedCharacterState);
  const [selectedStyle, setSelectedStyle] = useRecoilState(selectedStyleState);
  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);

  //キャラクター選択時の処理
  const setClickedCharacter = (character: string) => {
    setSelectedCharacter(character);

    // キャラクターのスタイルのキーのリストを取得
    const characterStylesKeys = Object.keys(
      voiceStyleData[character as keyof typeof voiceStyleData]
    );

    // スタイルのキーのリストの最初の要素をデフォルトのスタイルとして選択
    let defaultStyle = '';
    if (characterStylesKeys && characterStylesKeys.length > 0) {
      defaultStyle = characterStylesKeys[0];
      setSelectedStyle(defaultStyle);
    } else {
      setSelectedStyle(''); // キャラクターにスタイルがない場合はリセット
    }

    // IDを取得してstateを更新
    const id = voiceStyles[character as keyof typeof voiceStyleData][defaultStyle];
    setSelectedId(id);

    // スクロール処理
    document.documentElement.style.scrollBehavior = 'smooth';
    window.scrollTo(0, 40);
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

      <p className="text-lg animate-tracking-in-expand mb-3">スタイルを選択</p>
      {selectedCharacter ? (
        <div>
          {Object.keys(voiceStyleData[selectedCharacter as keyof typeof voiceStyleData]).map(
            (style) => (
              <button
                type="button"
                onClick={() => {
                  setSelectedStyle(style);
                  const id = voiceStyles[selectedCharacter as keyof typeof voiceStyleData][style];
                  setSelectedId(id);
                }}
                className={`py-2.5 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none rounded-full focus:ring-4 text-center 
                  ${
                    selectedStyle === style
                      ? 'text-white bg-green-700 hover:bg-green-800 focus:ring-green-300'
                      : 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200 '
                  }`}
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
