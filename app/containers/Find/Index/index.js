import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, ScrollView, TouchableWithoutFeedback, ActivityIndicator, FlatList } from 'react-native'
import { Button, WhiteSpace } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions, getCurrentScreen, createAction } from '../../../utils'
import style from './style'
import NewFindItem from '../../../componenets/NewFindItem'

const styles = StyleSheet.create(style)

@connect(({ find, router }) => ({ ...find, router }))
class Find extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '我要找货',
    headerRight: (
      <View style={{ paddingRight: 15, flexDirection: 'row' }}>
        <Text
          style={styles.rightHeader}
          onPress={() => navigation.navigate('InputOrder')}
        >发布空车</Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('FindSearch')}>
          <View style={{ paddingLeft: 15 }}>
            <Image source={require('../../../images/search.png')} style={styles.search} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    ),
    tabBarLabel: '我要找货',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../../../images/find.png')}
      />
    ),
  })

  componentWillMount() {
      // 所有参数重置
      this.props.dispatch(createAction('find/save')({
          currentPage: 1,
          numberPerPage: 5,
          loading: false,
          refreshing: false,
          isOver: false,
          searchValue: null,
      }))

      const params = this.props.navigation.state.params
      if (params) {
          this.props.dispatch(createAction('find/save')({ searchValue: params.searchValue }))
          this.props.dispatch(createAction('find/getFindList')())
      } else {
          this.props.dispatch(createAction('find/getFindList')())
      }
  }

    // 头部渲染
    renderHeader = () => {
        return <WhiteSpace />
    }

    // 下拉刷新
    handleRefresh = () => {
        const { currentPage, numberPerPage, loading, refreshing } = this.props
        this.props.dispatch(createAction('find/save')({
            currentPage: 1,
            refreshing: true,
            searchValue: null,
        }))
        this.props.dispatch(createAction('find/getFindList')())
        // const params = this.props.navigation.state.params
        // if (params) {
        //     this.props.dispatch(createAction('find/getFindList')(params.searchValue))
        // } else {
        //     this.props.dispatch(createAction('find/getFindList')())
        // }
    }

    // 加载更多
    handleLoadMore = () => {
        const { currentPage, numberPerPage, loading, refreshing } = this.props
        this.props.dispatch(createAction('find/save')({
            currentPage: currentPage + 1,
        }))
        const params = this.props.navigation.state.params
        if (params) {
            this.props.dispatch(createAction('find/getFindList')(params.searchValue))
        } else {
            this.props.dispatch(createAction('find/getFindList')())
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

  // 作废空单
  cancleOrder = (id) => {
    this.props.dispatch(createAction('find/cancleOrder')(id))
  }

  render() {
    const { findList, refreshing } = this.props
    return (
      <View style={styles.container}>
        <FlatList
            data={findList}
            renderItem={({ item }) => (
                <NewFindItem cancleOrder={this.cancleOrder} data={item} />
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

export default Find
