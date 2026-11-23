# Sổ tay dự án: Luyện nói cùng XiaoQiao

Tài liệu này gom lại tiến độ, kiến trúc, các quyết định kỹ thuật và những kinh nghiệm rút ra trong quá trình xây dựng. Cập nhật lần cuối: 31/10/2026.

## 1. Sản phẩm

Website công khai giúp người Việt luyện nói tiếng Trung, với linh vật là bé gấu trúc XiaoQiao. Năm mảng chính:

| Mảng | Trang | Nội dung |
|---|---|---|
| Thanh điệu | `/tones` | Giới thiệu 4 thanh so với thanh tiếng Việt, trò nghe và chọn thanh, bảng cặp thanh 4×5 lấy từ dữ liệu HSK |
| Bài học HSK | `/hsk`, `/hsk/[level]`, `/hsk/[level]/[lesson]` | Đủ 6 cấp HSK 2.0: 4.991 từ, 433 bài (HSK 1: 13, HSK 2: 14, HSK 3: 27, HSK 4: 51, HSK 5: 111, HSK 6: 217). Trang `/hsk` là 6 thẻ cấp; trang cấp chia bài theo chủ đề (từ HSK 3). Mỗi bài có chế độ Từ vựng và Mẫu câu (3 câu mỗi bài) |
| Bài tập & Phản xạ | `/practice`, `/practice/[topic]` | Luyện tập ghi nhớ từ vựng và phản xạ giao tiếp theo chuyên đề (Flashcard, Trắc nghiệm 2 chiều, Dịch câu phản xạ, Chấm giọng từng từ). Gồm 2 chủ đề: "Tiếng Trung công xưởng" (39 từ vựng, 10 câu phản xạ) và "Đồ ăn trong công xưởng" (45 từ vựng, 12 câu phản xạ) |
| Hội thoại | `/talk` | 57 tình huống nhập vai với XiaoQiao chia 6 nhóm chủ đề (12 tình huống mở ở HSK 1), trong đó nhóm "Nhập vai nghề nghiệp" có 24 ngành nghề, chấm điểm /100 sau mỗi cuộc hội thoại, mỗi tình huống có nhiệm vụ cụ thể, mở khoá theo cấp HSK, có nút chọn ngẫu nhiên, góp ý bằng tiếng Việt sau mỗi câu |
| Đo trình độ | `/level` | Đọc 6 câu (mỗi cấp HSK một câu) để XiaoQiao ước lượng trình độ nói; phần dưới cho nhập đoạn tùy ý và chấm điểm giọng đọc trên thang 100 |
| Phòng thử nghiệm | `/lab` | Đo độ chính xác chấm thanh, kiểm tra nhận dạng giọng nói và giọng đọc của trình duyệt |

Mọi màn chấm điểm dùng chung một khối "đọc và chấm": nghe mẫu, thu âm, chấm thanh từng âm tiết, chấm phụ âm đầu và vần, vẽ đường cao độ, gấu trúc phản ứng theo kết quả, và hiện điểm giọng đọc tổng trên thang 100.

## 2. Tiến độ

### Đã xong và đã kiểm chứng

- Chấm thanh điệu ngay trên trình duyệt, gồm biến điệu 3+3, 不 và 一. Kiểm chứng bằng unit test với âm thanh tổng hợp và bằng trình duyệt thật (Edge) với micro giả phát file WAV.
- Chấm phụ âm đầu và vần bằng Web Speech, kèm gợi ý sửa cho các cặp âm người Việt hay nhầm (zh/z, sh/s/x, ch/c/q, r/l, ü/u, -ing/-in, -eng/-en). Có unit test cho phần so sánh.
- Hội thoại thật với Groq (model `qwen/qwen3.8-27b`, dự phòng `openai/gpt-oss-120b`), đã chạy thử 3 lượt trên trình duyệt.
- Dữ liệu đủ 6 cấp HSK và 1.299 mẫu câu, có test đối chiếu với nguồn gốc. HSK 3 đến 6 thêm ngày 30/10/2026.
- Âm cuốn lưỡi 儿化 (一会儿 `yi1 hui4 r5`): bộ chấm gộp 儿 vào tiếng trước, không chấm riêng. Đã thử bằng unit test và bằng Edge với micro giả.
- Giao diện cute pastel với gấu trúc, đã tự đánh giá ở khổ 390, 1024, 1920, độ tương phản chữ từ 4.5:1 trở lên.
- Tiến độ học lưu trong trình duyệt (localStorage).
- Nền giấy Tuyên và bộ hình minh họa Gemini (gấu trúc 5 biểu cảm, 56 tranh tình huống, dải núi thủy mặc), đã xem ở khổ 390, 1024, 1920, đã kiểm tra không có ảnh lỗi trên trang hội thoại và đã mở thử một cuộc hội thoại (30/10/2026).

