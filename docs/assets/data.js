/* =========================================================
   DỮ LIỆU CHUYẾN ĐI — sửa file này để cập nhật website.
   - Tên khách sạn: trường `name` / `url` trong STAYS
   - Tình trạng đặt chỗ: trường `done` trong BOOKINGS
   - Giờ bay về: tìm "[Điền giờ bay về]"
   - Ảnh minh hoạ: file images.js
   ========================================================= */

const TRIP = { start: '2026-12-25', end: '2026-12-30' };

/* Các điểm trên bản đồ. x/y là toạ độ trên bản đồ vẽ tay (1200×1000). */
const S = {
  mmb:{n:'Sân bay Memanbetsu',short:'Memanbetsu',jp:'女満別空港',lat:43.8806,lng:144.1642,x:171,y:409,lx:-20,ly:5,la:'end',
    d:'Cửa ngõ của vùng Okhotsk, cách trung tâm Abashiri khoảng 30 phút đi bus. Nơi Trí hạ cánh ngày 26/12 và cả đoàn trả xe ngày 30/12.',
    tip:'Bus sân bay vào Abashiri chạy theo giờ chuyến bay đến, xuống ở ga JR Abashiri.'},
  abashiri:{n:'Abashiri',short:'Abashiri',jp:'網走',lat:44.0206,lng:144.2733,x:259,y:254,lx:0,ly:-20,la:'middle',
    d:'Thành phố cảng bên biển Okhotsk. Cả đoàn ở đây 2 đêm, gặp nhau và nhận xe ở ga JR Abashiri.',
    tip:'Quầy thuê xe Toyota nằm ngay trong khu Eki-Rent của ga, đặt trước và báo nhận xe khoảng 14:00 ngày 26/12.'},
  tento:{n:'Đồi Tento và các bảo tàng',short:'Đồi Tento',jp:'天都山',lat:43.9975,lng:144.2475,x:222,y:290,lx:-20,ly:5,la:'end',
    d:'Ngọn đồi phía nam thành phố với ba bảo tàng. Dưới chân đồi là Bảo tàng nhà tù Abashiri, trên đỉnh là Bảo tàng băng trôi Okhotsk, gần đó là Bảo tàng Dân tộc phương Bắc Hokkaido với bộ sưu tập lớn về người Ainu và các dân tộc vùng cực.',
    tip:'Bảo tàng Dân tộc phương Bắc mở 9:30 đến 16:30, nghỉ thứ Hai và từ 29/12. Thứ Bảy 26/12 vẫn mở.'},
  shari:{n:'Shari',short:'Shari',jp:'斜里',lat:43.9097,lng:144.6708,x:577,y:377,lx:0,ly:22,la:'middle',wp:true,
    d:'Thị trấn trung chuyển giữa Abashiri, bán đảo Shiretoko và vùng hồ. Gần đây có "Con đường lên trời", đoạn đường thẳng tắp dài gần 30 km.',
    tip:'Đổ đầy xăng ở đây cả hai lần đi qua, Utoro có rất ít cây xăng.'},
  oshin:{n:'Thác Oshinkoshin',short:'Thác Oshinkoshin',jp:'オシンコシンの滝',lat:44.0036,lng:144.8739,x:738,y:273,lx:14,ly:22,la:'start',
    d:'Thác nước lớn ngay sát quốc lộ trên đường tới Utoro, mùa đông đóng băng một phần.',
    tip:'Có bãi đỗ xe ngay cạnh, dừng 15 đến 20 phút là đủ.'},
  utoro:{n:'Utoro',short:'Utoro',jp:'ウトロ',lat:44.0689,lng:144.9908,x:833,y:201,lx:-20,ly:5,la:'end',
    d:'Làng suối nước nóng ven biển phía tây bán đảo Shiretoko, Di sản Thiên nhiên Thế giới.',
    tip:'Ngũ Hồ Shiretoko đóng cửa tới 22/1, nên tháng 12 đi rừng và thác Furepe theo tour snowshoe.'},
  furepe:{n:'Rừng nguyên sinh và thác Furepe',short:'Thác Furepe',jp:'フレペの滝',lat:44.0772,lng:145.0183,x:866,y:170,lx:18,ly:5,la:'start',
    d:'Thác nước đổ thẳng từ vách đá xuống biển Okhotsk, đi bộ xuyên rừng từ Trung tâm thiên nhiên Shiretoko. Mùa đông hay gặp hươu Ezo trong rừng.',
    tip:'Tháng 12 có tour snowshoe rừng nguyên sinh, snowshoe thác Furepe và tour ngắm đại bàng (ví dụ Picchio, Shinra). Đặt trước.'},
  kawayu:{n:'Kawayu Onsen và núi Iozan',short:'Núi Iozan',jp:'川湯温泉・硫黄山',lat:43.6364,lng:144.4386,x:394,y:678,lx:20,ly:5,la:'start',
    d:'Núi lửa nhỏ bốc khói lưu huỳnh ngay cạnh bãi đỗ xe, dưới chân là thị trấn suối nước nóng Kawayu.',
    tip:'Dừng khoảng 20 phút là đủ. Mùi lưu huỳnh khá nồng.'},
  sunayu:{n:'Sunayu, hồ Kussharo',short:'Sunayu',jp:'砂湯',lat:43.6511,lng:144.3353,x:308,y:664,lx:0,ly:-20,la:'middle',
    d:'Bãi cát ven hồ Kussharo có nước nóng tự nhiên, đào xuống là thấy hơi ấm. Mùa đông có thiên nga về trú.',
    tip:'Không bắt buộc, thêm khoảng 30 phút. Bỏ qua nếu đã quá 14:00.'},
  mashu:{n:'Hồ Mashu',short:'Hồ Mashu',jp:'摩周湖',lat:43.5728,lng:144.5236,x:459,y:750,lx:20,ly:16,la:'start',
    d:'Hồ miệng núi lửa nổi tiếng trong xanh, ngắm từ đài quan sát trên vành núi.',
    tip:'Mùa đông thường chỉ mở đài quan sát số 1. Sương mù hay xuất hiện, thấy được mặt hồ là may mắn.'},
  akan:{n:'Hồ Akan và làng Ainu Kotan',short:'Akanko Onsen',jp:'阿寒湖アイヌコタン',lat:43.4322,lng:144.0953,x:116,y:906,lx:20,ly:18,la:'start',
    d:'Ainu Kotan là một trong những làng Ainu lớn nhất Hokkaido, khoảng 120 người sinh sống, với phố cửa hàng thủ công, nhà hát Ikor, nhà tưởng niệm đời sống Ainu và quán ăn món Ainu. Hồ Akan bên cạnh nổi tiếng với tảo cầu Marimo.',
    tip:'Nhà hát Ikor diễn múa cổ Ainu và "Lost Kamuy" theo suất, lịch thay đổi theo mùa. Gọi 0154-67-2727 hoặc xem akanainu.jp.'}
};
const ORDER = ['mmb','abashiri','tento','oshin','utoro','furepe','kawayu','sunayu','mashu','akan'];
/* Điểm phụ chỉ dùng để uốn đường đi trên bản đồ */
const V = { teshikaga:[408,848], tsubetsu:[70,640] };

