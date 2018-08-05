import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import { List, WhiteSpace, WingBlank, Button, InputItem, Picker, DatePicker } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions, createAction } from '../../../utils'
import style from './style'
import { createForm } from 'rc-form'
import moment from 'moment'

const styles = StyleSheet.create(style)
const balanceStatus = [
    {
        label: '待结算',
        value: 'CONFIRM',
    }, {
        label: '部分结算',
        value: 'NOT_ALL_CHARGE',
    }, {
        label: '结算完成',
        value: 'ALL_CHARGE',
    }, {
        label: '开票完成',
        value: 'INVOICE',
    }, {
        label: '部分开票',
        value: 'PART_INVOICE',
    },
];

@connect(({ incomeSearch, income, router }) => ({ ...incomeSearch, ...income, router }))
@createForm()
class WaybillSearch extends Component {
  static navigationOptions = {
    title: '筛选',
  }

    // 重置
    reset = () => {
        Keyboard.dismiss()
        this.props.dispatch(createAction('incomeSearch/save')({
            startTime: null,
            endTime: null,
            stateBalanceStatus: null,
            transAgreement: null,
            deliveryNo: null,
        }))
        const { setFields } = this.props.form
        setFields({
            startTime: { value: null },
            endTime: { value: null },
            balanceStatus: { value: null },
            transAgreement: { value: null },
            deliveryNo: { value: null },
        })
    }

  render() {
      const { getFieldProps, getFieldValue, getFieldsValue, getFieldError, resetFields, validateFields, setFields } = this.props.form
      const { startTime, endTime, stateBalanceStatus, transAgreement, deliveryNo } = this.props
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
                      title="选择日期"
                      extra="请选择"
                      format={val => val.format('YYYY-MM-DD')}
                      {...getFieldProps('startTime', {
                          initialValue: calStartTime
                      })}
                      onChange={(val) => {
                          this.props.dispatch(createAction('incomeSearch/save')({ startTime: val }))
                          setFields({
                              startTime: { value: val }
                          })
                      }}
                  >
                      <List.Item arrow="horizontal">开始日期</List.Item>
                  </DatePicker>
                  <DatePicker
                      mode="date"
                      title="选择日期"
                      extra="请选择"
                      format={val => val.format('YYYY-MM-DD')}
                      {...getFieldProps('endTime', {
                          initialValue: calEndTime
                      })}
                      onChange={(val) => {
                          this.props.dispatch(createAction('incomeSearch/save')({ endTime: val }))
                          setFields({
                              endTime: { value: val }
                          })
                      }}
                  >
                      <List.Item arrow="horizontal">结束日期</List.Item>
                  </DatePicker>
                  <Picker
                      extra="请选择"
                      data={balanceStatus}
                      cols={1}
                      {...getFieldProps('balanceStatus', {
                          initialValue: stateBalanceStatus
                      })}
                      onChange={(val) => {
                          this.props.dispatch(createAction('incomeSearch/save')({ stateBalanceStatus: val }))
                          setFields({
                              balanceStatus: { value: val }
                          })
                      }}
                  >
                      <List.Item arrow="horizontal">结算状态</List.Item>
                  </Picker>
                  <InputItem
                      clear
                      placeholder="请输入运输协议号"
                      {...getFieldProps('transAgreement', {
                          initialValue: transAgreement
                      })}
                      onChange={(val) => {
                          this.props.dispatch(createAction('incomeSearch/save')({ transAgreement: val }))
                          setFields({
                              transAgreement: { value: val }
                          })
                      }}
                  >运输协议</InputItem>
                  <InputItem
                      clear
                      placeholder="请输入运单号"
                      {...getFieldProps('deliveryNo', {
                          initialValue: deliveryNo
                      })}
                      onChange={(val) => {
                          this.props.dispatch(createAction('incomeSearch/save')({ deliveryNo: val }))
                          setFields({
                              deliveryNo: { value: val }
                          })
                      }}
                  >运单号</InputItem>
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
                          this.props.dispatch(createAction('income/save')({ searchValue: getFieldsValue() }))
                          this.props.dispatch(createAction('income/getIncomeList')())
                          this.props.navigation.goBack()
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
