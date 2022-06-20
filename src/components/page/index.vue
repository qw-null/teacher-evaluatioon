<template>
  <div style="margin-left: 8px;margin-right: 8px">
    <div class="title bevel">2021-2022学年评教活动</div>
    <div
      class="context"
      style="text-align:center;margin-bottom:2%;"
    >—— 客观、公正、真诚地评价教师教学工作是你成熟的表现</div>
    <!--<div class="title2">——客观、公正、真诚地评价教师教学工作是你成熟的表现</div>-->
    <div class="context">
      各位同学好！本学年的教学已接近尾声，学校希望全面了解同学们对任课教师教学情况的感受。希望同学们以客观、公正的态度，根据自己的真实体会，认真填写调研问卷，对各学科任课教师的工作情况给予评价。（如果教师有调整，请对现在的任课教师进行评价。）
    </div>
    <div class="context">
      对每位任课教师的评价，首先是必填项目，包括师德修养、教学内容、作业辅导等，每一方面分为A/B/C/D四个等级，希望同学们认真阅读相关内容，进行评价，表达自己对学科教师的感受！ </div>
    <div class="context">感谢同学们的真诚参与！</div>
    <div
      class="context"
      style="text-align: right"
    >北京市中关村中学课程教学处</div>
    <div
      class="context"
      style="text-align: right"
    >2022年5月</div>
    <div class="line"></div>
    <div style="width: 100%">
      <div class="title2">
        <span style="font-size: 14px;color: #66b1ff;font-weight: bold">{{this.stuName}}</span>同学！请完成下列评价。需要完成<span style="font-size: 14px;color: red;font-weight: bold">{{this.len+1}}</span>条评价，已完成<span style="font-size: 14px;color: red;font-weight: bold">{{this.len1}}</span>条,未完成<span style="font-size: 14px;color: red;font-weight: bold">{{this.len+1-this.len1}}</span>条
      </div>
      <div class="line"></div>
      <alert
        v-model="visible2"
        :title="'你已完成全部评价'"
      >{{'谢谢你的参与!'}}</alert>
      <!--<el-popover-->
      <!--placement="top"-->
      <!--width="160"-->
      <!--v-model="visible2">-->
      <!--<p>这是一段内容这是一段内容确定删除吗？</p>-->
      <!--<div style="text-align: right; margin: 0">-->
      <!--<el-button size="mini" type="text" @click="visible2 = false">取消</el-button>-->
      <!--<el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>-->
      <!--</div>-->
      <!--</el-popover>-->
      <el-table
        :data="nor_teacherList"
        style="width: 80%;margin: 0 auto"
        :default-sort="{prop: 'flag', order: 'descending'}"
      >
        <el-table-column
          prop="teaName"
          label="教师"
          style="width: 25%"
        >
        </el-table-column>
        <el-table-column
          label="科目"
          style="width: 25%"
        >
          <template slot-scope="scope">
            {{scope.row.className}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          style="width: 50%"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              size="small"
              v-if="scope.row.flag===0"
            >点击评价</el-button>
            <el-button
              type="primary"
              size="small"
              style="margin-left: 10px"
              v-if="scope.row.flag===1"
              disabled
            >已评价</el-button>
            <!--<el-button type="primary" size="small" disabled>已评价</el-button>-->
          </template>
        </el-table-column>
        <el-table-column
          prop="flag"
          style="width: 25%"
          sortable
          :sort-method="sortSize"
          v-if="sort"
        >
        </el-table-column>
      </el-table>
      <!--<el-table-->
      <!--:data="tableData"-->
      <!--style="width: 80%;margin: 0 auto">-->
      <!--<el-table-column-->
      <!--style="width: 50%">-->
      <!--<template>-->
      <!--<el-select v-model="value" placeholder="请选择体育老师" style="width: 50%;" size="small">-->
      <!--<el-option-->
      <!--v-for="item in options"-->
      <!--:key="item.value"-->
      <!--:label="item.label"-->
      <!--:value="item.value"-->
      <!--:disabled="item.disabled">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--style="width: 50%">-->
      <!--<template slot-scope="scope">-->
      <!--<el-button @click="handleClick(scope.row)" type="primary" size="small">点击评价</el-button>-->
      <!--&lt;!&ndash;<el-button type="primary" size="small" disabled>已评价</el-button>&ndash;&gt;-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--</el-table>-->
      <div
        style="width: 80%; margin: 20px auto;"
        v-show="flag1"
      >
        <el-row>
          <el-col :span="12">
            <el-select
              v-model="value"
              placeholder="请选择体育老师"
              style="width: 100%;"
              size="small"
              @change="getCode()"
              v-if="flag2"
            >
              <el-option
                v-for="item in pe_teacherList"
                :key="item.teaCode"
                :label="item.teaName"
                :value="item.teaCode+' '+item.classCode"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <div
              v-if="flag3"
              style="width: 100%;margin-left: 10%;font-size: 14px;color: gray"
            >{{this.value}}</div>
          </el-col>
          <el-col :span="8">
            <div
              v-if="flag3"
              style="width: 100%;margin-left: 10%;font-size: 14px;color: gray"
            >{{this.teaClass}}</div>
          </el-col>
          <el-col :span="8">
            <el-button
              @click="gymClick"
              type="primary"
              size="small"
              style="margin-left: 60%"
              v-if="flag1"
            >点击评价</el-button>
            <el-button
              type="primary"
              size="small"
              style="margin-left: 25%"
              v-else="flag1"
              disabled
            >已评价</el-button>
          </el-col>
        </el-row>

        <!--<el-button type="primary"  size="small" style="margin-left: 10px">已评价</el-button>-->
      </div>
    </div>
    <div style="width: 80%;">
      <el-button
        type="primary"
        v-if="worked"
        @click="workedsee=true"
        size="small"
        style="margin-left: 45%;margin-bottom: 30px;margin-top: 30px"
      >已全部评完</el-button>
      <alert
        v-model="workedsee"
        content="休息，休息一下吧！"
      ></alert>
    </div>
    <!--<div style="float: left">-->
    <!--杨明奇-->
    <!--</div>-->
    <div style="float: left">
      <!--<el-button type="primary" size="small" @click="dialogVisible = true">点击评价</el-button>-->
      <el-dialog
        :visible.sync="dialogVisible"
        width="80%"
        v-if="dialogVisible"
      >
        <div style="font-size: 16px;font-weight: bold;margin-bottom: 1%;">你需要完成下列七道题，请滑动手机屏幕填选答案</div>
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
        >
          <el-form-item prop="one_score">
            <div style="margin-bottom: 20px">
              <div>一、师德修养</div>
              <div style="margin-top: 20px">
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.one_score"
                      label="A"
                    >A.教书育人，师德高尚</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.one_score"
                      label="B"
                    >B.有责任心，关爱学生</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.one_score"
                      label="C"
                    >C.有一定的责任心</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.one_score"
                      label="D"
                    >D.工作敷衍，缺少爱心</el-radio>
                  </el-tag>
                </div>
              </div>
            </div>
          </el-form-item>

          <el-form-item prop="two_score">
            <div style="margin-bottom: 20px">
              <div>二、教学内容</div>
              <div style="margin-top: 20px">

                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.two_score"
                      label="A"
                    >A.科学准确，逻辑清晰，重能力培养</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.two_score"
                      label="B"
                    >B.科学正确，有重点，有一定深广度</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.two_score"
                      label="C"
                    >C.重点有时不突出，深广度不足</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.two_score"
                      label="D"
                    >D.讲授不清晰，内容浅，容量小</el-radio>
                  </el-tag>
                </div>

              </div>
            </div>
          </el-form-item>

          <el-form-item prop="three_score">
            <div style="margin-bottom: 20px">
              <div>三、教学方法</div>
              <div style="margin-top: 20px">

                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.three_score"
                      label="A"
                    >A.方法生动多样，关注学生需求</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.three_score"
                      label="B"
                    >B.方法比较灵活，能够激发兴趣</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.three_score"
                      label="C"
                    >C.方法单一，不太灵活</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.three_score"
                      label="D"
                    >D.不关注学生，灌输式教学</el-radio>
                  </el-tag>
                </div>

              </div>
            </div>
          </el-form-item>

          <el-form-item prop="four_score">
            <div style="margin-bottom: 20px">
              <div>四、课堂效果</div>
              <div style="margin-top: 20px">

                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.four_score"
                      label="A"
                    >A.氛围好，学习收获很大</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.four_score"
                      label="B"
                    >B.氛围较好，学习收获较大</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.four_score"
                      label="C"
                    >C.氛围一般，有一定收获</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.four_score"
                      label="D"
                    >D.秩序欠佳，学习收获不大</el-radio>
                  </el-tag>
                </div>

              </div>
            </div>
          </el-form-item>

          <el-form-item prop="five_score">
            <div style="margin-bottom: 20px">
              <div>五、作业练习</div>
              <div style="margin-top: 20px">

                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.five_score"
                      label="A"
                    >A.精心布置，认真批改，有效反馈</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.five_score"
                      label="B"
                    >B.作业适量，及时批改反馈</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.five_score"
                      label="C"
                    >C.作业基本适量，能够批改反馈</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.five_score"
                      label="D"
                    >D.作业不适量、低效，批改不认真</el-radio>
                  </el-tag>
                </div>

              </div>
            </div>
          </el-form-item>

          <el-form-item prop="six_score">
            <div style="margin-bottom: 20px">
              <div>六、答疑辅导</div>
              <div style="margin-top: 20px">

                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.six_score"
                      label="A"
                    >A.认真答疑，辅导针对性强</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.six_score"
                      label="B"
                    >B.经常答疑，辅导有针对性</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.six_score"
                      label="C"
                    >C.能够对学生进行答疑辅导</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.six_score"
                      label="D"
                    >D.很少答疑辅导，缺少耐心</el-radio>
                  </el-tag>
                </div>

              </div>
            </div>
          </el-form-item>

          <el-form-item prop="evaluation">
            <div style="margin-bottom: 20px">
              <div>七、线上教学</div>
              <div style="margin-top: 20px">
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.evaluation"
                      label="A"
                      style="white-space:normal"
                    >A.学习资源丰富，教学方式灵活，作业批改反馈认真，教学效果好</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.evaluation"
                      label="B"
                      style="white-space:normal"
                    >B.学习资源适量，教学方式较灵活，作业批改及时，教学效果较好</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.evaluation"
                      label="C"
                      style="white-space:normal"
                    >C.提供一些学习资源，能够组织线上教学，批改作业，教学效果一般</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.evaluation"
                      label="D"
                      style="white-space:normal"
                    >D.学习资源不足，线上教学组织不松散，作业批改不认真，教学效果欠佳</el-radio>
                  </el-tag>
                </div>

              </div>
            </div>
          </el-form-item>

          <!--          <el-form-item prop="evaluation">-->
          <!--            <div style="margin-bottom: 20px">-->
          <!--              <div>老师我想对您说：</div>-->
          <!--              <div style="margin-top: 20px">-->
          <!--                <el-input-->
          <!--                  type="textarea"-->
          <!--                  :rows="3"-->
          <!--                  placeholder="请输入内容"-->
          <!--                  v-model="form.evaluation">-->
          <!--                </el-input>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </el-form-item>-->

          <div style="width: 100%;">
            <el-button
              type="primary"
              @click="Save('form')"
              style="width: 100%"
            >提交</el-button>

          </div>

        </el-form>
        <!--<span slot="footer" class="dialog-footer">-->
        <!--&lt;!&ndash;<el-button @click="dialogVisible = false" size="small">取 消</el-button>&ndash;&gt;-->
        <!--<el-button type="primary" @click="dialogVisible = false" size="small">提交</el-button>-->
        <!--</span>-->

      </el-dialog>
      <toast
        v-model="toastsee"
        text="提交成功！"
      ></toast>
    </div>
    <div style="float: left">
      <!--<el-button type="primary" size="small" @click="dialogVisible = true">点击评价</el-button>-->
      <el-dialog
        :visible.sync="dialog"
        width="80%"
      >
        <div style="font-size: 16px;font-weight: bold;text-indent: 2em;">你需要完成下列七道题，请滑动手机屏幕填选答案</div>
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
        >
          <el-form-item prop="one_score">
            <div style="margin-bottom: 20px">
              <div>一、师德修养</div>
              <div style="margin-top: 20px">
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.one_score"
                      label="A"
                    >A.教书育人，师德高尚</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.one_score"
                      label="B"
                    >B.有责任心，关爱学生</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.one_score"
                      label="C"
                    >C.有一定的责任心</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.one_score"
                      label="D"
                    >D.工作敷衍，缺少爱心</el-radio>
                  </el-tag>
                </div>
              </div>
            </div>
          </el-form-item>

          <el-form-item prop="two_score">
            <div style="margin-bottom: 20px">
              <div>二、教学内容</div>
              <div style="margin-top: 20px">

                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.two_score"
                      label="A"
                    >A.科学准确，逻辑清晰，重能力培养</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.two_score"
                      label="B"
                    >B.科学正确，有重点，有一定深广度</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.two_score"
                      label="C"
                    >C.重点有时不突出，深广度不足</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.two_score"
                      label="D"
                    >D.讲授不清晰，内容浅，容量小</el-radio>
                  </el-tag>
                </div>

              </div>
            </div>
          </el-form-item>

          <el-form-item prop="three_score">
            <div style="margin-bottom: 20px">
              <div>三、教学方法</div>
              <div style="margin-top: 20px">

                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.three_score"
                      label="A"
                    >A.方法生动多样，关注学生需求</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.three_score"
                      label="B"
                    >B.方法比较灵活，能够激发兴趣</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.three_score"
                      label="C"
                    >C.方法单一，不太灵活</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.three_score"
                      label="D"
                    >D.不关注学生，灌输式教学</el-radio>
                  </el-tag>
                </div>

              </div>
            </div>
          </el-form-item>

          <el-form-item prop="four_score">
            <div style="margin-bottom: 20px">
              <div>四、课堂效果</div>
              <div style="margin-top: 20px">

                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.four_score"
                      label="A"
                    >A.氛围好，学习收获很大</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.four_score"
                      label="B"
                    >B.氛围较好，学习收获较大</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.four_score"
                      label="C"
                    >C.氛围一般，有一定收获</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.four_score"
                      label="D"
                    >D.秩序欠佳，学习收获不大</el-radio>
                  </el-tag>
                </div>

              </div>
            </div>
          </el-form-item>

          <el-form-item prop="five_score">
            <div style="margin-bottom: 20px">
              <div>五、作业练习</div>
              <div style="margin-top: 20px">

                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.five_score"
                      label="A"
                    >A.精心布置，认真批改，有效反馈</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.five_score"
                      label="B"
                    >B.作业适量，及时批改反馈</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.five_score"
                      label="C"
                    >C.作业基本适量，能够批改反馈</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.five_score"
                      label="D"
                    >D.作业不适量、低效，批改不认真</el-radio>
                  </el-tag>
                </div>

              </div>
            </div>
          </el-form-item>

          <el-form-item prop="six_score">
            <div style="margin-bottom: 20px">
              <div>六、答疑辅导</div>
              <div style="margin-top: 20px">

                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.six_score"
                      label="A"
                    >A.认真答疑，辅导针对性强</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.six_score"
                      label="B"
                    >B.经常答疑，辅导有针对性</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.six_score"
                      label="C"
                    >C.能够对学生进行答疑辅导</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.six_score"
                      label="D"
                    >D.很少答疑辅导，缺少耐心</el-radio>
                  </el-tag>
                </div>

              </div>
            </div>
          </el-form-item>

          <el-form-item prop="evaluation">
            <div style="margin-bottom: 20px">
              <div>七、线上教学</div>
              <div style="margin-top: 20px">

                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.evaluation"
                      label="A"
                      style="white-space:normal"
                    >A.学习资源丰富，教学方式灵活，作业批改反馈认真，教学效果好</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.evaluation"
                      label="B"
                      style="white-space:normal"
                    >B.学习资源适量，教学方式较灵活，作业批改及时，教学效果较好</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.evaluation"
                      label="C"
                      style="white-space:normal"
                    >C.提供一些学习资源，能够组织线上教学，批改作业，教学效果一般</el-radio>
                  </el-tag>
                </div>
                <div style="width: 100%">
                  <el-tag style="background-color: white;width: auto">
                    <el-radio
                      v-model="form.evaluation"
                      label="D"
                      style="white-space:normal"
                    >D.学习资源不足，线上教学组织不松散，作业批改不认真，教学效果欠佳</el-radio>
                  </el-tag>
                </div>

              </div>
            </div>
          </el-form-item>

          <!--          <el-form-item prop="evaluation">-->
          <!--            <div style="margin-bottom: 20px">-->
          <!--              <div>老师我想对您说：</div>-->
          <!--              <div style="margin-top: 20px">-->
          <!--                <el-input-->
          <!--                  type="textarea"-->
          <!--                  :rows="3"-->
          <!--                  placeholder="请输入内容"-->
          <!--                  v-model="form.evaluation">-->
          <!--                </el-input>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </el-form-item>-->

          <div style="width: 100%;">
            <el-button
              type="primary"
              @click="Save2('form')"
              size="medium"
              style="width: 100%"
            >提交</el-button>

          </div>

        </el-form>
        <!--<span slot="footer" class="dialog-footer">-->
        <!--&lt;!&ndash;<el-button @click="dialogVisible = false" size="small">取 消</el-button>&ndash;&gt;-->
        <!--<el-button type="primary" @click="dialogVisible = false" size="small">提交</el-button>-->
        <!--</span>-->

      </el-dialog>
      <alert
        v-model="gymShow"
        content="请选择体育老师"
      ></alert>
    </div>

  </div>

</template>

<script>
import VLoading from '../common/loading';
import { Alert, XDialog, Toast } from 'vux';
export default {
  name: "index",
  data () {
    return {
      loading: false,
      dialogVisible: false,
      show: false,
      oldss: false,
      submits: true,
      dialog: false,
      gymShow: false,
      visible2: false,
      stu_code: '',
      tea_code: '',
      class_code: '',
      stuName: '',
      stuLevel: '',
      stuGrade: '',
      stuClass: '',
      flag1: true,
      flag2: true,
      flag3: false,
      flag4: true,
      worked: false,
      toastsee: false,
      workedsee: false,
      validsee: false,
      teaClass: '',
      tea_value1: '',
      tea_value2: '',
      len: '',
      len1: 0,
      len2: 0,
      sort: true,
      // flag1: true,
      // flag2: false,
      // form: {
      //   radio1: '',
      //   radio2: '',
      //   radio3: '',
      //   radio4: '',
      //   radio5: '',
      //   radio6: '',
      //   textarea: '',
      // },
      form: {
        one_score: '',
        two_score: '',
        three_score: '',
        four_score: '',
        five_score: '',
        six_score: '',
        evaluation: ''
      },
      nor_teacherList: [],
      pe_teacherList: [],
      value: '',
      // radio1: '',
      // radio2: '',
      // radio3: '',
      // radio4: '',
      // radio5: '',
      // radio6: '',
      // textarea: '',
      /*rules: {

        radio1: [
          { required: true, message: '第一题选项不能为空', trigger: 'change' }
        ],
        radio2: [
          { required: true, message: '第二题选项不能为空', trigger: 'change' }
        ],
        radio3: [
          { required: true, message: '第三题选项不能为空', trigger: 'change' }
        ],
        radio4: [
          { required: true, message: '第四题选项不能为空', trigger: 'change' }
        ],
        radio5: [
          { required: true, message: '第五题选项不能为空', trigger: 'change' }
        ],
        radio6: [
          { required: true, message: '第六题选项不能为空', trigger: 'change' }
        ],
        textarea: [
          { required: true, message: '请输入你想对老师说的话', trigger: 'blur' }
        ],
      }*/
      rules: {

        one_score: [
          { required: true, message: '第一题选项不能为空', trigger: 'change' }
        ],
        two_score: [
          { required: true, message: '第二题选项不能为空', trigger: 'change' }
        ],
        three_score: [
          { required: true, message: '第三题选项不能为空', trigger: 'change' }
        ],
        four_score: [
          { required: true, message: '第四题选项不能为空', trigger: 'change' }
        ],
        five_score: [
          { required: true, message: '第五题选项不能为空', trigger: 'change' }
        ],
        six_score: [
          { required: true, message: '第六题选项不能为空', trigger: 'change' }
        ],
        // evaluation: [
        //   { required: true, message: '请输入你想对老师说的话', trigger: 'blur' }
        // ],
      }
    }
  },
  components: {

    VLoading,
    Alert,
    XDialog,
    Toast

  },
  mounted () {
    this.stu_code = localStorage.getItem('stuCode');
    this.stuName = localStorage.getItem('stuName');
    this.stuLevel = localStorage.getItem('stuLevel');
    this.stuGrade = localStorage.getItem('stuGrade');
    this.stuClass = localStorage.getItem('stuClass');

    console.log('用户名：' + this.stu_code);
    // this.getTeacher();
    // this.getFlag()
    if (this.stu_code === null) {
      this.$router.push('/login')
    } else {
      this.getTeacher()
    }
    // this.loading=true
    // setTimeout(() => {
    //   this.loading=false
    // }, 1500)

  },
  updated () {
    //每次数据更新时令flag那一列隐藏
    this.sort = false
  },
  methods: {
    handleClick (row) {
      this.dialogVisible = true;
      this.tea_code = row.teaCode;
      this.class_code = row.classCode;
      console.log("教师id" + this.tea_code)

    },
    getCode () {
      console.log("老师id" + this.value)
    },
    gymClick () {
      console.log("体育老师的id" + this.value);

      // 以空格的形式切分value,从而获得教师id和课程号
      var list = this.value.trim().split(' ');
      this.tea_value1 = list[0];
      this.tea_value2 = list[1];
      console.log("切分之后" + this.tea_value1);
      console.log(this.tea_value2)
      if (this.tea_value1 === '') {
        this.gymShow = true;
      } else {
        this.dialog = true;
        console.log("体育老师的id" + this.value);
        this.form.one_score = '';
        this.form.two_score = '';
        this.form.three_score = '';
        this.form.four_score = '';
        this.form.five_score = '';
        this.form.six_score = '';
        this.form.evaluation = '';
      }
    },
    Save (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.dialogVisible=false;
          // var url = 'https://zhongkeruitong.top/taq/insert_evaluation';
          // this.$axios.post(url,this.$qs.stringify({
          //   stu_code: this.stu_code,
          //   tea_code: this.tea_code,
          //
          // })
          //
          // ).then((res) => {
          //   console.log(res)
          // })
          this.$axios({
            // headers: {
            //   'Content-Type': 'application/json'
            // },
            transformRequest: [function (data) {
              data = JSON.stringify(data);
              return data
            }],
            url: 'https://zhongkeruitong.top/taq/insert_evaluation',
            method: 'post',
            params: {
              stu_code: this.stu_code,
              tea_code: this.tea_code,
              class_code: this.class_code,
              data: this.form
            },
            // data:
            //   {
            //   data: this.form},

          }).then((res) => {
            this.dialogVisible = false;
            console.log("体育老师的id" + this.value);
            this.toastsee = true;
            this.getTeacher();
            this.form.one_score = '';
            this.form.two_score = '';
            this.form.three_score = '';
            this.form.four_score = '';
            this.form.five_score = '';
            this.form.six_score = '';
            this.form.evaluation = '';
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    sortSize (a, b) { //按大小排序
      let val1 = a.flag;
      let val2 = b.flag;
      return val2 - val1
    },


    Save2 (formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.dialogVisible=false;
          // var url = 'https://zhongkeruitong.top/taq/insert_evaluation';
          // this.$axios.post(url,this.$qs.stringify({
          //   stu_code: this.stu_code,
          //   tea_code: this.tea_code,
          //
          // })
          //
          // ).then((res) => {
          //   console.log(res)
          // })
          this.$axios({
            // headers: {
            //   'Content-Type': 'application/json'
            // },
            transformRequest: [function (data) {
              data = JSON.stringify(data);
              return data
            }],
            url: 'https://zhongkeruitong.top/taq/insert_evaluation',
            method: 'post',
            params: {
              stu_code: this.stu_code,
              tea_code: this.tea_value1,
              class_code: this.tea_value2,

              data: this.form
            },
            // data:
            //   {
            //   data: this.form},

          }).then((res) => {
            this.dialog = false;
            this.toastsee = true;
            this.getTeacher();
            this.form.one_score = '';
            this.form.two_score = '';
            this.form.three_score = '';
            this.form.four_score = '';
            this.form.five_score = '';
            this.form.six_score = '';
            this.form.evaluation = '';
          })

        } else {
          console.log('error submit!!');
          // this.validsee=true;
          return false;
        }
      });
    },
    // 获得到老师列表
    getTeacher () {
      var url = 'https://zhongkeruitong.top/taq/get_teacher'
      this.$axios.post(url, this.$qs.stringify({
        stu_code: this.stu_code
      })).then((res) => {
        this.nor_teacherList = res.data.normal_data;
        this.len = res.data.normal_data.length;
        this.pe_teacherList = res.data.pe_data;
        // this.flag4 = res.data.pe_data[0].flag
        var x = 0;
        var y = 0;
        var v = 0;
        for (var a = 0; a < this.nor_teacherList.length; a++) {
          if (this.nor_teacherList[a].flag === 1) {
            x = x + 1;
            y = y + 1;
            this.len1 = x;
          }
        }
        for (var i = 0; i < this.pe_teacherList.length; i++) {
          if (this.pe_teacherList[i].flag === 1) {
            this.value = this.pe_teacherList[i].teaName;
            this.teaClass = this.pe_teacherList[i].className;
            this.flag1 = false;
            this.flag2 = false;
            this.flag3 = true;
            this.len1 = x;
            this.len = this.len - 1
            // v=v+1
            // this.show=false
          }
          // console.log('ewfw==='+this.pe_teacherList[i].flag)
        }
        if (y + v - 1 === this.len) {
          this.worked = true;
          this.visible2 = true;
        }



      })
    },
    // getFlag() {
    //   this.getTeacher();
    //   // for (var i =0; i<this.pe_teacherList.length; i++) {
    //   //    console.log('ewfw==='+this.pe_teacherList[i].flag)
    //   // }
    // }
    // handleClose() {
    //   // console.log('radio1: '+this.radio1,
    //   //   'radio2: '+this.radio2,
    //   //   'radio3: '+this.radio3,
    //   //   'radio4: '+this.radio4,
    //   //   'radio5: '+this.radio5,
    //   //   'radio6: '+this.radio6,
    //   //   'textarea: '+this.textarea
    //   // )
    // }
  }
}
</script>

<style scoped>
.title {
  width: 100%;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
  color: deepskyblue;
}
.context {
  margin: 10px;
  text-indent: 2em;
  letter-spacing: 1px;
  /*margin-left: 8px;*/
  /*margin-right: 8px;*/
}
.line {
  width: 100%;
  height: 0;
  border-bottom: #000000 1px dashed;
  margin-top: 20px;
  margin-bottom: 20px;
}
.title2 {
  text-indent: 2em;
  letter-spacing: 1px;
}
</style>
