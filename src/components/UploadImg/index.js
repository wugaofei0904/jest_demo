import React, { Component } from 'react';
import Iconfont from '../Iconfont';
import { Toast } from 'antd-mobile';

import './index.less';

class UploadImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: undefined,
      percentage: 0,
      activeBorder: false,
    }
  }

  changeFile = (e) => {
    let file;
    if (e.dataTransfer) {
      e.preventDefault();
      file = e.dataTransfer.files[0];
    } else {
      file = e.target.files[0];
    }
    this.checkImg(file);
  }

  checkImg = (file) => {
    const _self = this;
    const {
      checkWidth,
      checkHeight,
      maxSize = 512,
      accept
    } = this.props;
    if (file) {
      const fileType = file.name.substr(file.name.lastIndexOf('.') + 1);
      if (file.size > maxSize * 1024) {
        Toast.info(`图片大小不得大于${maxSize}Kb`);
        return;
      } else if(!file.type.includes('image')) {
        Toast.info(`请上传图片文件`);
        return;
      } else if (accept && !accept.includes(fileType)) {
        Toast.info(`不支持${fileType}格式的图片`);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        const image = new Image();
        const data = e.target.result;
        image.src = data;
        image.onload = () => {
          if ((checkWidth && image.width !== ~~checkWidth) || (checkHeight && image.height !== ~~checkHeight)) {
            Toast.info(`请上传 ${checkWidth} * ${checkHeight} 尺寸的图片`);
            return;
          }
          _self.setState({
            image: data
          })
        }
      }
      this.uploadAjax(file);
    }
  }

  uploadAjax = (file) => {
    const self = this;
    const {
      uploadUrl
    } = this.props;
    const formData = new FormData();
    formData.append("file", file);
    const client = new XMLHttpRequest()
    client.open("POST", uploadUrl)
    client.upload.onprogress = function(e) {
      console.log(e.lengthComputable)
      if (e.lengthComputable) {
        let total = e.total;
        let loaded = e.loaded;
        let percentage = parseFloat(loaded / total).toFixed(2);
        self.setState({
          percentage
        })
      }
    }
    client.send(formData)
  }

  render() {
    const {
      className,
      children = (<React.Fragment>
          <Iconfont name="upload" className="upload-icon" />
          <p>点击上传</p>
        </React.Fragment>)
    } = this.props;
    const {
      image,
      activeBorder,
      percentage
    } = this.state;
    return (
      <React.Fragment>
        <div className={`upload-box ${className || ''} ${activeBorder ? 'active' : ''}`}>
          <input type="file" id="uploadImg" accept="image/*" onChange={(e) => {
            this.changeFile(e);
          }} />
          { (percentage < 1 && percentage > 0) && <div className="gray-bg">
            <div className="line-box">
              <div className="line-active" style={{transform: `translateX(${(percentage - 1) * 100}%)`}}></div>
            </div>
          </div> }
          <label htmlFor="uploadImg" onDragOver={e => {
            e.preventDefault();
          }} onDrop={e => {
            this.setState({
              activeBorder: false
            })
            this.changeFile(e);
          }} onDragEnter={() => {
            this.setState({
              activeBorder: true
            })
          }} onDragLeave={() => {
            this.setState({
              activeBorder: false
            })
          }}>
            {image ? <img src={image} alt="" /> : <section>{children}</section>}
          </label>
        </div>
      </React.Fragment>
    )
  }
    
}

export default UploadImg;
