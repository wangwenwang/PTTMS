import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Keyboard, Alert } from 'react-native'
import { List, WhiteSpace, WingBlank, Button, InputItem, Picker, DatePicker, Toast, TextareaItem } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions, createAction } from '../../../utils'
import style from './style'
import { createForm } from 'rc-form'
import moment from 'moment'

const styles = StyleSheet.create(style)

@connect(({ deliveryConfirm, router }) => ({ ...deliveryConfirm, router }))
@createForm()
class WaybillSearch extends Component {
  static navigationOptions = {
    title: '交货确认',
  }

    componentDidMount() {
        this.props.dispatch(createAction('deliveryConfirm/save')({ subLoading: false }))

        const id = this.props.navigation.state.params.id
        const RDCId = this.props.navigation.state.params.RDCId

        if (RDCId) {
            this.props.dispatch(createAction('deliveryConfirm/deliveryRDC')({ id: id, RDCId: RDCId }))
        } else {
            this.props.dispatch(createAction('deliveryConfirm/deliveryRDC')({ id: id }))
        }
    }


    // 提交验证
    onSubmit = () => {
        Keyboard.dismiss()
        const { getFieldsValue, validateFields } = this.props.form
        validateFields({ force: true }, (error) => {
            const info = getFieldsValue()
            const connectionRdcID = this.props.navigation.state.params.connectionRdcID
            const id = this.props.navigation.state.params.id
            const deliveryId = this.props.navigation.state.params.deliveryId
            if (!error) {
                if (!info.arriveCompany) {
                    Toast.info('请选择分公司', 1, null, true)
                    return
                }
                if (!info.arriveTime) {
                    Toast.info('请选择交货时间', 1, null, true)
                    return
                }
                if (connectionRdcID && connectionRdcID != info.arriveCompany.join()) {
                    Alert.alert('提示', '接驳分公司和选择的分公司不一样，是否要交付？',
                        [
                            {text: '确定', onPress: () => this.props.dispatch(createAction('deliveryConfirm/deliveryConfirm')({ ...info, id: id, deliveryId: deliveryId }))},
                            {text: '取消'}
                        ]
                    )
                } else {
                    this.props.dispatch(createAction('deliveryConfirm/deliveryConfirm')({ ...info, id: id, deliveryId: deliveryId }))
                }
            }
        })
    }

  render() {
    const { getFieldProps, getFieldError } = this.props.form
    const { RDCList, subLoading } = this.props

    return (
      <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
              <TouchableOpacity  activeOpacity={1.0} onPress={() => Keyboard.dismiss()}>
              <WhiteSpace />
              <List
                  className="date-picker-list"
                  style={{ backgroundColor: 'white' }}
              >
                  <Picker
                      extra="请选择"
                      data={RDCList}
                      cols={1}
                      {...getFieldProps('arriveCompany', {
                          initialValue: RDCList.length ? [RDCList[0].value] : null
                      })}
                  >
                      <List.Item arrow="horizontal">分公司</List.Item>
                  </Picker>
                  <DatePicker
                      mode="datetime"
                      // onChange={this.onChange}
                      // value={this.state.date}
                      format={val => val.format('YYYY-MM-DD HH:mm')}
                      {...getFieldProps('arriveTime', {
                          initialValue: moment().utcOffset(8),
                      })}
                  >
                      <List.Item arrow="horizontal">交货时间</List.Item>
                  </DatePicker>
                  <InputItem
                    { ...getFieldProps('receiveName', {
                          validateFirst: true,
                          validateTrigger: 'onBlur',
                          rules: [{
                              required: true,
                              message: '请输入收货人姓名',
                          }],
                      })}
                      error={getFieldError('receiveName')}
                      onErrorClick={() => Toast.info(getFieldError('receiveName')[0], 1)}
                      clear
                      placeholder="请输入收货人姓名"
                  >收货人</InputItem>
              </List>
              <WhiteSpace />
              <WhiteSpace />
              <WingBlank>
                  <Button
                      style={subLoading ? styles.disableBtn : styles.btn}
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
