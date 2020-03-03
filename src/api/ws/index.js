/**
 * Created by binwang on 2018/11/7.
 */
import axios from 'axios'

export default {
  // 记载系统消息
  loadNF: async () => {
    let resp = await axios.get('/ws/nf')
    return resp.data
  },
 //发送系统消息
  addMsg: async (msg) => {
    let resp = await axios.post('/api/msg', msg)
    return resp.data
  },
  //查询系统消息列表
  queryMsgs: async (msg)=>{
    let resp = await axios.get(`/api/msg?page=${msg.page}&size=${msg.size}`)
    return resp.data
  },
  //修改系统消息的状态
  updateMsgState: async (flage)=>{
    let resp = await axios.put(`/api/msg?flage=${flage}`)
    return resp.data
  }
}
