import React, { Component } from 'react'
import { render } from 'react-dom'
import DribbbleLogin from './components/index.js'

class App extends Component {
  onFailure (error) {
    error = error && error.toString ? error.toString() : error
    throw new Error('Oops! Something went batshit crazy! Here\'s something for you: ' + error)
  }

  onSuccess () {
    console.log('Yippee! You\'re now logged in')
  }

  render () {
    return <DribbbleLogin requestUrl='/api/v1/auth/dribbble' onFailure={ this.onFailure } onSuccess={ this.onSuccess} saveCodeUrl='/api/v1/auth/code' />
  }
}

export default App

render(
  <App/>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept(App, () => {
    render(App)
  })
}
