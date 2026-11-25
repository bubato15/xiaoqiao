/**
 * Themed practice topics for learners to memorize vocabulary and practice translation reflexes.
 * Pinyin uses citation tone numbers (5 = neutral); sandhi is applied at runtime by fromPinyin.
 */

export interface PracticeWord {
  hanzi: string;
  pinyin: string;
  vi: string;
  hanViet: string;
  category: string;
}

export interface PracticeSentence {
  id: number;
  hanzi: string;
  pinyin: string;
  vi: string;
  situation: string;
  keywords: string[];
}

export interface WritingExercise {
  id: number;
  question: string;
  hint: string;
  sampleAnswer: string;
  keywords: string[];
}

export interface PracticeTopic {
  id: string;
  title: string;
  chineseTitle: string;
  tag: string;
  description: string;
  icon: string;
  categories: string[];
  words: PracticeWord[];
  sentences: PracticeSentence[];
  writingExercises?: WritingExercise[];
}

export const FACTORY_TOPIC: PracticeTopic = {
  id: "cong-xuong",
  title: "Tiếng Trung công xưởng",
  chineseTitle: "工厂汉语",
  tag: "Chuyên đề thực chiến",
  description: "39 từ vựng thiết yếu về phòng ban, chức vụ, thiết bị, vận hành và 10 câu phản xạ dịch Việt - Trung thường dùng nhất trong nhà xưởng.",
  icon: "🏭",
  categories: [
    "Cơ cấu & Phòng ban",
    "Chức vụ & Nhân sự",
    "Vận hành & Quản lý",
    "Máy móc & Vật tư",
    "Chế độ & Môi trường",
  ],
  words: [
    // Cơ cấu & Phòng ban
    { hanzi: "公司", pinyin: "gong1 si1", vi: "công ty", hanViet: "công ty", category: "Cơ cấu & Phòng ban" },
    { hanzi: "部门", pinyin: "bu4 men2", vi: "phòng ban, bộ phận", hanViet: "bộ môn", category: "Cơ cấu & Phòng ban" },
    { hanzi: "生产部", pinyin: "sheng1 chan3 bu4", vi: "bộ phận sản xuất", hanViet: "sinh sản bộ", category: "Cơ cấu & Phòng ban" },
    { hanzi: "仓库部", pinyin: "cang1 ku4 bu4", vi: "bộ phận kho", hanViet: "thương khố bộ", category: "Cơ cấu & Phòng ban" },
    { hanzi: "人事部", pinyin: "ren2 shi4 bu4", vi: "bộ phận nhân sự", hanViet: "nhân sự bộ", category: "Cơ cấu & Phòng ban" },
    { hanzi: "财务部", pinyin: "cai2 wu4 bu4", vi: "bộ phận tài chính", hanViet: "tài vụ bộ", category: "Cơ cấu & Phòng ban" },
    { hanzi: "技术部", pinyin: "ji4 shu4 bu4", vi: "bộ phận kỹ thuật", hanViet: "kỹ thuật bộ", category: "Cơ cấu & Phòng ban" },
    { hanzi: "销售部", pinyin: "xiao1 shou4 bu4", vi: "bộ phận kinh doanh, bán hàng", hanViet: "tiêu thụ bộ", category: "Cơ cấu & Phòng ban" },

    // Chức vụ & Nhân sự
    { hanzi: "总经理", pinyin: "zong3 jing1 li3", vi: "tổng giám đốc", hanViet: "tổng kinh lý", category: "Chức vụ & Nhân sự" },
    { hanzi: "经理", pinyin: "jing1 li3", vi: "giám đốc, quản lý", hanViet: "kinh lý", category: "Chức vụ & Nhân sự" },
    { hanzi: "生产主管", pinyin: "sheng1 chan3 zhu3 guan3", vi: "chủ quản sản xuất", hanViet: "sinh sản chủ quản", category: "Chức vụ & Nhân sự" },
    { hanzi: "主管", pinyin: "zhu3 guan3", vi: "chủ quản, trưởng bộ phận", hanViet: "chủ quản", category: "Chức vụ & Nhân sự" },
    { hanzi: "班长", pinyin: "ban1 zhang3", vi: "ca trưởng, tổ trưởng", hanViet: "ban trưởng", category: "Chức vụ & Nhân sự" },
    { hanzi: "员工", pinyin: "yuan2 gong1", vi: "nhân viên, công nhân", hanViet: "viên công", category: "Chức vụ & Nhân sự" },
    { hanzi: "实习生", pinyin: "shi2 xi2 sheng1", vi: "thực tập sinh", hanViet: "thực tập sinh", category: "Chức vụ & Nhân sự" },

    // Vận hành & Quản lý
    { hanzi: "生产", pinyin: "sheng1 chan3", vi: "sản xuất", hanViet: "sinh sản", category: "Vận hành & Quản lý" },
    { hanzi: "计划", pinyin: "ji4 hua4", vi: "kế hoạch", hanViet: "kế họa", category: "Vận hành & Quản lý" },
    { hanzi: "检查", pinyin: "jian3 cha2", vi: "kiểm tra", hanViet: "kiểm tra", category: "Vận hành & Quản lý" },
    { hanzi: "操作", pinyin: "cao1 zuo4", vi: "thao tác, vận hành", hanViet: "thao tác", category: "Vận hành & Quản lý" },
    { hanzi: "维修", pinyin: "wei2 xiu1", vi: "bảo trì, sửa chữa", hanViet: "duy tu", category: "Vận hành & Quản lý" },
    { hanzi: "测试", pinyin: "ce4 shi4", vi: "kiểm tra, thử nghiệm (test)", hanViet: "trắc thí", category: "Vận hành & Quản lý" },
    { hanzi: "管理", pinyin: "guan3 li3", vi: "quản lý", hanViet: "quản lý", category: "Vận hành & Quản lý" },
    { hanzi: "质检", pinyin: "zhi4 jian3", vi: "kiểm tra chất lượng (QC)", hanViet: "chất kiểm", category: "Vận hành & Quản lý" },
    { hanzi: "提高效率", pinyin: "ti2 gao1 xiao4 lv4", vi: "nâng cao hiệu suất", hanViet: "đề cao hiệu suất", category: "Vận hành & Quản lý" },
    { hanzi: "任务", pinyin: "ren4 wu5", vi: "nhiệm vụ", hanViet: "nhiệm vụ", category: "Vận hành & Quản lý" },

    // Máy móc & Vật tư
    { hanzi: "机器", pinyin: "ji1 qi4", vi: "máy móc", hanViet: "cơ khí", category: "Máy móc & Vật tư" },
    { hanzi: "设备", pinyin: "she4 bei4", vi: "thiết bị", hanViet: "thiết bị", category: "Máy móc & Vật tư" },
    { hanzi: "生产线", pinyin: "sheng1 chan3 xian4", vi: "dây chuyền sản xuất", hanViet: "sinh sản tuyến", category: "Máy móc & Vật tư" },
    { hanzi: "流水线", pinyin: "liu2 shui3 xian4", vi: "dây chuyền lắp ráp, chuyền", hanViet: "lưu thủy tuyến", category: "Máy móc & Vật tư" },
    { hanzi: "模具", pinyin: "mu2 ju4", vi: "khuôn mẫu", hanViet: "mô cụ", category: "Máy móc & Vật tư" },
    { hanzi: "零件", pinyin: "ling2 jian4", vi: "linh kiện", hanViet: "linh kiện", category: "Máy móc & Vật tư" },
    { hanzi: "配件", pinyin: "pei4 jian4", vi: "phụ kiện", hanViet: "phối kiện", category: "Máy móc & Vật tư" },
    { hanzi: "原材料", pinyin: "yuan2 cai2 liao4", vi: "nguyên vật liệu", hanViet: "nguyên tài liệu", category: "Máy móc & Vật tư" },

    // Chế độ & Môi trường
    { hanzi: "工作时间", pinyin: "gong1 zuo4 shi2 jian1", vi: "thời gian làm việc", hanViet: "công tác thời gian", category: "Chế độ & Môi trường" },
    { hanzi: "加班", pinyin: "jia1 ban1", vi: "tăng ca", hanViet: "gia ban", category: "Chế độ & Môi trường" },
    { hanzi: "工资", pinyin: "gong1 zi1", vi: "tiền lương", hanViet: "công tư", category: "Chế độ & Môi trường" },
    { hanzi: "奖金", pinyin: "jiang3 jin1", vi: "tiền thưởng", hanViet: "tưởng kim", category: "Chế độ & Môi trường" },
    { hanzi: "安全", pinyin: "an1 quan2", vi: "an toàn", hanViet: "an toàn", category: "Chế độ & Môi trường" },
    { hanzi: "卫生", pinyin: "wei4 sheng1", vi: "vệ sinh", hanViet: "vệ sinh", category: "Chế độ & Môi trường" },
  ],
  sentences: [
    {
      id: 1,
      hanzi: "今天生产部需要加班吗？",
      pinyin: "jin1 tian1 sheng1 chan3 bu4 xu1 yao4 jia1 ban1 ma5",
      vi: "Hôm nay bộ phận sản xuất cần tăng ca không?",
      situation: "Hỏi lịch làm việc và tăng ca với ca trưởng hoặc chủ quản",
      keywords: ["生产部", "加班"],
    },
    {
      id: 2,
      hanzi: "这条生产线上的设备坏了，需要紧急维修。",
      pinyin: "zhe4 tiao2 sheng1 chan3 xian4 shang4 de5 she4 bei4 huai4 le5 xu1 yao4 jin3 ji2 wei2 xiu1",
      vi: "Thiết bị trên dây chuyền sản xuất này hỏng rồi, cần bảo trì khẩn cấp.",
      situation: "Báo cáo sự cố máy móc trên dây chuyền cho bộ phận kỹ thuật",
      keywords: ["生产线", "设备", "维修"],
    },
    {
      id: 3,
      hanzi: "生产主管要求我们做好质检，提高效率。",
      pinyin: "sheng1 chan3 zhu3 guan3 yao1 qiu2 wo3 men5 zuo4 hao3 zhi4 jian3 ti2 gao1 xiao4 lv4",
      vi: "Chủ quản sản xuất yêu cầu chúng ta làm tốt kiểm tra chất lượng và nâng cao hiệu suất.",
      situation: "Truyền đạt mục tiêu chất lượng và sản lượng trong buổi họp đầu ca",
      keywords: ["生产主管", "质检", "提高效率"],
    },
    {
      id: 4,
      hanzi: "原材料已经送进仓库部了吗？",
      pinyin: "yuan2 cai2 liao4 yi3 jing1 song4 jin4 cang1 ku4 bu4 le5 ma5",
      vi: "Nguyên vật liệu đã chuyển vào bộ phận kho chưa?",
      situation: "Kiểm tra tình trạng nhập hàng và chuẩn bị vật tư sản xuất",
      keywords: ["原材料", "仓库部"],
    },
    {
      id: 5,
      hanzi: "我们的工作时间是从早上八点到下午五点。",
      pinyin: "wo3 men5 de5 gong1 zuo4 shi2 jian1 shi4 cong2 zao3 shang5 ba1 dian3 dao4 xia4 wu3 wu3 dian3",
      vi: "Thời gian làm việc của chúng tôi là từ 8 giờ sáng đến 5 giờ chiều.",
      situation: "Giới thiệu thời gian làm việc hành chính cho nhân viên mới / thực tập sinh",
      keywords: ["工作时间", "员工"],
    },
    {
      id: 6,
      hanzi: "班长给新员工分配今天的任务。",
      pinyin: "ban1 zhang3 gei3 xin1 yuan2 gong1 fen1 pei4 jin1 tian1 de5 ren4 wu5",
      vi: "Tổ trưởng phân công nhiệm vụ hôm nay cho nhân viên mới.",
      situation: "Giao việc và hướng dẫn công việc đầu ca",
      keywords: ["班长", "员工", "任务"],
    },
    {
      id: 7,
      hanzi: "在车间里，安全和卫生是最重要的。",
      pinyin: "zai4 che1 jian1 li3 an1 quan2 he2 wei4 sheng1 shi4 zui4 zhong4 yao4 de5",
      vi: "Trong nhà xưởng, an toàn và vệ sinh là điều quan trọng nhất.",
      situation: "Quy tắc 5S và an toàn lao động trong xưởng sản xuất",
      keywords: ["安全", "卫生"],
    },
    {
      id: 8,
      hanzi: "技术部正在测试新的模具和零件。",
      pinyin: "ji4 shu4 bu4 zheng4 zai4 ce4 shi4 xin1 de5 mu2 ju4 he2 ling2 jian4",
      vi: "Bộ phận kỹ thuật đang thử nghiệm khuôn mẫu và linh kiện mới.",
      situation: "Phối hợp thử khuôn và nghiệm thu linh kiện mới",
      keywords: ["技术部", "测试", "模具", "零件"],
    },
    {
      id: 9,
      hanzi: "这个月如果完成生产计划，大家都会有奖金。",
      pinyin: "zhe4 ge4 yue4 ru2 guo3 wan2 cheng2 sheng1 chan3 ji4 hua4 da4 jia1 dou1 hui4 you3 jiang3 jin1",
      vi: "Tháng này nếu hoàn thành kế hoạch sản xuất, mọi người đều sẽ có tiền thưởng.",
      situation: "Động viên tinh thần làm việc để đạt chỉ tiêu sản xuất",
      keywords: ["生产", "计划", "奖金"],
    },
    {
      id: 10,
      hanzi: "操作这台机器要按照规定注意安全。",
      pinyin: "cao1 zuo4 zhe4 tai2 ji1 qi4 yao4 an4 zhao4 gui1 ding4 zhu4 yi4 an1 quan2",
      vi: "Thao tác máy móc này cần theo đúng quy định chú ý an toàn.",
      situation: "Nhắc nhở tuân thủ quy trình vận hành thiết bị an toàn",
      keywords: ["操作", "机器", "安全"],
    },
  ],
};

