
<template>
  <div>
    <div class="title">八皇后问题</div>

    <div class="grid">
      <div class="row" v-for="(row, rindex) in grids" :key="rindex">
        <div
          @click="changeText(rindex, cindex)"
          class="cell"
          v-for="(cell, cindex) in row"
          :key="cindex"
        >
          <div v-if="cell.ok">Q</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const grids = new Array(8).fill(1).map((_, r) => {
  return new Array(8).fill(1).map((_, c) => {
    return {
      key: `key-${r * 8 + c}`,
      ok: false,
    };
  });
});

export default {
  data() {
    return {
      grids,
    };
  },
  methods: {
    changeText(rindex, cindex) {
      if (this.validate(rindex, cindex)) {
        this.grids[rindex][cindex].ok = !this.grids[rindex][cindex].ok;
      } else {
        alert("错误");
      }
    },
    validate(rindex, cindex) {
      // 横
      for (let i = 0; i < this.grids[rindex].length; i++) {
        if (this.grids[rindex][i].ok) {
          return false;
        }
      }

      // 竖
      for (let i = 0; i < this.grids.length; i++) {
        if (this.grids[i][cindex].ok) {
          return false;
        }
      }

      // 撇
      for (let i = 0; i < this.grids[0].length; i++) {
        let y = rindex + cindex - i;
        if (y >= 0 && y < this.grids.length && this.grids[y][i].ok) {
          return false;
        }
      }

      // 捺
      for (let i = 0; i < this.grids[0].length; i++) {
        let y = rindex - cindex + i;
        if (y >= 0 && y < this.grids.length && this.grids[y][i].ok) {
          return false;
        }
      }

      return true;
    },
  },
};
</script>

<style scoped>
.grid {
  width: 400px;
  margin: 0 auto;
}
.row {
  height: 50px;
  width: 400px;
  display: flex;
}
.cell {
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #999;
  cursor: pointer;
}
/* 首先找到所有当前元素的兄弟元素 */
.cell:nth-child(2n) {
  background: #efefef;
}
/* row偶数行的cell的偶数列  */
.row:nth-child(2n) .cell:nth-child(2n) {
  background: #999;
}
/* row偶数行的cell的奇数列  */
.row:nth-child(2n) .cell:nth-child(2n-1) {
  background: #efefef;
}
</style>>
  