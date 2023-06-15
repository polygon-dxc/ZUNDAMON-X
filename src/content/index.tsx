import React from 'react';
import { createRoot } from 'react-dom/client';

import Content from './Content';

// プロキシストアの準備処理が必要な場合はここに記述する

const component = <Content />;

const container = document.createElement('my-extension-root');
document.body.append(container);
createRoot(container).render(component);