- Nhóm hội thoại "Nhập vai nghề nghiệp" 百业体验 (30/10/2026): 16 tình huống ở 16 ngành (nhà hàng, giao hàng, dược, giáo dục, du lịch, thú y, nông nghiệp, nhà máy, y tá, bán hàng livestream, phần mềm, bất động sản, thiết kế nội thất, tư vấn doanh nghiệp, báo chí, khởi nghiệp gọi vốn), trải từ HSK 1 đến HSK 6. Người học đóng vai người làm nghề, XiaoQiao đóng vai khách, đối tác hoặc sếp người Trung. Đã gọi API thật cho cả 16 tình huống: câu mở đầu đều đúng vai và kết thúc bằng câu hỏi. Tranh vẽ thêm bằng Gemini (lưới `scenes5`, `scenes6`). Đợt hai thêm 8 ngành (tiếp viên hàng không, làm nail, lễ tân khách sạn, đầu bếp, huấn luyện viên thể hình, giao dịch viên ngân hàng, tuyển dụng, xuất nhập khẩu), tranh ở lưới `scenes7`. Thẻ trong mỗi nhóm được xếp theo cấp HSK.
- Chấm điểm cuối hội thoại (30/10/2026): nút "Kết thúc và chấm điểm" mở sau 3 câu của người học. `/api/score` gửi toàn bộ lời thoại cho model chấm ba phần (hoàn thành nhiệm vụ 40%, ngữ pháp và dùng từ 35%, diễn đạt tự nhiên 25%); tổng điểm do code tính (`parseScore` trong `src/lib/talk-score.ts`, có unit test), kèm nhận xét, điểm làm tốt, lỗi cần sửa và 2 đến 3 mẫu câu nên nhớ. Điểm cao nhất mỗi tình huống lưu ở localStorage `xq.talkScores` (`src/lib/talk-record.ts`) và hiện trên thẻ. Đã thử API với lời thoại tốt (91 điểm), kém (14 điểm) và quá ngắn (bị từ chối), và chạy trọn luồng trên Edge ở khổ 390, 1024, 1920. Điểm này chỉ chấm nội dung (giọng nói được chấm riêng từng câu, xem mục dưới), và thang điểm của model mới chỉ kiểm qua vài lời thoại mẫu.

- Điểm giọng đọc /100 trong mọi khối luyện đọc, và trang Đo trình độ `/level` (30/10/2026). Đã có unit test cho cách tính điểm và cách ước lượng cấp; đã chạy thật trên Edge với micro giả (câu HSK 1 và đoạn 14 âm tiết có dấu phẩy), đã xem ở khổ 390, 1024, 1920 và thử bàn phím. **Ngưỡng điểm (tốc độ 1,2 đến 2,8 tiếng/giây, đạt cấp từ 65 điểm) mới chỉ đặt theo ước đoán**, cần chỉnh lại khi có giọng người thật ở nhiều trình độ.

- Sửa lỗi điểm thanh điệu luôn bằng 0 (30/10/2026): số đo giọng đã lưu (`xq.speakerMidHz`) lệch khoảng 7 nửa cung so với giọng lúc đọc là đủ làm mọi âm tiết bị nghe thành cùng một thanh. Nay `analyze.ts` bỏ qua số đo cũ khi trung vị cao độ của bản thu lệch quá 4 nửa cung (câu từ 3 tiếng) hoặc 7 nửa cung (từ 1, 2 tiếng), chấm theo chính bản thu và nhắc người học đo lại ở `/lab`. Âm tiết có thanh nhưng không đủ cao độ để đọc được tính là bản thu hỏng, không còn tính là sai thanh. Đã thử bằng bản ghi giọng người thật (德国, Wikimedia Commons) với số đo từ 65 đến 260 Hz, unit test, và Edge với micro giả ở khổ 390, 1024, 1920. **Chưa xác nhận được trên máy của người báo lỗi**; nếu vẫn bị 0, cần xem dòng "nghe ra thanh" của từng tiếng.
- Trang kết quả Đo trình độ chỉ rõ tiếng đọc sai (30/10/2026): tô đỏ chữ sai ngay trong câu và ghi từng tiếng cần thanh nào, nghe ra thanh nào, cần âm nào, máy nghe ra âm nào. Lấy từ lượt đọc tốt nhất của câu (`mistakesOf` trong `score.ts`). Âm chỉ được liệt kê khi bản nhận dạng khớp được từng âm tiết. Đã chạy thật trên Edge ở khổ 390, 1024, 1920.

