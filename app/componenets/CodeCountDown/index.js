import React from 'react'
import { Toast } from 'antd-mobile'
import { StyleSheet, Text } from 'react-native'
import theme from '../../utils/theme'

class CodeCountDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      codeSeconds: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSend) {
      this.props.setSend()
      Toast.info('验证码已发送')
      this.codeCountDown(true)
      this.codeCountInterval = setInterval(this.codeCountDown, 1000)
    }
  }

  handleCodeSend = () => {
    this.props.onClick()
  }

  codeCountDown = (start = false) => {
    const { codeSeconds } = this.state
    const seconds = start ? 60 : codeSeconds - 1
    if (seconds === 0) {
      clearInterval(this.codeCountInterval)
    }
    this.setState({ codeSeconds: seconds })
  }

  render() {
    const { codeSeconds } = this.state
    if (codeSeconds === 0) {
      return <Text style={styles.code} onPress={this.handleCodeSend}>发送验证码</Text>
    } else {
      return <Text style={styles.grey}>重新发送 {String(codeSeconds)}s</Text>
    }
  }

}

CodeCountDown.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  setSend: React.PropTypes.func.isRequired,
}
const styles = StyleSheet.create({
    code: {
        backgroundColor: theme.color,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 5,
        color: '#fff',
    },
    grey: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 5,
        borderRadius: 5,
        backgroundColor: '#ddd',
        color: '#bbb',
    }
})

export default CodeCountDown
