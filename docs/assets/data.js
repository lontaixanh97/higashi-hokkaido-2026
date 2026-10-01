/* =========================================================
   DỮ LIỆU CHUYẾN ĐI — sửa file này để cập nhật website.
   - Tên khách sạn: trường `name` / `url` trong STAYS
   - Tình trạng đặt chỗ: trường `done` trong BOOKINGS
   - Chuyến bay của Trí: tìm "[Trí:"
   - Ảnh minh hoạ: file images.js
   ========================================================= */

const TRIP = { start: '2027-02-19', end: '2027-02-23' };

/* Các điểm trên bản đồ. x/y là toạ độ trên bản đồ vẽ tay (1200×1000). */
const S = {
  mmb:{n:'Sân bay Memanbetsu',short:'Memanbetsu',jp:'女満別空港',lat:43.8806,lng:144.1642,x:171,y:409,lx:-20,ly:5,la:'end',
    d:'Cửa ngõ của vùng Okhotsk, cách trung tâm Abashiri khoảng 30 phút. Nơi ba người hạ cánh và nhận xe sáng 19/2, cả đoàn trả xe sáng 23/2.',
    tip:'Báo hãng xe giờ nhận khoảng 9:15 ngày 19/2, và hỏi quầy mở cửa lúc mấy giờ sáng 23/2 để trả xe trước chuyến bay 9:15.'},
  abashiri:{n:'Abashiri và tàu phá băng Aurora',short:'Abashiri',jp:'網走・流氷観光砕氷船おーろら',lat:44.0206,lng:144.2733,x:259,y:254,lx:0,ly:-20,la:'middle',
    d:'Thành phố cảng bên biển Okhotsk, tháng 2 thường có băng trôi phủ kín mặt biển. Tàu phá băng Aurora xuất phát từ trạm dừng chân Ryuhyo Kaido Abashiri ngay trong thành phố, chạy khoảng 1 giờ giữa biển băng.',
    tip:'Lịch tháng 2 năm 2026: tàu Aurora chạy lúc 9:30, 11:00, 12:30, 14:00 và 15:30, người lớn 6.000 yên. Lịch 2027 sẽ công bố trên ms-aurora.com. Băng có thể bị gió đẩy ra xa bờ tuỳ ngày.'},
  tento:{n:'Đồi Tento và các bảo tàng',short:'Đồi Tento',jp:'天都山',lat:43.9975,lng:144.2475,x:222,y:290,lx:-20,ly:5,la:'end',
    d:'Ngọn đồi phía nam thành phố với ba bảo tàng. Dưới chân đồi là Bảo tàng nhà tù Abashiri, trên đỉnh là Bảo tàng băng trôi Okhotsk, gần đó là Bảo tàng Dân tộc phương Bắc Hokkaido với bộ sưu tập lớn về người Ainu và các dân tộc vùng cực.',
    tip:'Bảo tàng Dân tộc phương Bắc mở 9:30 đến 16:30, tháng 2 mở cửa mỗi ngày.'},
  shari:{n:'Shari và bờ biển băng trôi',short:'Shari',jp:'斜里',lat:43.9097,lng:144.6708,x:577,y:377,lx:0,ly:22,la:'middle',wp:true,
    d:'Đoạn bờ biển giữa Abashiri và Shari là nơi ngắm băng trôi sát bờ đẹp nhất, nhất là ở ga Kitahama. Gần Shari có "Con đường lên trời", đoạn đường thẳng tắp gần 30 km.',
    tip:'Đi qua Shari hai lần, ngày 20 và 21/2. Đổ đầy xăng ở đây, Utoro có rất ít cây xăng.'},
  oshin:{n:'Thác Oshinkoshin',short:'Thác Oshinkoshin',jp:'オシンコシンの滝',lat:44.0036,lng:144.8739,x:738,y:273,lx:14,ly:22,la:'start',
    d:'Thác nước lớn ngay sát quốc lộ trên đường tới Utoro, tháng 2 phần lớn đóng băng.',
    tip:'Có bãi đỗ xe ngay cạnh, dừng 15 đến 20 phút là đủ. Bậc thang lên thác rất trơn.'},
  utoro:{n:'Utoro',short:'Utoro',jp:'ウトロ',lat:44.0689,lng:144.9908,x:833,y:201,lx:-20,ly:5,la:'end',
    d:'Làng suối nước nóng ven biển phía tây bán đảo Shiretoko, Di sản Thiên nhiên Thế giới.',
    tip:'Tháng 2 ở Utoro còn có tour mặc đồ khô đi bộ và nổi trên băng trôi, nếu muốn thêm một trải nghiệm sáng 21/2 thì phải dời giờ đi Notsuke.'},
  goko:{n:'Ngũ Hồ Shiretoko',short:'Ngũ Hồ',jp:'知床五湖',lat:44.1231,lng:145.0775,x:902,y:141,lx:-20,ly:-6,la:'end',
    d:'Năm hồ giữa rừng nguyên sinh dưới chân dãy núi Shiretoko. Mùa đông, hồ đóng băng và phủ tuyết, chỉ vào được theo tour snowshoe có hướng dẫn viên.',
    tip:'Tour mùa đông chạy 22/1 đến 22/3. Tour chiều khởi hành khoảng 12:50, dài khoảng 4 giờ, tối đa 8 người. Đặt sớm.'},
  shibetsu:{n:'Shibetsu',short:'Shibetsu',jp:'標津',lat:43.6611,lng:145.1311,x:944,y:654,lx:-14,ly:4,la:'end',wp:true,
    d:'Thị trấn ven eo biển Nemuro, cửa ngõ vào bán đảo Notsuke.',
    tip:'Đổ xăng ở đây trước khi vào bán đảo.'},
  notsuke:{n:'Bán đảo Notsuke và Ice Horizon Walk',short:'Notsuke',jp:'野付半島・氷平線',lat:43.5706,lng:145.3239,x:1075,y:722,lx:0,ly:32,la:'middle',
    d:'Doi cát dài 26 km uốn cong ra eo biển Nemuro. Tháng 2, vịnh nông bên trong đóng băng hoàn toàn, có thể đi bộ trên băng tới đường chân trời trắng xoá.',
    tip:'Tour Todowara và Ice Horizon Walk khoảng 2 giờ, đã gồm snowshoe, khởi hành trong khoảng 9:00 đến 15:00. Đặt với Trung tâm thiên nhiên Notsuke: 0153-82-1270.'},
  nakashibetsu:{n:'Nakashibetsu',short:'Nakashibetsu',jp:'中標津',lat:43.5497,lng:144.9711,x:817,y:776,lx:0,ly:22,la:'middle',wp:true,
    d:'Thị trấn nội địa trên đường từ bờ biển vào vùng hồ Akan.'},
  akan:{n:'Hồ Akan và làng Ainu Kotan',short:'Akanko Onsen',jp:'阿寒湖アイヌコタン',lat:43.4322,lng:144.0953,x:116,y:906,lx:20,ly:18,la:'start',
    d:'Ainu Kotan là một trong những làng Ainu lớn nhất Hokkaido, khoảng 120 người sinh sống, với phố cửa hàng thủ công, nhà hát Ikor và quán ăn món Ainu. Tháng 2 mặt hồ Akan đóng băng thành khu lễ hội trên băng.',
    tip:'Lễ hội ICE・LAND AKAN trên mặt hồ (năm 2026 từ 1/2 đến 1/3) có snowmobile, câu cá wakasagi; pháo hoa "Fuyu Hanabi" lúc 20:00 mỗi tối. Nhà hát Ikor: 0154-67-2727.'},
  mashu:{n:'Hồ Mashu',short:'Hồ Mashu',jp:'摩周湖',lat:43.5728,lng:144.5236,x:459,y:750,lx:20,ly:16,la:'start',
    d:'Hồ miệng núi lửa nổi tiếng trong xanh, ngắm từ đài quan sát trên vành núi.',
    tip:'Mùa đông thường chỉ mở đài quan sát số 1. Sương mù hay xuất hiện, thấy được mặt hồ là may mắn.'},
  kawayu:{n:'Kawayu Onsen và núi Iozan',short:'Núi Iozan',jp:'川湯温泉・硫黄山',lat:43.6364,lng:144.4386,x:394,y:678,lx:20,ly:5,la:'start',
    d:'Núi lửa nhỏ bốc khói lưu huỳnh ngay cạnh bãi đỗ xe, dưới chân là thị trấn suối nước nóng Kawayu.',
    tip:'Dừng khoảng 20 phút là đủ. Mùi lưu huỳnh khá nồng.'},
  sunayu:{n:'Sunayu, hồ Kussharo',short:'Sunayu',jp:'砂湯',lat:43.6511,lng:144.3353,x:308,y:664,lx:0,ly:-20,la:'middle',
    d:'Bãi cát ven hồ Kussharo có nước nóng tự nhiên nên mặt hồ chỗ này không đóng băng. Mùa đông có rất nhiều thiên nga về trú.',
    tip:'Không bắt buộc, thêm khoảng 20 phút. Bỏ qua nếu đã quá 15:30.'},
  bihoro:{n:'Đèo Bihoro',short:'Đèo Bihoro',jp:'美幌峠',lat:43.6583,lng:144.2419,x:234,y:656,lx:-20,ly:5,la:'end',
    d:'Điểm ngắm toàn cảnh hồ Kussharo đóng băng từ trên cao, nằm ngay trên đường về Memanbetsu.',
    tip:'Gió trên đèo rất mạnh và lạnh. Nếu tuyết lớn hoặc trời đã tối, đi thẳng.'}
};
const ORDER = ['mmb','abashiri','tento','oshin','utoro','goko','notsuke','akan','mashu','kawayu','sunayu','bihoro'];
/* Điểm phụ chỉ dùng để uốn đường đi trên bản đồ */
const V = { teshikaga:[408,848], mid:[820,560] };