export const CANTEEN_TOPIC: PracticeTopic = {
  id: "do-an-cong-xuong",
  title: "Đồ ăn trong công xưởng",
  chineseTitle: "工厂饮食",
  tag: "Đời sống nhà xưởng",
  description: "45 từ vựng thiết yếu về nhà ăn, món ăn, khẩu vị, dụng cụ và 12 câu phản xạ giao tiếp thực tế khi đi ăn cơm, lấy đồ và tăng ca trong nhà máy.",
  icon: "🍱",
  categories: [
    "Bữa ăn & Nhà ăn",
    "Món ăn & Thực phẩm",
    "Khẩu vị & Gia vị",
    "Dụng cụ & Đồ uống",
    "Giao tiếp & Vệ sinh",
  ],
  words: [
    // Bữa ăn & Nhà ăn
    { hanzi: "食堂", pinyin: "shi2 tang2", vi: "nhà ăn, căng tin", hanViet: "thực đường", category: "Bữa ăn & Nhà ăn" },
    { hanzi: "饭堂", pinyin: "fan4 tang2", vi: "nhà ăn, phòng ăn", hanViet: "phạn đường", category: "Bữa ăn & Nhà ăn" },
    { hanzi: "饭卡", pinyin: "fan4 ka3", vi: "thẻ ăn, thẻ cơm", hanViet: "phạn tạp", category: "Bữa ăn & Nhà ăn" },
    { hanzi: "早餐", pinyin: "zao3 can1", vi: "bữa sáng", hanViet: "tảo xan", category: "Bữa ăn & Nhà ăn" },
    { hanzi: "午餐", pinyin: "wu3 can1", vi: "bữa trưa", hanViet: "ngọ xan", category: "Bữa ăn & Nhà ăn" },
    { hanzi: "晚餐", pinyin: "wan3 can1", vi: "bữa tối", hanViet: "vãn xan", category: "Bữa ăn & Nhà ăn" },
    { hanzi: "夜宵", pinyin: "ye4 xiao1", vi: "bữa ăn đêm, ăn khuya", hanViet: "dạ tiêu", category: "Bữa ăn & Nhà ăn" },
    { hanzi: "加班餐", pinyin: "jia1 ban1 can1", vi: "suất cơm tăng ca", hanViet: "gia ban xan", category: "Bữa ăn & Nhà ăn" },
    { hanzi: "排队", pinyin: "pai2 dui4", vi: "xếp hàng", hanViet: "bài đội", category: "Bữa ăn & Nhà ăn" },
    { hanzi: "打饭", pinyin: "da3 fan4", vi: "lấy cơm, xới cơm", hanViet: "đả phạn", category: "Bữa ăn & Nhà ăn" },
    { hanzi: "打菜", pinyin: "da3 cai4", vi: "lấy thức ăn, múc món", hanViet: "đả thái", category: "Bữa ăn & Nhà ăn" },

    // Món ăn & Thực phẩm
    { hanzi: "米饭", pinyin: "mi3 fan4", vi: "cơm trắng", hanViet: "mễ phạn", category: "Món ăn & Thực phẩm" },
    { hanzi: "馒头", pinyin: "man2 tou5", vi: "màn thầu, bánh bao chay", hanViet: "man đầu", category: "Món ăn & Thực phẩm" },
    { hanzi: "包子", pinyin: "bao1 zi5", vi: "bánh bao", hanViet: "bao tử", category: "Món ăn & Thực phẩm" },
    { hanzi: "面条", pinyin: "mian4 tiao2", vi: "mì sợi", hanViet: "miến điều", category: "Món ăn & Thực phẩm" },
    { hanzi: "荤菜", pinyin: "hun1 cai4", vi: "món mặn (thịt, cá)", hanViet: "huân thái", category: "Món ăn & Thực phẩm" },
    { hanzi: "素菜", pinyin: "su4 cai4", vi: "món chay, món rau", hanViet: "tố thái", category: "Món ăn & Thực phẩm" },
    { hanzi: "猪肉", pinyin: "zhu1 rou4", vi: "thịt heo, thịt lợn", hanViet: "trư nhục", category: "Món ăn & Thực phẩm" },
    { hanzi: "牛肉", pinyin: "niu2 rou4", vi: "thịt bò", hanViet: "ngưu nhục", category: "Món ăn & Thực phẩm" },
    { hanzi: "鸡肉", pinyin: "ji1 rou4", vi: "thịt gà", hanViet: "kê nhục", category: "Món ăn & Thực phẩm" },
    { hanzi: "鱼", pinyin: "yu2", vi: "cá", hanViet: "ngư", category: "Món ăn & Thực phẩm" },
    { hanzi: "鸡蛋", pinyin: "ji1 dan4", vi: "trứng gà", hanViet: "kê đản", category: "Món ăn & Thực phẩm" },
    { hanzi: "蔬菜", pinyin: "shu1 cai4", vi: "rau xanh", hanViet: "sơ thái", category: "Món ăn & Thực phẩm" },
    { hanzi: "豆腐", pinyin: "dou4 fu5", vi: "đậu phụ, tàu hũ", hanViet: "đậu hũ", category: "Món ăn & Thực phẩm" },
    { hanzi: "汤", pinyin: "tang1", vi: "canh, súp", hanViet: "thang", category: "Món ăn & Thực phẩm" },

    // Khẩu vị & Gia vị
    { hanzi: "好吃", pinyin: "hao3 chi1", vi: "ngon, ngon miệng", hanViet: "hảo ngật", category: "Khẩu vị & Gia vị" },
    { hanzi: "难吃", pinyin: "nan2 chi1", vi: "dở, khó ăn", hanViet: "nan ngật", category: "Khẩu vị & Gia vị" },
    { hanzi: "辣", pinyin: "la4", vi: "cay", hanViet: "lạt", category: "Khẩu vị & Gia vị" },
    { hanzi: "不辣", pinyin: "bu4 la4", vi: "không cay", hanViet: "bất lạt", category: "Khẩu vị & Gia vị" },
    { hanzi: "咸", pinyin: "xian2", vi: "mặn", hanViet: "hàm", category: "Khẩu vị & Gia vị" },
    { hanzi: "淡", pinyin: "dan4", vi: "nhạt", hanViet: "đạm", category: "Khẩu vị & Gia vị" },
    { hanzi: "油腻", pinyin: "you2 ni4", vi: "nhiều dầu mỡ, ngấy", hanViet: "du nị", category: "Khẩu vị & Gia vị" },
    { hanzi: "辣椒酱", pinyin: "la4 jiao1 jiang4", vi: "tương ớt", hanViet: "lạt tiêu tương", category: "Khẩu vị & Gia vị" },
    { hanzi: "酱油", pinyin: "jiang4 you2", vi: "nước tương, xì dầu", hanViet: "tương du", category: "Khẩu vị & Gia vị" },

    // Dụng cụ & Đồ uống
    { hanzi: "餐盘", pinyin: "can1 pan2", vi: "khay cơm, khay ăn", hanViet: "xan bàn", category: "Dụng cụ & Đồ uống" },
    { hanzi: "筷子", pinyin: "kuai4 zi5", vi: "đũa", hanViet: "khoái tử", category: "Dụng cụ & Đồ uống" },
    { hanzi: "勺子", pinyin: "shao2 zi5", vi: "thìa, muỗng", hanViet: "chước tử", category: "Dụng cụ & Đồ uống" },
    { hanzi: "纸巾", pinyin: "zhi3 jin1", vi: "khăn giấy, giấy ăn", hanViet: "chỉ cân", category: "Dụng cụ & Đồ uống" },
    { hanzi: "开水", pinyin: "kai1 shui3", vi: "nước sôi, nước nóng", hanViet: "khai thủy", category: "Dụng cụ & Đồ uống" },
    { hanzi: "饮水机", pinyin: "yin3 shui3 ji1", vi: "cây nước nóng lạnh", hanViet: "ẩm thủy cơ", category: "Dụng cụ & Đồ uống" },

    // Giao tiếp & Vệ sinh
    { hanzi: "肚子饿", pinyin: "du4 zi5 e4", vi: "đói bụng", hanViet: "đỗ tử ngạ", category: "Giao tiếp & Vệ sinh" },
    { hanzi: "吃饱", pinyin: "chi1 bao3", vi: "ăn no", hanViet: "ngật bão", category: "Giao tiếp & Vệ sinh" },
    { hanzi: "倒残渣", pinyin: "dao4 can2 zha1", vi: "đổ thức ăn thừa", hanViet: "đảo tàn tra", category: "Giao tiếp & Vệ sinh" },
    { hanzi: "收盘子", pinyin: "shou1 pan2 zi5", vi: "thu dọn khay ăn", hanViet: "thu bàn tử", category: "Giao tiếp & Vệ sinh" },
    { hanzi: "浪费", pinyin: "lang4 fei4", vi: "lãng phí, bỏ phí", hanViet: "lãng phí", category: "Giao tiếp & Vệ sinh" },
  ],
  sentences: [
    {
      id: 1,
      hanzi: "十一点半了，我们一起去食堂吃饭吧。",
      pinyin: "shi2 yi1 dian3 ban4 le5 wo3 men5 yi1 qi3 qu4 shi2 tang2 chi1 fan4 ba5",
      vi: "11 giờ rưỡi rồi, chúng ta cùng đi nhà ăn ăn cơm nhé.",
      situation: "Rủ đồng nghiệp cùng đi ăn cơm khi đến giờ nghỉ trưa",
      keywords: ["食堂", "吃饭"],
    },
    {
      id: 2,
      hanzi: "今天你带饭卡了吗？我帮你刷。",
      pinyin: "jin1 tian1 ni3 dai4 fan4 ka3 le5 ma5 wo3 bang1 ni3 shua1",
      vi: "Hôm nay bạn có mang theo thẻ ăn không? Tôi quẹt giúp bạn.",
      situation: "Hỏi và giúp đồng nghiệp quẹt thẻ khi quên thẻ cơm",
      keywords: ["饭卡"],
    },
    {
      id: 3,
      hanzi: "开饭时间到了，请大家排队打饭。",
      pinyin: "kai1 fan4 shi2 jian1 dao4 le5 qing3 da4 jia1 pai2 dui4 da3 fan4",
      vi: "Đến giờ cơm rồi, mọi người vui lòng xếp hàng lấy cơm.",
      situation: "Nhắc nhở giữ trật tự xếp hàng tại quầy chia cơm",
      keywords: ["排队", "打饭"],
    },
    {
      id: 4,
      hanzi: "我要一份米饭，一个荤菜和两个素菜。",
      pinyin: "wo3 yao4 yi1 fen4 mi3 fan4 yi1 ge4 hun1 cai4 he2 liang3 ge4 su4 cai4",
      vi: "Tôi muốn một phần cơm, một món mặn và hai món rau.",
      situation: "Gọi món với nhân viên cấp dưỡng tại quầy thức ăn",
      keywords: ["米饭", "荤菜", "素菜"],
    },
    {
      id: 5,
      hanzi: "这个猪肉有点咸，汤有点淡。",
      pinyin: "zhe4 ge4 zhu1 rou4 you3 dian3 xian2 tang1 you3 dian3 dan4",
      vi: "Món thịt heo này hơi mặn, canh thì hơi nhạt.",
      situation: "Nhận xét khẩu vị món ăn cùng đồng nghiệp trong bữa cơm",
      keywords: ["猪肉", "咸", "汤", "淡"],
    },
    {
      id: 6,
      hanzi: "你能吃辣吗？这个菜放了很多辣椒。",
      pinyin: "ni3 neng2 chi1 la4 ma5 zhe4 ge4 cai4 fang4 le5 hen3 duo1 la4 jiao1",
      vi: "Bạn có ăn được cay không? Món này cho rất nhiều ớt đấy.",
      situation: "Hỏi khẩu vị và thói quen ăn uống của đồng nghiệp",
      keywords: ["辣"],
    },
    {
      id: 7,
      hanzi: "今晚我们部门加班，有加班餐吗？",
      pinyin: "jin1 wan3 wo3 men5 bu4 men2 jia1 ban1 you3 jia1 ban1 can1 ma5",
      vi: "Tối nay bộ phận chúng ta tăng ca, có cơm tăng ca không?",
      situation: "Hỏi ca trưởng hoặc phòng nhân sự về chế độ suất ăn tăng ca",
      keywords: ["加班", "加班餐"],
    },
    {
      id: 8,
      hanzi: "请帮我拿一双筷子和一个勺子。",
      pinyin: "qing3 bang1 wo3 na2 yi1 shuang1 kuai4 zi5 he2 yi1 ge4 shao2 zi5",
      vi: "Làm phiền lấy giúp tôi một đôi đũa và một chiếc thìa.",
      situation: "Nhờ bạn cùng bàn lấy hộ đồ dùng ăn uống",
      keywords: ["筷子", "勺子"],
    },
    {
      id: 9,
      hanzi: "饮水机在那边，你可以自己倒开水。",
      pinyin: "yin3 shui3 ji1 zai4 na4 bian1 ni3 ke3 yi3 zi4 ji3 dao4 kai1 shui3",
      vi: "Cây nước nóng lạnh ở đằng kia, bạn có thể tự rót nước sôi.",
      situation: "Chỉ vị trí lấy nước uống cho đồng nghiệp hoặc người mới",
      keywords: ["饮水机", "开水"],
    },
    {
      id: 10,
      hanzi: "吃完记得把残渣倒进桶里，然后收餐盘。",
      pinyin: "chi1 wan2 ji4 de5 ba3 can2 zha1 dao4 jin4 tong3 li3 ran2 hou4 shou1 can1 pan2",
      vi: "Ăn xong nhớ đổ thức ăn thừa vào thùng, sau đó cất khay ăn.",
      situation: "Nhắc nhở nội quy giữ gìn vệ sinh và văn minh nhà ăn",
      keywords: ["残渣", "餐盘"],
    },
    {
      id: 11,
      hanzi: "今天的菜很合胃口，我已经吃饱了。",
      pinyin: "jin1 tian1 de5 cai4 hen3 he2 wei4 kou3 wo3 yi3 jing1 chi1 bao3 le5",
      vi: "Thức ăn hôm nay rất hợp khẩu vị, tôi đã ăn no rồi.",
      situation: "Chia sẻ cảm xúc hài lòng sau khi dùng bữa trưa",
      keywords: ["吃饱"],
    },
    {
      id: 12,
      hanzi: "请按需打饭，不要浪费粮食。",
      pinyin: "qing3 an4 xu1 da3 fan4 bu4 yao4 lang4 fei4 liang2 shi2",
      vi: "Vui lòng lấy cơm vừa đủ ăn, đừng lãng phí lương thực.",
      situation: "Khẩu hiệu văn hóa tiết kiệm trong căng tin nhà máy",
      keywords: ["打饭", "浪费"],
    },
  ],
};

