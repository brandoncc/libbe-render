import * as React from 'react';
import useSSRComponent from '@hooks/useSSRComponent';
import { RailsContext } from 'react-on-rails/node_package/lib/types';

export default function withSSR(Component: React.ElementType) {
  return (props: Record<string, unknown>, railsContext: RailsContext) => {
    const { children, ...propsWithoutChildren } = props;
    return useSSRComponent(Component, {
      ...propsWithoutChildren,
      railsContext
    });
  };
}
