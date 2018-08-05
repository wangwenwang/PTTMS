import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import { List, WhiteSpace, WingBlank, Button, InputItem, Picker, Toast } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions, createAction } from '../../../utils'
import style from './style'
import { createForm } from 'rc-form'

const styles = StyleSheet.create(style)
const CustomChildren = props => (
    <InputItem
        onClick={props.onClick}
        value={props.extra}
        editable={false}
        placeholder="请选择您驾驶车辆的车型"
    >车辆车型</InputItem>
);

@connect(({ myInfo, router }) => ({ ...myInfo, router }))
@createForm()
class Waybill extends Component {
  static navigationOptions = {
    title: '个人资料',
  }

    componentDidMount() {
        this.props.dispatch(createAction('myInfo/save')({ subLoading: false }))
        this.props.dispatch(createAction('myInfo/getVehicleType')())
    }

    // 提交验证
    onSubmit = () => {
        Keyboard.dismiss()
        const { getFieldProps, getFieldValue, getFieldsValue, getFieldError, resetFields, validateFields, setFields } = this.props.form
        validateFields({force: true}, (error) => {
            const memberInfo = this.props.navigation.state.params.memberInfo
            const info = getFieldsValue();
            if (!error) {
                if (!info.vehicleType) {
                    info.vehicleType = memberInfo.vehicleType.split()
                }
                this.props.dispatch(createAction('myInfo/changeInfo')(info))
            }
        });
    };

  render() {
    const { getFieldProps, getFieldValue, getFieldsValue, getFieldError, resetFields, validateFields, setFields } = this.props.form
    const memberInfo = this.props.navigation.state.params.memberInfo
    const { vehicleTypeList, subLoading } = this.props

    return (
      <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
              <TouchableOpacity  activeOpacity={1.0} onPress={() => Keyboard.dismiss()}>
              <WhiteSpace />
              <List>
                  <InputItem
                      { ...getFieldProps('name', {
                          validateFirst: true,
                          validateTrigger: 'onBlur',
                          initialValue: memberInfo.userName ? memberInfo.userName : '',
                          rules: [{
                              required: true,
                              message: '请输入有该单效期',
                          }],
                      })}
                      error={getFieldError('name')}
                      onErrorClick={() => Toast.info(getFieldError('name')[0], 1)}
                      clear
                      placeholder="请输入您的姓名"
                  >姓名</InputItem>
                  <InputItem
                      { ...getFieldProps('password', {
                      })}
                      clear
                      type="password"
                      placeholder="不改密码时不需要输入"
                  >密码</InputItem>
                  <InputItem
                      { ...getFieldProps('phone', {
                          validateFirst: true,
                          validateTrigger: 'onBlur',
                          initialValue: memberInfo.phone ? memberInfo.phone : '',
                          rules: [{
                              required: true,
                              message: '请输入手机号',
                          }],
                      })}
                      error={getFieldError('phone')}
                      onErrorClick={() => Toast.info(getFieldError('phone')[0], 1)}
                      clear
                      placeholder="请输入您的手机号"
                  >手机号</InputItem>
                  <InputItem
                      { ...getFieldProps('vicheNo', {
                          validateFirst: true,
                          validateTrigger: 'onBlur',
                          initialValue: memberInfo.vicheNo ? memberInfo.vicheNo : '',
                          rules: [{
                              required: true,
                              message: '请输入车牌号',
                          }],
                      })}
                      error={getFieldError('vicheNo')}
                      onErrorClick={() => Toast.info(getFieldError('vicheNo')[0], 1)}
                      clear
                      placeholder="请输入您驾驶车辆的车牌号"
                  >车牌号</InputItem>
                  <Picker
                      extra={memberInfo.vehicleType ? memberInfo.vehicleType : '请选择'}
                      data={vehicleTypeList}
                      cols={1}
                      { ...getFieldProps('vehicleType', {
                          // initialValue: memberInfo.vehicleType ? memberInfo.vehicleType.split() : [],
                      })}
                  >
                      <List.Item arrow="horizontal" >车辆车型</List.Item>
                  </Picker>
                  <InputItem
                      { ...getFieldProps('vehicleLength', {
                          validateFirst: true,
                          validateTrigger: 'onBlur',
                          initialValue: memberInfo.vehicleLength ? memberInfo.vehicleLength.toString() : '',
                          rules: [{
                              required: true,
                              message: '请输入车长',
                          }],
                      })}
                      error={getFieldError('vehicleLength')}
                      onErrorClick={() => Toast.info(getFieldError('vehicleLength')[0], 1)}
                      clear
                      placeholder="请输入您驾驶车辆的车长"
                  >车辆车长</InputItem>
                  <InputItem
                      { ...getFieldProps('vehicleWidth', {
                          validateFirst: true,
                          validateTrigger: 'onBlur',
                          initialValue: memberInfo.vehicleWidth ? memberInfo.vehicleWidth.toString() : '',
                          rules: [{
                              required: true,
                              message: '请输入车宽',
                          }],
                      })}
                      error={getFieldError('vehicleWidth')}
                      onErrorClick={() => Toast.info(getFieldError('vehicleWide')[0], 1)}
                      clear
                      placeholder="请输入您驾驶车辆的车宽"
                  >车辆车宽</InputItem>
                  <InputItem
                      { ...getFieldProps('vehicleHeight', {
                          validateFirst: true,
                          validateTrigger: 'onBlur',
                          initialValue: memberInfo.vehicleHeight ? memberInfo.vehicleHeight.toString() : '',
                          rules: [{
                              required: true,
                              message: '请输入车高',
                          }],
                      })}
                      error={getFieldError('vehicleHeight')}
                      onErrorClick={() => Toast.info(getFieldError('vehicleHeight')[0], 1)}
                      clear
                      placeholder="请输入您驾驶车辆的车高"
                  >车辆车高</InputItem>
              </List>
              <WhiteSpace />
              <WhiteSpace />
              <WingBlank>
                  <Button
                      style={subLoading ? styles.disableBtn : styles.btn}
                      type="primary"
                      disabled={subLoading}
                      onClick={this.onSubmit}
                  >{subLoading ? '保存中...' : '保存资料'}</Button>
              </WingBlank>
              <WhiteSpace />
              <WhiteSpace />
              </TouchableOpacity>
          </ScrollView>
      </View>
    )
  }
}

export default Waybill