/* Lịch trình từng ngày. drive = số giờ lái xe ước tính. cover = ảnh bìa [điểm, thứ tự ảnh]. */
const DAYS = [
  {id:'d19',date:'19/2',wd:'Thứ Sáu',color:'#5C8DB5',title:'Bay sớm, tàu phá băng Aurora',who:'Ba người buổi sáng, cả 4 từ chiều',mode:'Khoảng 1 giờ lái xe',drive:1,night:'abashiri',cover:['abashiri',0],
   segs:[{pts:['mmb',[205,330],'abashiri']},{pts:['abashiri',[236,266],'tento']}],
   items:[
    {t:'07:00',x:'Quân, Quỳnh, Cụ bay AirDo từ Haneda (HND)'},
    {t:'08:45',x:'Hạ cánh sân bay Memanbetsu',st:'mmb'},
    {t:'09:15',x:'Nhận xe thuê ngay tại sân bay',s:'Đặt trước, lốp tuyết, nên chọn 4WD',st:'mmb'},
    {t:'10:00',x:'Bảo tàng nhà tù Abashiri',s:'Khoảng 30 phút lái từ sân bay, tham quan khoảng 1,5 giờ',st:'tento'},
    {t:'11:45',x:'Bảo tàng băng trôi Okhotsk trên đỉnh đồi Tento',s:'Có phòng lạnh trưng bày băng trôi thật',st:'tento'},
    {t:'12:45',x:'Ăn trưa ở trung tâm Abashiri',st:'abashiri'},
    {t:'13:30',x:'Trí tới Abashiri, cả đoàn gặp nhau',s:'Hẹn ở trạm dừng chân Ryuhyo Kaido Abashiri, nơi tàu Aurora xuất phát. [Trí: điền giờ tới]',st:'abashiri'},
    {t:'14:00',x:'Bảo tàng Dân tộc phương Bắc Hokkaido',s:'Văn hoá Ainu và các dân tộc vùng cực, khoảng 1 giờ. Bỏ qua nếu Trí tới muộn',st:'tento'},
    {t:'15:30',x:'Tàu phá băng Aurora',s:'Khoảng 1 giờ giữa biển băng trôi, ngắm hoàng hôn trên băng',st:'abashiri'},
    {t:'Tối',x:'Nhận phòng, ăn tối hải sản, nghỉ đêm ở Abashiri',st:'abashiri'}]},
  {id:'d20',date:'20/2',wd:'Thứ Bảy',color:'#2F6690',title:'Dọc biển Okhotsk, snowshoe ở Shiretoko',who:'Cả 4 người',mode:'Khoảng 2 giờ lái xe',drive:2,night:'utoro',cover:['shari',0],
   segs:[{pts:['abashiri',[400,335],'shari',[660,335],'oshin',[792,238],'utoro',[872,168],'goko']}],
   items:[
    {t:'08:00',x:'Trả phòng, lái dọc bờ biển Okhotsk',s:'Dừng ở ga Kitahama, ngắm băng trôi sát bờ',st:'shari'},
    {t:'09:30',x:'Shari: "Con đường lên trời", đổ xăng',s:'Rẽ thêm khoảng 20 phút',st:'shari'},
    {t:'10:30',x:'Thác Oshinkoshin đóng băng',st:'oshin'},
    {t:'11:15',x:'Tới Utoro, gửi hành lý, ăn trưa sớm',st:'utoro'},
    {t:'12:50',x:'Tour snowshoe Ngũ Hồ Shiretoko mùa đông',s:'Khoảng 4 giờ, đi trên mặt hồ đóng băng giữa rừng nguyên sinh. Có xe đón ở Utoro',st:'goko'},
    {t:'Tối',x:'Nhận phòng, ngâm onsen, nghỉ đêm ở Utoro',st:'utoro'}]},
  {id:'d21',date:'21/2',wd:'Chủ Nhật',color:'#C0613A',title:'Ice Horizon Walk, tối ở hồ Akan',who:'Cả 4 người',mode:'Khoảng 5 giờ lái xe',drive:5,night:'akan',cover:['notsuke',0],
   segs:[{pts:['utoro',[780,250],[728,292],[655,345],'shari',[700,470],'mid','shibetsu',[1000,702],'notsuke']},{pts:['notsuke',[990,730],[900,750],'nakashibetsu',[610,822],'teshikaga',[260,884],'akan']}],
   items:[
    {t:'07:30',x:'Trả phòng, lái qua Shari và Shibetsu xuống Notsuke',s:'Khoảng 2,5 giờ',st:'shibetsu'},
    {t:'10:15',x:'Tới Trung tâm thiên nhiên bán đảo Notsuke',st:'notsuke'},
    {t:'10:30',x:'Tour Todowara và Ice Horizon Walk',s:'Khoảng 2 giờ, đi bộ trên vịnh đóng băng, đã gồm snowshoe',st:'notsuke'},
    {t:'12:30',x:'Ăn trưa ở trung tâm thiên nhiên',st:'notsuke'},
    {t:'13:30',x:'Lái qua Nakashibetsu tới hồ Akan',s:'Khoảng 2,5 giờ, tới trước khi trời tối',st:'nakashibetsu'},
    {t:'16:15',x:'Nhận phòng Akanko Onsen',st:'akan'},
    {t:'Tối',x:'Múa cổ Ainu ở nhà hát Ikor, rồi xem pháo hoa trên mặt hồ',s:'Pháo hoa "Fuyu Hanabi" lúc 20:00',st:'akan'}]},
  {id:'d22',date:'22/2',wd:'Thứ Hai',color:'#9277B8',title:'Văn hoá Ainu, qua các hồ về Abashiri',who:'Cả 4 người',mode:'Khoảng 3 giờ lái xe',drive:3,night:'abashiri',cover:['akan',1],
   segs:[{pts:['akan',[260,884],'teshikaga','mashu',[432,712],'kawayu',[350,668],'sunayu',[270,648],'bihoro',[210,520],'mmb',[205,330],'abashiri']}],
   items:[
    {t:'08:30',x:'Lễ hội trên mặt hồ Akan đóng băng',s:'Snowmobile, câu cá wakasagi trên băng',st:'akan'},
    {t:'10:00',x:'Trải nghiệm thủ công Ainu cùng người Ainu',s:'Khắc gỗ, thêu hoa văn, chơi đàn môi mukkuri. Đặt qua "Anytime, Ainutime!", tối thiểu 2 người',st:'akan'},
    {t:'11:30',x:'Ăn trưa món Ainu ở quán Poronno, dạo Ainu Kotan',s:'Mua đồ thủ công làm quà',st:'akan'},
    {t:'13:00',x:'Trả phòng, lái tới hồ Mashu',s:'Khoảng 1 giờ',st:'mashu'},
    {t:'14:30',x:'Núi lưu huỳnh Iozan',st:'kawayu'},
    {t:'15:00',x:'Thiên nga ở Sunayu, nếu kịp giờ',st:'sunayu'},
    {t:'15:45',x:'Đèo Bihoro, ngắm hồ Kussharo đóng băng',st:'bihoro'},
    {t:'17:00',x:'Về Abashiri, nhận phòng',s:'Khoảng 1 giờ từ đèo Bihoro',st:'abashiri'}]},
  {id:'d23',date:'23/2',wd:'Thứ Ba',color:'#8FB0CC',title:'Bay về Tokyo',who:'Quân, Quỳnh, Cụ',mode:'Khoảng 30 phút lái xe',drive:0.5,night:null,cover:['abashiri',1],
   segs:[{pts:['abashiri',[232,338],'mmb']}],
   items:[
    {t:'07:00',x:'Trả phòng, lái ra sân bay Memanbetsu',st:'abashiri'},
    {t:'07:45',x:'Trả xe, làm thủ tục bay',s:'Hỏi trước giờ mở cửa quầy trả xe',st:'mmb'},
    {t:'09:15',x:'Bay AirDo từ Memanbetsu về Haneda',s:'Tới Haneda lúc 11:10',st:'mmb'},
    {t:'',x:'Trí bay về riêng',s:'[Trí: điền giờ bay về]'}]}
];

