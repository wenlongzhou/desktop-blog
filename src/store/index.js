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
      if (item.type === 'folder') {
        this.commit('changeDockStatus', {
          type: item.type,
          status: "active"
        });
      }
      if (item.type === 'file') {
        this.commit('changeDockStatus', {
          type: item.type,
          status: "active"
        });
      }

      this.commit('windowsCount', { type: item.type, num: 1 });
      this.commit('windowsShowCount', { type: item.type, num: 1 });
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

          this.commit('windowsCount', { type: windowsType, num: -1 });
          this.commit('windowsShowCount', { type: windowsType, num: -1 });
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
            this.commit('windowsShowCount', { type: type, num: 1 });


            temp.windowStyle.width = temp.windowTempStyle.width;
            temp.windowStyle.height = temp.windowTempStyle.height;
            temp.windowStyle.top = temp.windowTempStyle.top;
            temp.windowStyle.left = temp.windowTempStyle.left;
            temp.windowStyle.transform = temp.windowTempStyle.transform;
          } else if (status == 'back' && temp.windowStyle.width) {
            this.commit('windowsShowCount', { type: type, num: -1 });

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
    changeWindowStyle(state, data) {
      let { index, style } = data;

      let temp = clone(state.windows[index].windowStyle);
      for (let i in temp) {
        if (!(i in style)) style[i] = temp[i];
      }
      state.windows[index].windowStyle = style;
    },
    windowsCount(state, data) {
      let { type, num } = data;
      let temp = clone(state.windowsCount);

      if (type in state.windowsCount) {
        temp[type] = temp[type] + num;
      } else {
        temp[type] = 1;
      }
      state.windowsCount = temp;
    },
    windowsShowCount(state, data) {
      let { type, num } = data;
      let temp = clone(state.windowsShowCount);

      if (type in state.windowsShowCount) {
        temp[type] = temp[type] + num;
      } else {
        temp[type] = 1;
      }
      state.windowsShowCount = temp;
    },

    changeDockStatus(state, data) {
      let ojb = clone(state.dockStatus);
      ojb[data.type] = data.status;
      state.dockStatus = ojb;
    }
  }
})
