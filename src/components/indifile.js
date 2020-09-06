import React from 'react'
import axios from 'axios';
import Chip from '@material-ui/core/Chip';
import AttachmentIcon from '@material-ui/icons/Attachment';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
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

    handleClick(name, lessonid, fileid) {
        var url = "https://zmsedu.com/api/student/homework/download";
        axios({
            method:'post',
            url: url,
            data:{
                LESSON_ID: lessonid,
                FILE_ID: fileid
            },
            responseType: 'blob'
        })
            .then(response => {
                console.log(response)
                const type = response.headers['content-type']
                const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = name
                link.click()
                //fileDownload(res.data, name);
                //then edit the Lessons
                //
            }).catch(error => {
                console.log(error);
            });
    }

    delete(name, lessonid, fileid,homework) {
        console.log({
            LESSON_ID: lessonid,
            FILE_ID: fileid,
            HOMEWORK_ID: homework
        });
        var url = "https://zmsedu.com/api/admin/homework/delete";
        axios({
            method:'post',
            url: url,
            data:{
                LESSON_ID: lessonid,
                FILE_ID: fileid,
                HOMEWORK_ID: homework
            },
        })
            .then(response => {
                alert("File Deleted, please refresh to see changes.");
            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
            <Chip icon={<AttachmentIcon/>} label={this.props.name} color="primary" style={{margin:10}}/>
            <Chip icon={<GetAppIcon/>} label={'Download'} onClick={() => this.handleClick(this.props.name, this.props.lessonid, this.props.fileid)} style={{margin:10}} color='primary' variant="outlined"/>
            <Chip icon={<DeleteIcon/>} label={'Delete'} onClick={() => this.delete(this.props.name, this.props.lessonid, this.props.fileid,this.props.homeworkid)}  style={{margin:10}} color='primary' variant="outlined" />
            </div>
        )
    }
}

export default FileUpload;