- Chọn giọng vùng miền cho XiaoQiao trong hội thoại (30/10/2026): 10 giọng Azure chia ba nhóm (phổ thông; phổ thông giọng Đài Loan, Đông Bắc, Quảng Tây, Sơn Đông, Hà Nam, Thiểm Tây, Tứ Xuyên; phương ngữ Quảng Đông và Thượng Hải gắn nhãn "chỉ để nghe"), mở dần theo cấp HSK. Chọn giọng thì phát câu chào thử; lựa chọn lưu ở `xq.talkVoice`. Đã chạy thật trên Edge ở khổ 390, 1024, 1920 (giả lập `/api/tts`), thử bàn phím và trường hợp chưa có key. **Chủ dự án chưa dùng Azure** (tài khoản Azure miễn phí vẫn bắt nhập thẻ), nên hiện chạy bằng giọng trình duyệt: khi `GET /api/tts` trả `enabled: false`, ô chọn chỉ hiện giọng mà trình duyệt thật sự có (Edge trên Windows: phổ thông, Đài Loan, Đông Bắc, Thiểm Tây, Quảng Đông). Đã thử với danh sách giọng giả kiểu Edge: chọn Đông Bắc thì đọc bằng Xiaobei. Điền key Azure là tự hiện đủ 10 giọng, nhưng **chưa nghe thử giọng Azure thật**.
- Chấm giọng từng câu trong hội thoại (31/10/2026): khi bấm Nói, app thu âm song song với nhận dạng giọng nói và dừng thu khi nhận dạng kết thúc (bấm "Xong" để dừng sớm). `scoreSpoken` trong `src/lib/speech/spoken.ts` lấy câu máy nghe được làm câu mẫu, tách theo dấu câu (`syllabifyPhrases`, dùng chung với phần đọc tự chọn ở `/level`), rồi chấm thanh điệu và độ trôi chảy bằng `analyzeTones` và `readingScore`. Không chấm phụ âm và vần vì câu mẫu chính là bản nhận dạng, so với chính nó thì luôn khớp. Câu có chữ số hoặc chữ Latin (máy hay viết 我要3个), câu quá 40 chữ, và bản thu hỏng thì không chấm, chỉ hiện một dòng nhắc. Dưới mỗi câu nói hiện điểm /100, điểm thành phần và từng tiếng sai thanh kèm gợi ý; câu gõ tay không chấm. Thẻ kết quả cuối hội thoại thêm điểm giọng nói trung bình, tách riêng khỏi điểm nội dung. Gợi ý sửa thanh chuyển sang `src/lib/speech/tone-hint.ts`. Đã có unit test (âm tổng hợp 我很好 đúng và sai thanh, câu có chữ số, bản thu im lặng) và chạy thật trên Edge với micro giả cùng bộ nhận dạng giả lập, ở khổ 390, 1024, 1920, thử bàn phím, đo tương phản (thấp nhất 5,68:1). **Chưa thử với giọng người thật**; nếu máy nhận dạng sai chữ thì thanh điệu bị chấm theo chữ sai đó.

- Mục Bài tập ghi nhớ từ mới & Luyện phản xạ (`/practice`, `/practice/[topic]`) (20/11/2026, cập nhật 23/11/2026): Chuyên đề luyện tập chuyên sâu theo chủ đề. Tích hợp 4 chế độ: Thẻ ghi nhớ Flashcard (lật xem pinyin, nghĩa, âm Hán Việt, phát âm và đánh dấu đã nhớ), Trắc nghiệm phản xạ 2 chiều (Trung - Việt & Việt - Trung, tính streak và điểm số), Dịch câu phản xạ ngữ cảnh thực tế (gợi ý từ khóa, đối chiếu câu mẫu và luyện đọc bằng `SpeakPractice`), và Luyện phát âm từng từ. Hiện có 2 chuyên đề:
  1. "Tiếng Trung công xưởng" (39 từ vựng và 10 câu phản xạ dịch).
  2. "Đồ ăn trong công xưởng" (45 từ vựng nhà ăn/món ăn/khẩu vị/dụng cụ và 12 câu phản xạ giao tiếp thực chiến giờ ăn và tăng ca).
  Đã có unit test kiểm tra từ vựng và câu mẫu, đã kiểm thử responsive 390, 1024, 1920 trên trình duyệt thật.

### Chưa làm hoặc chưa kiểm chứng

- **Chưa thử với giọng người thật.** Đây là việc quan trọng nhất: mục tiêu là từ 80% trở lên với từ đơn. Cách thử: vào `/lab`, đo giọng, đọc 30 đến 50 từ đúng thanh, tải nhật ký JSON để phân tích.
- Chấm phụ âm và vần chưa thấy chạy thật trong trình duyệt tự động; cần thử với giọng thật trên Chrome hoặc Edge.
- Nghĩa tiếng Việt, âm Hán Việt và mẫu câu do AI soạn, **cần người duyệt**. Trang bài học đang hiện ghi chú "đang được duyệt lại" (cờ `HSKn_REVIEWED` trong từng file). HSK 3 đến 6 cần duyệt nhiều nhất: nghĩa, âm Hán Việt, tên bài và cả pinyin của mẫu câu (sinh tự động, xem mục Dữ liệu). Khoảng 100 từ để trống âm Hán Việt (thán từ, từ mượn, từ chưa chắc). Một số từ để trống âm Hán Việt vì chưa chắc: 喂, 吗, 呢, 哪, 那, 您, 吧, 咖啡.
- Tài khoản người dùng và lưu tiến độ trên server (dự kiến Supabase).
- Giới hạn lượt gọi AI dùng chung cho mọi server (dự kiến Upstash). Hiện chỉ giới hạn trong bộ nhớ của từng tiến trình, 40 lượt mỗi 10 phút cho mỗi IP.
- Giọng đọc mẫu chất lượng cao sinh sẵn thành file (Azure hoặc Google TTS). Hiện dùng giọng có sẵn của trình duyệt, ưu tiên giọng tự nhiên nếu máy có.
- Chuỗi ngày học và huy hiệu, trang quyền riêng tư, deploy (chủ dự án tự làm).

