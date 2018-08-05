import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableWithoutFeedback, Image, ActivityIndicator } from 'react-native'
import { WhiteSpace, List, Button } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions, createAction } from '../../../utils'
import style from './style'
import NewSiteItem from '../../../componenets/NewSiteItem'

const styles = StyleSheet.create(style)

const Item = List.Item

@connect(({ waybillDetail, router }) => ({ ...waybillDetail, router }))
class Waybill extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
      headerRight: (
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Scan', { path: 'detail' })}>
            <View style={{ paddingRight: 30 }}>
              <Image source={require('../../../images/scan.png')} style={styles.search} />
            </View>
          </TouchableWithoutFeedback>
      ),
  })

    componentDidMount() {
        const shipmentCode = this.props.navigation.state.params.shipmentCode

        this.props.dispatch(createAction('waybillDetail/save')({
            shipmentCode: shipmentCode,
            barCode: '',
        }))

        this.props.dispatch(createAction('waybillDetail/getWaybillDetail')())
    }

  render() {
      const { orderList, loading } = this.props
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <WhiteSpace />
            {
                loading ? <ActivityIndicator size="large" /> : <Text />
            }
            {
                orderList.map((item, index) => {
                    return (
                        <NewSiteItem key={index} data={item} />
                    )
                })
            }
        </ScrollView>
      </View>
    )
  }
}

export default Waybill
