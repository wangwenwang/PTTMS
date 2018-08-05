import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, ScrollView, TouchableWithoutFeedback, ActivityIndicator, FlatList } from 'react-native'
import { WhiteSpace } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions, createAction } from '../../../utils'
import { getCurrentScreen } from '../../../utils/index'
import style from './style'
import NewReleaseItem from '../../../componenets/NewReleaseItem'

const styles = StyleSheet.create(style)

@connect(({ release, router }) => ({ ...release, router }))
class Release extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: '抢货竞价',
        headerRight: (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('ReleaseSearch')}>
                <View style={{ paddingRight: 30 }}>
                    <Image source={require('../../../images/search.png')} style={styles.search} />
                </View>
            </TouchableWithoutFeedback>
        ),
        tabBarLabel: '抢货竞价',
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
                source={require('../../../images/release.png')}
            />
        ),
    })

    componentDidMount() {
        // 所有参数重置
        this.props.dispatch(createAction('release/save')({
            currentPage: 1,
            numberPerPage: 5,
            loading: false,
            refreshing: false,
            isOver: false,
        }))

        const params = this.props.navigation.state.params
        if (params) {
            this.props.dispatch(createAction('release/getReleaseList')(params.searchValue))
        } else {
            this.props.dispatch(createAction('release/getReleaseList')())
        }
    }

    // 头部渲染
    renderHeader = () => {
        return <WhiteSpace />
    }

    // 下拉刷新
    handleRefresh = () => {
        const { currentPage, numberPerPage, loading, refreshing } = this.props
        this.props.dispatch(createAction('release/save')({
            currentPage: 1,
            refreshing: true,
        }))
        this.props.dispatch(createAction('release/getReleaseList')())
        // const params = this.props.navigation.state.params
        // if (params) {
        //     this.props.dispatch(createAction('release/getReleaseList')(params.searchValue))
        // } else {
        //     this.props.dispatch(createAction('release/getReleaseList')())
        // }
    }

    // 加载更多
    handleLoadMore = () => {
        const { currentPage, numberPerPage, loading, refreshing } = this.props
        this.props.dispatch(createAction('release/save')({
            currentPage: currentPage + 1,
        }))
        const params = this.props.navigation.state.params
        if (params) {
            this.props.dispatch(createAction('release/getReleaseList')(params.searchValue))
        } else {
            this.props.dispatch(createAction('release/getReleaseList')())
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

    // 每次进页面刷新
    refresh = () => {
        this.props.dispatch(createAction('release/save')({
         currentPage: 1,
         numberPerPage: 5,
         loading: false,
         refreshing: false,
         isOver: false,
         }))

         this.props.dispatch(createAction('release/getReleaseList')())
    }

  render() {
    const currentScreen = getCurrentScreen(this.props.router)
      // console.warn(currentScreen)
    if (currentScreen === 'Release') {
            // console.warn('ds')
            // this.refresh()
      }
    const { releaseList, refreshing } = this.props
    return (
      <View style={styles.container}>
          <FlatList
              data={releaseList}
              renderItem={({ item }) => (
                  <NewReleaseItem data={item} />
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

export default Release
