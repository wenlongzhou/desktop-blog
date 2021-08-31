import Vue from 'vue'
import Vuex from 'vuex'
import { getUuid, clone } from '../utils/tools'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    folderLayout: "icon",
    zIndex: 10,
    windows: [],
    windowsCount: {},
    windowsShowCount: {},
    dockStatus: {},
    windowFlag: -1, //窗口产生的方向
  },
  mutations: {
    zIndexIncr(state) {
      state.zIndex++;
    },
    openWindows(state, item) {
      let obj = clone(item);
      obj.uuid = getUuid();

      let base = state.windows.length % 5;
      if (state.windows.length % 5 === 0) {
        state.windowFlag *= -1;
      }
      let topOffset = 300 - base * 30 * state.windowFlag;
      let leftOffset = 400 - base * 50 * state.windowFlag;
      obj.windowStyle = {
        width: "700px",
        height: "500px",
        top: `calc(50% - ${topOffset}px)`,
        left: `calc(50% - ${leftOffset}px)`,
        "z-index": state.zIndex + 1,
        transform: 'scale(0)',
      };
      if (item.type == 'folder') {
        this.commit('changeDockStatus', {
          type: item.type,
          status: "active"
        });
      }

      state.windowsCount[item.type] = (item.type in state.windowsCount) ? state.windowsCount[item.type] + 1 : (state.windowsCount[item.type] = 1);
      state.windowsShowCount[item.type] = (item.type in state.windowsShowCount) ? state.windowsShowCount[item.type] + 1 : (state.windowsShowCount[item.type] = 1);
      state.windows.push(obj);
      //打开动画
      setTimeout(function() {
        let obj1 = clone(state.windows[state.windows.length - 1].windowStyle);
        obj1.transform = 'scale(1)';
        state.windows[state.windows.length - 1].windowStyle = obj1;
      }, 10);
    },
    closeWindows(state, uuid) {
      let windowsType;

      for (let i = 0; i < state.windows.length; i++) {
        if (state.windows[i]['uuid'] === uuid) {
          windowsType = state.windows[i]['type'];
          //关闭动画
          let obj1 = clone(state.windows[i].windowStyle);
          obj1.transform = 'scale(0)';
          state.windows[i].windowStyle = obj1;

          state.windowsCount[windowsType]--;
          state.windowsShowCount[windowsType]--;
          setTimeout(() => {
            state.windows.splice(i, 1);
          }, 500);
        }
      }
      if (state.windowsCount[windowsType] === 0) {
        this.commit('changeDockStatus', {
          type: windowsType,
          status: "close"
        });
      }
    },
    shrinkWindow(state, data) {
      let { uuid, type } = data;
      let status;

      if (state.dockStatus[type] == 'back') {
        status = 'active';
      } else if (state.dockStatus[type] == 'active') {
        status = 'back';
      }
      
      for (let i = 0; i < state.windows.length; i++) {
        if (state.windows[i]['uuid'] == uuid || (!uuid && type && state.windows[i]['type'] == type)) {
          let temp = clone(state.windows[i]);

          if (status == 'active' && !temp.windowStyle.width) {
            state.windowsShowCount[type]++;

            temp.windowStyle.width = temp.windowTempStyle.width;
            temp.windowStyle.height = temp.windowTempStyle.height;
            temp.windowStyle.top = temp.windowTempStyle.top;
            temp.windowStyle.left = temp.windowTempStyle.left;
            temp.windowStyle.transform = temp.windowTempStyle.transform;
          } else if (status == 'back' && temp.windowStyle.width) {
            state.windowsShowCount[type]--;

            temp.windowTempStyle = {
              width: temp.windowStyle.width,
              height: temp.windowStyle.height,
              top: temp.windowStyle.top,
              left: temp.windowStyle.left,
              transform: 'scale(1)',
            };
            temp.windowStyle.width = 0;
            temp.windowStyle.height = 0;
            temp.windowStyle.top = "90%";
            temp.windowStyle.left = "50%";
            temp.windowStyle.transform = 'scale(0)';
          }

          state.windows[i].windowStyle = temp.windowStyle;
          state.windows[i].windowTempStyle = temp.windowTempStyle;
        }
      }

      if (status == 'active' || state.windowsShowCount[type] < 1) {
        this.commit('changeDockStatus', {
          type: type,
          status: status,
        });
      }
    },

    changeDockStatus(state, data) {
      let ojb = clone(state.dockStatus);
      ojb[data.type] = data.status;
      state.dockStatus = ojb;
    }
  }
})
