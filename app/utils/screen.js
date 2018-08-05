/**
 * Created by Administrator on 2017/5/11.
 */
import { Dimensions, Platform, PixelRatio } from 'react-native'

export default screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    onePixel: 1 / PixelRatio.get(),
    statusBarHeight: (Platform.OS === 'ios' ? 20 : 0)
}