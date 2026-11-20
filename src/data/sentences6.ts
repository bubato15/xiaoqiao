import type { Sentence } from "./sentences";

/**
 * Practice sentences for HSK 6, keyed by lesson id. Sentences are AI drafted; pinyin was generated with
 * pinyin-pro (citation tones, 5 = neutral) and still needs a reviewer for polyphonic characters.
 */
type Row = [hanzi: string, pinyin: string, vi: string];
const rows = (list: Row[]): Sentence[] => list.map(([hanzi, pinyin, vi]) => ({ hanzi, pinyin, vi }));

export const SENTENCES6: Record<number, Sentence[]> = {
  1: rows([
    ["伯母，您身体还好吗？", "bo2 mu3 nin2 shen1 ti3 hai2 hao3 ma5", "Bác gái ơi, bác vẫn khỏe chứ ạ?"],
    [
      "这孩子将来一定有出息。",
      "zhe4 hai2 zi5 jiang1 lai2 yi1 ding4 you3 chu1 xi5",
      "Đứa bé này sau này nhất định có tiền đồ.",
    ],
    ["大伙儿一起吃饭吧！", "da4 huo3 r5 yi1 qi3 chi1 fan4 ba5", "Mọi người cùng ăn cơm nào!"],
  ]),
  2: rows([
    [
      "这对老夫妇每天一起散步。",
      "zhe4 dui4 lao3 fu1 fu4 mei3 tian1 yi1 qi3 san4 bu4",
      "Đôi vợ chồng già này ngày nào cũng đi dạo cùng nhau.",
    ],
    [
      "周末我和丈夫去看公婆。",
      "zhou1 mo4 wo3 he2 zhang4 fu5 qu4 kan4 gong1 po2",
      "Cuối tuần tôi và chồng đi thăm bố mẹ chồng.",
    ],
    [
      "我已经很久没有回故乡了。",
      "wo3 yi3 jing1 hen3 jiu3 mei2 you3 hui2 gu4 xiang1 le5",
      "Đã lâu lắm rồi tôi không về quê.",
    ],
  ]),
  3: rows([
    [
      "春节的时候，我们全家团圆。",
      "chun1 jie2 de5 shi2 hou5 wo3 men5 quan2 jia1 tuan2 yuan2",
      "Dịp Tết, cả nhà tôi đoàn tụ.",
    ],
    ["我嫂子做饭特别好吃。", "wo3 sao3 zi5 zuo4 fan4 te4 bie2 hao3 chi1", "Chị dâu tôi nấu ăn cực ngon."],
    ["她们是一对双胞胎。", "ta1 men5 shi4 yi1 dui4 shuang1 bao1 tai1", "Họ là một cặp sinh đôi."],
  ]),
  4: rows([
    [
      "不要只看一个人的外表。",
      "bu4 yao4 zhi1 kan4 yi1 ge4 ren2 de5 wai4 biao3",
      "Đừng chỉ nhìn bề ngoài của một người.",
    ],
    [
      "他说话很斯文，很有礼貌。",
      "ta1 shuo1 hua4 hen3 si1 wen2 hen3 you3 li3 mao4",
      "Anh ấy nói năng nho nhã, rất lễ phép.",
    ],
    ["他的神情有点紧张。", "ta1 de5 shen2 qing2 you3 dian3 jin3 zhang1", "Nét mặt anh ấy hơi căng thẳng."],
  ]),
  5: rows([
    [
      "新郎和新娘看起来非常幸福。",
      "xin1 lang2 he2 xin1 niang2 kan4 qi3 lai5 fei1 chang2 xing4 fu2",
      "Chú rể và cô dâu trông rất hạnh phúc.",
    ],
    ["奶奶一直在家照料婴儿。", "nai3 nai5 yi1 zhi2 zai4 jia1 zhao4 liao4 ying1 er2", "Bà luôn ở nhà chăm sóc em bé."],
    [
      "过年的时候要去看望长辈。",
      "guo4 nian2 de5 shi2 hou5 yao4 qu4 kan4 wang4 zhang3 bei4",
      "Dịp Tết phải đi thăm người lớn trong nhà.",
    ],
  ]),
  6: rows([
    [
      "你脸色苍白，是不是不舒服？",
      "ni3 lian3 se4 cang1 bai2 shi4 bu4 shi4 bu4 shu1 fu5",
      "Mặt bạn tái nhợt, có phải không khỏe không?",
    ],
    ["这种药的副作用很小。", "zhe4 zhong3 yao4 de5 fu4 zuo4 yong4 hen3 xiao3", "Thuốc này có tác dụng phụ rất nhỏ."],
    [
      "一路上要多保重身体。",
      "yi1 lu4 shang5 yao4 duo1 bao3 zhong4 shen1 ti3",
      "Trên đường đi nhớ giữ gìn sức khỏe nhé.",
    ],
  ]),
  7: rows([
    ["跑完步，我累得直喘气。", "pao3 wan2 bu4 wo3 lei4 de2 zhi2 chuan3 qi4", "Chạy xong, tôi mệt đến thở hồng hộc."],
    [
      "外面太冷了，冻得我直哆嗦。",
      "wai4 mian4 tai4 leng3 le5 dong4 de2 wo3 zhi2 duo1 suo5",
      "Ngoài trời lạnh quá, tôi run lẩy bẩy.",
    ],
    ["鸡蛋里有很多蛋白质。", "ji1 dan4 li3 you3 hen3 duo1 dan4 bai2 zhi4", "Trong trứng gà có nhiều chất đạm."],
  ]),
  8: rows([
    [
      "他吃坏了肚子，一直腹泻。",
      "ta1 chi1 huai4 le5 du4 zi5 yi1 zhi2 fu4 xie4",
      "Anh ấy ăn phải đồ hỏng nên bị tiêu chảy suốt.",
    ],
    [
      "医生让我先去化验一下血。",
      "yi1 sheng1 rang4 wo3 xian1 qu4 hua4 yan4 yi1 xia4 xue4",
      "Bác sĩ bảo tôi đi xét nghiệm máu trước.",
    ],
    [
      "伤口要用酒精消毒，以免感染。",
      "shang1 kou3 yao4 yong4 jiu3 jing1 xiao1 du2 yi3 mian3 gan3 ran3",
      "Vết thương phải sát trùng bằng cồn để tránh nhiễm trùng.",
    ],
  ]),
  9: rows([
    ["我感冒了，喉咙特别疼。", "wo3 gan3 mao4 le5 hou2 long2 te4 bie2 teng2", "Tôi bị cảm, cổ họng đau lắm."],
    ["跑完步以后浑身都是汗。", "pao3 wan2 bu4 yi3 hou4 hun2 shen1 dou1 shi4 han4", "Chạy bộ xong cả người đầy mồ hôi."],
    [
      "长时间看手机对颈椎不好。",
      "chang2 shi2 jian1 kan4 shou3 ji1 dui4 jing3 zhui1 bu4 hao3",
      "Xem điện thoại lâu không tốt cho đốt sống cổ.",
    ],
  ]),
  10: rows([
    ["她眯起眼睛看远处。", "ta1 mi1 qi3 yan3 jing5 kan4 yuan3 chu4", "Cô ấy nheo mắt nhìn ra xa."],
    ["小狗一直在舔我的手。", "xiao3 gou3 yi1 zhi2 zai4 tian3 wo3 de5 shou3", "Chú chó con cứ liếm tay tôi."],
    [
      "多吃胡萝卜对视力有好处。",
      "duo1 chi1 hu2 luo2 bo5 dui4 shi4 li4 you3 hao3 chu5",
      "Ăn nhiều cà rốt tốt cho thị lực.",
    ],
  ]),
  11: rows([
    ["你今天气色不错啊。", "ni3 jin1 tian1 qi4 se4 bu4 cuo4 a5", "Hôm nay sắc mặt bạn tốt đấy."],
    ["他吃完饭就开始呕吐。", "ta1 chi1 wan2 fan4 jiu4 kai1 shi3 ou3 tu4", "Ăn cơm xong anh ấy bắt đầu nôn."],
    ["医生正在抢救病人。", "yi1 sheng1 zheng4 zai4 qiang3 jiu4 bing4 ren2", "Bác sĩ đang cấp cứu bệnh nhân."],
  ]),
  12: rows([
    ["我爬山以后膝盖有点疼。", "wo3 pa2 shan1 yi3 hou4 xi1 gai4 you3 dian3 teng2", "Leo núi xong đầu gối tôi hơi đau."],
    [
      "天气太干，我的嘴唇裂了。",
      "tian1 qi4 tai4 gan1 wo3 de5 zui3 chun2 lie4 le5",
      "Trời khô quá, môi tôi bị nứt rồi.",
    ],
    [
      "她笑的时候眼角有几条皱纹。",
      "ta1 xiao4 de5 shi2 hou5 yan3 jiao3 you3 ji3 tiao2 zhou4 wen2",
      "Khi cô ấy cười khóe mắt có vài nếp nhăn.",
    ],
  ]),
  13: rows([
    [
      "医生说我的血压有点高。",
      "yi1 sheng1 shuo1 wo3 de5 xue4 ya1 you3 dian3 gao1",
      "Bác sĩ nói huyết áp của tôi hơi cao.",
    ],
    [
      "伤口要先消毒，不然会有细菌。",
      "shang1 kou3 yao4 xian1 xiao1 du2 bu4 ran2 hui4 you3 xi4 jun1",
      "Vết thương phải khử trùng trước, nếu không sẽ có vi khuẩn.",
    ],
    [
      "出院以后你要在家好好休养。",
      "chu1 yuan4 yi3 hou4 ni3 yao4 zai4 jia1 hao3 hao3 xiu1 yang3",
      "Ra viện rồi bạn phải ở nhà nghỉ ngơi cho tốt.",
    ],
  ]),
  14: rows([
    ["他这样做太卑鄙了。", "ta1 zhe4 yang4 zuo4 tai4 bei1 bi3 le5", "Anh ta làm vậy thật quá hèn hạ."],
    ["别对小动物这么残忍。", "bie2 dui4 xiao3 dong4 wu4 zhe4 me5 can2 ren3", "Đừng tàn nhẫn với động vật nhỏ như vậy."],
    ["现实有时候很残酷。", "xian4 shi2 you3 shi2 hou5 hen3 can2 ku4", "Hiện thực đôi khi rất tàn khốc."],
  ]),
  15: rows([
    ["奶奶的笑容很慈祥。", "nai3 nai5 de5 xiao4 rong2 hen3 ci2 xiang2", "Nụ cười của bà rất hiền từ."],
    [
      "他说话很风趣，大家都喜欢他。",
      "ta1 shuo1 hua4 hen3 feng1 qu4 da4 jia1 dou1 xi3 huan5 ta1",
      "Anh ấy nói chuyện rất dí dỏm, ai cũng thích anh ấy.",
    ],
    ["考试的时候千万别大意。", "kao3 shi4 de5 shi2 hou5 qian1 wan4 bie2 da4 yi5", "Lúc thi tuyệt đối đừng sơ ý."],
  ]),
  16: rows([
    [
      "别总是抱怨，想想办法吧。",
      "bie2 zong3 shi4 bao4 yuan4 xiang3 xiang3 ban4 fa3 ba5",
      "Đừng than phiền mãi, nghĩ cách đi.",
    ],
    ["工作太多，我快崩溃了。", "gong1 zuo4 tai4 duo1 wo3 kuai4 beng1 kui4 le5", "Việc nhiều quá, tôi sắp suy sụp rồi."],
    [
      "有话就说出来，别憋在心里。",
      "you3 hua4 jiu4 shuo1 chu1 lai2 bie2 bie1 zai4 xin1 li3",
      "Có gì thì nói ra, đừng nén trong lòng.",
    ],
  ]),
  17: rows([
    [
      "你怎么一个人在这儿发呆？",
      "ni3 zen3 me5 yi1 ge4 ren2 zai4 zhe4 er2 fa1 dai1",
      "Sao bạn ngồi ngẩn người một mình ở đây?",
    ],
    ["遇到问题别太冲动。", "yu4 dao4 wen4 ti2 bie2 tai4 chong1 dong4", "Gặp vấn đề đừng quá bốc đồng."],
    [
      "这么晚才回来，太不像话了！",
      "zhe4 me5 wan3 cai2 hui2 lai2 tai4 bu4 xiang4 hua4 le5",
      "Muộn thế này mới về, thật quá đáng!",
    ],
  ]),
  18: rows([
    [
      "叫错了他的名字，我觉得很尴尬。",
      "jiao4 cuo4 le5 ta1 de5 ming2 zi5 wo3 jue2 de5 hen3 gan1 ga4",
      "Gọi nhầm tên anh ấy, tôi thấy rất ngượng.",
    ],
    [
      "考试没考好，他有点儿沮丧。",
      "kao3 shi4 mei2 kao3 hao3 ta1 you3 dian3 r5 ju3 sang4",
      "Thi không tốt nên cậu ấy hơi chán nản.",
    ],
    [
      "一个人在国外有时候很孤独。",
      "yi1 ge4 ren2 zai4 guo2 wai4 you3 shi2 hou5 hen3 gu1 du2",
      "Một mình ở nước ngoài đôi khi rất cô đơn.",
    ],
  ]),
  19: rows([
    ["我很乐意帮你这个忙。", "wo3 hen3 le4 yi4 bang1 ni3 zhe4 ge5 mang2", "Tôi rất sẵn lòng giúp bạn việc này."],
    ["这场比赛看得真过瘾！", "zhe4 chang3 bi3 sai4 kan4 de2 zhen1 guo4 yin3", "Trận đấu này xem đã thật!"],
    ["我恨不得马上飞回家。", "wo3 hen4 bu5 de5 ma3 shang4 fei1 hui2 jia1", "Tôi chỉ mong được bay về nhà ngay."],
  ]),
  20: rows([
    ["我们的老师非常和蔼。", "wo3 men5 de5 lao3 shi1 fei1 chang2 he2 ai3", "Thầy giáo của chúng tôi rất hiền hòa."],
    [
      "这里的人很好客，也很热情。",
      "zhe4 li3 de5 ren2 hen3 hao4 ke4 ye3 hen3 re4 qing2",
      "Người ở đây rất hiếu khách và cũng rất nhiệt tình.",
    ],
    [
      "她性格开朗，大家都喜欢她。",
      "ta1 xing4 ge2 kai1 lang3 da4 jia1 dou1 xi3 huan5 ta1",
      "Cô ấy tính tình cởi mở, ai cũng quý.",
    ],
  ]),
  21: rows([
    [
      "我爸爸很固执，谁的话都不听。",
      "wo3 ba4 ba5 hen3 gu4 zhi2 shui2 de5 hua4 dou1 bu4 ting1",
      "Bố tôi rất cố chấp, chẳng nghe lời ai cả.",
    ],
    [
      "妈妈总是唠叨我早点儿睡觉。",
      "ma1 ma5 zong3 shi4 lao2 dao5 wo3 zao3 dian3 er2 shui4 jiao4",
      "Mẹ lúc nào cũng cằn nhằn bảo tôi đi ngủ sớm.",
    ],
    [
      "别拘束，就像在自己家一样。",
      "bie2 ju1 shu4 jiu4 xiang4 zai4 zi4 ji3 jia1 yi1 yang4",
      "Đừng ngại, cứ tự nhiên như ở nhà mình.",
    ],
  ]),
  22: rows([
    [
      "他做事很踏实，大家都信任他。",
      "ta1 zuo4 shi4 hen3 ta1 shi5 da4 jia1 dou1 xin4 ren4 ta1",
      "Anh ấy làm việc rất chắc chắn, mọi người đều tin anh ấy.",
    ],
    ["爷爷奶奶过日子很勤俭。", "ye2 ye5 nai3 nai5 guo4 ri4 zi5 hen3 qin2 jian3", "Ông bà sống rất cần kiệm."],
    [
      "这个年轻人很有上进心。",
      "zhe4 ge5 nian2 qing1 ren2 hen3 you3 shang4 jin4 xin1",
      "Chàng trai này rất có chí cầu tiến.",
    ],
  ]),
  23: rows([
    [
      "这个孩子太淘气了，总是不听话。",
      "zhe4 ge5 hai2 zi5 tai4 tao2 qi4 le5 zong3 shi4 bu4 ting1 hua4",
      "Đứa trẻ này nghịch quá, lúc nào cũng không nghe lời.",
    ],
    ["他对吃的东西很挑剔。", "ta1 dui4 chi1 de5 dong1 xi5 hen3 tiao1 ti5", "Anh ấy rất kén ăn."],
    [
      "这件事很重要，你要慎重考虑。",
      "zhe4 jian4 shi4 hen3 zhong4 yao4 ni3 yao4 shen4 zhong4 kao3 lü4",
      "Việc này rất quan trọng, bạn phải cân nhắc thận trọng.",
    ],
  ]),
  24: rows([
    ["红烧鱼是我妈妈的拿手菜。", "hong2 shao1 yu2 shi4 wo3 ma1 ma5 de5 na2 shou3 cai4", "Cá kho là món tủ của mẹ tôi."],
    [
      "你有什么特长或者爱好吗？",
      "ni3 you3 shen2 me5 te4 chang2 huo4 zhe3 ai4 hao4 ma5",
      "Bạn có sở trường hay sở thích gì không?",
    ],
    ["这个年轻人很有潜力。", "zhe4 ge5 nian2 qing1 ren2 hen3 you3 qian2 li4", "Người trẻ này rất có tiềm năng."],
  ]),
  25: rows([
    [
      "这件事真让人伤脑筋。",
      "zhe4 jian4 shi4 zhen1 rang4 ren2 shang1 nao3 jin1",
      "Việc này thật khiến người ta đau đầu.",
    ],
    ["我很思念远方的家人。", "wo3 hen3 si1 nian4 yuan3 fang1 de5 jia1 ren2", "Tôi rất nhớ gia đình ở phương xa."],
    [
      "他这么晚还没来，我有点纳闷儿。",
      "ta1 zhe4 me5 wan3 hai2 mei2 lai2 wo3 you3 dian3 na4 men4 r5",
      "Muộn thế này anh ấy vẫn chưa đến, tôi hơi thắc mắc.",
    ],
  ]),
  26: rows([
    [
      "听到这个消息，大家都很震惊。",
      "ting1 dao4 zhe4 ge5 xiao1 xi5 da4 jia1 dou1 hen3 zhen4 jing1",
      "Nghe tin này, mọi người đều rất sửng sốt.",
    ],
    [
      "别泄气，下次一定会更好。",
      "bie2 xie4 qi4 xia4 ci4 yi1 ding4 hui4 geng4 hao3",
      "Đừng nản lòng, lần sau nhất định sẽ tốt hơn.",
    ],
    [
      "我不想让你为难，你慢慢考虑吧。",
      "wo3 bu4 xiang3 rang4 ni3 wei2 nan2 ni3 man4 man4 kao3 lü4 ba5",
      "Tôi không muốn làm bạn khó xử, bạn cứ từ từ suy nghĩ.",
    ],
  ]),
  27: rows([
    [
      "遇到问题要先镇定下来。",
      "yu4 dao4 wen4 ti2 yao4 xian1 zhen4 ding4 xia4 lai2",
      "Gặp vấn đề thì trước hết phải bình tĩnh lại.",
    ],
    [
      "别人说什么，我一点也不在乎。",
      "bie2 ren5 shuo1 shen2 me5 wo3 yi1 dian3 ye3 bu4 zai4 hu5",
      "Người khác nói gì, tôi chẳng để ý chút nào.",
    ],
    ["他玩游戏玩得着迷了。", "ta1 wan2 you2 xi4 wan2 de2 zhao2 mi2 le5", "Cậu ấy chơi game đến mê mẩn rồi."],
  ]),
  28: rows([
    [
      "她性格温和，说话很文雅。",
      "ta1 xing4 ge2 wen1 he2 shuo1 hua4 hen3 wen2 ya3",
      "Cô ấy tính tình ôn hòa, nói năng rất nho nhã.",
    ],
    [
      "我们要勇于承认自己的错误。",
      "wo3 men5 yao4 yong3 yu2 cheng2 ren4 zi4 ji3 de5 cuo4 wu4",
      "Chúng ta phải dám thừa nhận lỗi của mình.",
    ],
    [
      "别开玩笑了，说点正经的。",
      "bie2 kai1 wan2 xiao4 le5 shuo1 dian3 zheng4 jing1 de5",
      "Đừng đùa nữa, nói chuyện nghiêm túc đi.",
    ],
  ]),
  29: rows([
    [
      "你都这么大了，别这么幼稚。",
      "ni3 dou1 zhe4 me5 da4 le5 bie2 zhe4 me5 you4 zhi4",
      "Bạn lớn thế này rồi, đừng trẻ con như vậy.",
    ],
    ["我最讨厌虚伪的人。", "wo3 zui4 tao3 yan4 xu1 wei3 de5 ren2", "Tôi ghét nhất là người giả dối."],
    [
      "爸爸对我们一向很严厉。",
      "ba4 ba5 dui4 wo3 men5 yi1 xiang4 hen3 yan2 li4",
      "Bố xưa nay luôn nghiêm khắc với chúng tôi.",
    ],
  ]),
  30: rows([
    [
      "学好外语需要很大的毅力。",
      "xue2 hao3 wai4 yu3 xu1 yao4 hen3 da4 de5 yi4 li4",
      "Học giỏi ngoại ngữ cần nghị lực rất lớn.",
    ],
    [
      "你要争气，别让父母失望。",
      "ni3 yao4 zheng1 qi4 bie2 rang4 fu4 mu3 shi1 wang4",
      "Con phải cố gắng, đừng để bố mẹ thất vọng.",
    ],
    ["别自卑，你其实很优秀。", "bie2 zi4 bei1 ni3 qi2 shi2 hen3 you1 xiu4", "Đừng tự ti, thật ra bạn rất giỏi."],
  ]),
  31: rows([
    ["妈妈熬了一锅鸡汤。", "ma1 ma5 ao2 le5 yi1 guo1 ji1 tang1", "Mẹ đã hầm một nồi canh gà."],
    ["吃不完的菜可以打包。", "chi1 bu4 wan2 de5 cai4 ke3 yi3 da3 bao1", "Món ăn không hết có thể gói mang về."],
    [
      "这家店的菜很有家乡风味。",
      "zhe4 jia1 dian4 de5 cai4 hen3 you3 jia1 xiang1 feng1 wei4",
      "Món của quán này rất có hương vị quê nhà.",
    ],
  ]),
  32: rows([
    ["妈妈做的菜特别可口。", "ma1 ma5 zuo4 de5 cai4 te4 bie2 ke3 kou3", "Món mẹ nấu đặc biệt ngon miệng."],
    [
      "豆子要先在水里浸泡一夜。",
      "dou4 zi3 yao4 xian1 zai4 shui3 li3 jin4 pao4 yi1 ye4",
      "Đậu phải ngâm trong nước một đêm trước.",
    ],
    ["吃饭的时候要慢慢咀嚼。", "chi1 fan4 de5 shi2 hou5 yao4 man4 man4 ju3 jue2", "Khi ăn cơm phải nhai thật chậm."],
  ]),
  33: rows([
    [
      "冬天我最喜欢吃涮羊肉。",
      "dong1 tian1 wo3 zui4 xi3 huan5 chi1 shuan4 yang2 rou4",
      "Mùa đông tôi thích nhất món thịt cừu nhúng lẩu.",
    ],
    ["请品尝一下我做的菜。", "qing3 pin3 chang2 yi1 xia4 wo3 zuo4 de5 cai4", "Mời nếm thử món tôi nấu."],
    [
      "小时候我很爱吃糖葫芦。",
      "xiao3 shi2 hou4 wo3 hen3 ai4 chi1 tang2 hu2 lu5",
      "Hồi nhỏ tôi rất thích ăn kẹo hồ lô.",
    ],
  ]),
  34: rows([
    [
      "我今天胃口不好，只想喝点粥。",
      "wo3 jin1 tian1 wei4 kou3 bu4 hao3 zhi1 xiang3 he1 dian3 zhou1",
      "Hôm nay tôi ăn không ngon miệng, chỉ muốn ăn chút cháo.",
    ],
    [
      "这个鱼有点腥，你多放点姜吧。",
      "zhe4 ge5 yu2 you3 dian3 xing1 ni3 duo1 fang4 dian3 jiang1 ba5",
      "Con cá này hơi tanh, bạn cho thêm chút gừng nhé.",
    ],
    [
      "今天我做东，大家别客气！",
      "jin1 tian1 wo3 zuo4 dong1 da4 jia1 bie2 ke4 qi4",
      "Hôm nay tôi mời, mọi người đừng khách sáo nhé!",
    ],
  ]),
  35: rows([
    ["这把刀很锋利，小心点。", "zhe4 ba3 dao1 hen3 feng1 li4 xiao3 xin1 dian3", "Con dao này rất sắc, cẩn thận nhé."],
    [
      "她戴着一对漂亮的耳环。",
      "ta1 dai4 zhe5 yi1 dui4 piao4 liang5 de5 er3 huan2",
      "Cô ấy đeo một đôi bông tai rất đẹp.",
    ],
    ["我把钱放在兜里了。", "wo3 ba3 qian2 fang4 zai4 dou1 li3 le5", "Tôi để tiền trong túi rồi."],
  ]),
  36: rows([
    ["这套房子的布局很合理。", "zhe4 tao4 fang2 zi5 de5 bu4 ju2 hen3 he2 li3", "Bố cục căn nhà này rất hợp lý."],
    ["我们一起来布置教室吧。", "wo3 men5 yi1 qi3 lai2 bu4 zhi4 jiao4 shi4 ba5", "Chúng ta cùng bày trí lớp học nhé."],
    ["公共场所不能抽烟。", "gong1 gong4 chang3 suo3 bu4 neng2 chou1 yan1", "Nơi công cộng không được hút thuốc."],
  ]),
  37: rows([
    [
      "把衣服挂在门后的钩子上。",
      "ba3 yi1 fu5 gua4 zai4 men2 hou4 de5 gou1 zi5 shang4",
      "Treo quần áo lên cái móc sau cửa.",
    ],
    [
      "这个房间又宽敞又明亮。",
      "zhe4 ge5 fang2 jian1 you4 kuan1 chang5 you4 ming2 liang4",
      "Căn phòng này vừa rộng rãi vừa sáng sủa.",
    ],
    [
      "小心，前面的路上有个坑。",
      "xiao3 xin1 qian2 mian4 de5 lu4 shang5 you3 ge4 keng1",
      "Cẩn thận, đường phía trước có cái hố.",
    ],
  ]),
  38: rows([
    [
      "水龙头坏了，一直在滴水。",
      "shui3 long2 tou2 huai4 le5 yi1 zhi2 zai4 di1 shui3",
      "Vòi nước hỏng rồi, cứ nhỏ giọt mãi.",
    ],
    [
      "周末我们一起清理房间吧。",
      "zhou1 mo4 wo3 men5 yi1 qi3 qing1 li3 fang2 jian1 ba5",
      "Cuối tuần mình cùng dọn phòng nhé.",
    ],
    [
      "我的衬衫掉了一个纽扣儿。",
      "wo3 de5 chen4 shan1 diao4 le5 yi1 ge4 niu3 kou4 r5",
      "Áo sơ mi của tôi rơi mất một cái cúc.",
    ],
  ]),
  39: rows([
    [
      "门坏了，明天找人来修理。",
      "men2 huai4 le5 ming2 tian1 zhao3 ren2 lai2 xiu1 li3",
      "Cửa hỏng rồi, mai gọi người đến sửa.",
    ],
    [
      "墙上的油漆还没干，别碰！",
      "qiang2 shang4 de5 you2 qi1 hai2 mei2 gan1 bie2 peng4",
      "Sơn trên tường chưa khô, đừng chạm vào!",
    ],
    [
      "楼下的噪音太大，我睡不着。",
      "lou2 xia4 de5 zao4 yin1 tai4 da4 wo3 shui4 bu4 zhe5",
      "Tiếng ồn dưới nhà to quá, tôi không ngủ được.",
    ],
  ]),
  40: rows([
    [
      "天冷了，出门记得穿羽绒服。",
      "tian1 leng3 le5 chu1 men2 ji4 de5 chuan1 yu3 rong2 fu2",
      "Trời lạnh rồi, ra ngoài nhớ mặc áo lông vũ.",
    ],
    [
      "这件衬衫要熨一下再穿。",
      "zhe4 jian4 chen4 shan1 yao4 yun4 yi1 xia4 zai4 chuan1",
      "Cái áo sơ mi này phải là một chút rồi mới mặc.",
    ],
    [
      "睡觉前别忘了把蜡烛熄灭。",
      "shui4 jiao4 qian2 bie2 wang4 le5 ba3 la4 zhu2 xi1 mie4",
      "Trước khi ngủ đừng quên thổi tắt nến.",
    ],
  ]),
  41: rows([
    ["这本书非常畅销。", "zhe4 ben3 shu1 fei1 chang2 chang4 xiao1", "Cuốn sách này bán rất chạy."],
    [
      "我想把美元兑换成人民币。",
      "wo3 xiang3 ba3 mei3 yuan2 dui4 huan4 cheng2 ren2 min2 bi4",
      "Tôi muốn đổi đô la Mỹ sang nhân dân tệ.",
    ],
    [
      "这件衣服是次品，可以退吗？",
      "zhe4 jian4 yi1 fu5 shi4 ci4 pin3 ke3 yi3 tui4 ma5",
      "Cái áo này là hàng lỗi, có trả lại được không?",
    ],
  ]),
  42: rows([
    [
      "这家店的东西又便宜又实惠。",
      "zhe4 jia1 dian4 de5 dong1 xi5 you4 pian2 yi5 you4 shi2 hui4",
      "Đồ ở cửa hàng này vừa rẻ vừa tốt.",
    ],
    [
      "这个包是皮革做的，很耐用。",
      "zhe4 ge5 bao1 shi4 pi2 ge2 zuo4 de5 hen3 nai4 yong4",
      "Cái túi này làm bằng da, rất bền.",
    ],
    ["她穿上旗袍真好看啊。", "ta1 chuan1 shang4 qi2 pao2 zhen1 hao3 kan4 a5", "Cô ấy mặc sườn xám đẹp thật."],
  ]),
  43: rows([
    [
      "租房子要先交一个月的押金。",
      "zu1 fang2 zi5 yao4 xian1 jiao1 yi1 ge4 yue4 de5 ya1 jin1",
      "Thuê nhà phải đóng trước một tháng tiền cọc.",
    ],
    [
      "我在攒钱，想明年去旅行。",
      "wo3 zai4 zan3 qian2 xiang3 ming2 nian2 qu4 lü3 xing2",
      "Tôi đang dành dụm tiền, muốn năm sau đi du lịch.",
    ],
    [
      "这家店太贵了，我们被宰了！",
      "zhe4 jia1 dian4 tai4 gui4 le5 wo3 men5 bei4 zai3 le5",
      "Quán này đắt quá, chúng ta bị chặt chém rồi!",
    ],
  ]),
  44: rows([
    [
      "他昨天凌晨两点才睡觉。",
      "ta1 zuo2 tian1 ling2 chen2 liang3 dian3 cai2 shui4 jiao4",
      "Hôm qua hai giờ sáng anh ấy mới đi ngủ.",
    ],
    [
      "下班高峰的时候路上很堵。",
      "xia4 ban1 gao1 feng1 de5 shi2 hou5 lu4 shang5 hen3 du3",
      "Giờ cao điểm tan tầm đường rất tắc.",
    ],
    [
      "我今天没有工夫陪你玩。",
      "wo3 jin1 tian1 mei2 you3 gong1 fu5 pei2 ni3 wan2",
      "Hôm nay tôi không có thời gian chơi với bạn.",
    ],
  ]),
  45: rows([
    ["春节是农历的新年。", "chun1 jie2 shi4 nong2 li4 de5 xin1 nian2", "Tết là năm mới theo âm lịch."],
    [
      "我刚回国，还不习惯时差。",
      "wo3 gang1 hui2 guo2 hai2 bu4 xi2 guan4 shi2 cha1",
      "Tôi vừa về nước, chưa quen với chênh lệch múi giờ.",
    ],
    [
      "请稍等片刻，他马上就来。",
      "qing3 shao1 deng3 pian4 ke4 ta1 ma3 shang4 jiu4 lai2",
      "Xin đợi một lát, anh ấy đến ngay.",
    ],
  ]),
  46: rows([
    ["因为下雨，比赛延期了。", "yin1 wei4 xia4 yu3 bi3 sai4 yan2 qi1 le5", "Vì trời mưa nên trận đấu bị hoãn lại."],
    ["这里的人口逐年增加。", "zhe4 li3 de5 ren2 kou3 zhu2 nian2 zeng1 jia1", "Dân số ở đây tăng lên từng năm."],
    [
      "眼下最重要的是把身体养好。",
      "yan3 xia4 zui4 zhong4 yao4 de5 shi4 ba3 shen1 ti3 yang3 hao3",
      "Trước mắt quan trọng nhất là dưỡng sức khỏe cho tốt.",
    ],
  ]),
  47: rows([
    [
      "北极熊生活在很冷的地方。",
      "bei3 ji2 xiong2 sheng1 huo2 zai4 hen3 leng3 de5 di4 fang5",
      "Gấu Bắc Cực sống ở nơi rất lạnh.",
    ],
    [
      "这条山路很陡峭，要小心。",
      "zhe4 tiao2 shan1 lu4 hen3 dou3 qiao4 yao4 xiao3 xin1",
      "Đường núi này rất dốc, phải cẩn thận.",
    ],
    ["池塘里有很多小鱼。", "chi2 tang2 li3 you3 hen3 duo1 xiao3 yu2", "Trong ao có nhiều cá nhỏ."],
  ]),
  48: rows([
    [
      "今天阳光灿烂，我们出去玩吧。",
      "jin1 tian1 yang2 guang1 can4 lan4 wo3 men5 chu1 qu4 wan2 ba5",
      "Hôm nay nắng rực rỡ, chúng ta ra ngoài chơi đi.",
    ],
    ["南方的春天特别潮湿。", "nan2 fang1 de5 chun1 tian1 te4 bie2 chao2 shi1", "Mùa xuân ở miền Nam đặc biệt ẩm ướt."],
    ["孩子们在海边捡贝壳。", "hai2 zi5 men5 zai4 hai3 bian1 jian3 bei4 ke2", "Bọn trẻ nhặt vỏ sò bên bờ biển."],
  ]),
  49: rows([
    ["这个城市的海拔很高。", "zhe4 ge5 cheng2 shi4 de5 hai3 ba2 hen3 gao1", "Thành phố này nằm ở độ cao rất lớn."],
    [
      "夜里很寂静，什么声音都没有。",
      "ye4 li3 hen3 ji4 jing4 shen2 me5 sheng1 yin1 dou1 mei2 you3",
      "Ban đêm rất yên tĩnh, không có tiếng động nào.",
    ],
    [
      "去年这里发生了很大的洪水。",
      "qu4 nian2 zhe4 li3 fa1 sheng1 le5 hen3 da4 de5 hong2 shui3",
      "Năm ngoái ở đây xảy ra một trận lũ lớn.",
    ],
  ]),
  50: rows([
    ["这条河的水很清澈。", "zhe4 tiao2 he2 de5 shui3 hen3 qing1 che4", "Nước dòng sông này rất trong."],
    [
      "晚饭后我们在湖畔散步。",
      "wan3 fan4 hou4 wo3 men5 zai4 hu2 pan4 san4 bu4",
      "Sau bữa tối chúng tôi tản bộ ven hồ.",
    ],
    ["山上有一个很美的瀑布。", "shan1 shang4 you3 yi1 ge4 hen3 mei3 de5 pu4 bu4", "Trên núi có một thác nước rất đẹp."],
  ]),
  51: rows([
    [
      "今天天气晴朗，我们去爬山吧。",
      "jin1 tian1 tian1 qi4 qing2 lang3 wo3 men5 qu4 pa2 shan1 ba5",
      "Hôm nay trời quang đãng, mình đi leo núi nhé.",
    ],
    [
      "明天有台风，最好别出门。",
      "ming2 tian1 you3 tai2 feng1 zui4 hao3 bie2 chu1 men2",
      "Mai có bão, tốt nhất đừng ra ngoài.",
    ],
    ["天上的星星在闪烁。", "tian1 shang4 de5 xing1 xing1 zai4 shan3 shuo4", "Những vì sao trên trời đang lấp lánh."],
  ]),
  52: rows([
    [
      "我们坐在海边看夕阳。",
      "wo3 men5 zuo4 zai4 hai3 bian1 kan4 xi1 yang2",
      "Chúng tôi ngồi bên bờ biển ngắm hoàng hôn.",
    ],
    [
      "这条峡谷的风景太壮观了！",
      "zhe4 tiao2 xia2 gu3 de5 feng1 jing3 tai4 zhuang4 guan1 le5",
      "Phong cảnh hẻm núi này hùng vĩ quá!",
    ],
    ["苏州的园林非常有名。", "su1 zhou1 de5 yuan2 lin2 fei1 chang2 you3 ming2", "Vườn cảnh ở Tô Châu rất nổi tiếng."],
  ]),
  53: rows([
    ["夏天这里非常炎热。", "xia4 tian1 zhe4 li3 fei1 chang2 yan2 re4", "Mùa hè ở đây rất nóng bức."],
    [
      "大水淹没了很多农田。",
      "da4 shui3 yan1 mo4 le5 hen3 duo1 nong2 tian2",
      "Nước lớn đã nhấn chìm rất nhiều ruộng đồng.",
    ],
    [
      "沿海城市的冬天不太冷。",
      "yan2 hai3 cheng2 shi4 de5 dong1 tian1 bu4 tai4 leng3",
      "Mùa đông ở các thành phố ven biển không lạnh lắm.",
    ],
  ]),
  54: rows([
    [
      "小鸟在天空中自由地飞翔。",
      "xiao3 niao3 zai4 tian1 kong1 zhong1 zi4 you2 di4 fei1 xiang2",
      "Chim nhỏ tự do bay lượn trên bầu trời.",
    ],
    ["今年稻谷又丰收了。", "jin1 nian2 dao4 gu3 you4 feng1 shou1 le5", "Năm nay lúa lại được mùa."],
    ["老虎身上有黑色的斑纹。", "lao3 hu3 shen1 shang4 you3 hei1 se4 de5 ban1 wen2", "Trên mình con hổ có vằn đen."],
  ]),
  55: rows([
    [
      "夏天院子里的草长得很茂盛。",
      "xia4 tian1 yuan4 zi5 li3 de5 cao3 chang2 de2 hen3 mao4 sheng4",
      "Mùa hè cỏ trong sân mọc rất um tùm.",
    ],
    [
      "种菜少用化肥比较健康。",
      "zhong4 cai4 shao3 yong4 hua4 fei2 bi3 jiao4 jian4 kang1",
      "Trồng rau dùng ít phân hóa học thì tốt cho sức khỏe hơn.",
    ],
    ["风一吹，花瓣落了一地。", "feng1 yi1 chui1 hua1 ban4 luo4 le5 yi1 di4", "Gió vừa thổi, cánh hoa rơi đầy mặt đất."],
  ]),
  56: rows([
    [
      "春天到了，花园里的花都盛开了。",
      "chun1 tian1 dao4 le5 hua1 yuan2 li3 de5 hua1 dou1 sheng4 kai1 le5",
      "Xuân đến rồi, hoa trong vườn đều nở rộ.",
    ],
    [
      "冬天很多鸟会迁徙到南方。",
      "dong1 tian1 hen3 duo1 niao3 hui4 qian1 xi3 dao4 nan2 fang1",
      "Mùa đông nhiều loài chim di cư về phương nam.",
    ],
    [
      "爷爷在农村饲养了很多牲畜。",
      "ye2 ye5 zai4 nong2 cun1 si4 yang3 le5 hen3 duo1 sheng1 chu4",
      "Ông tôi nuôi rất nhiều gia súc ở quê.",
    ],
  ]),
  57: rows([
    ["树上有一个鸟窝。", "shu4 shang4 you3 yi1 ge4 niao3 wo1", "Trên cây có một cái tổ chim."],
    [
      "这些种子是从外地买来的。",
      "zhe4 xie1 zhong3 zi5 shi4 cong2 wai4 di4 mai3 lai2 de5",
      "Những hạt giống này được mua từ nơi khác về.",
    ],
    [
      "熊猫是一种珍稀的动物。",
      "xiong2 mao1 shi4 yi1 zhong3 zhen1 xi1 de5 dong4 wu4",
      "Gấu trúc là một loài động vật quý hiếm.",
    ],
  ]),
  58: rows([
    [
      "这条街是城市最繁华的地方。",
      "zhe4 tiao2 jie1 shi4 cheng2 shi4 zui4 fan2 hua2 de5 di4 fang5",
      "Con phố này là nơi sầm uất nhất thành phố.",
    ],
    ["他家就在边境附近。", "ta1 jia1 jiu4 zai4 bian1 jing4 fu4 jin4", "Nhà anh ấy ở gần biên giới."],
    ["这里人口非常稠密。", "zhe4 li3 ren2 kou3 fei1 chang2 chou2 mi4", "Dân cư ở đây rất đông đúc."],
  ]),
  59: rows([
    ["我们明天一早就动身。", "wo3 men5 ming2 tian1 yi1 zao3 jiu4 dong4 shen1", "Sáng sớm mai chúng ta khởi hành."],
    ["路上有点颠簸，坐好了。", "lu4 shang5 you3 dian3 dian1 bo3 zuo4 hao3 le5", "Đường hơi xóc, ngồi cho vững nhé."],
    [
      "开车的时候我习惯用导航。",
      "kai1 che1 de5 shi2 hou5 wo3 xi2 guan4 yong4 dao3 hang2",
      "Lúc lái xe tôi quen dùng định vị.",
    ],
  ]),
  60: rows([
    [
      "我们坐轮船去对面的小岛。",
      "wo3 men5 zuo4 lun2 chuan2 qu4 dui4 mian4 de5 xiao3 dao3",
      "Chúng tôi đi tàu thủy sang hòn đảo bên kia.",
    ],
    ["车的轮胎好像没气了。", "che1 de5 lun2 tai1 hao3 xiang4 mei2 qi4 le5", "Lốp xe hình như hết hơi rồi."],
    [
      "每年都有很多游客来这里观光。",
      "mei3 nian2 dou1 you3 hen3 duo1 you2 ke4 lai2 zhe4 li3 guan1 guang1",
      "Năm nào cũng có rất nhiều du khách đến đây tham quan.",
    ],
  ]),
  61: rows([
    ["前面有人，快刹车！", "qian2 mian4 you3 ren2 kuai4 sha1 che1", "Phía trước có người, phanh nhanh lên!"],
    [
      "这个箱子太大了，需要托运。",
      "zhe4 ge5 xiang1 zi3 tai4 da4 le5 xu1 yao4 tuo1 yun4",
      "Cái vali này to quá, cần ký gửi.",
    ],
    [
      "我们明天早上启程去欧洲。",
      "wo3 men5 ming2 tian1 zao3 shang5 qi3 cheng2 qu4 ou1 zhou1",
      "Sáng mai chúng tôi khởi hành đi châu Âu.",
    ],
  ]),
  62: rows([
    [
      "我们学校位于城市的东边。",
      "wo3 men5 xue2 xiao4 wei4 yu2 cheng2 shi4 de5 dong1 bian1",
      "Trường chúng tôi nằm ở phía đông thành phố.",
    ],
    [
      "他家就在前面那条小巷里。",
      "ta1 jia1 jiu4 zai4 qian2 mian4 na4 tiao2 xiao3 xiang4 li3",
      "Nhà anh ấy ở ngay trong con hẻm nhỏ phía trước.",
    ],
    [
      "上飞机不能携带太多液体。",
      "shang4 fei1 ji1 bu4 neng2 xie2 dai4 tai4 duo1 ye4 ti3",
      "Lên máy bay không được mang theo quá nhiều chất lỏng.",
    ],
  ]),
  63: rows([
    [
      "老师让我们背诵这首诗。",
      "lao3 shi1 rang4 wo3 men5 bei4 song4 zhe4 shou3 shi1",
      "Thầy bảo chúng tôi học thuộc bài thơ này.",
    ],
    ["你会写繁体字吗？", "ni3 hui4 xie3 fan2 ti3 zi4 ma5", "Bạn có biết viết chữ phồn thể không?"],
    ["他说的是广东方言。", "ta1 shuo1 de5 shi4 guang3 dong1 fang1 yan2", "Anh ấy nói tiếng địa phương Quảng Đông."],
  ]),
  64: rows([
    [
      "我弟弟明年要参加高考。",
      "wo3 di4 di5 ming2 nian2 yao4 can1 jia1 gao1 kao3",
      "Em trai tôi sang năm sẽ thi đại học.",
    ],
    [
      "每天早上我都朗读课文。",
      "mei3 tian1 zao3 shang5 wo3 dou1 lang3 du2 ke4 wen2",
      "Sáng nào tôi cũng đọc to bài khóa.",
    ],
    [
      "你说话有一点儿南方口音。",
      "ni3 shuo1 hua4 you3 yi1 dian3 er2 nan2 fang1 kou3 yin1",
      "Bạn nói chuyện hơi có giọng miền Nam.",
    ],
  ]),
  65: rows([
    [
      "他的文章刊登在今天的报纸上。",
      "ta1 de5 wen2 zhang1 kan1 deng1 zai4 jin1 tian1 de5 bao4 zhi3 shang4",
      "Bài viết của anh ấy được đăng trên báo hôm nay.",
    ],
    [
      "请按照这个格式写报告。",
      "qing3 an4 zhao4 zhe4 ge5 ge2 shi4 xie3 bao4 gao4",
      "Hãy viết báo cáo theo định dạng này.",
    ],
    [
      "我最喜欢这个节目的读书栏目。",
      "wo3 zui4 xi3 huan5 zhe4 ge5 jie2 mu4 di4 du2 shu1 lan2 mu4",
      "Tôi thích nhất chuyên mục đọc sách của chương trình này.",
    ],
  ]),
  66: rows([
    ["我的母语是越南语。", "wo3 de5 mu3 yu3 shi4 yue4 nan2 yu3", "Tiếng mẹ đẻ của tôi là tiếng Việt."],
    [
      "他说话很清晰，也很有条理。",
      "ta1 shuo1 hua4 hen3 qing1 xi1 ye3 hen3 you3 tiao2 li3",
      "Anh ấy nói rõ ràng và rất mạch lạc.",
    ],
    [
      "老师先给我们示范一遍。",
      "lao3 shi1 xian1 gei3 wo3 men5 shi4 fan4 yi1 bian4",
      "Thầy giáo làm mẫu cho chúng tôi một lượt trước.",
    ],
  ]),
  67: rows([
    [
      "他学习很用功，每天都看书到很晚。",
      "ta1 xue2 xi2 hen3 yong4 gong1 mei3 tian1 dou1 kan4 shu1 dao4 hen3 wan3",
      "Cậu ấy học rất chăm, ngày nào cũng đọc sách đến khuya.",
    ],
    [
      "考试作弊是绝对不允许的。",
      "kao3 shi4 zuo4 bi4 shi4 jue2 dui4 bu4 yun3 xu3 de5",
      "Gian lận trong thi cử là tuyệt đối không được phép.",
    ],
    [
      "我们要从这次失败中吸取教训。",
      "wo3 men5 yao4 cong2 zhe4 ci4 shi1 bai4 zhong1 xi1 qu3 jiao4 xun5",
      "Chúng ta phải rút ra bài học từ thất bại lần này.",
    ],
  ]),
  68: rows([
    [
      "请把这篇文章的要点写下来。",
      "qing3 ba3 zhe4 pian1 wen2 zhang1 de5 yao4 dian3 xie3 xia4 lai2",
      "Hãy viết ra những ý chính của bài này.",
    ],
    [
      "这本书后面有很多注释。",
      "zhe4 ben3 shu1 hou4 mian5 you3 hen3 duo1 zhu4 shi4",
      "Phía sau cuốn sách này có rất nhiều chú thích.",
    ],
    [
      "说说你读完这本书的心得吧。",
      "shuo1 shuo1 ni3 du2 wan2 zhe4 ben3 shu1 de5 xin1 de2 ba5",
      "Hãy kể điều tâm đắc của bạn sau khi đọc xong cuốn sách này.",
    ],
  ]),
  69: rows([
    [
      "新员工明天上午来报到。",
      "xin1 yuan2 gong1 ming2 tian1 shang4 wu3 lai2 bao4 dao4",
      "Nhân viên mới sáng mai đến trình diện.",
    ],
    ["这家公司的福利很好。", "zhe4 jia1 gong1 si1 de5 fu2 li4 hen3 hao3", "Phúc lợi của công ty này rất tốt."],
    ["他是我最得力的助手。", "ta1 shi4 wo3 zui4 de2 li4 de5 zhu4 shou3", "Anh ấy là trợ thủ đắc lực nhất của tôi."],
  ]),
  70: rows([
    [
      "经理吩咐我把文件送过去。",
      "jing1 li3 fen1 fu4 wo3 ba3 wen2 jian4 song4 guo4 qu4",
      "Giám đốc bảo tôi mang tài liệu qua đó.",
    ],
    ["我给你留了一张便条。", "wo3 gei3 ni3 liu2 le5 yi1 zhang1 bian4 tiao2", "Tôi để lại cho bạn một mẩu giấy nhắn."],
    [
      "妈妈一再叮嘱我注意安全。",
      "ma1 ma5 yi1 zai4 ding1 zhu3 wo3 zhu4 yi4 an1 quan2",
      "Mẹ dặn đi dặn lại tôi chú ý an toàn.",
    ],
  ]),
  71: rows([
    ["这个活动是谁策划的？", "zhe4 ge5 huo2 dong4 shi4 shui2 ce4 hua4 de5", "Hoạt động này do ai lên kế hoạch?"],
    ["我们得赶快想个对策。", "wo3 men5 de2 gan3 kuai4 xiang3 ge4 dui4 ce4", "Chúng ta phải mau nghĩ ra đối sách."],
    ["别光说，快动手吧！", "bie2 guang1 shuo1 kuai4 dong4 shou3 ba5", "Đừng chỉ nói, mau bắt tay vào làm đi!"],
  ]),
  72: rows([
    [
      "他周末在咖啡店做兼职。",
      "ta1 zhou1 mo4 zai4 ka1 fei1 dian4 zuo4 jian1 zhi2",
      "Cuối tuần anh ấy làm thêm ở quán cà phê.",
    ],
    [
      "她工作努力，很快就晋升了。",
      "ta1 gong1 zuo4 nu3 li4 hen3 kuai4 jiu4 jin4 sheng1 le5",
      "Cô ấy làm việc chăm chỉ nên được thăng chức rất nhanh.",
    ],
    [
      "年轻人工作的干劲很足。",
      "nian2 qing1 ren2 gong1 zuo4 de5 gan4 jin4 hen3 zu2",
      "Người trẻ làm việc rất hăng hái.",
    ],
  ]),
  73: rows([
    [
      "明天我要向经理汇报工作。",
      "ming2 tian1 wo3 yao4 xiang4 jing1 li3 hui4 bao4 gong1 zuo4",
      "Ngày mai tôi phải báo cáo công việc với giám đốc.",
    ],
    [
      "这份文件要盖章才有效。",
      "zhe4 fen4 wen2 jian4 yao4 gai4 zhang1 cai2 you3 xiao4",
      "Văn bản này phải đóng dấu mới có hiệu lực.",
    ],
    ["他精通三种外语。", "ta1 jing1 tong1 san1 zhong3 wai4 yu3", "Anh ấy thông thạo ba ngoại ngữ."],
  ]),
  74: rows([
    [
      "公司下个月有新员工培训。",
      "gong1 si1 xia4 ge4 yue4 you3 xin1 yuan2 gong1 pei2 xun4",
      "Tháng sau công ty có đào tạo nhân viên mới.",
    ],
    [
      "这件事我要先请示上级。",
      "zhe4 jian4 shi4 wo3 yao4 xian1 qing3 shi4 shang4 ji2",
      "Việc này tôi phải xin ý kiến cấp trên trước.",
    ],
    [
      "他工作很努力，很快被提拔了。",
      "ta1 gong1 zuo4 hen3 nu3 li4 hen3 kuai4 bei4 ti2 ba2 le5",
      "Anh ấy làm việc chăm chỉ nên nhanh chóng được đề bạt.",
    ],
  ]),
  75: rows([
    ["工作不要总是拖延。", "gong1 zuo4 bu4 yao4 zong3 shi4 tuo1 yan2", "Công việc đừng cứ trì hoãn mãi."],
    [
      "他把全部精力都放在事业上。",
      "ta1 ba3 quan2 bu4 jing1 li4 dou1 fang4 zai4 shi4 ye4 shang4",
      "Anh ấy dồn toàn bộ sức lực vào sự nghiệp.",
    ],
    ["我想弥补以前的错误。", "wo3 xiang3 mi2 bu3 yi3 qian2 de5 cuo4 wu4", "Tôi muốn bù đắp lỗi lầm trước đây."],
  ]),
  76: rows([
    [
      "我们公司正在招收新员工。",
      "wo3 men5 gong1 si1 zheng4 zai4 zhao1 shou1 xin1 yuan2 gong1",
      "Công ty chúng tôi đang tuyển nhân viên mới.",
    ],
    [
      "她是经理的助理，工作很忙。",
      "ta1 shi4 jing1 li3 de5 zhu4 li3 gong1 zuo4 hen3 mang2",
      "Cô ấy là trợ lý của giám đốc, công việc rất bận.",
    ],
    ["他对下属一直很客气。", "ta1 dui4 xia4 shu3 yi1 zhi2 hen3 ke4 qi4", "Anh ấy luôn rất lịch sự với cấp dưới."],
  ]),
  77: rows([
    ["今天晚上轮到我值班。", "jin1 tian1 wan3 shang5 lun2 dao4 wo3 zhi2 ban1", "Tối nay đến lượt tôi trực ca."],
    [
      "这个项目花了他很多心血。",
      "zhe4 ge5 xiang4 mu4 hua1 le5 ta1 hen3 duo1 xin1 xue4",
      "Dự án này đã tốn của anh ấy rất nhiều tâm huyết.",
    ],
    [
      "我们先制订一个详细的计划吧。",
      "wo3 men5 xian1 zhi4 ding4 yi1 ge4 xiang2 xi4 de5 ji4 hua4 ba5",
      "Chúng ta hãy lập một kế hoạch chi tiết trước đã.",
    ],
  ]),
  78: rows([
    ["最近房价一直在飙升。", "zui4 jin4 fang2 jia4 yi1 zhi2 zai4 biao1 sheng1", "Gần đây giá nhà liên tục tăng vọt."],
    [
      "我每个月都有一笔储蓄。",
      "wo3 mei3 ge4 yue4 dou1 you3 yi1 bi3 chu3 xu4",
      "Mỗi tháng tôi đều có một khoản tiết kiệm.",
    ],
    [
      "公司年底会给员工分红。",
      "gong1 si1 nian2 di3 hui4 gei3 yuan2 gong1 fen1 hong2",
      "Cuối năm công ty sẽ chia lãi cho nhân viên.",
    ],
  ]),
  79: rows([
    [
      "他大学毕业后就开始创业了。",
      "ta1 da4 xue2 bi4 ye4 hou4 jiu4 kai1 shi3 chuang4 ye4 le5",
      "Anh ấy tốt nghiệp đại học xong là bắt đầu khởi nghiệp.",
    ],
    [
      "那家小店上个月倒闭了。",
      "na4 jia1 xiao3 dian4 shang4 ge4 yue4 dao3 bi4 le5",
      "Cửa hàng nhỏ đó đã đóng cửa vào tháng trước.",
    ],
    ["淡季的机票便宜多了。", "dan4 ji4 de5 ji1 piao4 pian2 yi5 duo1 le5", "Vé máy bay mùa thấp điểm rẻ hơn nhiều."],
  ]),
  80: rows([
    [
      "这次出差的费用公司给报销。",
      "zhe4 ci4 chu1 chai1 de5 fei4 yong4 gong1 si1 gei3 bao4 xiao1",
      "Chi phí chuyến công tác này công ty sẽ thanh toán.",
    ],
    ["祝你新年发财！", "zhu4 ni3 xin1 nian2 fa1 cai2", "Chúc bạn năm mới phát tài!"],
    [
      "我们和他们的差距越来越小了。",
      "wo3 men5 he2 ta1 men5 de5 cha1 ju4 yue4 lai2 yue4 xiao3 le5",
      "Khoảng cách giữa chúng tôi và họ ngày càng nhỏ.",
    ],
  ]),
  81: rows([
    [
      "这几年银行的利率降低了。",
      "zhe4 ji3 nian2 yin2 hang2 de5 li4 lü4 jiang4 di1 le5",
      "Mấy năm nay lãi suất ngân hàng đã giảm.",
    ],
    [
      "公司今年亏损了不少钱。",
      "gong1 si1 jin1 nian2 kui1 sun3 le5 bu4 shao3 qian2",
      "Năm nay công ty lỗ khá nhiều tiền.",
    ],
    [
      "这个月家里的开支太大了。",
      "zhe4 ge5 yue4 jia1 li3 de5 kai1 zhi1 tai4 da4 le5",
      "Tháng này chi tiêu trong nhà nhiều quá.",
    ],
  ]),
  82: rows([
    [
      "他和朋友合伙开了一家饭馆。",
      "ta1 he2 peng2 you5 he2 huo3 kai1 le5 yi1 jia1 fan4 guan3",
      "Anh ấy cùng bạn hùn vốn mở một quán ăn.",
    ],
    [
      "这家连锁店在全国都有。",
      "zhe4 jia1 lian2 suo3 dian4 zai4 quan2 guo2 dou1 you3",
      "Chuỗi cửa hàng này có mặt trên cả nước.",
    ],
    ["打折的时候买比较合算。", "da3 zhe2 de5 shi2 hou5 mai3 bi3 jiao4 he2 suan4", "Mua lúc giảm giá thì có lợi hơn."],
  ]),
  83: rows([
    [
      "塑料瓶可以回收再利用。",
      "su4 liao4 ping2 ke3 yi3 hui2 shou1 zai4 li4 yong4",
      "Chai nhựa có thể thu hồi để tái sử dụng.",
    ],
    ["这件衣服的款式很新。", "zhe4 jian4 yi1 fu5 de5 kuan3 shi4 hen3 xin1", "Kiểu dáng chiếc áo này rất mới."],
    [
      "他把父母给的钱都挥霍光了。",
      "ta1 ba3 fu4 mu3 gei3 de5 qian2 dou1 hui1 huo4 guang1 le5",
      "Anh ta tiêu xài hoang phí hết tiền bố mẹ cho.",
    ],
  ]),
  84: rows([
    [
      "我们下周和他们签订合同。",
      "wo3 men5 xia4 zhou1 he2 ta1 men5 qian1 ding4 he2 tong5",
      "Tuần sau chúng tôi ký hợp đồng với họ.",
    ],
    ["越南盛产大米和咖啡。", "yue4 nan2 sheng4 chan3 da4 mi3 he2 ka1 fei1", "Việt Nam sản xuất nhiều gạo và cà phê."],
    [
      "这家公司今年的收益很好。",
      "zhe4 jia1 gong1 si1 jin1 nian2 de5 shou1 yi4 hen3 hao3",
      "Lợi nhuận năm nay của công ty này rất tốt.",
    ],
  ]),
  85: rows([
    ["祝你生意兴隆！", "zhu4 ni3 sheng1 yi4 xing1 long2", "Chúc bạn buôn bán phát đạt!"],
    [
      "这家公司今年开始盈利了。",
      "zhe4 jia1 gong1 si1 jin1 nian2 kai1 shi3 ying2 li4 le5",
      "Công ty này năm nay bắt đầu có lãi rồi.",
    ],
    [
      "做生意最重要的是信誉。",
      "zuo4 sheng1 yi4 zui4 zhong4 yao4 de5 shi4 xin4 yu4",
      "Làm ăn quan trọng nhất là uy tín.",
    ],
  ]),
  86: rows([
    [
      "双方终于签了合作协议。",
      "shuang1 fang1 zhong1 yu2 qian1 le5 he2 zuo4 xie2 yi4",
      "Hai bên cuối cùng đã ký thỏa thuận hợp tác.",
    ],
    [
      "这件事我们可以再协商一下。",
      "zhe4 jian4 shi4 wo3 men5 ke3 yi3 zai4 xie2 shang1 yi1 xia4",
      "Việc này chúng ta có thể bàn bạc thêm.",
    ],
    [
      "最近公司资金周转有点困难。",
      "zui4 jin4 gong1 si1 zi1 jin1 zhou1 zhuan3 you3 dian3 kun4 nan5",
      "Gần đây công ty quay vòng vốn hơi khó khăn.",
    ],
  ]),
  87: rows([
    [
      "警察当场逮捕了那个小偷。",
      "jing3 cha2 dang1 chang3 dai4 bu3 le5 na4 ge5 xiao3 tou1",
      "Cảnh sát bắt giữ tên trộm ngay tại chỗ.",
    ],
    ["赌博是违法的。", "du3 bo2 shi4 wei2 fa3 de5", "Cờ bạc là phạm pháp."],
    ["我们要远离毒品。", "wo3 men5 yao4 yuan3 li2 du2 pin3", "Chúng ta phải tránh xa ma túy."],
  ]),
  88: rows([
    [
      "他因为打架受到了学校的处分。",
      "ta1 yin1 wei4 da3 jia4 shou4 dao4 le5 xue2 xiao4 de5 chu3 fen4",
      "Cậu ấy bị nhà trường kỷ luật vì đánh nhau.",
    ],
    [
      "为这点小事打官司不值得。",
      "wei4 zhe4 dian3 xiao3 shi4 da3 guan1 si5 bu4 zhi2 de5",
      "Kiện tụng vì chuyện nhỏ này không đáng.",
    ],
    ["律师正在为被告辩护。", "lü4 shi1 zheng4 zai4 wei4 bei4 gao4 bian4 hu4", "Luật sư đang bào chữa cho bị cáo."],
  ]),
  89: rows([
    [
      "这个方案大家举手表决吧。",
      "zhe4 ge5 fang1 an4 da4 jia1 ju3 shou3 biao3 jue2 ba5",
      "Phương án này mọi người giơ tay biểu quyết nhé.",
    ],
    [
      "他当选为我们班的班长。",
      "ta1 dang1 xuan3 wei4 wo3 men5 ban1 de5 ban1 zhang3",
      "Cậu ấy được bầu làm lớp trưởng lớp chúng tôi.",
    ],
    ["我的建议被经理否决了。", "wo3 de5 jian4 yi4 bei4 jing1 li3 fou3 jue2 le5", "Đề xuất của tôi bị giám đốc bác bỏ."],
  ]),
  90: rows([
    ["他的想法太封建了。", "ta1 de5 xiang3 fa3 tai4 feng1 jian4 le5", "Suy nghĩ của ông ấy phong kiến quá."],
    ["政府决心打击腐败。", "zheng4 fu3 jue2 xin1 da3 ji1 fu3 bai4", "Chính phủ quyết tâm chống tham nhũng."],
    ["这种制度有很多弊端。", "zhe4 zhong3 zhi4 du4 you3 hen3 duo1 bi4 duan1", "Chế độ này có nhiều tệ đoan."],
  ]),
  91: rows([
    [
      "学校倡导大家节约用水。",
      "xue2 xiao4 chang4 dao3 da4 jia1 jie2 yue1 yong4 shui3",
      "Nhà trường khuyến khích mọi người tiết kiệm nước.",
    ],
    [
      "我们要防止这种事情再发生。",
      "wo3 men5 yao4 fang2 zhi3 zhe4 zhong3 shi4 qing5 zai4 fa1 sheng1",
      "Chúng ta phải ngăn chuyện này xảy ra lần nữa.",
    ],
    ["这里的学习风气很好。", "zhe4 li3 de5 xue2 xi2 feng1 qi4 hen3 hao3", "Không khí học tập ở đây rất tốt."],
  ]),
  92: rows([
    [
      "你帮我参谋一下，买哪件好？",
      "ni3 bang1 wo3 can1 mou2 yi1 xia4 mai3 na3 jian4 hao3",
      "Bạn góp ý giúp tôi, nên mua cái nào?",
    ],
    ["那时候到处都在打仗。", "na4 shi2 hou5 dao4 chu4 dou1 zai4 da3 zhang4", "Hồi đó khắp nơi đều đang đánh nhau."],
    ["敌人已经开始撤退了。", "di2 ren2 yi3 jing1 kai1 shi3 che4 tui4 le5", "Quân địch đã bắt đầu rút lui."],
  ]),
  93: rows([
    [
      "他们俩的意见发生了冲突。",
      "ta1 men5 lia3 de5 yi4 jian4 fa1 sheng1 le5 chong1 tu1",
      "Ý kiến hai người họ xảy ra xung đột.",
    ],
    [
      "网购对实体店冲击很大。",
      "wang3 gou4 dui4 shi2 ti3 dian4 chong1 ji1 hen3 da4",
      "Mua sắm trực tuyến tác động rất lớn đến cửa hàng truyền thống.",
    ],
    [
      "多运动可以提高抵抗力。",
      "duo1 yun4 dong4 ke3 yi3 ti2 gao1 di3 kang4 li4",
      "Vận động nhiều có thể tăng sức đề kháng.",
    ],
  ]),
  94: rows([
    ["他今天又挨骂了。", "ta1 jin1 tian1 you4 ai1 ma4 le5", "Hôm nay cậu ấy lại bị mắng."],
    ["小孩子别在这里捣乱。", "xiao3 hai2 zi5 bie2 zai4 zhe4 li3 dao3 luan4", "Trẻ con đừng phá phách ở đây."],
    ["失败对他的打击很大。", "shi1 bai4 dui4 ta1 de5 da3 ji1 hen3 da4", "Thất bại là đòn giáng rất nặng với anh ấy."],
  ]),
  95: rows([
    [
      "他不愧是我们的好老师。",
      "ta1 bu4 kui4 shi4 wo3 men5 de5 hao3 lao3 shi1",
      "Thầy ấy xứng đáng là người thầy tốt của chúng tôi.",
    ],
    ["哥哥是我学习的榜样。", "ge1 ge5 shi4 wo3 xue2 xi2 de5 bang3 yang4", "Anh trai là tấm gương để tôi noi theo."],
    [
      "毕业典礼明天上午举行。",
      "bi4 ye4 dian3 li3 ming2 tian1 shang4 wu3 ju3 xing2",
      "Lễ tốt nghiệp được tổ chức sáng mai.",
    ],
  ]),
  96: rows([
    ["这家店的价格很公道。", "zhe4 jia1 dian4 de5 jia4 ge2 hen3 gong1 dao5", "Giá ở cửa hàng này rất phải chăng."],
    ["他因为打架被拘留了。", "ta1 yin1 wei4 da3 jia4 bei4 ju1 liu2 le5", "Anh ta bị tạm giữ vì đánh nhau."],
    [
      "两家人最后还是和解了。",
      "liang3 jia1 ren2 zui4 hou4 hai2 shi5 he2 jie3 le5",
      "Cuối cùng hai nhà vẫn làm lành với nhau.",
    ],
  ]),
  97: rows([
    ["有人冒充警察骗钱。", "you3 ren2 mao4 chong1 jing3 cha2 pian4 qian2", "Có kẻ giả làm cảnh sát để lừa tiền."],
    ["我觉得有人在跟踪我。", "wo3 jue2 de5 you3 ren2 zai4 gen1 zong1 wo3", "Tôi cảm thấy có người đang bám theo mình."],
    ["对陌生人要提高警惕。", "dui4 mo4 sheng1 ren2 yao4 ti2 gao1 jing3 ti4", "Với người lạ phải nâng cao cảnh giác."],
  ]),
  98: rows([
    [
      "这个消息还没有官方确认。",
      "zhe4 ge5 xiao1 xi5 hai2 mei2 you3 guan1 fang1 que4 ren4",
      "Tin này vẫn chưa được xác nhận chính thức.",
    ],
    ["他打算参加班长竞选。", "ta1 da3 suan4 can1 jia1 ban1 zhang3 jing4 xuan3", "Cậu ấy định tranh cử lớp trưởng."],
    [
      "政府的工作需要大家监督。",
      "zheng4 fu3 de5 gong1 zuo4 xu1 yao4 da4 jia1 jian1 du1",
      "Công việc của chính quyền cần mọi người giám sát.",
    ],
  ]),
  99: rows([
    [
      "学校号召大家节约用水。",
      "xue2 xiao4 hao4 zhao4 da4 jia1 jie2 yue1 yong4 shui3",
      "Nhà trường kêu gọi mọi người tiết kiệm nước.",
    ],
    [
      "他们一家人生活得很和睦。",
      "ta1 men5 yi1 jia1 ren2 sheng1 huo2 de2 hen3 he2 mu4",
      "Cả nhà họ sống rất hòa thuận.",
    ],
    ["路边有一只流浪猫。", "lu4 bian1 you3 yi1 zhi1 liu2 lang4 mao1", "Bên đường có một con mèo hoang."],
  ]),
  100: rows([
    [
      "火药是中国古代的发明。",
      "huo3 yao4 shi4 zhong1 guo2 gu3 dai4 de5 fa1 ming2",
      "Thuốc súng là phát minh của Trung Quốc thời cổ.",
    ],
    ["我哥哥在军队里当兵。", "wo3 ge1 ge5 zai4 jun1 dui4 li3 dang1 bing1", "Anh trai tôi đang đi lính trong quân đội."],
    [
      "科学家终于攻克了这个难题。",
      "ke1 xue2 jia1 zhong1 yu2 gong1 ke4 le5 zhe4 ge5 nan2 ti2",
      "Các nhà khoa học cuối cùng đã giải được bài toán khó này.",
    ],
  ]),
  101: rows([
    [
      "别干扰他，他正在复习呢。",
      "bie2 gan1 rao3 ta1 ta1 zheng4 zai4 fu4 xi2 ne5",
      "Đừng làm phiền cậu ấy, cậu ấy đang ôn bài.",
    ],
    [
      "这部电影在全国引起了轰动。",
      "zhe4 bu4 dian4 ying3 zai4 quan2 guo2 yin3 qi3 le5 hong1 dong4",
      "Bộ phim này gây chấn động khắp cả nước.",
    ],
    [
      "父母不应该过多干涉孩子。",
      "fu4 mu3 bu4 ying1 gai1 guo4 duo1 gan1 she4 hai2 zi5",
      "Cha mẹ không nên can thiệp quá nhiều vào con cái.",
    ],
  ]),
  102: rows([
    [
      "大家要团结起来，互相帮助。",
      "da4 jia1 yao4 tuan2 jie2 qi3 lai5 hu4 xiang1 bang1 zhu4",
      "Mọi người hãy đoàn kết, giúp đỡ lẫn nhau.",
    ],
    [
      "明天我们投票选班长。",
      "ming2 tian1 wo3 men5 tou2 piao4 xuan3 ban1 zhang3",
      "Mai chúng tôi bỏ phiếu bầu lớp trưởng.",
    ],
    [
      "很多人帮助贫困地区的孩子。",
      "hen3 duo1 ren2 bang1 zhu4 pin2 kun4 di4 qu1 de5 hai2 zi5",
      "Nhiều người giúp đỡ trẻ em vùng nghèo.",
    ],
  ]),
  103: rows([
    [
      "签合同前要看清楚每个条款。",
      "qian1 he2 tong5 qian2 yao4 kan4 qing1 chu5 mei3 ge4 tiao2 kuan3",
      "Trước khi ký hợp đồng phải đọc kỹ từng điều khoản.",
    ],
    [
      "这个新规定下个月生效。",
      "zhe4 ge5 xin1 gui1 ding4 xia4 ge4 yue4 sheng1 xiao4",
      "Quy định mới này có hiệu lực từ tháng sau.",
    ],
    [
      "我们要保护消费者的权益。",
      "wo3 men5 yao4 bao3 hu4 xiao1 fei4 zhe3 de5 quan2 yi4",
      "Chúng ta phải bảo vệ quyền lợi người tiêu dùng.",
    ],
  ]),
  104: rows([
    [
      "警察在找那个失踪的孩子。",
      "jing3 cha2 zai4 zhao3 na4 ge5 shi1 zong1 de5 hai2 zi5",
      "Cảnh sát đang tìm đứa trẻ mất tích ấy.",
    ],
    [
      "我们不能虐待小动物。",
      "wo3 men5 bu4 neng2 nüe4 dai4 xiao3 dong4 wu4",
      "Chúng ta không được ngược đãi động vật nhỏ.",
    ],
    [
      "这张钞票是伪造的，不能用。",
      "zhe4 zhang1 chao1 piao4 shi4 wei3 zao4 de5 bu4 neng2 yong4",
      "Tờ tiền này là giả, không dùng được.",
    ],
  ]),
  105: rows([
    [
      "我们不应该歧视任何人。",
      "wo3 men5 bu4 ying1 gai1 qi2 shi4 ren4 he2 ren2",
      "Chúng ta không nên kỳ thị bất kỳ ai.",
    ],
    [
      "很多国家谴责了这次战争。",
      "hen3 duo1 guo2 jia1 qian3 ze2 le5 zhe4 ci4 zhan4 zheng1",
      "Nhiều nước đã lên án cuộc chiến này.",
    ],
    [
      "广场上有很多红色的旗帜。",
      "guang3 chang3 shang4 you3 hen3 duo1 hong2 se4 de5 qi2 zhi4",
      "Trên quảng trường có rất nhiều lá cờ đỏ.",
    ],
  ]),
  106: rows([
    ["这家医院的声誉很好。", "zhe4 jia1 yi1 yuan4 de5 sheng1 yu4 hen3 hao3", "Bệnh viện này có danh tiếng rất tốt."],
    [
      "他是这方面的权威。",
      "ta1 shi4 zhe4 fang1 mian4 de5 quan2 wei1",
      "Ông ấy là chuyên gia hàng đầu về lĩnh vực này.",
    ],
    [
      "站在大海边，我觉得自己很渺小。",
      "zhan4 zai4 da4 hai3 bian1 wo3 jue2 de5 zi4 ji3 hen3 miao3 xiao3",
      "Đứng bên biển cả, tôi thấy mình thật nhỏ bé.",
    ],
  ]),
  107: rows([
    [
      "路上发生了一起交通事故。",
      "lu4 shang5 fa1 sheng1 le5 yi1 qi3 jiao1 tong1 shi4 gu4",
      "Trên đường xảy ra một vụ tai nạn giao thông.",
    ],
    ["这份工作的前景很好。", "zhe4 fen4 gong1 zuo4 de5 qian2 jing3 hen3 hao3", "Công việc này có triển vọng rất tốt."],
    [
      "现在的情形对我们很有利。",
      "xian4 zai4 de5 qing2 xing5 dui4 wo3 men5 hen3 you3 li4",
      "Tình hình hiện nay rất có lợi cho chúng ta.",
    ],
  ]),
  108: rows([
    [
      "警察很快就找到了重要线索。",
      "jing3 cha2 hen3 kuai4 jiu4 zhao3 dao4 le5 zhong4 yao4 xian4 suo3",
      "Cảnh sát rất nhanh đã tìm ra manh mối quan trọng.",
    ],
    [
      "接到这种电话要小心诈骗。",
      "jie1 dao4 zhe4 zhong3 dian4 hua4 yao4 xiao3 xin1 zha4 pian4",
      "Nhận được loại điện thoại này phải cẩn thận lừa đảo.",
    ],
    [
      "总有一天真相会大白的。",
      "zong3 you3 yi1 tian1 zhen1 xiang4 hui4 da4 bai2 de5",
      "Rồi sẽ có ngày sự thật được phơi bày.",
    ],
  ]),
  109: rows([
    ["这里严禁吸烟。", "zhe4 li3 yan2 jin4 xi1 yan1", "Ở đây nghiêm cấm hút thuốc."],
    [
      "我真的没拿，你别冤枉我。",
      "wo3 zhen1 de5 mei2 na2 ni3 bie2 yuan1 wang5 wo3",
      "Tôi thật sự không lấy, bạn đừng đổ oan cho tôi.",
    ],
    [
      "这张票已经过期作废了。",
      "zhe4 zhang1 piao4 yi3 jing1 guo4 qi1 zuo4 fei4 le5",
      "Tấm vé này đã quá hạn và hết hiệu lực rồi.",
    ],
  ]),
  110: rows([
    ["这个小区的治安非常好。", "zhe4 ge5 xiao3 qu1 de5 zhi4 an1 fei1 chang2 hao3", "Trị an ở khu dân cư này rất tốt."],
    [
      "请不要随便泄露别人的隐私。",
      "qing3 bu4 yao4 sui2 bian4 xie4 lou4 bie2 ren5 de5 yin3 si1",
      "Xin đừng tùy tiện tiết lộ chuyện riêng của người khác.",
    ],
    [
      "晚上常常有警察在这儿巡逻。",
      "wan3 shang5 chang2 chang2 you3 jing3 cha2 zai4 zhe4 er2 xun2 luo2",
      "Buổi tối thường có cảnh sát tuần tra ở đây.",
    ],
  ]),
  111: rows([
    [
      "这件事引起了社会舆论的关注。",
      "zhe4 jian4 shi4 yin3 qi3 le5 she4 hui4 yu2 lun4 de5 guan1 zhu4",
      "Việc này đã thu hút sự chú ý của dư luận xã hội.",
    ],
    ["他是我们协会的委员。", "ta1 shi4 wo3 men5 xie2 hui4 de5 wei3 yuan2", "Ông ấy là ủy viên của hiệp hội chúng tôi."],
    [
      "在这个问题上我保持中立。",
      "zai4 zhe4 ge5 wen4 ti2 shang4 wo3 bao3 chi2 zhong1 li4",
      "Trong vấn đề này tôi giữ thái độ trung lập.",
    ],
  ]),
  112: rows([
    [
      "这部电影讲的是一场有名的战役。",
      "zhe4 bu4 dian4 ying3 jiang3 de5 shi4 yi1 chang3 you3 ming2 de5 zhan4 yi4",
      "Bộ phim này kể về một chiến dịch nổi tiếng.",
    ],
    [
      "爬山前要准备好装备。",
      "pa2 shan1 qian2 yao4 zhun3 bei4 hao3 zhuang1 bei4",
      "Trước khi leo núi phải chuẩn bị đủ trang bị.",
    ],
    [
      "公司需要一个长期的发展战略。",
      "gong1 si1 xu1 yao4 yi1 ge4 chang2 qi1 de5 fa1 zhan3 zhan4 lüe4",
      "Công ty cần một chiến lược phát triển lâu dài.",
    ],
  ]),
  113: rows([
    [
      "为了孩子，她牺牲了很多。",
      "wei4 le5 hai2 zi5 ta1 xi1 sheng1 le5 hen3 duo1",
      "Vì con, cô ấy đã hy sinh rất nhiều.",
    ],
    [
      "他的歌声征服了所有观众。",
      "ta1 de5 ge1 sheng1 zheng1 fu2 le5 suo3 you3 guan1 zhong4",
      "Giọng hát của anh ấy đã chinh phục mọi khán giả.",
    ],
    [
      "我相信正义总会胜利。",
      "wo3 xiang1 xin4 zheng4 yi4 zong3 hui4 sheng4 li4",
      "Tôi tin rằng chính nghĩa cuối cùng sẽ chiến thắng.",
    ],
  ]),
  114: rows([
    [
      "这篇文章的标题很吸引人。",
      "zhe4 pian1 wen2 zhang1 de5 biao1 ti2 hen3 xi1 yin3 ren2",
      "Tiêu đề bài viết này rất thu hút.",
    ],
    ["电视里正在播放新闻。", "dian4 shi4 li3 zheng4 zai4 bo1 fang4 xin1 wen2", "Trên tivi đang phát tin tức."],
    ["他在街上发传单。", "ta1 zai4 jie1 shang4 fa1 chuan2 dan1", "Anh ấy phát tờ rơi trên phố."],
  ]),
  115: rows([
    [
      "春节的时候家家都贴对联。",
      "chun1 jie2 de5 shi2 hou5 jia1 jia1 dou1 tie1 dui4 lian2",
      "Dịp Tết nhà nhà đều dán câu đối.",
    ],
    [
      "她在电影里扮演一位老师。",
      "ta1 zai4 dian4 ying3 li3 ban4 yan3 yi1 wei4 lao3 shi1",
      "Cô ấy đóng vai một cô giáo trong phim.",
    ],
    ["端午节我们吃粽子。", "duan1 wu3 jie2 wo3 men5 chi1 zong4 zi3", "Tết Đoan Ngọ chúng tôi ăn bánh ú."],
  ]),
  116: rows([
    ["这首歌的节奏很快。", "zhe4 shou3 ge1 de5 jie2 zou4 hen3 kuai4", "Bài hát này có nhịp điệu rất nhanh."],
    [
      "我小时候特别爱看漫画。",
      "wo3 xiao3 shi2 hou4 te4 bie2 ai4 kan4 man4 hua4",
      "Hồi nhỏ tôi rất mê đọc truyện tranh.",
    ],
    [
      "她化妆以后看起来更漂亮了。",
      "ta1 hua4 zhuang1 yi3 hou4 kan4 qi3 lai5 geng4 piao4 liang5 le5",
      "Sau khi trang điểm cô ấy trông xinh hơn hẳn.",
    ],
  ]),
  117: rows([
    [
      "过年的时候孩子们都想要红包。",
      "guo4 nian2 de5 shi2 hou5 hai2 zi5 men5 dou1 xiang3 yao4 hong2 bao1",
      "Tết đến bọn trẻ đều mong được lì xì.",
    ],
    [
      "我们在这里拍张照片留念吧。",
      "wo3 men5 zai4 zhe4 li3 pai1 zhang1 zhao4 pian4 liu2 nian4 ba5",
      "Chúng ta chụp một tấm ảnh ở đây làm kỷ niệm nhé.",
    ],
    [
      "时间不早了，我先告辞了。",
      "shi2 jian1 bu4 zao3 le5 wo3 xian1 gao4 ci2 le5",
      "Không còn sớm nữa, tôi xin phép về trước.",
    ],
  ]),
  118: rows([
    ["这座宫殿非常宏伟。", "zhe4 zuo4 gong1 dian4 fei1 chang2 hong2 wei3", "Cung điện này vô cùng đồ sộ."],
    [
      "这个工艺品做得很精致。",
      "zhe4 ge5 gong1 yi4 pin3 zuo4 de2 hen3 jing1 zhi4",
      "Món đồ thủ công này làm rất tinh xảo.",
    ],
    [
      "我爷爷特别喜欢收集古董。",
      "wo3 ye2 ye5 te4 bie2 xi3 huan5 shou1 ji2 gu3 dong3",
      "Ông tôi rất thích sưu tầm đồ cổ.",
    ],
  ]),
  119: rows([
    [
      "小时候妈妈常给我讲童话。",
      "xiao3 shi2 hou4 ma1 ma5 chang2 gei3 wo3 jiang3 tong2 hua4",
      "Hồi nhỏ mẹ thường kể truyện cổ tích cho tôi.",
    ],
    [
      "俗话说，好的开始是成功的一半。",
      "su2 hua4 shuo1 hao3 de5 kai1 shi3 shi4 cheng2 gong1 de5 yi1 ban4",
      "Tục ngữ có câu, khởi đầu tốt là thành công một nửa.",
    ],
    [
      "我爷爷每天都练习书法。",
      "wo3 ye2 ye5 mei3 tian1 dou1 lian4 xi2 shu1 fa3",
      "Ông tôi ngày nào cũng luyện thư pháp.",
    ],
  ]),
  120: rows([
    [
      "这部电影的情节很有意思。",
      "zhe4 bu4 dian4 ying3 de5 qing2 jie2 hen3 you3 yi4 si5",
      "Cốt truyện bộ phim này rất thú vị.",
    ],
    ["我爸爸喜欢收藏旧邮票。", "wo3 ba4 ba5 xi3 huan5 shou1 cang2 jiu4 you2 piao4", "Bố tôi thích sưu tầm tem cũ."],
    ["这家饭馆的菜很有特色。", "zhe4 jia1 fan4 guan3 de5 cai4 hen3 you3 te4 se4", "Món ăn ở quán này rất đặc sắc."],
  ]),
  121: rows([
    [
      "过年的时候孩子们都能收到压岁钱。",
      "guo4 nian2 de5 shi2 hou5 hai2 zi5 men5 dou1 neng2 shou1 dao4 ya1 sui4 qian2",
      "Dịp Tết bọn trẻ đều nhận được tiền mừng tuổi.",
    ],
    [
      "元宵节晚上我们一起去看烟花吧。",
      "yuan2 xiao1 jie2 wan3 shang5 wo3 men5 yi1 qi3 qu4 kan4 yan1 hua1 ba5",
      "Tối Tết Nguyên Tiêu chúng ta cùng đi xem pháo hoa nhé.",
    ],
    [
      "每个地方都有自己的习俗。",
      "mei3 ge4 di4 fang5 dou1 you3 zi4 ji3 de5 xi2 su2",
      "Mỗi nơi đều có phong tục riêng của mình.",
    ],
  ]),
  122: rows([
    ["这首歌的旋律很好听。", "zhe4 shou3 ge1 de5 xuan2 lü4 hen3 hao3 ting1", "Giai điệu của bài hát này rất hay."],
    [
      "她的舞蹈表演非常精彩。",
      "ta1 de5 wu3 dao3 biao3 yan3 fei1 chang2 jing1 cai3",
      "Tiết mục múa của cô ấy vô cùng đặc sắc.",
    ],
    [
      "我哥哥特别喜欢听摇滚。",
      "wo3 ge1 ge5 te4 bie2 xi3 huan5 ting1 yao2 gun3",
      "Anh trai tôi đặc biệt thích nghe nhạc rock.",
    ],
  ]),
  123: rows([
    [
      "我小时候特别爱看武侠小说。",
      "wo3 xiao3 shi2 hou4 te4 bie2 ai4 kan4 wu3 xia2 xiao3 shuo1",
      "Hồi nhỏ tôi đặc biệt thích đọc tiểu thuyết kiếm hiệp.",
    ],
    [
      "今晚的比赛会在电视上直播。",
      "jin1 wan3 de5 bi3 sai4 hui4 zai4 dian4 shi4 shang4 zhi2 bo1",
      "Trận đấu tối nay sẽ được phát trực tiếp trên tivi.",
    ],
    [
      "这部电影的结尾很有悬念。",
      "zhe4 bu4 dian4 ying3 de5 jie2 wei3 hen3 you3 xuan2 nian4",
      "Cái kết của bộ phim này rất gây tò mò.",
    ],
  ]),
  124: rows([
    [
      "我们班在比赛中得了季军。",
      "wo3 men5 ban1 zai4 bi3 sai4 zhong1 de2 le5 ji4 jun1",
      "Lớp chúng tôi giành hạng ba trong cuộc thi.",
    ],
    ["上半场我们一直领先。", "shang4 ban4 chang3 wo3 men5 yi1 zhi2 ling3 xian1", "Hiệp một chúng tôi luôn dẫn trước."],
    [
      "他踢球的技术非常高超。",
      "ta1 ti1 qiu2 de5 ji4 shu4 fei1 chang2 gao1 chao1",
      "Kỹ thuật đá bóng của anh ấy rất điêu luyện.",
    ],
  ]),
  125: rows([
    [
      "比赛的胜负并不重要。",
      "bi3 sai4 de5 sheng4 fu4 bing4 bu4 zhong4 yao4",
      "Thắng thua trong trận đấu không quan trọng.",
    ],
    [
      "他拼命跑，终于拿了第一名。",
      "ta1 pin1 ming4 pao3 zhong1 yu2 na2 le5 di4 yi1 ming2",
      "Anh ấy chạy hết sức, cuối cùng giành hạng nhất.",
    ],
    ["夏天我想去海边潜水。", "xia4 tian1 wo3 xiang3 qu4 hai3 bian1 qian2 shui3", "Mùa hè tôi muốn ra biển lặn."],
  ]),
  126: rows([
    ["他在比赛中得了亚军。", "ta1 zai4 bi3 sai4 zhong1 de2 le5 ya4 jun1", "Anh ấy giành giải nhì trong cuộc thi."],
    ["两个队正在争夺冠军。", "liang3 ge4 dui4 zheng4 zai4 zheng1 duo2 guan4 jun1", "Hai đội đang tranh chức vô địch."],
    [
      "同学们都踊跃报名参加比赛。",
      "tong2 xue2 men5 dou1 yong3 yue4 bao4 ming2 can1 jia1 bi3 sai4",
      "Các bạn học đều hăng hái đăng ký tham gia thi đấu.",
    ],
  ]),
  127: rows([
    ["请你把附件发给我。", "qing3 ni3 ba3 fu4 jian4 fa1 gei3 wo3", "Bạn gửi tệp đính kèm cho tôi nhé."],
    [
      "用户名错了，登录不了。",
      "yong4 hu4 ming2 cuo4 le5 deng1 lu4 bu4 liao3",
      "Sai tên người dùng, không đăng nhập được.",
    ],
    [
      "出门前记得关掉电源。",
      "chu1 men2 qian2 ji4 de5 guan1 diao4 dian4 yuan2",
      "Trước khi ra ngoài nhớ tắt nguồn điện.",
    ],
  ]),
  128: rows([
    ["水到一百度就会沸腾。", "shui3 dao4 yi1 bai3 du4 jiu4 hui4 fei4 teng2", "Nước đến một trăm độ sẽ sôi."],
    ["宇宙里有很多奥秘。", "yu3 zhou4 li3 you3 hen3 duo1 ao4 mi4", "Vũ trụ có rất nhiều điều bí ẩn."],
    ["这张照片可以放大吗？", "zhe4 zhang1 zhao4 pian4 ke3 yi3 fang4 da4 ma5", "Bức ảnh này có phóng to được không?"],
  ]),
  129: rows([
    ["这件衣服的弹性很好。", "zhe4 jian4 yi1 fu5 de5 tan2 xing4 hen3 hao3", "Chiếc áo này co giãn rất tốt."],
    [
      "你可以调节一下空调的温度。",
      "ni3 ke3 yi3 tiao2 jie2 yi1 xia4 kong1 tiao2 de5 wen1 du4",
      "Bạn có thể chỉnh nhiệt độ điều hòa một chút.",
    ],
    ["这个图案左右对称。", "zhe4 ge5 tu2 an4 zuo3 you4 dui4 chen4", "Hoa văn này đối xứng hai bên."],
  ]),
  130: rows([
    [
      "电梯出了故障，我们走楼梯吧。",
      "dian4 ti1 chu1 le5 gu4 zhang4 wo3 men5 zou3 lou2 ti1 ba5",
      "Thang máy bị hỏng, chúng ta đi thang bộ nhé.",
    ],
    [
      "现在没有互联网很不方便。",
      "xian4 zai4 mei2 you3 hu4 lian2 wang3 hen3 bu4 fang1 bian4",
      "Bây giờ không có Internet thì rất bất tiện.",
    ],
    [
      "我的手机软件需要更新了。",
      "wo3 de5 shou3 ji1 ruan3 jian4 xu1 yao4 geng1 xin1 le5",
      "Phần mềm điện thoại của tôi cần cập nhật rồi.",
    ],
  ]),
  131: rows([
    [
      "这座桥很坚固，非常安全。",
      "zhe4 zuo4 qiao2 hen3 jian1 gu4 fei1 chang2 an1 quan2",
      "Cây cầu này rất kiên cố, vô cùng an toàn.",
    ],
    [
      "自来水最好过滤以后再喝。",
      "zi4 lai2 shui3 zui4 hao3 guo4 lü4 yi3 hou4 zai4 he1",
      "Nước máy tốt nhất nên lọc rồi mới uống.",
    ],
    [
      "把汤冷却一下再放进冰箱。",
      "ba3 tang1 leng3 que4 yi1 xia4 zai4 fang4 jin4 bing1 xiang1",
      "Để canh nguội bớt rồi hãy cho vào tủ lạnh.",
    ],
  ]),
  132: rows([
    [
      "工厂不能随便排放污水。",
      "gong1 chang3 bu4 neng2 sui2 bian4 pai2 fang4 wu1 shui3",
      "Nhà máy không được tùy tiện xả nước thải.",
    ],
    ["我们家做饭用天然气。", "wo3 men5 jia1 zuo4 fan4 yong4 tian1 ran2 qi4", "Nhà tôi nấu ăn bằng khí đốt."],
    [
      "下大雨以后，那座旧房子塌了。",
      "xia4 da4 yu3 yi3 hou4 na4 zuo4 jiu4 fang2 zi5 ta1 le5",
      "Sau trận mưa lớn, ngôi nhà cũ ấy sập rồi.",
    ],
  ]),
  133: rows([
    [
      "糖在热水里很快就溶解了。",
      "tang2 zai4 re4 shui3 li3 hen3 kuai4 jiu4 rong2 jie3 le5",
      "Đường tan rất nhanh trong nước nóng.",
    ],
    [
      "我的自行车放久了，生锈了。",
      "wo3 de5 zi4 xing2 che1 fang4 jiu3 le5 sheng1 xiu4 le5",
      "Xe đạp của tôi để lâu nên bị gỉ rồi.",
    ],
    [
      "人类一直在探索太空的秘密。",
      "ren2 lei4 yi1 zhi2 zai4 tan4 suo3 tai4 kong1 de5 mi4 mi4",
      "Con người luôn khám phá bí mật của vũ trụ.",
    ],
  ]),
  134: rows([
    [
      "我家的网络今天不太好。",
      "wo3 jia1 de5 wang3 luo4 jin1 tian1 bu4 tai4 hao3",
      "Mạng nhà tôi hôm nay không ổn lắm.",
    ],
    [
      "你可以在网上搜索一下。",
      "ni3 ke3 yi3 zai4 wang3 shang4 sou1 suo3 yi1 xia4",
      "Bạn có thể tìm kiếm trên mạng thử.",
    ],
    ["这台电脑需要维修了。", "zhe4 tai2 dian4 nao3 xu1 yao4 wei2 xiu1 le5", "Cái máy tính này cần sửa rồi."],
  ]),
  135: rows([
    [
      "这部手机的性能非常好。",
      "zhe4 bu4 shou3 ji1 de5 xing4 neng2 fei1 chang2 hao3",
      "Chiếc điện thoại này có tính năng rất tốt.",
    ],
    [
      "电视的遥控器不知道放哪儿了。",
      "dian4 shi4 de5 yao2 kong4 qi4 bu4 zhi1 dao4 fang4 na3 er2 le5",
      "Không biết cái điều khiển tivi để đâu rồi.",
    ],
    ["电脑运行得太慢了。", "dian4 nao3 yun4 xing2 de2 tai4 man4 le5", "Máy tính chạy chậm quá."],
  ]),
  136: rows([
    [
      "多吃蔬菜可以补充纤维。",
      "duo1 chi1 shu1 cai4 ke3 yi3 bu3 chong1 xian1 wei2",
      "Ăn nhiều rau có thể bổ sung chất xơ.",
    ],
    ["山上的氧气比较少。", "shan1 shang4 de5 yang3 qi4 bi3 jiao4 shao3", "Trên núi khí ô xy khá ít."],
    [
      "这个想法还需要实验来验证。",
      "zhe4 ge5 xiang3 fa3 hai2 xu1 yao4 shi2 yan4 lai2 yan4 zheng4",
      "Ý tưởng này còn cần thí nghiệm để kiểm chứng.",
    ],
  ]),
  137: rows([
    ["他们俩上个月分手了。", "ta1 men5 lia3 shang4 ge4 yue4 fen1 shou3 le5", "Hai người họ chia tay tháng trước."],
    [
      "我一定会报答你的帮助。",
      "wo3 yi1 ding4 hui4 bao4 da2 ni3 de5 bang1 zhu4",
      "Tôi nhất định sẽ báo đáp sự giúp đỡ của bạn.",
    ],
    ["他发誓再也不抽烟了。", "ta1 fa1 shi4 zai4 ye3 bu4 chou1 yan1 le5", "Anh ấy thề sẽ không bao giờ hút thuốc nữa."],
  ]),
  138: rows([
    ["别吹牛了，谁信啊！", "bie2 chui1 niu2 le5 shui2 xin4 a5", "Đừng khoác lác nữa, ai mà tin!"],
    ["我不小心得罪了老板。", "wo3 bu4 xiao3 xin1 de2 zui5 le5 lao3 ban3", "Tôi vô tình làm mất lòng sếp."],
    ["别嘲笑别人的口音。", "bie2 chao2 xiao4 bie2 ren5 de5 kou3 yin1", "Đừng chế giễu giọng nói của người khác."],
  ]),
  139: rows([
    [
      "大年初一我们去给爷爷拜年。",
      "da4 nian2 chu1 yi1 wo3 men5 qu4 gei3 ye2 ye5 bai4 nian2",
      "Mùng một Tết chúng tôi đi chúc Tết ông nội.",
    ],
    ["这件事就拜托你了。", "zhe4 jian4 shi4 jiu4 bai4 tuo1 ni3 le5", "Việc này nhờ cả vào bạn nhé."],
    ["哎哟，我的脚好疼！", "ai1 yo1 wo3 de5 jiao3 hao3 teng2", "Ối, chân tôi đau quá!"],
  ]),
  140: rows([
    [
      "我想澄清一下这个误会。",
      "wo3 xiang3 cheng2 qing1 yi1 xia4 zhe4 ge5 wu4 hui4",
      "Tôi muốn làm sáng tỏ hiểu lầm này.",
    ],
    ["请你尽快给我答复。", "qing3 ni3 jin3 kuai4 gei3 wo3 da2 fu4", "Xin bạn sớm trả lời tôi."],
    ["请把我的意思传达给他。", "qing3 ba3 wo3 de5 yi4 si5 chuan2 da2 gei3 ta1", "Hãy truyền đạt ý của tôi cho anh ấy."],
  ]),
  141: rows([
    [
      "双方终于达成了协议。",
      "shuang1 fang1 zhong1 yu2 da2 cheng2 le5 xie2 yi4",
      "Hai bên cuối cùng đã đạt được thỏa thuận.",
    ],
    ["经理采纳了我的建议。", "jing1 li3 cai3 na4 le5 wo3 de5 jian4 yi4", "Giám đốc đã tiếp thu đề xuất của tôi."],
    [
      "我们在这个问题上有分歧。",
      "wo3 men5 zai4 zhe4 ge5 wen4 ti2 shang4 you3 fen1 qi2",
      "Chúng tôi có bất đồng về vấn đề này.",
    ],
  ]),
  142: rows([
    ["以后还请您多多关照。", "yi3 hou4 hai2 qing3 nin2 duo1 duo1 guan1 zhao4", "Sau này mong anh chị giúp đỡ nhiều."],
    [
      "您过奖了，我做得还不够好。",
      "nin2 guo4 jiang3 le5 wo3 zuo4 de2 hai2 bu4 gou4 hao3",
      "Anh quá khen rồi, tôi làm vẫn chưa đủ tốt.",
    ],
    [
      "我不会辜负大家的希望。",
      "wo3 bu4 hui4 gu1 fu4 da4 jia1 de5 xi1 wang4",
      "Tôi sẽ không phụ lòng mong đợi của mọi người.",
    ],
  ]),
  143: rows([
    [
      "别埋怨了，我们一起想办法吧。",
      "bie2 man2 yuan4 le5 wo3 men5 yi1 qi3 xiang3 ban4 fa3 ba5",
      "Đừng trách móc nữa, chúng ta cùng nghĩ cách nhé.",
    ],
    [
      "孩子哭了，妈妈赶紧去哄他。",
      "hai2 zi5 ku1 le5 ma1 ma5 gan3 jin3 qu4 hong3 ta1",
      "Đứa bé khóc, mẹ vội vàng đi dỗ nó.",
    ],
    [
      "他说话的口气很不客气。",
      "ta1 shuo1 hua4 de5 kou3 qi4 hen3 bu4 ke4 qi5",
      "Giọng điệu anh ta nói chuyện rất thiếu lịch sự.",
    ],
  ]),
  144: rows([
    ["过马路的时候要留神。", "guo4 ma3 lu4 de5 shi2 hou5 yao4 liu2 shen2", "Khi qua đường phải cẩn thận."],
    ["他这么做，真是活该。", "ta1 zhe4 me5 zuo4 zhen1 shi4 huo2 gai1", "Anh ta làm thế thì đúng là đáng đời."],
    [
      "好朋友之间不要太计较。",
      "hao3 peng2 you5 zhi1 jian1 bu4 yao4 tai4 ji4 jiao4",
      "Bạn thân với nhau thì đừng quá so đo.",
    ],
  ]),
  145: rows([
    ["他们俩相处得很融洽。", "ta1 men5 lia3 xiang1 chu3 de2 hen3 rong2 qia4", "Hai người họ chung sống rất hòa thuận."],
    [
      "谢谢你体谅我的难处。",
      "xie4 xie5 ni3 ti3 liang4 wo3 de5 nan2 chu4",
      "Cảm ơn bạn đã thông cảm cho cái khó của tôi.",
    ],
    [
      "说话要算数，不能骗人。",
      "shuo1 hua4 yao4 suan4 shu4 bu4 neng2 pian4 ren2",
      "Nói phải giữ lời, không được lừa người.",
    ],
  ]),
  146: rows([
    ["大孩子不能欺负小孩子。", "da4 hai2 zi5 bu4 neng2 qi1 fu5 xiao3 hai2 zi5", "Trẻ lớn không được bắt nạt trẻ nhỏ."],
    [
      "你别撒谎了，我都知道了。",
      "ni3 bie2 sa1 huang3 le5 wo3 dou1 zhi1 dao4 le5",
      "Đừng nói dối nữa, tôi biết hết rồi.",
    ],
    [
      "小心，这可能是一个圈套。",
      "xiao3 xin1 zhe4 ke3 neng2 shi4 yi1 ge4 quan1 tao4",
      "Cẩn thận, đây có thể là một cái bẫy.",
    ],
  ]),
  147: rows([
    [
      "我想向您请教一个问题。",
      "wo3 xiang3 xiang4 nin2 qing3 jiao4 yi1 ge4 wen4 ti2",
      "Tôi muốn hỏi ý kiến ngài về một vấn đề.",
    ],
    ["周末我去医院探望朋友。", "zhou1 mo4 wo3 qu4 yi1 yuan4 tan4 wang4 peng2 you5", "Cuối tuần tôi vào viện thăm bạn."],
    [
      "谢谢你们的盛情招待。",
      "xie4 xie5 ni3 men5 de5 sheng4 qing2 zhao1 dai4",
      "Cảm ơn sự tiếp đón nhiệt tình của các bạn.",
    ],
  ]),
  148: rows([
    [
      "我完全赞同你的看法。",
      "wo3 wan2 quan2 zan4 tong2 ni3 de5 kan4 fa3",
      "Tôi hoàn toàn tán thành quan điểm của bạn.",
    ],
    [
      "这不是你的错，我不会责怪你。",
      "zhe4 bu4 shi4 ni3 de5 cuo4 wo3 bu4 hui4 ze2 guai4 ni3",
      "Đây không phải lỗi của bạn, tôi sẽ không trách bạn.",
    ],
    ["别相信网上的谣言。", "bie2 xiang1 xin4 wang3 shang4 de5 yao2 yan2", "Đừng tin những tin đồn trên mạng."],
  ]),
  149: rows([
    [
      "他最近应酬太多，经常很晚回家。",
      "ta1 zui4 jin4 ying4 chou5 tai4 duo1 jing1 chang2 hen3 wan3 hui2 jia1",
      "Dạo này anh ấy tiếp khách nhiều quá, thường về nhà rất muộn.",
    ],
    [
      "请帮我向你父母转达我的问候。",
      "qing3 bang1 wo3 xiang4 ni3 fu4 mu3 zhuan3 da2 wo3 de5 wen4 hou4",
      "Nhờ bạn chuyển lời hỏi thăm của tôi tới bố mẹ bạn.",
    ],
    [
      "衷心感谢大家的帮助！",
      "zhong1 xin1 gan3 xie4 da4 jia1 de5 bang1 zhu4",
      "Chân thành cảm ơn sự giúp đỡ của mọi người!",
    ],
  ]),
  150: rows([
    [
      "孩子不能总是依赖父母。",
      "hai2 zi5 bu4 neng2 zong3 shi4 yi1 lai4 fu4 mu3",
      "Con cái không thể lúc nào cũng dựa dẫm vào bố mẹ.",
    ],
    [
      "你有什么事就说吧，别隐瞒我。",
      "ni3 you3 shen2 me5 shi4 jiu4 shuo1 ba5 bie2 yin3 man2 wo3",
      "Có chuyện gì thì cứ nói đi, đừng giấu tôi.",
    ],
    ["他总是为别人着想。", "ta1 zong3 shi4 wei4 bie2 ren5 zhuo2 xiang3", "Anh ấy luôn nghĩ cho người khác."],
  ]),
  151: rows([
    ["我巴不得马上放假。", "wo3 ba1 bu5 de5 ma3 shang4 fang4 jia4", "Tôi chỉ mong được nghỉ ngay lập tức."],
    [
      "他是个很有抱负的年轻人。",
      "ta1 shi4 ge4 hen3 you3 bao4 fu4 de5 nian2 qing1 ren2",
      "Anh ấy là người trẻ rất có hoài bão.",
    ],
    ["年轻人要能吃苦。", "nian2 qing1 ren2 yao4 neng2 chi1 ku3", "Người trẻ phải chịu được khổ."],
  ]),
  152: rows([
    ["打个比方，你就明白了。", "da3 ge4 bi3 fang5 ni3 jiu4 ming2 bai5 le5", "Lấy một ví dụ là bạn hiểu ngay."],
    ["这是一个很典型的例子。", "zhe4 shi4 yi1 ge4 hen3 dian3 xing2 de5 li4 zi3", "Đây là một ví dụ rất điển hình."],
    ["请按次序排好队。", "qing3 an4 ci4 xu4 pai2 hao3 dui4", "Xin xếp hàng theo thứ tự."],
  ]),
  153: rows([
    [
      "我分辨不出这两个声调。",
      "wo3 fen1 bian4 bu4 chu1 zhe4 liang3 ge4 sheng1 diao4",
      "Tôi không phân biệt được hai thanh điệu này.",
    ],
    ["你应该好好反思一下。", "ni3 ying1 gai1 hao3 hao3 fan3 si1 yi1 xia4", "Bạn nên tự suy ngẫm lại cho kỹ."],
    [
      "请对照答案检查一遍。",
      "qing3 dui4 zhao4 da2 an4 jian3 cha2 yi1 bian4",
      "Hãy đối chiếu đáp án kiểm tra một lượt.",
    ],
  ]),
  154: rows([
    [
      "我的记性不太好，经常忘事。",
      "wo3 de5 ji4 xing5 bu4 tai4 hao3 jing1 chang2 wang4 shi4",
      "Trí nhớ tôi không tốt lắm, hay quên việc.",
    ],
    [
      "生气的时候也要保持理智。",
      "sheng1 qi4 de5 shi2 hou5 ye3 yao4 bao3 chi2 li3 zhi4",
      "Lúc tức giận cũng phải giữ được lý trí.",
    ],
    [
      "他对这个问题有自己的见解。",
      "ta1 dui4 zhe4 ge5 wen4 ti2 you3 zi4 ji3 de5 jian4 jie3",
      "Anh ấy có quan điểm riêng về vấn đề này.",
    ],
  ]),
  155: rows([
    [
      "有什么顾虑你就直说吧。",
      "you3 shen2 me5 gu4 lü4 ni3 jiu4 zhi2 shuo1 ba5",
      "Có băn khoăn gì bạn cứ nói thẳng ra nhé.",
    ],
    ["你怎么看待这件事？", "ni3 zen3 me5 kan4 dai4 zhe4 jian4 shi4", "Bạn nhìn nhận chuyện này thế nào?"],
    ["别把这两个字混淆了。", "bie2 ba3 zhe4 liang3 ge4 zi4 hun4 xiao2 le5", "Đừng nhầm lẫn hai chữ này với nhau."],
  ]),
  156: rows([
    ["老师帮我纠正了发音。", "lao3 shi1 bang1 wo3 jiu1 zheng4 le5 fa1 yin1", "Cô giáo đã giúp tôi sửa phát âm."],
    [
      "我们可以借鉴别人的经验。",
      "wo3 men5 ke3 yi3 jie4 jian4 bie2 ren5 de5 jing1 yan4",
      "Chúng ta có thể học hỏi kinh nghiệm của người khác.",
    ],
    [
      "这次困难是对我们的考验。",
      "zhe4 ci4 kun4 nan5 shi4 dui4 wo3 men5 de5 kao3 yan4",
      "Khó khăn lần này là một thử thách đối với chúng ta.",
    ],
  ]),
  157: rows([
    ["你能区分这两个字吗？", "ni3 neng2 qu1 fen1 zhe4 liang3 ge4 zi4 ma5", "Bạn có phân biệt được hai chữ này không?"],
    [
      "他想了很久，权衡了利弊。",
      "ta1 xiang3 le5 hen3 jiu3 quan2 heng2 le5 li4 bi4",
      "Anh ấy nghĩ rất lâu, cân nhắc lợi hại.",
    ],
    [
      "我确信他明天一定会来。",
      "wo3 que4 xin4 ta1 ming2 tian1 yi1 ding4 hui4 lai2",
      "Tôi tin chắc ngày mai anh ấy nhất định sẽ đến.",
    ],
  ]),
  158: rows([
    [
      "我的梦想是去中国留学。",
      "wo3 de5 meng4 xiang3 shi4 qu4 zhong1 guo2 liu2 xue2",
      "Ước mơ của tôi là đi du học Trung Quốc.",
    ],
    [
      "旅行可以开阔我们的视野。",
      "lü3 xing2 ke3 yi3 kai1 kuo4 wo3 men5 de5 shi4 ye3",
      "Du lịch có thể mở rộng tầm nhìn của chúng ta.",
    ],
    [
      "我们不应该对别人有偏见。",
      "wo3 men5 bu4 ying1 gai1 dui4 bie2 ren5 you3 pian1 jian4",
      "Chúng ta không nên có định kiến với người khác.",
    ],
  ]),
  159: rows([
    [
      "结果完全出乎我的意料。",
      "jie2 guo3 wan2 quan2 chu1 hu1 wo3 de5 yi4 liao4",
      "Kết quả hoàn toàn nằm ngoài dự đoán của tôi.",
    ],
    [
      "这次考试的成绩比预期的好。",
      "zhe4 ci4 kao3 shi4 de5 cheng2 ji4 bi3 yu4 qi1 de5 hao3",
      "Điểm thi lần này tốt hơn dự kiến.",
    ],
    ["别指望他会帮你。", "bie2 zhi3 wang4 ta1 hui4 bang1 ni3", "Đừng trông mong anh ta sẽ giúp bạn."],
  ]),
  160: rows([
    [
      "你挑衣服的眼光真不错。",
      "ni3 tiao1 yi1 fu5 de5 yan3 guang1 zhen1 bu4 cuo4",
      "Bạn chọn quần áo có mắt nhìn thật tốt.",
    ],
    [
      "我琢磨了半天也没想明白。",
      "wo3 zhuo2 mo2 le5 ban4 tian1 ye3 mei2 xiang3 ming2 bai5",
      "Tôi ngẫm nghĩ cả buổi mà vẫn chưa hiểu ra.",
    ],
    [
      "这件事你要好好斟酌一下。",
      "zhe4 jian4 shi4 ni3 yao4 hao3 hao3 zhen1 zhuo2 yi1 xia4",
      "Việc này bạn phải cân nhắc kỹ một chút.",
    ],
  ]),
  161: rows([
    [
      "这件事请你一定要保密。",
      "zhe4 jian4 shi4 qing3 ni3 yi1 ding4 yao4 bao3 mi4",
      "Chuyện này bạn nhất định phải giữ bí mật.",
    ],
    ["重要的文件要记得备份。", "zhong4 yao4 de5 wen2 jian4 yao4 ji4 de5 bei4 fen4", "Tài liệu quan trọng nhớ sao lưu."],
    ["他的想法有点保守。", "ta1 de5 xiang3 fa3 you3 dian3 bao3 shou3", "Suy nghĩ của anh ấy hơi bảo thủ."],
  ]),
  162: rows([
    ["我搀着奶奶慢慢过马路。", "wo3 chan1 zhe5 nai3 nai5 man4 man4 guo4 ma3 lu4", "Tôi dìu bà từ từ qua đường."],
    ["他把饼干掰成两半。", "ta1 ba3 bing3 gan1 bai1 cheng2 liang3 ban4", "Cậu ấy bẻ chiếc bánh quy làm đôi."],
    [
      "冬天冷，搓搓手就暖和了。",
      "dong1 tian1 leng3 cuo1 cuo1 shou3 jiu4 nuan3 huo5 le5",
      "Mùa đông lạnh, xoa xoa tay là ấm ngay.",
    ],
  ]),
  163: rows([
    ["别一直盯着手机看。", "bie2 yi1 zhi2 ding1 zhuo2 shou3 ji1 kan4", "Đừng nhìn chằm chằm vào điện thoại mãi."],
    ["孩子高兴得又蹦又跳。", "hai2 zi5 gao1 xing4 de2 you4 beng4 you4 tiao4", "Đứa trẻ vui đến nhảy cẫng lên."],
    ["他瞪了我一眼。", "ta1 deng4 le5 wo3 yi1 yan3", "Anh ấy lườm tôi một cái."],
  ]),
  164: rows([
    ["周末我抽空去看看你。", "zhou1 mo4 wo3 chou1 kong4 qu4 kan4 kan4 ni3", "Cuối tuần tôi tranh thủ đi thăm bạn."],
    ["这件上衣和裤子很搭配。", "zhe4 jian4 shang4 yi1 he2 ku4 zi5 hen3 da1 pei4", "Cái áo này rất hợp với quần."],
    [
      "这个旧手机还能凑合用。",
      "zhe4 ge5 jiu4 shou3 ji1 hai2 neng2 cou4 he5 yong4",
      "Chiếc điện thoại cũ này vẫn dùng tạm được.",
    ],
  ]),
  165: rows([
    ["你先把包搁在桌子上吧。", "ni3 xian1 ba3 bao1 ge1 zai4 zhuo1 zi5 shang4 ba5", "Bạn để túi lên bàn trước đi."],
    [
      "今天天气好，把被子拿出去晾一晾。",
      "jin1 tian1 tian1 qi4 hao3 ba3 bei4 zi5 na2 chu1 qu4 liang4 yi1 liang4",
      "Hôm nay trời đẹp, mang chăn ra phơi đi.",
    ],
    [
      "忘了带伞，我被雨淋湿了。",
      "wang4 le5 dai4 san3 wo3 bei4 yu3 lin2 shi1 le5",
      "Quên mang ô nên tôi bị mưa ướt hết.",
    ],
  ]),
  166: rows([
    ["他向老师鞠躬问好。", "ta1 xiang4 lao3 shi1 ju1 gong1 wen4 hao3", "Cậu ấy cúi chào hỏi thăm thầy giáo."],
    [
      "听到这个消息，她愣了一下。",
      "ting1 dao4 zhe4 ge5 xiao1 xi5 ta1 leng4 le5 yi1 xia4",
      "Nghe tin này, cô ấy sững người một lúc.",
    ],
    [
      "上课的时候他偷偷溜出去了。",
      "shang4 ke4 de5 shi2 hou5 ta1 tou1 tou1 liu1 chu1 qu4 le5",
      "Trong giờ học cậu ấy lén chuồn ra ngoài.",
    ],
  ]),
  167: rows([
    [
      "这项工作进展得很顺利。",
      "zhe4 xiang4 gong1 zuo4 jin4 zhan3 de2 hen3 shun4 li4",
      "Công việc này tiến triển rất thuận lợi.",
    ],
    [
      "学过的生词要经常巩固。",
      "xue2 guo4 de5 sheng1 ci2 yao4 jing1 chang2 gong3 gu4",
      "Từ mới đã học cần thường xuyên củng cố.",
    ],
    ["年轻人总是充满活力。", "nian2 qing1 ren2 zong3 shi4 chong1 man3 huo2 li4", "Người trẻ luôn tràn đầy sức sống."],
  ]),
  168: rows([
    ["借的书要按时归还。", "jie4 de5 shu1 yao4 an4 shi2 gui1 huan2", "Sách mượn phải trả đúng hạn."],
    [
      "这部电影的结局很感人。",
      "zhe4 bu4 dian4 ying3 de5 jie2 ju2 hen3 gan3 ren2",
      "Đoạn kết của bộ phim này rất cảm động.",
    ],
    ["请大家不要践踏草地。", "qing3 da4 jia1 bu4 yao4 jian4 ta4 cao3 di4", "Mọi người xin đừng giẫm lên bãi cỏ."],
  ]),
  169: rows([
    ["别揉眼睛，对眼睛不好。", "bie2 rou2 yan3 jing5 dui4 yan3 jing5 bu4 hao3", "Đừng dụi mắt, không tốt cho mắt đâu."],
    [
      "他从口袋里掏出一张纸。",
      "ta1 cong2 kou3 dai4 li3 tao1 chu1 yi1 zhang1 zhi3",
      "Anh ấy móc từ trong túi ra một tờ giấy.",
    ],
    ["帮我把桌子挪一下。", "bang1 wo3 ba3 zhuo1 zi5 nuo2 yi1 xia4", "Giúp tôi xê dịch cái bàn một chút."],
  ]),
  170: rows([
    ["他趴在桌子上休息。", "ta1 pa1 zai4 zhuo1 zi5 shang4 xiu1 xi5", "Anh ấy gục xuống bàn nghỉ."],
    [
      "听了这个消息，她一直叹气。",
      "ting1 le5 zhe4 ge5 xiao1 xi5 ta1 yi1 zhi2 tan4 qi4",
      "Nghe tin này, cô ấy cứ thở dài mãi.",
    ],
    [
      "老师用手势让我们安静。",
      "lao3 shi1 yong4 shou3 shi4 rang4 wo3 men5 an1 jing4",
      "Thầy giáo ra hiệu bằng tay bảo chúng tôi im lặng.",
    ],
  ]),
  171: rows([
    [
      "父母不要给孩子施加太大压力。",
      "fu4 mu3 bu4 yao4 gei3 hai2 zi5 shi1 jia1 tai4 da4 ya1 li4",
      "Bố mẹ đừng gây áp lực quá lớn cho con.",
    ],
    [
      "我们要确保大家的安全。",
      "wo3 men5 yao4 que4 bao3 da4 jia1 de5 an1 quan2",
      "Chúng ta phải bảo đảm an toàn cho mọi người.",
    ],
    [
      "他的努力终于得到了大家的认可。",
      "ta1 de5 nu3 li4 zhong1 yu2 de2 dao4 le5 da4 jia1 de5 ren4 ke3",
      "Nỗ lực của anh ấy cuối cùng được mọi người công nhận.",
    ],
  ]),
  172: rows([
    [
      "他在第一轮比赛就被淘汰了。",
      "ta1 zai4 di4 yi1 lun2 bi3 sai4 jiu4 bei4 tao2 tai4 le5",
      "Anh ấy bị loại ngay vòng thi đầu tiên.",
    ],
    [
      "你不能违背自己的诺言。",
      "ni3 bu4 neng2 wei2 bei4 zi4 ji3 de5 nuo4 yan2",
      "Bạn không được làm trái lời hứa của mình.",
    ],
    ["病人已经脱离了危险。", "bing4 ren2 yi3 jing1 tuo1 li2 le5 wei1 xian3", "Bệnh nhân đã qua khỏi nguy hiểm."],
  ]),
  173: rows([
    [
      "不要强迫孩子学他不喜欢的东西。",
      "bu4 yao4 qiang3 po4 hai2 zi5 xue2 ta1 bu4 xi3 huan5 de5 dong1 xi5",
      "Đừng ép trẻ học thứ nó không thích.",
    ],
    ["她把头发染成了红色。", "ta1 ba3 tou2 fa5 ran3 cheng2 le5 hong2 se4", "Cô ấy nhuộm tóc thành màu đỏ."],
    [
      "这朵花散发出淡淡的香味。",
      "zhe4 duo3 hua1 san4 fa1 chu1 dan4 dan4 de5 xiang1 wei4",
      "Bông hoa này tỏa ra mùi thơm nhè nhẹ.",
    ],
  ]),
  174: rows([
    [
      "他笑了笑，想掩饰自己的紧张。",
      "ta1 xiao4 le5 xiao4 xiang3 yan3 shi4 zi4 ji3 de5 jin3 zhang1",
      "Anh ấy cười cười, muốn che giấu sự căng thẳng của mình.",
    ],
    [
      "我在地铁上遗失了一个钱包。",
      "wo3 zai4 di4 tie3 shang4 yi2 shi1 le5 yi1 ge4 qian2 bao1",
      "Tôi đánh rơi một cái ví trên tàu điện ngầm.",
    ],
    [
      "这次比赛让她展现了自己的才能。",
      "zhe4 ci4 bi3 sai4 rang4 ta1 zhan3 xian4 le5 zi4 ji3 de5 cai2 neng2",
      "Cuộc thi lần này giúp cô ấy thể hiện tài năng của mình.",
    ],
  ]),
  175: rows([
    [
      "别糟蹋粮食，吃多少拿多少。",
      "bie2 zao1 ta4 liang2 shi5 chi1 duo1 shao5 na2 duo1 shao5",
      "Đừng lãng phí đồ ăn, ăn bao nhiêu lấy bấy nhiêu.",
    ],
    ["他陷入了很深的思考。", "ta1 xian4 ru4 le5 hen3 shen1 de5 si1 kao3", "Anh ấy chìm vào suy nghĩ rất sâu."],
    [
      "费了很多周折，我们终于办好了签证。",
      "fei4 le5 hen3 duo1 zhou1 zhe2 wo3 men5 zhong1 yu2 ban4 hao3 le5 qian1 zheng4",
      "Trải qua nhiều trắc trở, cuối cùng chúng tôi đã làm xong thị thực.",
    ],
  ]),
  176: rows([
    [
      "别转移话题，回答我的问题。",
      "bie2 zhuan3 yi2 hua4 ti2 hui2 da2 wo3 de5 wen4 ti2",
      "Đừng đánh trống lảng, trả lời câu hỏi của tôi đi.",
    ],
    ["网络突然中断了。", "wang3 luo4 tu1 ran2 zhong1 duan4 le5", "Mạng đột nhiên bị gián đoạn."],
    [
      "那次旅行是我人生的转折点。",
      "na4 ci4 lü3 xing2 shi4 wo3 ren2 sheng1 de5 zhuan3 zhe2 dian3",
      "Chuyến đi đó là bước ngoặt của đời tôi.",
    ],
  ]),
  177: rows([
    [
      "奶奶拄着拐杖慢慢走过来。",
      "nai3 nai5 zhu3 zhe5 guai3 zhang4 man4 man4 zou3 guo4 lai2",
      "Bà chống gậy chậm rãi đi tới.",
    ],
    ["我的手指被针扎了一下。", "wo3 de5 shou3 zhi3 bei4 zhen1 zha1 le5 yi1 xia4", "Ngón tay tôi bị kim đâm một cái."],
    [
      "你的作息时间要有规律。",
      "ni3 de5 zuo4 xi1 shi2 jian1 yao4 you3 gui1 lü4",
      "Giờ giấc sinh hoạt của bạn phải điều độ.",
    ],
  ]),
  178: rows([
    [
      "你的到来给我们增添了很多快乐。",
      "ni3 de5 dao4 lai2 gei3 wo3 men5 zeng1 tian1 le5 hen3 duo1 kuai4 le4",
      "Bạn đến đã mang thêm cho chúng tôi rất nhiều niềm vui.",
    ],
    [
      "他努力抑制住自己的怒气。",
      "ta1 nu3 li4 yi4 zhi4 zhu4 zi4 ji3 de5 nu4 qi4",
      "Anh ấy cố gắng kìm nén cơn giận của mình.",
    ],
    ["跑步会消耗很多体力。", "pao3 bu4 hui4 xiao1 hao4 hen3 duo1 ti3 li4", "Chạy bộ sẽ tiêu hao rất nhiều thể lực."],
  ]),
  179: rows([
    ["他的病情突然恶化了。", "ta1 de5 bing4 qing2 tu1 ran2 e4 hua4 le5", "Bệnh tình của ông ấy đột nhiên xấu đi."],
    [
      "车发动不了了，怎么办？",
      "che1 fa1 dong4 bu4 liao3 le5 zen3 me5 ban4",
      "Xe không khởi động được, làm sao bây giờ?",
    ],
    ["我想摆脱这种生活。", "wo3 xiang3 bai3 tuo1 zhe4 zhong3 sheng1 huo2", "Tôi muốn thoát khỏi cuộc sống này."],
  ]),
  180: rows([
    ["他每天都精力充沛。", "ta1 mei3 tian1 dou1 jing1 li4 chong1 pei4", "Ngày nào anh ấy cũng tràn đầy sức lực."],
    ["这道菜超级好吃！", "zhe4 dao4 cai4 chao1 ji2 hao3 chi1", "Món này ngon cực kỳ!"],
    ["我的数学比较薄弱。", "wo3 de5 shu4 xue2 bi3 jiao4 bo2 ruo4", "Môn toán của tôi khá yếu."],
  ]),
  181: rows([
    [
      "这里太嘈杂了，我们换个地方吧。",
      "zhe4 li3 tai4 cao2 za2 le5 wo3 men5 huan4 ge4 di4 fang5 ba5",
      "Ở đây ồn quá, chúng ta đổi chỗ khác đi.",
    ],
    ["你把照片放颠倒了。", "ni3 ba3 zhao4 pian4 fang4 dian1 dao3 le5", "Bạn để ngược bức ảnh rồi."],
    ["她最喜欢粉色的裙子。", "ta1 zui4 xi3 huan5 fen3 se4 de5 qun2 zi5", "Cô ấy thích nhất váy màu hồng."],
  ]),
  182: rows([
    ["他们俩并列第一名。", "ta1 men5 lia3 bing4 lie4 di4 yi1 ming2", "Hai người họ đồng hạng nhất."],
    [
      "事情怎么会发展到这个地步？",
      "shi4 qing5 zen3 me5 hui4 fa1 zhan3 dao4 zhe4 ge5 di4 bu4",
      "Sao sự việc lại đến nông nỗi này?",
    ],
    [
      "我很理解你现在的处境。",
      "wo3 hen3 li3 jie3 ni3 xian4 zai4 de5 chu3 jing4",
      "Tôi rất hiểu hoàn cảnh hiện giờ của bạn.",
    ],
  ]),
  183: rows([
    ["你觉得这个办法可行吗？", "ni3 jue2 de5 zhe4 ge5 ban4 fa3 ke3 xing2 ma5", "Bạn thấy cách này có khả thi không?"],
    [
      "这本书的内容有点儿枯燥。",
      "zhe4 ben3 shu1 de5 nei4 rong2 you3 dian3 r5 ku1 zao4",
      "Nội dung cuốn sách này hơi khô khan.",
    ],
    ["祝你们生活幸福美满！", "zhu4 ni3 men5 sheng1 huo2 xing4 fu2 mei3 man3", "Chúc hai bạn sống hạnh phúc viên mãn!"],
  ]),
  184: rows([
    ["吃完饭不要做剧烈运动。", "chi1 wan2 fan4 bu4 yao4 zuo4 ju4 lie4 yun4 dong4", "Ăn xong đừng vận động mạnh."],
    ["狗的鼻子特别灵敏。", "gou3 de5 bi2 zi5 te4 bie2 ling2 min3", "Mũi chó đặc biệt nhạy."],
    [
      "买东西不要盲目跟别人学。",
      "mai3 dong1 xi5 bu4 yao4 mang2 mu4 gen1 bie2 ren5 xue2",
      "Mua đồ đừng bắt chước người khác một cách mù quáng.",
    ],
  ]),
  185: rows([
    [
      "大家都要遵守，你也不例外。",
      "da4 jia1 dou1 yao4 zun1 shou3 ni3 ye3 bu4 li4 wai4",
      "Ai cũng phải tuân thủ, bạn cũng không ngoại lệ.",
    ],
    [
      "考试的时候不要留空白。",
      "kao3 shi4 de5 shi2 hou5 bu4 yao4 liu2 kong4 bai2",
      "Khi làm bài thi đừng để trống chỗ nào.",
    ],
    ["这是一个难得的机遇。", "zhe4 shi4 yi1 ge4 nan2 de2 de5 ji1 yu4", "Đây là một cơ hội hiếm có."],
  ]),
  186: rows([
    ["这里的夜景真迷人。", "zhe4 li3 de5 ye4 jing3 zhen1 mi2 ren2", "Cảnh đêm ở đây thật quyến rũ."],
    [
      "灯光很柔和，让人很放松。",
      "deng1 guang1 hen3 rou2 he2 rang4 ren2 hen3 fang4 song1",
      "Ánh đèn rất dịu, khiến người ta thư giãn.",
    ],
    [
      "他是一个平凡的人，但很善良。",
      "ta1 shi4 yi1 ge4 ping2 fan2 de5 ren2 dan4 hen3 shan4 liang2",
      "Anh ấy là người bình thường nhưng rất tốt bụng.",
    ],
  ]),
  187: rows([
    [
      "春天的天气很适宜出去旅游。",
      "chun1 tian1 de5 tian1 qi4 hen3 shi4 yi2 chu1 qu4 lü3 you2",
      "Thời tiết mùa xuân rất thích hợp để đi du lịch.",
    ],
    [
      "很久没说汉语，有点生疏了。",
      "hen3 jiu3 mei2 shuo1 han4 yu3 you3 dian3 sheng1 shu1 le5",
      "Lâu rồi không nói tiếng Trung nên hơi lụt.",
    ],
    [
      "别勉强自己，累了就休息。",
      "bie2 mian3 qiang3 zi4 ji3 lei4 le5 jiu4 xiu1 xi5",
      "Đừng gượng ép bản thân, mệt thì nghỉ.",
    ],
  ]),
  188: rows([
    [
      "这个房间能容纳一百人。",
      "zhe4 ge5 fang2 jian1 neng2 rong2 na4 yi1 bai3 ren2",
      "Căn phòng này chứa được một trăm người.",
    ],
    [
      "这次火灾是人为造成的。",
      "zhe4 ci4 huo3 zai1 shi4 ren2 wei2 zao4 cheng2 de5",
      "Vụ hỏa hoạn này do con người gây ra.",
    ],
    [
      "每个人都有自己的缺陷。",
      "mei3 ge4 ren2 dou1 you3 zi4 ji3 de5 que1 xian4",
      "Ai cũng có khuyết điểm của riêng mình.",
    ],
  ]),
  189: rows([
    [
      "她以优异的成绩考上了大学。",
      "ta1 yi3 you1 yi4 de5 cheng2 ji4 kao3 shang4 le5 da4 xue2",
      "Cô ấy đỗ đại học với thành tích xuất sắc.",
    ],
    [
      "这次活动取得了圆满成功。",
      "zhe4 ci4 huo2 dong4 qu3 de2 le5 yuan2 man3 cheng2 gong1",
      "Hoạt động lần này đã thành công tốt đẹp.",
    ],
    [
      "他穿了一身崭新的衣服。",
      "ta1 chuan1 le5 yi1 shen1 zhan3 xin1 de5 yi1 fu5",
      "Anh ấy mặc một bộ quần áo mới tinh.",
    ],
  ]),
  190: rows([
    [
      "他的基础很扎实，学得很快。",
      "ta1 de5 ji1 chu3 hen3 zha1 shi5 xue2 de2 hen3 kuai4",
      "Nền tảng của cậu ấy rất vững, học rất nhanh.",
    ],
    [
      "老人和孩子可以优先上车。",
      "lao3 ren2 he2 hai2 zi5 ke3 yi3 you1 xian1 shang4 che1",
      "Người già và trẻ em được ưu tiên lên xe trước.",
    ],
    [
      "她做事非常细致，从不出错。",
      "ta1 zuo4 shi4 fei1 chang2 xi4 zhi4 cong2 bu4 chu1 cuo4",
      "Cô ấy làm việc rất tỉ mỉ, chưa bao giờ sai sót.",
    ],
  ]),
  191: rows([
    [
      "这条路太狭窄了，车开不进去。",
      "zhe4 tiao2 lu4 tai4 xia2 zhai3 le5 che1 kai1 bu4 jin4 qu4",
      "Con đường này quá chật hẹp, xe không vào được.",
    ],
    ["今天热得要命！", "jin1 tian1 re4 de2 yao4 ming4", "Hôm nay nóng kinh khủng!"],
    [
      "我隐约听见有人在叫我。",
      "wo3 yin3 yue1 ting1 jian4 you3 ren2 zai4 jiao4 wo3",
      "Tôi loáng thoáng nghe thấy có người đang gọi mình.",
    ],
  ]),
  192: rows([
    [
      "这栋楼一共有二十层。",
      "zhe4 dong4 lou2 yi1 gong4 you3 er4 shi2 ceng2",
      "Tòa nhà này có tổng cộng hai mươi tầng.",
    ],
    ["我买了一串葡萄。", "wo3 mai3 le5 yi1 chuan4 pu2 tao5", "Tôi mua một chùm nho."],
    ["价格上涨了三个百分点。", "jia4 ge2 shang4 zhang3 le5 san1 ge4 bai3 fen1 dian3", "Giá đã tăng ba điểm phần trăm."],
  ]),
  193: rows([
    [
      "他在比赛中获得了三枚金牌。",
      "ta1 zai4 bi3 sai4 zhong1 huo4 de2 le5 san1 mei2 jin1 pai2",
      "Anh ấy giành được ba huy chương vàng trong cuộc thi.",
    ],
    ["明天局部地区有小雨。", "ming2 tian1 ju2 bu4 di4 qu1 you3 xiao3 yu3", "Ngày mai một số khu vực có mưa nhỏ."],
    [
      "这次旅行共计花了五千块。",
      "zhe4 ci4 lü3 xing2 gong4 ji4 hua1 le5 wu3 qian1 kuai4",
      "Chuyến đi lần này tổng cộng tốn năm nghìn tệ.",
    ],
  ]),
  194: rows([
    ["我送了妈妈一束漂亮的花。", "wo3 song4 le5 ma1 ma5 yi1 shu4 piao4 liang5 de5 hua1", "Tôi tặng mẹ một bó hoa đẹp."],
    [
      "远处的海上有一艘小船。",
      "yuan3 chu4 de5 hai3 shang4 you3 yi1 sou1 xiao3 chuan2",
      "Trên biển đằng xa có một chiếc thuyền nhỏ.",
    ],
    [
      "今天最高气温三十摄氏度。",
      "jin1 tian1 zui4 gao1 qi4 wen1 san1 shi2 she4 shi4 du4",
      "Hôm nay nhiệt độ cao nhất là ba mươi độ C.",
    ],
  ]),
  195: rows([
    [
      "我们俩的年龄相差不大。",
      "wo3 men5 lia3 de5 nian2 ling2 xiang1 cha4 bu4 da4",
      "Tuổi của hai chúng tôi chênh lệch không nhiều.",
    ],
    [
      "老师把同学们分成了四组。",
      "lao3 shi1 ba3 tong2 xue2 men5 fen1 cheng2 le5 si4 zu3",
      "Giáo viên chia các bạn học thành bốn nhóm.",
    ],
    ["我大概七点左右到家。", "wo3 da4 gai4 qi1 dian3 zuo3 you4 dao4 jia1", "Tôi về đến nhà khoảng chừng bảy giờ."],
  ]),
  196: rows([
    [
      "有问题最好当面说清楚。",
      "you3 wen4 ti2 zui4 hao3 dang1 mian4 shuo1 qing1 chu5",
      "Có vấn đề thì tốt nhất nói rõ trực tiếp với nhau.",
    ],
    [
      "他成天玩手机，不想学习。",
      "ta1 cheng2 tian1 wan2 shou3 ji1 bu4 xiang3 xue2 xi2",
      "Cậu ấy suốt ngày chơi điện thoại, không muốn học.",
    ],
    [
      "每逢过年，我们都回老家。",
      "mei3 feng2 guo4 nian2 wo3 men5 dou1 hui2 lao3 jia1",
      "Mỗi khi Tết đến, chúng tôi đều về quê.",
    ],
  ]),
  197: rows([
    ["我只是随便问问而已。", "wo3 zhi3 shi4 sui2 bian4 wen4 wen4 er2 yi3", "Tôi chỉ hỏi bâng quơ thôi."],
    ["你不妨试试这个办法。", "ni3 bu4 fang2 shi4 shi4 zhe4 ge5 ban4 fa3", "Bạn cứ thử cách này xem sao."],
    ["事情并非你想的那样。", "shi4 qing5 bing4 fei1 ni3 xiang3 de5 na4 yang4", "Sự việc hoàn toàn không như bạn nghĩ."],
  ]),
  198: rows([
    ["对不起，我不是成心的。", "dui4 bu5 qi3 wo3 bu4 shi4 cheng2 xin1 de5", "Xin lỗi, tôi không cố ý."],
    ["大不了从头再来。", "da4 bu4 liao3 cong2 tou2 zai4 lai2", "Cùng lắm thì làm lại từ đầu."],
    [
      "听到这个消息，她不禁哭了。",
      "ting1 dao4 zhe4 ge5 xiao1 xi5 ta1 bu4 jin1 ku1 le5",
      "Nghe tin này, cô ấy không kìm được mà khóc.",
    ],
  ]),
  199: rows([
    ["即便下雨，我们也要去。", "ji2 bian4 xia4 yu3 wo3 men5 ye3 yao4 qu4", "Cho dù trời mưa, chúng ta vẫn đi."],
    ["或许他已经到家了。", "huo4 xu3 ta1 yi3 jing1 dao4 jia1 le5", "Có lẽ anh ấy đã về đến nhà rồi."],
    [
      "天太晚了，况且你也累了。",
      "tian1 tai4 wan3 le5 kuang4 qie3 ni3 ye3 lei4 le5",
      "Trời muộn quá rồi, hơn nữa bạn cũng mệt rồi.",
    ],
  ]),
  200: rows([
    [
      "请你尽快给我回电话。",
      "qing3 ni3 jin3 kuai4 gei3 wo3 hui2 dian4 hua4",
      "Bạn gọi lại cho tôi càng sớm càng tốt nhé.",
    ],
    ["他近来工作特别忙。", "ta1 jin4 lai2 gong1 zuo4 te4 bie2 mang2", "Gần đây anh ấy làm việc đặc biệt bận."],
    [
      "有病要及早去医院看看。",
      "you3 bing4 yao4 ji2 zao3 qu4 yi1 yuan4 kan4 kan4",
      "Có bệnh thì phải sớm đến bệnh viện khám.",
    ],
  ]),
  201: rows([
    ["嘿，你怎么也在这儿？", "hei1 ni3 zen3 me5 ye3 zai4 zhe4 er2", "Ê, sao bạn cũng ở đây?"],
    ["我们终于到家啦！", "wo3 men5 zhong1 yu2 dao4 jia1 la1", "Cuối cùng chúng ta cũng về đến nhà rồi!"],
    ["你别过于担心，没事的。", "ni3 bie2 guo4 yu2 dan1 xin1 mei2 shi4 de5", "Bạn đừng lo lắng quá, không sao đâu."],
  ]),
  202: rows([
    ["多穿点衣服，免得感冒。", "duo1 chuan1 dian3 yi1 fu5 mian3 de5 gan3 mao4", "Mặc thêm áo vào kẻo bị cảm."],
    [
      "我宁愿走路，也不想坐车。",
      "wo3 ning4 yuan4 zou3 lu4 ye3 bu4 xiang3 zuo4 che1",
      "Tôi thà đi bộ chứ không muốn ngồi xe.",
    ],
    ["算了，我们明天再去吧。", "suan4 le5 wo3 men5 ming2 tian1 zai4 qu4 ba5", "Thôi bỏ đi, mai mình đi vậy."],
  ]),
  203: rows([
    [
      "我明明告诉过你，你怎么忘了？",
      "wo3 ming2 ming2 gao4 su5 guo4 ni3 ni3 zen3 me5 wang4 le5",
      "Tôi rõ ràng đã nói với bạn rồi, sao bạn lại quên?",
    ],
    [
      "起初我不习惯，后来就好了。",
      "qi3 chu1 wo3 bu4 xi2 guan4 hou4 lai2 jiu4 hao3 le5",
      "Lúc đầu tôi không quen, sau đó thì ổn.",
    ],
    ["今天他比往常来得早。", "jin1 tian1 ta1 bi3 wang3 chang2 lai2 de5 zao3", "Hôm nay anh ấy đến sớm hơn mọi khi."],
  ]),
  204: rows([
    ["哇，这里的风景真美！", "wa1 zhe4 li3 de5 feng1 jing3 zhen1 mei3", "Ôi, phong cảnh ở đây đẹp quá!"],
    [
      "出门的时候请随手关门。",
      "chu1 men2 de5 shi2 hou5 qing3 sui2 shou3 guan1 men2",
      "Khi ra ngoài xin tiện tay đóng cửa.",
    ],
    ["你想吃啥就点啥。", "ni3 xiang3 chi1 sha2 jiu4 dian3 sha2", "Bạn muốn ăn gì thì gọi món đó."],
  ]),
  205: rows([
    [
      "幸好你提醒了我，不然我就忘了。",
      "xing4 hao3 ni3 ti2 xing3 le5 wo3 bu4 ran2 wo3 jiu4 wang4 le5",
      "May mà bạn nhắc tôi, không thì tôi quên mất rồi.",
    ],
    [
      "明天的会议你务必准时参加。",
      "ming2 tian1 de5 hui4 yi4 ni3 wu4 bi4 zhun3 shi2 can1 jia1",
      "Cuộc họp ngày mai bạn nhất định phải đến đúng giờ.",
    ],
    ["请大家依次排队上车。", "qing3 da4 jia1 yi1 ci4 pai2 dui4 shang4 che1", "Mời mọi người lần lượt xếp hàng lên xe."],
  ]),
  206: rows([
    [
      "快走吧，要不然就迟到了。",
      "kuai4 zou3 ba5 yao4 bu4 ran2 jiu4 chi2 dao4 le5",
      "Đi nhanh lên, nếu không sẽ muộn mất.",
    ],
    ["出门多穿点，以免感冒。", "chu1 men2 duo1 chuan1 dian3 yi3 mian3 gan3 mao4", "Ra ngoài mặc thêm áo, kẻo bị cảm."],
    [
      "孩子终究是孩子，别太严格了。",
      "hai2 zi5 zhong1 jiu1 shi4 hai2 zi5 bie2 tai4 yan2 ge2 le5",
      "Trẻ con rốt cuộc vẫn là trẻ con, đừng quá nghiêm khắc.",
    ],
  ]),
  207: rows([
    ["我是专程来看你的。", "wo3 shi4 zhuan1 cheng2 lai2 kan4 ni3 de5", "Tôi cất công đến thăm bạn đấy."],
    ["诸位，请安静一下。", "zhu1 wei4 qing3 an1 jing4 yi1 xia4", "Thưa quý vị, xin hãy giữ yên lặng một chút."],
    ["你咋还没睡觉？", "ni3 za3 hai2 mei2 shui4 jiao4", "Sao bạn vẫn chưa ngủ?"],
  ]),
  208: rows([
    ["学外语不能半途而废。", "xue2 wai4 yu3 bu4 neng2 ban4 tu2 er2 fei4", "Học ngoại ngữ không được bỏ dở giữa chừng."],
    [
      "他总是丢三落四的，又忘带钥匙了。",
      "ta1 zong3 shi4 diu1 san1 la4 si4 de5 you4 wang4 dai4 yao4 shi5 le5",
      "Anh ấy lúc nào cũng hay quên, lại quên mang chìa khóa rồi.",
    ],
    [
      "这本书我真是爱不释手。",
      "zhe4 ben3 shu1 wo3 zhen1 shi4 ai4 bu4 shi4 shou3",
      "Cuốn sách này tôi thật sự thích mê không rời tay.",
    ],
  ]),
  209: rows([
    ["中国文化博大精深。", "zhong1 guo2 wen2 hua4 bo2 da4 jing1 shen1", "Văn hóa Trung Quốc rộng lớn và sâu sắc."],
    ["街上的车川流不息。", "jie1 shang4 de5 che1 chuan1 liu2 bu4 xi1", "Xe cộ trên đường nối nhau không dứt."],
    [
      "他们俩的水平不相上下。",
      "ta1 men5 lia3 de5 shui3 ping2 bu4 xiang1 shang4 xia4",
      "Trình độ của hai người họ ngang nhau.",
    ],
  ]),
  210: rows([
    [
      "开会的时候大家各抒己见。",
      "kai1 hui4 de5 shi2 hou5 da4 jia1 ge4 shu1 ji3 jian4",
      "Khi họp, mọi người đều nói lên ý kiến riêng của mình.",
    ],
    [
      "他做事总是精益求精。",
      "ta1 zuo4 shi4 zong3 shi4 jing1 yi4 qiu2 jing1",
      "Anh ấy làm việc gì cũng muốn tốt hơn nữa.",
    ],
    [
      "学习语言不能急于求成。",
      "xue2 xi2 yu3 yan2 bu4 neng2 ji2 yu2 qiu2 cheng2",
      "Học ngoại ngữ thì không thể nóng vội.",
    ],
  ]),
  211: rows([
    [
      "这家店的面包供不应求。",
      "zhe4 jia1 dian4 de5 mian4 bao1 gong1 bu4 ying4 qiu2",
      "Bánh mì của tiệm này cung không đủ cầu.",
    ],
    [
      "长城是举世闻名的地方。",
      "chang2 cheng2 shi4 ju3 shi4 wen2 ming2 de5 di4 fang5",
      "Vạn Lý Trường Thành là nơi nổi tiếng khắp thế giới.",
    ],
    [
      "这件事刻不容缓，我们马上去办。",
      "zhe4 jian4 shi4 ke4 bu4 rong2 huan3 wo3 men5 ma3 shang4 qu4 ban4",
      "Việc này không thể chậm trễ, chúng ta đi làm ngay.",
    ],
  ]),
  212: rows([
    [
      "孩子们听故事听得津津有味。",
      "hai2 zi5 men5 ting1 gu4 shi5 ting1 de2 jin1 jin1 you3 wei4",
      "Bọn trẻ nghe kể chuyện say sưa thích thú.",
    ],
    [
      "听了他的解释，我恍然大悟。",
      "ting1 le5 ta1 de5 jie3 shi4 wo3 huang3 ran2 da4 wu4",
      "Nghe anh ấy giải thích xong, tôi chợt hiểu ra.",
    ],
    [
      "别画蛇添足了，这样就很好。",
      "bie2 hua4 she2 tian1 zu2 le5 zhe4 yang4 jiu4 hen3 hao3",
      "Đừng vẽ rắn thêm chân nữa, thế này là tốt rồi.",
    ],
  ]),
  213: rows([
    ["他迫不及待地打开了礼物。", "ta1 po4 bu4 ji2 dai4 di4 da3 kai1 le5 li3 wu4", "Anh ấy nóng lòng mở món quà ra."],
    [
      "我们要齐心协力完成这个任务。",
      "wo3 men5 yao4 qi2 xin1 xie2 li4 wan2 cheng2 zhe4 ge5 ren4 wu5",
      "Chúng ta phải đồng lòng hợp sức hoàn thành nhiệm vụ này.",
    ],
    [
      "这件事对他来说轻而易举。",
      "zhe4 jian4 shi4 dui4 ta1 lai2 shuo1 qing1 er2 yi4 ju3",
      "Việc này đối với anh ấy dễ như trở bàn tay.",
    ],
  ]),
  214: rows([
    [
      "她一说起旅行就滔滔不绝。",
      "ta1 yi1 shuo1 qi3 lü3 xing2 jiu4 tao1 tao1 bu4 jue2",
      "Hễ nói đến du lịch là cô ấy nói không ngớt.",
    ],
    [
      "在市场买东西可以讨价还价。",
      "zai4 shi4 chang3 mai3 dong1 xi5 ke3 yi3 tao3 jia4 huan2 jia4",
      "Mua đồ ở chợ có thể mặc cả.",
    ],
    [
      "看到妈妈，他热泪盈眶。",
      "kan4 dao4 ma1 ma5 ta1 re4 lei4 ying2 kuang4",
      "Nhìn thấy mẹ, anh ấy rưng rưng nước mắt.",
    ],
  ]),
  215: rows([
    ["他今天怎么无精打采的？", "ta1 jin1 tian1 zen3 me5 wu2 jing1 da3 cai3 de5", "Hôm nay sao anh ấy trông ủ rũ thế?"],
    [
      "孩子们兴高采烈地去公园玩了。",
      "hai2 zi5 men5 xing4 gao1 cai3 lie4 di4 qu4 gong1 yuan2 wan2 le5",
      "Bọn trẻ vui vẻ phấn khởi đi công viên chơi.",
    ],
    [
      "妈妈对我的照顾无微不至。",
      "ma1 ma5 dui4 wo3 de5 zhao4 gu5 wu2 wei1 bu4 zhi4",
      "Mẹ chăm sóc tôi chu đáo từng li từng tí.",
    ],
  ]),
  216: rows([
    [
      "学语言要循序渐进，不能着急。",
      "xue2 yu3 yan2 yao4 xun2 xu4 jian4 jin4 bu4 neng2 zhao2 ji2",
      "Học ngôn ngữ phải tiến từng bước, không được nóng vội.",
    ],
    [
      "骑车上班既省钱又锻炼身体，一举两得。",
      "qi2 che1 shang4 ban1 ji4 sheng3 qian2 you4 duan4 lian4 shen1 ti3 yi1 ju3 liang3 de2",
      "Đạp xe đi làm vừa tiết kiệm vừa rèn luyện sức khỏe, một công đôi việc.",
    ],
    [
      "这次考得不错，再接再厉！",
      "zhe4 ci4 kao3 de2 bu4 cuo4 zai4 jie1 zai4 li4",
      "Lần này thi khá tốt, cố gắng hơn nữa nhé!",
    ],
  ]),
  217: rows([
    [
      "这家小店的东西物美价廉。",
      "zhe4 jia1 xiao3 dian4 de5 dong1 xi5 wu4 mei3 jia4 lian2",
      "Đồ ở cửa hàng nhỏ này vừa tốt vừa rẻ.",
    ],
    [
      "祝你一路顺风，一帆风顺！",
      "zhu4 ni3 yi1 lu4 shun4 feng1 yi1 fan1 feng1 shun4",
      "Chúc bạn thượng lộ bình an, thuận buồm xuôi gió!",
    ],
    [
      "我丢了工作，又生了病，真是雪上加霜。",
      "wo3 diu1 le5 gong1 zuo4 you4 sheng1 le5 bing4 zhen1 shi4 xue3 shang4 jia1 shuang1",
      "Tôi mất việc lại còn bị ốm, đúng là họa vô đơn chí.",
    ],
  ]),
};
