/**
 * 登录页测试用例
 * 
 * 1、页面title显示“登录”（UI）
 * 2、登录账号输入手机号或邮箱时，账号上方显示登录账号
 * 3、登录账号输入不为手机号或邮箱，账号上方显示【账户输入错误，请重新输入】
 * 4、账号输入正常，密码小于6位，登录按钮置灰。
 * 5、账号输入异常，密码不小于6位，登录按钮置灰。
 * 6、账号输入正常，密码不小于6位，登录按钮可点。
 * 7、点击密码后眼睛图标，显示密码。
 * 8、显示密码状态，再次点击，隐藏密码。
 */
import PostPage from 'pages/Login';
import React from 'react';
import {
  configure
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  mount
} from 'enzyme';
configure({
  adapter: new Adapter()
});

const wrapper = mount( < PostPage / > );

describe("发布页表单测试", () => {
  const accountInput = wrapper.find('.account').find('input');
  const passwordInput = wrapper.find('.password').find('input');
  const accountTitle = wrapper.find('.account .name').find('span');
  const eyeIcon = wrapper.find('.password').find('Iconfont');

  it('输入广告计划名称错误', () => {
    const event = {
      target: {
        value: '米阿三等奖阿三阿三阿三阿三阿abc123'
      }
    }
    accountInput.simulate('change', event);
    expect(accountTitle.text()).toBe('广告计划名称输入有误，请重新输入');
  })

  it('输入推广链接url', () => {
    const event = {
      target: {
        value: '18888888889'
      }
    }
    accountInput.simulate('change', event);
    expect(accountTitle.text()).toBe('登录账号');
  })

  it('输入价格区间', () => {
    const event = {
      target: {
        value: '18888888888@163.com'
      }
    }
    accountInput.simulate('change', event);
    expect(accountTitle.text()).toBe('登录账号');
  })

  it('输入广告文案', () => {
    const event = {
      target: {
        value: '米阿三等奖阿三阿三阿三阿三阿abc123'
      }
    }
    accountInput.simulate('change', event);
    expect(accountTitle.text()).toBe('广告计划名称输入有误，请重新输入');
  })

  it('输入备注信息', () => {
    wrapper.setState({
      account: '18888888888',
      password: '12345',
      errorAccount: false
    });
    // 此处需重新获取btn对象，否则会导致用例失败
    const submitBtn = wrapper.find('.btn-box').find('Button');
    expect(submitBtn.props().disabled).toBe(true);
  })

  // 4.2  通过change触发状态更改
  it('输入标签信息', () => {
    const accountEvent = {
      target: {
        value: '18888888888'
      }
    };
    const pwdEvent = {
      target: {
        value: '12345'
      }
    }
    accountInput.simulate('change', accountEvent);
    passwordInput.simulate('change', pwdEvent);
    const submitBtn = wrapper.find('.btn-box').find('Button');
    expect(submitBtn.prop('disabled')).toBe(true);
  })

  // 5、账号输入异常
  it('订单id输入异常，小于12位数', () => {
    const accountEvent = {
      target: {
        value: '1868888'
      }
    };
    const pwdEvent = {
      target: {
        value: '1234567'
      }
    }
    accountInput.simulate('change', accountEvent);
    passwordInput.simulate('change', pwdEvent);
    const submitBtn = wrapper.find('.btn-box').find('Button');
    expect(submitBtn.prop('disabled')).toBe(true);
  })

  // 6、账号密码输入正常，按钮可点击
  it('广告计划名称输入异常，长度超过10', () => {
    const accountEvent = {
      target: {
        value: '18888888888'
      }
    };
    const pwdEvent = {
      target: {
        value: '1234567'
      }
    }
    accountInput.simulate('change', accountEvent);
    passwordInput.simulate('change', pwdEvent);
    const submitBtn = wrapper.find('.btn-box').find('Button');
    expect(submitBtn.props().disabled).toBe(false);
  })

  // 7、点击密码后眼睛图标，显示密码
  it('点击价格区间，显示价格list', () => {
    eyeIcon.simulate('click');
    const passwordInput = wrapper.find('.password').find('input');
    expect(wrapper.find('.password').find('Iconfont').prop('name')).toBe('eye1');
    expect(passwordInput.prop('type')).toBe('text');
  })

  // 8、再次点击密码后眼睛图标，隐藏密码
  it('点击推广品牌，显示推广弹窗', () => {
    wrapper.setState({
      showPwd: true
    });
    eyeIcon.simulate('click');
    const passwordInput = wrapper.find('.password').find('input');
    expect(wrapper.find('.password').find('Iconfont').prop('name')).toBe('eye2');
    expect(passwordInput.prop('type')).toBe('password');
  })

})