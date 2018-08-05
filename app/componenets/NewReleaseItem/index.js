import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { WhiteSpace, List, Toast, Button, WingBlank } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions } from '../../utils'
import style from './style'

const styles = StyleSheet.create(style)

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
                <Text style={styles.title}>发车时间:</Text>
                <Text>{data.requireDate}</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>投标号码:</Text>
                <Text>{data.bidNumber}</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>交易方式:</Text>
                <Text>{data.tradingType}</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>指定车型:</Text>
                <Text>{data.vehicleType}</Text>
              </Text>
                {
                    data.status === '已竞价' ?
                        <Text style={styles.line}>
                          <Text style={styles.title}>调度手机:</Text>
                          <Text>{data.dispatchPhone}</Text>
                        </Text> : <Text style={{height: 0}} />
                }
              <Text style={styles.line}>
                <Text style={styles.title}>状态:</Text>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: '#f63'}}>{data.status}</Text>
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
                <Text style={styles.title}>指定车辆:</Text>
                <Text>{data.vehicle}</Text>
              </Text>
                {
                    data.status === '已竞价' ?
                        <Text style={styles.line}>
                          <Text style={styles.title}>调度姓名:</Text>
                          <Text>{data.dispatchName}</Text>
                        </Text> : <Text style={{height: 0}} />
                }
            </View>
          </View>
          <Text style={styles.note}>
            <Text style={styles.noteTitle}>发货地址：</Text>
            <Text>{data.address}</Text>
          </Text>
          <Text style={[styles.note, {paddingBottom: 5}]}>
            <Text style={styles.noteTitle}>备注：</Text>
            <Text>{data.remark}</Text>
          </Text>
            {
                data.status !== '竞价中' ? <Text /> :
                    <WingBlank>
                      <Button
                          style={[styles.btn, styles.button]}
                          type="primary"
                          inline size="small"
                          onClick={() => {
                                this.props.dispatch(NavigationActions.navigate({ routeName: 'Bidding', params: { data: data } }))
                          }}
                      ><Text style={{ fontSize: 16 }}>竞价</Text></Button>
                    </WingBlank>
            }
          <WhiteSpace />
        </View>
      </View>
    )
  }
}

export default Waybill
