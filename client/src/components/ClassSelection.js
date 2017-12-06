import React, {Component} from 'react';
import {Card} from 'react-materialize'
import * as UserActions from '../actions'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import $ from 'jquery'

class ClassSelection extends Component{

    constructor(props) {
        super(props);
        console.log('classprops',props);
        this.state = {
            classes: []
        };
    }

    componentWillMount() {
        this.props.fetchUserClasses();
        console.log("this.state.tags", this.state.tags);
    }


    render(){
        const { suggestions } = this.state;
        let classes;
        if(this.props.userClases)
            classes = this.props.userClases;
        console.log('classes',classes);
        console.log(classes);
        let divs = [];
        $.each(classes,function(index, obj){
            divs.push(
                <div className="col" key={index}>
                    <Card
                    className='blue-grey darken-1'
                    textClassName='white-text'
                    title={obj.text}
                    actions={[<a href={'/classes/'+ obj.text}>View {obj.text} documents</a>]}>
                    </Card>
                </div>
                );
        });
        console.log(divs);
        // for(let i=0; i<classes.length ;i++)
        // {
        //
        // }
        const data = (<div>
            <div className="flex-grid-thirds container" >
                {divs}
            </div>
        </div>);
        return data;
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchUserClasses: UserActions.fetchUserClasses,
    }, dispatch)
}

function mapStateToProps(state) {
    return {
        userClases: state.auth.userClasses
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassSelection);