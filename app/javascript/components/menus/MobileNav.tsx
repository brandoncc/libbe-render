import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { stylesheet } from 'typestyle';
import classnames from 'classnames';
import { RailsContext } from 'react-on-rails/node_package/lib/types';
import * as csx from 'csstips';

import ErrorBoundary from '@components/ErrorBoundary';

import { linkBlueText } from '@styles/general';

type TMenuSectionProps = {
  children: React.ReactNode,
  className?: string
};

type TMenuItemsProps = {
  children: React.ReactNode,
  className?: string
};

type TSpacerItemProps = {
  heightMultiplier: number
};

type TMenuNavigatorProps = {
  text: string,
  onClick?: (Text: string) => void,
  onSetSubmenu?: (Text: string) => void,
  active?: boolean
};

type TTopLevelMenuProps = {
  onSetSubmenu: (Text: string) => void,
  currentLocation: string
};

type TMobileNavProps = {
  railsContext: RailsContext
};

type MenuItemType = {
  currentLocation: string;
  href: string;
  indent: number;
  text: string;
  bold?: boolean;
  bullet?: boolean;
  short?: boolean;
  spacer?: number;
}

type MenuSchema = Record<string, MenuItemType[]>;

const menuItems: MenuSchema = require('@libbe_configs/mobile_nav_menu.json');
const menuWidth = 250;
const indentationPx = 20;

// This controls the font size for top level and sub menus
const MENU_FONT_SIZE = 14;

// With a font size of 14px, 28 results in a gap of 18px and 22 results in a gap
// of 12.
const STANDARD_LINE_HEIGHT = 28;
const SHORT_LINE_HEIGHT = 28;

// The menu config can specify any number for the spacer, which gets multiplied
// by this value and is the resulting number of pixels used for the spacer
// height.
const SPACER_BASE_HEIGHT = 10;

const MENU_BOTTOM_MARGIN = '4em';

const css = stylesheet({
  container: {
    content: `''`,
    position: 'fixed',
    background: 'rgba(0, 0, 0, 0.0)',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 2,
    overflow: 'hidden',
    transition: 'background .3s ease-in-out',
    fontSize: MENU_FONT_SIZE,
    lineHeight: `${STANDARD_LINE_HEIGHT}px`,

    $nest: {
      '@media (min-width: 725px)': {
        display: 'none'
      },
      '&.open': {
        transition: 'background .5s ease-in-out',
        background: 'rgba(0, 0, 0, 0.5)'
      },
      '& li, & a': {
        fontSize: MENU_FONT_SIZE,
        lineHeight: `${STANDARD_LINE_HEIGHT}px`
      },
      '& a': {
        cursor: 'pointer'
      }
    }
  },
  menu: {
    background: 'white',
    textAlign: 'left',
    top: 0,
    bottom: 0,
    width: menuWidth,
    left: 0,
    transform: `translateX(-${menuWidth}px)`,
    position: 'absolute',
    overflowY: 'auto',
    overflowX: 'hidden',
    transition: 'transform .1s ease-in-out,-webkit-transform .1s ease-in-out',
    '-webkit-overflow-scrolling': 'touch',

    $nest: {
      '&.open': {
        transition:
          'transform .5s ease-in-out,-webkit-transform .5s ease-in-out',
        transform: 'translateX(0)'
      },
      '& div': {
        transition:
          'transform .1s ease-in-out,-webkit-transform .1s ease-in-out'
      },
      '&:not(.show-sub) div:nth-of-type(2)': {
        transform: `translateX(${menuWidth}px)`
      },
      '&.show-sub > span': {
        transform: `translateX(-${menuWidth}px)`
      },
      '&.show-sub > div:first-of-type': {
        transform: `translateX(-${menuWidth}px)`
      },
      '&.show-sub > div:nth-of-type(2)': {
        transform: `translateX(0)`
      }
    }
  },
  topLevelMenu: {
    $nest: {
      '& li': {
        cursor: 'pointer'
      }
    }
  },
  section: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'block',
    padding: 20,

    $nest: {
      '& *:last-child': {
        marginBottom: MENU_BOTTOM_MARGIN
      }
    }
  },
  menuItem: {
    listStyleType: 'none'
  },
  activeItem: {
    $nest: {
      '&, & a': {
        textDecoration: 'underline'
      }
    }
  },
  spacerItem: {
    fontSize: '0 !important',
    lineHeight: '0 !important'
  },
  link: {
    color: 'inherit !important'
  },
  navigationLink: {
    color: linkBlueText,
    fontWeight: 'bold',
    lineHeight: `${STANDARD_LINE_HEIGHT}px`,
    position: 'relative',

    $nest: {
      '&::after': {
        content: `'>'`,
        display: 'block',
        position: 'absolute',
        right: 0,
        top: 0
      }
    }
  },
  showTopLevel: {
    paddingRight: 2,
    cursor: 'pointer',
    position: 'absolute',
    top: 5,
    left: `calc((2 * ${menuWidth}px) - 45px)`,
    transition: 'transform .1s ease-in-out,-webkit-transform .1s ease-in-out',
    fontWeight: 'bold',
    zIndex: 1,
    fontSize: 14,
    lineHeight: 2.14,
    borderRadius: 5,
    height: 25,
    width: 25,
    textAlign: 'center'
  },
  indent1: {
    marginLeft: indentationPx
  },
  indent2: {
    marginLeft: indentationPx * 2
  },
  indent3: {
    marginLeft: indentationPx * 3
  },
  short: {
    $nest: {
      '&, & a': {
        lineHeight: `${SHORT_LINE_HEIGHT}px !important`
      }
    }
  },
  bold: {
    $nest: {
      '&, & a': {
        fontWeight: 'bold',
        color: linkBlueText
      }
    }
  },
  bullet: {
    listStyleType: 'disc !important'
  }
});

