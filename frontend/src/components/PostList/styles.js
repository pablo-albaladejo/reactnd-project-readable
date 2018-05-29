import { StyleSheet } from 'aphrodite';
import Colors from '../../config/Colors';

const styles = StyleSheet.create({
    table: {
        backgroundColor: Colors.clear,
    },

    title: {
        color: Colors.secondary,
    },
    
    rank: {
        color: Colors.font,
    },
    text: {
        color: Colors.font,
    },

    link : {
        color: Colors.primary,
        textDecoration: 'none'
    },

    addButton:{
        float: 'right',
        margin: "1.5% 5%"
    }
})
export default styles;