import * as React from 'react';
import styles from './ReactTeachingBubble.module.scss';
import { IReactTeachingBubbleProps } from './IReactTeachingBubbleProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';

export interface ITeachingBubbleState {
  isTeachingBubbleVisible?: boolean;
}


export default class ReactTeachingBubble extends React.Component<IReactTeachingBubbleProps, ITeachingBubbleState> {
  private _menuButtonElement: HTMLElement;
  public constructor(props: IReactTeachingBubbleProps) {
    super(props)

    this._onDismiss = this._onDismiss.bind(this);
    this._onShow = this._onShow.bind(this);

    this.state = {
      isTeachingBubbleVisible: false
    };
  }




  public render(): React.ReactElement<IReactTeachingBubbleProps> {
    const { isTeachingBubbleVisible } = this.state;
    return (
      <div className={ styles.ReactTeachingBubble }>
      <span className="ms-TeachingBubbleBasicExample-buttonArea" ref={menuButton => (this._menuButtonElement = menuButton!)}>
          <DefaultButton
            onClick={isTeachingBubbleVisible ? this._onDismiss : this._onShow}
            text={isTeachingBubbleVisible ? 'Hide Help' : 'Show Help'}
          />
        </span>
      {isTeachingBubbleVisible ? (
          <div>
            <TeachingBubble
              targetElement={this._menuButtonElement}
              hasCondensedHeadline={true}
              onDismiss={this._onDismiss}
              hasCloseIcon={true}
              headline={escape(this.props.title)}
            >
              {this.props.content}
            </TeachingBubble>
          </div>
        ) : null}

      </div>
      
    );
  }

private _onDismiss(ev: any): void {
  this.setState({
    isTeachingBubbleVisible: false
  });
}

private _onShow(ev: any): void {
  this.setState({
    isTeachingBubbleVisible: true
  });
}
}

