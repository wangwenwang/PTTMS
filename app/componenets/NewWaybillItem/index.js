import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { WhiteSpace, List, Button } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions } from '../../utils'
import style from './style'

const styles = StyleSheet.create(style)

@connect()
class WaybillItem extends Component {

  render() {
    // console.warn(this.props.navigation.state.params.id)
    const { data } = this.props
    // 判断状态以确定按钮是否可以点击
    let isArrive, isDeliver, title
      if (data.arriveStatus !== '' && data.arriveStatus !== null && (data.shipmentStatus === '发运' || data.shipmentStatus === '部分交付')) {
          isDeliver = true
      } else {
          isDeliver = false
      }
      if (data.flag > 0) {
          isArrive = true
      } else {
          isArrive = false
      }
      if (data.businessType === 'PICKUP') {
          title = '提货单明细'
      } else {
          title = '送货单明细'
      }
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} onPress={() => this.props.dispatch(NavigationActions.navigate({ routeName: 'WaybillDetailNew', params: { shipmentCode: data.shipmentCode, title: title } }))}>
          <View style={styles.itemWrapper}>
            <View style={styles.info}>
              <View style={styles.infoLeft}>
                <Text style={styles.line}>
                  <Text style={styles.title}>发车时间:</Text>
                  <Text>{data.shipmentTime}</Text>
                </Text>
                <Text style={styles.line}>
                  <Text style={styles.title}>运单号码:</Text>
                  <Text>{data.shipmentCode}</Text>
                </Text>
                <Text style={styles.line}>
                  <Text style={styles.title}>承运商家:</Text>
                  <Text>{data.transName}</Text>
                </Text>
                <Text style={styles.line}>
                  <Text style={styles.title}>车牌号码:</Text>
                  <Text>{data.vehicleCode}</Text>
                </Text>
                <Text style={styles.line}>
                  <Text style={styles.title}>运单状态:</Text>
                  <Text>{data.shipmentStatus}</Text>
                </Text>
                <Text style={styles.line}>
                  <Text style={styles.title}>到站状态:</Text>
                  <Text>{data.arriveStatus}</Text>
                </Text>
              </View>
              <View style={styles.infoRight}>
                <Text style={styles.line}>
                  <Text style={styles.title}>起点城市:</Text>
                  <Text>{data.startCity}</Text>
                </Text>
                <Text style={styles.line}>
                  <Text style={styles.title}>终点城市:</Text>
                  <Text>{data.endCity}</Text>
                </Text>
                <Text style={styles.line}>
                  <Text style={styles.title}>运送数量:</Text>
                  <Text>{data.quantity.toString()}</Text>
                </Text>
                <Text style={styles.line}>
                  <Text style={styles.title}>运送重量:</Text>
                  <Text>{data.weight.toString()}</Text>
                </Text>
                <Text style={styles.line}>
                  <Text style={styles.title}>运送体积:</Text>
                  <Text>{data.volume.toString()}</Text>
                </Text>
                <Text style={styles.line}>
                  <Text style={styles.title}>结算状态:</Text>
                  <Text style={styles.status}>{data.balanceStatus}</Text>
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                {
                    isArrive ?
                        <Button
                            style={[styles.button, styles.btn]}
                            type="primary"
                            onClick={() => {
                                this.props.dispatch(NavigationActions.navigate({ routeName: 'ArriveConfirm', params: { id: data.id } }))
                            }}
                        >
                          <Text style={{fontSize: 16}}>到站确认</Text>
                        </Button> : <Text />
                }
                {
                    isDeliver ?
                        <Button
                            style={[styles.button, styles.btn]}
                            type="primary"
                            onClick={() => {
                                this.props.dispatch(NavigationActions.navigate({ routeName: 'DeliveryConfirm', params: { id: data.id } }))
                            }}
                        >
                          <Text style={{fontSize: 16}}>全部交付</Text>
                        </Button> : <Text />
                }
              <Button
                  style={[styles.button, styles.btn]}
                  type="primary"
                  onClick={() => {
                      this.props.dispatch(NavigationActions.navigate({ routeName: 'Trace', params: { id: data.id } }))
                  }}
              ><Text style={{fontSize: 16}}>在途追踪</Text></Button>
            </View>
            <WhiteSpace />
            <WhiteSpace />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default WaybillItem
