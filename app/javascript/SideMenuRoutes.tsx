import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import SiteMenu from '@src/components/menus/SiteMenu';

export default (
  <Switch>
    <Route path='/' component={SiteMenu} />
  </Switch>
);
