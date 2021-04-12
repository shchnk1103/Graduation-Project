<template>
  <el-row>
    <el-col :span="5"></el-col>

    <el-col :span="11" class="border">
      <div class="position">
        <div class="title-position">
          <h3>发表评论</h3>
          <p class="subtitle">已有 {{ comments.length }} 条评论</p>
        </div>

        <!-- 评论多行文本输入控件 -->
        <div v-if="hasLogin">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4 }"
            :placeholder="placeholder"
            v-model="message"
            name="comment"
            id="comment-area"
            class="comment-area"
          >
          </el-input>
          <button @click="submit" class="submitBtn">发布</button>
        </div>
        <div v-else><p class="comment-tip">登陆之后参与评论</p></div>

        <!-- 渲染所有评论内容 -->
        <div v-for="comment in comments" :key="comment.id">
          <!-- 父评论 -->
          <div class="comments" v-if="!comment.parent">
            <div>
              <span class="username">
                {{ comment.author.username }}
              </span>
              -
              <span class="created">
                {{ formatted_time(comment.created) }}
              </span>
              说：
            </div>
            <div class="content">
              {{ comment.content }}
            </div>
            <div>
              <button class="commentBtn" @click="replyTo(comment)">回复</button>
            </div>
          </div>
          <!-- 子评论 -->
          <div class="comments children-comments" v-else>
            <div>
              <span class="username">
                {{ comment.author.username }}
              </span>
              -
              <span class="created">
                {{ formatted_time(comment.created) }}
              </span>
              <span v-if="comment.parent">
                对
                <span class="parent">
                  {{ comment.parent.author.username }}
                </span>
              </span>
              说：
            </div>
            <div class="content">
              {{ comment.content }}
            </div>
            <div>
              <button class="commentBtn" @click="replyTo(comment)">回复</button>
            </div>
          </div>
        </div>
      </div>
    </el-col>

    <el-col :span="8"></el-col>
  </el-row>
</template>

<script>
import authorization from "@/utils/authorization";
import axios from "axios";

export default {
  name: "Comments",
  props: {
    article: Object,
  },
  data() {
    return {
      comments: [],
      message: "",
      placeholder: "留下评论吧。。。",
      parentID: null,
      hasLogin: false,
    };
  },
  // 监听 article 对象
  // 以便实时更新评论
  watch: {
    article() {
      this.comments = this.article !== null ? this.article.comments : [];
    },
  },
  mounted() {
    authorization().then((data) => ([this.hasLogin, this.username] = data));
  },
  methods: {
    submit() {
      authorization().then((response) => {
        if (response[0]) {
          axios
            .post(
              "/api/comment/",
              {
                content: this.message,
                article_id: this.article.id,
                parent_id: this.parentID,
              },
              {
                headers: {
                  Authorization:
                    "Bearer " + localStorage.getItem("access.bishe"),
                },
              }
            )
            .then((response) => {
              // 将新评论添加到顶部
              this.comments.unshift(response.data);
              this.message = "";
              alert("留言成功！！！");
            });
        } else {
          alert("请先登录再评论！！！");
        }
      });
    },
    // 对某条评论进行评论
    // 即二级评论
    replyTo(comment) {
      this.parentID = comment.id;
      this.placeholder = "对" + comment.author.username + "说:";
    },
    // 修改日期显示格式
    formatted_time(iso_date_string) {
      const date = new Date(iso_date_string);
      return date.toLocaleDateString() + "  " + date.toLocaleTimeString();
    },
  },
};
</script>

<style scoped>
.title-position {
  position: relative;
  margin-bottom: 10px;
}

.subtitle {
  position: absolute;
  top: 7%;
  left: 17%;
}

.border {
  margin-left: -6%;
  padding-left: 1%;
  padding-right: 1%;
  margin-top: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.position {
  padding-left: 10px;
  padding-bottom: 10px;
}

button {
  cursor: pointer;
  border: none;
  outline: none;
  color: whitesmoke;
  border-radius: 5px;
}

.submitBtn {
  height: 35px;
  background: steelblue;
  width: 100%;
}

.commentBtn {
  position: absolute;
  right: 20px;
  top: 10px;
  height: 25px;
  background: lightslategray;
  width: 40px;
}

.comments {
  position: relative;
  padding-top: 10px;
}

.username {
  font-weight: bold;
  color: darkorange;
}

.created {
  font-weight: bold;
  color: darkblue;
}

.parent {
  font-weight: bold;
  color: orangered;
}

.content {
  font-size: large;
  padding: 15px;
}

.comment-area {
  margin-bottom: 5px;
}

.children-comments {
  padding-left: 2em;
}

.comment-tip {
  text-align: center;
  color: rgb(104, 189, 189);
}
</style>
