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

export const PRACTICE_TOPICS: PracticeTopic[] = [FACTORY_TOPIC];

export function findTopic(id: string): PracticeTopic | undefined {
  return PRACTICE_TOPICS.find((t) => t.id === id);
}
