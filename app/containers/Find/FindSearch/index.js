import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import { List, WhiteSpace, WingBlank, Button, InputItem, Picker, DatePicker } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions, createAction } from '../../../utils'
import style from './style'
import { createForm } from 'rc-form'
import moment from 'moment'

const styles = StyleSheet.create(style)
const orderStatus = [
{
    label: '找货中',
    value: 'UN_FINISH',
}, {
    label: '已完成',
    value: 'FINISH',
}, {
    label: '已作废',
    value: 'CANCEL',
}]

@connect(({ findSearch, router }) => ({ ...findSearch, router }))
@createForm()
class WaybillSearch extends Component {
  static navigationOptions = {
    title: '找单筛选',
  }

  // 重置
    reset = () => {
        Keyboard.dismiss()
        this.props.dispatch(createAction('findSearch/save')({
            startTime: null,
            endTime: null,
            stateOrderStatus: null,
        }))
        const { setFields } = this.props.form
        setFields({
            startTime: { value: null },
            endTime: { value: null },
            orderStatus: { value: null },
        })
    }

  render() {
      const { getFieldProps, getFieldValue, getFieldsValue, getFieldError, resetFields, validateFields, setFields } = this.props.form
      const { startTime, endTime, stateOrderStatus } = this.props
      let calStartTime, calEndTime
      if (startTime === null) {
          calStartTime = null
      } else {
          calStartTime = moment(startTime, 'YYYY-MM-DD Z').utcOffset(8);
      }
      if (endTime === null) {
          calEndTime = null
      } else {
          calEndTime = moment(endTime, 'YYYY-MM-DD Z').utcOffset(8);
      }
    return (
      <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
              <TouchableOpacity  activeOpacity={1.0} onPress={() => Keyboard.dismiss()}>
              <WhiteSpace />
              <List
                  className="date-picker-list"
                  style={{ backgroundColor: 'white' }}
              >
                  <DatePicker
                      mode="date"
                      extra="请选择"
                      format={val => val.format('YYYY-MM-DD')}
                      {...getFieldProps('startTime', {
                          initialValue: calStartTime
                        })}
                      onChange={(val) => {
                          this.props.dispatch(createAction('findSearch/save')({ startTime: val }))
                          setFields({
                              startTime: { value: val }
                          })
                      }}
                  >
                      <List.Item arrow="horizontal">开始日期</List.Item>
                  </DatePicker>
                  <DatePicker
                      mode="date"
                      extra="请选择"
                      format={val => val.format('YYYY-MM-DD')}
                      {...getFieldProps('endTime', {
                          initialValue: calEndTime
                      })}
                      onChange={(val) => {
                          this.props.dispatch(createAction('findSearch/save')({ endTime: val }))
                          setFields({
                              endTime: { value: val }
                          })
                      }}
                  >
                      <List.Item arrow="horizontal">结束日期</List.Item>
                  </DatePicker>
                  <Picker
                      extra="请选择"
                      data={orderStatus}
                      cols={1}
                      {...getFieldProps('orderStatus', {
                          initialValue: stateOrderStatus
                      })}
                      onChange={(val) => {
                          this.props.dispatch(createAction('findSearch/save')({ stateOrderStatus: val }))
                          setFields({
                              stateOrderStatus: { value: val }
                          })
                      }}
                  >
                      <List.Item arrow="horizontal">找单状态</List.Item>
                  </Picker>
              </List>
              <WhiteSpace />
              <WhiteSpace />
              <View style={{ flexDirection: 'row' }}>
                  <Button
                      style={[styles.button, styles.btn]}
                      type="primary"
                      onClick={this.reset}
                  >重置</Button>
                  <Button
                      style={[styles.button, styles.btn]}
                      type="primary"
                      onClick={() => {
                          Keyboard.dismiss()
                          this.props.dispatch(NavigationActions.navigate({ routeName: 'Find', params: { searchValue: getFieldsValue() } }))
                      }}
                  >筛选</Button>
              </View>
              <WhiteSpace />
              <WhiteSpace />
              </TouchableOpacity>
          </ScrollView>
      </View>
    )
  }
}

export default WaybillSearch
