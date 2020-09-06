import React from 'react'
import axios from 'axios';
import { isThisHour } from 'date-fns';

class FileUpload extends React.Component {


    render() {
        return (
            <div>
                {this.props.name}
            </div>
        )
    }
}

export default FileUpload;