export type videoidtype = {
  videoId: string;
};

export type currentTimeType = {
  currentTime: number;
};

//JSONでは、小数点を含む数値はすべてNumber型
export type getTranscriptResponseType = {
  text: string;
  start: number;
  duration: number;
};

export type audioDataObject = {
  [startTime: string]: File;
};
