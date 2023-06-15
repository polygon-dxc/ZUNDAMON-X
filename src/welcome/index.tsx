import React from 'react';
import { createRoot } from 'react-dom/client';

import Welcome from './Welcome';

import '../tailwind.css';

createRoot(document.getElementById('root') as HTMLElement).render(<Welcome />);