/* Nơi nghỉ. Điền tên và link đặt phòng khi đã chốt. */
const STAYS = [
  {at:'abashiri',nights:['d19'],who:'Cả 4 người',name:'',url:''},
  {at:'utoro',nights:['d20'],who:'Cả 4 người',name:'',url:''},
  {at:'akan',nights:['d21'],who:'Cả 4 người',name:'',url:''},
  {at:'abashiri',nights:['d22'],who:'Cả 4 người. Có thể đặt cùng khách sạn đêm 19/2, hoặc chọn Memanbetsu Onsen cho gần sân bay',name:'',url:''}
];

/* Những thứ cần đặt trước. Đổi done:true khi đã đặt xong. */
const BOOKINGS = [
  {x:'Vé AirDo cho Quân, Quỳnh, Cụ',s:'HND 7:00 → MMB 8:45 ngày 19/2; MMB 9:15 → HND 11:10 ngày 23/2',done:false},
  {x:'Vé đi và về của Trí',s:'Tới Abashiri trước khoảng 13:30 ngày 19/2',done:false},
  {x:'Xe thuê tại sân bay Memanbetsu',s:'Nhận 9:15 ngày 19/2, trả khoảng 7:45 ngày 23/2. Lốp tuyết, 4WD. Trí muốn lái thì đăng ký thêm người lái',done:false},
  {x:'Tàu phá băng Aurora',s:'15:30 ngày 19/2, 4 người',done:false},
  {x:'Tour snowshoe Ngũ Hồ Shiretoko mùa đông',s:'Chiều 20/2, khởi hành khoảng 12:50, tối đa 8 người',done:false},
  {x:'Tour Todowara và Ice Horizon Walk',s:'10:30 ngày 21/2, gọi 0153-82-1270',done:false},
  {x:'Vé múa cổ Ainu ở nhà hát Ikor',s:'Tối 21/2, xem lịch diễn tháng 2',done:false},
  {x:'Trải nghiệm thủ công Ainu "Anytime, Ainutime!"',s:'Sáng 22/2',done:false},
  {x:'Nơi nghỉ Abashiri đêm 19/2',s:'4 người',done:false},
  {x:'Nơi nghỉ Utoro đêm 20/2',s:'4 người',done:false},
  {x:'Nơi nghỉ Akanko Onsen đêm 21/2',s:'4 người',done:false},
  {x:'Nơi nghỉ Abashiri hoặc Memanbetsu Onsen đêm 22/2',s:'4 người, gần sân bay cho chuyến 9:15',done:false}
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
