import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import { WhiteSpace, WingBlank, List, InputItem, TextareaItem, Button, Toast } from 'antd-mobile';
import { connect } from 'dva'
import style from './style'
import { NavigationActions, createAction } from '../../../utils'
import CodeCountDown from '../../../componenets/CodeCountDown'
import { createForm } from 'rc-form'
import { is_mobile } from '../../../utils/base'

const styles = StyleSheet.create(style)     // 引入样式

@connect(({ forgetPassword, router }) => ({ ...forgetPassword, router }))
@createForm()
class SignUp extends Component {
  static navigationOptions = {
    title: '验证手机号',
  }

    componentDidMount() {
        this.props.dispatch(createAction('forgetPassword/save')({ subLoading: false }))
    }


    // 发送验证码
    sendCodeSubmit = () => {
        Keyboard.dismiss()
        const { getFieldProps, getFieldValue, getFieldsValue, getFieldError, resetFields, validateFields, setFields } = this.props.form
        const info = getFieldsValue()
        if (info.phone) {
            if (!is_mobile(info.phone)) {
                Toast.info('请输入正确的手机号码', 2, null, true)
            } else {
                this.props.dispatch(createAction('forgetPassword/sendCode')(info.phone))
            }
        } else {
            Toast.info('请输入手机号码', 2, null, true)
        }
    }

    // 重置isSend
    setSend = () => {
        this.props.dispatch(createAction('forgetPassword/save')({ isSend: false }))
    }

    // 提交验证码
    confirmCodeSubmit = () => {
        const { getFieldProps, getFieldValue, getFieldsValue, getFieldError, resetFields, validateFields, setFields } = this.props.form
        validateFields({ force: true }, (error) => {
            const info = getFieldsValue()
            if (!error) {
                this.props.dispatch(createAction('forgetPassword/confirmCode')(info))
            }
        })
    }

  render() {
    const { getFieldProps, getFieldValue, getFieldsValue, getFieldError, resetFields, validateFields, setFields } = this.props.form
    const { isSend, subLoading } = this.props
    return (
      <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
              <TouchableOpacity  activeOpacity={1.0} onPress={() => Keyboard.dismiss()}>
              <WhiteSpace />
              <View style={styles.forgetPassword}>
                  <List>
                      <InputItem
                          { ...getFieldProps('phone', {
                              validateFirst: true,
                              validateTrigger: 'onBlur',
                              rules: [{
                                  required: true,
                                  message: '请输入您的手机号',
                              }, {
                                  pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                                  message: '请输入正确的手机号',
                              }],
                          })}
                          error={getFieldError('phone')}
                          onErrorClick={() => Toast.info(getFieldError('phone')[0], 1)}
                          clear
                          placeholder="请输入您的手机号"
                          type="number"
                      >手机号码</InputItem>
                      <InputItem
                          { ...getFieldProps('code', {
                              validateFirst: true,
                              validateTrigger: 'onBlur',
                              rules: [{
                                  required: true,
                                  message: '请输入您的手机号',
                              }],
                          })}
                          error={getFieldError('code')}
                          onErrorClick={() => Toast.info(getFieldError('code')[0], 1)}
                          clear
                          placeholder="请输入验证码"
                          type="number"
                          extra={<CodeCountDown isSend={isSend} onClick={this.sendCodeSubmit} setSend={this.setSend} />}
                      >验证码</InputItem>
                  </List>
              </View>
              <WhiteSpace />
              <WhiteSpace />
              <WhiteSpace />
              <WhiteSpace />
              <WingBlank>
                  <Button
                      style={subLoading ? styles.disableBtn : styles.btn}
                      disabled={subLoading}
                      type="primary"
                      onClick={this.confirmCodeSubmit}
                      // onClick={() => this.props.dispatch(NavigationActions.navigate({ routeName: 'ForgetPassword', params: { phone: '15302728676' } }))}
                  >{subLoading ? '验证中...' : '下一步'}</Button>
              </WingBlank>
              <WhiteSpace />
              <WhiteSpace />
              </TouchableOpacity>
          </ScrollView>
      </View>
    )
  }
}

export default SignUp
