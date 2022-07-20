import ReactOnRails from 'react-on-rails';

import withSSR from '@components/withSSR';

import MobileNav from '@components/menus/MobileNav';
import SideMenuRouter from '@src/SideMenuServerRouter';

ReactOnRails.register({
  MobileNav: withSSR(MobileNav),
  SideMenuRouter: withSSR(SideMenuRouter),
});
