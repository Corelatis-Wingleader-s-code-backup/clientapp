import React, { Component } from 'react'
import axios from 'axios';

/*
axios.defaults.baseURL = '/proxy';
axios.defaults.timeout = 3000;
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
*/
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      questionList: []
    }
    this.onSearchInput = this.onSearchInput.bind(this);
    this.onSearchClicked = this.onSearchClicked.bind(this);
  }

  async componentDidMount() {
    try {
      const res = await axios.get('https://localhost:5001/WeatherForecast/GetQuestions', {
        proxy: {
          host: "localhost",
          port: 3000
        }
      })
      const data = await res.data;
      console.log(data);
      this.setState({ questionList: data })
    } catch (exception) {
      console.log(exception);
    }

  }

  onSearchInput(e) {
    this.setState({ inputValue: e.target.value });
  }
  async onSearchClicked() {
    const keyword = encodeURI(this.state.inputValue);
    const res = await axios.get(`https://localhost:5001/WeatherForecast/GetQuestions/${keyword}`);
    const data = await res.data;
    console.log(data);
  }
  render() {
    return (
      <div>
        <span>{'Q&A'}</span>
        <label htmlFor='search'>
          Search in {'Q&A'}:
          <input
            id='search'
            type='text'
            value={this.inputValue}
            onChange={this.onSearchInput} />
        </label>
        <input type='button' onClick={this.onSearchClicked} value='search' />

      </div>
    )
  }
}


/**
 * cors issue solution:
 * https://www.cnblogs.com/252e/p/14542653.html
 */
