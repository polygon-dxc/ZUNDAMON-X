import React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import '../tailwind.css';
import Popup from './Popup';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <Popup />
    </RecoilRoot>
  </React.StrictMode>
);
