import React from 'react';

import './index.less';

const Iconfont = (props) => {
  return (
    props.color ?
      (<svg className={`icon ${props.className || ''}`} aria-hidden="true" onClick={props.onClick}>
        <use xlinkHref={`#icon-${props.name}`}></use>
      </svg>)
      :
      <i className={`icon iconfont icon-${props.name} ${props.className || ''}`} onClick={props.onClick} />
  );
}

export default Iconfont;