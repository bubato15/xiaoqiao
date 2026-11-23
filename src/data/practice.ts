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

export const PRACTICE_TOPICS: PracticeTopic[] = [FACTORY_TOPIC, CANTEEN_TOPIC];

export function findTopic(id: string): PracticeTopic | undefined {
  return PRACTICE_TOPICS.find((t) => t.id === id);
}