/* Lịch trình từng ngày. drive = số giờ lái xe ước tính. cover = ảnh bìa [điểm, thứ tự ảnh]. */
const DAYS = [
  {id:'d25',date:'25/12',wd:'Thứ Sáu',color:'#8FB0CC',title:'Nhóm ba người tới Abashiri',who:'Quân, Quỳnh, Cụ',mode:'Bus sân bay',drive:0,night:'abashiri',nightNote:'3 người',cover:['abashiri',0],
   segs:[{bus:1,pts:['mmb',[205,330],'abashiri']}],
   items:[
    {t:'12:15',x:'Cất cánh từ sân bay Haneda (HND)',s:'Ăn trưa ở sân bay hoặc trên máy bay'},
    {t:'13:55',x:'Hạ cánh sân bay Memanbetsu',st:'mmb'},
    {t:'14:20',x:'Bus sân bay vào trung tâm Abashiri',s:'Khoảng 30 phút, bus chạy theo giờ chuyến bay đến',st:'abashiri'},
    {t:'15:00',x:'Nhận phòng, gửi hành lý',s:'Ở đây 2 đêm nên dỡ đồ thoải mái',st:'abashiri'},
    {t:'15:30',x:'Dạo cảng Abashiri, ngắm hoàng hôn',s:'Mặt trời lặn khoảng 15:45, trời tối rất nhanh',st:'abashiri'},
    {t:'Tối',x:'Ăn tối hải sản, nghỉ đêm tại Abashiri',st:'abashiri'}]},
  {id:'d26',date:'26/12',wd:'Thứ Bảy',color:'#5C8DB5',title:'Trí tới Abashiri, cả đoàn nhận xe',who:'Cả 4 người',mode:'Trí đi bus, lái xe trong thành phố',drive:0.5,night:'abashiri',cover:['tento',2],
   segs:[{bus:1,pts:['mmb',[205,330],'abashiri']},{pts:['abashiri',[236,266],'tento']}],
   items:[
    {t:'07:45',x:'Trí cất cánh từ sân bay Yamaguchi Ube (UBJ)'},
    {t:'09:00',x:'Nhóm ba người đi Bảo tàng nhà tù Abashiri',s:'Khoảng 2 giờ. Taxi hoặc bus tham quan từ ga',st:'tento'},
    {t:'11:15',x:'Bảo tàng băng trôi Okhotsk trên đỉnh đồi Tento',s:'Có phòng lạnh trưng bày băng trôi thật',st:'tento'},
    {t:'12:30',x:'Ăn trưa ở trung tâm Abashiri',st:'abashiri'},
    {t:'13:00',x:'Trí hạ cánh, tự đi bus sân bay vào Abashiri',s:'Khoảng 30 phút, xuống ở ga JR Abashiri',st:'mmb'},
    {t:'13:45',x:'Cả đoàn gặp nhau ở ga JR Abashiri',st:'abashiri'},
    {t:'14:00',x:'Nhận xe ở quầy thuê xe trong ga',s:'Tất cả người sẽ lái có mặt để đăng ký bằng lái',st:'abashiri'},
    {t:'14:30',x:'Bảo tàng Dân tộc phương Bắc Hokkaido',s:'Văn hoá Ainu và các dân tộc vùng cực, mở tới 16:30',st:'tento'},
    {t:'15:45',x:'Ngắm hoàng hôn trên đồi Tento',st:'tento'},
    {t:'Tối',x:'Ăn tối, nghỉ đêm thứ hai ở Abashiri',st:'abashiri'}]},
  {id:'d27',date:'27/12',wd:'Chủ Nhật',color:'#2F6690',title:'Dọc biển Okhotsk, snowshoe ở Shiretoko',who:'Cả 4 người',mode:'Khoảng 2 giờ lái xe',drive:2,night:'utoro',cover:['oshin',0],
   segs:[{pts:['abashiri',[400,335],'shari',[660,335],'oshin',[792,238],'utoro',[850,184],'furepe']}],
   items:[
    {t:'08:30',x:'Trả phòng, lái dọc bờ biển Okhotsk về phía Shari',s:'Có thể dừng ở ga Kitahama sát mép biển',st:'abashiri'},
    {t:'09:45',x:'Shari: "Con đường lên trời", đổ xăng',s:'Rẽ thêm khoảng 20 phút',st:'shari'},
    {t:'10:45',x:'Thác Oshinkoshin',st:'oshin'},
    {t:'11:15',x:'Tới Utoro, gửi hành lý, ăn trưa',st:'utoro'},
    {t:'12:30',x:'Tour snowshoe rừng nguyên sinh Shiretoko',s:'Khoảng 3 giờ, có hướng dẫn viên, cần đặt trước',st:'furepe'},
    {t:'16:00',x:'Nhận phòng, ngâm onsen, nghỉ đêm ở Utoro',st:'utoro'}]},
  {id:'d28',date:'28/12',wd:'Thứ Hai',color:'#6F73C0',title:'Đại bàng buổi sáng, hồ núi lửa, tới Akan',who:'Cả 4 người',mode:'Khoảng 3,5 giờ lái xe',drive:3.5,night:'akan',cover:['mashu',0],
   segs:[{pts:['utoro',[792,238],'oshin',[660,335],'shari',[480,520],'kawayu',[350,660],'sunayu',[360,700],[420,730],'mashu','teshikaga',[260,884],'akan']}],
   items:[
    {t:'08:30',x:'Tour ngắm đại bàng và động vật hoang dã',s:'Khoảng 2 giờ, có hướng dẫn viên. Có thể thay bằng snowshoe ra thác Furepe',st:'furepe'},
    {t:'10:45',x:'Trả phòng, lái về Shari, ăn trưa',s:'Khoảng 50 phút',st:'shari'},
    {t:'13:15',x:'Núi lưu huỳnh Iozan',s:'Khoảng 1 giờ lái từ Shari',st:'kawayu'},
    {t:'13:45',x:'Bãi cát nóng Sunayu, nếu kịp giờ',st:'sunayu'},
    {t:'14:30',x:'Hồ Mashu, đài quan sát số 1',st:'mashu'},
    {t:'15:45',x:'Tới Akanko Onsen, nhận phòng',s:'Ở đây 2 đêm',st:'akan'},
    {t:'Tối',x:'Xem múa cổ Ainu ở nhà hát Ikor',s:'Di sản văn hoá phi vật thể UNESCO, khoảng 30 phút',st:'akan'}]},
  {id:'d29',date:'29/12',wd:'Thứ Ba',color:'#C0613A',title:'Một ngày với văn hoá Ainu',who:'Cả 4 người',mode:'Không lái xe',drive:0,night:'akan',cover:['akan',0],
   segs:[{pts:['akan']}],
   items:[
    {t:'09:00',x:'Trung tâm Eco Museum hồ Akan, đường mòn núi lửa bùn Bokke',s:'Xem tảo cầu Marimo, đi bộ khoảng 1 giờ trên tuyết',st:'akan'},
    {t:'11:00',x:'Dạo làng Ainu Kotan',s:'Phố cửa hàng thủ công, nhiều nghệ nhân khắc gỗ làm việc ngay tại tiệm',st:'akan'},
    {t:'12:00',x:'Ăn trưa món Ainu ở quán Poronno',s:'Món truyền thống làm từ nguyên liệu Hokkaido',st:'akan'},
    {t:'13:30',x:'Trải nghiệm thủ công Ainu cùng người Ainu',s:'Khắc gỗ, thêu hoa văn, chơi đàn môi mukkuri. Đặt qua "Anytime, Ainutime!", tối thiểu 2 người',st:'akan'},
    {t:'15:30',x:'Nhà tưởng niệm đời sống Ainu',s:'Bảo tàng nhỏ về nhà ở và đồ dùng truyền thống',st:'akan'},
    {t:'Tối',x:'Xem "Lost Kamuy" ở nhà hát Ikor',s:'Múa Ainu kết hợp trình chiếu kỹ thuật số, khoảng 30 phút',st:'akan'}]},
  {id:'d30',date:'30/12',wd:'Thứ Tư',color:'#9277B8',title:'Mua đồ thủ công Ainu, bay về',who:'Cả 4 người',mode:'Khoảng 2 giờ lái xe',drive:2,night:null,cover:['akan',1],
   segs:[{pts:['akan',[92,790],'tsubetsu',[118,520],'mmb']}],
   items:[
    {t:'09:00',x:'Ghé lại Ainu Kotan mua đồ thủ công làm quà',st:'akan'},
    {t:'10:00',x:'Lái xe về sân bay Memanbetsu',s:'Khoảng 1,5 đến 2 giờ',st:'mmb'},
    {t:'12:00',x:'Trả xe, làm thủ tục bay về',s:'[Điền giờ bay về]',st:'mmb'}]}
];