// ─── Bài 7: Bằng cấp & Xin việc ────────────────────────────────────────────
export const RECRUITMENT_TOPIC: PracticeTopic = {
  id: "bang-cap-xin-viec",
  title: "Bằng cấp & Xin việc",
  chineseTitle: "学历与求职",
  tag: "Giao tiếp công xưởng – Bài 7",
  description:
    "35 từ vựng thiết yếu về trình độ học vấn, bằng cấp, tuyển dụng, phỏng vấn và 10 câu phản xạ thực tế khi ứng tuyển vào nhà máy.",
  icon: "📋",
  categories: [
    "Trình độ & Bằng cấp",
    "Tuyển dụng & Phỏng vấn",
    "Chức vụ & Vị trí",
    "Hồ sơ & Thủ tục",
    "Thử việc & Nhận việc",
  ],
  words: [
    // Trình độ & Bằng cấp
    { hanzi: "学历", pinyin: "xue2 li4", vi: "trình độ học vấn", hanViet: "học lịch", category: "Trình độ & Bằng cấp" },
    { hanzi: "学位", pinyin: "xue2 wei4", vi: "học vị", hanViet: "học vị", category: "Trình độ & Bằng cấp" },
    { hanzi: "大专", pinyin: "da4 zhuan1", vi: "cao đẳng", hanViet: "đại chuyên", category: "Trình độ & Bằng cấp" },
    { hanzi: "本科", pinyin: "ben3 ke1", vi: "đại học", hanViet: "bản khoa", category: "Trình độ & Bằng cấp" },
    { hanzi: "高中", pinyin: "gao1 zhong1", vi: "THPT", hanViet: "cao trung", category: "Trình độ & Bằng cấp" },
    { hanzi: "中专", pinyin: "zhong1 zhuan1", vi: "trung cấp", hanViet: "trung chuyên", category: "Trình độ & Bằng cấp" },
    { hanzi: "毕业证", pinyin: "bi4 ye4 zheng4", vi: "bằng tốt nghiệp", hanViet: "tất nghiệp chứng", category: "Trình độ & Bằng cấp" },
    { hanzi: "专业", pinyin: "zhuan1 ye4", vi: "chuyên ngành", hanViet: "chuyên nghiệp", category: "Trình độ & Bằng cấp" },
    { hanzi: "技能证书", pinyin: "ji4 neng2 zheng4 shu1", vi: "chứng chỉ kỹ năng", hanViet: "kỹ năng chứng thư", category: "Trình độ & Bằng cấp" },
    { hanzi: "工作经验", pinyin: "gong1 zuo4 jing1 yan4", vi: "kinh nghiệm làm việc", hanViet: "công tác kinh nghiệm", category: "Trình độ & Bằng cấp" },

    // Tuyển dụng & Phỏng vấn
    { hanzi: "招聘", pinyin: "zhao1 pin4", vi: "tuyển dụng", hanViet: "chiêu tuyển", category: "Tuyển dụng & Phỏng vấn" },
    { hanzi: "应聘", pinyin: "ying4 pin4", vi: "ứng tuyển", hanViet: "ứng tuyển", category: "Tuyển dụng & Phỏng vấn" },
    { hanzi: "面试", pinyin: "mian4 shi4", vi: "phỏng vấn", hanViet: "diện thí", category: "Tuyển dụng & Phỏng vấn" },
    { hanzi: "面试官", pinyin: "mian4 shi4 guan1", vi: "người phỏng vấn", hanViet: "diện thí quan", category: "Tuyển dụng & Phỏng vấn" },
    { hanzi: "求职者", pinyin: "qiu2 zhi2 zhe3", vi: "người tìm việc", hanViet: "cầu chức giả", category: "Tuyển dụng & Phỏng vấn" },
    { hanzi: "招聘要求", pinyin: "zhao1 pin4 yao1 qiu2", vi: "yêu cầu tuyển dụng", hanViet: "chiêu tuyển yêu cầu", category: "Tuyển dụng & Phỏng vấn" },
    { hanzi: "录用", pinyin: "lu4 yong4", vi: "tuyển nhận, nhận vào làm", hanViet: "lục dụng", category: "Tuyển dụng & Phỏng vấn" },

    // Chức vụ & Vị trí
    { hanzi: "岗位", pinyin: "gang3 wei4", vi: "vị trí công việc", hanViet: "cương vị", category: "Chức vụ & Vị trí" },
    { hanzi: "普工", pinyin: "pu3 gong1", vi: "công nhân phổ thông", hanViet: "phổ công", category: "Chức vụ & Vị trí" },
    { hanzi: "操作工", pinyin: "cao1 zuo4 gong1", vi: "công nhân vận hành", hanViet: "thao tác công", category: "Chức vụ & Vị trí" },
    { hanzi: "技术员", pinyin: "ji4 shu4 yuan2", vi: "nhân viên kỹ thuật", hanViet: "kỹ thuật viên", category: "Chức vụ & Vị trí" },
    { hanzi: "质检员", pinyin: "zhi4 jian3 yuan2", vi: "nhân viên kiểm tra chất lượng (QC)", hanViet: "chất kiểm viên", category: "Chức vụ & Vị trí" },

    // Hồ sơ & Thủ tục
    { hanzi: "简历", pinyin: "jian3 li4", vi: "CV, sơ yếu lý lịch", hanViet: "giản lịch", category: "Hồ sơ & Thủ tục" },
    { hanzi: "个人简历", pinyin: "ge4 ren2 jian3 li4", vi: "CV cá nhân", hanViet: "cá nhân giản lịch", category: "Hồ sơ & Thủ tục" },
    { hanzi: "身份证", pinyin: "shen1 fen4 zheng4", vi: "CCCD, chứng minh nhân dân", hanViet: "thân phận chứng", category: "Hồ sơ & Thủ tục" },
    { hanzi: "劳动合同", pinyin: "lao2 dong4 he2 tong5", vi: "hợp đồng lao động", hanViet: "lao động hợp đồng", category: "Hồ sơ & Thủ tục" },
    { hanzi: "招聘信息", pinyin: "zhao1 pin4 xin4 xi1", vi: "thông tin tuyển dụng", hanViet: "chiêu tuyển thông tin", category: "Hồ sơ & Thủ tục" },

    // Thử việc & Nhận việc
    { hanzi: "试用期", pinyin: "shi4 yong4 qi1", vi: "thời gian thử việc", hanViet: "thí dụng kỳ", category: "Thử việc & Nhận việc" },
    { hanzi: "正式员工", pinyin: "zheng4 shi4 yuan2 gong1", vi: "nhân viên chính thức", hanViet: "chính thức viên công", category: "Thử việc & Nhận việc" },
    { hanzi: "入职", pinyin: "ru4 zhi2", vi: "nhận việc, bắt đầu làm", hanViet: "nhập chức", category: "Thử việc & Nhận việc" },
    { hanzi: "离职", pinyin: "li2 zhi2", vi: "nghỉ việc, thôi việc", hanViet: "ly chức", category: "Thử việc & Nhận việc" },
    { hanzi: "薪资待遇", pinyin: "xin1 zi1 dai4 yu4", vi: "mức lương và đãi ngộ", hanViet: "tân tư đãi ngộ", category: "Thử việc & Nhận việc" },
    { hanzi: "薪资要求", pinyin: "xin1 zi1 yao1 qiu2", vi: "yêu cầu về mức lương", hanViet: "tân tư yêu cầu", category: "Thử việc & Nhận việc" },
    { hanzi: "应届毕业生", pinyin: "ying4 jie4 bi4 ye4 sheng1", vi: "sinh viên mới tốt nghiệp", hanViet: "ứng giới tất nghiệp sinh", category: "Thử việc & Nhận việc" },
  ],
  sentences: [
    {
      id: 1,
      hanzi: "你好，我想应聘贵公司的操作工岗位。",
      pinyin: "ni3 hao3 wo3 xiang3 ying4 pin4 gui4 gong1 si1 de5 cao1 zuo4 gong1 gang3 wei4",
      vi: "Xin chào, tôi muốn ứng tuyển vị trí công nhân vận hành của quý công ty.",
      situation: "Tự giới thiệu và nêu mục đích khi đến gặp bộ phận nhân sự",
      keywords: ["应聘", "岗位", "操作工"],
    },
    {
      id: 2,
      hanzi: "我是大专学历，有两年的工厂工作经验。",
      pinyin: "wo3 shi4 da4 zhuan1 xue2 li4 you3 liang3 nian2 de5 gong1 chang3 gong1 zuo4 jing1 yan4",
      vi: "Tôi tốt nghiệp cao đẳng, có hai năm kinh nghiệm làm việc trong nhà máy.",
      situation: "Trả lời câu hỏi về trình độ học vấn và kinh nghiệm của HR",
      keywords: ["大专", "学历", "工作经验"],
    },
    {
      id: 3,
      hanzi: "这个岗位需要什么学历要求？",
      pinyin: "zhe4 ge4 gang3 wei4 xu1 yao4 shen2 me5 xue2 li4 yao1 qiu2",
      vi: "Vị trí này yêu cầu trình độ học vấn gì?",
      situation: "Hỏi HR về yêu cầu bằng cấp trước khi nộp hồ sơ",
      keywords: ["岗位", "学历", "要求"],
    },
    {
      id: 4,
      hanzi: "请问试用期是多长时间？",
      pinyin: "qing3 wen4 shi4 yong4 qi1 shi4 duo1 chang2 shi2 jian1",
      vi: "Cho hỏi thời gian thử việc là bao lâu?",
      situation: "Hỏi về thời gian thử việc khi được phỏng vấn hoặc nhận việc",
      keywords: ["试用期"],
    },
    {
      id: 5,
      hanzi: "面试通过了吗？什么时候可以入职？",
      pinyin: "mian4 shi4 tong1 guo4 le5 ma5 shen2 me5 shi2 hou4 ke3 yi3 ru4 zhi2",
      vi: "Phỏng vấn qua rồi chưa? Khi nào có thể nhận việc?",
      situation: "Hỏi kết quả phỏng vấn và ngày nhận việc",
      keywords: ["面试", "入职"],
    },
    {
      id: 6,
      hanzi: "您好，我是来参加面试的，请问面试官在哪里？",
      pinyin: "nin2 hao3 wo3 shi4 lai2 can1 jia1 mian4 shi4 de5 qing3 wen4 mian4 shi4 guan1 zai4 na3 li3",
      vi: "Xin chào, tôi đến tham dự phỏng vấn, xin hỏi người phỏng vấn ở đâu ạ?",
      situation: "Hỏi đường hoặc hỏi tiếp tân khi đến công ty phỏng vấn",
      keywords: ["面试", "面试官"],
    },
    {
      id: 7,
      hanzi: "我有电工证书，可以操作电气设备。",
      pinyin: "wo3 you3 dian4 gong1 zheng4 shu1 ke3 yi3 cao1 zuo4 dian4 qi4 she4 bei4",
      vi: "Tôi có chứng chỉ điện, có thể vận hành thiết bị điện.",
      situation: "Giới thiệu chứng chỉ kỹ năng nghề trong buổi phỏng vấn",
      keywords: ["技能证书", "操作"],
    },
    {
      id: 8,
      hanzi: "请问贵公司现在还招操作工吗？",
      pinyin: "qing3 wen4 gui4 gong1 si1 xian4 zai4 hai2 zhao1 cao1 zuo4 gong1 ma5",
      vi: "Cho hỏi hiện tại quý công ty còn tuyển công nhân vận hành không?",
      situation: "Hỏi thăm thông tin tuyển dụng qua điện thoại hoặc trực tiếp",
      keywords: ["招聘", "操作工"],
    },
    {
      id: 9,
      hanzi: "我需要带什么材料来入职？",
      pinyin: "wo3 xu1 yao4 dai4 shen2 me5 cai2 liao4 lai2 ru4 zhi2",
      vi: "Tôi cần mang theo những giấy tờ gì khi đến nhận việc?",
      situation: "Hỏi HR về hồ sơ cần chuẩn bị trước ngày nhận việc",
      keywords: ["入职", "身份证", "劳动合同"],
    },
    {
      id: 10,
      hanzi: "试用期结束后，我的薪资待遇会怎么调整？",
      pinyin: "shi4 yong4 qi1 jie2 shu4 hou4 wo3 de5 xin1 zi1 dai4 yu4 hui4 zen3 me5 tiao2 zheng3",
      vi: "Sau khi kết thúc thử việc, mức lương đãi ngộ của tôi sẽ được điều chỉnh như thế nào?",
      situation: "Hỏi HR về chế độ lương sau thử việc khi ký hợp đồng chính thức",
      keywords: ["试用期", "薪资待遇"],
    },
  ],
  writingExercises: [
    {
      id: 1,
      question: "Bạn muốn ứng tuyển vào công ty. Hãy giới thiệu trình độ học vấn và kinh nghiệm của bạn bằng tiếng Trung.",
      hint: "Dùng: 我是...学历，有...年工作经验",
      sampleAnswer: "我是大专学历，有两年工厂工作经验，做过操作工。",
      keywords: ["学历", "工作经验"],
    },
    {
      id: 2,
      question: "Hỏi HR xem thời gian thử việc là bao lâu và lương thử việc là bao nhiêu.",
      hint: "Dùng: 请问试用期...？试用期工资...？",
      sampleAnswer: "请问试用期是多长时间？试用期工资是多少？",
      keywords: ["试用期"],
    },
    {
      id: 3,
      question: "Mô tả vị trí công việc bạn muốn ứng tuyển và hỏi về yêu cầu tuyển dụng.",
      hint: "Dùng: 我想应聘...岗位，这个岗位有什么要求？",
      sampleAnswer: "我想应聘质检员岗位，请问这个岗位有什么招聘要求？",
      keywords: ["应聘", "岗位", "招聘要求"],
    },
    {
      id: 4,
      question: "Hỏi khi nào có thể đến nhận việc và cần mang theo những giấy tờ gì.",
      hint: "Dùng: 什么时候可以入职？需要带什么材料？",
      sampleAnswer: "什么时候可以入职？入职需要带什么材料？",
      keywords: ["入职", "身份证"],
    },
    {
      id: 5,
      question: "Giới thiệu bản thân: tên, chuyên ngành học, và bạn có chứng chỉ kỹ năng gì.",
      hint: "Dùng: 我叫...，学的是...专业，有...证书",
      sampleAnswer: "我叫阿明，学的是电气专业，有电工技能证书。",
      keywords: ["专业", "技能证书"],
    },
  ],
};

