import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import { connect } from 'dva'
import style from './style'
import { List, InputItem, WhiteSpace, WingBlank, Button, Toast, Icon } from 'antd-mobile'
import { createAction, NavigationActions } from '../../../utils'
import { createForm } from 'rc-form'

const styles = StyleSheet.create(style)

@connect(({ login, router, loading }) => ({ ...login, router, loading: loading.models.login }))
@createForm()
class Login extends Component {

    // 提交验证
    onSubmit = () => {
        Keyboard.dismiss()
        const { getFieldProps, getFieldValue, getFieldsValue, getFieldError, resetFields, validateFields, setFields } = this.props.form
        validateFields({force: true}, (error) => {
            const info = getFieldsValue();
            if (!error) {
                this.props.dispatch(createAction('login/login')(info))
            }
        });
    };

    componentWillMount() {
        this.props.dispatch(createAction('login/save')({ loginLoading: false }))
        this.props.dispatch(createAction('login/getLoginInfo')())
    }

  render() {
    const { getFieldProps, getFieldValue, getFieldsValue, getFieldError, resetFields, validateFields, setFields } = this.props.form
      const { loginName, password, loginLoading } = this.props

      return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
            <TouchableOpacity  activeOpacity={1.0} onPress={() => Keyboard.dismiss()}>
                <View style={styles.logoWrapper}>
                    <Image source={require('../../../images/logo.jpg')} style={styles.logo} />
                </View>
                <List>
                    <InputItem
                        { ...getFieldProps('loginName', {
                            initialValue: loginName,
                            validateFirst: true,
                            validateTrigger: 'onBlur',
                            rules: [{
                                required: true,
                                message: '请输入登录名',
                            }],
                        })}
                        error={getFieldError('loginName')}
                        onErrorClick={() => Toast.info(getFieldError('loginName')[0], 1)}
                        clear
                        placeholder="登录名"
                    >登录名</InputItem>
                    <InputItem
                        { ...getFieldProps('password', {
                            initialValue: password,
                            validateFirst: true,
                            validateTrigger: 'onBlur',
                            rules: [{
                                required: true,
                                message: '请输入密码',
                            }],
                        })}
                        error={getFieldError('password')}
                        onErrorClick={() => Toast.info(getFieldError('password')[0], 1)}
                        clear
                        type="password"
                        placeholder="密码"
                    >密码</InputItem>
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <WingBlank>
                    <Button
                        style={loginLoading ? styles.disableBtn : styles.btn}
                        type="primary"
                        onClick={this.onSubmit}
                        disabled={loginLoading}
                        // onClick={() => console.warn('dfas')}
                        // onClick={() => this.props.dispatch(NavigationActions.navigate({ routeName: 'HomeNavigator' }))}
                    >{loginLoading ? '登录中...' : '登录'}</Button>
                    <View style={styles.footer}>
                        <Text
                            style={styles.forgetPassword}
                            onPress={() => this.props.dispatch(NavigationActions.navigate({ routeName: 'ForgetPasswordA' }))}
                        >
                            忘记密码
                        </Text>
                        <Text
                            style={styles.signUp}
                            onPress={() => this.props.dispatch(NavigationActions.navigate({ routeName: 'SignUp' }))}
                        >注册</Text>
                    </View>
                </WingBlank>
                <WhiteSpace />
                <WhiteSpace />
            </TouchableOpacity>
        </ScrollView>
        {/*{fetching
          ? <ActivityIndicator />
          : <Button title="Login" onPress={this.onLogin} />}
        {!fetching && <Button title="Close" onPress={this.onClose} />}*/}
      </View>
    )
  }
}

export default Login
