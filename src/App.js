import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react';
import { Storage } from 'aws-amplify';

  class App extends Component {
    state = { fileUrl: '', file: '', filename: '' }
    handleChange = e => {
      const file = e.target.files[0]
      this.setState({
        fileUrl: URL.createObjectURL(file),
        file,
        filename: file.name
      })
    }

    saveFile = () => {
      Storage.put(this.state.filename, this.state.file)
      .then(() => {
        console.log('Successfully saved file')
        this.setState({ fileUrl: '', file: '', filename: '' })
      })
      .catch(err => {
        console.log('Error uploading file', err)
      })
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <input type='file' onChange={this.handleChange} />
        <img src={this.state.fileUrl} />
       <button onClick={this.saveFile}>Save File</button>
      </div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true});
