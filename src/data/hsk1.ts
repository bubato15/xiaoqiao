/**
 * HSK 1 (HSK 2.0 list, 150 words) grouped into themed lessons.
 * Pinyin uses tone numbers with 5 for the neutral tone and is checked against
 * data/hsk/old-1.json (complete-hsk-vocabulary, MIT) by hsk1.test.ts.
 * Vietnamese meanings and Hán Việt readings are written for this app and still need a reviewer.
 */
export interface Word {
  hanzi: string;
  pinyin: string;
  vi: string;
  /** Hán Việt reading; empty when not commonly used or not yet confirmed. */
  hanViet: string;
}

export interface Lesson {
  id: number;
  title: string;
  /** Broad theme used to group lessons on the level page (HSK 3 and up). */
  topic?: string;
  words: Word[];
}

type Row = [hanzi: string, pinyin: string, vi: string, hanViet: string];

const lesson = (id: number, title: string, rows: Row[]): Lesson => ({
  id,
  title,
  words: rows.map(([hanzi, pinyin, vi, hanViet]) => ({ hanzi, pinyin, vi, hanViet })),
});

export const HSK1_REVIEWED = false;

export const HSK1: Lesson[] = [
  lesson(1, "Chào hỏi và lịch sự", [
    ["你", "ni3", "bạn, anh, chị", "nễ"],
    ["我", "wo3", "tôi", "ngã"],
    ["我们", "wo3 men5", "chúng tôi, chúng ta", "ngã môn"],
    ["他", "ta1", "anh ấy, ông ấy", "tha"],
    ["她", "ta1", "cô ấy, bà ấy", "tha"],
    ["好", "hao3", "tốt, khỏe, được", "hảo"],
    ["谢谢", "xie4 xie5", "cảm ơn", "tạ tạ"],
    ["不客气", "bu4 ke4 qi5", "không có gì, đừng khách sáo", "bất khách khí"],
    ["对不起", "dui4 bu5 qi3", "xin lỗi", "đối bất khởi"],
    ["没关系", "mei2 guan1 xi5", "không sao", "một quan hệ"],
    ["再见", "zai4 jian4", "tạm biệt", "tái kiến"],
    ["请", "qing3", "mời, xin, làm ơn", "thỉnh"],
    ["喂", "wei2", "alô (khi nghe điện thoại)", ""],
  ]),
  lesson(2, "Con số", [
    ["一", "yi1", "một", "nhất"],
    ["二", "er4", "hai", "nhị"],
    ["三", "san1", "ba", "tam"],
    ["四", "si4", "bốn", "tứ"],
    ["五", "wu3", "năm", "ngũ"],
    ["六", "liu4", "sáu", "lục"],
    ["七", "qi1", "bảy", "thất"],
    ["八", "ba1", "tám", "bát"],
    ["九", "jiu3", "chín", "cửu"],
    ["十", "shi2", "mười", "thập"],
    ["零", "ling2", "số không", "linh"],
    ["几", "ji3", "mấy (hỏi số lượng nhỏ)", "kỉ"],
    ["多少", "duo1 shao5", "bao nhiêu", "đa thiểu"],
  ]),
  lesson(3, "Gia đình và mọi người", [
    ["爸爸", "ba4 ba5", "bố", "ba ba"],
    ["妈妈", "ma1 ma5", "mẹ", "ma ma"],
    ["儿子", "er2 zi5", "con trai", "nhi tử"],
    ["女儿", "nü3 er2", "con gái", "nữ nhi"],
    ["家", "jia1", "nhà, gia đình", "gia"],
    ["朋友", "peng2 you5", "bạn bè", "bằng hữu"],
    ["同学", "tong2 xue2", "bạn học", "đồng học"],
    ["老师", "lao3 shi1", "thầy giáo, cô giáo", "lão sư"],
    ["学生", "xue2 sheng5", "học sinh", "học sinh"],
    ["医生", "yi1 sheng1", "bác sĩ", "y sinh"],
    ["先生", "xian1 sheng5", "ông, ngài", "tiên sinh"],
    ["小姐", "xiao3 jie5", "cô (gọi phụ nữ trẻ)", "tiểu thư"],
    ["人", "ren2", "người", "nhân"],
  ]),
  lesson(4, "Hỏi và đáp", [
    ["是", "shi4", "là, đúng", "thị"],
    ["吗", "ma5", "không? (trợ từ hỏi)", ""],
    ["呢", "ne5", "còn ... thì sao? (trợ từ)", ""],
    ["什么", "shen2 me5", "cái gì", "thập ma"],
    ["谁", "shei2", "ai", "thùy"],
    ["哪", "na3", "nào", ""],
    ["那", "na4", "kia, đó", ""],
    ["这", "zhe4", "này, đây", "giá"],
    ["怎么", "zen3 me5", "thế nào, sao", "chẩm ma"],
    ["怎么样", "zen3 me5 yang4", "như thế nào", "chẩm ma dạng"],
    ["叫", "jiao4", "gọi, tên là", "khiếu"],
    ["名字", "ming2 zi5", "tên", "danh tự"],
    ["的", "de5", "của (trợ từ)", "đích"],
  ]),
  lesson(5, "Thời gian", [
    ["今天", "jin1 tian1", "hôm nay", "kim thiên"],
    ["明天", "ming2 tian1", "ngày mai", "minh thiên"],
    ["昨天", "zuo2 tian1", "hôm qua", "tạc thiên"],
    ["年", "nian2", "năm", "niên"],
    ["月", "yue4", "tháng", "nguyệt"],
    ["日", "ri4", "ngày", "nhật"],
    ["星期", "xing1 qi1", "tuần, thứ", "tinh kỳ"],
    ["现在", "xian4 zai4", "bây giờ", "hiện tại"],
    ["时候", "shi2 hou5", "lúc, khi", "thời hậu"],
    ["点", "dian3", "giờ", "điểm"],
    ["分钟", "fen1 zhong1", "phút", "phân chung"],
    ["上午", "shang4 wu3", "buổi sáng", "thượng ngọ"],
    ["中午", "zhong1 wu3", "buổi trưa", "trung ngọ"],
    ["下午", "xia4 wu3", "buổi chiều", "hạ ngọ"],
  ]),
  lesson(6, "Ăn uống", [
    ["吃", "chi1", "ăn", "ngật"],
    ["喝", "he1", "uống", "hát"],
    ["菜", "cai4", "món ăn, rau", "thái"],
    ["茶", "cha2", "trà", "trà"],
    ["水", "shui3", "nước", "thủy"],
    ["米饭", "mi3 fan4", "cơm", "mễ phạn"],
    ["水果", "shui3 guo3", "hoa quả", "thủy quả"],
    ["苹果", "ping2 guo3", "táo", "bình quả"],
    ["杯子", "bei1 zi5", "cái cốc", "bôi tử"],
    ["饭馆", "fan4 guan3", "quán ăn", "phạn quán"],
  ]),
  lesson(7, "Mua sắm", [
    ["买", "mai3", "mua", "mãi"],
    ["钱", "qian2", "tiền", "tiền"],
    ["块", "kuai4", "đồng (tiền, khẩu ngữ)", "khối"],
    ["东西", "dong1 xi5", "đồ vật", "đông tây"],
    ["商店", "shang1 dian4", "cửa hàng", "thương điếm"],
    ["衣服", "yi1 fu5", "quần áo", "y phục"],
    ["些", "xie1", "một vài, những", "ta"],
    ["个", "ge4", "cái, chiếc (lượng từ)", "cá"],
    ["本", "ben3", "quyển (lượng từ)", "bản"],
    ["少", "shao3", "ít", "thiểu"],
    ["多", "duo1", "nhiều", "đa"],
    ["太", "tai4", "quá", "thái"],
  ]),
  lesson(8, "Nơi chốn", [
    ["中国", "Zhong1 guo2", "Trung Quốc", "Trung Quốc"],
    ["北京", "Bei3 jing1", "Bắc Kinh", "Bắc Kinh"],
    ["学校", "xue2 xiao4", "trường học", "học hiệu"],
    ["医院", "yi1 yuan4", "bệnh viện", "y viện"],
    ["火车站", "huo3 che1 zhan4", "ga tàu hỏa", "hỏa xa trạm"],
    ["里", "li3", "bên trong", "lý"],
    ["上", "shang4", "trên", "thượng"],
    ["下", "xia4", "dưới", "hạ"],
    ["前面", "qian2 mian4", "phía trước", "tiền diện"],
    ["后面", "hou4 mian5", "phía sau", "hậu diện"],
    ["在", "zai4", "ở, tại", "tại"],
    ["住", "zhu4", "sống, ở", "trú"],
  ]),
  lesson(9, "Đi lại", [
    ["去", "qu4", "đi", "khứ"],
    ["来", "lai2", "đến", "lai"],
    ["回", "hui2", "về", "hồi"],
    ["坐", "zuo4", "ngồi, đi (xe)", "tọa"],
    ["开", "kai1", "mở, lái", "khai"],
    ["出租车", "chu1 zu1 che1", "taxi", "xuất tô xa"],
    ["飞机", "fei1 ji1", "máy bay", "phi cơ"],
  ]),
  lesson(10, "Học tập", [
    ["学习", "xue2 xi2", "học tập", "học tập"],
    ["汉语", "Han4 yu3", "tiếng Hán", "Hán ngữ"],
    ["字", "zi4", "chữ", "tự"],
    ["书", "shu1", "sách", "thư"],
    ["读", "du2", "đọc", "độc"],
    ["写", "xie3", "viết", "tả"],
    ["说话", "shuo1 hua4", "nói chuyện", "thuyết thoại"],
    ["听", "ting1", "nghe", "thính"],
    ["看", "kan4", "nhìn, xem", "khán"],
    ["看见", "kan4 jian4", "nhìn thấy", "khán kiến"],
    ["认识", "ren4 shi5", "quen biết", "nhận thức"],
    ["会", "hui4", "biết (làm gì)", "hội"],
    ["能", "neng2", "có thể", "năng"],
  ]),
  lesson(11, "Sở thích và cảm xúc", [
    ["爱", "ai4", "yêu", "ái"],
    ["喜欢", "xi3 huan5", "thích", "hỉ hoan"],
    ["想", "xiang3", "muốn, nhớ, nghĩ", "tưởng"],
    ["高兴", "gao1 xing4", "vui", "cao hứng"],
    ["漂亮", "piao4 liang5", "đẹp", "phiêu lượng"],
    ["大", "da4", "to, lớn", "đại"],
    ["小", "xiao3", "nhỏ", "tiểu"],
    ["很", "hen3", "rất", "ngận"],
    ["都", "dou1", "đều", "đô"],
    ["和", "he2", "và", "hòa"],
  ]),
  lesson(12, "Sinh hoạt hằng ngày", [
    ["工作", "gong1 zuo4", "làm việc, công việc", "công tác"],
    ["睡觉", "shui4 jiao4", "ngủ", "thụy giác"],
    ["做", "zuo4", "làm", "tố"],
    ["打电话", "da3 dian4 hua4", "gọi điện thoại", "đả điện thoại"],
    ["电脑", "dian4 nao3", "máy tính", "điện não"],
    ["电视", "dian4 shi4", "ti vi", "điện thị"],
    ["电影", "dian4 ying3", "phim", "điện ảnh"],
    ["有", "you3", "có", "hữu"],
    ["没", "mei2", "không, chưa", "một"],
    ["不", "bu4", "không", "bất"],
    ["了", "le5", "rồi (trợ từ)", "liễu"],
  ]),
  lesson(13, "Thời tiết và đồ vật", [
    ["天气", "tian1 qi4", "thời tiết", "thiên khí"],
    ["冷", "leng3", "lạnh", "lãnh"],
    ["热", "re4", "nóng", "nhiệt"],
    ["下雨", "xia4 yu3", "mưa", "hạ vũ"],
    ["猫", "mao1", "con mèo", "miêu"],
    ["狗", "gou3", "con chó", "cẩu"],
    ["桌子", "zhuo1 zi5", "cái bàn", "trác tử"],
    ["椅子", "yi3 zi5", "cái ghế", "ỷ tử"],
    ["岁", "sui4", "tuổi", "tuế"],
  ]),
];
