import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text, Image, TouchableWithoutFeedback, ActivityIndicator, FlatList } from 'react-native'
import { WhiteSpace, List, Button, WingBlank } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions, createAction } from '../../../utils'
import style from './style'
import IncomeItem from '../../../componenets/IncomeItem'

const styles = StyleSheet.create(style)

@connect(({ income, router }) => ({ ...income, router }))
class Income extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '费用统计',
    headerRight: (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('IncomeSearch')}>
          <View style={{ paddingRight: 30 }}>
            <Image source={require('../../../images/search.png')} style={styles.search} />
          </View>
        </TouchableWithoutFeedback>
    ),
  })

  componentDidMount() {
      // 所有参数重置
      this.props.dispatch(createAction('income/save')({
          currentPage: 1,
          numberPerPage: 5,
          loading: false,
          refreshing: false,
          isOver: false,
          searchValue: null,
      }))

      const params = this.props.navigation.state.params
      if (params) {
          this.props.dispatch(createAction('income/save')({ searchValue: params.searchValue }))
          this.props.dispatch(createAction('income/getIncomeList')())
      } else {
          this.props.dispatch(createAction('income/getIncomeList')())
      }
  }

    // 头部渲染
    renderHeader = () => {
        return <WhiteSpace />
    }

    // 下拉刷新
    handleRefresh = () => {
        const { currentPage, numberPerPage, loading, refreshing } = this.props
        this.props.dispatch(createAction('income/save')({
            currentPage: 1,
            refreshing: true,
            searchValue: null,
        }))
        this.props.dispatch(createAction('income/getIncomeList')())
        // const params = this.props.navigation.state.params
        // if (params) {
        //     this.props.dispatch(createAction('income/getIncomeList')(params.searchValue))
        // } else {
        //     this.props.dispatch(createAction('income/getIncomeList')())
        // }
    }

    // 加载更多
    handleLoadMore = () => {
        const { currentPage, numberPerPage, loading, refreshing } = this.props
        this.props.dispatch(createAction('income/save')({
            currentPage: currentPage + 1,
        }))
        const params = this.props.navigation.state.params
        if (params) {
            this.props.dispatch(createAction('income/getIncomeList')(params.searchValue))
        } else {
            this.props.dispatch(createAction('income/getIncomeList')())
        }
    }

    // 行间渲染
    renderSeparator = () => {
        return (
            <WhiteSpace />
        )
    }

    // 列表组件底部渲染
    renderFooter = () => {
        const { currentPage, numberPerPage, loading, refreshing, isOver } = this.props
        if (!loading) return null

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        )
    }

  render() {
    const { incomeList, refreshing } = this.props
    return (
      <View style={styles.container}>
          <FlatList
              data={incomeList}
              renderItem={({ item }) => (
                  <IncomeItem data={item} />
              )}
              keyExtractor={(item, index) => index}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
              onRefresh={this.handleRefresh}
              refreshing={refreshing}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={50}
          />
      </View>
    )
  }
}

export default Income
