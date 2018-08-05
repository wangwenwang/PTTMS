import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { WhiteSpace, List, Button, WingBlank } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions } from '../../../utils'
import style from './style'

const styles = StyleSheet.create(style)

const Item = List.Item

@connect()
class Waybill extends Component {
  static navigationOptions = {
    title: '竞单详情',
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <WhiteSpace />
          <View style={styles.info}>
            <View style={styles.infoLeft}>
              <Text style={styles.line}>
                <Text style={styles.title}>发车时间:</Text>
                <Text>2017-02-22</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>投标号码:</Text>
                <Text>TB170519001</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>交易方式:</Text>
                <Text>竞价抢单</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>指定车型:</Text>
                <Text>7.6高栏</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>调度姓名:</Text>
                <Text>杨承艳</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>调度手机:</Text>
                <Text>15623568456</Text>
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
                <Text style={styles.title}>基础价格:</Text>
                <Text>2000</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>指定车辆:</Text>
                <Text>东风520</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>状态:</Text>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: '#f63'}}>竞价中</Text>
              </Text>
            </View>
          </View>
          <Text style={styles.note}>
            <Text style={styles.noteTitle}>发货地址：</Text>
            <Text>上海嘉定区刘翔公路5555号</Text>
          </Text>
          <Text style={[styles.note, {paddingBottom: 20}]}>
            <Text style={styles.noteTitle}>备注：</Text>
            <Text>早上6点发车</Text>
          </Text>
          <WhiteSpace />
          <WhiteSpace />
          <WingBlank>
            <Button
                style={styles.btn}
                type="primary"
                onClick={() => this.props.dispatch(NavigationActions.navigate({ routeName: 'Bidding' }))}
            >竞价</Button>
          </WingBlank>
          <WhiteSpace />
          <WhiteSpace />
        </ScrollView>
      </View>
    )
  }
}

export default Waybill
