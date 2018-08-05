/**
 * Created by Administrator on 2017/5/19.
 */
import theme from '../../utils/theme'

export default style = {
    container: {

    },
    item: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
    },
    text: {
        color: '#333',
    },
    itemLeft:{
        flex: 1,
    },
    itemRight: {
        width: 20,
        alignSelf: 'center',
    },
    right: {
        width: 16,
        height: 16,
        tintColor: '#ddd',
    },
    itemHeader: {
        fontSize: 16,
        paddingBottom: 8,
        color: '#333',
    },
    itemHeaderTitle: {

    },
    itemContent: {
        flexDirection: 'row',
    },
    itemContentLeft: {
        flex: 1,
    },
    address: {
        paddingLeft: 3,
        paddingRight: 3,
        borderRadius: 3,
        marginRight: 10,
        color: '#fff',
    },
    begin: {
        backgroundColor:'#06b900',
    },
    end: {
        backgroundColor:'#b91d00',
    },
    itemContentRight: {
        flex: 1,
    },
    itemContentRightTop: {
        paddingBottom: 8,
    },
    status: {
        color: theme.color,
    }
}