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
        <p class="menu" :class="{ active: menu[0] }" @click="clickMenu(0)"><i class="iconfont" style="display: inline-block; transform: translateY(2px)">&#xe644;</i> Desktop</p>
        <p class="menu" :class="{ active: menu[1] }" @click="clickMenu(1)"><i class="iconfont" style="display: inline-block; transform: translateY(1px)">&#xe988;</i> Applications</p>
        <p class="menu" :class="{ active: menu[2] }" @click="clickMenu(2)"><i class="iconfont" style="font-size: 13px; display: inline-block; margin-right: 3px;">&#xe66c;</i> Documents</p>
        <p class="menu" :class="{ active: menu[3] }" @click="clickMenu(3)"><i class="iconfont" style="font-size: 14px; display: inline-block; margin-right: 2px;">&#xe615;</i> Downloads</p>

        <p style="color: rgba(0, 0, 0, 0.5); margin-top: 10px">iCloud</p>
        <p class="menu" :class="{ active: menu[4] }" @click="clickMenu(4)"><i class="iconfont" style="font-size: 14px">&#xe6b8;</i> iCloud Drive</p>
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
        <DeskIcon v-for="item, k in content.child" :key="k" :type="item.type" :item="item"></DeskIcon>
      </div>
    </div>
  </div>
</template>

<script>
const DeskIcon = () => import("../DeskIcon");

export default {
  name: "InsideFolder",
  components: { DeskIcon },
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
      menu: [false, false, false, false],
    };
  },
  methods: {
    clickMenu(index) {
      this.menu.forEach((_,k) => {
        this.$set(this.menu, k, false);
      });
      this.$set(this.menu, index, true);
    },
    mousedown(e) {
      this.$emit('toolbarMousedown', e);
    }
  },
  created() {
    this.open = this.isOpen;
    this.$store.commit('zIndexIncr');
    if (this.content.name == '文章') this.$set(this.menu, 0, true);
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
    background-color: rgba(230, 230, 230, 0.5);
    backdrop-filter: blur(10px);

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