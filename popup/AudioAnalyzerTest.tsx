import React, { useState } from 'react';

import AudioAnalyzer from './AudioAnalyzer';

const AudioAnalyzerTest = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <AudioAnalyzer file={file} />
    </div>
  );
};

export default AudioAnalyzerTest;
