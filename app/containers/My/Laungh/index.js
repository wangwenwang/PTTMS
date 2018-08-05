import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, ScrollView, BackAndroid, Platform, ToastAndroid, Alert, TouchableOpacity, Linking } from 'react-native'
import { List, WhiteSpace, WingBlank, Button, Toast } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions, createAction } from '../../../utils'
import screen from '../../../utils/screen'

const Item = List.Item
const Brief = Item.Brief

@connect()
class Laungh extends Component {

    componentWillMount() {
        this.props.dispatch(createAction('laungh/checkMemberInfo')())
    }

  render() {
    return (
      <View style={styles.container}>
          <Image
              style={styles.laungh}
              source={require('../../../images/loading.gif')}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    laungh: {
        width: screen.width,
        height: screen.height,
    }
});

export default Laungh
