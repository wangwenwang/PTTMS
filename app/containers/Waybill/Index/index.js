import React, { Component } from 'react'
import { StyleSheet, View, Image, ScrollView, TouchableWithoutFeedback, ActivityIndicator, FlatList, Text } from 'react-native'
import { Button, WhiteSpace } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions, getCurrentScreen, createAction } from '../../../utils'
import style from './style'
import NewWaybillItem from '../../../componenets/NewWaybillItem'

const styles = StyleSheet.create(style)

@connect(({ waybill, router }) => ({ ...waybill, router }))
class Waybill extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '我的运单',
    tabBarLabel: '我的运单',
    headerRight: (
      <TouchableWithoutFeedback onPress={() => navigation.navigate('WaybillSearch')}>
        <View style={{ paddingRight: 30 }}>
          <Image source={require('../../../images/search.png')} style={styles.search} />
        </View>
      </TouchableWithoutFeedback>
    ),
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../../../images/waybill.png')}
      />
    ),
  })

  componentDidMount() {
    // 所有参数重置
    this.props.dispatch(createAction('waybill/save')({
        currentPage: 1,
        numberPerPage: 5,
        loading: false,
        refreshing: false,
        isOver: false,
        searchValue: null,
    }))

    const params = this.props.navigation.state.params
    if (params) {
        this.props.dispatch(createAction('waybill/save')({ searchValue: params.searchValue }))
        this.props.dispatch(createAction('waybill/getWaybill')())
    } else {
        this.props.dispatch(createAction('waybill/getWaybill')())
    }
  }
  // 头部渲染
    renderHeader = () => {
        return <WhiteSpace />
    };

  // 下拉刷新
    handleRefresh = () => {
    const { currentPage, numberPerPage, loading, refreshing } = this.props
        this.props.dispatch(createAction('waybill/save')({
            currentPage: 1,
            refreshing: true,
            searchValue: null,
        }))
        this.props.dispatch(createAction('waybill/getWaybill')())
        // const params = this.props.navigation.state.params
        // if (params) {
        //     this.props.dispatch(createAction('waybill/getWaybill')(params.searchValue))
        // } else {
        //     this.props.dispatch(createAction('waybill/getWaybill')())
        // }
    };

  // 加载更多
    handleLoadMore = () => {
        const { currentPage, numberPerPage, loading, refreshing } = this.props
        this.props.dispatch(createAction('waybill/save')({
            currentPage: currentPage + 1,
        }))
        const params = this.props.navigation.state.params
        if (params) {
            this.props.dispatch(createAction('waybill/getWaybill')(params.searchValue))
        } else {
            this.props.dispatch(createAction('waybill/getWaybill')())
        }
    };

    // 行间渲染
    renderSeparator = () => {
        return (
            <WhiteSpace />
        );
    };

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
        );
    };

  render() {
    const { waybillList, loading, refreshing, isOver } = this.props
    return (
      <View style={styles.container}>
          <FlatList
              data={waybillList}
              renderItem={({ item }) => (
                  <NewWaybillItem data={item} />
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
          {/*{
              isOver ? <Text style={{textAlign: 'center', paddingTop: 5, paddingBottom: 5}}>已全部加载...</Text> : <Text />
          }*/}
      </View>
    )
  }
}

export default Waybill
