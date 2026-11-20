import type { Sentence } from "./sentences";

/**
 * Practice sentences for HSK 5, keyed by lesson id. Sentences are AI drafted; pinyin was generated with
 * pinyin-pro (citation tones, 5 = neutral) and still needs a reviewer for polyphonic characters.
 */
type Row = [hanzi: string, pinyin: string, vi: string];
const rows = (list: Row[]): Sentence[] => list.map(([hanzi, pinyin, vi]) => ({ hanzi, pinyin, vi }));

export const SENTENCES5: Record<number, Sentence[]> = {
  1: rows([
    ["我姑姑在北京当医生。", "wo3 gu1 gu5 zai4 bei3 jing1 dang1 yi1 sheng1", "Cô tôi làm bác sĩ ở Bắc Kinh."],
    [
      "周末我常常帮妈妈做家务。",
      "zhou1 mo4 wo3 chang2 chang2 bang1 ma1 ma5 zuo4 jia1 wu4",
      "Cuối tuần tôi thường giúp mẹ làm việc nhà.",
    ],
    ["我很想念家乡的姥姥。", "wo3 hen3 xiang3 nian4 jia1 xiang1 de5 lao3 lao5", "Tôi rất nhớ bà ngoại ở quê."],
  ]),
  2: rows([
    [
      "他们下个月就要举行婚礼了。",
      "ta1 men5 xia4 ge4 yue4 jiu4 yao4 ju3 xing2 hun1 li3 le5",
      "Tháng sau họ sẽ tổ chức đám cưới.",
    ],
    [
      "你姐姐现在有对象了吗？",
      "ni3 jie3 jie5 xian4 zai4 you3 dui4 xiang4 le5 ma5",
      "Chị gái bạn bây giờ có người yêu chưa?",
    ],
    [
      "两个人在一起，偶尔吵架很正常。",
      "liang3 ge4 ren2 zai4 yi1 qi3 ou3 er3 chao3 jia4 hen3 zheng4 chang2",
      "Hai người ở bên nhau, thỉnh thoảng cãi nhau là chuyện bình thường.",
    ],
  ]),
  3: rows([
    [
      "他一辈子都很孝顺父母。",
      "ta1 yi1 bei4 zi5 dou1 hen3 xiao4 shun4 fu4 mu3",
      "Cả đời anh ấy luôn hiếu thảo với bố mẹ.",
    ],
    [
      "爷爷去世的时候年纪已经很大了。",
      "ye2 ye5 qu4 shi4 de5 shi2 hou5 nian2 ji4 yi3 jing1 hen3 da4 le5",
      "Khi ông qua đời, tuổi ông đã rất cao.",
    ],
    [
      "奶奶最疼爱的就是小孙子。",
      "nai3 nai5 zui4 teng2 ai4 de5 jiu4 shi4 xiao3 sun1 zi5",
      "Người bà thương nhất chính là đứa cháu trai nhỏ.",
    ],
  ]),
  4: rows([
    [
      "这个小伙子长得又高又英俊。",
      "zhe4 ge5 xiao3 huo3 zi5 chang2 de2 you4 gao1 you4 ying1 jun4",
      "Chàng trai này vừa cao vừa đẹp trai.",
    ],
    [
      "她每天跑步，身材一直很苗条。",
      "ta1 mei3 tian1 pao3 bu4 shen1 cai2 yi1 zhi2 hen3 miao2 tiao5",
      "Cô ấy chạy bộ mỗi ngày nên dáng người lúc nào cũng thon thả.",
    ],
    [
      "青春只有一次，要好好珍惜。",
      "qing1 chun1 zhi3 you3 yi1 ci4 yao4 hao3 hao3 zhen1 xi1",
      "Tuổi trẻ chỉ có một lần, phải biết trân trọng.",
    ],
  ]),
  5: rows([
    ["我今天脖子有点儿疼。", "wo3 jin1 tian1 bo2 zi5 you3 dian3 r5 teng2", "Hôm nay cổ tôi hơi đau."],
    [
      "他天天去锻炼，肌肉很结实。",
      "ta1 tian1 tian1 qu4 duan4 lian4 ji1 rou4 hen3 jie1 shi5",
      "Ngày nào anh ấy cũng đi tập, cơ bắp rất rắn chắc.",
    ],
    [
      "外面太冷了，我冷得发抖。",
      "wai4 mian4 tai4 leng3 le5 wo3 leng3 de2 fa1 dou3",
      "Ngoài trời lạnh quá, tôi lạnh đến run người.",
    ],
  ]),
  6: rows([
    ["我对花生过敏，不能吃。", "wo3 dui4 hua1 sheng1 guo4 min3 bu4 neng2 chi1", "Tôi dị ứng lạc, không ăn được."],
    ["快打电话叫救护车！", "kuai4 da3 dian4 hua4 jiao4 jiu4 hu4 che1", "Mau gọi điện gọi xe cứu thương!"],
    [
      "医生说不要紧，休息几天就能恢复。",
      "yi1 sheng1 shuo1 bu4 yao4 jin3 xiu1 xi5 ji3 tian1 jiu4 neng2 hui1 fu4",
      "Bác sĩ nói không sao, nghỉ vài hôm là hồi phục.",
    ],
  ]),
  7: rows([
    [
      "我嗓子疼，今天不想说话。",
      "wo3 sang3 zi5 teng2 jin1 tian1 bu4 xiang3 shuo1 hua4",
      "Tôi đau họng nên hôm nay không muốn nói chuyện.",
    ],
    [
      "他坐了一天，腰有点儿疼。",
      "ta1 zuo4 le5 yi1 tian1 yao1 you3 dian3 r5 teng2",
      "Anh ấy ngồi cả ngày nên hơi đau lưng.",
    ],
    ["吃得太快对胃不好。", "chi1 de2 tai4 kuai4 dui4 wei4 bu4 hao3", "Ăn quá nhanh không tốt cho dạ dày."],
  ]),
  8: rows([
    [
      "晚上别穿太少，小心着凉。",
      "wan3 shang5 bie2 chuan1 tai4 shao3 xiao3 xin1 zhao2 liang2",
      "Buổi tối đừng mặc quá ít, cẩn thận bị cảm lạnh.",
    ],
    [
      "医生说他需要马上做手术。",
      "yi1 sheng1 shuo1 ta1 xu1 yao4 ma3 shang4 zuo4 shou3 shu4",
      "Bác sĩ nói anh ấy cần phẫu thuật ngay.",
    ],
    [
      "最近我经常失眠，白天很疲劳。",
      "zui4 jin4 wo3 jing1 chang2 shi1 mian2 bai2 tian1 hen3 pi2 lao2",
      "Dạo này tôi hay mất ngủ nên ban ngày rất mệt.",
    ],
  ]),
  9: rows([
    ["唉，今天怎么又下雨了？", "ai4 jin1 tian1 zen3 me5 you4 xia4 yu3 le5", "Haizz, sao hôm nay lại mưa nữa?"],
    [
      "别灰心，下次一定会成功的。",
      "bie2 hui1 xin1 xia4 ci4 yi1 ding4 hui4 cheng2 gong1 de5",
      "Đừng nản lòng, lần sau nhất định sẽ thành công.",
    ],
    [
      "一个人住在国外有时候很寂寞。",
      "yi1 ge4 ren2 zhu4 zai4 guo2 wai4 you3 shi2 hou5 hen3 ji4 mo4",
      "Sống một mình ở nước ngoài đôi khi rất cô đơn.",
    ],
  ]),
  10: rows([
    [
      "这个孩子很调皮，但是很聪明。",
      "zhe4 ge5 hai2 zi5 hen3 tiao2 pi2 dan4 shi4 hen3 cong1 ming5",
      "Đứa bé này nghịch ngợm nhưng rất thông minh.",
    ],
    [
      "他是个老实人，从来不说谎。",
      "ta1 shi4 ge4 lao3 shi5 ren2 cong2 lai2 bu4 shuo1 huang3",
      "Anh ấy là người thật thà, chưa bao giờ nói dối.",
    ],
    [
      "你真糊涂，怎么又忘带钥匙了？",
      "ni3 zhen1 hu2 tu5 zen3 me5 you4 wang4 dai4 yao4 shi5 le5",
      "Bạn lơ mơ thật, sao lại quên mang chìa khóa nữa?",
    ],
  ]),
  11: rows([
    [
      "我们要爱护身边的小动物。",
      "wo3 men5 yao4 ai4 hu4 shen1 bian1 de5 xiao3 dong4 wu4",
      "Chúng ta phải yêu quý những con vật nhỏ quanh mình.",
    ],
    [
      "她哭了，你快去安慰她吧。",
      "ta1 ku1 le5 ni3 kuai4 qu4 an1 wei4 ta1 ba5",
      "Cô ấy khóc rồi, bạn mau đi an ủi cô ấy đi.",
    ],
    [
      "谢谢你的帮助，我非常感激。",
      "xie4 xie5 ni3 de5 bang1 zhu4 wo3 fei1 chang2 gan3 ji1",
      "Cảm ơn sự giúp đỡ của bạn, tôi vô cùng biết ơn.",
    ],
  ]),
  12: rows([
    ["不好意思，我来晚了。", "bu4 hao3 yi4 si5 wo3 lai2 wan3 le5", "Xin lỗi, tôi đến muộn."],
    [
      "今天真倒霉，手机也丢了。",
      "jin1 tian1 zhen1 dao3 mei2 shou3 ji1 ye3 diu1 le5",
      "Hôm nay xui thật, điện thoại cũng mất.",
    ],
    ["我不喜欢看恐怖电影。", "wo3 bu4 xi3 huan5 kan4 kong3 bu4 dian4 ying3", "Tôi không thích xem phim kinh dị."],
  ]),
  13: rows([
    [
      "她又善良又热心，大家都喜欢她。",
      "ta1 you4 shan4 liang2 you4 re4 xin1 da4 jia1 dou1 xi3 huan5 ta1",
      "Cô ấy vừa tốt bụng vừa nhiệt tình, ai cũng quý cô ấy.",
    ],
    [
      "他很能干，但是一点儿也不谦虚。",
      "ta1 hen3 neng2 gan4 dan4 shi4 yi1 dian3 er2 ye3 bu4 qian1 xu1",
      "Anh ấy rất giỏi giang nhưng chẳng khiêm tốn chút nào.",
    ],
    [
      "别那么小气，请大家吃顿饭吧。",
      "bie2 na4 me5 xiao3 qi4 qing3 da4 jia1 chi1 dun4 fan4 ba5",
      "Đừng keo kiệt thế, mời mọi người một bữa đi.",
    ],
  ]),
  14: rows([
    [
      "她对人很温柔，也很体贴。",
      "ta1 dui4 ren2 hen3 wen1 rou2 ye3 hen3 ti3 tie1",
      "Cô ấy đối xử với mọi người rất dịu dàng và chu đáo.",
    ],
    ["我真佩服你的勇气。", "wo3 zhen1 pei4 fu2 ni3 de5 yong3 qi4", "Tôi thật sự khâm phục lòng dũng cảm của bạn."],
    [
      "老师没有责备他，只是让他下次注意。",
      "lao3 shi1 mei2 you3 ze2 bei4 ta1 zhi3 shi4 rang4 ta1 xia4 ci4 zhu4 yi4",
      "Thầy không trách cậu ấy, chỉ nhắc lần sau chú ý.",
    ],
  ]),
  15: rows([
    [
      "糟糕，我把钥匙忘在家里了！",
      "zao1 gao1 wo3 ba3 yao4 shi5 wang4 zai4 jia1 li3 le5",
      "Hỏng rồi, tôi để quên chìa khóa ở nhà!",
    ],
    [
      "你突然进来，吓了我一跳。",
      "ni3 tu1 ran2 jin4 lai2 xia4 le5 wo3 yi1 tiao4",
      "Bạn đột nhiên đi vào làm tôi giật cả mình.",
    ],
    [
      "这次没去成，真是太遗憾了。",
      "zhe4 ci4 mei2 qu4 cheng2 zhen1 shi4 tai4 yi2 han4 le5",
      "Lần này không đi được, thật là đáng tiếc.",
    ],
  ]),
  16: rows([
    ["我很想念家乡的父母。", "wo3 hen3 xiang3 nian4 jia1 xiang1 de5 fu4 mu3", "Tôi rất nhớ bố mẹ ở quê."],
    [
      "看到这张照片，她忍不住笑了。",
      "kan4 dao4 zhe4 zhang1 zhao4 pian4 ta1 ren3 bu5 zhu4 xiao4 le5",
      "Nhìn thấy bức ảnh này, cô ấy không nhịn được cười.",
    ],
    [
      "这件衣服太贵了，我还在犹豫。",
      "zhe4 jian4 yi1 fu5 tai4 gui4 le5 wo3 hai2 zai4 you2 yu4",
      "Chiếc áo này đắt quá, tôi vẫn còn đang lưỡng lự.",
    ],
  ]),
  17: rows([
    ["早上我吃了两个包子。", "zao3 shang5 wo3 chi1 le5 liang3 ge4 bao1 zi5", "Sáng nay tôi ăn hai cái bánh bao."],
    ["少吃零食，多吃水果。", "shao3 chi1 ling2 shi2 duo1 chi1 shui3 guo3", "Ăn ít đồ vặt, ăn nhiều trái cây."],
    ["请给我一瓶矿泉水。", "qing3 gei3 wo3 yi1 ping2 kuang4 quan2 shui3", "Cho tôi một chai nước khoáng."],
  ]),
  18: rows([
    [
      "这个菜有点儿淡，再放点儿酱油吧。",
      "zhe4 ge5 cai4 you3 dian3 r5 dan4 zai4 fang4 dian3 er2 jiang4 you2 ba5",
      "Món này hơi nhạt, cho thêm chút xì dầu nhé.",
    ],
    [
      "我不太能吃辣椒，太辣了。",
      "wo3 bu4 tai4 neng2 chi1 la4 jiao1 tai4 la4 le5",
      "Tôi không ăn ớt được lắm, cay quá.",
    ],
    ["妈妈在厨房煎鸡蛋。", "ma1 ma5 zai4 chu2 fang2 jian1 ji1 dan4", "Mẹ đang rán trứng trong bếp."],
  ]),
  19: rows([
    [
      "欢迎光临，请问几位？",
      "huan1 ying2 guang1 lin2 qing3 wen4 ji3 wei4",
      "Chào mừng quý khách, xin hỏi mấy người ạ?",
    ],
    ["服务员，我们要结账。", "fu2 wu4 yuan2 wo3 men5 yao4 jie2 zhang4", "Phục vụ ơi, chúng tôi muốn thanh toán."],
    [
      "来北京一定要吃烤鸭。",
      "lai2 bei3 jing1 yi1 ding4 yao4 chi1 kao3 ya1",
      "Đến Bắc Kinh nhất định phải ăn vịt quay.",
    ],
  ]),
  20: rows([
    [
      "医生让我多吃蔬菜，少吃油炸的东西。",
      "yi1 sheng1 rang4 wo3 duo1 chi1 shu1 cai4 shao3 chi1 you2 zha2 de5 dong1 xi5",
      "Bác sĩ bảo tôi ăn nhiều rau, ít đồ chiên rán.",
    ],
    [
      "这家店的小吃又便宜又好吃。",
      "zhe4 jia1 dian4 de5 xiao3 chi1 you4 pian2 yi5 you4 hao3 chi1",
      "Món ăn vặt của quán này vừa rẻ vừa ngon.",
    ],
    [
      "我感冒了，想吃点儿清淡的。",
      "wo3 gan3 mao4 le5 xiang3 chi1 dian3 er2 qing1 dan4 de5",
      "Tôi bị cảm, muốn ăn chút gì thanh đạm.",
    ],
  ]),
  21: rows([
    ["汤很烫，你慢点儿喝。", "tang1 hen3 tang4 ni3 man4 dian3 er2 he1", "Canh rất nóng, bạn uống từ từ thôi."],
    ["他在宴会上喝醉了。", "ta1 zai4 yan4 hui4 shang4 he1 zui4 le5", "Anh ấy uống say ở bữa tiệc."],
    [
      "妈妈把西瓜切成了小块。",
      "ma1 ma5 ba3 xi1 gua1 qie4 cheng2 le5 xiao3 kuai4",
      "Mẹ cắt dưa hấu thành những miếng nhỏ.",
    ],
  ]),
  22: rows([
    ["天亮了，把窗帘拉开吧。", "tian1 liang4 le5 ba3 chuang1 lian2 la1 kai1 ba5", "Trời sáng rồi, kéo rèm ra đi."],
    ["钥匙在桌子的抽屉里。", "yao4 shi5 zai4 zhuo1 zi5 de5 chou1 ti5 li3", "Chìa khóa ở trong ngăn kéo bàn."],
    [
      "天冷了，换一床厚被子。",
      "tian1 leng3 le5 huan4 yi1 chuang2 hou4 bei4 zi5",
      "Trời lạnh rồi, đổi một cái chăn dày.",
    ],
  ]),
  23: rows([
    ["我在郊区租了一套公寓。", "wo3 zai4 jiao1 qu1 zu1 le5 yi1 tao4 gong1 yu4", "Tôi thuê một căn hộ ở ngoại ô."],
    [
      "房东明天来帮我们安装空调。",
      "fang2 dong1 ming2 tian1 lai2 bang1 wo3 men5 an1 zhuang1 kong1 tiao2",
      "Ngày mai chủ nhà đến lắp điều hòa giúp chúng tôi.",
    ],
    [
      "桌子上都是灰尘，快擦一擦。",
      "zhuo1 zi5 shang4 dou1 shi4 hui1 chen2 kuai4 ca1 yi1 ca1",
      "Trên bàn toàn bụi, mau lau đi.",
    ],
  ]),
  24: rows([
    [
      "借我用一下你的剪刀，好吗？",
      "jie4 wo3 yong4 yi1 xia4 ni3 de5 jian3 dao1 hao3 ma5",
      "Cho tôi mượn cái kéo của bạn một chút, được không?",
    ],
    ["停电了，快点上蜡烛。", "ting2 dian4 le5 kuai4 dian3 shang4 la4 zhu2", "Mất điện rồi, mau thắp nến lên."],
    [
      "我忘带充电器了，手机快没电了。",
      "wo3 wang4 dai4 chong1 dian4 qi4 le5 shou3 ji1 kuai4 mei2 dian4 le5",
      "Tôi quên mang sạc, điện thoại sắp hết pin rồi.",
    ],
  ]),
  25: rows([
    [
      "我们的宿舍虽然小，但是很舒适。",
      "wo3 men5 de5 su4 she4 sui1 ran2 xiao3 dan4 shi4 hen3 shu1 shi4",
      "Ký túc xá của chúng tôi tuy nhỏ nhưng rất thoải mái.",
    ],
    ["出门前别忘了锁门。", "chu1 men2 qian2 bie2 wang4 le5 suo3 men2", "Trước khi ra ngoài đừng quên khóa cửa."],
    [
      "她每天在阳台上看书。",
      "ta1 mei3 tian1 zai4 yang2 tai2 shang4 kan4 shu1",
      "Ngày nào cô ấy cũng đọc sách ngoài ban công.",
    ],
  ]),
  26: rows([
    [
      "超市里的日用品很全。",
      "chao1 shi4 li3 de5 ri4 yong4 pin3 hen3 quan2",
      "Đồ dùng hằng ngày trong siêu thị rất đầy đủ.",
    ],
    ["请把信放进信封里。", "qing3 ba3 xin4 fang4 jin4 xin4 feng1 li3", "Hãy cho lá thư vào phong bì."],
    [
      "我到了北京就给你寄明信片。",
      "wo3 dao4 le5 bei3 jing1 jiu4 gei3 ni3 ji4 ming2 xin4 pian4",
      "Đến Bắc Kinh tôi sẽ gửi bưu thiếp cho bạn.",
    ],
  ]),
  27: rows([
    ["我想去银行存点儿钱。", "wo3 xiang3 qu4 yin2 hang2 cun2 dian3 er2 qian2", "Tôi muốn ra ngân hàng gửi ít tiền."],
    ["今天的汇率是多少？", "jin1 tian1 de5 hui4 lü4 shi4 duo1 shao5", "Tỷ giá hôm nay là bao nhiêu?"],
    ["对不起，我没有零钱。", "dui4 bu5 qi3 wo3 mei2 you3 ling2 qian2", "Xin lỗi, tôi không có tiền lẻ."],
  ]),
  28: rows([
    ["这瓶牛奶已经过期了。", "zhe4 ping2 niu2 nai3 yi3 jing1 guo4 qi1 le5", "Chai sữa này đã hết hạn rồi."],
    [
      "你的包裹到了，快去拿吧。",
      "ni3 de5 bao1 guo3 dao4 le5 kuai4 qu4 na2 ba5",
      "Bưu kiện của bạn đến rồi, mau đi lấy đi.",
    ],
    [
      "为了节省时间，我们打车去吧。",
      "wei4 le5 jie2 sheng3 shi2 jian1 wo3 men5 da3 che1 qu4 ba5",
      "Để tiết kiệm thời gian, chúng ta đi taxi nhé.",
    ],
  ]),
  29: rows([
    [
      "天冷了，出门记得戴围巾和手套。",
      "tian1 leng3 le5 chu1 men2 ji4 de5 dai4 wei2 jin1 he2 shou3 tao4",
      "Trời lạnh rồi, ra ngoài nhớ quàng khăn và đeo găng tay.",
    ],
    [
      "他今天穿西装，还系领带了。",
      "ta1 jin1 tian1 chuan1 xi1 zhuang1 hai2 xi4 ling3 dai4 le5",
      "Hôm nay anh ấy mặc vest, còn thắt cà vạt nữa.",
    ],
    [
      "这条裙子的样式很时髦。",
      "zhe4 tiao2 qun2 zi5 de5 yang4 shi4 hen3 shi2 mao2",
      "Kiểu dáng chiếc váy này rất hợp mốt.",
    ],
  ]),
  30: rows([
    [
      "这家店不收现金，只能用手机付钱。",
      "zhe4 jia1 dian4 bu4 shou1 xian4 jin1 zhi3 neng2 yong4 shou3 ji1 fu4 qian2",
      "Cửa hàng này không nhận tiền mặt, chỉ trả bằng điện thoại.",
    ],
    ["我还欠他一百块钱。", "wo3 hai2 qian4 ta1 yi1 bai3 kuai4 qian2", "Tôi vẫn còn nợ anh ấy một trăm tệ."],
    ["付完钱请拿好收据。", "fu4 wan2 qian2 qing3 na2 hao3 shou1 ju4", "Trả tiền xong xin cầm kỹ biên lai."],
  ]),
  31: rows([
    [
      "中国古代有很多有名的皇帝。",
      "zhong1 guo2 gu3 dai4 you3 hen3 duo1 you3 ming2 de5 huang2 di4",
      "Trung Quốc cổ đại có nhiều hoàng đế nổi tiếng.",
    ],
    [
      "这个故事是一个古老的传说。",
      "zhe4 ge5 gu4 shi5 shi4 yi1 ge4 gu3 lao3 de5 chuan2 shuo1",
      "Câu chuyện này là một truyền thuyết cổ xưa.",
    ],
    [
      "你最喜欢哪个朝代的历史？",
      "ni3 zui4 xi3 huan5 na3 ge4 chao2 dai4 de5 li4 shi3",
      "Bạn thích lịch sử triều đại nào nhất?",
    ],
  ]),
  32: rows([
    [
      "我曾经在上海住过两年。",
      "wo3 ceng2 jing1 zai4 shang4 hai3 zhu4 guo4 liang3 nian2",
      "Tôi từng sống ở Thượng Hải hai năm.",
    ],
    [
      "傍晚的时候我们去公园散步吧。",
      "bang4 wan3 de5 shi2 hou5 wo3 men5 qu4 gong1 yuan2 san4 bu4 ba5",
      "Chiều tối chúng ta ra công viên đi dạo nhé.",
    ],
    ["客人们已经陆续到了。", "ke4 ren2 men5 yi3 jing1 lu4 xu4 dao4 le5", "Các vị khách đã lần lượt đến rồi."],
  ]),
  33: rows([
    [
      "新学期下个月中旬开始。",
      "xin1 xue2 qi1 xia4 ge4 yue4 zhong1 xun2 kai1 shi3",
      "Học kỳ mới bắt đầu vào giữa tháng sau.",
    ],
    [
      "元旦那天商店照常营业。",
      "yuan2 dan4 na4 tian1 shang1 dian4 zhao4 chang2 ying2 ye4",
      "Ngày Tết Dương lịch các cửa hàng vẫn mở cửa như thường lệ.",
    ],
    [
      "你看一下日历，确定一下日期。",
      "ni3 kan4 yi1 xia4 ri4 li4 que4 ding4 yi1 xia4 ri4 qi1",
      "Bạn xem lịch rồi xác định ngày nhé.",
    ],
  ]),
  34: rows([
    [
      "如今的年轻人很少写信了。",
      "ru2 jin1 de5 nian2 qing1 ren2 hen3 shao3 xie3 xin4 le5",
      "Thanh niên ngày nay rất ít viết thư.",
    ],
    ["放假期间你打算做什么？", "fang4 jia4 qi1 jian1 ni3 da3 suan4 zuo4 shen2 me5", "Trong kỳ nghỉ bạn định làm gì?"],
    [
      "你要来的话，最好事先告诉我。",
      "ni3 yao4 lai2 de5 hua4 zui4 hao3 shi4 xian1 gao4 su5 wo3",
      "Nếu bạn định đến thì tốt nhất báo trước cho tôi.",
    ],
  ]),
  35: rows([
    [
      "雨停了，天上出现了彩虹。",
      "yu3 ting2 le5 tian1 shang4 chu1 xian4 le5 cai3 hong2",
      "Mưa tạnh rồi, trên trời xuất hiện cầu vồng.",
    ],
    [
      "这个小岛的景色非常美。",
      "zhe4 ge5 xiao3 dao3 de5 jing3 se4 fei1 chang2 mei3",
      "Phong cảnh hòn đảo nhỏ này rất đẹp.",
    ],
    [
      "外面风很大，吹得我好冷。",
      "wai4 mian4 feng1 hen3 da4 chui1 de2 wo3 hao3 leng3",
      "Ngoài trời gió to, thổi làm tôi lạnh quá.",
    ],
  ]),
  36: rows([
    [
      "天气预报说明天有大雾。",
      "tian1 qi4 yu4 bao4 shuo1 ming2 tian1 you3 da4 wu4",
      "Dự báo thời tiết nói ngày mai có sương mù dày.",
    ],
    [
      "太阳出来了，雪慢慢融化了。",
      "tai4 yang5 chu1 lai2 le5 xue3 man4 man4 rong2 hua4 le5",
      "Mặt trời lên rồi, tuyết dần dần tan.",
    ],
    [
      "今天天气好，我们把被子拿出去晒晒吧。",
      "jin1 tian1 tian1 qi4 hao3 wo3 men5 ba3 bei4 zi5 na2 chu1 qu4 shai4 shai4 ba5",
      "Hôm nay trời đẹp, mình mang chăn ra phơi đi.",
    ],
  ]),
  37: rows([
    ["这张桌子是用木头做的。", "zhe4 zhang1 zhuo1 zi5 shi4 yong4 mu4 tou5 zuo4 de5", "Cái bàn này được làm bằng gỗ."],
    [
      "我们应该节约能源，保护资源。",
      "wo3 men5 ying1 gai1 jie2 yue1 neng2 yuan2 bao3 hu4 zi1 yuan2",
      "Chúng ta nên tiết kiệm năng lượng và bảo vệ tài nguyên.",
    ],
    [
      "夏天我们常去海边的沙滩玩儿。",
      "xia4 tian1 wo3 men5 chang2 qu4 hai3 bian1 de5 sha1 tan1 wan2 er2",
      "Mùa hè chúng tôi hay ra bãi biển chơi.",
    ],
  ]),
  38: rows([
    ["你家里养了什么宠物？", "ni3 jia1 li3 yang3 le5 shen2 me5 chong3 wu4", "Nhà bạn nuôi thú cưng gì?"],
    ["别忘了每天给花浇水。", "bie2 wang4 le5 mei3 tian1 gei3 hua1 jiao1 shui3", "Đừng quên tưới hoa mỗi ngày."],
    [
      "周末爸爸常常去河边钓鱼。",
      "zhou1 mo4 ba4 ba5 chang2 chang2 qu4 he2 bian1 diao4 yu2",
      "Cuối tuần bố thường ra bờ sông câu cá.",
    ],
  ]),
  39: rows([
    [
      "小狗看见主人就摇尾巴。",
      "xiao3 gou3 kan4 jian4 zhu3 ren2 jiu4 yao2 wei3 ba5",
      "Chú chó nhỏ thấy chủ là vẫy đuôi.",
    ],
    [
      "今年雨水多，农民的收获不错。",
      "jin1 nian2 yu3 shui3 duo1 nong2 min2 de5 shou1 huo4 bu4 cuo4",
      "Năm nay mưa nhiều, nông dân thu hoạch khá tốt.",
    ],
    [
      "爷爷家养了一匹马和很多兔子。",
      "ye2 ye5 jia1 yang3 le5 yi1 pi3 ma3 he2 hen3 duo1 tu4 zi5",
      "Nhà ông nuôi một con ngựa và rất nhiều thỏ.",
    ],
  ]),
  40: rows([
    ["飞机马上就要降落了。", "fei1 ji1 ma3 shang4 jiu4 yao4 jiang4 luo4 le5", "Máy bay sắp hạ cánh rồi."],
    [
      "请出示您的护照和登机牌。",
      "qing3 chu1 shi4 nin2 de5 hu4 zhao4 he2 deng1 ji1 pai2",
      "Xin quý khách xuất trình hộ chiếu và thẻ lên máy bay.",
    ],
    ["我来自越南，是越南人。", "wo3 lai2 zi4 yue4 nan2 shi4 yue4 nan2 ren2", "Tôi đến từ Việt Nam, là người Việt Nam."],
  ]),
  41: rows([
    ["请问，附近有厕所吗？", "qing3 wen4 fu4 jin4 you3 ce4 suo3 ma5", "Xin hỏi, gần đây có nhà vệ sinh không?"],
    ["前面路口向左拐弯。", "qian2 mian4 lu4 kou3 xiang4 zuo3 guai3 wan1", "Đến ngã tư phía trước thì rẽ trái."],
    ["北京的胡同很有特色。", "bei3 jing1 de5 hu2 tong4 hen3 you3 te4 se4", "Ngõ hẻm ở Bắc Kinh rất có nét đặc sắc."],
  ]),
  42: rows([
    [
      "在越南，很多人骑摩托车上班。",
      "zai4 yue4 nan2 hen3 duo1 ren2 qi2 mo2 tuo1 che1 shang4 ban1",
      "Ở Việt Nam, nhiều người đi xe máy đi làm.",
    ],
    [
      "我第一次来这里，结果迷路了。",
      "wo3 di4 yi1 ci4 lai2 zhe4 li3 jie2 guo3 mi2 lu4 le5",
      "Lần đầu tôi đến đây, kết quả là bị lạc đường.",
    ],
    [
      "明天你要坐长途车，祝你一路平安！",
      "ming2 tian1 ni3 yao4 zuo4 chang2 tu2 che1 zhu4 ni3 yi1 lu4 ping2 an1",
      "Ngày mai bạn đi xe đường dài, chúc thượng lộ bình an!",
    ],
  ]),
  43: rows([
    [
      "北京有很多名胜古迹。",
      "bei3 jing1 you3 hen3 duo1 ming2 sheng4 gu3 ji4",
      "Bắc Kinh có rất nhiều danh lam thắng cảnh.",
    ],
    [
      "邮局就在市中心，走路十分钟。",
      "you2 ju2 jiu4 zai4 shi4 zhong1 xin1 zou3 lu4 shi2 fen1 zhong1",
      "Bưu điện ở ngay trung tâm thành phố, đi bộ mười phút.",
    ],
    [
      "这座寺庙看起来非常雄伟。",
      "zhe4 zuo4 si4 miao4 kan4 qi3 lai5 fei1 chang2 xiong2 wei3",
      "Ngôi chùa này trông vô cùng hùng vĩ.",
    ],
  ]),
  44: rows([
    [
      "我们的班主任是一位很年轻的老师。",
      "wo3 men5 de5 ban1 zhu3 ren4 shi4 yi1 wei4 hen3 nian2 qing1 de5 lao3 shi1",
      "Giáo viên chủ nhiệm của chúng tôi là một thầy cô rất trẻ.",
    ],
    [
      "这次考试我终于及格了！",
      "zhe4 ci4 kao3 shi4 wo3 zhong1 yu2 ji2 ge2 le5",
      "Lần thi này cuối cùng tôi cũng qua rồi!",
    ],
    ["他被北京大学录取了。", "ta1 bei4 bei3 jing1 da4 xue2 lu4 qu3 le5", "Cậu ấy đã đỗ vào Đại học Bắc Kinh."],
  ]),
  45: rows([
    [
      "自己的作业要自己做，不能抄。",
      "zi4 ji3 de5 zuo4 ye4 yao4 zi4 ji3 zuo4 bu4 neng2 chao1",
      "Bài tập của mình phải tự làm, không được chép.",
    ],
    [
      "你每天背多少个生词？",
      "ni3 mei3 tian1 bei4 duo1 shao5 ge4 sheng1 ci2",
      "Mỗi ngày bạn học thuộc bao nhiêu từ mới?",
    ],
    ["发现错误要马上改正。", "fa1 xian4 cuo4 wu4 yao4 ma3 shang4 gai3 zheng4", "Phát hiện lỗi thì phải sửa ngay."],
  ]),
  46: rows([
    ["请大家翻到第十页。", "qing3 da4 jia1 fan1 dao4 di4 shi2 ye4", "Mời mọi người lật đến trang mười."],
    [
      "我们换个轻松的话题吧。",
      "wo3 men5 huan4 ge4 qing1 song1 de5 hua4 ti2 ba5",
      "Chúng ta đổi sang chủ đề nhẹ nhàng hơn nhé.",
    ],
    [
      "我不知道该怎么称呼他。",
      "wo3 bu4 zhi1 dao4 gai1 zen3 me5 cheng1 hu5 ta1",
      "Tôi không biết nên xưng hô với anh ấy thế nào.",
    ],
  ]),
  47: rows([
    [
      "写作文以前，先写一个提纲。",
      "xie3 zuo4 wen2 yi3 qian2 xian1 xie3 yi1 ge4 ti2 gang1",
      "Trước khi viết bài văn, hãy lập dàn ý trước.",
    ],
    [
      "有疑问的同学可以举手提问。",
      "you3 yi2 wen4 de5 tong2 xue2 ke3 yi3 ju3 shou3 ti2 wen4",
      "Bạn nào có thắc mắc thì có thể giơ tay hỏi.",
    ],
    [
      "我不知道怎么形容我的心情。",
      "wo3 bu4 zhi1 dao4 zen3 me5 xing2 rong2 wo3 de5 xin1 qing2",
      "Tôi không biết phải diễn tả tâm trạng mình thế nào.",
    ],
  ]),
  48: rows([
    [
      "学汉语一定要注意声调。",
      "xue2 han4 yu3 yi1 ding4 yao4 zhu4 yi4 sheng1 diao4",
      "Học tiếng Trung nhất định phải chú ý thanh điệu.",
    ],
    [
      "我看中国电影的时候需要看字幕。",
      "wo3 kan4 zhong4 guo2 dian4 ying3 de5 shi2 hou5 xu1 yao4 kan4 zi4 mu4",
      "Khi xem phim Trung Quốc tôi cần xem phụ đề.",
    ],
    [
      "他说话的语气有点儿不客气。",
      "ta1 shuo1 hua4 de5 yu3 qi4 you3 dian3 r5 bu4 ke4 qi5",
      "Giọng điệu nói chuyện của anh ấy hơi thiếu lịch sự.",
    ],
  ]),
  49: rows([
    [
      "上课的时候要专心听讲。",
      "shang4 ke4 de5 shi2 hou5 yao4 zhuan1 xin1 ting1 jiang3",
      "Trong giờ học phải tập trung nghe giảng.",
    ],
    [
      "我暑假在一家公司实习。",
      "wo3 shu3 jia4 zai4 yi1 jia1 gong1 si1 shi2 xi2",
      "Kỳ nghỉ hè tôi thực tập ở một công ty.",
    ],
    [
      "多练习才能熟练掌握这些词。",
      "duo1 lian4 xi2 cai2 neng2 shu2 lian4 zhang3 wo4 zhe4 xie1 ci2",
      "Phải luyện tập nhiều mới nắm vững thành thạo những từ này.",
    ],
  ]),
  50: rows([
    [
      "暑假我想去餐厅打工。",
      "shu3 jia4 wo3 xiang3 qu4 can1 ting1 da3 gong1",
      "Kỳ nghỉ hè tôi muốn đi làm thêm ở nhà hàng.",
    ],
    ["这家公司的待遇很不错。", "zhe4 jia1 gong1 si1 de5 dai4 yu4 hen3 bu4 cuo4", "Đãi ngộ của công ty này khá tốt."],
    ["他上个月已经辞职了。", "ta1 shang4 ge4 yue4 yi3 jing1 ci2 zhi2 le5", "Tháng trước anh ấy đã nghỉ việc rồi."],
  ]),
  51: rows([
    ["我爸爸是一名工程师。", "wo3 ba4 ba5 shi4 yi1 ming2 gong1 cheng2 shi1", "Bố tôi là một kỹ sư."],
    ["这家工厂有很多工人。", "zhe4 jia1 gong1 chang3 you3 hen3 duo1 gong1 ren2", "Nhà máy này có rất nhiều công nhân."],
    [
      "这台机器坏了，需要换零件。",
      "zhe4 tai2 ji1 qi4 huai4 le5 xu1 yao4 huan4 ling2 jian4",
      "Cái máy này hỏng rồi, cần thay linh kiện.",
    ],
  ]),
  52: rows([
    ["这件事我来处理吧。", "zhe4 jian4 shi4 wo3 lai2 chu3 li3 ba5", "Việc này để tôi xử lý cho."],
    [
      "明天下午我要去银行办理手续。",
      "ming2 tian1 xia4 wu3 wo3 yao4 qu4 yin2 hang2 ban4 li3 shou3 xu4",
      "Chiều mai tôi phải ra ngân hàng làm thủ tục.",
    ],
    [
      "请把报告发到我的邮箱。",
      "qing3 ba3 bao4 gao4 fa1 dao4 wo3 de5 you2 xiang1",
      "Hãy gửi bản báo cáo vào hộp thư của tôi.",
    ],
  ]),
  53: rows([
    [
      "我想去那家公司应聘秘书。",
      "wo3 xiang3 qu4 na4 jia1 gong1 si1 ying4 pin4 mi4 shu1",
      "Tôi muốn ứng tuyển vị trí thư ký ở công ty đó.",
    ],
    ["我爸爸明年就要退休了。", "wo3 ba4 ba5 ming2 nian2 jiu4 yao4 tui4 xiu1 le5", "Bố tôi sang năm sẽ nghỉ hưu."],
    [
      "业余时间你喜欢做什么？",
      "ye4 yu2 shi2 jian1 ni3 xi3 huan5 zuo4 shen2 me5",
      "Thời gian rảnh ngoài giờ làm bạn thích làm gì?",
    ],
  ]),
  54: rows([
    [
      "请你在这份文件上签字。",
      "qing3 ni3 zai4 zhe4 fen4 wen2 jian4 shang4 qian1 zi4",
      "Xin anh ký tên vào văn bản này.",
    ],
    [
      "我打了好几次，他的电话一直占线。",
      "wo3 da3 le5 hao3 ji3 ci4 ta1 de5 dian4 hua4 yi1 zhi2 zhan4 xian4",
      "Tôi gọi mấy lần rồi mà máy anh ấy cứ bận.",
    ],
    [
      "他不在，我会把你的话转告他。",
      "ta1 bu4 zai4 wo3 hui4 ba3 ni3 de5 hua4 zhuan3 gao4 ta1",
      "Anh ấy không có ở đây, tôi sẽ chuyển lời của bạn cho anh ấy.",
    ],
  ]),
  55: rows([
    [
      "办这个手续需要带身份证件。",
      "ban4 zhe4 ge5 shou3 xu4 xu1 yao4 dai4 shen1 fen4 zheng4 jian4",
      "Làm thủ tục này cần mang giấy tờ tùy thân.",
    ],
    [
      "请先在网上注册一个账户。",
      "qing3 xian1 zai4 wang3 shang4 zhu4 ce4 yi1 ge4 zhang4 hu4",
      "Vui lòng đăng ký một tài khoản trên mạng trước.",
    ],
    ["因为下雨，比赛被取消了。", "yin1 wei4 xia4 yu3 bi3 sai4 bei4 qu3 xiao1 le5", "Vì trời mưa nên trận đấu bị hủy."],
  ]),
  56: rows([
    [
      "希望我们以后能继续合作。",
      "xi1 wang4 wo3 men5 yi3 hou4 neng2 ji4 xu4 he2 zuo4",
      "Hy vọng sau này chúng ta có thể tiếp tục hợp tác.",
    ],
    [
      "签合同以前要看清楚。",
      "qian1 he2 tong5 yi3 qian2 yao4 kan4 qing1 chu5",
      "Trước khi ký hợp đồng phải đọc cho kỹ.",
    ],
    [
      "这家公司是去年成立的。",
      "zhe4 jia1 gong1 si1 shi4 qu4 nian2 cheng2 li4 de5",
      "Công ty này được thành lập năm ngoái.",
    ],
  ]),
  57: rows([
    [
      "这个城市越来越繁荣了。",
      "zhe4 ge5 cheng2 shi4 yue4 lai2 yue4 fan2 rong2 le5",
      "Thành phố này ngày càng phồn vinh.",
    ],
    ["你的汉语进步得真快！", "ni3 de5 han4 yu3 jin4 bu4 de2 zhen1 kuai4", "Tiếng Trung của bạn tiến bộ nhanh thật!"],
    ["这幅画非常有价值。", "zhe4 fu2 hua4 fei1 chang2 you3 jia4 zhi2", "Bức tranh này rất có giá trị."],
  ]),
  58: rows([
    [
      "双方经过谈判，终于签了合同。",
      "shuang1 fang1 jing1 guo4 tan2 pan4 zhong1 yu2 qian1 le5 he2 tong5",
      "Sau khi đàm phán, hai bên cuối cùng đã ký hợp đồng.",
    ],
    [
      "这家商店每天早上九点开始营业。",
      "zhe4 jia1 shang1 dian4 mei3 tian1 zao3 shang5 jiu3 dian3 kai1 shi3 ying2 ye4",
      "Cửa hàng này mở cửa lúc chín giờ sáng mỗi ngày.",
    ],
    [
      "他投资失败，损失了很多钱。",
      "ta1 tou2 zi1 shi1 bai4 sun3 shi1 le5 hen3 duo1 qian2",
      "Anh ấy đầu tư thất bại, mất rất nhiều tiền.",
    ],
  ]),
  59: rows([
    [
      "这个工厂主要生产儿童玩具。",
      "zhe4 ge5 gong1 chang3 zhu3 yao4 sheng1 chan3 er2 tong2 wan2 ju4",
      "Nhà máy này chủ yếu sản xuất đồ chơi trẻ em.",
    ],
    [
      "这个小东西很实用，用途很多。",
      "zhe4 ge5 xiao3 dong1 xi5 hen3 shi2 yong4 yong4 tu2 hen3 duo1",
      "Món đồ nhỏ này rất hữu dụng, có nhiều công dụng.",
    ],
    [
      "我们公司在价格上有优势。",
      "wo3 men5 gong1 si1 zai4 jia4 ge2 shang4 you3 you1 shi4",
      "Công ty chúng tôi có lợi thế về giá cả.",
    ],
  ]),
  60: rows([
    ["在这儿停车会被罚款的。", "zai4 zhe4 er2 ting2 che1 hui4 bei4 fa2 kuan3 de5", "Đậu xe ở đây sẽ bị phạt tiền đấy."],
    [
      "参加比赛就要遵守规则。",
      "can1 jia1 bi3 sai4 jiu4 yao4 zun1 shou3 gui1 ze2",
      "Tham gia thi đấu thì phải tuân thủ luật.",
    ],
    ["这样做对他不公平。", "zhe4 yang4 zuo4 dui4 ta1 bu4 gong1 ping2", "Làm thế này không công bằng với anh ấy."],
  ]),
  61: rows([
    ["我们都希望世界和平。", "wo3 men5 dou1 xi1 wang4 shi4 jie4 he2 ping2", "Chúng ta đều mong thế giới hòa bình."],
    ["他把钱都捐给了学校。", "ta1 ba3 qian2 dou1 juan1 gei3 le5 xue2 xiao4", "Anh ấy quyên hết tiền cho trường học."],
    ["这是我个人的看法。", "zhe4 shi4 wo3 ge4 ren2 de5 kan4 fa3", "Đây là ý kiến cá nhân của tôi."],
  ]),
  62: rows([
    [
      "政府今年制定了很多新政策。",
      "zheng4 fu3 jin1 nian2 zhi4 ding4 le5 hen3 duo1 xin1 zheng4 ce4",
      "Năm nay chính phủ đã đưa ra nhiều chính sách mới.",
    ],
    ["我对政治不太感兴趣。", "wo3 dui4 zheng4 zhi4 bu4 tai4 gan3 xing4 qu4", "Tôi không hứng thú lắm với chính trị."],
    [
      "不管走到哪里，我都爱我的祖国。",
      "bu4 guan3 zou3 dao4 na3 li3 wo3 dou1 ai4 wo3 de5 zu3 guo2",
      "Dù đi đến đâu, tôi vẫn yêu tổ quốc của mình.",
    ],
  ]),
  63: rows([
    [
      "没有人喜欢战争，大家都希望和平。",
      "mei2 you3 ren2 xi3 huan5 zhan4 zheng1 da4 jia1 dou1 xi1 wang4 he2 ping2",
      "Không ai thích chiến tranh, mọi người đều mong hòa bình.",
    ],
    [
      "士兵们必须听从命令。",
      "shi4 bing1 men5 bi4 xu1 ting1 cong2 ming4 ling4",
      "Các binh sĩ phải tuân theo mệnh lệnh.",
    ],
    [
      "我们队终于取得了胜利！",
      "wo3 men5 dui4 zhong1 yu2 qu3 de2 le5 sheng4 li4",
      "Đội chúng tôi cuối cùng đã giành chiến thắng!",
    ],
  ]),
  64: rows([
    [
      "开车的人一定要遵守交通规则。",
      "kai1 che1 de5 ren2 yi1 ding4 yao4 zun1 shou3 jiao1 tong1 gui1 ze2",
      "Người lái xe nhất định phải tuân thủ luật giao thông.",
    ],
    ["警察还没有找到证据。", "jing3 cha2 hai2 mei2 you3 zhao3 dao4 zheng4 ju4", "Cảnh sát vẫn chưa tìm ra bằng chứng."],
    ["小心点儿，别上当了！", "xiao3 xin1 dian3 er2 bie2 shang4 dang4 le5", "Cẩn thận chút, đừng để bị lừa!"],
  ]),
  65: rows([
    [
      "男人和女人的权利是平等的。",
      "nan2 ren2 he2 nü3 ren2 de5 quan2 li4 shi4 ping2 deng3 de5",
      "Quyền lợi của nam và nữ là bình đẳng.",
    ],
    [
      "这个城市的人口越来越多。",
      "zhe4 ge5 cheng2 shi4 de5 ren2 kou3 yue4 lai2 yue4 duo1",
      "Dân số của thành phố này ngày càng đông.",
    ],
    [
      "这本书是我的，不属于图书馆。",
      "zhe4 ben3 shu1 shi4 wo3 de5 bu4 shu3 yu2 tu2 shu1 guan3",
      "Cuốn sách này là của tôi, không thuộc về thư viện.",
    ],
  ]),
  66: rows([
    ["抽烟会危害身体健康。", "chou1 yan1 hui4 wei1 hai4 shen1 ti3 jian4 kang1", "Hút thuốc gây hại cho sức khỏe."],
    [
      "这场大雨造成了很大的损失。",
      "zhe4 chang3 da4 yu3 zao4 cheng2 le5 hen3 da4 de5 sun3 shi1",
      "Trận mưa lớn này đã gây ra thiệt hại nặng nề.",
    ],
    [
      "他想去，可是妈妈阻止了他。",
      "ta1 xiang3 qu4 ke3 shi4 ma1 ma5 zu3 zhi3 le5 ta1",
      "Anh ấy muốn đi nhưng mẹ đã ngăn lại.",
    ],
  ]),
  67: rows([
    [
      "除夕晚上全家人一起吃饭。",
      "chu2 xi1 wan3 shang5 quan2 jia1 ren2 yi1 qi3 chi1 fan4",
      "Đêm giao thừa cả nhà cùng nhau ăn cơm.",
    ],
    [
      "过年放鞭炮是中国的传统。",
      "guo4 nian2 fang4 bian1 pao4 shi4 zhong1 guo2 de5 chuan2 tong3",
      "Đốt pháo ngày Tết là truyền thống của Trung Quốc.",
    ],
    [
      "周末我们有个同学聚会。",
      "zhou1 mo4 wo3 men5 you3 ge4 tong2 xue2 ju4 hui4",
      "Cuối tuần chúng tôi có buổi họp lớp.",
    ],
  ]),
  68: rows([
    [
      "我小时候特别喜欢看动画片。",
      "wo3 xiao3 shi2 hou4 te4 bie2 xi3 huan5 kan4 dong4 hua4 pian4",
      "Hồi nhỏ tôi đặc biệt thích xem phim hoạt hình.",
    ],
    [
      "这部电影的导演很有名。",
      "zhe4 bu4 dian4 ying3 de5 dao3 yan3 hen3 you3 ming2",
      "Đạo diễn của bộ phim này rất nổi tiếng.",
    ],
    ["你喜欢听古典音乐吗？", "ni3 xi3 huan5 ting1 gu3 dian3 yin1 yue4 ma5", "Bạn có thích nghe nhạc cổ điển không?"],
  ]),
  69: rows([
    [
      "周末我和爷爷常常下象棋。",
      "zhou1 mo4 wo3 he2 ye2 ye5 chang2 chang2 xia4 xiang4 qi2",
      "Cuối tuần tôi thường chơi cờ tướng với ông.",
    ],
    [
      "我们去吃顿好的，庆祝一下吧！",
      "wo3 men5 qu4 chi1 dun4 hao3 de5 qing4 zhu4 yi1 xia4 ba5",
      "Mình đi ăn một bữa ngon để ăn mừng đi!",
    ],
    ["晚会的气氛特别热烈。", "wan3 hui4 de5 qi4 fen1 te4 bie2 re4 lie4", "Không khí buổi dạ hội vô cùng sôi nổi."],
  ]),
  70: rows([
    [
      "我们队终于拿了冠军！",
      "wo3 men5 dui4 zhong1 yu2 na2 le5 guan4 jun1",
      "Đội chúng tôi cuối cùng đã giành chức vô địch!",
    ],
    ["这场比赛非常激烈。", "zhe4 chang3 bi3 sai4 fei1 chang2 ji1 lie4", "Trận đấu này vô cùng quyết liệt."],
    ["你今天表现得真棒！", "ni3 jin1 tian1 biao3 xian4 de2 zhen1 bang4", "Hôm nay bạn thể hiện tuyệt quá!"],
  ]),
  71: rows([
    [
      "每天早上公园里都有很多老人打太极拳。",
      "mei3 tian1 zao3 shang5 gong1 yuan2 li3 dou1 you3 hen3 duo1 lao3 ren2 da3 tai4 ji2 quan2",
      "Sáng nào trong công viên cũng có nhiều người già tập thái cực quyền.",
    ],
    ["跑步的时候要注意姿势。", "pao3 bu4 de5 shi2 hou5 yao4 zhu4 yi4 zi1 shi4", "Khi chạy bộ phải chú ý tư thế."],
    [
      "地上有水，小心别摔了。",
      "di4 shang4 you3 shui3 xiao3 xin1 bie2 shuai1 le5",
      "Dưới đất có nước, cẩn thận kẻo ngã.",
    ],
  ]),
  72: rows([
    ["我刚给你发了一条短信。", "wo3 gang1 gei3 ni3 fa1 le5 yi1 tiao2 duan3 xin4", "Tôi vừa gửi cho bạn một tin nhắn."],
    [
      "这个手机有很多新功能。",
      "zhe4 ge5 shou3 ji1 you3 hen3 duo1 xin1 gong1 neng2",
      "Chiếc điện thoại này có nhiều chức năng mới.",
    ],
    ["上课的时候可以录音吗？", "shang4 ke4 de5 shi2 hou5 ke3 yi3 lu4 yin1 ma5", "Lúc học có được ghi âm không?"],
  ]),
  73: rows([
    [
      "纸是中国古代的伟大发明。",
      "zhi3 shi4 zhong1 guo2 gu3 dai4 de5 wei3 da4 fa1 ming2",
      "Giấy là phát minh vĩ đại của Trung Quốc thời cổ đại.",
    ],
    [
      "你要学会控制自己的情绪。",
      "ni3 yao4 xue2 hui4 kong4 zhi4 zi4 ji3 de5 qing2 xu4",
      "Bạn phải học cách kiểm soát cảm xúc của mình.",
    ],
    ["请把实验结果记录下来。", "qing3 ba3 shi2 yan4 jie2 guo3 ji4 lu4 xia4 lai2", "Hãy ghi lại kết quả thí nghiệm."],
  ]),
  74: rows([
    [
      "你先下载这个软件，再注册一下。",
      "ni3 xian1 xia4 zai4 zhe4 ge5 ruan3 jian4 zai4 zhu4 ce4 yi1 xia4",
      "Bạn tải phần mềm này về trước, rồi đăng ký.",
    ],
    ["我不小心把文件删除了。", "wo3 bu4 xiao3 xin1 ba3 wen2 jian4 shan1 chu2 le5", "Tôi lỡ tay xóa mất tài liệu rồi."],
    ["请输入你的密码。", "qing3 shu1 ru4 ni3 de5 mi4 ma3", "Vui lòng nhập mật khẩu của bạn."],
  ]),
  75: rows([
    ["这里手机信号不太好。", "zhe4 li3 shou3 ji1 xin4 hao4 bu4 tai4 hao3", "Ở đây sóng điện thoại không tốt lắm."],
    [
      "数据显示，网上购物的人越来越多。",
      "shu4 ju4 xian3 shi4 wang3 shang4 gou4 wu4 de5 ren2 yue4 lai2 yue4 duo1",
      "Số liệu cho thấy người mua sắm trên mạng ngày càng nhiều.",
    ],
    [
      "理论要和实践结合起来。",
      "li3 lun4 yao4 he2 shi2 jian4 jie2 he2 qi3 lai5",
      "Lý thuyết phải kết hợp với thực tiễn.",
    ],
  ]),
  76: rows([
    [
      "见到老师要主动打招呼。",
      "jian4 dao4 lao3 shi1 yao4 zhu3 dong4 da3 zhao1 hu5",
      "Gặp thầy cô thì phải chủ động chào hỏi.",
    ],
    [
      "劳驾，请问地铁站怎么走？",
      "lao2 jia4 qing3 wen4 di4 tie3 zhan4 zen3 me5 zou3",
      "Làm ơn cho hỏi, ga tàu điện ngầm đi thế nào?",
    ],
    [
      "有问题大家要多沟通。",
      "you3 wen4 ti2 da4 jia1 yao4 duo1 gou1 tong1",
      "Có vấn đề thì mọi người nên trao đổi nhiều hơn.",
    ],
  ]),
  77: rows([
    ["妈妈夸我今天做得很好。", "ma1 ma5 kua1 wo3 jin1 tian1 zuo4 de2 hen3 hao3", "Mẹ khen hôm nay tôi làm rất tốt."],
    ["别胡说，这不是真的。", "bie2 hu2 shuo1 zhe4 bu4 shi4 zhen1 de5", "Đừng nói bậy, chuyện này không có thật."],
    [
      "他答应明天来帮我搬家。",
      "ta1 da1 ying5 ming2 tian1 lai2 bang1 wo3 ban1 jia1",
      "Anh ấy hứa mai đến giúp tôi chuyển nhà.",
    ],
  ]),
  78: rows([
    ["请替我问候你的父母。", "qing3 ti4 wo3 wen4 hou4 ni3 de5 fu4 mu3", "Cho tôi gửi lời hỏi thăm bố mẹ bạn."],
    [
      "我今天在超市碰见了老同学。",
      "wo3 jin1 tian1 zai4 chao1 shi4 peng4 jian4 le5 lao3 tong2 xue2",
      "Hôm nay tôi tình cờ gặp bạn học cũ ở siêu thị.",
    ],
    [
      "跟你说实话，我不太喜欢他。",
      "gen1 ni3 shuo1 shi2 hua4 wo3 bu4 tai4 xi3 huan5 ta1",
      "Nói thật với bạn, tôi không thích anh ta lắm.",
    ],
  ]),
  79: rows([
    ["我不赞成你的看法。", "wo3 bu4 zan4 cheng2 ni3 de5 kan4 fa3", "Tôi không tán thành quan điểm của bạn."],
    [
      "你别劝了，他不会听的。",
      "ni3 bie2 quan4 le5 ta1 bu4 hui4 ting1 de5",
      "Bạn đừng khuyên nữa, anh ấy sẽ không nghe đâu.",
    ],
    [
      "做决定以前，我想先征求一下大家的意见。",
      "zuo4 jue2 ding4 yi3 qian2 wo3 xiang3 xian1 zheng1 qiu2 yi1 xia4 da4 jia1 de5 yi4 jian4",
      "Trước khi quyết định, tôi muốn hỏi ý kiến mọi người trước.",
    ],
  ]),
  80: rows([
    [
      "我完全同意你的观点。",
      "wo3 wan2 quan2 tong2 yi4 ni3 de5 guan1 dian3",
      "Tôi hoàn toàn đồng ý với quan điểm của bạn.",
    ],
    ["你说的话很有道理。", "ni3 shuo1 de5 hua4 hen3 you3 dao4 li5", "Lời bạn nói rất có lý."],
    [
      "换个角度想一想，问题就简单了。",
      "huan4 ge4 jiao3 du4 xiang3 yi1 xiang3 wen4 ti2 jiu4 jian3 dan1 le5",
      "Thử nghĩ từ góc độ khác, vấn đề sẽ đơn giản thôi.",
    ],
  ]),
  81: rows([
    ["这次考试你有把握吗？", "zhe4 ci4 kao3 shi4 ni3 you3 ba3 wo4 ma5", "Kỳ thi này bạn có nắm chắc không?"],
    ["我根本不知道这件事。", "wo3 gen1 ben3 bu4 zhi1 dao4 zhe4 jian4 shi4", "Tôi hoàn toàn không biết chuyện này."],
    [
      "你能说得具体一点儿吗？",
      "ni3 neng2 shuo1 de2 ju4 ti3 yi1 dian3 er2 ma5",
      "Bạn có thể nói cụ thể hơn một chút không?",
    ],
  ]),
  82: rows([
    ["这两个词有什么差别？", "zhe4 liang3 ge4 ci2 you3 shen2 me5 cha1 bie2", "Hai từ này khác nhau ở chỗ nào?"],
    [
      "他听了这个消息，没有什么反应。",
      "ta1 ting1 le5 zhe4 ge5 xiao1 xi5 mei2 you3 shen2 me5 fan3 ying4",
      "Nghe tin này, anh ấy không có phản ứng gì.",
    ],
    [
      "你知道三加五等于几吗？",
      "ni3 zhi1 dao4 san1 jia1 wu3 deng3 yu2 ji3 ma5",
      "Bạn có biết ba cộng năm bằng mấy không?",
    ],
  ]),
  83: rows([
    [
      "这次失败给了我一个很大的教训。",
      "zhe4 ci4 shi1 bai4 gei3 le5 wo3 yi1 ge4 hen3 da4 de5 jiao4 xun5",
      "Lần thất bại này cho tôi một bài học lớn.",
    ],
    [
      "他对吃的东西特别讲究。",
      "ta1 dui4 chi1 de5 dong1 xi5 te4 bie2 jiang3 jiu5",
      "Anh ấy đặc biệt cầu kỳ trong chuyện ăn uống.",
    ],
    [
      "你这样做会有什么后果？",
      "ni3 zhe4 yang4 zuo4 hui4 you3 shen2 me5 hou4 guo3",
      "Bạn làm như vậy sẽ có hậu quả gì?",
    ],
  ]),
  84: rows([
    [
      "这件事你要好好思考一下。",
      "zhe4 jian4 shi4 ni3 yao4 hao3 hao3 si1 kao3 yi1 xia4",
      "Việc này bạn phải suy nghĩ kỹ một chút.",
    ],
    [
      "他的话给了我很大的启发。",
      "ta1 de5 hua4 gei3 le5 wo3 hen3 da4 de5 qi3 fa1",
      "Lời anh ấy đã gợi mở cho tôi rất nhiều.",
    ],
    ["看问题不能太片面。", "kan4 wen4 ti2 bu4 neng2 tai4 pian4 mian4", "Nhìn nhận vấn đề không được quá phiến diện."],
  ]),
  85: rows([
    [
      "这个电影是根据真实的故事拍的。",
      "zhe4 ge5 dian4 ying3 shi4 gen1 ju4 zhen1 shi2 de5 gu4 shi5 pai1 de5",
      "Bộ phim này được quay dựa trên câu chuyện có thật.",
    ],
    ["事实证明，他是对的。", "shi4 shi2 zheng4 ming2 ta1 shi4 dui4 de5", "Sự thật chứng minh anh ấy đúng."],
    ["做事要注意细节。", "zuo4 shi4 yao4 zhu4 yi4 xi4 jie2", "Làm việc phải chú ý đến chi tiết."],
  ]),
  86: rows([
    [
      "只要努力，你的目标一定能实现。",
      "zhi3 yao4 nu3 li4 ni3 de5 mu4 biao1 yi1 ding4 neng2 shi2 xian4",
      "Chỉ cần cố gắng, mục tiêu của bạn nhất định sẽ thành hiện thực.",
    ],
    [
      "今天运气真好，一出门就打到车了。",
      "jin1 tian1 yun4 qi5 zhen1 hao3 yi1 chu1 men2 jiu4 da3 dao4 che1 le5",
      "Hôm nay may thật, vừa ra cửa đã bắt được xe.",
    ],
    [
      "我们是在一次旅行中偶然认识的。",
      "wo3 men5 shi4 zai4 yi1 ci4 lü3 xing2 zhong1 ou3 ran2 ren4 shi5 de5",
      "Chúng tôi quen nhau tình cờ trong một chuyến du lịch.",
    ],
  ]),
  87: rows([
    [
      "遇到困难不要怕，要勇敢面对。",
      "yu4 dao4 kun4 nan5 bu4 yao4 pa4 yao4 yong3 gan3 mian4 dui4",
      "Gặp khó khăn đừng sợ, phải dũng cảm đối mặt.",
    ],
    [
      "他缺乏经验，但是很善于学习。",
      "ta1 que1 fa2 jing1 yan4 dan4 shi4 hen3 shan4 yu2 xue2 xi2",
      "Anh ấy thiếu kinh nghiệm nhưng rất giỏi học hỏi.",
    ],
    [
      "作为学生，你应该自觉学习。",
      "zuo4 wei2 xue2 sheng5 ni3 ying1 gai1 zi4 jue2 xue2 xi2",
      "Là học sinh, em nên tự giác học tập.",
    ],
  ]),
  88: rows([
    ["对不起，我踩到你的脚了。", "dui4 bu5 qi3 wo3 cai3 dao4 ni3 de5 jiao3 le5", "Xin lỗi, tôi giẫm vào chân bạn rồi."],
    ["请把那本书递给我。", "qing3 ba3 na4 ben3 shu1 di4 gei3 wo3", "Làm ơn đưa giúp tôi cuốn sách kia."],
    ["奶奶，我扶您过马路吧。", "nai3 nai5 wo3 fu2 nin2 guo4 ma3 lu4 ba5", "Bà ơi, cháu dìu bà qua đường nhé."],
  ]),
  89: rows([
    [
      "屋顶漏水了，快找人来修。",
      "wu1 ding3 lou4 shui3 le5 kuai4 zhao3 ren2 lai2 xiu1",
      "Mái nhà dột rồi, mau tìm người đến sửa.",
    ],
    [
      "对不起，耽误你的时间了。",
      "dui4 bu5 qi3 dan1 wu5 ni3 de5 shi2 jian1 le5",
      "Xin lỗi, làm mất thời gian của bạn rồi.",
    ],
    [
      "我们轮流做饭，好不好？",
      "wo3 men5 lun2 liu2 zuo4 fan4 hao3 bu4 hao3",
      "Chúng ta thay phiên nhau nấu cơm, được không?",
    ],
  ]),
  90: rows([
    ["写完文件别忘了保存。", "xie3 wan2 wen2 jian4 bie2 wang4 le5 bao3 cun2", "Viết xong tài liệu đừng quên lưu lại."],
    [
      "多运动能保持身体健康。",
      "duo1 yun4 dong4 neng2 bao3 chi2 shen1 ti3 jian4 kang1",
      "Vận động nhiều giúp giữ cơ thể khỏe mạnh.",
    ],
    ["博物馆星期一不开放。", "bo2 wu4 guan3 xing1 qi1 yi1 bu4 kai1 fang4", "Bảo tàng không mở cửa vào thứ hai."],
  ]),
  91: rows([
    ["放心，我会尽力帮你的。", "fang4 xin1 wo3 hui4 jin4 li4 bang1 ni3 de5", "Yên tâm, tôi sẽ cố hết sức giúp bạn."],
    [
      "只要努力，什么困难都能克服。",
      "zhi3 yao4 nu3 li4 shen2 me5 kun4 nan5 dou1 neng2 ke4 fu2",
      "Chỉ cần cố gắng, khó khăn nào cũng vượt qua được.",
    ],
    [
      "为了避免迟到，我早点儿出门。",
      "wei4 le5 bi4 mian3 chi2 dao4 wo3 zao3 dian3 er2 chu1 men2",
      "Để tránh bị muộn, tôi ra khỏi nhà sớm một chút.",
    ],
  ]),
  92: rows([
    [
      "上课的时候要集中注意力。",
      "shang4 ke4 de5 shi2 hou5 yao4 ji2 zhong1 zhu4 yi4 li4",
      "Lúc học phải tập trung chú ý.",
    ],
    [
      "我建议你早点儿去看医生。",
      "wo3 jian4 yi4 ni3 zao3 dian3 er2 qu4 kan4 yi1 sheng1",
      "Tôi khuyên bạn nên đi khám sớm.",
    ],
    [
      "我们要好好利用周末的时间。",
      "wo3 men5 yao4 hao3 hao3 li4 yong4 zhou1 mo4 de5 shi2 jian1",
      "Chúng ta phải tận dụng tốt thời gian cuối tuần.",
    ],
  ]),
  93: rows([
    [
      "你闻一闻，这朵花香不香？",
      "ni3 wen2 yi1 wen2 zhe4 duo3 hua1 xiang1 bu4 xiang1",
      "Bạn ngửi thử xem bông hoa này có thơm không?",
    ],
    [
      "他睁开眼睛，看了看窗外。",
      "ta1 zheng1 kai1 yan3 jing5 kan4 le5 kan4 chuang1 wai4",
      "Anh ấy mở mắt ra, nhìn ra ngoài cửa sổ.",
    ],
    [
      "别摸那个小狗，它会咬人。",
      "bie2 mo1 na4 ge5 xiao3 gou3 ta1 hui4 yao3 ren2",
      "Đừng sờ con chó nhỏ đó, nó cắn người đấy.",
    ],
  ]),
  94: rows([
    [
      "累了吧？我们歇一会儿再走。",
      "lei4 le5 ba5 wo3 men5 xie1 yi1 hui4 r5 zai4 zou3",
      "Mệt rồi phải không? Mình nghỉ một lát rồi đi tiếp.",
    ],
    [
      "时间不多了，大家抓紧点儿。",
      "shi2 jian1 bu4 duo1 le5 da4 jia1 zhua1 jin3 dian3 er2",
      "Không còn nhiều thời gian, mọi người khẩn trương lên.",
    ],
    [
      "这件衣服太小了，我想去商店退了。",
      "zhe4 jian4 yi1 fu5 tai4 xiao3 le5 wo3 xiang3 qu4 shang1 dian4 tui4 le5",
      "Cái áo này nhỏ quá, tôi muốn đem ra cửa hàng trả lại.",
    ],
  ]),
  95: rows([
    [
      "谢谢你给我这么宝贵的意见。",
      "xie4 xie5 ni3 gei3 wo3 zhe4 me5 bao3 gui4 de5 yi4 jian4",
      "Cảm ơn bạn đã cho tôi ý kiến quý báu như vậy.",
    ],
    [
      "这个箱子很结实，你放心吧。",
      "zhe4 ge5 xiang1 zi3 hen3 jie1 shi5 ni3 fang4 xin1 ba5",
      "Cái vali này rất chắc, bạn cứ yên tâm.",
    ],
    [
      "他是一个非常可靠的朋友。",
      "ta1 shi4 yi1 ge4 fei1 chang2 ke3 kao4 de5 peng2 you5",
      "Anh ấy là một người bạn rất đáng tin cậy.",
    ],
  ]),
  96: rows([
    [
      "没有必要为这点小事生气。",
      "mei2 you3 bi4 yao4 wei4 zhe4 dian3 xiao3 shi4 sheng1 qi4",
      "Không cần thiết phải giận vì chuyện nhỏ này.",
    ],
    [
      "你这样说就有点儿过分了。",
      "ni3 zhe4 yang4 shuo1 jiu4 you3 dian3 r5 guo4 fen4 le5",
      "Bạn nói thế thì hơi quá đáng rồi.",
    ],
    ["我想和你单独谈谈。", "wo3 xiang3 he2 ni3 dan1 du2 tan2 tan2", "Tôi muốn nói chuyện riêng với bạn."],
  ]),
  97: rows([
    [
      "时间不早了，我们赶紧走吧。",
      "shi2 jian1 bu4 zao3 le5 wo3 men5 gan3 jin3 zou3 ba5",
      "Muộn rồi, chúng ta mau đi thôi.",
    ],
    [
      "他匆忙地吃了几口就走了。",
      "ta1 cong1 mang2 di4 chi1 le5 ji3 kou3 jiu4 zou3 le5",
      "Anh ấy vội vàng ăn vài miếng rồi đi.",
    ],
    [
      "你有空闲的时候来我家玩。",
      "ni3 you3 kong4 xian2 de5 shi2 hou5 lai2 wo3 jia1 wan2",
      "Lúc nào rảnh bạn đến nhà tôi chơi nhé.",
    ],
  ]),
  98: rows([
    [
      "你干脆别去了，在家休息吧。",
      "ni3 gan1 cui4 bie2 qu4 le5 zai4 jia1 xiu1 xi5 ba5",
      "Hay bạn đừng đi nữa, ở nhà nghỉ đi.",
    ],
    [
      "这个城市的变化非常巨大。",
      "zhe4 ge5 cheng2 shi4 de5 bian4 hua4 fei1 chang2 ju4 da4",
      "Sự thay đổi của thành phố này vô cùng lớn.",
    ],
    [
      "我们的未来一定是光明的。",
      "wo3 men5 de5 wei4 lai2 yi1 ding4 shi4 guang1 ming2 de5",
      "Tương lai của chúng ta nhất định sẽ tươi sáng.",
    ],
  ]),
  99: rows([
    [
      "我永远忘不了第一次见面的情景。",
      "wo3 yong3 yuan3 wang4 bu4 liao3 di4 yi1 ci4 jian4 mian4 de5 qing2 jing3",
      "Tôi mãi không quên cảnh lần đầu gặp mặt.",
    ],
    [
      "他今天的状态不太好。",
      "ta1 jin1 tian1 de5 zhuang4 tai4 bu4 tai4 hao3",
      "Hôm nay phong độ của anh ấy không tốt lắm.",
    ],
    [
      "整个下午我都在图书馆看书。",
      "zheng3 ge4 xia4 wu3 wo3 dou1 zai4 tu2 shu1 guan3 kan4 shu1",
      "Cả buổi chiều tôi đều đọc sách ở thư viện.",
    ],
  ]),
  100: rows([
    ["最近菜价又涨了。", "zui4 jin4 cai4 jia4 you4 zhang3 le5", "Dạo này giá rau lại tăng rồi."],
    [
      "他这学期成绩退步了不少。",
      "ta1 zhe4 xue2 qi1 cheng2 ji4 tui4 bu4 le5 bu4 shao3",
      "Học kỳ này thành tích của cậu ấy sa sút khá nhiều.",
    ],
    [
      "飞机越飞越高，最后消失在云里。",
      "fei1 ji1 yue4 fei1 yue4 gao1 zui4 hou4 xiao1 shi1 zai4 yun2 li3",
      "Máy bay càng bay càng cao, cuối cùng biến mất trong mây.",
    ],
  ]),
  101: rows([
    [
      "她喜欢穿颜色鲜艳的衣服。",
      "ta1 xi3 huan5 chuan1 yan2 se4 xian1 yan4 de5 yi1 fu5",
      "Cô ấy thích mặc quần áo màu sắc rực rỡ.",
    ],
    ["你的帽子戴歪了。", "ni3 de5 mao4 zi5 dai4 wai1 le5", "Mũ của bạn đội lệch rồi."],
    [
      "这条河很浅，孩子们常在这里玩儿。",
      "zhe4 tiao2 he2 hen3 qian3 hai2 zi5 men5 chang2 zai4 zhe4 li3 wan2 er2",
      "Con sông này rất nông, bọn trẻ hay chơi ở đây.",
    ],
  ]),
  102: rows([
    ["你是我唯一的朋友。", "ni3 shi4 wo3 wei2 yi1 de5 peng2 you5", "Bạn là người bạn duy nhất của tôi."],
    ["大家的意见很一致。", "da4 jia1 de5 yi4 jian4 hen3 yi1 zhi4", "Ý kiến của mọi người rất thống nhất."],
    [
      "没戴眼镜，我看什么都很模糊。",
      "mei2 dai4 yan3 jing4 wo3 kan4 shen2 me5 dou1 hen3 mo2 hu5",
      "Không đeo kính, tôi nhìn cái gì cũng mờ.",
    ],
  ]),
  103: rows([
    ["中国有悠久的历史。", "zhong1 guo2 you3 you1 jiu3 de5 li4 shi3", "Trung Quốc có lịch sử lâu đời."],
    [
      "这个故事给我留下了很深刻的印象。",
      "zhe4 ge5 gu4 shi5 gei3 wo3 liu2 xia4 le5 hen3 shen1 ke4 de5 yin4 xiang4",
      "Câu chuyện này để lại cho tôi ấn tượng rất sâu sắc.",
    ],
    [
      "他穿上西装，显得很成熟。",
      "ta1 chuan1 shang4 xi1 zhuang1 xian3 de5 hen3 cheng2 shu2",
      "Anh ấy mặc vest vào trông rất chín chắn.",
    ],
  ]),
  104: rows([
    ["今天下午我有两节课。", "jin1 tian1 xia4 wu3 wo3 you3 liang3 jie2 ke4", "Chiều nay tôi có hai tiết học."],
    [
      "墙上挂着一幅很美的画。",
      "qiang2 shang4 gua4 zhe5 yi1 fu2 hen3 mei3 de5 hua4",
      "Trên tường treo một bức tranh rất đẹp.",
    ],
    [
      "这只大象大概有五吨重。",
      "zhe4 zhi1 da4 xiang4 da4 gai4 you3 wu3 dun1 zhong4",
      "Con voi này nặng khoảng năm tấn.",
    ],
  ]),
  105: rows([
    ["刚才下了一阵大雨。", "gang1 cai2 xia4 le5 yi1 zhen4 da4 yu3", "Vừa nãy có một trận mưa to."],
    [
      "这套房子的面积有一百多平方米。",
      "zhe4 tao4 fang2 zi5 de5 mian4 ji1 you3 yi1 bai3 duo1 ping2 fang1 mi3",
      "Diện tích căn hộ này hơn một trăm mét vuông.",
    ],
    [
      "这个箱子太重了，我拿不动。",
      "zhe4 ge5 xiang1 zi3 tai4 zhong4 le5 wo3 na2 bu4 dong4",
      "Cái va li này nặng quá, tôi xách không nổi.",
    ],
  ]),
  106: rows([
    [
      "快走吧，不然就要迟到了。",
      "kuai4 zou3 ba5 bu4 ran2 jiu4 yao4 chi2 dao4 le5",
      "Mau đi thôi, nếu không sẽ muộn mất.",
    ],
    [
      "假如明天下雨，我们就不去了。",
      "jia3 ru2 ming2 tian1 xia4 yu3 wo3 men5 jiu4 bu4 qu4 le5",
      "Nếu mai trời mưa thì chúng ta không đi nữa.",
    ],
    [
      "我很喜欢水果，比如苹果和香蕉。",
      "wo3 hen3 xi3 huan5 shui3 guo3 bi3 ru2 ping2 guo3 he2 xiang1 jiao1",
      "Tôi rất thích trái cây, ví dụ như táo và chuối.",
    ],
  ]),
  107: rows([
    ["他毕竟还是个孩子。", "ta1 bi4 jing4 hai2 shi5 ge4 hai2 zi5", "Dù sao nó vẫn còn là một đứa trẻ."],
    [
      "怪不得你这么累，原来昨天没睡觉。",
      "guai4 bu5 de5 ni3 zhe4 me5 lei4 yuan2 lai2 zuo2 tian1 mei2 shui4 jiao4",
      "Thảo nào bạn mệt thế, hóa ra hôm qua không ngủ.",
    ],
    [
      "多亏你帮忙，不然我就麻烦了。",
      "duo1 kui1 ni3 bang1 mang2 bu4 ran2 wo3 jiu4 ma2 fan5 le5",
      "May mà có bạn giúp, không thì tôi gặp rắc rối rồi.",
    ],
  ]),
  108: rows([
    ["你不必担心，我自己能行。", "ni3 bu4 bi4 dan1 xin1 wo3 zi4 ji3 neng2 xing2", "Bạn không cần lo, tôi tự làm được."],
    ["据说明天会下大雪。", "ju4 shuo1 ming2 tian1 hui4 xia4 da4 xue3", "Nghe nói mai sẽ có tuyết rơi dày."],
    [
      "趁天还没黑，我们快回家吧。",
      "chen4 tian1 hai2 mei2 hei1 wo3 men5 kuai4 hui2 jia1 ba5",
      "Nhân lúc trời chưa tối, chúng ta mau về nhà thôi.",
    ],
  ]),
  109: rows([
    [
      "哪怕再忙，他每天都给妈妈打电话。",
      "na3 pa4 zai4 mang2 ta1 mei3 tian1 dou1 gei3 ma1 ma5 da3 dian4 hua4",
      "Dù bận đến mấy, ngày nào anh ấy cũng gọi điện cho mẹ.",
    ],
    [
      "带上雨伞吧，万一下雨呢？",
      "dai4 shang4 yu3 san3 ba5 wan4 yi1 xia4 yu3 ne5",
      "Mang theo ô đi, lỡ trời mưa thì sao?",
    ],
    [
      "我宁可走路，也不想挤公共汽车。",
      "wo3 ning4 ke3 zou3 lu4 ye3 bu4 xiang3 ji3 gong1 gong4 qi4 che1",
      "Tôi thà đi bộ còn hơn chen chúc trên xe buýt.",
    ],
  ]),
  110: rows([
    [
      "外面下雪了，难怪这么冷。",
      "wai4 mian4 xia4 xue3 le5 nan2 guai4 zhe4 me5 leng3",
      "Ngoài trời có tuyết rơi, thảo nào lạnh thế.",
    ],
    [
      "幸亏你提醒我，不然我就忘了。",
      "xing4 kui1 ni3 ti2 xing3 wo3 bu4 ran2 wo3 jiu4 wang4 le5",
      "May mà bạn nhắc tôi, không thì tôi quên mất rồi.",
    ],
    [
      "等了半天，公共汽车总算来了。",
      "deng3 le5 ban4 tian1 gong1 gong4 qi4 che1 zong3 suan4 lai2 le5",
      "Đợi mãi, cuối cùng xe buýt cũng đến.",
    ],
  ]),
  111: rows([
    [
      "这是我特意为你做的蛋糕。",
      "zhe4 shi4 wo3 te4 yi4 wei4 ni3 zuo4 de5 dan4 gao1",
      "Đây là chiếc bánh tôi làm riêng cho bạn.",
    ],
    ["有问题可以随时问我。", "you3 wen4 ti2 ke3 yi3 sui2 shi2 wen4 wo3", "Có vấn đề gì cứ hỏi tôi bất cứ lúc nào."],
    [
      "孩子在睡觉，我们悄悄说话吧。",
      "hai2 zi5 zai4 shui4 jiao4 wo3 men5 qiao1 qiao1 shuo1 hua4 ba5",
      "Con đang ngủ, chúng ta nói khẽ thôi.",
    ],
  ]),
};
