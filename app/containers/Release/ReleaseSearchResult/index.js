import React, { Component } from 'react'
import { StyleSheet, View, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { Button, WhiteSpace } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions, createAction } from '../../../utils'
import style from './style'
import NewReleaseItem from '../../../componenets/NewReleaseItem'

const styles = StyleSheet.create(style)

@connect(({ releaseSearchResult, router }) => ({ ...releaseSearchResult, router }))
class Waybill extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '筛选结果',
  })

    componentDidMount() {
        const searchValue = this.props.navigation.state.params.searchValue
        this.props.dispatch(createAction('releaseSearchResult/getReleaseList')(searchValue))
    }

  render() {
    const { releaseList } = this.props
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <WhiteSpace />
            {
                releaseList.map((item, index) => {
                    return (
                        <NewReleaseItem key={index} data={item} />
                    )
                })
            }
        </ScrollView>
      </View>
    )
  }
}

export default Waybill
