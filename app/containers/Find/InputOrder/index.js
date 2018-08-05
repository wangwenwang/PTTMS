import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Keyboard } from 'react-native'
import { WhiteSpace, List, Button, InputItem, WingBlank, TextareaItem, DatePicker, Toast, Picker } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions, createAction } from '../../../utils'
import style from './style'
import { createForm } from 'rc-form'
import moment from 'moment'

const styles = StyleSheet.create(style)

const Item = List.Item

@connect(({ inputOrder, router }) => ({ ...inputOrder, router }))
@createForm()
class Waybill extends Component {
  static navigationOptions = {
    title: '发布空车',
  }

    componentDidMount() {
        this.props.dispatch(createAction('inputOrder/save')({ subLoading: false }))
        this.props.dispatch(createAction('inputOrder/localMemberInfo')())
        this.props.dispatch(createAction('inputOrder/getVehicleType')())
        this.props.dispatch(createAction('inputOrder/getLocation')())
    }

  // 提交验证
  onSubmit = () => {
    Keyboard.dismiss()
    const { getFieldProps, getFieldValue, getFieldsValue, getFieldError, resetFields, validateFields, setFields } = this.props.form
    validateFields({force: true}, (error) => {
        const info = getFieldsValue();
        if (!error) {
            if (info.time === undefined) {
                info.time = moment().format().substring(0, 10)
            }
            if (info.vehicleType === undefined) {
                const { memberInfo } = this.props
                if (memberInfo.vehicleType) {
                    info.vehicleType = memberInfo.vehicleType
                } else {
                    Toast.info('请选择车辆车型', 1, null, true)
                    return
                }
            }
            this.props.dispatch(createAction('inputOrder/findOrder')(info))
        }
    });
  };

  render() {
    const { getFieldProps, getFieldValue, getFieldsValue, getFieldError, resetFields, validateFields, setFields } = this.props.form
    const { vehicleTypeList, memberInfo, location, subLoading } = this.props
      // console.warn(JSON.stringify(memberInfo))

    return (
      <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
              <TouchableOpacity  activeOpacity={1.0} onPress={() => Keyboard.dismiss()}>
          <WhiteSpace />
          <List>
            <DatePicker
                mode="date"
                format={val => val.format('YYYY-MM-DD')}
                { ...getFieldProps('time', {
                    initialValue: moment().utcOffset(8),
                })}
            >
              <List.Item arrow="horizontal">选择日期</List.Item>
            </DatePicker>
            <InputItem
                { ...getFieldProps('validity', {
                    validateFirst: true,
                    validateTrigger: 'onBlur',
                    rules: [{
                        required: true,
                        message: '请输入有该单效期',
                    }],
                })}
                error={getFieldError('validity')}
                onErrorClick={() => Toast.info(getFieldError('validity')[0], 1)}
                clear
                type="number"
                placeholder="请输入有该单效期"
            >有效期/h</InputItem>
            <InputItem
                { ...getFieldProps('startCity', {
                    validateFirst: true,
                    validateTrigger: 'onBlur',
                    rules: [{
                        required: true,
                        message: '请输入起点城市',
                    }],
                })}
                error={getFieldError('startCity')}
                onErrorClick={() => Toast.info(getFieldError('startCity')[0], 1)}
                clear
                placeholder="请输入起点城市"
            >起点城市</InputItem>
            <InputItem
                { ...getFieldProps('endCity', {
                    validateFirst: true,
                    validateTrigger: 'onBlur',
                    rules: [{
                        required: true,
                        message: '请输入终点城市',
                    }],
                })}
                error={getFieldError('endCity')}
                onErrorClick={() => Toast.info(getFieldError('endCity')[0], 1)}
                clear
                placeholder="请输入终点城市"
            >终点城市</InputItem>
            <InputItem
                { ...getFieldProps('vehicleCode', {
                    validateFirst: true,
                    validateTrigger: 'onBlur',
                    initialValue: memberInfo.vicheNo ? memberInfo.vicheNo : '',
                    rules: [{
                        required: true,
                        message: '请输入车牌号码',
                    }],
                })}
                error={getFieldError('vehicleCode')}
                onErrorClick={() => Toast.info(getFieldError('vehicleCode')[0], 1)}
                clear
                placeholder="请输入车牌号码"
            >车牌号码</InputItem>
            <InputItem
                { ...getFieldProps('phone', {
                    validateFirst: true,
                    validateTrigger: 'onBlur',
                    initialValue: memberInfo.phone ? memberInfo.phone : '',
                    rules: [{
                        required: true,
                        message: '请输入手机号码',
                    }],
                })}
                error={getFieldError('phone')}
                onErrorClick={() => Toast.info(getFieldError('phone')[0], 1)}
                clear
                type="number"
                placeholder="请输入手机号码"
            >手机号码</InputItem>
            <Picker
                extra={ memberInfo.vehicleType ? memberInfo.vehicleType : '请选择'}
                data={vehicleTypeList}
                cols={1}
                {...getFieldProps('vehicleType', {
                })}
            >
              <List.Item arrow="horizontal">车辆车型</List.Item>
            </Picker>
            <InputItem
                { ...getFieldProps('position', {
                    validateFirst: true,
                    validateTrigger: 'onBlur',
                    initialValue: location,
                    rules: [{
                        required: true,
                        message: '请输入您当前位置',
                    }],
                })}
                error={getFieldError('position')}
                onErrorClick={() => Toast.info(getFieldError('position')[0], 1)}
                clear
                placeholder="请输入您当前位置"
            >当前位置</InputItem>
            <InputItem
                { ...getFieldProps('price', {
                })}
                clear
                type="number"
                placeholder="请输入您期望的价格"
            >期望价格</InputItem>
            <TextareaItem
                { ...getFieldProps('remark', {
                })}
                placeholder="备注：(例)空车随时可以装货"
                clear
                rows={3}
            />
          </List>
          <WingBlank>
            <WhiteSpace />
            <WhiteSpace />
            <Button
                style={subLoading ? styles.disableBtn : styles.btn}
                type="primary"
                onClick={this.onSubmit}
            >{subLoading ? '发布中...' : '发布'}</Button>
            <WhiteSpace />
            <WhiteSpace />
          </WingBlank>
        </TouchableOpacity>
      </ScrollView>
      </View>
    )
  }
}

export default Waybill
