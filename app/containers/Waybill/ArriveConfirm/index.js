import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import { List, WhiteSpace, WingBlank, Button, InputItem, Toast, Picker, DatePicker, TextareaItem } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions, createAction } from '../../../utils'
import style from './style'
import { createForm } from 'rc-form'
import moment from 'moment'

const styles = StyleSheet.create(style)

@connect(({ arriveConfirm, router }) => ({ ...arriveConfirm, router }))
@createForm()
class WaybillSearch extends Component {
  static navigationOptions = {
    title: '到站确认',
  }

    componentDidMount() {
        this.props.dispatch(createAction('arriveConfirm/save')({ subLoading: false }))
        const id = this.props.navigation.state.params.id
        this.props.dispatch(createAction('arriveConfirm/arriveRDC')(id))
    }

    // 提交验证
    onSubmit = () => {
        Keyboard.dismiss()
        const { getFieldsValue, validateFields } = this.props.form
        validateFields({force: true}, (error) => {
            const info = getFieldsValue()
            if (!error) {
                if (!info.arriveCompany) {
                    Toast.info('请选择分公司', 1, null, true)
                    return
                }
                if (!info.arriveTime) {
                    Toast.info('请选择到站时间', 1, null, true)
                    return
                }
                const id = this.props.navigation.state.params.id
                this.props.dispatch(createAction('arriveConfirm/arriveConfirm')({ ...info, id: id }))
            }
        })
    }

  render() {
    const { getFieldProps } = this.props.form
    const { RDCList, time, subLoading } = this.props

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
                      format={val => val.format('YYYY-MM-DD HH:mm')}
                      {...getFieldProps('arriveTime', {
                          initialValue: moment().utcOffset(8),
                      })}
                  >
                      <List.Item arrow="horizontal">到站时间</List.Item>
                  </DatePicker>
                  <TextareaItem
                      {...getFieldProps('remark', {
                      })}
                      placeholder="备注：(例)货物已送达"
                      rows={5}
                  />
              </List>
              <WhiteSpace />
              <WhiteSpace />
              <WingBlank>
                  <Button
                      style={subLoading ? styles.disableBtn : styles.btn}
                      type="primary"
                      disabled={subLoading}
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
