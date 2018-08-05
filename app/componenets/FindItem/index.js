import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableNativeFeedback, Image } from 'react-native'
import { WhiteSpace } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions } from '../../utils'
import style from './style'

const styles = StyleSheet.create(style)

@connect()
class WaybillItem extends Component {

  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableNativeFeedback onPress={() => this.props.dispatch(NavigationActions.navigate({ routeName: 'OrderDetail' }))}>
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemHeader}>
                <Text style={styles.itemHeaderTitle}>发布时间：</Text>
                <Text style={styles.itemHeaderText}>05-20 10:35</Text>
              </Text>
              <View style={styles.itemContent}>
                <View style={styles.itemContentLeft}>
                  <View style={{flexDirection: 'row', paddingBottom: 8}}>
                    <Text style={[styles.address, styles.begin]}>起</Text>
                    <Text style={styles.text}>深圳</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.address, styles.end]}>终</Text>
                    <Text style={styles.text}>佛山</Text>
                  </View>
                </View>
                <View style={styles.itemContentRight}>
                  <Text style={[styles.text, styles.itemContentRightTop]}>
                    <Text>价格：</Text>
                    <Text style={styles.price}>600</Text>
                  </Text>
                  <Text style={styles.text}>
                    <Text>状态：</Text>
                    <Text style={styles.status}>找货中</Text>
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.itemRight}>
              <Image source={require('../../images/right.png')} style={styles.right} />
            </View>
          </View>
        </TouchableNativeFeedback>
        <WhiteSpace />
      </View>
    )
  }
}

export default WaybillItem
