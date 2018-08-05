import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { WhiteSpace, List, Button } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions } from '../../../utils'
import style from './style'

const styles = StyleSheet.create(style)

const Item = List.Item

@connect()
class Waybill extends Component {
  static navigationOptions = {
    title: '交货确认',
  }

  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: '' }))
  }

  render() {
    // console.warn(this.props.navigation.state.params.id)
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <WhiteSpace />
          <View style={styles.info}>
            <View style={styles.infoLeft}>
              <Text style={styles.line}>
                <Text style={styles.title}>发车时间:</Text>
                <Text>04-23 19：58</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>运单号码:</Text>
                <Text>NT-DY170423190</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>承运商家:</Text>
                <Text>广州-孙同军</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>车牌号码:</Text>
                <Text>粤BU5309</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>运单状态:</Text>
                <Text>发运</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>到站状态:</Text>
                <Text>南头仓库已到站</Text>
              </Text>
            </View>
            <View style={styles.infoRight}>
              <Text style={styles.line}>
                <Text style={styles.title}>起点城市:</Text>
                <Text>三角</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>终点城市:</Text>
                <Text>南头</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>运送数量:</Text>
                <Text>159161</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>运送重量:</Text>
                <Text>1.8</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>运送体积:</Text>
                <Text>5.8</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>结算状态:</Text>
                <Text style={styles.status}>待结算</Text>
              </Text>
            </View>
          </View>
          <List renderHeader={() => '运单分站点'}>
            <Item
                arrow="horizontal"
                onClick={() => this.props.dispatch(NavigationActions.navigate({ routeName: 'SiteDetail' }))}
            >三角-南头</Item>
            <Item
                arrow="horizontal"
                onClick={() => this.props.dispatch(NavigationActions.navigate({ routeName: 'SiteDetail' }))}
            >南头-南头</Item>
          </List>
          <WhiteSpace />
          <WhiteSpace />
          <View style={{ flexDirection: 'row' }}>
            <Button
                style={[styles.button, styles.btn]}
                type="primary"
                onClick={() => {
                      this.props.dispatch(NavigationActions.navigate({ routeName: 'ArriveConfirm' }))
                  }}
            ><Text style={{fontSize: 16}}>到站确认</Text></Button>
            <WhiteSpace />
            <Button
                style={[styles.button, styles.btn]}
                type="primary"
                onClick={() => {
                      this.props.dispatch(NavigationActions.navigate({ routeName: 'DeliveryConfirm' }))
                  }}
            ><Text style={{fontSize: 16}}>全部交付</Text></Button>
            <WhiteSpace />
            <Button
                style={[styles.button, styles.btn]}
                type="primary"
                onClick={() => {
                      this.props.dispatch(NavigationActions.navigate({ routeName: 'Trace' }))
                  }}
            ><Text style={{fontSize: 16}}>在途追踪</Text></Button>
          </View>
          <WhiteSpace />
          <WhiteSpace />
        </ScrollView>
      </View>
    )
  }
}

export default Waybill
