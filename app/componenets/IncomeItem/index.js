import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { WhiteSpace, Button, WingBlank } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions } from '../../utils'
import style from './style'

const styles = StyleSheet.create(style)

@connect()
class Income extends Component {

  render() {
    const { data } = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1}>
          <View style={styles.info}>
            <View style={styles.infoLeft}>
              <Text style={styles.line}>
                <Text style={styles.title}>发运时间:</Text>
                <Text>{data.shipmentTime}</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>运单号码:</Text>
                <Text>{data.shipmentCode}</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>运输协议:</Text>
                <Text>{data.transAgreement}</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>费用项目:</Text>
                <Text style={styles.type}>{data.feeProject}</Text>
              </Text>
            </View>
            <View style={styles.infoRight}>
              <Text style={styles.line}>
                <Text style={styles.title}>当前状态:</Text>
                <Text style={styles.status}>{data.balanceStatus}</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>起点城市:</Text>
                <Text>{data.startCity}</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>终点城市:</Text>
                <Text>{data.endCity}</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>收入金额:</Text>
                <Text style={styles.number}>{String(data.money)}</Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Income
