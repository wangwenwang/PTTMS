import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { WhiteSpace, List, Button, WingBlank, Toast } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions } from '../../utils'
import style from './style'

const styles = StyleSheet.create(style)

const Item = List.Item

@connect()
class Waybill extends Component {
  // 取消空单
    cancle = () => {
        const { data } = this.props
        this.props.cancleOrder(data.id)
    }
  render() {
    const { data } = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity  activeOpacity={1}>
          <View style={styles.itemWrapper}>
            <View style={styles.info}>
              <View style={styles.infoLeft}>
                <Text style={styles.line}>
                  <Text style={styles.title}>发布时间:</Text>
                  <Text>{data.operationDate}</Text>
                </Text>
                <Text style={styles.line}>
                  <Text style={styles.title}>汽车规格:</Text>
                  <Text>{data.vehicleType}</Text>
                </Text>
                <Text style={styles.line}>
                  <Text style={styles.title}>车牌号码:</Text>
                  <Text>{data.vehicleCode}</Text>
                </Text>
                <Text style={styles.line}>
                  <Text style={styles.title}>手机号码:</Text>
                  <Text>{data.phone}</Text>
                </Text>
                <Text style={styles.line}>
                  <Text style={styles.title}>调度手机:</Text>
                  <Text>{data.dispatchPhone}</Text>
                </Text>
                <Text style={styles.line}>
                  <Text style={styles.title}>选用时间:</Text>
                  <Text>{data.selectDate}</Text>
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
                  <Text style={styles.title}>期望价格:</Text>
                  <Text>{data.price.toString()}</Text>
                </Text>
                <Text style={styles.line}>
                  <Text style={styles.title}>调度姓名:</Text>
                  <Text>{data.dispatchName}</Text>
                </Text>
                <Text style={styles.line}>
                  <Text style={styles.title}>状态:</Text>
                  <Text style={{fontSize: 16, fontWeight: 'bold', color: '#f63'}}>{data.status}</Text>
                </Text>
              </View>
            </View>
            <Text style={styles.note}>
              <Text style={styles.title}>当前位置:</Text>
              <Text>{data.currentLocation}</Text>
            </Text>
            <Text style={styles.note}>
              <Text style={styles.noteTitle}>备注：</Text>
              <Text>{data.remark}</Text>
            </Text>
              {
                data.status === '未选用' ?
                    <WingBlank>
                      <Button
                          style={[styles.btn, styles.button]}
                          type="primary"
                          inline
                          size="small"
                          onClick={this.cancle}
                      >
                        <Text style={{ fontSize: 16 }}>作废</Text>
                      </Button>
                    </WingBlank> : <Text style={{ height: 0 }} />
              }
            <WhiteSpace />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Waybill
