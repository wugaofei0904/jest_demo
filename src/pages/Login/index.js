import React, { Component } from 'react';
import Iconfont from 'components/Iconfont';
import { Button, Toast } from 'antd-mobile';

import axios from 'services/axios';

import './index.less';

class Login extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      account: '',
      password: '',
      errorAccount: false,
      showPwd: false
    }
  }

  // 更改输入框值
  changeVal = (val, type) => {
    if (type === 'account') {
		  const phoneReg =  /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
      const emailReg = /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
      this.setState({
        account: val,
        errorAccount: (!phoneReg.test(val) && !emailReg.test(val))
      });
    } else {
      this.setState({
        password: val
      });
    }
  }

  // 预览密码
  browsePwd = () => {
    const {
      showPwd
    } = this.state;
    this.setState({
      showPwd: !showPwd
    })
  }

  // 登录
  login = () => {
    const {
      account,
      password
    } = this.state;
    
    const data = {
      username: account,
      password: password,
    }
      axios('/user/login', {
        method: 'post',
        loading: true,
        data
      }).then(res => {
        if (res && res.success) {
          this.props.history.replace('home');
        } else {
          Toast.info(res.message);
        }
      }).catch(e => {
        Toast.info(e.msg)
      });
  }

  render = () => {
    const {
      account,
      password,
      showPwd,
      errorAccount
    } = this.state;
    return (
      <div className="login">
        <div className="login-content">
          <h1 className="title">登录</h1>
          <div className="account">
            <div className="name">
              {
                errorAccount ? (
                  <span className="errorTips">账户输入错误，请重新输入</span>
                ) : (
                  <span>登录账号</span>
                )
              }
            </div>
            <input className="input-value" type="text" value={account} onChange={(e) => {
              const val = e.target.value;
              this.changeVal(val, 'account');
            }} />
          </div>
          <div className="password">
            <div className="name">
              <div className="text">密码</div>
              <div className="icon-box blue-color">
                {
                  showPwd ?
                    <Iconfont name="eye1" onClick={this.browsePwd} /> :
                    <Iconfont name="eye2" onClick={this.browsePwd} />
                }
              </div>
            </div>
            {showPwd
              ?
              (<input className="input-value" type="text" value={password} onChange={(e) => {
                const val = e.target.value;
                this.changeVal(val, 'password');
              }} />)
              :
              (<input className="input-value" type="password" value={password} onChange={(e) => {
                const val = e.target.value;
                this.changeVal(val, 'password');
              }} />)
            }
          </div>
          <div className="btn-box">
            <Button type="primary" disabled={errorAccount || password.length < 6 || !password || !account} onClick={this.login}>登录</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
