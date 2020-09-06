import React from 'react'
import axios from 'axios';
import Individualfile from './indifile';
class FileUpload extends React.Component {

    constructor() {
        super();
        this.state = {
            filelist: ''
        }

    }

    componentDidMount() {
        var url = "https://zmsedu.com/api/admin/homework/get";
        axios.post(url, {}, { // receive two parameter endpoint url ,form data 
        })
            .then(res => {

                for (var i = 0; i < res.data.HOMEWORK.length; i++) {
                    if (res.data.HOMEWORK[i].LESSON_ID == this.props.lessonid) {
                        this.setState({
                            filelist: res.data.HOMEWORK[i].TEACHER_UPLOAD,
                        })
                        console.log(this.state.filelist[0]);
                    }
                }

                //then edit the Lessons
                //
            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.filelist[0] == undefined ? "No uploaded files." :
                        this.state.filelist.map((u) => <Individualfile lessonid={this.props.lessonid} fileid={u.FILE_ID} name={u.NAME}></Individualfile>)
                    }
                </ul>
            </div>
        )
    }
}

export default FileUpload;