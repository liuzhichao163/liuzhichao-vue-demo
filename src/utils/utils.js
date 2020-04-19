import {Message, Alert} from 'element-ui'
import { getRequest } from '../api/api';

export const initMenu = (router, store)=> {
      //判断路由中的routes数组是否为空，不为空则是正常跳转 不用再次加载菜单列表,否则为登录，需要加载菜单列表
        if(store.state.routes.length > 0){
              return;
        }

        //否则是用户f5刷新或直接在地址栏输入的地址，则要加载菜单
        getRequest("/api/menu/uid").then(resp=>{
            if(resp && resp.status == 200){
                  var fmtRoutes = formatRoutes(resp.data);
                   //动态路由
                  router.addRoutes(fmtRoutes);
                  //将路由信息存入vuex的router数组
                  store.commit('initMenu', fmtRoutes);
                  console.log("<<<fmtRoutes>>>:"+JSON.stringify(fmtRoutes));
                  store.dispatch('connect');  //调用vuex的actions中的connect方法创建stomp对象
            }
        })

  }

  export const formatRoutes = (routes)=>{
        let fmRoutes = [];
        routes.forEach(router => {
              let{
                    path,
                    component,
                    name,
                    meta,
                    iconCls,
                    children
              } = router;
              if(children && children instanceof Array){
                  children = formatRoutes(children);
              }
              let fmRouter = {
                  path: path,
                  component(resolve){
                    if (component.startsWith("Home")) {
                      require(['../views/home/manager.vue'], resolve)  //按需加载路由，将组件用require引进来（也可以用import但不是按需加载，会消耗内存）
                     } else {
                        require(['../views'+path+'.vue'], resolve)
                     }

                  //    else if (component.startsWith("UserIndex")) {
                  //     require(['../views'+path+'.vue'], resolve)
                  //   } else if (component.startsWith("OrgTree")) {
                  //     require(['../views'+path+'.vue'], resolve)
                  //   } else if (component.startsWith("OrgList")) {
                  //     require(['../views'+path+'.vue'], resolve)
                  //   } else if(component.startsWith("RoleList")){
                  //       require(['../views'+path+'.vue'], resolve)
                  //   }else if(component.startsWith("MenuTree")){
                  //       require(['../views'+path+'.vue'], resolve)
                  //   }
                  },
                  name: name,
                  iconCls: iconCls,
                  meta: meta,
                  children: children
                };
                fmRoutes.push(fmRouter);
        });
        return fmRoutes;
  }