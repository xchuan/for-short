import * as React from 'react';

export interface IAppProps {
  defaultText: string;
  onClick: (params: any) => any;
}

export interface IAppState {
}

export default class IButton extends React.Component<IAppProps, IAppState> {
  static defaultProps = {
    defaultText: 'My Button'
  }
  
  constructor(props: IAppProps,...args) {
    
    super(props);

    this.state = {
    }

    this._log('1.constructor',args);//arguments
  }

  _log = (methodName:any,args:any)=>{
    console.log(methodName, args);
  }

  static getDerivedStateFromProps(props:IAppProps, state:IAppState) {
    console.log('NewUpdate1.getDerivedStateFromProps',props,state);
    return null;
  }

  getSnapshotBeforeUpdate(prevProps:IAppProps, prevState:IAppState) {
    console.log('NewUpdate2.getSnapshotBeforeUpdate',prevProps,prevState);
    return null;
  }
  /*componentWillReceiveProps(nextProps: Readonly<IAppProps>, nextContext: any): void {
    this._log('Update4.componentWillReceiveProps',arguments); 
  }*/

  shouldComponentUpdate(nextProps: Readonly<IAppProps>, nextState: Readonly<IAppState>, nextContext: any,...args): boolean {
    this._log('Update1.shouldComponentUpdate',args);
    return true;
  }

  /*componentWillUpdate(nextProps: Readonly<IAppProps>, nextState: Readonly<IAppState>, nextContext: any): void {
    this._log('Update2.componentWillUpdate',arguments);
  }*/

  componentDidUpdate(prevProps: Readonly<IAppProps>, prevState: Readonly<IAppState>, snapshot?: any,...args): void {
    this._log('Update3.componentDidUpdate',args); 
  }

  /*componentWillMount(): void {
     this._log('2.componentWillMount',arguments);
  }*/

  componentDidMount(...args): void {
    this._log('4.componentDidMount',args);
    //this.forceUpdate();
  }

  componentWillUnmount(...args): void {
    this._log('End.componentDidMount',args);
  }


  handleClick = (e: any) => {
    this.forceUpdate()
    console.log(e,"Force Update!");
  }

  handleRefresh = (e: any) => {
    this.props.onClick(e);
    console.log(e,"Clicked");
  }

  public render(...args) {
    this._log('3.render',args)
    return (
      <div onClick={this.handleClick}>
        {this.props.defaultText}<input type="button" value="Remove" onClick={this.handleRefresh}/>
      </div>
    );
  }
}
