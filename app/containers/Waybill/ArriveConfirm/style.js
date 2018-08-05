/**
 * Created by Administrator on 2017/5/19.
 */
import screen from '../../../utils/screen'
import theme from '../../../utils/theme'

export default style = {
    container: {
        flex: 1,
    },
    banner: {
        width: screen.width,
        height: 180,
    },
    btn: {
        backgroundColor: theme.color,
        borderColor: theme.color,
    },
    disableBtn: {
        backgroundColor: '#888',
        borderColor: '#888',
    },
    icon: {
        width: 32,
        height: 32,
    },
}