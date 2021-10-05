import React, { Component } from 'react';

class Block extends Component {
  state = { displayTransaction: false };

  toggleTransaction = () => {
    this.setState({ displayTransaction: !this.state.displayTransaction });
  }

  get displayTransaction() {
    const { data } = this.props.block;

    const stringifiedData = JSON.stringify(data);

    const dataDisplay = stringifiedData.length > 15 ?
      `${stringifiedData.substring(0, 35)}...` :
      stringifiedData;

    return <div>Data: {dataDisplay}</div>;
  }

  render() {
    const { timestamp, hash} = this.props.block;

    const hasDisplay = `${hash.substring(0, 15)}...`;

    return (
      <div className='Block'>
        <div>Hash: {hashDisplay}</div>
        <div>Timestamp: {new Date(timestamp}.toLocalString()}</div>
        {this.displayTransaction()}
      </div>
    );
  }
};

export default Block;
