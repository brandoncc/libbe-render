import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import routes from '@src/SideMenuRoutes';

export default () => {
  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  );
};
