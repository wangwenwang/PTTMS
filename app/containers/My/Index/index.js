import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, ScrollView, BackAndroid, Platform, ToastAndroid, Alert, TouchableOpacity, Linking } from 'react-native'
import { List, WhiteSpace, WingBlank, Button, Toast, ActivityIndicator } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions, createAction } from '../../../utils'
import style from './style'
import {
    isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update'
import _updateConfig from '../../../../update.json'

const { appKey } = _updateConfig[Platform.OS]
const styles = StyleSheet.create(style)
const Item = List.Item
const Brief = Item.Brief

@connect(({ my, router }) => ({ ...my, router }))
class My extends Component {
  static navigationOptions = {
    title: '个人中心',
    tabBarLabel: '个人中心',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../../../images/person.png')}
      />
    ),
  }

    componentWillMount() {
       this.props.dispatch(createAction('my/getMemberInfo')())
       this.props.dispatch(createAction('my/setRegistrationID')())
       this.props.dispatch(createAction('my/getTime')())
    }

    submitLocation = () => {
      console.warn('0')
        this.props.dispatch(createAction('my/submitLocation')(1))
    }

    // 版本更新
    doUpdate = info => {
        downloadUpdate(info).then(hash => {
            Alert.alert('提示', '下载完毕,是否重启应用?', [
                {text: '是', onPress: ()=>{ switchVersion(hash) }},
                {text: '否',},
                {text: '下次启动时', onPress: ()=>{ switchVersionLater(hash) }},
            ])
        }).catch(err => {
            Alert.alert('提示', '更新失败.')
        })
    }

    // 检查更新
    checkUpdate = () => {
        checkUpdate(appKey).then(info => {
            if (info.expired) {
                Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
                    {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
                ])
            } else if (info.upToDate) {
                Alert.alert('提示', '您的应用版本已是最新.')
            } else {
                Alert.alert('提示', '检查到新的版本'+info.name+',是否下载?\n'+ info.description, [
                    {text: '是', onPress: ()=>{this.doUpdate(info)}},
                    {text: '否',},
                ])
            }
        }).catch(err => {
            Alert.alert('提示', '更新失败.')
        })
    }

  render() {
    const { memberInfo, subLocationLoading } = this.props

    return (
      <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
              <Image source={require('../../../images/myPhoto.jpg')} resizeMode="stretch" style={styles.banner} />
              <WhiteSpace />
              <List>
                  <Item
                      arrow="horizontal"
                      multipleLine
                      onClick={() => this.props.dispatch(NavigationActions.navigate({ routeName: 'MyInfo', params: { memberInfo: memberInfo } }))}
                  >
                      { memberInfo.userName ? memberInfo.userName : '' }<Brief><Text style={{ color: '#333' }}>{ memberInfo.phone ? memberInfo.phone : '' }</Text></Brief>
                  </Item>
              </List>
              <WhiteSpace />
              <List>
                  <Item
                      arrow="horizontal"
                      onClick={() => this.props.dispatch(NavigationActions.navigate({ routeName: 'Income' }))}
                  >
                      费用统计
                  </Item>
                  <Item
                      arrow="horizontal"
                      onClick={this.submitLocation}
                      thumb={subLocationLoading ? <ActivityIndicator animating /> : <Text />}
                  >
                      {subLocationLoading ? '位置上报中...' : '上报位置'}
                  </Item>
                  <Item
                      arrow="horizontal"
                      onClick={this.checkUpdate}
                  >
                      检查更新
                  </Item>
              </List>
              <WhiteSpace />
              <WhiteSpace />
              <WingBlank>
                  <Button
                      style={styles.btn}
                      type="primary"
                      onClick={() => this.props.dispatch(createAction('my/loginOut')())}
                      // onClick={() => this.props.dispatch(NavigationActions.navigate({ routeName: 'Login' }))}
                  >退出登录</Button>
              </WingBlank>
              <WhiteSpace />
              <WhiteSpace />
          </ScrollView>
      </View>
    )
  }
}

export default My
