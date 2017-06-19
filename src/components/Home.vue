<template>
    <div class="home">
        <modal name="hello-world" :width="300" :height="200">
            <div class="pop-up-box clearfix">
                <span>文件夹类型</span>
                <div class="checkbox">
                    <label :class="{'checked': newFolderType==='diary'}" name="diary" for="diary">
                        <i class="iconfont icon-book"></i>日记本
                        <input id="diary" v-model="newFolderType" type="radio" value="diary">
                    </label>
                    <label :class="{'checked': newFolderType==='list'}" name="list" for="list">
                        <i class="iconfont icon-alert"></i>待办事项
                        <input id="list" v-model="newFolderType" type="radio" value="list">
                    </label>
                    <label :class="{'checked':newFolderType==='contact' }" name="address" for="contact">
                        <i class="iconfont icon-contact"></i>电话本
                        <input id="contact" v-model="newFolderType" type="radio" value="contact">
                    </label>
                </div>
                <span>文件夹名称</span>
                <input type="text" v-model="newFolderName" class="foldername">
                <button class="confirm" @click="newFolder">确定</button>
            </div>
        </modal>
    
        <header>
            <img src="http://tva1.sinaimg.cn/crop.316.53.496.496.180/686d7361jw1f3q2lpig4cj20vk0hswn3.jpg" alt="avatar" class="img-circle">
            <div class="name">
                <div class="nickname" @click="show">{{nickname}}</div>
                <div class="realname">{{realname}}</div>
            </div>
        </header>
        <div id="main">
            <div v-for="item in testdata" class="item" :data-folderid="item._id" :data-type="item.type" @click="jump">
                <i class="iconfont" :class="transferToIcon(item.type)"></i>
                <span>{{item.foldername}}</span>
                <div class="total">
                    <span>30</span>
                    <i class="iconfont icon-next"></i>
                </div>
            </div>
        </div>
        <div id="search-result" class="container">
        </div>
        <footer>
            <div class="inputdiv">
                <icon name="search" class="search" scale="1.5"></icon>
                <input type="text" name="search" id="search" />
            </div>
            <icon name="cog" class="cog" scale="1.5"></icon>
        </footer>
        <div id="setting-div">
            <i class="iconfont icon-tianjia" id="new" data-toggle="modal" data-poptarget="newfolder"></i>
            <i class="iconfont icon-zhuti" id="theme" onclick="changeTheme()"></i>
            <i class="iconfont icon-about" id="about" onClick="location='about.html'"></i>
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
            newFolderType:'diary',
            newFolderName:'',
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
            if (event.currentTarget.dataset.type === 'phonebook')
                this.$router.push('/phonebook');
            if (event.currentTarget.dataset.type === 'todolist')
                this.$router.push('/todilist');
        },
        newFolder(){
            alert(this.newFolderType)
        }
    }
}
</script>

<style lang="less" scoped>
@import './common.less';
@import '//at.alicdn.com/t/font_h8pyt35bn8xmkj4i.css';
@headerheight: 6rem;
@black: #3c3c3c;
.box() {
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
    .nickname{
        font-size: 1.2rem;
    }
    img {
        .box();
        height: 100%;
    }
    .name {
        .box();
    }
}

.pop-up-box {
    color: @maincolor;
    box-sizing: border-box;
    padding: 30px 10px;
    text-align: center;
    .checkbox {
        margin: 10px 0;
        display: flex;
        justify-content: Space-around;
        label {
            opacity: .5;
            .iconfont {
                padding-right: 10px;
            }
            input[type="radio"] {
                display: none;
            }
        }
        .checked {
            opacity: 1;
        }
    }
    .foldername {
        border: 1px @maincolor solid;
        border-radius: 5px;
        line-height: 1.5rem;
        outline: none;
        padding: 0 10px;
        margin: 10px 0;
    }
    .confirm {
        border: 1px @maincolor solid;
        border-radius: 5px;
        margin: 10px 0;
        padding: 5px 15px;
        background-color: #fff;
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
        .iconfont {
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
</style>
