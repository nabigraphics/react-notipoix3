import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import { TransitionMotion, spring } from 'react-motion';
import style from './style';

class Notification extends Component {
    constructor(props){
        super(props);
        this.willEnter = this.willEnter.bind(this);
        this.willLeave = this.willLeave.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getStyles = this.getStyles.bind(this);
    }
    handleClose(key){
        // this.props.notify_Remove(key);
        const itemnum = this.props.notification.findIndex(item => {return item.get('key') === key});
        const itemcheck = this.props.notification.getIn([itemnum,'isClosed']);
        if(itemcheck == false){
            this.props.notify_Removing(key);
            this.props.notify_Remove(key);
        }
    }
    willEnter() {
        if(this.props.position == "bottom-left" || this.props.position == "top-left"){
            return {
                left:-320
            }
        }else if(this.props.position == "bottom-right" || this.props.position == "top-right"){
            return {
                left:320
            }
        }
    }
    willLeave() {
        if(this.props.position == "bottom-left" || this.props.position == "top-left"){
            return {
                left:spring(-320,{stiffness:170,damping:16})
            }
        }else if(this.props.position == "bottom-right" || this.props.position == "top-right"){
            return {
                left:spring(320,{stiffness:170,damping:16})
            }
        }
    }
    getStyles() {
        return this.props.notification.toArray().map((item) => { 
            return {
            ...item.toJS(),
            style:{
                left:spring(0,{stiffness:170,damping:16})
            }
        }})
    };
    render(){
        let position;
        switch(this.props.position) {
            case "bottom-left":
                position = style.ul.bottom_Left
            break;
            case "bottom-right":
                position = style.ul.bottom_Right
            break;
            case "top-left":
                position = style.ul.top_Left
            break;
            case "top-right":
                position = style.ul.top_Right
            break;
        }
        return(
            <TransitionMotion
                styles={this.getStyles}
                willLeave={this.willLeave}
                willEnter={this.willEnter}
            >
            {interpolatedStyles =>
                <ul className="react-notipoix3-ul" style={{...position}} >
                {interpolatedStyles.map(config => { 
                    return (
                    <li className={"react-notipoix3-li " + this.props.position  + " " + config.data.color } key={config.key} style={{...config.style}} onClick={() => this.handleClose(config.key)} >
                        <p>{config.data.message}</p>
                        <button className="react-notipoix3-button"><i className="material-icons">close</i></button>
                    </li>
                )})}
                </ul>
            }
            </TransitionMotion>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        notification:state.notification.get('notification')
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        notify_ADD:(message) => {dispatch(actions.notify_add(message))},
        notify_Removing:(item) => {dispatch(actions.notify_removing(item))},
        notify_Remove:(item) => {dispatch(actions.notify_remove(item))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Notification);