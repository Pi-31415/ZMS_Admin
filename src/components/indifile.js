import React from 'react'
import axios from 'axios';

class FileUpload extends React.Component {

    constructor() {
        super();
        this.state = {
            filename: '',
            lessonid: ''
        }

    }
    
    componentDidMount() {
        this.setState({
            filename: this.props.filename,
            lessonid: this.props.lessonid
        });
    }

    handleClick(name,lessonid,filename) {
        
    }

    render() {
        return (
            <div onClick={() => this.handleClick(this.props.name,this.props.lessonid,this.props.filename)}>
                {this.props.name}
                
            </div>
        )
    }
}

export default FileUpload;