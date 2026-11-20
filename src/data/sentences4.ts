import type { Sentence } from "./sentences";

/**
 * Practice sentences for HSK 4, keyed by lesson id. Sentences are AI drafted; pinyin was generated with
 * pinyin-pro (citation tones, 5 = neutral) and still needs a reviewer for polyphonic characters.
 */
type Row = [hanzi: string, pinyin: string, vi: string];
const rows = (list: Row[]): Sentence[] => list.map(([hanzi, pinyin, vi]) => ({ hanzi, pinyin, vi }));

export const SENTENCES4: Record<number, Sentence[]> = {
  1: rows([
    ["春节我们去看亲戚。", "chun1 jie2 wo3 men5 qu4 kan4 qin1 qi5", "Tết chúng tôi đi thăm họ hàng."],
    ["咱们俩一起去吧。", "zan2 men5 lia3 yi1 qi3 qu4 ba5", "Hai chúng ta cùng đi nhé."],
    ["我父亲是在北京出生的。", "wo3 fu4 qin1 shi4 zai4 bei3 jing1 chu1 sheng1 de5", "Bố tôi sinh ra ở Bắc Kinh."],
  ]),
  2: rows([
    ["今天晚上我有个约会。", "jin1 tian1 wan3 shang5 wo3 you3 ge4 yue1 hui4", "Tối nay tôi có một cuộc hẹn."],
    [
      "她每天都打扮得很漂亮。",
      "ta1 mei3 tian1 dou1 da3 ban5 de2 hen3 piao4 liang5",
      "Ngày nào cô ấy cũng ăn diện rất đẹp.",
    ],
    ["你戴眼镜真帅！", "ni3 dai4 yan3 jing4 zhen1 shuai4", "Bạn đeo kính trông đẹp trai thật!"],
  ]),
  3: rows([
    ["我肚子很难受。", "wo3 du4 zi5 hen3 nan2 shou4", "Bụng tôi khó chịu lắm."],
    ["大夫说你要少抽烟。", "dai4 fu5 shuo1 ni3 yao4 shao3 chou1 yan1", "Bác sĩ nói bạn phải bớt hút thuốc."],
    ["孩子咳嗽了三天了。", "hai2 zi5 ke2 sou5 le5 san1 tian1 le5", "Đứa bé ho ba ngày rồi."],
  ]),
  4: rows([
    ["我太困了，想躺一会儿。", "wo3 tai4 kun4 le5 xiang3 tang3 yi1 hui4 r5", "Tôi buồn ngủ quá, muốn nằm một lát."],
    ["他个子很高，力气也很大。", "ta1 ge4 zi5 hen3 gao1 li4 qi5 ye3 hen3 da4", "Anh ấy rất cao, sức cũng rất khỏe."],
    ["昨天晚上我做了一个梦。", "zuo2 tian1 wan3 shang5 wo3 zuo4 le5 yi1 ge4 meng4", "Tối qua tôi đã mơ một giấc mơ."],
  ]),
  5: rows([
    ["今天我的心情不太好。", "jin1 tian1 wo3 de5 xin1 qing2 bu4 tai4 hao3", "Hôm nay tâm trạng tôi không tốt lắm."],
    ["别伤心了，下次再来。", "bie2 shang1 xin1 le5 xia4 ci4 zai4 lai2", "Đừng buồn nữa, lần sau lại đến."],
    [
      "这么热的天，我真受不了。",
      "zhe4 me5 re4 de5 tian1 wo3 zhen1 shou4 bu4 liao3",
      "Trời nóng thế này, tôi thật không chịu nổi.",
    ],
  ]),
  6: rows([
    ["考试前我有点儿紧张。", "kao3 shi4 qian2 wo3 you3 dian3 r5 jin3 zhang1", "Trước khi thi tôi hơi hồi hộp."],
    ["这个电影让我很感动。", "zhe4 ge5 dian4 ying3 rang4 wo3 hen3 gan3 dong4", "Bộ phim này làm tôi rất cảm động."],
    ["我真羡慕你的工作。", "wo3 zhen1 xian4 mu4 ni3 de5 gong1 zuo4", "Tôi thật ngưỡng mộ công việc của bạn."],
  ]),
  7: rows([
    ["他的性格很活泼。", "ta1 de5 xing4 ge2 hen3 huo2 po5", "Tính cách anh ấy rất hoạt bát."],
    ["做题的时候别太粗心。", "zuo4 ti2 de5 shi2 hou5 bie2 tai4 cu1 xin1", "Khi làm bài đừng quá cẩu thả."],
    [
      "每个人都有优点和缺点。",
      "mei3 ge4 ren2 dou1 you3 you1 dian3 he2 que1 dian3",
      "Ai cũng có ưu điểm và khuyết điểm.",
    ],
  ]),
  8: rows([
    ["我们的老师很幽默。", "wo3 men5 de5 lao3 shi1 hen3 you1 mo4", "Thầy giáo chúng tôi rất hài hước."],
    ["你先冷静一下。", "ni3 xian1 leng3 jing4 yi1 xia4", "Bạn bình tĩnh lại một chút đã."],
    ["她对孩子非常有耐心。", "ta1 dui4 hai2 zi5 fei1 chang2 you3 nai4 xin1", "Cô ấy rất kiên nhẫn với trẻ con."],
  ]),
  9: rows([
    ["你尝尝这个汤。", "ni3 chang2 chang2 zhe4 ge5 tang1", "Bạn nếm thử món canh này đi."],
    ["菜太咸了，别放盐了。", "cai4 tai4 xian2 le5 bie2 fang4 yan2 le5", "Món ăn mặn quá, đừng cho muối nữa."],
    ["这个菜又酸又辣。", "zhe4 ge5 cai4 you4 suan1 you4 la4", "Món này vừa chua vừa cay."],
  ]),
  10: rows([
    ["为我们的友谊干杯！", "wei4 wo3 men5 de5 you3 yi4 gan1 bei1", "Cạn ly vì tình bạn của chúng ta!"],
    [
      "今天我请客，大家随便吃。",
      "jin1 tian1 wo3 qing3 ke4 da4 jia1 sui2 bian4 chi1",
      "Hôm nay tôi mời, mọi người cứ ăn tự nhiên.",
    ],
    [
      "盒子里还有两块巧克力。",
      "he2 zi5 li3 hai2 you3 liang3 kuai4 qiao3 ke4 li4",
      "Trong hộp vẫn còn hai miếng sô cô la.",
    ],
  ]),
  11: rows([
    ["请把毛巾挂在墙上。", "qing3 ba3 mao2 jin1 gua4 zai4 qiang2 shang4", "Hãy treo khăn lên tường."],
    ["我的钥匙在沙发上。", "wo3 de5 yao4 shi5 zai4 sha1 fa1 shang4", "Chìa khóa của tôi ở trên ghế sofa."],
    ["有人在敲门。", "you3 ren2 zai4 qiao1 men2", "Có người đang gõ cửa."],
  ]),
  12: rows([
    [
      "你的房间太乱了，快收拾一下。",
      "ni3 de5 fang2 jian1 tai4 luan4 le5 kuai4 shou1 shi5 yi1 xia4",
      "Phòng bạn bừa quá, mau dọn dẹp đi.",
    ],
    ["这件衣服破了，扔了吧。", "zhe4 jian4 yi1 fu5 po4 le5 reng1 le5 ba5", "Cái áo này rách rồi, vứt đi thôi."],
    ["我们租的房子很整齐。", "wo3 men5 zu1 de5 fang2 zi5 hen3 zheng3 qi2", "Căn nhà chúng tôi thuê rất gọn gàng."],
  ]),
  13: rows([
    [
      "周末我们去商店逛逛吧。",
      "zhou1 mo4 wo3 men5 qu4 shang1 dian4 guang4 guang4 ba5",
      "Cuối tuần mình đi dạo cửa hàng nhé.",
    ],
    ["这件衣服正在打折。", "zhe4 jian4 yi1 fu5 zheng4 zai4 da3 zhe2", "Chiếc áo này đang giảm giá."],
    [
      "你可以试一下，看合适不合适。",
      "ni3 ke3 yi3 shi4 yi1 xia4 kan4 he2 shi4 bu4 he2 shi4",
      "Bạn có thể mặc thử xem có vừa không.",
    ],
  ]),
  14: rows([
    ["我去银行取点儿钱。", "wo3 qu4 yin2 hang2 qu3 dian3 er2 qian2", "Tôi đi ngân hàng rút ít tiền."],
    [
      "别浪费，我们要节约用水。",
      "bie2 lang4 fei4 wo3 men5 yao4 jie2 yue1 yong4 shui3",
      "Đừng lãng phí, chúng ta phải tiết kiệm nước.",
    ],
    [
      "这个月的钱只剩一点儿了。",
      "zhe4 ge5 yue4 de5 qian2 zhi1 sheng4 yi1 dian3 er2 le5",
      "Tiền tháng này chỉ còn lại một ít.",
    ],
  ]),
  15: rows([
    ["快走吧，还来得及。", "kuai4 zou3 ba5 hai2 lai2 de5 ji2", "Đi nhanh thôi, vẫn còn kịp."],
    ["会议推迟到明天了。", "hui4 yi4 tui1 chi2 dao4 ming2 tian1 le5", "Cuộc họp hoãn sang ngày mai rồi."],
    ["我们下个月放暑假。", "wo3 men5 xia4 ge4 yue4 fang4 shu3 jia4", "Tháng sau chúng tôi nghỉ hè."],
  ]),
  16: rows([
    ["我平时很少看电视。", "wo3 ping2 shi2 hen3 shao3 kan4 dian4 shi4", "Ngày thường tôi ít khi xem ti vi."],
    ["你将来想做什么？", "ni3 jiang1 lai2 xiang3 zuo4 shen2 me5", "Sau này bạn muốn làm gì?"],
    ["原来你也在这儿！", "yuan2 lai2 ni3 ye3 zai4 zhe4 er2", "Hóa ra bạn cũng ở đây!"],
  ]),
  17: rows([
    ["北方的冬天很干燥。", "bei3 fang1 de5 dong1 tian1 hen3 gan1 zao4", "Mùa đông miền Bắc rất hanh khô."],
    ["今天的温度很低。", "jin1 tian1 de5 wen1 du4 hen3 di1", "Nhiệt độ hôm nay rất thấp."],
    [
      "这里的空气污染很严重。",
      "zhe4 li3 de5 kong1 qi4 wu1 ran3 hen3 yan2 zhong4",
      "Ô nhiễm không khí ở đây rất nghiêm trọng.",
    ],
  ]),
  18: rows([
    ["这里的风景真美！", "zhe4 li3 de5 feng1 jing3 zhen1 mei3", "Phong cảnh ở đây đẹp thật!"],
    ["我们要保护地球。", "wo3 men5 yao4 bao3 hu4 di4 qiu2", "Chúng ta phải bảo vệ trái đất."],
    ["秋天的叶子都黄了。", "qiu1 tian1 de5 ye4 zi5 dou1 huang2 le5", "Lá mùa thu đều vàng cả rồi."],
  ]),
  19: rows([
    ["早上上班经常堵车。", "zao3 shang5 shang4 ban1 jing1 chang2 du3 che1", "Buổi sáng đi làm hay bị tắc đường."],
    ["银行就在学校对面。", "yin2 hang2 jiu4 zai4 xue2 jiao4 dui4 mian4", "Ngân hàng ở ngay đối diện trường học."],
    ["开车太快很危险。", "kai1 che1 tai4 kuai4 hen3 wei1 xian3", "Lái xe quá nhanh rất nguy hiểm."],
  ]),
  20: rows([
    ["飞机马上就要起飞了。", "fei1 ji1 ma3 shang4 jiu4 yao4 qi3 fei1 le5", "Máy bay sắp cất cánh rồi."],
    [
      "我下周要去上海出差。",
      "wo3 xia4 zhou1 yao4 qu4 shang4 hai3 chu1 chai1",
      "Tuần sau tôi phải đi công tác Thượng Hải.",
    ],
    ["你的签证办好了吗？", "ni3 de5 qian1 zheng4 ban4 hao3 le5 ma5", "Visa của bạn làm xong chưa?"],
  ]),
  21: rows([
    [
      "导游带我们参观了长城。",
      "dao3 you2 dai4 wo3 men5 can1 guan1 le5 chang2 cheng2",
      "Hướng dẫn viên dẫn chúng tôi tham quan Trường Thành.",
    ],
    ["晚上的夜市非常热闹。", "wan3 shang5 de5 ye4 shi4 fei1 chang2 re4 nao5", "Chợ đêm buổi tối vô cùng nhộn nhịp."],
    ["一直往前走就到了。", "yi1 zhi2 wang3 qian2 zou3 jiu4 dao4 le5", "Cứ đi thẳng về phía trước là tới."],
  ]),
  22: rows([
    ["你是什么专业的？", "ni3 shi4 shen2 me5 zhuan1 ye4 de5", "Bạn học chuyên ngành gì?"],
    [
      "明年我想去中国留学。",
      "ming2 nian2 wo3 xiang3 qu4 zhong1 guo2 liu2 xue2",
      "Năm sau tôi muốn đi du học Trung Quốc.",
    ],
    ["他毕业以后当了老师。", "ta1 bi4 ye4 yi3 hou4 dang1 le5 lao3 shi1", "Sau khi tốt nghiệp anh ấy làm giáo viên."],
  ]),
  23: rows([
    ["她的中文说得很流利。", "ta1 de5 zhong1 wen2 shuo1 de2 hen3 liu2 li4", "Cô ấy nói tiếng Trung rất lưu loát."],
    ["这个词你可以查词典。", "zhe4 ge5 ci2 ni3 ke3 yi3 cha2 ci2 dian3", "Từ này bạn có thể tra từ điển."],
    ["上课前要先预习。", "shang4 ke4 qian2 yao4 xian1 yu4 xi2", "Trước giờ học phải chuẩn bị bài trước."],
  ]),
  24: rows([
    [
      "请帮我复印一下这份材料。",
      "qing3 bang1 wo3 fu4 yin4 yi1 xia4 zhe4 fen4 cai2 liao4",
      "Làm ơn photo giúp tôi tập tài liệu này.",
    ],
    ["我今天晚上要加班。", "wo3 jin1 tian1 wan3 shang5 yao4 jia1 ban1", "Tối nay tôi phải tăng ca."],
    [
      "我明天想请假去医院。",
      "wo3 ming2 tian1 xiang3 qing3 jia4 qu4 yi1 yuan4",
      "Ngày mai tôi muốn xin nghỉ để đi bệnh viện.",
    ],
  ]),
  25: rows([
    ["这家公司正在招聘。", "zhe4 jia1 gong1 si1 zheng4 zai4 zhao1 pin4", "Công ty này đang tuyển người."],
    ["他有很多工作经验。", "ta1 you3 hen3 duo1 gong1 zuo4 jing1 yan4", "Anh ấy có nhiều kinh nghiệm làm việc."],
    [
      "师傅，去火车站多少钱？",
      "shi1 fu5 qu4 huo3 che1 zhan4 duo1 shao5 qian2",
      "Bác ơi, đi ga tàu hết bao nhiêu tiền?",
    ],
  ]),
  26: rows([
    ["这件事由我负责。", "zhe4 jian4 shi4 you2 wo3 fu4 ze2", "Việc này do tôi phụ trách."],
    ["最近工作压力很大。", "zui4 jin4 gong1 zuo4 ya1 li4 hen3 da4", "Dạo này áp lực công việc rất lớn."],
    [
      "坚持下去，你一定会成功。",
      "jian1 chi2 xia4 qu4 ni3 yi1 ding4 hui4 cheng2 gong1",
      "Cứ kiên trì, bạn nhất định sẽ thành công.",
    ],
  ]),
  27: rows([
    ["他在上海做生意。", "ta1 zai4 shang4 hai3 zuo4 sheng1 yi4", "Anh ấy làm ăn ở Thượng Hải."],
    [
      "这里的经济发展得很快。",
      "zhe4 li3 de5 jing1 ji4 fa1 zhan3 de2 hen3 kuai4",
      "Kinh tế ở đây phát triển rất nhanh.",
    ],
    [
      "这家店的东西质量很好。",
      "zhe4 jia1 dian4 de5 dong1 xi5 zhi4 liang4 hen3 hao3",
      "Đồ của cửa hàng này chất lượng rất tốt.",
    ],
  ]),
  28: rows([
    ["这里禁止抽烟。", "zhe4 li3 jin4 zhi3 chou1 yan1", "Ở đây cấm hút thuốc."],
    ["我保证下次不迟到了。", "wo3 bao3 zheng4 xia4 ci4 bu4 chi2 dao4 le5", "Tôi cam đoan lần sau không đến muộn nữa."],
    ["小心别被人骗了。", "xiao3 xin1 bie2 bei4 ren2 pian4 le5", "Cẩn thận đừng để bị người ta lừa."],
  ]),
  29: rows([
    ["这篇文章写得很好。", "zhe4 pian1 wen2 zhang1 xie3 de2 hen3 hao3", "Bài viết này viết rất hay."],
    ["我有一个好消息告诉你。", "wo3 you3 yi1 ge4 hao3 xiao1 xi5 gao4 su5 ni3", "Tôi có một tin vui muốn báo bạn."],
    [
      "这本小说的内容很有意思。",
      "zhe4 ben3 xiao3 shuo1 de5 nei4 rong2 hen3 you3 yi4 si5",
      "Nội dung cuốn tiểu thuyết này rất thú vị.",
    ],
  ]),
  30: rows([
    ["今天的演出非常精彩。", "jin1 tian1 de5 yan3 chu1 fei1 chang2 jing1 cai3", "Buổi diễn hôm nay vô cùng đặc sắc."],
    ["观众都在鼓掌。", "guan1 zhong4 dou1 zai4 gu3 zhang3", "Khán giả đều đang vỗ tay."],
    ["她会弹钢琴。", "ta1 hui4 tan2 gang1 qin2", "Cô ấy biết chơi đàn piano."],
  ]),
  31: rows([
    ["我们打羽毛球吧。", "wo3 men5 da3 yu3 mao2 qiu2 ba5", "Chúng ta chơi cầu lông đi."],
    ["昨天的比赛我们赢了。", "zuo2 tian1 de5 bi3 sai4 wo3 men5 ying2 le5", "Trận đấu hôm qua chúng tôi thắng rồi."],
    ["吃完饭去散步吧。", "chi1 wan2 fan4 qu4 san4 bu4 ba5", "Ăn xong đi dạo nhé."],
  ]),
  32: rows([
    ["你的电话号码是多少？", "ni3 de5 dian4 hua4 hao4 ma3 shi4 duo1 shao5", "Số điện thoại của bạn là bao nhiêu?"],
    ["这个方法效果很好。", "zhe4 ge5 fang1 fa3 xiao4 guo3 hen3 hao3", "Cách này hiệu quả rất tốt."],
    [
      "现代科学技术发展得很快。",
      "xian4 dai4 ke1 xue2 ji4 shu4 fa1 zhan3 de2 hen3 kuai4",
      "Khoa học kỹ thuật hiện đại phát triển rất nhanh.",
    ],
  ]),
  33: rows([
    ["对不起，打扰一下。", "dui4 bu5 qi3 da3 rao3 yi1 xia4", "Xin lỗi, làm phiền một chút."],
    ["祝贺你找到新工作！", "zhu4 he4 ni3 zhao3 dao4 xin1 gong1 zuo4", "Chúc mừng bạn tìm được việc mới!"],
    [
      "你别误会，我不是这个意思。",
      "ni3 bie2 wu4 hui4 wo3 bu4 shi4 zhe4 ge5 yi4 si5",
      "Bạn đừng hiểu lầm, tôi không có ý đó.",
    ],
  ]),
  34: rows([
    ["我们以后常联系吧。", "wo3 men5 yi3 hou4 chang2 lian2 xi4 ba5", "Sau này chúng ta liên lạc thường xuyên nhé."],
    ["别生气，我跟你开玩笑呢。", "bie2 sheng1 qi4 wo3 gen1 ni3 kai1 wan2 xiao4 ne5", "Đừng giận, tôi đùa bạn thôi mà."],
    [
      "这件事我们再商量商量。",
      "zhe4 jian4 shi4 wo3 men5 zai4 shang1 liang5 shang1 liang5",
      "Việc này chúng ta bàn thêm nhé.",
    ],
  ]),
  35: rows([
    ["朋友之间要互相帮助。", "peng2 you5 zhi1 jian1 yao4 hu4 xiang1 bang1 zhu4", "Bạn bè phải giúp đỡ lẫn nhau."],
    ["谢谢你一直支持我。", "xie4 xie5 ni3 yi1 zhi2 zhi1 chi2 wo3", "Cảm ơn bạn luôn ủng hộ tôi."],
    ["他们俩又吵起来了。", "ta1 men5 lia3 you4 chao3 qi3 lai5 le5", "Hai người họ lại cãi nhau rồi."],
  ]),
  36: rows([
    ["你猜我今天买了什么？", "ni3 cai1 wo3 jin1 tian1 mai3 le5 shen2 me5", "Bạn đoán xem hôm nay tôi mua gì?"],
    ["这是个好主意！", "zhe4 shi4 ge4 hao3 zhu3 yi5", "Đây là một ý hay!"],
    ["让我再考虑一下。", "rang4 wo3 zai4 kao3 lü4 yi1 xia4", "Để tôi suy nghĩ thêm một chút."],
  ]),
  37: rows([
    ["你的理想是什么？", "ni3 de5 li3 xiang3 shi4 shen2 me5", "Ước mơ của bạn là gì?"],
    ["考试的结果出来了吗？", "kao3 shi4 de5 jie2 guo3 chu1 lai2 le5 ma5", "Kết quả thi có chưa?"],
    [
      "我对这次比赛很有信心。",
      "wo3 dui4 zhe4 ci4 bi3 sai4 hen3 you3 xin4 xin1",
      "Tôi rất tự tin vào cuộc thi lần này.",
    ],
  ]),
  38: rows([
    ["这里发生了什么事？", "zhe4 li3 fa1 sheng1 le5 shen2 me5 shi4", "Ở đây đã xảy ra chuyện gì?"],
    ["对不起，我不是故意的。", "dui4 bu5 qi3 wo3 bu4 shi4 gu4 yi4 de5", "Xin lỗi, tôi không cố ý."],
    ["今年很流行这种衣服。", "jin1 nian2 hen3 liu2 xing2 zhe4 zhong3 yi1 fu5", "Năm nay loại áo này rất thịnh hành."],
  ]),
  39: rows([
    ["我的手机丢了。", "wo3 de5 shou3 ji1 diu1 le5", "Điện thoại của tôi mất rồi."],
    ["你明天要交作业。", "ni3 ming2 tian1 yao4 jiao1 zuo4 ye4", "Ngày mai bạn phải nộp bài tập."],
    ["我给你发了一封邮件。", "wo3 gei3 ni3 fa1 le5 yi1 feng1 you2 jian4", "Tôi đã gửi cho bạn một email."],
  ]),
  40: rows([
    [
      "我们明天早上八点集合。",
      "wo3 men5 ming2 tian1 zao3 shang5 ba1 dian3 ji2 he2",
      "Tám giờ sáng mai chúng ta tập trung.",
    ],
    ["她想成为一名医生。", "ta1 xiang3 cheng2 wei2 yi1 ming2 yi1 sheng1", "Cô ấy muốn trở thành bác sĩ."],
    [
      "要养成早睡早起的习惯。",
      "yao4 yang3 cheng2 zao3 shui4 zao3 qi3 de5 xi2 guan4",
      "Phải tập thói quen ngủ sớm dậy sớm.",
    ],
  ]),
  41: rows([
    ["你习惯这里的生活了吗？", "ni3 xi2 guan4 zhe4 li3 de5 sheng1 huo2 le5 ma5", "Bạn quen cuộc sống ở đây chưa?"],
    ["有困难就告诉我。", "you3 kun4 nan5 jiu4 gao4 su5 wo3", "Có khó khăn thì cứ nói với tôi."],
    ["祝你一切顺利！", "zhu4 ni3 yi1 qie4 shun4 li4", "Chúc bạn mọi việc suôn sẻ!"],
  ]),
  42: rows([
    ["这条路太窄了。", "zhe4 tiao2 lu4 tai4 zhai3 le5", "Con đường này hẹp quá."],
    [
      "房间里有点儿暗，开灯吧。",
      "fang2 jian1 li3 you3 dian3 r5 an4 kai1 deng1 ba5",
      "Trong phòng hơi tối, bật đèn lên đi.",
    ],
    ["这张床太硬了。", "zhe4 zhang1 chuang2 tai4 ying4 le5", "Cái giường này cứng quá."],
  ]),
  43: rows([
    ["你辛苦了，休息一下吧。", "ni3 xin1 ku3 le5 xiu1 xi5 yi1 xia4 ba5", "Bạn vất vả rồi, nghỉ một chút đi."],
    ["这个问题太复杂了。", "zhe4 ge5 wen4 ti2 tai4 fu4 za2 le5", "Vấn đề này phức tạp quá."],
    ["请说得详细一点儿。", "qing3 shuo1 de2 xiang2 xi4 yi1 dian3 er2", "Làm ơn nói chi tiết hơn một chút."],
  ]),
  44: rows([
    ["请再说一遍。", "qing3 zai4 shuo1 yi1 bian4", "Làm ơn nói lại một lần nữa."],
    ["门口有一棵大树。", "men2 kou3 you3 yi1 ke1 da4 shu4", "Trước cửa có một cái cây to."],
    ["我去了一趟超市。", "wo3 qu4 le5 yi1 tang4 chao1 shi4", "Tôi đã đi siêu thị một chuyến."],
  ]),
  45: rows([
    ["你千万别忘了。", "ni3 qian1 wan4 bie2 wang4 le5", "Bạn nhất định đừng quên nhé."],
    ["我至少要睡七个小时。", "wo3 zhi4 shao3 yao4 shui4 qi1 ge4 xiao3 shi2", "Tôi phải ngủ ít nhất bảy tiếng."],
    ["所有的同学都来了。", "suo3 you3 de5 tong2 xue2 dou1 lai2 le5", "Tất cả các bạn học đều đến rồi."],
  ]),
  46: rows([
    [
      "他不但聪明，而且很努力。",
      "ta1 bu4 dan4 cong1 ming5 er2 qie3 hen3 nu3 li4",
      "Anh ấy không những thông minh mà còn rất chăm chỉ.",
    ],
    ["快走吧，否则要迟到了。", "kuai4 zou3 ba5 fou3 ze2 yao4 chi2 dao4 le5", "Đi nhanh thôi, nếu không sẽ muộn mất."],
    ["只要你努力，就能学好。", "zhi3 yao4 ni3 nu3 li4 jiu4 neng2 xue2 hao3", "Chỉ cần bạn cố gắng là sẽ học tốt."],
  ]),
  47: rows([
    ["下雨了，我们只好在家。", "xia4 yu3 le5 wo3 men5 zhi3 hao3 zai4 jia1", "Trời mưa rồi, chúng tôi đành ở nhà."],
    ["请按照顺序排队。", "qing3 an4 zhao4 shun4 xu4 pai2 dui4", "Hãy xếp hàng theo thứ tự."],
    ["我不得不早点儿回家。", "wo3 bu4 de2 bu4 zao3 dian3 er2 hui2 jia1", "Tôi buộc phải về nhà sớm một chút."],
  ]),
  48: rows([
    ["这件衣服挺好看的。", "zhe4 jian4 yi1 fu5 ting3 hao3 kan4 de5", "Chiếc áo này khá đẹp."],
    ["我们差不多到了。", "wo3 men5 cha4 bu5 duo1 dao4 le5", "Chúng ta sắp tới nơi rồi."],
    ["请你稍微等一下。", "qing3 ni3 shao1 wei1 deng3 yi1 xia4", "Bạn đợi một chút nhé."],
  ]),
  49: rows([
    ["你到底去不去？", "ni3 dao4 di3 qu4 bu4 qu4", "Rốt cuộc bạn có đi hay không?"],
    ["难道你不知道吗？", "nan2 dao4 ni3 bu4 zhi1 dao4 ma5", "Lẽ nào bạn không biết sao?"],
    ["外面忽然下起雨来了。", "wai4 mian4 hu1 ran2 xia4 qi3 yu3 lai2 le5", "Bên ngoài bỗng nhiên đổ mưa."],
  ]),
  50: rows([
    [
      "你回来的时候顺便买点儿水。",
      "ni3 hui2 lai2 de5 shi2 hou5 shun4 bian4 mai3 dian3 er2 shui3",
      "Lúc về bạn tiện mua ít nước nhé.",
    ],
    ["天气逐渐暖和了。", "tian1 qi4 zhu2 jian4 nuan3 huo5 le5", "Thời tiết dần dần ấm lên rồi."],
    ["你最好早点儿睡觉。", "ni3 zui4 hao3 zao3 dian3 er2 shui4 jiao4", "Tốt nhất bạn nên đi ngủ sớm."],
  ]),
  51: rows([
    ["这个月底我要回国。", "zhe4 ge5 yue4 di3 wo3 yao4 hui2 guo2", "Cuối tháng này tôi phải về nước."],
    ["他连饭都没吃就走了。", "ta1 lian2 fan4 dou1 mei2 chi1 jiu4 zou3 le5", "Anh ấy cơm cũng chưa ăn đã đi rồi."],
    [
      "我对中国文化很感兴趣。",
      "wo3 dui4 zhong1 guo2 wen2 hua4 hen3 gan3 xing4 qu4",
      "Tôi rất hứng thú với văn hóa Trung Quốc.",
    ],
  ]),
};