## 3. Chạy dự án

```bash
npm install
cp .env.local.example .env.local   # điền GROQ_API_KEY, tùy chọn AZURE_SPEECH_KEY và AZURE_SPEECH_REGION
npm run dev                         # http://localhost:3000
npm test                            # unit test
npm run lint && npx tsc --noEmit    # kiểm tra mã
npm run build                       # build production
```

Micro chỉ hoạt động trên `localhost` hoặc HTTPS. Không có key Groq thì app vẫn chạy, chỉ phần hội thoại báo thiếu cấu hình.

## 4. Kiến trúc

```
src/
  app/                 các trang (App Router) và API /api/chat
  components/          khối dùng chung: SpeakPractice, Panda, WordFace, PitchChart, Calibration...
  data/                dữ liệu bài học (hsk1.ts đến hsk6.ts, sentences.ts và sentences3.ts đến sentences6.ts, scenarios.ts) và test dữ liệu
  lib/speech/          lõi xử lý giọng nói, chạy hoàn toàn trên trình duyệt
  lib/local-store.ts   kho dữ liệu localStorage dùng chung, hook useStore
  lib/progress.ts      tiến độ học theo từng từ và câu
data/hsk/              danh sách từ gốc (complete-hsk-vocabulary, MIT) để test đối chiếu
```

### Luồng chấm thanh (`src/lib/speech/`)

1. `recorder.ts`: thu âm bằng MediaRecorder rồi giải mã ra mẫu âm thanh. Tắt khử tiếng vọng và tự cân âm lượng vì chúng làm phẳng đường cao độ. Có thêm bộ đo âm lượng cho vòng sóng quanh nút thu.
2. `pitch.ts`: tách cao độ bằng `pitchy`, khung 40 ms, bước 10 ms, bỏ khung yếu và khung nhảy quãng tám.
3. `segment.ts`: chia âm tiết theo các đoạn có giọng; gộp hoặc cắt tại điểm nhỏ tiếng nhất cho đủ số âm tiết.
4. `tone.ts`: so dạng đường cao độ (tính bằng nửa cung so với độ cao giọng của người học) với mẫu Chao (55, 35, 214 hoặc 211, 51), cho phép co giãn và dịch nhẹ.
5. `sandhi.ts`: tính thanh thực tế khi nói. `fromPinyin` dùng pinyin ghi sẵn trong dữ liệu (đúng cho từ nhiều cách đọc), `syllabify` để `pinyin-pro` tự đoán (dùng cho văn bản tự do).
6. `analyze.ts`: ghép các bước, trả kết quả từng âm tiết.
7. `speaker.ts`: đo độ cao giọng trung bình của người học qua 妈麻马骂, lưu để chấm theo giọng riêng.
8. `pronunciation.ts`: so bản nhận dạng của Web Speech với pinyin mục tiêu (bỏ thanh), cho gợi ý theo cặp âm hay nhầm. Trả thêm `score` (tỉ lệ âm tiết nghe đúng).
9. `score.ts`: điểm giọng đọc tổng trên thang 100. Thanh điệu 50%, phát âm 30%, độ trôi chảy 20%; phần nào không đo được thì bỏ ra và chia lại trọng số. Độ trôi chảy chỉ tính từ 4 âm tiết trở lên: tốc độ đọc (1,2 tiếng/giây được 0, 2,8 trở lên được trọn điểm), trừ 15% cho mỗi chỗ ngắt dài hơn 0,5 giây không nằm sau dấu câu. Nếu bộ nhận dạng không trả về chữ nào, phần phát âm được bỏ qua thay vì tính 0.
10. `spoken.ts`: chấm câu nói tự do trong hội thoại theo bản nhận dạng (thanh điệu và độ trôi chảy).

### Đo trình độ (`/level`)

