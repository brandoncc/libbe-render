import { Component } from 'react';
import { ItemType as TextOnlyItemType } from './TextOnly';

type ItemType = TextOnlyItemType;

interface PropsType {
  items: ItemType[];
}

type StateType = {
  selectedItemIndex: number
};

class BaseCarousel<Props extends PropsType> extends Component<Props, StateType> {
  state = {
    selectedItemIndex: 0
  };

  activeItem = (): ItemType => {
    return this.props.items[this.state.selectedItemIndex];
  };

  handleNextClick = () => {
    if (this.nextButtonIsDisabled()) { return; }
    this.setState({ selectedItemIndex: this.state.selectedItemIndex + 1 });
  };

  handlePrevClick = () => {
    if (this.prevButtonIsDisabled()) { return; }
    this.setState({ selectedItemIndex: this.state.selectedItemIndex - 1 });
  };

  handleDotClick = (index: number): void => this.setState({ selectedItemIndex: index });

  prevButtonIsDisabled = () => this.state.selectedItemIndex === 0;
  nextButtonIsDisabled = () => (
    this.state.selectedItemIndex === this.props.items.length - 1
  );
}

export default BaseCarousel;
