import * as React from 'react';
import { getStyles } from 'typestyle';
import { renderToString } from 'react-dom/server';
import { RailsContext } from 'react-on-rails/node_package/lib/types';

type Props = {
  children?: React.ReactElement;
  railsContext: RailsContext;
};

export default function useSSRComponent(Component: React.ElementType, props: Props) {
  const { children, ...propsWithoutChildren } = props;

  const componentHtml = renderToString(<Component {...propsWithoutChildren} />);
  const stylesInner = getStyles();

  const renderedHtml = {
    componentHtml,
    stylesInner
  };

  return { renderedHtml };
}
