<template>
  <div class="insideFolder" v-if="desktopFiles">
    <div class="left">
      <div class="toolbar" @mousedown="mousedown">
        <span @click="$emit('close')"><i class="iconfont" style="font-size: 13px; color: #f95a5a">&#xe62c;</i></span>
        <span @click="$emit('shrink')"><i class="iconfont" style="font-size: 13px; color: rgb(255 177 53)">&#xe62c;</i></span>
        <span ><i class="iconfont" style="font-size: 13px; color: rgb(69 191 69)">&#xe62c;</i></span>
      </div>
      <div class="menus">
        <p style="color: rgba(0, 0, 0, 0.5)">Favorites</p>
        <p class="menu" :class="{ active: menuClass0 }" @click="clickMenu(0)"><i class="iconfont" style="display: inline-block; transform: translateY(2px)">&#xe644;</i> Desktop</p>
        <p class="menu" :class="{ active: menuClass1 }" @click="clickMenu(1)"><i class="iconfont" style="display: inline-block; transform: translateY(1px)">&#xe988;</i> Applications</p>
        <p class="menu" :class="{ active: menuClass2 }" @click="clickMenu(2)"><i class="iconfont" style="font-size: 13px; display: inline-block; margin-right: 3px;">&#xe66c;</i> Documents</p>
        <p class="menu" :class="{ active: menuClass3 }" @click="clickMenu(3)"><i class="iconfont" style="font-size: 14px; display: inline-block; margin-right: 2px;">&#xe615;</i> Downloads</p>

        <p style="color: rgba(0, 0, 0, 0.5); margin-top: 10px">iCloud</p>
        <p class="menu" :class="{ active: menuClass4 }" @click="clickMenu(4)"><i class="iconfont" style="font-size: 14px">&#xe6b8;</i> iCloud Drive</p>
      </div>
    </div>
    <div class="right">
      <div class="toolbar" @mousedown="mousedown">
        <div>
          <span><i class="iconfont" style="font-size: 13px">&#xe635;</i></span>
          <span><i class="iconfont" style="font-size: 13px; transform: rotate(180deg); display: inline-block;">&#xe635;</i></span>
          <span style="font-weight: 800">{{ content.name }}</span>
        </div>
        <div>
          <span><i class="iconfont" style="font-size: 17px;">&#xe639;</i></span>
          <span><i class="iconfont" style="font-size: 20px; transform: translateY(1px); display: inline-block;">&#xe81c;</i></span>
        </div>
        <div>
          <span><i class="iconfont" style="font-size: 17px">&#xe63d;</i></span>
        </div>
      </div>
      <div class="fileList" v-if="content.child">
        <file-item v-for="item, k in content.child" :key="k" :type="item.type" :item="item"></file-item>
      </div>
    </div>
  </div>
</template>

<script>
const fileItem = () => import("./FileItem");

export default {
  name: "InsideFolder",
  components: { fileItem },
  props: {
    isOpen: Boolean,
    content: Object,
    index: Number,
  },
  data() {
    return {
      desktopFiles: [
      ],
      move: false,
      deltaLeft: 0,
      deltaTop: 0,
      open: false,
      menuClass0: false,
      menuClass1: false,
      menuClass2: false,
      menuClass3: false,
      menuClass4: false,
    };
  },
  methods: {
    clickMenu(index) {
      for (let i = 0; i < 5; i++) {
        let aa = 'menuClass' + i;
        this[aa] = false;
      }

      let bb = 'menuClass' + index;
      this[bb] = true;
    },
    mousedown(e) {
      this.$emit('toolbarMousedown', e);
    }
  },
  created() {
    this.open = this.isOpen;
    this.$store.commit('zIndexIncr');
    if (this.content.name == '桌面') this.menuClass0 = true;
  }
};
</script>

<style lang="less" scoped>
@radius: 10px;
@toolbar-height: 50px;

.insideFolder {
  display: flex;
  width: 100%;
  height: 100%;

  .left {
    width: 200px;
    height: 100%;
    border-top-left-radius:@radius;
    border-bottom-left-radius:@radius;
    background-color: rgba(212, 212, 212, 0.822);

    .toolbar {
      height: @toolbar-height;
      padding: 0 10px;;

      span {
        line-height: @toolbar-height;
        margin-left: 8px;
      }
    }

    .menus {
      color: rgba(0, 0, 0, 0.7);
      padding: 0 10px;
      font-size: 13px;
      font-weight: 700;
      line-height: 28px;

      p {
        padding: 0 10px;

        i {
          color: rgb(57, 134, 223);
          font-weight: 500;
        }
      }
      .menu {
        padding: 0 15px;
        border-radius: 5px;
      }
      .menu:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
      .active {
          background-color: rgba(0, 0, 0, 0.04);
      }
    }
  }

  .right {
    width: 500px;
    height: 100%;
    border-top-right-radius:@radius;
    border-bottom-right-radius:@radius;
    background-color: rgb(255, 255, 255);

    .toolbar {
      widows: 100%;
      height: @toolbar-height;
      padding: 0 10px;
      border-bottom: 1px solid rgba(121, 121, 121, 0.15);
      line-height: @toolbar-height;
      display: flex;
      justify-content: space-between;

      span {
        margin: 0 8px;
        font-size: 13px;
        color: rgb(29, 29, 29);

        i {
          color: rgb(128, 128, 128);
        }
      }
    }

    .fileList {
      color: rgb(26, 26, 26);
      display: flex;
    }
  }
}
</style>