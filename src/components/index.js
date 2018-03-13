import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'whatwg-fetch'

class DribbbleLogin extends Component {
  constructor (props) {
    super(props)
    this.onButtonClick = this.onButtonClick.bind(this)
  }

  onButtonClick () {
    this.getClientDetails()
  }

  getClientDetails () {
    const popup = this.openPopup()

    return window.fetch(this.props.requestUrl, {
      method: 'GET',
      headers: this.getHeaders()
    }).then(response => {
      return response.json()
    }).then(payload => {
      popup.location = `https://dribbble.com/oauth/authorize?client_id=${payload.data.client_id}&state=${payload.data.state}`
      this.polling(popup)
    }).catch((error) => {
      popup.close()
      return this.props.onFailure(error)
    })
  }

  polling (popup) {
    const polling = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(polling)
        this.props.onFailure(new Error('Popup has been closed by the user'))
      }

      const closeDialog = () => {
        clearInterval(polling)
        popup.close()
      }

      try {
        if (!popup.location.hostname.includes('dribbble.com') && !(popup.location.hostname === '')) {
          if (popup.location.search) {
            const query = new URLSearchParams(popup.location.search)

            const code = query.get('code')
            const state = query.get('state')

            closeDialog()
            return this.saveCode(code, state)
          } else {
            closeDialog()
            return this.props.onFailure(new Error(
              'OAuth redirect has occurred but no query parameters were found. ' +
              'They were either not set during the redirect, or were removed—typically by a ' +
              'routing library—before Dribbble react component could read it.'
            ))
          }
        }
      } catch (error) {

      }
    }, 500)
  }

  saveCode (code, state) {
    const payload = {
      code,
      state
    }

    if (!this.props.saveCodeUrl) {
      this.props.onSuccess(payload)
      return Promise.resolve(payload)
    }

    return window.fetch(this.props.saveCodeUrl, {
      method: 'POST',
      data: JSON.stringify(payload),
      headers: this.getHeaders()
    }).then(response => {
      return response.json()
    }).then(response => {
      this.props.onSuccess(response)
    }).catch((error) => {
      this.props.onFailure(error)
    })
  }

  getHeaders () {
    const headers = {}
    headers['Content-Type'] = 'application/json'
    return headers
  }

  openPopup () {
    const width = this.props.dialogWidth || 1000
    const height = this.props.dialogHeight || 1000
    const left = (screen.width / 2) - (width / 2)
    const top = (screen.height / 2) - (height / 2)

    return window.open('', '', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`)
  }

  render () {
    const dribbbleButton = React.createElement(
      this.props.tag, {
        onClick: this.onButtonClick,
        style: this.props.style,
        disabled: this.props.disabled,
        className: this.props.className
      }, this.props.children ? this.props.children : this.props.text)
    return dribbbleButton
  }
}

DribbbleLogin.propTypes = {
  requestUrl: PropTypes.string.isRequired,
  saveCodeUrl: PropTypes.string,
  onFailure: PropTypes.func,
  onSuccess: PropTypes.func,
  dialogWidth: PropTypes.number,
  dialogHeight: PropTypes.number,
  className: PropTypes.string,
  text: PropTypes.string,
  tag: PropTypes.string.isRequired,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  credentials: PropTypes.oneOf(['omit', 'same-origin', 'include']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

DribbbleLogin.defaultProps = {
  tag: 'button',
  text: 'Sign in with Dribbble',
  disabled: false,
  dialogWidth: 600,
  dialogHeight: 400,
  showIcon: true,
  credentials: 'same-origin',
  customHeaders: {}
}

export default DribbbleLogin
