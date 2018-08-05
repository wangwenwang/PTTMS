/**
 * Created by marno on 2017/4/13
 * Function:
 * Desc:
 */
import React, {Component} from "react";
import { Text, View, Vibration } from "react-native";
import {QRScannerView} from 'ac-qrcode';
import { NavigationActions, createAction } from '../../../utils'
import { connect } from 'dva'

import {ImageButton, TitleBar} from './components'

import Styles from './styles/WeChatScreenStyles';
import {Constants, Images, Colors} from "./resource";
import theme from '../../../utils/theme'
import { delay } from '../../../utils/index';

@connect(({ receiptUpload, waybillDetail, router }) => ({ ...receiptUpload, ...waybillDetail, router }))
export default class WeChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transCode: null,
        };
        this.barcodeReceived = this.barcodeReceived.bind(this);
    }

    componentDidMount() {
        this.setState({
            transCode: null,
        });
    }

    barcodeReceived(e) {
        if (e.data !== this.transCode) {
            // Vibration.vibrate([0, 500,]);
            this.transCode = e.data; // 放在this上，防止触发多次，setstate有延时
            const path = this.props.navigation.state.params.path
            //alert(JSON.stringify(e))
            if (path === 'detail') {
                this.props.dispatch(createAction('waybillDetail/save')({
                    barCode: e.data
                }))
                this.props.dispatch(createAction('waybillDetail/getWaybillDetail')())
                this.props.navigation.goBack()
            } else if (path === 'receiptUpload') {
                this.props.dispatch(createAction('receiptUpload/save')({
                    deliveryNumber: e.data,
                }))
                this.props.navigation.goBack()
            }
        }
    }

    render() {
        return (
            < QRScannerView
                bottomMenuStyle={{ height: 0, backgroundColor: Colors.black_393A3F, opacity: 1}}
                hintTextPosition={120}
                hintTextStyle={{color:Colors.gray_C0C0C0}}
                maskColor={Colors.black_0000004D}
                borderWidth={0}
                iscorneroffset={false}
                cornerOffsetSize={0}
                scanBarAnimateTime={3000}
                onScanResultReceived={this.barcodeReceived.bind(this)}
                scanBarColor={theme.color}
                cornerColor={theme.color}

                renderTopBarView={() => {
                    return (
                        <TitleBar
                            titleColor={Colors.white_fff}
                            bgColor={Colors.black_393A3F}
                            title={Constants.string_title_wechat_scanner}
                            // rightIcon={Images.ic_wechat_more}
                            leftIcon={Images.ic_wechat_back}
                            leftIconPress={() => this.props.navigation.goBack()}
                        />

                    )
                }}

                renderBottomMenuView={() => {
                    return (
                        <View>
                            <Text>{this.state.text}</Text>
                        </View>
                    )
                }}
            />
        )
    }
}