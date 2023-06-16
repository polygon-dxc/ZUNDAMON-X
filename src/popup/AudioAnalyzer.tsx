import React, { FC, useEffect, useState } from 'react';

import image1 from './../../public/images/zundamon_content0000.png';
import image2 from './../../public/images/zundamon_content0001.png';

type Props = {
  src: string;
};
const AudioAnalyzer: FC<Props> = ({ src }) => {
  const [number, setNumber] = useState(image1);
  useEffect(() => {
    if (!src) return;

    playElement();
  }, [src]);

  const playElement = () => {
    if (!src) return;

    // Audio要素を取得

    // AudioContextを作成
    const audioContext = new (window.AudioContext || window.AudioContext)();

    // AnalyserNodeを作成
    const analyser = audioContext.createAnalyser();

    // Audio要素とAnalyserNodeを接続
    const audio = new Audio();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    // 音声解析を開始
    function analyzeAudio() {
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      // 解析結果を使用して何らかの処理を行う
      // ここでは簡単に周波数スペクトルをコンソールに出力しています
      // console.log(dataArray);
    }

    audio.src = src;
    audio.onload = () => {
      console.log('playing');
      audio;
    };
    audio.play();
    // 音声が再生されるたびに解析を行う
    audio.addEventListener('play', () => {
      setInterval(analyzeAudio, 100); // 一定間隔で解析するために定期的に呼び出す
    });

    // const audioContext = new (window.AudioContext || window.AudioContext)();
    // const reader = new FileReader();

    // reader.onload = (e) => {
    //   if (e.target) {
    //     const arrayBuffer = e.target.result as ArrayBuffer;

    //     audioContext.decodeAudioData(arrayBuffer, (buffer) => {
    //       const source = audioContext.createBufferSource();
    //       source.buffer = buffer;

    //       const analyser = audioContext.createAnalyser();
    //       analyser.fftSize = 2048;

    //       source.connect(analyser);
    //       analyser.connect(audioContext.destination);
    //       source.onended = () => {
    //         setNumber(image1);
    //         source.stop();
    //         source.disconnect();
    //         clearInterval(interval);
    //         audioContext.close();
    //       };
    //       const bufferLength = analyser.frequencyBinCount;
    //       const dataArray = new Uint8Array(bufferLength);

    //       source.start();
    //       const interval = setInterval(() => {
    //         analyser.getByteTimeDomainData(dataArray);
    //         let sum = 0;
    //         for (let i = 0; i < bufferLength; i++) {
    //           const value = (dataArray[i] - 128) / 128;
    //           sum += value * value;
    //         }
    //         const rms = Math.sqrt(sum / bufferLength);
    //         if (rms >= 0.001) {
    //           setNumber(image2);
    //         } else {
    //           setNumber(image1);
    //         }
    //       }, 500);
    //     });
    //   }
  };

  // reader.readAsArrayBuffer(file);

  return (
    <div>
      {/* <button onClick={playFile}>play</button> */}
      <div style={{ width: '200px', height: '400px', zIndex: 9999 }}>
        <div
          style={{
            position: 'relative',
            zIndex: 100,
            width: '120px',
            height: '180px',
            display: 'flex',
            top: '100px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'absolute', zIndex: 0, top: '0px' }}>
            <div>
              <div
                style={{
                  width: '104px',
                  height: '108px',
                  borderRadius: '200px',
                  border: '8px solid black',
                  boxShadow: '0px 10px 10px -6px rgba(5, 4, 4, 0.3)',
                  top: 0,
                  backgroundColor: '#E1ECC8',
                }}
              ></div>
            </div>
          </div>

          <div style={{ zIndex: 2, top: '64px', position: 'absolute' }}>
            <div style={{ width: '120px', height: '60px', position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  width: '104px',
                  height: '160px',
                  position: 'absolute',
                  borderBottomLeftRadius: '200px',
                  borderBottomRightRadius: '200px',
                  border: '8px solid rgba(0, 0, 0, 0)',
                  bottom: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={chrome.runtime.getURL(number)}
                  style={{
                    borderBottomLeftRadius: '100px',
                    borderBottomRightRadius: '100px',
                    height: '300px',
                    position: 'absolute',
                    top: 0,
                    zIndex: 1,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioAnalyzer;
