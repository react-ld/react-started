import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'

export default class LImage extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(){
    let {src, defaultPath, loading } = this.props,
      dom = findDOMNode(this),
    	tempImg = new Image();

    console.info("defaultPath",src) 
    //图片路径为空 null undefined
    if(!src){
      return
    }
    tempImg.onload = () => {
      dom.src = src
    }
    tempImg.onerror = () =>{
      console.info("onerror")
      dom.src = defaultPath
    }
    tempImg.src = src;
    if(loading){
      dom.src = loading;
    }
  }
  //TODO 当组件为update时存在无法更新图片的bug
  componentDidUpdate(prevProps, prevState) {
    console.info("defaultPath",prevProps.src) 
  }
  

  render() {
    const {src, defaultPath, loading, ...other} = this.props

    //如果图片src为空 null undefined 并且 defaultPath存在，则直接显示defaultPath
    if(!src && defaultPath){
      return  <img {...other} src={defaultPath} />
    }
    if(loading){
      return <img {...other} src={loading} />
    }
    if(defaultPath){
      return  <img {...other} src={defaultPath} />
    }
  }
} 

LImage.propTypes = {
  src: PropTypes.string.isRequired,
  defaultPath: PropTypes.string,
  loading: PropTypes.string
}