- `src/data/placement.ts` chọn sẵn 10 câu mỗi cấp, dài dần theo cấp (HSK 1 khoảng 4 đến 7 chữ, HSK 6 khoảng 13 đến 20 chữ). Trang server chỉ gửi bộ câu này và mục tiêu từng cấp xuống client, không gửi toàn bộ dữ liệu.
- Mỗi câu giữ danh sách tiếng đọc sai của lượt tốt nhất (`LevelReading.mistakes`), chỉ trong bộ nhớ của trang, không lưu vào `xq.levelCheck`.
- `src/lib/placement.ts` ước lượng cấp: cấp cao nhất mà câu của cấp đó đạt từ 65 điểm và điểm trung bình từ HSK 1 đến cấp đó đạt từ 70. Câu bỏ qua tính 0. Xem pinyin hoặc nghe mẫu thì câu đó chỉ tính 85% (sau lượt đọc đầu, pinyin tự hiện nên các lượt đọc lại cũng tính là có gợi ý). Kết quả lần gần nhất lưu ở localStorage `xq.levelCheck`.
- Phần chấm đoạn tự chọn tách văn bản theo dấu câu trước khi tính biến điệu, vì biến điệu 3+3 không đi qua chỗ ngắt (好，我 vẫn giữ thanh 3).

Bản thu hỏng (không đủ âm tiết) không bị tính là đọc sai: chỉ hiện lời nhắc thu lại, không ghi điểm.

Âm 儿 cuốn lưỡi (`r5`) không được tách thành tiếng riêng: `analyze.ts` chia theo số tiếng thực sự đọc (`spokenCount`) và cho 儿 dùng chung đoạn với tiếng trước (`isErhua`).

### Hội thoại (`src/app/api/chat/route.ts`)

- Client chỉ gửi **mã tình huống**; server tự tra nội dung vai diễn trong `src/data/scenarios.ts`. Cách này chặn việc chèn lệnh vào system prompt.
- Thứ tự nhà cung cấp: `GROQ_MODEL`, rồi `GROQ_FALLBACK_MODEL` (Groq giới hạn lượt theo từng model), rồi OpenRouter nếu có cấu hình.
- Kết quả bắt buộc là JSON có đủ 5 trường (chữ Hán, pinyin, nghĩa Việt, góp ý, cách nói tự nhiên hơn), sai định dạng thì thử nhà cung cấp tiếp theo.
- Prompt yêu cầu XiaoQiao luôn kết thúc bằng câu hỏi, trừ khi người học đã chào tạm biệt.
- Phần gọi AI dùng chung nằm ở `src/lib/llm.ts` (danh sách nhà cung cấp, `askJSON`, `readTurns`, giới hạn lượt theo IP) cho cả `/api/chat` và `/api/score`. `talk-score.ts` không được import `local-store.ts`, vì route server không dùng được hook React.
- Tình huống nghề nghiệp có thêm trường `learner` (vai của người học). Thẻ và đầu cuộc hội thoại hiện "Bạn là ..., XiaoQiao là ..."; prompt dặn XiaoQiao không làm việc của người học, và lời gợi mở đầu nhắc lại ai là ai, vì nếu không model hay nhận nhầm vai (ví dụ vai khách quán phở lại hỏi "mấy người?"). `scenarios.test.ts` kiểm tra mọi tình huống nhóm `career` đều có `learner` và chỉ nhóm này có.
- Giọng đọc của XiaoQiao: danh sách giọng ở `src/data/voices.ts` dùng chung cho client và `/api/tts`. Route chỉ nhận mã giọng trong danh sách và chữ Hán tối đa 200 ký tự, gọi Azure qua REST với SSML (`src/lib/azure-tts.ts`, chữ được escape), giữ 200 bản thu gần nhất trong bộ nhớ, giới hạn 120 lượt mỗi 10 phút cho mỗi IP (bộ đếm riêng `tts`, không ăn vào lượt chat). `GET /api/tts` báo đã có key hay chưa (gọi `connection()` để không bị prerender lúc build vì dự án bật Cache Components). Không có key thì client (`src/lib/speech/talk-voice.ts`) chỉ đưa ra giọng trình duyệt có thật (`browserVoiceIds`, cập nhật theo sự kiện `voiceschanged`). `bestVoice` trong `webspeech.ts` bỏ qua giọng vùng miền của Edge (Xiaobei có lang `zh-CN-liaoning`) để giọng phổ thông mặc định không bị đọc giọng Đông Bắc. Giọng cao hơn cấp HSK đang chọn tự về phổ thông mà không xoá lựa chọn đã lưu. Bài học, Đo trình độ và "Mẫu câu nên nhớ" vẫn đọc phổ thông bằng giọng trình duyệt.
- Mỗi tình huống có `goal` (nhiệm vụ của người học), hiện trên thẻ và được đưa vào prompt để XiaoQiao dẫn dắt từng bước. `scenarios.test.ts` kiểm tra mã không trùng, đủ trường, và HSK 1 có tình huống ở mọi nhóm.

### Dữ liệu

