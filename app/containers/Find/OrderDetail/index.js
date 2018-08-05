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
    title: '发单详情',
  }

  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: '' }))
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <WhiteSpace />
          <View style={styles.info}>
            <View style={styles.infoLeft}>
              <Text style={styles.line}>
                <Text style={styles.title}>发布时间:</Text>
                <Text>2017-02-22</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>汽车规格:</Text>
                <Text>7.6米高栏</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>车牌号码:</Text>
                <Text>粤BU5309</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>手机号码:</Text>
                <Text>15302728676</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>调度手机:</Text>
                <Text>13965426465</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>选用时间:</Text>
                <Text>02-22 12：02</Text>
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
                <Text style={styles.title}>心理价格:</Text>
                <Text>800</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>调度姓名:</Text>
                <Text>杨承艳</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>状态:</Text>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: '#f63'}}>找货中</Text>
              </Text>
            </View>
          </View>
          <Text style={styles.note}>
            <Text style={styles.noteTitle}>备注：</Text>
            <Text>目前空车状态，可以随时装货启程可以随时装货启程可以随时装货启程</Text>
          </Text>
          <WhiteSpace />
          <WhiteSpace />
          <WingBlank>
            <Button style={styles.btn} type="primary">删除</Button>
          </WingBlank>
          <WhiteSpace />
          <WhiteSpace />
        </ScrollView>
      </View>
    )
  }
}

export default Waybill
