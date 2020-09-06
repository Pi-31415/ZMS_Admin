import React from 'react'
import axios from 'axios';

class FileUpload extends React.Component {


    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.filelist[0] == undefined ? "No uploaded files." :
                        this.state.filelist.map((u) => <li onClick={this.download}>{u.NAME}{this.props.lessonid}{u.FILE_ID}</li>)
                    }
                </ul>
            </div>
        )
    }
}

export default FileUpload;