import * as React from 'react';
import { StaticRouter } from 'react-router';

import { RailsContext } from 'react-on-rails/node_package/lib/types';

const context = {};

import routes from '@src/SideMenuRoutes';

export default function SideMenuServerRouter(props: {
  railsContext: RailsContext
}) {
  return (
    <StaticRouter location={props.railsContext.location} context={context}>
      {routes}
    </StaticRouter>
  );
}
