import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import { WhiteSpace, WingBlank, List, InputItem, TextareaItem, Button, Toast, Picker } from 'antd-mobile'
import { connect } from 'dva'
import style from './style'
import { NavigationActions, createAction } from '../../../utils'
import { createForm } from 'rc-form'
import CodeCountDown from '../../../componenets/CodeCountDown'

const styles = StyleSheet.create(style)     // 引入样式

@connect(({ signUp, router }) => ({ ...signUp, router }))
@createForm()
class SignUp extends Component {
  static navigationOptions = {
    title: '注册',
  }

    componentDidMount() {
        this.props.dispatch(createAction('signUp/save')({ subLoading1: false }))
        this.props.dispatch(createAction('signUp/getVehicleType')())
    }

    // 注册
    onSubmit = () => {
        Keyboard.dismiss()
        const { getFieldProps, getFieldValue, getFieldsValue, getFieldError, resetFields, validateFields, setFields } = this.props.form
        validateFields({ force: true }, (error) => {
            const info = getFieldsValue()
            if (!error) {
                if (info.vehicleType === undefined) {
                    Toast.info('请选择车辆车型', null, 1, true)
                    return
                }
                const phone = this.props.navigation.state.params.phone
                this.props.dispatch(createAction('signUp/signUp')({ ...info, phone: phone }))
            }
        })
    }

  render() {
    const { getFieldProps, getFieldValue, getFieldsValue, getFieldError, resetFields, validateFields, setFields } = this.props.form
    const { vehicleTypeList, subLoading1 } = this.props

    return (
      <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
              <TouchableOpacity  activeOpacity={1.0} onPress={() => Keyboard.dismiss()}>
              <WhiteSpace />
              <View style={styles.forgetPassword}>
                  <List>
                      <InputItem
                          { ...getFieldProps('loginName', {
                              validateFirst: true,
                              validateTrigger: 'onBlur',
                              rules: [{
                                  required: true,
                                  message: '请输入您的账号',
                              }],
                          })}
                          error={getFieldError('loginName')}
                          onErrorClick={() => Toast.info(getFieldError('loginName')[0], 1)}
                          clear
                          placeholder="请输入您的账号"
                      >账号</InputItem>
                      <InputItem
                          { ...getFieldProps('name', {
                              validateFirst: true,
                              validateTrigger: 'onBlur',
                              rules: [{
                                  required: true,
                                  message: '请输入您的姓名',
                              }],
                          })}
                          error={getFieldError('name')}
                          onErrorClick={() => Toast.info(getFieldError('name')[0], 1)}
                          clear
                          placeholder="请输入您的姓名"
                      >姓名</InputItem>
                      <InputItem
                          { ...getFieldProps('password', {
                              validateFirst: true,
                              validateTrigger: 'onBlur',
                              rules: [{
                                  required: true,
                                  message: '请输入您的密码',
                              }],
                          })}
                          error={getFieldError('password')}
                          onErrorClick={() => Toast.info(getFieldError('password')[0], 1)}
                          clear
                          type="password"
                          placeholder="请输入您的密码"
                      >密码</InputItem>
                      <InputItem
                          { ...getFieldProps('vicheNo', {
                              validateFirst: true,
                              validateTrigger: 'onBlur',
                              rules: [{
                                  required: true,
                                  message: '请输入您的车牌号',
                              }],
                          })}
                          error={getFieldError('vicheNo')}
                          onErrorClick={() => Toast.info(getFieldError('vicheNo')[0], 1)}
                          clear
                          placeholder="请输入您的车牌号"
                      >车牌号</InputItem>
                      <Picker
                          extra="请选择"
                          data={vehicleTypeList}
                          cols={1}
                          {...getFieldProps('vehicleType', {
                          })}
                      >
                          <List.Item arrow="horizontal">车型</List.Item>
                      </Picker>
                      <InputItem
                          { ...getFieldProps('vehicleLength', {
                              validateFirst: true,
                              validateTrigger: 'onBlur',
                              rules: [{
                                  required: true,
                                  message: '请输入车辆的长度',
                              }],
                          })}
                          error={getFieldError('vehicleLength')}
                          onErrorClick={() => Toast.info(getFieldError('vehicleLength')[0], 1)}
                          clear
                          placeholder="请输入车辆的长度"
                      >车长</InputItem>
                      <InputItem
                          { ...getFieldProps('vehicleWidth', {
                              validateFirst: true,
                              validateTrigger: 'onBlur',
                              rules: [{
                                  required: true,
                                  message: '请输入车辆的宽度',
                              }],
                          })}
                          error={getFieldError('vehicleWidth')}
                          onErrorClick={() => Toast.info(getFieldError('vehicleWidth')[0], 1)}
                          clear
                          placeholder="请输入车辆的宽度"
                      >车宽</InputItem>
                      <InputItem
                          { ...getFieldProps('vehicleHeight', {
                              validateFirst: true,
                              validateTrigger: 'onBlur',
                              rules: [{
                                  required: true,
                                  message: '请输入车辆的高度',
                              }],
                          })}
                          error={getFieldError('vehicleHeight')}
                          onErrorClick={() => Toast.info(getFieldError('vehicleHeight')[0], 1)}
                          clear
                          placeholder="请输入车辆的高度"
                      >车高</InputItem>
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
                  >{subLoading1 ? '注册中...' : '注册'}</Button>
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
