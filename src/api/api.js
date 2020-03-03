/**
 * 封装axios
 * 1：导入axios
 * 2：导入element-ui的消息提示组件{Message}
 */
import axios from 'axios'
import {Message} from 'element-ui'

// 添加请求拦截器
axios.interceptors.request.use(config => {
  //在发送请求之前做某事
  return config;
}, err => {
  //请求错误时做某事
  Message.error({message: '请求超时!'});
  // return Promise.resolve(err);
})

//添加响应拦截器
axios.interceptors.response.use(data => {
  //对响应做哪些事情
  if (data.status && data.status == 200 && data.data.status == 500) {
    Message.error({message: data.data.msg});
    return;
  }
  if (data.data.msg) {
    Message.success({message: data.data.msg});
  }
  return data;
}, err => {
  //响应错误时做那些事
  if (err.response.status == 504 || err.response.status == 404) {
    Message.error({message: '服务器被吃了⊙﹏⊙∥'});
  } else if (err.response.status == 403) {
    Message.error({message: '权限不足,请联系管理员!'});
  } else if (err.response.status == 401) {
    Message.error({message: err.response.data.msg});
  } else {
    if (err.response.data.msg) {
      Message.error({message: err.response.data.msg});
    }else{
      Message.error({message: '未知错误!'});
    }
  }
  // return Promise.resolve(err);
})

let base = '';
//post请求
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

//put请求
export const putRequest2 = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
//get请求
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params
  });
}

//delete请求
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  });
}
//get请求
export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: `${base}${url}`
  });
}

//文件上传请求
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
