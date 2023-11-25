/*
 * Chrome拡張をインストールした時に表示されるページ
 */
import React, { ReactElement } from 'react';

const Welcome = (): ReactElement => {
  return (
    <div className="flex h-screen items-center justify-center text-5xl font-bold">
      <h1>Thank you for downloading!</h1>
      <p className="text-lg font-medium">
        This extension is under development. Please stay tuned for future updates!
      </p>
    </div>
  );
};

export default Welcome;
