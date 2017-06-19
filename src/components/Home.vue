<template>
    <div class="home"
         id="home">
        <modal name="hello-world"
               width=300>
            <div class="pop-up-box clearfix">
                <div class="checkbox">
                    <strong>folder type</strong>
                    <label name="diary"
                           class="checked"
                           for="diary">
                        <i class="iconfont icon-book"></i>diary
                        <input type="radio"
                               id="diary"
                               checked="checked"
                               value="diary">
                    </label>
                    <label name="list"
                           for="list">
                        <i class="iconfont icon-alert"></i>list
                        <input type="radio"
                               id="list"
                               value="list">
                    </label>
                    <label name="address"
                           for="address">
                        <i class="iconfont icon-phone"></i>address book
                        <input type="radio"
                               id="address"
                               value="address">
                    </label>
                </div>
                <div class="form-group">
                    <strong>folder name</strong>
                    <input type="text"
                           name="folder_name"
                           class="form-control">
                </div>
                <button type="submit"
                        class="btn btn-default pull-right"
                        id="submitNewFolder">Submit</button>
            </div>
        </modal>
    
        <header>
            <img src="http://tva1.sinaimg.cn/crop.316.53.496.496.180/686d7361jw1f3q2lpig4cj20vk0hswn3.jpg"
                 alt="avatar"
                 class="img-circle">
            <div class="name">
                <span class="nickname"
                      @click="show">{{nickname}}</span>
                <span class="realname">{{realname}}</span>
            </div>
        </header>
        <div id="main">
            <div v-for="item in testdata"
                 class="item"
                 :data-folderid="item._id"
                 :data-type="item.type"
                 @click="jump">
                <i class="iconfont" :class="transferToIcon(item.type)"></i>
                <span>{{item.foldername}}</span>
                <div class="total">
                    <span>30</span>
                    <i class="iconfont icon-next"></i>
                </div>
            </div>
        </div>
        <div id="search-result"
             class="container">
        </div>
        <footer>
            <div class="inputdiv">
                <icon name="search"
                      class="search"
                      scale="1.5"></icon>
                <input type="text"
                       name="search"
                       id="search" />
            </div>
            <icon name="cog"
                  class="cog"
                  scale="1.5"></icon>
        </footer>
        <div id="setting-div">
            <i class="iconfont icon-tianjia"
               id="new"
               data-toggle="modal"
               data-poptarget="newfolder"></i>
            <i class="iconfont icon-zhuti"
               id="theme"
               onclick="changeTheme()"></i>
            <i class="iconfont icon-about"
               id="about"
               onClick="location='about.html'"></i>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import vmodal from 'vue-js-modal'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
Vue.use(vmodal)
Vue.component('icon', Icon)
export default {
    name: 'home',
    data() {
        return {
            nickname: '立花　瀧',
            realname: 'たちばな　たき',
            testdata: [
                {
                    "_id": "59467d2335058a260a1c4bf6",
                    "type": "diary",
                    "foldername": "测试日记",
                    "username": "ssshooter",
                    "__v": 0
                },
                {
                    "_id": "59467d3935058a260a1c4bf7",
                    "type": "phonebook",
                    "foldername": "测试通讯录",
                    "username": "ssshooter",
                    "__v": 0
                }
            ],
            list: []
        }
    },
    mounted() {
    },
    methods: {
        transferToIcon(type){
            return 'icon-' + (type === 'diary' ? 'book' : type === 'phonebook' ? 'contact' : type === 'todolist' ? 'alert' : false);
        },
        show() {
            this.$modal.show('hello-world');
        },
        hide() {
            this.$modal.hide('hello-world');
        },
        jump(event) {
            if (event.currentTarget.dataset.type === 'diary')
                this.$router.push('/diary/entries');
        }
    }
}
</script>

<style lang="less" scoped>
@import './common.less';
@import '//at.alicdn.com/t/font_h8pyt35bn8xmkj4i.css';
@headerheight: 6rem;
.box {
    float: left;
    box-sizing: border-box;
    padding: 10px 10px;
}

header {
    /*padding for导航栏*/
    padding-top: @paddingforbar;
    box-sizing: border-box;
    height: @headerheight;
    position: fixed;
    width: 100vw;
    background-color: @maincolor;
    color: #fff;
    img {
        .box;
        height: 100%;
    }
    .name {
        .box;
    }
}

#main {
    min-height: 100vh;
    box-sizing: border-box;
    padding-top: @headerheight;
    padding-bottom: 44px;
    .item {
        border-bottom: 1px #ccc solid;
        padding: 10px 30px 10px 0;
        margin-left: 30px;
        line-height: 3rem;
        color: rgb(92, 115, 136);
        height: 3rem;
        .iconfont{
            font-size: 1.5rem;
        }
        .iconfont,
        span {
            vertical-align: middle;
        }
        .total {
            float: right;
        }
    }
}

footer {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    box-sizing: border-box;
    padding: 0 .4rem;
    width: 100vw;
    height: 2.8rem;
    background-color: #fff;
    border-top: 1px #CACACA solid;
    bottom: 0;
    .inputdiv {
        position: relative;
        width: 100%;
        input {
            padding-top: .4rem;
            width: 95%;
            box-sizing: border-box;
            border: none;
            border-radius: 10px;
            background-color: @maincolor;
            padding-left: 30px;
            font-size: 20px;
            line-height: 28px;
        }
        .search {
            position: absolute;
            top: 50%;
            margin-top: -12px;
            left: 5px;
        }
    }
    .search,
    input {
        color: #fff;
    }
    .cog {
        color: @maincolor;
    }
}

#search-result {
    display: none;
    background-color: rgba(0, 0, 0, .5);
    position: absolute;
    height: calc(100vh - 44px);
    width: 100vw;
    top: 0;
    left: 0;
    padding-top: 20px;
    overflow: scroll;
}

#search-result .item {
    height: 80px;
    background-color: #fff;
    border-radius: 6px;
    margin-bottom: 10px;
    color: @maincolor;
}

.date-and-week {
    padding-top: 10px;
    height: 60px;
    width: 60px;
    text-align: center;
}

.date-and-week .date {
    font-size: 40px;
    line-height: 40px;
    margin-bottom: 0;
}

.content {
    padding-top: 14px;
}

.content p {
    margin-bottom: 0;
}

.content .create_time {
    font-size: 10px;
}

.content .description {
    font-size: 10px;
}

.state {
    padding-right: 10px;
    padding-top: 14px;
}

.state i {
    margin: 0 2px;
}

.state p {
    text-align: right;
    font-size: 20px;
}

#setting-div {
    height: 60px;
    width: 100vw;
    background-color: @maincolor;
    position: fixed;
    bottom: 0;
    display: none;
    color: #fff;
    line-height: 60px;
}

#setting-div .iconfont {
    text-align: center;
    font-size: 30px;
    width: 32%;
    display: inline-block;
}

#setting-mask {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100vw;
    background-color: rgba(0, 0, 0, .5);
    display: none;
}


/*table居中法*/

.table {
    display: table;
    height: 100%;
    pointer-events: none;
    /* This makes sure that we can still click outside of the modal to close it */
}

.table-cell {
    display: table-cell;
    vertical-align: middle;
    pointer-events: none;
}

.modal-content {
    pointer-events: all;
}

input[type="radio"] {
    display: none;
}

.checkbox label {
    opacity: .5;
}

.checkbox label.checked {
    opacity: 1;
}

strong {
    display: inline-block;
    margin-bottom: 5px;
}
</style>
