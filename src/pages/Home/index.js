import React, { Component } from 'react';
import { Button, Toast } from 'antd-mobile';
import { connect } from 'react-redux'

import { addTest, reduceTest } from 'models/actions/test-action';
import axios from 'services/axios';
import Iconfont from 'components/Iconfont';
import UploadImg from 'components/UploadImg';

import './index.less';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testIcon: ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8'],
      emojiIcon: ['emoji1', 'emoji2', 'emoji3', 'emoji4', 'emoji5', 'emoji6', 'emoji7', 'emoji8']
    }
  }

  componentDidMount() {
    // redux示例
    this.props.addTest(5)
    setTimeout(() => {
      this.props.reduceTest(3);
    }, 10000);
  }

  sendAjax = () => {
    axios('/test/test', {}).then(res => {
      const {
        data,
        code,
        msg
      } = res;
      if (code === 200) {
        Toast.info(data.text);
      } else {
        Toast.fail(msg);
      }
    })
  }

  render() {
    const {
      testIcon,
      emojiIcon
    } = this.state;
    console.log(this.props);
    return (
      <div className="home">
        <h4>普通ICON</h4>
        <div className="icon-box">
          {
            testIcon.map(item => (
              <div key={item} className="icon-content">
                <Iconfont name={item} />
              </div>
            ))
          }
        </div>
        <h4>Emoji (带颜色ICON)</h4>
        <div className="icon-box">
          {
            emojiIcon.map(item => (
              <div key={item} className="icon-content">
                <Iconfont name={item} color />
              </div>
            ))
          }
        </div>
        <br />
        <Button type="primary" onClick={this.sendAjax}>点击发送请求</Button>
        <br />
        {this.props.testData}
        <hr />
        <UploadImg
          className="upload-file"
          // checkWidth="121"
          // checkHeight="121"
          maxSize="2048"
          accept={['jpg', 'png']}
          uploadUrl = "****"
        />
      </div>
    );
  }
}

export default connect(state => ({
  testData: state.test.testData
}), {
  addTest,
  reduceTest
})(Home);;