- Pinyin ghi số thanh, `5` là thanh nhẹ, ghi ở dạng gốc (chưa biến điệu); code tự áp dụng biến điệu.
- `hsk.test.ts` kiểm tra mỗi cấp: đủ từ so với nguồn, không trùng, cách đọc có trong nguồn, số bài liên tục.
- `sentences.test.ts` đối chiếu từng âm tiết của mẫu câu với `pinyin-pro`. Ngoại lệ đã chấp nhận: 谁 đọc `shéi` theo giáo trình.
- Thêm cấp mới: tạo `hskN.ts`, khai báo trong `src/data/hsk.ts` (`LEVELS`, `REVIEWED`, `LEVEL_INFO`), thêm câu (HSK 1 và 2 nằm trong `sentences.ts`, từ HSK 3 mỗi cấp một file `sentencesN.ts`), tải `data/hsk/old-N.json` để test đối chiếu.
- HSK 3 đến 6 do AI soạn theo lô (khoảng 600 từ mỗi lô), mỗi bài gắn một trong 24 chủ đề (`topic`), rồi xếp lại theo chủ đề. Sửa thẳng trong file `.ts`.
- Pinyin mẫu câu HSK 3 đến 6 sinh bằng `pinyin-pro`, rồi lấy lại cách đọc của từ vựng HSK khi từ đó có trong câu (giữ thanh nhẹ như 舒服 `shu1 fu5`, và chữ đa âm như 油炸 `zha2`). `sentences.test.ts` chấp nhận chỗ khác `pinyin-pro` nếu khớp đúng một từ trong danh sách.
- Âm cuốn lưỡi viết `r5` (một âm tiết riêng cho chữ 儿). Từ 儿子, 女儿 vẫn là `er2`.
- Sửa nguồn (`SOURCE_FIXES` trong `hsk.test.ts`): 致力于 và 纽扣儿 thiếu số thanh trong nguồn; 下载 dùng cách đọc đại lục `xia4 zai4` thay cho `zai3`.

## 5. Các quyết định kỹ thuật và lý do

| Chủ đề | Chọn | Lý do |
|---|---|---|
| Chấm thanh | Tự viết trên trình duyệt | Không có API miễn phí nào vừa chấm thanh tốt vừa dễ đăng ký với người Việt. Azure Pronunciation Assessment không chấm thanh cho tiếng Trung; iFlytek ISE có điểm thanh nhưng cần xác minh danh tính Trung Quốc. Chạy trên trình duyệt nên không tốn tiền theo số người dùng. |
| Nhận dạng giọng nói | Web Speech zh-CN | Miễn phí, có sẵn trên Chrome, Edge, Safari. Firefox không hỗ trợ; phương án dự phòng là sherpa-onnx WASM. |
| AI hội thoại | Groq, model Qwen | Gói miễn phí cho phép dùng; Qwen trả lời nhanh (khoảng 0,6 giây), tiếng Trung tự nhiên và góp ý đúng vào câu của người học. Không dùng Gemini miễn phí vì điều khoản cấm dùng cho người tiêu dùng. |
| Giọng đọc | Giọng trình duyệt, ưu tiên giọng "Natural" | Tạm thời; dự định sinh sẵn file bằng Azure hoặc Google TTS trong gói miễn phí. |
| Giọng vùng miền | Giọng trình duyệt; Azure Speech (gói F0, khoảng 500.000 ký tự mỗi tháng) nếu có key | Có 7 giọng phổ thông vùng miền cùng Quảng Đông và Ngô, dùng được ở Việt Nam. Giọng trình duyệt khác nhau theo máy (Edge tự động trên máy dev không có giọng tiếng Trung nào). Volcengine và iFlytek có phương ngữ chuẩn hơn nhưng cần xác minh danh tính Trung Quốc. Câu hội thoại sinh lúc chạy nên phải tổng hợp theo yêu cầu, không sinh sẵn được. Tài khoản Azure miễn phí cần thẻ để xác minh; `edge-tts` không cần thẻ nhưng dùng dịch vụ của Microsoft khi chưa được phép nên không dùng. |
| Dữ liệu | complete-hsk-vocabulary (MIT), CC-CEDICT (CC BY-SA 4.0), pinyin-pro (MIT) | Giấy phép mở; CC-CEDICT bắt buộc ghi nguồn (đã có ở chân trang). |
| Tiến độ | localStorage qua `createLocalStore` | Chưa có tài khoản; cùng hình dạng dữ liệu có thể chuyển lên database sau. |

## 6. Giao diện

