import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactTeachingBubbleWebPartStrings';
import ReactTeachingBubble from './components/ReactTeachingBubble';
import { IReactTeachingBubbleProps } from './components/IReactTeachingBubbleProps';

export interface IReactTeachingBubbleWebPartProps {
  isTeachingBubbleVisible: boolean;
  title: string;
  subtitle: string;
  content: string;
}

export default class ReactTeachingBubbleWebPart extends BaseClientSideWebPart<IReactTeachingBubbleWebPartProps> {

  private _menuButtonElement: HTMLElement;
  
  public render(): void {

    const element: React.ReactElement<IReactTeachingBubbleProps > = React.createElement(
      ReactTeachingBubble,
      {
        title: this.properties.title,
        content: this.properties.content,
        subtitle: this.properties.subtitle,
        
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('content',{
                  label:strings.ContentFieldLabel,
                  multiline:true
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
