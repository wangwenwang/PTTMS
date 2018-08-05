import React, { PureComponent } from 'react'
import { BackAndroid, Platform, ToastAndroid, StyleSheet, Text, View, Alert, TouchableOpacity, Linking } from 'react-native'
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  addNavigationHelpers,
  NavigationActions,
} from 'react-navigation'
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
import _updateConfig from '../update.json'
import { connect } from 'dva'
import theme from './utils/theme'
import JPush, { JpushEventReceiveMessage, JpushEventOpenMessage } from 'react-native-jpush'
import SplashScreen from 'react-native-splash-screen'

const { appKey } = _updateConfig[Platform.OS]

// import Login from './containers/Login'
// import Home from './containers/Home'
// import Account from './containers/Account'
// import Detail from './containers/Detail'

// 运单模块
import Waybill from './containers/Waybill/Index'
import WaybillDetail from './containers/Waybill/WaybillDetail'
import SiteDetail from './containers/Waybill/SiteDetail'
import WaybillSearch from './containers/Waybill/WaybillSearch'
import WaybillSearchResult from './containers/Waybill/WaybillSearchResult'
import ArriveConfirm from './containers/Waybill/ArriveConfirm'
import DeliveryConfirm from './containers/Waybill/DeliveryConfirm'
import Trace from './containers/Waybill/Trace'
import ReceiptUpload from './containers/Waybill/ReceiptUpload'
import WaybillDetailNew from './containers/Waybill/WaybillDetailNew'
import Scan from './containers/Waybill/Scan/WeChatScreen'

// 找单模块
import Find from './containers/Find/Index'
import InputOrder from './containers/Find/InputOrder'
import OrderDetail from './containers/Find/OrderDetail'
import FindSearch from './containers/Find/FindSearch'

// 抢单模块
import Release from './containers/Release/Index'
import ReleaseDetail from './containers/Release/ReleaseDetail'
import ReleaseSearch from './containers/Release/ReleaseSearch'
import ReleaseSearchResult from './containers/Release/ReleaseSearchResult'
import Bidding from './containers/Release/Bidding'

// 我的模块
import My from './containers/My/Index'
import Income from './containers/My/Income'
import MyInfo from './containers/My/MyInfo'
import IncomeSearch from './containers/My/IncomeSearch'
import IncomeSearchResult from './containers/My/IncomeSearchResult'
import Login from './containers/My/Login'
import SignUp from './containers/My/SignUp'
import SignUpNext from './containers/My/SignUpNext'
import ForgetPassword from './containers/My/ForgetPassword'
import ForgetPasswordA from './containers/My/ForgetPasswordA'
import Laungh from './containers/My/Laungh'

const HomeNavigator = TabNavigator(
  {
    Waybill: { screen: Waybill },
    Find: { screen: Find },
    Release: { screen: Release },
    My: { screen: My },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazyLoad: true,
    backBehavior: 'none',
    tabBarOptions: {
      activeTintColor: theme.color, // 文字和图片选中颜色
      inactiveTintColor: '#999', // 文字和图片默认颜色
      // activeBackgroundColor
      // inactiveBackgroundColor
      showLabel: true,
      showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
      indicatorStyle: { height: 0 }, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏？？？
      style: {
        backgroundColor: '#fff', // TabBar 背景色
      },
      labelStyle: {
          fontSize: 12, // 文字大小
      },
    },
  },
)

