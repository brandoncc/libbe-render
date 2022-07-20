import ReactOnRails from 'react-on-rails';

import MobileNav from '@components/menus/MobileNav';
import PlansCarousel from '@components/carousels/Plans';
import SideMenuRouter from '@src/SideMenuRouter';

ReactOnRails.register({
  MobileNav,
  PlansCarousel,
  SideMenuRouter
});