/* Nơi nghỉ. Điền tên và link đặt phòng khi đã chốt. */
const STAYS = [
  {at:'abashiri',nights:['d25','d26'],who:'Đêm đầu 3 người, đêm sau 4 người',name:'',url:''},
  {at:'utoro',nights:['d27'],who:'Cả 4 người',name:'',url:''},
  {at:'akan',nights:['d28','d29'],who:'Cả 4 người',name:'',url:''}
];

/* Những thứ cần đặt trước. Đổi done:true khi đã đặt xong. */
const BOOKINGS = [
  {x:'Xe thuê, nhận ở ga JR Abashiri',s:'Nhận khoảng 14:00 ngày 26/12, trả ở sân bay Memanbetsu ngày 30/12. Hỏi phí trả xe khác nơi. Lốp tuyết, nên chọn 4WD',done:false},
  {x:'Tour snowshoe rừng nguyên sinh Shiretoko',s:'Chiều 27/12, khoảng 3 giờ',done:false},
  {x:'Tour ngắm đại bàng hoặc snowshoe thác Furepe',s:'Sáng 28/12, khoảng 2 đến 3 giờ',done:false},
  {x:'Trải nghiệm thủ công Ainu "Anytime, Ainutime!"',s:'Chiều 29/12, hỏi chương trình mùa đông',done:false},
  {x:'Vé nhà hát Ikor: múa cổ Ainu và "Lost Kamuy"',s:'Tối 28 và 29/12, xem lịch diễn mùa đông',done:false},
  {x:'Nơi nghỉ Abashiri, 2 đêm',s:'25/12 cho 3 người, 26/12 thêm Trí thành 4 người',done:false},
  {x:'Nơi nghỉ Utoro, 1 đêm',s:'27/12, 4 người',done:false},
  {x:'Nơi nghỉ Akanko Onsen, 2 đêm',s:'28 và 29/12, 4 người',done:false},
  {x:'Vé máy bay về ngày 30/12',s:'Chọn chuyến sau khoảng 13:30 để kịp trả xe',done:false}
];

