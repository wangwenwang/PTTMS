import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableNativeFeedback, Image } from 'react-native'
import { WhiteSpace, List, Button } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions } from '../../utils'
import style from './style'

const styles = StyleSheet.create(style)

const Item = List.Item

@connect()
class Waybill extends Component {
  render() {
    const { data } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.itemWrapper}>
          <View style={styles.info}>
            <View style={styles.infoLeft}>
              <Text style={styles.line}>
                <Text style={styles.title}>{data.businessType === 'PICKUP' ? '提货单号' : '送货单号:'}</Text>
                <Text>{data.deliveryNo}</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>接驳RDC:</Text>
                <Text>{data.rdc}</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>送货方式:</Text>
                <Text>{data.sendType}</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>订单状态:</Text>
                <Text>{data.shipmentStatus}</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>{data.businessType === 'PICKUP' ? '提货时间:' : '交货时间:'}</Text>
                <Text>{data.time}</Text>
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
            </View>
          </View>
          <View style={styles.info1}>
            <Text style={styles.line}>
              <Text style={styles.title}>交货人:</Text>
              <Text>{data.receiveName}</Text>
            </Text>
            <Text style={styles.line}>
              <Text style={styles.title}>{data.businessType === 'PICKUP' ? '提货地址:' : '送货地址:'}</Text>
              <Text>{data.address}</Text>
            </Text>
              {
                  data.showFlag === 2 ? <Text /> :
                      <View>
                          {
                            data.businessType !== 'PICKUP' ?
                                <View>
                                  <Text style={styles.line}>
                                    <Text style={styles.title}>派送要求:</Text>
                                    <Text>{data.send}</Text>
                                  </Text>
                                  <Text style={styles.line}>
                                    <Text style={styles.title}>签单要求:</Text>
                                    <Text>{data.signBill}</Text>
                                  </Text>
                                </View>
                                :
                                <Text style={styles.line}>
                                  <Text style={styles.title}>提货要求:</Text>
                                  <Text>{data.pickUpGoods}</Text>
                                </Text>
                          }
                        <Text style={styles.line}>
                          <Text style={styles.title}>装载要求:</Text>
                          <Text>{data.loading}</Text>
                        </Text>
                      </View>
              }
          </View>
          <View style={{flexDirection: 'row'}}>
              {
                data.isShowButton === 'T'  ?
                    <Button
                        style={[styles.button, styles.btn]}
                        type="primary"
                        onClick={() => {
                            if(data.sendType === '直送' || data.routeType !== 'MAINLINE') {
                                this.props.dispatch(NavigationActions.navigate({ routeName: 'DeliveryConfirm', params: { id: data.shipmentID, RDCId: data.operateRdcID, connectionRdcID: data.connectionRdcID, deliveryId: data.deliveryId } }))
                            } else{
                                this.props.dispatch(NavigationActions.navigate({ routeName: 'DeliveryConfirm', params: { id: data.shipmentID, RDCId: data.connectionRdcID, connectionRdcID: data.connectionRdcID, deliveryId: data.deliveryId } }))
                            }
                        }}
                    ><Text style={{ fontSize: 16 }}>交货确认</Text></Button> : <Text />
              }
            <WhiteSpace />
              {
                  data.businessType === 'PICKUP' ? <Text style={{height: 0}} /> :
                      <Button
                          style={[styles.button, styles.btn]}
                          type="primary"
                          onClick={() => {
                              this.props.dispatch(NavigationActions.navigate({ routeName: 'ReceiptUpload', params: { deliveryNo: data.omsNo } }))
                          }}
                      ><Text style={{ fontSize: 16 }}>回单上传</Text></Button>
              }
            <WhiteSpace />
            <Button
                style={[styles.button, styles.btn]}
                type="primary"
                onClick={() => {
                    this.props.dispatch(NavigationActions.navigate({ routeName: 'Trace', params: { deliveryId: data.deliveryId } }))
                }}
            ><Text style={{ fontSize: 16 }}>在途追踪</Text></Button>
          </View>
          <WhiteSpace />
          <WhiteSpace />
        </View>
        <WhiteSpace />
      </View>
    )
  }
}

export default Waybill