// ─── Bài 7: Chế độ phúc lợi ─────────────────────────────────────────────────
export const WELFARE_TOPIC: PracticeTopic = {
  id: "che-do-phuc-loi",
  title: "Chế độ phúc lợi",
  chineseTitle: "福利待遇",
  tag: "Giao tiếp công xưởng – Bài 7",
  description:
    "38 từ vựng thiết yếu về lương thưởng, bảo hiểm, nghỉ phép, trợ cấp và 10 câu phản xạ thực tế khi hỏi HR về quyền lợi lao động trong nhà máy.",
  icon: "🎁",
  categories: [
    "Lương & Thưởng",
    "Bảo hiểm & An sinh",
    "Phụ cấp & Trợ cấp",
    "Nghỉ phép & Ngày nghỉ",
    "Điều kiện làm việc",
  ],
  words: [
    // Lương & Thưởng
    { hanzi: "福利待遇", pinyin: "fu2 li4 dai4 yu4", vi: "chế độ phúc lợi", hanViet: "phúc lợi đãi ngộ", category: "Lương & Thưởng" },
    { hanzi: "工资", pinyin: "gong1 zi1", vi: "tiền lương", hanViet: "công tư", category: "Lương & Thưởng" },
    { hanzi: "基本工资", pinyin: "ji1 ben3 gong1 zi1", vi: "lương cơ bản", hanViet: "cơ bản công tư", category: "Lương & Thưởng" },
    { hanzi: "底薪", pinyin: "di3 xin1", vi: "lương cứng", hanViet: "để tân", category: "Lương & Thưởng" },
    { hanzi: "绩效工资", pinyin: "ji4 xiao4 gong1 zi1", vi: "lương hiệu suất", hanViet: "tích hiệu công tư", category: "Lương & Thưởng" },
    { hanzi: "全勤奖", pinyin: "quan2 qin2 jiang3", vi: "thưởng chuyên cần", hanViet: "toàn cần thưởng", category: "Lương & Thưởng" },
    { hanzi: "绩效奖金", pinyin: "ji4 xiao4 jiang3 jin1", vi: "thưởng hiệu suất", hanViet: "tích hiệu tưởng kim", category: "Lương & Thưởng" },
    { hanzi: "年终奖", pinyin: "nian2 zhong1 jiang3", vi: "thưởng cuối năm", hanViet: "niên chung thưởng", category: "Lương & Thưởng" },
    { hanzi: "加班费", pinyin: "jia1 ban1 fei4", vi: "tiền tăng ca", hanViet: "gia ban phí", category: "Lương & Thưởng" },

    // Bảo hiểm & An sinh
    { hanzi: "社会保险", pinyin: "she4 hui4 bao3 xian3", vi: "bảo hiểm xã hội", hanViet: "xã hội bảo hiểm", category: "Bảo hiểm & An sinh" },
    { hanzi: "医疗保险", pinyin: "yi1 liao2 bao3 xian3", vi: "bảo hiểm y tế", hanViet: "y liệu bảo hiểm", category: "Bảo hiểm & An sinh" },
    { hanzi: "养老保险", pinyin: "yang3 lao3 bao3 xian3", vi: "bảo hiểm hưu trí", hanViet: "dưỡng lão bảo hiểm", category: "Bảo hiểm & An sinh" },
    { hanzi: "五险一金", pinyin: "wu3 xian3 yi4 jin1", vi: "5 loại bảo hiểm + quỹ nhà ở (Trung Quốc)", hanViet: "ngũ hiểm nhất kim", category: "Bảo hiểm & An sinh" },
    { hanzi: "定期体检", pinyin: "ding4 qi1 ti3 jian3", vi: "khám sức khỏe định kỳ", hanViet: "định kỳ thể kiểm", category: "Bảo hiểm & An sinh" },

    // Phụ cấp & Trợ cấp
    { hanzi: "岗位津贴", pinyin: "gang3 wei4 jin1 tie1", vi: "phụ cấp vị trí", hanViet: "cương vị tân thiếp", category: "Phụ cấp & Trợ cấp" },
    { hanzi: "夜班补贴", pinyin: "ye4 ban1 bu3 tie1", vi: "phụ cấp ca đêm", hanViet: "dạ ban bổ thiếp", category: "Phụ cấp & Trợ cấp" },
    { hanzi: "交通补贴", pinyin: "jiao1 tong1 bu3 tie1", vi: "phụ cấp đi lại", hanViet: "giao thông bổ thiếp", category: "Phụ cấp & Trợ cấp" },
    { hanzi: "住房补贴", pinyin: "zhu4 fang2 bu3 tie1", vi: "trợ cấp nhà ở", hanViet: "trú phòng bổ thiếp", category: "Phụ cấp & Trợ cấp" },
    { hanzi: "餐补", pinyin: "can1 bu3", vi: "trợ cấp tiền ăn", hanViet: "xan bổ", category: "Phụ cấp & Trợ cấp" },
    { hanzi: "免费工作餐", pinyin: "mian3 fei4 gong1 zuo4 can1", vi: "cơm miễn phí tại công ty", hanViet: "miễn phí công tác xan", category: "Phụ cấp & Trợ cấp" },
    { hanzi: "员工宿舍", pinyin: "yuan2 gong1 su4 she4", vi: "ký túc xá nhân viên", hanViet: "viên công túc xá", category: "Phụ cấp & Trợ cấp" },
    { hanzi: "节日福利", pinyin: "jie2 ri4 fu2 li4", vi: "phúc lợi dịp lễ", hanViet: "tiết nhật phúc lợi", category: "Phụ cấp & Trợ cấp" },

    // Nghỉ phép & Ngày nghỉ
    { hanzi: "带薪休假", pinyin: "dai4 xin1 xiu1 jia4", vi: "nghỉ phép hưởng lương", hanViet: "đới tân hưu giả", category: "Nghỉ phép & Ngày nghỉ" },
    { hanzi: "年假", pinyin: "nian2 jia4", vi: "nghỉ phép năm", hanViet: "niên giả", category: "Nghỉ phép & Ngày nghỉ" },
    { hanzi: "婚假", pinyin: "hun1 jia4", vi: "nghỉ kết hôn", hanViet: "hôn giả", category: "Nghỉ phép & Ngày nghỉ" },
    { hanzi: "产假", pinyin: "chan3 jia4", vi: "nghỉ thai sản", hanViet: "sản giả", category: "Nghỉ phép & Ngày nghỉ" },
    { hanzi: "病假", pinyin: "bing4 jia4", vi: "nghỉ ốm", hanViet: "bệnh giả", category: "Nghỉ phép & Ngày nghỉ" },
    { hanzi: "调休", pinyin: "tiao2 xiu1", vi: "nghỉ bù", hanViet: "điều hưu", category: "Nghỉ phép & Ngày nghỉ" },

    // Điều kiện làm việc
    { hanzi: "晋升机会", pinyin: "jin4 sheng1 ji1 hui4", vi: "cơ hội thăng tiến", hanViet: "tấn thăng cơ hội", category: "Điều kiện làm việc" },
    { hanzi: "两班倒", pinyin: "liang3 ban1 dao3", vi: "làm 2 ca luân phiên", hanViet: "lưỡng ban đảo", category: "Điều kiện làm việc" },
    { hanzi: "三班倒", pinyin: "san1 ban1 dao3", vi: "làm 3 ca luân phiên", hanViet: "tam ban đảo", category: "Điều kiện làm việc" },
    { hanzi: "考勤", pinyin: "kao3 qin2", vi: "chấm công", hanViet: "khảo cần", category: "Điều kiện làm việc" },
    { hanzi: "打卡", pinyin: "da3 ka3", vi: "chấm công bằng thẻ/máy", hanViet: "đả tạp", category: "Điều kiện làm việc" },
    { hanzi: "迟到", pinyin: "chi2 dao4", vi: "đi muộn", hanViet: "trì đáo", category: "Điều kiện làm việc" },
    { hanzi: "早退", pinyin: "zao3 tui4", vi: "về sớm", hanViet: "tảo thối", category: "Điều kiện làm việc" },
    { hanzi: "旷工", pinyin: "kuang4 gong1", vi: "tự ý nghỉ làm, vắng mặt không phép", hanViet: "khoáng công", category: "Điều kiện làm việc" },
  ],
  sentences: [
    {
      id: 1,
      hanzi: "公司有什么福利待遇？",
      pinyin: "gong1 si1 you3 shen2 me5 fu2 li4 dai4 yu4",
      vi: "Công ty có những chế độ phúc lợi gì?",
      situation: "Hỏi HR về tổng quan phúc lợi khi phỏng vấn hoặc tìm hiểu công ty",
      keywords: ["福利待遇"],
    },
    {
      id: 2,
      hanzi: "公司包吃包住吗？",
      pinyin: "gong1 si1 bao1 chi1 bao1 zhu4 ma5",
      vi: "Công ty có bao ăn ở không?",
      situation: "Hỏi HR về chế độ ăn ở miễn phí khi tìm hiểu về công việc",
      keywords: ["免费工作餐", "员工宿舍"],
    },
    {
      id: 3,
      hanzi: "加班有加班费吗？加班费怎么算？",
      pinyin: "jia1 ban1 you3 jia1 ban1 fei4 ma5 jia1 ban1 fei4 zen3 me5 suan4",
      vi: "Tăng ca có tiền tăng ca không? Tiền tăng ca tính như thế nào?",
      situation: "Hỏi HR về chính sách tăng ca và cách tính tiền làm thêm giờ",
      keywords: ["加班费"],
    },
    {
      id: 4,
      hanzi: "公司给员工交社保吗？",
      pinyin: "gong1 si1 gei3 yuan2 gong1 jiao1 she4 bao3 ma5",
      vi: "Công ty có đóng bảo hiểm xã hội cho nhân viên không?",
      situation: "Hỏi HR về quyền lợi bảo hiểm xã hội bắt buộc",
      keywords: ["社会保险"],
    },
    {
      id: 5,
      hanzi: "每个月几号发工资？",
      pinyin: "mei3 ge4 yue4 ji3 hao4 fa1 gong1 zi1",
      vi: "Hằng tháng ngày mấy phát lương?",
      situation: "Hỏi về ngày trả lương hàng tháng để lên kế hoạch chi tiêu",
      keywords: ["工资"],
    },
    {
      id: 6,
      hanzi: "公司有全勤奖吗？一个月多少钱？",
      pinyin: "gong1 si1 you3 quan2 qin2 jiang3 ma5 yi1 ge4 yue4 duo1 shao3 qian2",
      vi: "Công ty có thưởng chuyên cần không? Một tháng được bao nhiêu tiền?",
      situation: "Hỏi về thưởng chuyên cần và điều kiện đạt thưởng",
      keywords: ["全勤奖"],
    },
    {
      id: 7,
      hanzi: "一个月可以休息几天？有带薪年假吗？",
      pinyin: "yi1 ge4 yue4 ke3 yi3 xiu1 xi5 ji3 tian1 you3 dai4 xin1 nian2 jia4 ma5",
      vi: "Một tháng được nghỉ mấy ngày? Có nghỉ phép năm hưởng lương không?",
      situation: "Hỏi về lịch nghỉ và chế độ phép năm",
      keywords: ["带薪休假", "年假"],
    },
    {
      id: 8,
      hanzi: "上夜班有补贴吗？",
      pinyin: "shang4 ye4 ban1 you3 bu3 tie1 ma5",
      vi: "Làm ca đêm có phụ cấp không?",
      situation: "Hỏi HR về phụ cấp ca đêm cho công nhân làm theo ca",
      keywords: ["夜班补贴"],
    },
    {
      id: 9,
      hanzi: "公司有年终奖吗？什么条件可以拿到？",
      pinyin: "gong1 si1 you3 nian2 zhong1 jiang3 ma5 shen2 me5 tiao2 jian4 ke3 yi3 na2 dao4",
      vi: "Công ty có thưởng cuối năm không? Điều kiện gì để nhận được?",
      situation: "Hỏi về điều kiện và mức thưởng Tết / cuối năm",
      keywords: ["年终奖"],
    },
    {
      id: 10,
      hanzi: "公司实行两班倒，要注意打卡考勤。",
      pinyin: "gong1 si1 shi2 xing2 liang3 ban1 dao3 yao4 zhu4 yi4 da3 ka3 kao3 qin2",
      vi: "Công ty áp dụng chế độ 2 ca luân phiên, cần chú ý chấm công bằng thẻ.",
      situation: "HR giải thích quy định ca làm việc và chấm công cho nhân viên mới",
      keywords: ["两班倒", "打卡", "考勤"],
    },
  ],
  writingExercises: [
    {
      id: 1,
      question: "Hỏi HR xem công ty có bao ăn ở không và phụ cấp đi lại như thế nào.",
      hint: "Dùng: 公司包吃包住吗？有没有交通补贴？",
      sampleAnswer: "公司包吃包住吗？有没有交通补贴？",
      keywords: ["免费工作餐", "员工宿舍", "交通补贴"],
    },
    {
      id: 2,
      question: "Hỏi về lương cơ bản, thưởng chuyên cần và ngày trả lương hàng tháng.",
      hint: "Dùng: 基本工资是多少？有全勤奖吗？几号发工资？",
      sampleAnswer: "基本工资是多少？有全勤奖吗？每个月几号发工资？",
      keywords: ["基本工资", "全勤奖", "工资"],
    },
    {
      id: 3,
      question: "Hỏi xem công ty có đóng bảo hiểm xã hội và y tế cho nhân viên không.",
      hint: "Dùng: 公司给员工交社会保险和医疗保险吗？",
      sampleAnswer: "请问公司给员工交社会保险和医疗保险吗？",
      keywords: ["社会保险", "医疗保险"],
    },
    {
      id: 4,
      question: "Mô tả chế độ làm ca tại công ty và hỏi về phụ cấp ca đêm.",
      hint: "Dùng: 我们实行...班倒，上夜班有补贴吗？",
      sampleAnswer: "我们实行三班倒，请问上夜班有夜班补贴吗？",
      keywords: ["三班倒", "夜班补贴"],
    },
    {
      id: 5,
      question: "Hỏi về chế độ nghỉ phép năm và nghỉ ốm có hưởng lương không.",
      hint: "Dùng: 有带薪年假吗？请病假可以领工资吗？",
      sampleAnswer: "公司有带薪年假吗？请病假可以领工资吗？",
      keywords: ["带薪休假", "年假", "病假"],
    },
  ],
};

export const PRACTICE_TOPICS: PracticeTopic[] = [FACTORY_TOPIC, CANTEEN_TOPIC, RECRUITMENT_TOPIC, WELFARE_TOPIC];

export function findTopic(id: string): PracticeTopic | undefined {
  return PRACTICE_TOPICS.find((t) => t.id === id);
}
