import type { Sentence } from "./sentences";

/**
 * Practice sentences for HSK 3, keyed by lesson id. Sentences are AI drafted; pinyin was generated with
 * pinyin-pro (citation tones, 5 = neutral) and still needs a reviewer for polyphonic characters.
 */
type Row = [hanzi: string, pinyin: string, vi: string];
const rows = (list: Row[]): Sentence[] => list.map(([hanzi, pinyin, vi]) => ({ hanzi, pinyin, vi }));

export const SENTENCES3: Record<number, Sentence[]> = {
  1: rows([
    ["我奶奶今年八十岁了。", "wo3 nai3 nai5 jin1 nian2 ba1 shi2 sui4 le5", "Bà nội tôi năm nay tám mươi tuổi rồi."],
    ["我的邻居很年轻。", "wo3 de5 lin2 ju1 hen3 nian2 qing1", "Hàng xóm của tôi rất trẻ."],
    ["叔叔明年要结婚了。", "shu1 shu5 ming2 nian2 yao4 jie2 hun1 le5", "Năm sau chú sẽ kết hôn."],
  ]),
  2: rows([
    ["她的头发很长。", "ta1 de5 tou2 fa5 hen3 chang2", "Tóc của cô ấy rất dài."],
    ["我家有四口人。", "wo3 jia1 you3 si4 kou3 ren2", "Nhà tôi có bốn người."],
    ["你的声音真好听。", "ni3 de5 sheng1 yin1 zhen1 hao3 ting1", "Giọng bạn thật dễ nghe."],
  ]),
  3: rows([
    ["我感冒了，有点儿发烧。", "wo3 gan3 mao4 le5 you3 dian3 r5 fa1 shao1", "Tôi bị cảm rồi, hơi sốt một chút."],
    ["他每天早上都锻炼。", "ta1 mei3 tian1 zao3 shang5 dou1 duan4 lian4", "Sáng nào anh ấy cũng tập thể dục."],
    ["我今天不太舒服。", "wo3 jin1 tian1 bu4 tai4 shu1 fu5", "Hôm nay tôi không được khỏe lắm."],
  ]),
  4: rows([
    ["别担心，我没事。", "bie2 dan1 xin1 wo3 mei2 shi4", "Đừng lo, tôi không sao."],
    ["你为什么生气了？", "ni3 wei4 shen2 me5 sheng1 qi4 le5", "Sao bạn lại giận vậy?"],
    [
      "这个孩子又聪明又可爱。",
      "zhe4 ge5 hai2 zi5 you4 cong1 ming5 you4 ke3 ai4",
      "Đứa bé này vừa thông minh vừa đáng yêu.",
    ],
  ]),
  5: rows([
    ["我早上吃面包。", "wo3 zao3 shang5 chi1 mian4 bao1", "Buổi sáng tôi ăn bánh mì."],
    ["服务员，请给我菜单。", "fu2 wu4 yuan2 qing3 gei3 wo3 cai4 dan1", "Anh phục vụ ơi, cho tôi xem thực đơn."],
    ["这些香蕉很新鲜。", "zhe4 xie1 xiang1 jiao1 hen3 xin1 xian1", "Mấy quả chuối này rất tươi."],
  ]),
  6: rows([
    ["我饿了，我们吃饭吧。", "wo3 e4 le5 wo3 men5 chi1 fan4 ba5", "Tôi đói rồi, chúng ta ăn cơm thôi."],
    ["我吃饱了，谢谢。", "wo3 chi1 bao3 le5 xie4 xie5", "Tôi ăn no rồi, cảm ơn."],
    ["冰箱里有水果。", "bing1 xiang1 li3 you3 shui3 guo3", "Trong tủ lạnh có trái cây."],
  ]),
  7: rows([
    ["我家住在八层。", "wo3 jia1 zhu4 zai4 ba1 ceng2", "Nhà tôi ở tầng tám."],
    ["请把灯关了。", "qing3 ba3 deng1 guan1 le5", "Làm ơn tắt đèn đi."],
    ["房间打扫得很干净。", "fang2 jian1 da3 sao3 de2 hen3 gan1 jing4", "Căn phòng được dọn rất sạch."],
  ]),
  8: rows([
    ["这条裙子很漂亮。", "zhe4 tiao2 qun2 zi5 hen3 piao4 liang5", "Chiếc váy này rất đẹp."],
    ["下雨了，别忘了带伞。", "xia4 yu3 le5 bie2 wang4 le5 dai4 san3", "Trời mưa rồi, đừng quên mang ô."],
    ["我喜欢那件蓝衬衫。", "wo3 xi3 huan5 na4 jian4 lan2 chen4 shan1", "Tôi thích chiếc áo sơ mi xanh kia."],
  ]),
  9: rows([
    ["一共多少钱？", "yi1 gong4 duo1 shao5 qian2", "Tổng cộng bao nhiêu tiền?"],
    ["我想去银行换钱。", "wo3 xiang3 qu4 yin2 hang2 huan4 qian2", "Tôi muốn đi ngân hàng đổi tiền."],
    ["你需要什么？", "ni3 xu1 yao4 shen2 me5", "Bạn cần gì?"],
  ]),
  10: rows([
    ["现在是八点一刻。", "xian4 zai4 shi4 ba1 dian3 yi1 ke4", "Bây giờ là tám giờ mười lăm."],
    ["你等一会儿，我马上来。", "ni3 deng3 yi1 hui4 r5 wo3 ma3 shang4 lai2", "Bạn đợi một lát, tôi đến ngay."],
    ["你最近忙不忙？", "ni3 zui4 jin4 mang2 bu4 mang2", "Dạo này bạn có bận không?"],
  ]),
  11: rows([
    ["你最喜欢哪个季节？", "ni3 zui4 xi3 huan5 na3 ge4 ji4 jie2", "Bạn thích mùa nào nhất?"],
    ["今天外面刮大风。", "jin1 tian1 wai4 mian4 gua1 da4 feng1", "Hôm nay ngoài trời gió to."],
    ["今晚的月亮很漂亮。", "jin1 wan3 de5 yue4 liang5 hen3 piao4 liang5", "Trăng tối nay rất đẹp."],
  ]),
  12: rows([
    [
      "熊猫是我最喜欢的动物。",
      "xiong2 mao1 shi4 wo3 zui4 xi3 huan5 de5 dong4 wu4",
      "Gấu trúc là con vật tôi thích nhất.",
    ],
    ["树上有很多鸟。", "shu4 shang4 you3 hen3 duo1 niao3", "Trên cây có rất nhiều chim."],
    ["这个公园的环境很好。", "zhe4 ge5 gong1 yuan2 de5 huan2 jing4 hen3 hao3", "Môi trường ở công viên này rất tốt."],
  ]),
  13: rows([
    ["这附近有超市吗？", "zhe4 fu4 jin4 you3 chao1 shi4 ma5", "Gần đây có siêu thị không?"],
    ["一直往前走就到了。", "yi1 zhi2 wang3 qian2 zou3 jiu4 dao4 le5", "Cứ đi thẳng về phía trước là tới."],
    ["这个城市很漂亮。", "zhe4 ge5 cheng2 shi4 hen3 piao4 liang5", "Thành phố này rất đẹp."],
  ]),
  14: rows([
    ["我每天坐地铁上班。", "wo3 mei3 tian1 zuo4 di4 tie3 shang4 ban1", "Hằng ngày tôi đi tàu điện ngầm đi làm."],
    ["明天我去机场接你。", "ming2 tian1 wo3 qu4 ji1 chang3 jie1 ni3", "Ngày mai tôi ra sân bay đón bạn."],
    ["路上小心，别迟到。", "lu4 shang5 xiao3 xin1 bie2 chi2 dao4", "Đi đường cẩn thận, đừng đến muộn nhé."],
  ]),
  15: rows([
    ["你上几年级了？", "ni3 shang4 ji3 nian2 ji2 le5", "Bạn học lớp mấy rồi?"],
    ["我在图书馆复习。", "wo3 zai4 tu2 shu1 guan3 fu4 xi2", "Tôi ôn bài ở thư viện."],
    ["他的数学成绩很好。", "ta1 de5 shu4 xue2 cheng2 ji4 hen3 hao3", "Điểm toán của cậu ấy rất tốt."],
  ]),
  16: rows([
    ["她教我说普通话。", "ta1 jiao4 wo3 shuo1 pu3 tong1 hua4", "Cô ấy dạy tôi nói tiếng phổ thông."],
    ["这个句子很简单。", "zhe4 ge5 ju4 zi5 hen3 jian3 dan1", "Câu này rất đơn giản."],
    ["我想提高汉语水平。", "wo3 xiang3 ti2 gao1 han4 yu3 shui3 ping2", "Tôi muốn nâng cao trình độ tiếng Trung."],
  ]),
  17: rows([
    ["经理在办公室等你。", "jing1 li3 zai4 ban4 gong1 shi4 deng3 ni3", "Giám đốc đang đợi bạn ở văn phòng."],
    ["会议几点结束？", "hui4 yi4 ji3 dian3 jie2 shu4", "Cuộc họp mấy giờ kết thúc?"],
    ["我们一起想办法吧。", "wo3 men5 yi1 qi3 xiang3 ban4 fa3 ba5", "Chúng ta cùng nghĩ cách nhé."],
  ]),
  18: rows([
    ["你有什么爱好？", "ni3 you3 shen2 me5 ai4 hao4", "Bạn có sở thích gì?"],
    ["我对音乐很有兴趣。", "wo3 dui4 yin1 yue4 hen3 you3 xing4 qu4", "Tôi rất có hứng thú với âm nhạc."],
    ["妈妈给我讲故事。", "ma1 ma5 gei3 wo3 jiang3 gu4 shi5", "Mẹ kể chuyện cho tôi nghe."],
  ]),
  19: rows([
    ["祝你生日快乐！", "zhu4 ni3 sheng1 ri4 kuai4 le4", "Chúc bạn sinh nhật vui vẻ!"],
    ["我想参加这次比赛。", "wo3 xiang3 can1 jia1 zhe4 ci4 bi3 sai4", "Tôi muốn tham gia cuộc thi lần này."],
    ["这是送给你的礼物。", "zhe4 shi4 song4 gei3 ni3 de5 li3 wu4", "Đây là quà tặng bạn."],
  ]),
  20: rows([
    ["我们明天见面吧。", "wo3 men5 ming2 tian1 jian4 mian4 ba5", "Ngày mai chúng ta gặp nhau nhé."],
    ["谢谢你照顾我。", "xie4 xie5 ni3 zhao4 gu5 wo3", "Cảm ơn bạn đã chăm sóc tôi."],
    ["他们俩关系很好。", "ta1 men5 lia3 guan1 xi5 hen3 hao3", "Hai người họ có quan hệ rất tốt."],
  ]),
  21: rows([
    ["你周末打算做什么？", "ni3 zhou1 mo4 da3 suan4 zuo4 shen2 me5", "Cuối tuần bạn định làm gì?"],
    ["我忘记他的名字了。", "wo3 wang4 ji4 ta1 de5 ming2 zi5 le5", "Tôi quên tên anh ấy rồi."],
    ["我相信你能做好。", "wo3 xiang1 xin4 ni3 neng2 zuo4 hao3", "Tôi tin bạn có thể làm tốt."],
  ]),
  22: rows([
    ["这里的变化真大。", "zhe4 li3 de5 bian4 hua4 zhen1 da4", "Ở đây thay đổi thật nhiều."],
    ["我已经习惯这里了。", "wo3 yi3 jing1 xi2 guan4 zhe4 li3 le5", "Tôi đã quen với nơi này rồi."],
    ["这是一个好机会。", "zhe4 shi4 yi1 ge4 hao3 ji1 hui4", "Đây là một cơ hội tốt."],
  ]),
  23: rows([
    ["汉语难不难？", "han4 yu3 nan2 bu4 nan2", "Tiếng Trung có khó không?"],
    ["住在这里很方便。", "zhu4 zai4 zhe4 li3 hen3 fang1 bian4", "Sống ở đây rất tiện."],
    ["你长得很像你妈妈。", "ni3 chang2 de2 hen3 xiang4 ni3 ma1 ma5", "Bạn trông rất giống mẹ bạn."],
  ]),
  24: rows([
    ["我买了一双新鞋。", "wo3 mai3 le5 yi1 shuang1 xin1 xie2", "Tôi đã mua một đôi giày mới."],
    ["门口有一辆车。", "men2 kou3 you3 yi1 liang4 che1", "Ở cửa có một chiếc xe."],
    ["她家有两只小狗。", "ta1 jia1 you3 liang3 zhi1 xiao3 gou3", "Nhà cô ấy có hai con chó con."],
  ]),
  25: rows([
    ["我想跟你一起去。", "wo3 xiang3 gen1 ni3 yi1 qi3 qu4", "Tôi muốn đi cùng bạn."],
    [
      "如果明天下雨，我就不去了。",
      "ru2 guo3 ming2 tian1 xia4 yu3 wo3 jiu4 bu4 qu4 le5",
      "Nếu mai trời mưa thì tôi không đi nữa.",
    ],
    [
      "我的手机被弟弟拿走了。",
      "wo3 de5 shou3 ji1 bei4 di4 di5 na2 zou3 le5",
      "Điện thoại của tôi bị em trai lấy đi rồi.",
    ],
  ]),
  26: rows([
    ["他经常去公园跑步。", "ta1 jing1 chang2 qu4 gong1 yuan2 pao3 bu4", "Anh ấy thường ra công viên chạy bộ."],
    ["今天比较冷。", "jin1 tian1 bi3 jiao4 leng3", "Hôm nay khá lạnh."],
    ["这个菜好吃极了！", "zhe4 ge5 cai4 hao3 chi1 ji2 le5", "Món này ngon cực kỳ!"],
  ]),
  27: rows([
    ["我们终于到了！", "wo3 men5 zhong1 yu2 dao4 le5", "Cuối cùng chúng ta cũng tới nơi rồi!"],
    ["你应该早点儿睡觉。", "ni3 ying1 gai1 zao3 dian3 er2 shui4 jiao4", "Bạn nên đi ngủ sớm một chút."],
    ["他一边吃饭一边看书。", "ta1 yi1 bian1 chi1 fan4 yi1 bian1 kan4 shu1", "Anh ấy vừa ăn cơm vừa đọc sách."],
  ]),
};