/* Danh sách hành lý — mỗi người tự đánh dấu, lưu trên máy của mình. */
const PACKING = [
  {g:'Quần áo', items:[
    'Áo giữ nhiệt, 2 đến 3 bộ',
    'Áo khoác lông vũ dài, chống gió',
    'Quần giữ nhiệt và quần ngoài chống thấm',
    'Áo len hoặc áo nỉ lớp giữa',
    'Tất len dày, vài đôi',
    'Mũ len che tai và khăn quàng cổ']},
  {g:'Giày và găng', items:[
    'Boot chống thấm, đế bám tuyết',
    'Đinh bám giày chống trượt',
    'Găng tay chống thấm',
    'Găng mỏng dùng được màn hình điện thoại']},
  {g:'Đồ dùng', items:[
    'Miếng dán giữ nhiệt kairo (mua ở konbini)',
    'Kính râm, tuyết phản chiếu rất chói',
    'Kem dưỡng da và son dưỡng',
    'Sạc dự phòng, pin tụt nhanh khi lạnh',
    'Khăn nhỏ cho onsen và Sunayu',
    'Ống kính tele nếu muốn chụp đại bàng, thiên nga']},
  {g:'Giấy tờ', items:[
    'Hộ chiếu hoặc thẻ cư trú',
    'Bằng lái hợp lệ ở Nhật (người lái xe)',
    'Tiền mặt, nhiều nơi vùng xa chỉ nhận tiền mặt',
    'Thẻ IC và thẻ tín dụng',
    'Bảo hiểm du lịch']}
];
