import * as React from 'react';
import SideMenu from './SideMenu';

const menuItems = require("@libbe_configs/side_menus/site_menu.json");
const SiteMenu = () => <SideMenu items={menuItems} />;

export default SiteMenu;
