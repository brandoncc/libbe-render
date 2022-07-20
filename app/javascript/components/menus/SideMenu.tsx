import * as React from 'react';
import withRouter from 'react-router-dom/withRouter';
import classnames from 'classnames';
import includes from 'lodash/includes';

const findParentNodes = (items, matches) => {
  return matches[0] > 0
    ? findParentNodes(items, [items.find(i => i.id === matches[0]).parentId, ...matches])
    : matches;
};

const isActiveItem = (item, currentPath) => {
  return (
    item.path === currentPath ||
    includes(item.alsoActiveForPaths || [], currentPath)
  );
};

const findActiveNodes = (items, currentPath) => {
  const activeNode = items.find((item) => isActiveItem(item, currentPath));
  return [...findParentNodes(items, [activeNode.parentId]), activeNode.id];
};

const findAllNodesWithChildren = (items) => (
  items.reduce((a, e) => a.concat(e.parentId), [])
);

const findHeaderItem = (items) => items.find((item) => item.parentId === -1);

const headerLink = (items, currentPath) => {
  const headerItem = findHeaderItem(items);

  return headerItem
    ? <a
      href={headerItem.path}
      id='title'
      className={
        classnames({ 'active': isActiveItem(headerItem, currentPath) })
      }
    >{headerItem.text}</a>
    : null;
};

const listItemIsParentNode = (item, allParentNodeIds) => (
  allParentNodeIds.indexOf(item.id) >= 0
);

const listItemContainsExpandedlist = (item, activeNodes, allParentNodeIds) => {
  return (
    activeNodes.indexOf(item.id) >= 0 &&
    listItemIsParentNode(item, allParentNodeIds)
  );
};

const listItemContainsCollapsedlist = (item, activeNodes, allParentNodeIds) => {
  return (
    activeNodes.indexOf(item.id) === -1 &&
    listItemIsParentNode(item, allParentNodeIds)
  );
};

const menuLinks = (parentNodeId, items, activeNodes, allParentNodeIds) => {
  const currentItems = items.filter((item) => item.parentId === parentNodeId);

  return (
    <ul className={classnames({ 'side-menu': parentNodeId === 0 })}>
      {currentItems.map((item, index) => (
        <li key={index} className={classnames({
          'expanded': listItemContainsExpandedlist(item, activeNodes, allParentNodeIds),
          'collapsed': listItemContainsCollapsedlist(item, activeNodes, allParentNodeIds)
        })}>
          <a href={item.path} className={classnames({
            'active': activeNodes[activeNodes.length - 1] === item.id
          })}>{item.text}</a>
          {
            listItemContainsExpandedlist(item, activeNodes, allParentNodeIds)
              ? menuLinks(item.id, items, activeNodes, allParentNodeIds)
              : null
          }
        </li>
      ))}
    </ul>
  );
};

type PropsItem = {
}

type Props = {
  items: PropsItem[];
  location: {
    pathname: string;
  };
}

const SideMenu = ({ items, location }: Props) => {
  const currentPath = location.pathname;
  const activeNodes = findActiveNodes(items, currentPath);
  const allParentNodeIds = findAllNodesWithChildren(items);

  return (
    <div>
      {headerLink(items, currentPath)}
      {menuLinks(0, items, activeNodes, allParentNodeIds)}
    </div>
  );
};

export default withRouter(SideMenu);
