import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
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
        <TouchableOpacity onPress={() => this.props.dispatch(NavigationActions.navigate({ routeName: 'ReleaseDetail' }))}>
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemHeader}>
                <Text style={styles.itemHeaderTitle}>发车时间：</Text>
                <Text style={styles.itemHeaderText}>2017-05-19</Text>
              </Text>
              <View style={styles.itemContent}>
                <View style={styles.itemContentLeft}>
                  <View style={{flexDirection: 'row', paddingBottom: 8}}>
                    <Text style={[styles.address, styles.begin]}>起</Text>
                    <Text style={styles.text}>上海</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.address, styles.end]}>终</Text>
                    <Text style={styles.text}>杭州</Text>
                  </View>
                </View>
                <View style={styles.itemContentRight}>
                  <Text style={[styles.text, styles.itemContentRightTop]}>
                    <Text>价格：</Text>
                    <Text style={styles.price}>￥2000</Text>
                  </Text>
                  <Text style={styles.text}>
                    <Text>状态：</Text>
                    <Text style={styles.status}>竞价中</Text>
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.itemRight}>
              <Image source={require('../../images/right.png')} style={styles.right} />
            </View>
          </View>
        </TouchableOpacity>
        <WhiteSpace />
      </View>
    )
  }
}

export default WaybillItem
