import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import { WhiteSpace, WingBlank, List, InputItem, TextareaItem, Toast, Button } from 'antd-mobile';
import { connect } from 'dva'
import style from './style'
import { NavigationActions, createAction } from '../../../utils'
import CodeCountDown from '../../../componenets/CodeCountDown'
import { createForm } from 'rc-form'

const styles = StyleSheet.create(style)     // 引入样式

@connect(({ forgetPassword, router }) => ({ ...forgetPassword, router }))
@createForm()
class ForgetPassword extends Component {
  static navigationOptions = {
    title: '忘记密码',
  }

    componentDidMount() {
        this.props.dispatch(createAction('forgetPassword/save')({ subLoading1: false }))
    }

    // 确认密码
    handleConfirmPassword = (rule, value, callback) => {
        const { getFieldValue } = this.props.form
        if (value && value !== getFieldValue('password')) {
            callback('两次输入的密码不一样')
        } else {
            callback()
        }
    }

    // 提交验证
    onSubmit = () => {
        Keyboard.dismiss()
        const { getFieldsValue, validateFields } = this.props.form
        validateFields({force: true}, (error) => {
            const info = getFieldsValue()
            if (!error) {
                const phone = this.props.navigation.state.params.phone
                this.props.dispatch(createAction('forgetPassword/changePassword')({ ...info, phone: phone }))
            }
        })
    }

  render() {
      const { getFieldProps, getFieldValue, getFieldsValue, getFieldError, resetFields, validateFields, setFields } = this.props.form
      const { subLoading1 } = this.props
      return (
      <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
              <TouchableOpacity  activeOpacity={1.0} onPress={() => Keyboard.dismiss()}>
              <WhiteSpace />
              <View style={styles.forgetPassword}>
                  <List>
                      <InputItem
                          { ...getFieldProps('password', {
                              validateFirst: true,
                              validateTrigger: 'onBlur',
                              rules: [{
                                  required: true,
                                  message: '请输入新密码',
                              }],
                          })}
                          error={getFieldError('password')}
                          onErrorClick={() => Toast.info(getFieldError('password')[0], 1)}
                          clear
                          type="password"
                          placeholder="请输入新密码"
                      >新密码</InputItem>
                      <InputItem
                          { ...getFieldProps('confirmPassword', {
                              validateFirst: true,
                              validateTrigger: 'onBlur',
                              rules: [{
                                  required: true,
                                  message: '请确认新密码',
                              }, {
                                  validator: this.handleConfirmPassword,
                              }],
                          })}
                          error={getFieldError('confirmPassword')}
                          onErrorClick={() => Toast.info(getFieldError('confirmPassword')[0], 1)}
                          clear
                          type="password"
                          placeholder="请确认新密码"
                      >确认密码</InputItem>
                  </List>
              </View>
              <WhiteSpace />
              <WhiteSpace />
              <WhiteSpace />
              <WhiteSpace />
              <WingBlank>
                  <Button
                      style={subLoading1 ? styles.disableBtn : styles.btn}
                      disabled={subLoading1}
                      type="primary"
                      onClick={this.onSubmit}
                  >{subLoading1 ? '密码修改中...' : '找回密码'}</Button>
              </WingBlank>
              </TouchableOpacity>
          </ScrollView>
      </View>
    )
  }
}

export default ForgetPassword
