import React, {Component, PropTypes} from 'react';
import {Toast} from 'antd-mobile';
import {withRouter} from 'react-router';


@withRouter
class Action extends Component {
    render() {

        const data = this.props.data;
        return (<form action="">
            {
                data.map(item => <input type="hidden" name="version" value={item}/>)
            }
        </form>)
    }
}
;


export default Action;
