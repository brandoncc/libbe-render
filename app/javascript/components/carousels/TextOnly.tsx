import * as React from 'react';
import classify from '@src/utils/typestyle';
import { classes } from 'typestyle';
import BaseCarousel from './Base';
import baseStyles from './base_styles';
import deepmerge from 'deepmerge';

import { regularGrayText } from '@src/styles/general';

const styles = classify(
  deepmerge(baseStyles, {
    contentText: {
      margin: 20,
      width: '100%'
    }
  })
);

interface TextItemType {
  headerText: string;
  text: string;
}

interface ComponentItemType {
  headerText: string;
  component: React.ReactElement;
}

export type ItemType = TextItemType | ComponentItemType;

type PropsType = {
  items: ItemType[];
  style?: CSSRuleList;
  contentStyles?: Record<string, number | string>;
  contentClassName?: string;
  textAlign?: 'left' | 'right' | 'center';
  textColor?: string;
};

function isTextItem (item: ItemType): item is TextItemType {
  return (item as TextItemType).text !== undefined;
}

function isComponentItem (item: ItemType): item is ComponentItemType {
  return (item as ComponentItemType).component !== undefined;
}

class TextOnlyCarousel extends BaseCarousel<PropsType> {
  activeMainContent = () => {
    const activeItem = this.activeItem();
    const contentStyles = this.props.contentStyles || {};
    let ActiveContent: React.ReactElement;

    if (isComponentItem(activeItem)) {
      ActiveContent = activeItem['component'];
    }

    return (
      <div
        className={styles.content}
        style={{
          minHeight: (typeof contentStyles.minHeight === 'number' ? contentStyles.minHeight : parseInt(contentStyles.minHeight)) || 'auto'
        }}
      >
        <div
          className={classes(
            styles.contentText,
            this.props.contentClassName || ''
          )}
          style={{
            textAlign: this.props.textAlign || 'center',
            color: this.props.textColor || regularGrayText,
            margin: contentStyles.margin
          }}
          dangerouslySetInnerHTML={
            isTextItem(activeItem) ? { __html: activeItem.text } : undefined
          }
        >
          {ActiveContent || null}
        </div>
      </div>
    );
  };

  navItems = () => {
    const activeItem = this.activeItem();

    return (
      <div className={styles.nav}>
        <div className={styles.navTop}>
          <button
            className={classes(
              styles.navButton,
              this.prevButtonIsDisabled() ? 'disabled' : ''
            )}
            onClick={this.handlePrevClick}
          />
          <p className={styles.navTitle}>{activeItem.headerText}</p>
          <button
            className={classes(
              styles.navButton,
              this.nextButtonIsDisabled() ? 'disabled' : ''
            )}
            onClick={this.handleNextClick}
          />
        </div>
        <div className={styles.navBottom}>
          {this.props.items.map((_item, index) => {
            return (
              <button
                className={classes(
                  styles.navDot,
                  `${index === this.state.selectedItemIndex ? 'active' : ''}`
                )}
                style={{ height: 8, width: 8 }}
                onClick={() => this.handleDotClick(index)}
                key={index}
              />
            );
          })}
        </div>
      </div>
    );
  };

  render () {
    const propStyles = this.props.style || {};

    return (
      <div style={propStyles} className={styles.carousel}>
        {this.activeMainContent()}
        {this.navItems()}
      </div>
    );
  }
}

export default TextOnlyCarousel;
