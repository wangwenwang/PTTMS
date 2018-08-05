import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableWithoutFeedback, Image } from 'react-native'
import { WhiteSpace, List, Button } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions } from '../../../utils'
import style from './style'

const styles = StyleSheet.create(style)

const Item = List.Item

@connect()
class Waybill extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '分站点详情',
      headerRight: (
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={{ paddingRight: 30 }}>
              <Image source={require('../../../images/scan.png')} style={styles.search} />
            </View>
          </TouchableWithoutFeedback>
      ),
  })

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
                <Text style={styles.title}>送货单号:</Text>
                <Text>NT170221010_2</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>接驳RDC:</Text>
                <Text>NT-DY170423190</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>送货方式:</Text>
                <Text>直达</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>订单状态:</Text>
                <Text>发运</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.title}>交货时间:</Text>
                <Text>05-19 10:35</Text>
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
            </View>
          </View>
          <View style={styles.info1}>
            <Text style={styles.line}>
              <Text style={styles.title}>交货人:</Text>
              <Text>姓名</Text>
            </Text>
            <Text style={styles.line}>
              <Text style={styles.title}>送货地址:</Text>
              <Text>生产部_生产二部_灌装车间</Text>
            </Text>
          </View>
          <WhiteSpace />
          <WhiteSpace />
          <View style={{flexDirection: 'row'}}>
            <Button
                style={[styles.button, styles.btn]}
                type="primary"
                onClick={() => {
                      this.props.dispatch(NavigationActions.navigate({ routeName: 'DeliveryConfirm' }))
                  }}
            ><Text style={{ fontSize: 16 }}>交货确认</Text></Button>
            <WhiteSpace />
            <Button
                style={[styles.button, styles.btn]}
                type="primary"
                onClick={() => {
                      this.props.dispatch(NavigationActions.navigate({ routeName: 'ReceiptUpload' }))
                  }}
            ><Text style={{ fontSize: 16 }}>回单上传</Text></Button>
            <WhiteSpace />
            <Button
                style={[styles.button, styles.btn]}
                type="primary"
                onClick={() => {
                      this.props.dispatch(NavigationActions.navigate({ routeName: 'Trace' }))
                  }}
            ><Text style={{ fontSize: 16 }}>在途追踪</Text></Button>
          </View>
          <WhiteSpace />
          <WhiteSpace />
        </ScrollView>
      </View>
    )
  }
}

export default Waybill
