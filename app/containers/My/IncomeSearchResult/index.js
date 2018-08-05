import React, { Component } from 'react'
import { StyleSheet, View, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { Button, WhiteSpace } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions, createAction } from '../../../utils'
import style from './style'
import IncomeItem from '../../../componenets/IncomeItem'

const styles = StyleSheet.create(style)

@connect(({ incomeSearchResult, router }) => ({ ...incomeSearchResult, router }))
class Waybill extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '筛选结果',
  })

    componentDidMount() {
        const searchValue = this.props.navigation.state.params.searchValue
        this.props.dispatch(createAction('incomeSearchResult/getIncomeList')(searchValue))
    }

  render() {
    const { incomeList } = this.props
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <WhiteSpace />
            {
                incomeList.map((item, index) => {
                    return (
                        <IncomeItem key={index} data={item} />
                    )
                })
            }
        </ScrollView>
      </View>
    )
  }
}

export default Waybill
