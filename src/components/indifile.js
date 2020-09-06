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

    render() {
        return (
            <div onClick={this.download}>
                {this.props.name}
                
            </div>
        )
    }
}

export default FileUpload;