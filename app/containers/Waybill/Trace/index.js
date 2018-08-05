import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import { List, WhiteSpace, WingBlank, Button, InputItem, Picker, Toast } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions, createAction } from '../../../utils'
import style from './style'
import { createForm } from 'rc-form'

const styles = StyleSheet.create(style)
const trackType = [{
    label: '追踪信息',
    value: '追踪信息'
}, {
    label: '异常',
    value: '异常'
}]

@connect(({ trace, router }) => ({ ...trace, router }))
@createForm()
class Waybill extends Component {
  static navigationOptions = {
    title: '在途追踪',
  }

    // 提交验证
    onSubmit = () => {
        Keyboard.dismiss()
        const { getFieldsValue, validateFields } = this.props.form
        validateFields({ force: true }, (error) => {
            const info = getFieldsValue()
            if (!error) {
                const id = this.props.navigation.state.params.id
                const deliveryId = this.props.navigation.state.params.deliveryId
                if (id) {
                    this.props.dispatch(createAction('trace/trace')({ ...info, id: id }))
                } else {
                    this.props.dispatch(createAction('trace/trace')({ ...info, deliveryId: deliveryId }))
                }
            }
        })
    }

    componentDidMount() {
        this.props.dispatch(createAction('trace/save')({ subLoading: false }))
        this.props.dispatch(createAction('trace/getMemberInfo')())
        this.props.dispatch(createAction('trace/getLocation')())
    }

  render() {
    const { getFieldProps, getFieldError, getFieldsValue, setFieldsValue } = this.props.form
    const { memberInfo, subLoading, location } = this.props
    return (
      <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
              <TouchableOpacity  activeOpacity={1.0} onPress={() => Keyboard.dismiss()}>
              <WhiteSpace />
              <List>
                  <InputItem
                      {...getFieldProps('name', {
                          initialValue: memberInfo.userName ? memberInfo.userName : ''
                      })}
                      editable={false}
                  >操作人</InputItem>
                  <Picker
                      data={trackType}
                      cols={1}
                      {...getFieldProps('trackType', {
                          initialValue: ['追踪信息'],
                          onChange(){
                              setTimeout(function () {
                                  const info = getFieldsValue()
                                  if (info.trackType[0] === '追踪信息') {
                                      setFieldsValue({
                                          'remark': location,
                                      });
                                  } else if (info.trackType[0] === '异常') {
                                      setFieldsValue({
                                          'remark': '',
                                      });
                                  }
                              }, 300);

                          }
                      })}
                  >
                      <List.Item arrow="horizontal">类型</List.Item>
                  </Picker>
                  <InputItem
                      { ...getFieldProps('remark', {
                          validateFirst: true,
                          validateTrigger: 'onBlur',
                          initialValue: location,
                          rules: [{
                              required: true,
                              message: '请输入收货人姓名',
                          }],
                      })}
                      error={getFieldError('remark')}
                      onErrorClick={() => Toast.info(getFieldError('remark')[0], 1)}
                      clear
                      placeholder="请输入相关信息"
                  >信息</InputItem>
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

export default Waybill
