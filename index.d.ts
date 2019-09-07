import * as React from 'react';

export interface IProps extends React.Props<ReactSimpleImageViewer> {
  src: string[];
  currentIndex?: number;
  backgroundStyle?: any;
  onClose: () => void;
}

export interface IState {
  currentIndex: number;
}

declare class ReactSimpleImageViewer extends React.Component<IProps, IState> {
}

declare module 'react-simple-image-viewer' {
}

export default ReactSimpleImageViewer;
