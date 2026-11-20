/**
 * Short practice sentences per lesson, built from that lesson's words plus earlier vocabulary.
 * Pinyin uses tone numbers in citation form (5 = neutral); 不, 一 and 3+3 sandhi are applied in code.
 * sentences.test.ts cross-checks every syllable against pinyin-pro.
 */
import { SENTENCES3 } from "./sentences3";
import { SENTENCES4 } from "./sentences4";
import { SENTENCES5 } from "./sentences5";
import { SENTENCES6 } from "./sentences6";

export interface Sentence {
  hanzi: string;
  pinyin: string;
  vi: string;
}

type Row = [hanzi: string, pinyin: string, vi: string];
const rows = (list: Row[]): Sentence[] => list.map(([hanzi, pinyin, vi]) => ({ hanzi, pinyin, vi }));

export const SENTENCES: Record<string, Record<number, Sentence[]>> = {
  "1": {
    1: rows([
      ["你好！", "ni3 hao3", "Xin chào!"],
      ["谢谢你！", "xie4 xie5 ni3", "Cảm ơn bạn!"],
      ["老师再见！", "lao3 shi1 zai4 jian4", "Em chào thầy cô ạ!"],
    ]),
    2: rows([
      ["你家有几个人？", "ni3 jia1 you3 ji3 ge4 ren2", "Nhà bạn có mấy người?"],
      ["我有三个朋友。", "wo3 you3 san1 ge4 peng2 you5", "Tôi có ba người bạn."],
      ["这个多少钱？", "zhe4 ge4 duo1 shao5 qian2", "Cái này bao nhiêu tiền?"],
    ]),
    3: rows([
      ["这是我妈妈。", "zhe4 shi4 wo3 ma1 ma5", "Đây là mẹ tôi."],
      ["我爸爸是医生。", "wo3 ba4 ba5 shi4 yi1 sheng1", "Bố tôi là bác sĩ."],
      ["她是我的同学。", "ta1 shi4 wo3 de5 tong2 xue2", "Cô ấy là bạn học của tôi."],
    ]),
    4: rows([
      ["你叫什么名字？", "ni3 jiao4 shen2 me5 ming2 zi5", "Bạn tên là gì?"],
      ["他是谁？", "ta1 shi4 shei2", "Anh ấy là ai?"],
      ["你怎么样？", "ni3 zen3 me5 yang4", "Bạn thế nào?"],
    ]),
    5: rows([
      ["今天星期几？", "jin1 tian1 xing1 qi1 ji3", "Hôm nay thứ mấy?"],
      ["现在几点？", "xian4 zai4 ji3 dian3", "Bây giờ mấy giờ?"],
      ["我明天上午去。", "wo3 ming2 tian1 shang4 wu3 qu4", "Sáng mai tôi đi."],
    ]),
    6: rows([
      ["我想喝茶。", "wo3 xiang3 he1 cha2", "Tôi muốn uống trà."],
      ["你吃米饭吗？", "ni3 chi1 mi3 fan4 ma5", "Bạn ăn cơm không?"],
      ["我喜欢吃苹果。", "wo3 xi3 huan5 chi1 ping2 guo3", "Tôi thích ăn táo."],
    ]),
    7: rows([
      ["我想买一本书。", "wo3 xiang3 mai3 yi1 ben3 shu1", "Tôi muốn mua một quyển sách."],
      ["这个太多了。", "zhe4 ge4 tai4 duo1 le5", "Cái này nhiều quá."],
      ["衣服多少钱？", "yi1 fu5 duo1 shao5 qian2", "Quần áo bao nhiêu tiền?"],
    ]),
    8: rows([
      ["我住在北京。", "wo3 zhu4 zai4 Bei3 jing1", "Tôi sống ở Bắc Kinh."],
      ["学校在医院后面。", "xue2 xiao4 zai4 yi1 yuan4 hou4 mian5", "Trường học ở phía sau bệnh viện."],
      ["我在火车站。", "wo3 zai4 huo3 che1 zhan4", "Tôi đang ở ga tàu."],
    ]),
    9: rows([
      ["我坐飞机去中国。", "wo3 zuo4 fei1 ji1 qu4 Zhong1 guo2", "Tôi đi máy bay sang Trung Quốc."],
      ["你什么时候回来？", "ni3 shen2 me5 shi2 hou5 hui2 lai2", "Khi nào bạn về?"],
      ["我们坐出租车去。", "wo3 men5 zuo4 chu1 zu1 che1 qu4", "Chúng ta đi taxi."],
    ]),
    10: rows([
      ["我会说汉语。", "wo3 hui4 shuo1 Han4 yu3", "Tôi biết nói tiếng Trung."],
      ["你认识这个字吗？", "ni3 ren4 shi5 zhe4 ge4 zi4 ma5", "Bạn có biết chữ này không?"],
      ["我在学习汉语。", "wo3 zai4 xue2 xi2 Han4 yu3", "Tôi đang học tiếng Trung."],
    ]),
    11: rows([
      ["我很高兴。", "wo3 hen3 gao1 xing4", "Tôi rất vui."],
      ["我爱我的家。", "wo3 ai4 wo3 de5 jia1", "Tôi yêu gia đình tôi."],
      ["她很漂亮。", "ta1 hen3 piao4 liang5", "Cô ấy rất đẹp."],
    ]),
    12: rows([
      ["我在工作。", "wo3 zai4 gong1 zuo4", "Tôi đang làm việc."],
      ["我不喜欢看电视。", "wo3 bu4 xi3 huan5 kan4 dian4 shi4", "Tôi không thích xem ti vi."],
      ["我没有电脑。", "wo3 mei2 you3 dian4 nao3", "Tôi không có máy tính."],
    ]),
    13: rows([
      ["今天天气很好。", "jin1 tian1 tian1 qi4 hen3 hao3", "Hôm nay thời tiết rất đẹp."],
      ["明天会下雨吗？", "ming2 tian1 hui4 xia4 yu3 ma5", "Ngày mai có mưa không?"],
      ["你几岁了？", "ni3 ji3 sui4 le5", "Con mấy tuổi rồi?"],
    ]),
  },
  "2": {
    1: rows([
      ["我有一个哥哥。", "wo3 you3 yi1 ge4 ge1 ge5", "Tôi có một người anh trai."],
      ["她的丈夫是医生。", "ta1 de5 zhang4 fu5 shi4 yi1 sheng1", "Chồng cô ấy là bác sĩ."],
      ["大家好！", "da4 jia1 hao3", "Chào mọi người!"],
    ]),
    2: rows([
      ["我每天早上六点起床。", "wo3 mei3 tian1 zao3 shang5 liu4 dian3 qi3 chuang2", "Mỗi sáng tôi dậy lúc sáu giờ."],
      ["今天是我的生日。", "jin1 tian1 shi4 wo3 de5 sheng1 ri4", "Hôm nay là sinh nhật tôi."],
      ["他已经来了。", "ta1 yi3 jing1 lai2 le5", "Anh ấy đã đến rồi."],
    ]),
    3: rows([
      ["这件衣服太贵了。", "zhe4 jian4 yi1 fu5 tai4 gui4 le5", "Bộ quần áo này đắt quá."],
      ["我喜欢红颜色。", "wo3 xi3 huan5 hong2 yan2 se4", "Tôi thích màu đỏ."],
      ["你家远吗？", "ni3 jia1 yuan3 ma5", "Nhà bạn có xa không?"],
    ]),
    4: rows([
      ["今天是晴天。", "jin1 tian1 shi4 qing2 tian1", "Hôm nay trời nắng."],
      ["我生病了。", "wo3 sheng1 bing4 le5", "Tôi bị ốm rồi."],
      ["你累了，休息一下吧。", "ni3 lei4 le5 xiu1 xi5 yi1 xia4 ba5", "Bạn mệt rồi, nghỉ một chút đi."],
    ]),
    5: rows([
      ["服务员，我要一杯咖啡。", "fu2 wu4 yuan2 wo3 yao4 yi1 bei1 ka1 fei1", "Anh phục vụ ơi, cho tôi một cốc cà phê."],
      ["这个鱼很好吃。", "zhe4 ge4 yu2 hen3 hao3 chi1", "Món cá này rất ngon."],
      ["我每天喝牛奶。", "wo3 mei3 tian1 he1 niu2 nai3", "Ngày nào tôi cũng uống sữa."],
    ]),
    6: rows([
      ["一公斤多少钱？", "yi1 gong1 jin1 duo1 shao5 qian2", "Một cân bao nhiêu tiền?"],
      ["这个两百块。", "zhe4 ge4 liang3 bai3 kuai4", "Cái này hai trăm đồng."],
      ["我买两张票。", "wo3 mai3 liang3 zhang1 piao4", "Tôi mua hai vé."],
    ]),
    7: rows([
      ["机场很远。", "ji1 chang3 hen3 yuan3", "Sân bay rất xa."],
      ["我坐公共汽车上班。", "wo3 zuo4 gong1 gong4 qi4 che1 shang4 ban1", "Tôi đi làm bằng xe buýt."],
      ["商店在左边。", "shang1 dian4 zai4 zuo3 bian5", "Cửa hàng ở bên trái."],
    ]),
    8: rows([
      ["我听懂了。", "wo3 ting1 dong3 le5", "Tôi nghe hiểu rồi."],
      ["明天有考试。", "ming2 tian1 you3 kao3 shi4", "Ngày mai có bài thi."],
      ["我介绍一下。", "wo3 jie4 shao4 yi1 xia4", "Để tôi giới thiệu một chút."],
    ]),
    9: rows([
      ["我喜欢跑步。", "wo3 xi3 huan5 pao3 bu4", "Tôi thích chạy bộ."],
      ["你会游泳吗？", "ni3 hui4 you2 yong3 ma5", "Bạn biết bơi không?"],
      ["我们一起去旅游吧。", "wo3 men5 yi1 qi3 qu4 lü3 you2 ba5", "Chúng ta cùng đi du lịch nhé."],
    ]),
    10: rows([
      ["我的手机呢？", "wo3 de5 shou3 ji1 ne5", "Điện thoại của tôi đâu rồi?"],
      ["房间里有电视。", "fang2 jian1 li3 you3 dian4 shi4", "Trong phòng có ti vi."],
      ["请开门。", "qing3 kai1 men2", "Xin hãy mở cửa."],
    ]),
    11: rows([
      ["你几点起床？", "ni3 ji3 dian3 qi3 chuang2", "Mấy giờ bạn dậy?"],
      ["欢迎你来中国！", "huan1 ying2 ni3 lai2 Zhong1 guo2", "Chào mừng bạn đến Trung Quốc!"],
      ["我在找我的手表。", "wo3 zai4 zhao3 wo3 de5 shou3 biao3", "Tôi đang tìm đồng hồ của tôi."],
    ]),
    12: rows([
      ["我觉得很好。", "wo3 jue2 de5 hen3 hao3", "Tôi thấy rất tốt."],
      ["这是什么意思？", "zhe4 shi4 shen2 me5 yi4 si5", "Cái này nghĩa là gì?"],
      ["我不知道。", "wo3 bu4 zhi1 dao4", "Tôi không biết."],
    ]),
    13: rows([
      ["因为下雨，所以我不去了。", "yin1 wei4 xia4 yu3 suo3 yi3 wo3 bu4 qu4 le5", "Vì trời mưa nên tôi không đi nữa."],
      ["他比我高。", "ta1 bi3 wo3 gao1", "Anh ấy cao hơn tôi."],
      ["我也想去。", "wo3 ye3 xiang3 qu4", "Tôi cũng muốn đi."],
    ]),
    14: rows([
      ["您贵姓？", "nin2 gui4 xing4", "Ngài họ gì ạ?"],
      ["别说话！", "bie2 shuo1 hua4", "Đừng nói chuyện!"],
      ["你说得很好。", "ni3 shuo1 de5 hen3 hao3", "Bạn nói rất giỏi."],
    ]),
  },
  "3": SENTENCES3,
  "4": SENTENCES4,
  "5": SENTENCES5,
  "6": SENTENCES6,
};
