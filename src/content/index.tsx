import React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import Content from './Content';

const component = (
  <RecoilRoot>
    <Content />
  </RecoilRoot>
);

const container = document.createElement('my-extension-root');
document.body.append(container);
createRoot(container).render(component);