- Phong cách hiện tại: **cute pastel, giữ chất Trung Hoa**, linh vật gấu trúc XiaoQiao (`src/components/Panda.tsx`, 5 biểu cảm: happy, wave, listen, cheer, encourage).
- Lịch sử góp ý của chủ dự án: (1) "đẹp, không thuần AI, độc đáo" → (2) "đơn giản quá" → (3) "phải cute" → (4) "hình vẽ tay SVG xấu, dùng AI vẽ" và "dùng nền giấy nhám Trung Quốc".
- **Hình minh họa do Gemini vẽ** (30/10/2026), thay toàn bộ hình SVG tự vẽ:
  - Gấu trúc: `public/xiaoqiao/<mood>.webp`, nền trong suốt. `Panda` vẫn nhận `mood`, `size` (chiều cao khung), `label`; thêm `preload` cho ảnh đầu trang. Không còn tay rời để vẫy, nên `wave` lắc lư cả người (`sway` trong `globals.css`).
  - Tranh tình huống: `public/scenes/<id>.webp`, đường dẫn lấy qua `sceneArt(id)` trong `src/data/scene-art.ts` (tình huống `free` dùng ảnh gấu trúc). **Thêm tình huống mới thì phải vẽ thêm tranh**, nếu không thẻ sẽ hiện ảnh lỗi.
  - Dải núi thủy mặc: `public/illustrations/shanshui.webp`, giữ nguyên giấy kem của tranh. Lớp `.ink-mountains` làm mờ bốn mép bằng mask; `mix-blend-mode: multiply` để hòa vào giấy. Đã thử tách nền giấy thành trong suốt: ảnh nặng gấp 25 lần và nhiễu hạt.
  - Cách vẽ lại: `scripts/art/gemini_draw.py <tên>` dùng `gemini_web.py` của dự án `C:\Code\trainning_noi_that` (Chrome đã đăng nhập Gemini Pro, khoảng 10 ảnh mỗi tài khoản mỗi ngày, dùng chung với dự án nội thất nên hãy tiết kiệm). Gom nhiều hình vào một ảnh (bảng 5 biểu cảm, lưới 4x2 tranh) rồi cắt bằng `cut_panda.py`, `cut_scenes.py <lưới>`, `cut_mountains.py`. Ảnh gốc nằm ở `scripts/art/gemini/`, cắt lại không tốn lượt.
  - Bài học: Gemini không vẽ nền trong suốt, nên vẽ gấu trúc trên nền xanh `#00FF00` rồi tách màu. Gemini hay vẽ thừa (một hàng mờ thừa trong bảng gấu trúc, hai mặt trời), luôn xem ảnh trước khi cắt. Lưới tình huống sau gửi kèm lưới đầu làm mẫu thì nhân vật và nét vẽ đồng bộ. Giao diện Gemini không có tỉ lệ 21:9; dùng 16:9 rồi cắt. Đổi ảnh trong `public/` mà giữ tên tệp thì bộ tối ưu ảnh của Next vẫn trả bản cũ, nên hãy đổi tên tệp.
- Font: Baloo 2 cho tiêu đề, Be Vietnam Pro cho chữ thường, Noto Sans SC cho chữ Hán để học, ZCOOL KuaiLe chỉ để trang trí (`.han-cute`), Quicksand cho pinyin (`.pinyin`).
- Bốn màu thanh dùng thống nhất toàn app: thanh 1 xanh dương, thanh 2 xanh lá, thanh 3 vàng nâu, thanh 4 đỏ.
- Nền trang là giấy Tuyên (宣纸): màu `--rice` cộng lớp `--rice-texture` (SVG feTurbulence nội tuyến: vân loang, sợi giấy mảnh, hạt li ti), không tải ảnh. Khi chỉnh độ đậm vân, đo lại tương phản chữ (đỏ `--seal` đã đậm lên `#b5352a` để đạt 4.5:1 trên nền giấy).
- **Chỉ có giao diện sáng** (30/10/2026, chủ dự án yêu cầu): bỏ nền tím của chế độ tối để cả web cùng tông giấy kem với tranh thủy mặc. `:root` đặt `color-scheme: light`, nên máy để chế độ tối vẫn thấy nền sáng. Đừng thêm lại bảng màu tối.
- Màu và lớp dùng chung nằm trong `src/app/globals.css`: `.seal` (nút đỏ dạng sticker), `.btn-soft`, `.chip`, `.paper-stack`, `.watermark`, `.vertical`, `.stamp`, `.mic-ring`.

## 7. Kinh nghiệm và các bẫy đã gặp

**React Compiler (dự án bật sẵn)**
- Hook khai báo bên trong một hàm tạo (factory) bị trình biên dịch xử lý sai: tên `use` bị hiểu là `React.use()`, còn biến trong closure bị tách ra ngoài, gây lỗi "fallback is not defined". Cách làm đúng: hook đặt ở cấp module, như `useStore(store)`.

**Âm thanh**
- `AudioContext` phải được tạo trước lệnh `await getUserMedia`, nếu không trình duyệt giữ nó ở trạng thái tạm dừng và bộ đo âm lượng luôn bằng 0.
- Cửa sổ phân tích cao độ phải tính theo thời gian (40 ms), không theo số mẫu cố định. 2048 mẫu ở 16 kHz dài tới 128 ms và nuốt mất khoảng lặng giữa hai âm tiết.

