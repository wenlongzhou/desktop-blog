<template>
  <div class="dock">
    <div class="content">
      <div class="item" @click="changeStatus('folder')">
        <img src="../assets/img/folder.png" alt="">
        <i class="iconfont" :class="[folderStatus]">&#xec7b;</i>
      </div>
      <div class="item" @click="changeStatus('file')" v-if="fileShow">
        <img src="../assets/img/doc.png" alt="">
        <i class="iconfont" :class="[fileStatus]">&#xec7b;</i>
      </div>
      <div class="item"><img src="../assets/img/safari.png" alt=""></div>
      <div class="item"><img src="../assets/img/photo.png" alt=""></div>
      <div class="item"><img src="../assets/img/note.png" alt=""></div>
      <div class="item"><img src="../assets/img/terminal.png" alt=""></div>
      <div class="item"><img src="../assets/img/calendar.png" alt=""></div>
      <div class="item"><img src="../assets/img/compute.png" alt=""></div>
      <div class="gap"></div>
      <div class="item"><img src="../assets/img/Recycle.png" alt=""></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dock",
  data() {
    return {
      desktopFiles:{
        type: 'folder',
        name: '文章',
        child: [
          {
            type: 'file',
              url: 'https://www.nazzzz.cn/test.md',
            name: 'test',
          },
          {
            type: 'file',
            url: 'https://www.nazzzz.cn/test.md',
            name: 'test',
          },
          {
            type: 'file',
            url: 'https://www.nazzzz.cn/test.md',     
            name: 'test',
          },
        ]
      },
    }
  },
  methods: {
    changeStatus(type) {
      if (!this.$store.state.dockStatus[type] || this.$store.state.dockStatus[type] == 'close') {
        if (type == 'folder') {
          this.$store.commit('openWindows', this.desktopFiles);
        } else {
          this.$store.commit('openWindows', {
            type: type
          });
        }
      } else {
        this.$store.commit('shrinkWindow', {
          uuid: 0,
          type: type,
        });
      }
    }
  },
  computed: {
    folderStatus() {
      return 'folder' in this.$store.state.dockStatus ? this.$store.state.dockStatus['folder'] : 'close';
    },
    fileShow() {
      console.log(this.$store.state.windowsCount['file']);
      return 'file' in this.$store.state.windowsCount ? this.$store.state.windowsCount['file'] : 0;
    },
    fileStatus() {
      return 'file' in this.$store.state.dockStatus ? this.$store.state.dockStatus['file'] : 'close';
    },
  }
}
</script>

<style lang="less" scoped>
  .dock {
    @dock-height: 60px;
    width: 100%;
    height: @dock-height;
    position: fixed;
    bottom: 5px;

    .content {
      @item-width: 44px;
      @padding: 8px;

      width: (@item-width + @padding) * 8;
      height: 100%;
      margin: 0 auto;
      padding: 0 @padding;
      background-color: rgba(255, 255, 255, .4);
      border-radius: 15px;
      box-shadow: 0px 0px 30px rgba(39, 39, 39, 0.4);
      display: flex;
      overflow: hidden;
      justify-content: space-around;
      align-items: center;

      .item {
        width: @item-width;
        height: @item-width;
        line-height: 1px;


        img {
          width: @item-width;
        }

        i {
          font-size: 13px;
          width: 13px;
          display: block;
          margin: 2px auto 0;
          display: none;
        }

        i.active {
          display: block;
          color: rgb(0, 211, 11);
        }
        i.close {
          display: none;
        }
        i.back {
          display: block;
          color: rgba(0, 0, 0, 0.733);
        }
      }

      .gap {
        width: 2px;
        height: 40px;
        border-radius: 1px;
        margin-left: 3px;
        background-color: rgba(0, 0, 0, 0.15);
      }
    }
  }
</style>