function MenuSection ({ children, className }: TMenuSectionProps): React.ReactElement {
  return <div className={classnames(css.section, className)}>{children}</div>;
}

function MenuItems ({ children }: TMenuItemsProps) {
  return <ul>{children}</ul>;
}

function SpacerItem ({ heightMultiplier }: TSpacerItemProps): React.ReactElement {
  return (
    <li
      className={css.spacerItem}
      style={{
        height: heightMultiplier * SPACER_BASE_HEIGHT
      }}
    />
  );
}

function MenuItem (props: MenuItemType): React.ReactElement {
  if (props.spacer) {
    return <SpacerItem heightMultiplier={props.spacer} />;
  } else {
    return (
      <li
        className={classnames(css.menuItem, {
          [css[`indent${props.indent}`]]: props.indent,
          [css.bold]: props.bold,
          [css.short]: props.short,
          [css.bullet]: props.bullet,
          [css.activeItem]: props.currentLocation === props.href
        })}>
        {props.href ? (
          <a href={props.href} className={css.link}>
            {props.text}
          </a>
        ) : (
          props.text
        )}
      </li>
    );
  }
}

function MenuNavigator ({
  text,
  onClick,
  onSetSubmenu,
  active
}: TMenuNavigatorProps) {
  return (
    <li
      className={classnames(css.navigationLink, {
        [css.activeItem]: active
      })}
      onClick={() => {
        onClick ? onClick(text) : onSetSubmenu && onSetSubmenu(text);
      }}>
      {text}
    </li>
  );
}

function TopLevel ({ onSetSubmenu }: TTopLevelMenuProps) {
  return (
    <MenuSection className={css.topLevelMenu}>
      <MenuItems>
        <MenuNavigator text="Home" onSetSubmenu={onSetSubmenu} />
        <MenuNavigator text="Start Your Plan!" onSetSubmenu={onSetSubmenu} />
        <MenuNavigator text="The Plans Explained" onSetSubmenu={onSetSubmenu} />
        <MenuNavigator text="About Us" onSetSubmenu={onSetSubmenu} />
      </MenuItems>
    </MenuSection>
  );
}

function Submenu ({ items = [], currentLocation }) {
  return (
    <MenuSection>
      {items.map((item, index): React.ReactElement<{}> => {
        return (
          <MenuItem
            {...item}
            currentLocation={currentLocation}
            key={`${item.text || (item.spacer ? 'spacer' : 'item')}-${index}`}
          />
        );
      })}
    </MenuSection>
  );
}

