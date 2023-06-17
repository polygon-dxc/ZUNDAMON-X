import React, { FC, useEffect, useState } from 'react';

import image1 from './../../public/images/zundamon_0001.png';
import image2 from './../../public/images/zundamon_0002.png';

type Props = {
  file: File | null;
};
const AudioAnalyzer: FC<Props> = ({ file }) => {
  const [number, setNumber] = useState(image1);
  useEffect(() => {
    if (!file) return;

    playFile();
  }, [file]);

  const playFile = () => {
    if (!file) return;

    const audioContext = new (window.AudioContext || window.AudioContext)();
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target) {
        const arrayBuffer = e.target.result as ArrayBuffer;

        audioContext.decodeAudioData(arrayBuffer, (buffer) => {
          const source = audioContext.createBufferSource();
          source.buffer = buffer;

          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 2048;

          source.connect(analyser);
          analyser.connect(audioContext.destination);
          source.onended = () => {
            setNumber(image1);
            source.stop();
            source.disconnect();
            clearInterval(interval);
            audioContext.close();
          };
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          source.start();
          const interval = setInterval(() => {
            analyser.getByteTimeDomainData(dataArray);
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
              const value = (dataArray[i] - 128) / 128;
              sum += value * value;
            }
            const rms = Math.sqrt(sum / bufferLength);
            if (rms >= 0.001) {
              setNumber(image2);
            } else {
              setNumber(image1);
            }
          }, 500);
        });
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <button onClick={playFile}>play</button>
      <img
        src={chrome.runtime.getURL(number)}
        style={{
          height: '100px',
        }}
      />
    </div>
  );
};

export default AudioAnalyzer;