const MainNavigator = StackNavigator(
  {
    HomeNavigator: {
        screen: HomeNavigator,
        navigationOptions: {
            headerLeft: null,
        },
    },
    WaybillDetail: { screen: WaybillDetail },
    SiteDetail: { screen: SiteDetail },
    InputOrder: { screen: InputOrder },
    OrderDetail: { screen: OrderDetail },
    ReleaseDetail: { screen: ReleaseDetail },
    Income: { screen: Income },
    MyInfo: { screen: MyInfo },
    WaybillSearch: { screen: WaybillSearch },
    WaybillSearchResult: { screen: WaybillSearchResult },
    ReleaseSearch: { screen: ReleaseSearch },
    ReleaseSearchResult: { screen: ReleaseSearchResult },
    IncomeSearch: { screen: IncomeSearch },
    IncomeSearchResult: { screen: IncomeSearchResult },
    Bidding: { screen: Bidding },
    SignUp: { screen: SignUp },
    ForgetPassword: { screen: ForgetPassword },
    ArriveConfirm: { screen: ArriveConfirm },
    DeliveryConfirm: { screen: DeliveryConfirm },
    Trace: { screen: Trace },
    ReceiptUpload: { screen: ReceiptUpload },
    WaybillDetailNew: { screen: WaybillDetailNew },
    SignUpNext: { screen: SignUpNext },
    ForgetPasswordA: { screen: ForgetPasswordA },
    FindSearch: { screen: FindSearch },
    Scan: {
        screen: Scan,
        navigationOptions:{
            header:null,
        },
    },
    Login: {
        screen: Login,
        navigationOptions:{
            header:null,
        },
    },
      Laungh: {
          screen: Laungh,
          navigationOptions:{
              header:null,
          },
      },
  },
  {
    navigationOptions: {
      headerStyle: {
        // backgroundColor: theme.color,
        // justifyContent: 'center',
      },
      headerTitleStyle: {
          // color: '#fff',
      },
        gesturesEnabled: false,
    },
      // paths
    mode: 'card',
    headerMode: 'float',
    initialRouteName: 'Laungh',
  },
)

const AppNavigator = StackNavigator(
  {
    Main: { screen: MainNavigator },
    // Login: { screen: Login },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
)

function getCurrentScreen(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentScreen(route)
  }
  return route.routeName
}

@connect(({ login, router }) => ({ ...login, router }))
class Router extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
        };
    }

  componentWillMount() {
    // 监听返回键
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.backHandle)
    }
      JPush.requestPermissions()
      this.pushlisteners = [
          JPush.addEventListener(JpushEventReceiveMessage, this.onReceiveMessage),
          JPush.addEventListener(JpushEventOpenMessage, this.onOpenMessage),
      ]
      const that =this
      setTimeout(function () {
          // 版本检测
          if (isFirstTime) {
              Alert.alert('提示', '您已更新到最新版本', [
                  {text: 'ok', onPress: ()=>{markSuccess()}}
              ]);
          } else if (isRolledBack) {
              Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
          }
          that.checkUpdate()
      }, 1000)

      // 隐藏启动页
      SplashScreen.hide()
  }

  componentWillUnmount() {
      if (Platform.OS === 'android') {
          BackAndroid.removeEventListener('hardwareBackPress', this.backHandle)
      }
      this.pushlisteners.forEach(listener=> {
          JPush.removeEventListener(listener);
      });
  }

  onReceiveMessage = (message) => {
      // alert(JSON.stringify(message))
  }

  onOpenMessage = (message) => {
      // alert(JSON.stringify(message))
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
                // Alert.alert('提示', '您的应用版本已是最新.')
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

  backHandle = () => {
      const currentScreen = getCurrentScreen(this.props.router)
      if (currentScreen === 'Login') {
          if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
              //最近2秒内按过back键，可以退出应用。
              BackAndroid.exitApp()
              const resetAction = NavigationActions.reset({
                  index: 0,
                  actions: [
                      NavigationActions.navigate({ routeName: 'Login'}),
                  ]
              })
              this.props.navigation.dispatch(resetAction)
              return false
          }
          this.lastBackPressed = Date.now()
          ToastAndroid.showWithGravity('再按一次退出应用', ToastAndroid.SHORT, ToastAndroid.CENTER)
          return true
      }
      if (currentScreen === 'Waybill' || currentScreen === 'Find' || currentScreen === 'Release' || currentScreen === 'My') {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
          //最近2秒内按过back键，可以退出应用。
            BackAndroid.exitApp()
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'HomeNavigator'}),
                ]
            })
            this.props.navigation.dispatch(resetAction)
            return false
        }
          this.lastBackPressed = Date.now()
          ToastAndroid.showWithGravity('再按一次退出应用', ToastAndroid.SHORT, ToastAndroid.CENTER)
          return true
      }
      if (currentScreen !== 'Home') {
          this.props.dispatch(NavigationActions.back())
          return true
      }
    return false
  }

  render() {
      console.log(this.state);
    const { dispatch, router } = this.props
    const navigation = addNavigationHelpers({ dispatch, state: router })
    return <AppNavigator navigation={navigation} />
  }
}

export function routerReducer(state, action = {}) {
  return AppNavigator.router.getStateForAction(action, state)
}

export default Router
