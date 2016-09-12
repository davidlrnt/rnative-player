import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';

export default class UselessTextInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }

  render() {

    return (
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => {this.setState({text})}}
        onSubmitEditing={() => {this.props.submit(this.state.text)}}
        value={this.state.text}
      />
    );
  }
}

// App registration and rendering
