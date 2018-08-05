import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import { List, WhiteSpace, WingBlank, Button, InputItem, Picker, DatePicker } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions, createAction } from '../../../utils'
import style from './style'
import { createForm } from 'rc-form'
import moment from 'moment'

const styles = StyleSheet.create(style)
const orderStatus = [{
    label: '新单',
    value: 'NEW',
}, {
    label: '派单',
    value: 'AUDIT',
}, {
    label: '入库',
    value: 'INLOC',
}, {
    label: '装运',
    value: 'PLANED',
}, {
    label: '发运',
    value: 'SHIPPED',
}, {
    label: '交付',
    value: 'DELIVERED',
}, {
    label: '部分交付',
    value: 'PARTIALLY_DELIVERED',
}, {
    label: '回单',
    value: 'POD',
}, {
    label: '部分分解',
    value: 'PARTIAL',
}, {
    label: '全部卸货',
    value: 'ALL_UNLOAD',
}, {
    label: '部分卸货',
    value: 'PARTY_UNLOAD',
},  {
    label: '全部分解',
    value: 'ALLDECOMPOSITION',
}, {
    label: '取消发运',
    value: 'CANCEL',
}]
const balanceStatus = [{
    label: '预录入',
    value: 'NEW',
}, {
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
}]
const businessTypes = [{
    label: '提货',
    value: 'PICKUP',
}, {
    label: '派送',
    value: 'MAINLINE',
}]

@connect(({ waybillSearch, router }) => ({ ...waybillSearch, router }))
@createForm()
class WaybillSearch extends Component {
  static navigationOptions = {
    title: '运单筛选',
  }

  // 重置
    reset = () => {
        const { getFieldProps, getFieldValue, getFieldsValue, getFieldError, resetFields, validateFields, setFields } = this.props.form
        Keyboard.dismiss()
        this.props.dispatch(createAction('waybillSearch/save')({
            startTime: null,
            endTime: null,
            stateOrderStatus: null,
            stateBalanceStatus: null,
            deliveryNoinput: null,
            shipmentCodeinput: null,
            businessType: null,
        }))
        setFields({
            startTime: { value: null },
            endTime: { value: null },
            orderStatus: { value: null },
            balanceStatus: { value: null },
            deliveryNoinput: { value: null },
            shipmentCodeinput: { value: null },
            businessType: { value: null },
        })
    }

  render() {
      const { getFieldProps, getFieldValue, getFieldsValue, getFieldError, resetFields, validateFields, setFields } = this.props.form
      const { startTime, endTime, stateOrderStatus, stateBalanceStatus, deliveryNoinput, shipmentCodeinput, businessType } = this.props
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
      // console.warn(stateOrderStatus)
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
                          this.props.dispatch(createAction('waybillSearch/save')({ startTime: val }))
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
                          this.props.dispatch(createAction('waybillSearch/save')({ endTime: val }))
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
                          this.props.dispatch(createAction('waybillSearch/save')({ stateOrderStatus: val }))
                          setFields({
                              stateOrderStatus: { value: val }
                          })
                      }}
                  >
                      <List.Item arrow="horizontal">运单状态</List.Item>
                  </Picker>
                  <Picker
                      extra="请选择"
                      data={balanceStatus}
                      cols={1}
                      {...getFieldProps('balanceStatus', {
                          initialValue: stateBalanceStatus
                      })}
                      onChange={(val) => {
                          this.props.dispatch(createAction('waybillSearch/save')({ stateBalanceStatus: val }))
                          setFields({
                              balanceStatus: { value: val }
                          })
                      }}
                  >
                      <List.Item arrow="horizontal">结算状态</List.Item>
                  </Picker>
                  <Picker
                      extra="请选择"
                      data={businessTypes}
                      cols={1}
                      {...getFieldProps('businessType', {
                          initialValue: businessType
                      })}
                      onChange={(val) => {
                          this.props.dispatch(createAction('waybillSearch/save')({ businessType: val }))
                          setFields({
                              businessType: { value: val }
                          })
                      }}
                  >
                      <List.Item arrow="horizontal">运单类型</List.Item>
                  </Picker>
                  <InputItem
                      clear
                      placeholder="请输入送货单号"
                      {...getFieldProps('deliveryNoinput', {
                          initialValue: deliveryNoinput
                      })}
                      onChange={(val) => {
                          this.props.dispatch(createAction('waybillSearch/save')({ deliveryNoinput: val }))
                          setFields({
                              deliveryNoinput: { value: val }
                          })
                      }}
                  >送货单号</InputItem>
                  <InputItem
                      clear
                      placeholder="请输入运单号"
                      {...getFieldProps('shipmentCodeinput', {
                          initialValue: shipmentCodeinput
                      })}
                      onChange={(val) => {
                          this.props.dispatch(createAction('waybillSearch/save')({ shipmentCodeinput: val }))
                          setFields({
                              shipmentCodeinput: { value: val }
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
                          this.props.dispatch(NavigationActions.navigate({ routeName: 'Waybill', params: { searchValue: getFieldsValue() } }))
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