**SVG và CSS**
- Bộ lọc SVG trên một đường nằm ngang (thanh 1) làm đường đó biến mất nếu vùng lọc tính theo khung bao; phải dùng `filterUnits="userSpaceOnUse"`.
- Tấm giấy xếp chồng: cả hai lớp phải là pseudo-element (`::before` ở lớp -2, `::after` ở lớp -1). Nền của chính phần tử sẽ nằm dưới lớp con có `z-index: -1` và trông như bị đè.
- Font Baloo 2 vẽ sai ā ē ī ō ū (dấu ngang tách rời). Mọi chỗ hiển thị pinyin dùng lớp `.pinyin`. Chữ ǜ vẫn phải mượn font dự phòng.
- Chữ Hán luôn cần `lang="zh-CN"` để trình duyệt chọn đúng nét chữ giản thể.

**Kích thước bundle**
- Dữ liệu 6 cấp khá nặng. Thành phần client không được import giá trị từ `@/data/hsk` (chỉ import kiểu). `progressKey` nằm ở `src/lib/progress.ts`; bảng thanh ở `/tones` chỉ dùng HSK 1 và 2. Sau khi build, tìm thử một từ HSK 6 (ví dụ 爱不释手) trong `.next/static` để chắc chắn không lọt vào.

**Next.js 16**
- Đọc tài liệu đi kèm trong `node_modules/next/dist/docs/` trước khi dùng API mới (ví dụ `PageProps<"/route">`, `params` là Promise).
- Route mới cần `npx next typegen` để có kiểu `PageProps`.
- Thành phần dùng micro, localStorage, Web Speech nên chỉ render phía client (`dynamic(..., { ssr: false })`) hoặc đọc qua `useSyncExternalStore`, để tránh lệch nội dung giữa server và trình duyệt.

**Bố cục**
- Lớp giấy phía sau của `.paper-stack` vừa dịch vừa xoay, nên thẻ càng cao thì góc càng lòi ra ngoài lề. Thẻ cao ở khổ 390 từng gây cuộn ngang 1px; `main` trong `layout.tsx` có `overflow-x-clip` để chặn việc này.

**Hiệu năng**
- Không dùng `background-attachment: fixed` trên `body`. Nền giấy (`--rice-texture`) là SVG có 5 lớp `feTurbulence`; khi body có nền fixed, trình duyệt vẽ lại cả lớp nhiễu ở mỗi khung hình cuộn. Đo bằng Edge với CPU chậm 4 lần: 57 đến 84 ms mỗi khung hình (khoảng 15 fps), sau khi sửa còn 8 đến 12 ms. Vân sáng bám màn hình giờ nằm ở `body::before` với `position: fixed`, được ghép lớp riêng nên không vẽ lại khi cuộn.
- Thử nghiệm đã bỏ: vẽ sẵn nền giấy thành ảnh. Nhiễu khó nén nên PNG nặng 670 KB và WebP vẫn khoảng 180 KB, trong khi cách sửa ở trên không tốn thêm byte nào.

**Kiểm thử**
- Vitest chưa cấu hình alias `@/`, nên file test dùng đường dẫn tương đối.
- Test API có chữ Trung nên gửi bằng Node `fetch`; `curl` trong Git Bash trên Windows gửi sai bảng mã.
- Thử micro trong trình duyệt tự động: Edge qua `playwright-core` với cờ `--use-fake-ui-for-media-stream --use-fake-device-for-media-stream --use-file-for-fake-audio-capture=file.wav%noloop`.
- Máy không có giọng TTS tiếng Trung; để thử micro giả, tạo file WAV có đường cao độ theo từng thanh (giống hàm `synth` trong `speech.test.ts`). Bộ nhận dạng không nghe ra chữ từ âm tổng hợp này, nên phần phát âm luôn bị bỏ qua khi thử tự động.
- Đừng gán `Math.random = () => 0` trong trình duyệt tự động: trang treo hẳn. Dùng một hàm tăng dần rất chậm nếu cần chọn câu cố định.
- Dev server chạy lâu có thể kẹt trạng thái (lỗi 500 "Jest worker" ở trang bài học); khởi động lại là hết. Build production không gặp lỗi này.

## 8. Quy ước làm việc

- Chỉ làm source code; chủ dự án tự deploy. Dự án không dùng git.
- Mỗi thay đổi giao diện phải tự đánh giá: chụp màn hình ở khổ 390, 1024, 1920, đo độ tương phản, thử bàn phím, chạy luồng thật trên trình duyệt.
- Key bí mật chỉ nằm trong `.env.local` (đã được bỏ qua khi chia sẻ mã nguồn), chỉ dùng phía server.
- Comment trong code viết bằng tiếng Anh; nội dung giao diện bằng tiếng Việt.
