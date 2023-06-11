export type videoidtype = {
  videoId: string;
};

//JSONでは、小数点を含む数値はすべてNumber型
export type getTranscriptResponseType = {
  text: string;
  start: number;
  duration: number;
};
