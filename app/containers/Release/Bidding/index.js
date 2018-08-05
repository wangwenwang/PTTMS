import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import { List, WhiteSpace, WingBlank, Button, InputItem, Toast, TextareaItem } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions, createAction } from '../../../utils'
import style from './style'
import { createForm } from 'rc-form'

const styles = StyleSheet.create(style)

@connect(({ bidding, router }) => ({ ...bidding, router }))
@createForm()
class WaybillSearch extends Component {
  static navigationOptions = {
    title: '竞价',
  }

  componentDidMount() {
      this.props.dispatch(createAction('bidding/save')({ subLoading: false }))
      this.props.dispatch(createAction('bidding/localMemberInfo')())
  }

    // 提交验证
    onSubmit = () => {
        Keyboard.dismiss()
        const { getFieldProps, getFieldValue, getFieldsValue, getFieldError, resetFields, validateFields, setFields } = this.props.form
        validateFields({force: true}, (error) => {
            const info = getFieldsValue();
            if (!error) {
                this.props.dispatch(createAction('bidding/bidding')(info))
            }
        });
    };

  render() {
    const { getFieldProps, getFieldValue, getFieldsValue, getFieldError, resetFields, validateFields, setFields } = this.props.form
    const data = this.props.navigation.state.params.data
    const { memberInfo, subLoading } = this.props

    return (
      <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
              <TouchableOpacity  activeOpacity={1.0} onPress={() => Keyboard.dismiss()}>
              <WhiteSpace />
              <List style={{ backgroundColor: 'white' }}>
                  <InputItem
                      { ...getFieldProps('vehicleCode', {
                          initialValue: data.bidNumber,
                      })}
                      editable={false}
                  >投标号码</InputItem>
                  <InputItem
                      { ...getFieldProps('phone', {
                          validateFirst: true,
                          validateTrigger: 'onBlur',
                          initialValue: memberInfo.phone ? memberInfo.phone : '',
                          rules: [{
                              required: true,
                              message: '请输入您的手机号码',
                          }],
                      })}
                      error={getFieldError('phone')}
                      onErrorClick={() => Toast.info(getFieldError('phone')[0], 1)}
                      clear
                      type="number"
                      placeholder="请输入您的手机号码"
                  >手机号码</InputItem>
                  <InputItem
                      { ...getFieldProps('price', {
                          validateFirst: true,
                          validateTrigger: 'onBlur',
                          initialValue: data.price.toString(),
                          rules: [{
                              required: true,
                              message: '请输入您的竞价金额',
                          }],
                      })}
                      error={getFieldError('price')}
                      onErrorClick={() => Toast.info(getFieldError('price')[0], 1)}
                      clear
                      editable={data.tradingType !== '定价抢单'}
                      type="number"
                      placeholder="请输入您的竞价金额"
                  >竞价金额</InputItem>
                  <TextareaItem
                      { ...getFieldProps('remark', {
                      })}
                      placeholder="备注：(例)价格还可以面谈"
                      rows={5}
                  />
              </List>
              <WhiteSpace />
              <WhiteSpace />
              <WingBlank>
                  <Button
                      style={subLoading ? styles.disableBtn : styles.btn}
                      disabled={subLoading}
                      type="primary"
                      onClick={this.onSubmit}
                  >{subLoading ? '提交中...' : '提交'}</Button>
              </WingBlank>
              <WhiteSpace />
              <WhiteSpace />
              </TouchableOpacity>
          </ScrollView>
      </View>
    )
  }
}

export default WaybillSearch
