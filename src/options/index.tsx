import React from 'react';
import { createRoot } from 'react-dom/client';

import Options from './Options';

import '../tailwind.css';
import { RecoilRoot } from 'recoil';

createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <React.StrictMode>
      <Options />
    </React.StrictMode>
  </RecoilRoot>
);
