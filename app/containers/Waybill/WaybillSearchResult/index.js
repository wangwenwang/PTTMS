import React, { Component } from 'react'
import { StyleSheet, View, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { Button, WhiteSpace } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions, createAction } from '../../../utils'
import style from './style'
import NewWaybillItem from '../../../componenets/NewWaybillItem'

const styles = StyleSheet.create(style)

@connect(({ waybillSearchResult, router }) => ({ ...waybillSearchResult, router }))
class Waybill extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '筛选结果',
  })

  componentDidMount() {
      const searchValue = this.props.navigation.state.params.searchValue
      this.props.dispatch(createAction('waybillSearchResult/getWaybill')(searchValue))
  }

  render() {
    const { waybillList } = this.props
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <WhiteSpace />
            {
                waybillList.map((item, index) => {
                    return (
                        <NewWaybillItem key={index} data={item} />
                    )
                })
            }
        </ScrollView>
      </View>
    )
  }
}

export default Waybill