function Menu ({ show, onToggleMenu, currentLocation }) {
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const [renderMenu, setRenderMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [submenu, setSubmenu] = useState(null);
  const [showSubmenu, setShowSubmenu] = useState(false);

  useLayoutEffect(
    () => {
      if (!menuRef.current) return;
      if (typeof document === 'undefined') return;
      if (!renderMenu) return;

      const documentElement = document.documentElement;
      const body = document.body;

      if (!documentElement) return;
      if (!body) return;

      const scrollPosition = documentElement.scrollTop;

      body.style.top = `-${scrollPosition}px`;
      body.classList.add('lock-scroll');

      return () => {
        body.classList.remove('lock-scroll');
        body.style.top = '';

        documentElement.scrollTop = scrollPosition;
      };
    },
    [renderMenu]
  );

  useEffect(
    () => {
      if (show && !renderMenu) {
        setRenderMenu(true);
      } else if (show && renderMenu) {
        // Let the menu be rendered without the "open" class before we open it, so
        // that transitions happen properly
        setTimeout(() => {
          setOpenMenu(true);
        }, 50);
      } else if (!show && renderMenu && openMenu) {
        setOpenMenu(false);
      } else if (!show && renderMenu && !openMenu) {
        // Let transition finish before hiding the menu
        setTimeout(() => {
          setRenderMenu(false);
        }, 300);
      }
    },
    [show, renderMenu, openMenu]
  );

  useEffect(
    () => {
      if (submenu) {
        menuItemsRef.current = menuItems[submenu];

        // open it, so that transitions happen properly
        setTimeout(() => {
          setShowSubmenu(true);
        }, 50);
      }
    },
    [submenu]
  );

  useLayoutEffect(() => {
    const keys = Object.keys(menuItems);

    const activeMenu = keys.find((key) => {
      return (
        menuItems[key].findIndex((item) => {
          return item.href === currentLocation;
        }) > -1
      );
    });

    if (activeMenu) {
      setSubmenu(activeMenu);
    }
  }, []);

  const closeSubmenu = () => {
    setShowSubmenu(false);

    // open it, so that transitions happen properly
    setTimeout(() => {
      setSubmenu(null);
    }, 120);
  };

  if (!renderMenu) return null;

  const getTop = () => {
    if (typeof document === 'undefined') return;

    const documentElement = document.documentElement;
    const body = document.body;

    if (!documentElement) return;
    if (!body) return;

    let bodyTopWithUnit = body.style.top;
    // Turn negative top (scrolled up) into a positive number
    const bodyTop = bodyTopWithUnit ? Number(bodyTopWithUnit.replace('px', '').replace('-', '')) : 0;

    const header = (document.querySelector('.page-header') as HTMLElement ) || {
      offsetHeight: 0
    };
    const scrollTop = documentElement.scrollTop || body.scrollTop || 0;
    return header.offsetHeight - bodyTop - scrollTop;
  };

  return (
    <div
      ref={menuRef}
      className={classnames(css.container, {
        open: openMenu
      })}
      style={{ top: getTop() }}
      onClick={onToggleMenu}>
      <div
        className={classnames(css.menu, {
          open: openMenu,
          'show-sub': showSubmenu
        })}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <span className={css.showTopLevel} onClick={closeSubmenu}>
          &lt;
        </span>
        <TopLevel onSetSubmenu={setSubmenu} currentLocation={currentLocation} />
        {submenu ? (
          <Submenu
            items={menuItemsRef.current}
            currentLocation={currentLocation}
          />
        ) : null}
      </div>
    </div>
  );
}

function MobileNav (props: TMobileNavProps) {
  const [show, setShow] = useState(false);

  const handleShowToggle = () => {
    setShow(!show);
  };

  return <>
    <div id="main-menu-toggle" key="toggle" onClick={handleShowToggle}>
      Menu
    </div>,
    <ErrorBoundary key="menu">
      <Menu
        show={show}
        onToggleMenu={handleShowToggle}
        currentLocation={props.railsContext.location}
      />
    </ErrorBoundary>
  </>;
}

function SSRInterrupt (props: {railsContext: RailsContext}) {
  const [showMenu, setShowMenu] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowMenu(true);
  }, []);

  if (!showMenu) {
    // You can show some kind of placeholder UI here
    return null;
  }

  return <MobileNav {...props} />;
}

export default (props: Record<string, unknown>, railsContext: RailsContext) => (
  <SSRInterrupt {...{ ...props, railsContext }} />
);
