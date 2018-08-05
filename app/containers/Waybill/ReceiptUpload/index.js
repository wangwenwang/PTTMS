import React, { Component } from 'react'
import { StyleSheet, View, Image, ScrollView, TouchableWithoutFeedback, Text, TouchableOpacity, Keyboard } from 'react-native'
import { Button, WhiteSpace, WingBlank, InputItem, List, Toast } from 'antd-mobile'
import { connect } from 'dva'
import { NavigationActions, createAction } from '../../../utils'
import style from './style'
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-crop-picker'
import { createForm } from 'rc-form'
import ImageResizer from 'react-native-image-resizer'

const styles = StyleSheet.create(style)
const CANCEL_INDEX = 0
const options = [ '取消', '拍照', '相册' ]

@connect(({ receiptUpload, router }) => ({ ...receiptUpload, router }))
@createForm()
class Waybill extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
        this.singleImage = this.singleImage.bind(this)
        this.selectFromCamera = this.selectFromCamera.bind(this)
    }

  static navigationOptions = ({ navigation }) => ({
    title: '回单上传',
  })

    componentDidMount() {
        this.props.dispatch(createAction('receiptUpload/save')({ subLoading: false }))
        const deliveryNo = this.props.navigation.state.params.deliveryNo
        this.props.dispatch(createAction('receiptUpload/save')({
            imagePath: [],
            deliveryNumber: deliveryNo,
        }))
    }

  // 显示actionSheet
  showActionSheet = () => {
      Keyboard.dismiss()
      this.ActionSheet.show()
  }

    // 从相机选取
    singleImage () {
        ImagePicker.openPicker({
            mediaType: 'photo',
        }).then(image => {

            ImageResizer.createResizedImage(image.path, (image.width/2), (image.height/2), 'JPEG', 95).then((response) => {
                let { imagePath } = this.props
                let newImagePath = [ ...imagePath, response.uri]

                this.props.dispatch(createAction('receiptUpload/save')({ imagePath: newImagePath }))
            }).catch((err) => {
                console.warn(err)
            });
        });
    }

    // 拍照上传
    selectFromCamera () {
        ImagePicker.openCamera({
            // compressImageQuality: 0.9,
            mediaType: 'photo',
            includeBase64: true,
        }).then(image => {
            ImageResizer.createResizedImage(image.path, (image.width/2), (image.height/2), 'JPEG', 95).then((response) => {
                // console.warn('resizer size:' + response.size)
                let { imagePath } = this.props
                let newImagePath = [ ...imagePath, response.uri]

                this.props.dispatch(createAction('receiptUpload/save')({ imagePath: newImagePath }))
            }).catch((err) => {
                console.warn(err)
            });
        });
    }

    deleteImage = (index) => {
        let { imagePath } = this.props
        let newImagePath = [].concat(imagePath)
        newImagePath.splice(index, 1)

        this.props.dispatch(createAction('receiptUpload/save')({ imagePath: newImagePath }))
    }

  // 选择actionSheet
    handlePress = (i) => {
      if (i == 1) {
        this.selectFromCamera()
      } else if (i == 2) {
        this.singleImage()
      }
    }

    // 提交验证
    onSubmit = () => {
        Keyboard.dismiss()
        const { imagePath, deliveryNumber } = this.props
        if (imagePath.length === 0) {
            Toast.info('请添加图片', 1, null, true)
            return
        }
        if (!deliveryNumber) {
            Toast.info('请填写订单号', 1, null, true)
            return
        }
        this.props.dispatch(createAction('receiptUpload/receiptUpload')({ deliveryNo: deliveryNumber, imagePath: imagePath }))
    };

  render() {
    const { getFieldProps, getFieldError, setFields } = this.props.form
    const { imagePath, deliveryNumber, subLoading } = this.props
    return (
      <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
              <TouchableOpacity activeOpacity={1.0} onPress={() => Keyboard.dismiss()}>
              <WhiteSpace />
              <View style={styles.imageWrapper}>
                <Text style={{ paddingBottom: 8 }}>上传图片</Text>
                  <View style={styles.images}>
                      {
                          imagePath.map((item, index) => {
                              return (
                                  <View style={styles.singleImage} key={index}>
                                      <View>
                                          <Image source={{ uri: item }} style={styles.image} resizeMode='cover' />
                                      </View>
                                      <View style={styles.close}>
                                          <TouchableOpacity activeOpacity={1.0} onPress={() => this.deleteImage(index)}>
                                              <Image source={require('../../../images/close.png')} style={styles.deleteIcon} resizeMode='cover' />
                                          </TouchableOpacity>
                                      </View>
                                  </View>
                              )
                          })
                      }
                      <TouchableOpacity activeOpacity={1.0} onPress={this.showActionSheet}>
                          <Image source={require('../../../images/add.png')} style={styles.image} resizeMode='cover' />
                      </TouchableOpacity>
                  </View>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    onPress={this.handlePress}
                />
                <Text style={{ paddingBottom: 8, paddingTop: 8 }}>填写订单号</Text>
              </View>
              <List>
                {/*<InputItem
                    { ...getFieldProps('deliveryNo', {
                        validateFirst: true,
                        validateTrigger: 'onBlur',
                        // initialValue: deliveryNumber,
                        rules: [{
                            required: true,
                            message: '请输入订单号',
                        }],
                    })}
                    error={getFieldError('deliveryNo')}
                    onErrorClick={() => Toast.info(getFieldError('deliveryNo')[0], 1)}
                    placeholder="订单号"
                    extra={<Text style={styles.scan} onPress={() =>  {
                        Keyboard.dismiss()
                        this.props.dispatch(NavigationActions.navigate({ routeName: 'Scan', params: { path: 'receiptUpload' } }))
                    }}>扫一扫</Text>}
                >订单号</InputItem>*/}
                  <InputItem
                      value={deliveryNumber}
                      placeholder="订单号"
                      onChange={(val) => {
                          this.props.dispatch(createAction('receiptUpload/save')({ deliveryNumber: val }))
                      }}
                      extra={<Text style={styles.scan} onPress={() =>  {
                          Keyboard.dismiss()
                          this.props.dispatch(NavigationActions.navigate({ routeName: 'Scan', params: { path: 'receiptUpload' } }))
                      }}
                      >扫一扫</Text>}
                  >订单号</InputItem>
              </List>
              <WhiteSpace />
              <WhiteSpace />
              <WhiteSpace />
              <WingBlank>
                <Button
                    style={subLoading ? styles.disableBtn : styles.btn}
                    disabled={subLoading}
                    type="primary"
                    onClick={this.onSubmit}
                >{subLoading ? '上传中...' : '上传'}</Button>
              </WingBlank>
              <WhiteSpace />
              <WhiteSpace />
              </TouchableOpacity>
          </ScrollView>
      </View>
    )
  }
}

export default Waybill
