/* =========================================================
   DỮ LIỆU CHUYẾN ĐI — sửa file này để cập nhật website.
   - Tên khách sạn: trường `name` / `url` trong STAYS
   - Tình trạng đặt chỗ: trường `done` trong BOOKINGS
   - Chuyến nối về Ube của Trí: tìm "[Trí:"
   - Ảnh minh hoạ: file images.js
   ========================================================= */

const TRIP = { start: '2027-02-19', end: '2027-02-23' };

/* Các điểm trên bản đồ. x/y là toạ độ trên bản đồ vẽ tay (1200×1000). */
const S = {
  mmb:{n:'Sân bay Memanbetsu',short:'Memanbetsu',jp:'女満別空港',lat:43.8806,lng:144.1642,x:171,y:409,lx:-20,ly:5,la:'end',
    d:'Cửa ngõ của vùng Okhotsk, cách Abashiri khoảng 30 phút. Ba người hạ cánh sáng 19/2 và cả đoàn bay về sáng 23/2.',
    tip:'Bus sân bay chạy theo giờ chuyến bay, cả lúc đến và lúc đi, khoảng 30 phút tới ga JR Abashiri. Nên mua vé web trước để khỏi xếp hàng.'},
  abashiri:{n:'Abashiri và tàu phá băng Aurora',short:'Abashiri',jp:'網走・流氷観光砕氷船おーろら',lat:44.0206,lng:144.2733,x:259,y:254,lx:0,ly:-20,la:'middle',
    d:'Thành phố cảng bên biển Okhotsk, tháng 2 thường có băng trôi phủ kín mặt biển. Tàu phá băng Aurora xuất phát từ trạm dừng chân Ryuhyo Kaido Abashiri ngay trong thành phố. Cả đoàn nhận xe và trả xe ở quầy Toyota trong ga JR Abashiri.',
    tip:'Tàu Aurora tháng 2 năm 2026 chạy lúc 9:30, 11:00, 12:30, 14:00 và 15:30, người lớn 6.000 yên. Phải đi chuyến 9:30 mới kịp tour Ngũ Hồ lúc 12:50. Quầy xe Toyota trong ga mở 8:30 đến 17:30, điện thoại 0152-67-6678.'},
  tento:{n:'Đồi Tento và các bảo tàng',short:'Đồi Tento',jp:'天都山',lat:43.9975,lng:144.2475,x:222,y:290,lx:-20,ly:5,la:'end',
    d:'Ngọn đồi phía nam thành phố với ba bảo tàng. Dưới chân đồi là Bảo tàng nhà tù Abashiri, trên đỉnh là Bảo tàng băng trôi Okhotsk, gần đó là Bảo tàng Dân tộc phương Bắc Hokkaido với bộ sưu tập lớn về người Ainu và các dân tộc vùng cực.',
    tip:'Bus tham quan của Abashiri Bus chạy vòng ga JR Abashiri, ba bảo tàng và bến tàu Aurora; vé 1DAY đi không giới hạn và được giảm giá vé vào cửa. Bảo tàng nhà tù có nhà ăn phục vụ "cơm tù" mô phỏng suất ăn của phạm nhân.'},
  notoro:{n:'Mũi Notoro',short:'Mũi Notoro',jp:'能取岬',q:'能取岬',lat:44.0611,lng:144.1636,x:200,y:238,lx:-18,ly:4,la:'end',
    d:'Mũi đất có ngọn hải đăng đen trắng, nhìn ra biển Okhotsk phủ băng trôi. Điểm ngắm hoàng hôn đẹp, cách trung tâm Abashiri khoảng 20 phút lái xe.',
    tip:'Gió trên mũi rất mạnh. Bỏ qua nếu Trí tới muộn hoặc trời tuyết lớn.'},
  shari:{n:'Shari và bờ biển băng trôi',short:'Shari',jp:'斜里',lat:43.9097,lng:144.6708,x:577,y:377,lx:0,ly:22,la:'middle',wp:true,
    d:'Đoạn bờ biển giữa Abashiri và Shari là nơi thấy băng trôi sát bờ rõ nhất, nhất là quanh ga Kitahama.',
    tip:'Đi qua Shari hai lần, ngày 20 và 21/2. Đổ đầy xăng ở đây, Utoro có rất ít cây xăng.'},
  utoro:{n:'Utoro',short:'Utoro',jp:'ウトロ',lat:44.0689,lng:144.9908,x:833,y:201,lx:-20,ly:5,la:'end',
    d:'Làng suối nước nóng ven biển phía tây bán đảo Shiretoko, Di sản Thiên nhiên Thế giới. Nhiều khách sạn có onsen nhìn ra biển băng.',
    tip:'Nghỉ ở Utoro thay vì Shibetsu: tour Ngũ Hồ kết thúc khoảng 17:00, trời đã tối, đi Shibetsu phải lái thêm khoảng 2 giờ qua đèo Konpoku trong đêm.'},
  goko:{n:'Ngũ Hồ Shiretoko',short:'Ngũ Hồ',jp:'知床五湖',lat:44.1231,lng:145.0775,x:902,y:141,lx:-20,ly:-6,la:'end',
    d:'Năm hồ giữa rừng nguyên sinh dưới chân dãy núi Shiretoko. Mùa đông, hồ đóng băng và phủ tuyết, chỉ vào được theo tour snowshoe có hướng dẫn viên.',
    tip:'Tour mùa đông chạy 22/1 đến 22/3. Tour chiều khởi hành khoảng 12:50 ở Utoro, dài khoảng 4 giờ, tối đa 8 người. Đặt sớm.'},
  oshin:{n:'Thác Oshinkoshin',short:'Thác Oshinkoshin',jp:'オシンコシンの滝',lat:44.0036,lng:144.8739,x:738,y:273,lx:14,ly:22,la:'start',
    d:'Thác nước lớn ngay sát quốc lộ giữa Utoro và Shari, tháng 2 phần lớn đóng băng.',
    tip:'Có bãi đỗ xe ngay cạnh, dừng 15 phút là đủ. Bậc thang lên thác rất trơn.'},
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
  bihoro:{n:'Đèo Bihoro',short:'Đèo Bihoro',jp:'美幌峠',lat:43.6583,lng:144.2419,x:234,y:656,lx:-20,ly:5,la:'end',
    d:'Điểm ngắm toàn cảnh hồ Kussharo đóng băng từ trên cao, nằm ngay trên đường từ Akan về Abashiri.',
    tip:'Gió trên đèo rất mạnh và lạnh. Nếu tuyết lớn hoặc muộn giờ trả xe, đi thẳng.'}
};
const ORDER = ['mmb','abashiri','tento','notoro','utoro','goko','oshin','notsuke','akan','bihoro'];
/* Điểm phụ chỉ dùng để uốn đường đi trên bản đồ */
const V = { teshikaga:[408,848], mid:[820,560] };

/* Lịch trình từng ngày. drive = số giờ lái xe ước tính. cover = ảnh bìa [điểm, thứ tự ảnh]. */
const DAYS = [
  {id:'d19',date:'19/2',wd:'Thứ Sáu',color:'#5C8DB5',title:'Bảo tàng Abashiri, Trí tới lúc 15:30',who:'Ba người tới 15:30, sau đó cả 4',mode:'Bus ban ngày, chiều nhận xe',drive:0.5,night:'abashiri',cover:['tento',0],
   segs:[{bus:1,pts:['mmb',[205,330],'abashiri']},{bus:1,pts:['abashiri',[236,266],'tento']},{pts:['abashiri',[232,246],'notoro']}],
   items:[
    {t:'07:00',x:'Quân, Quỳnh, Cụ bay AirDo từ Haneda (HND)'},
    {t:'08:45',x:'Hạ cánh sân bay Memanbetsu',st:'mmb'},
    {t:'09:10',x:'Bus sân bay vào ga JR Abashiri',s:'Khoảng 30 phút. Gửi hành lý ở khách sạn gần ga',st:'abashiri'},
    {t:'10:00',x:'Bảo tàng nhà tù Abashiri',s:'Đi bus tham quan bằng vé 1DAY, khoảng 2 giờ',st:'tento'},
    {t:'12:00',x:'Ăn trưa "cơm tù" ở nhà ăn trong bảo tàng nhà tù',st:'tento'},
    {t:'13:00',x:'Bảo tàng băng trôi Okhotsk trên đỉnh đồi Tento',s:'Có phòng lạnh trưng bày băng trôi thật',st:'tento'},
    {t:'14:00',x:'Bảo tàng Dân tộc phương Bắc Hokkaido',s:'Văn hoá Ainu và các dân tộc vùng cực. Bắt bus về ga trước 15:30',st:'tento'},
    {t:'15:30',x:'Trí tới ga JR Abashiri, cả đoàn gặp nhau',st:'abashiri'},
    {t:'15:45',x:'Nhận xe ở quầy Toyota trong ga',s:'Tất cả người sẽ lái có mặt. Quầy đóng 17:30',st:'abashiri'},
    {t:'16:15',x:'Ngắm hoàng hôn trên biển băng ở mũi Notoro',s:'Khoảng 20 phút lái xe, mặt trời lặn khoảng 16:50',st:'notoro'},
    {t:'Tối',x:'Nhận phòng, ăn tối, ngủ sớm',s:'Sáng mai đi tàu phá băng',st:'abashiri'}]},
  {id:'d20',date:'20/2',wd:'Thứ Bảy',color:'#2F6690',title:'Tàu phá băng, rồi snowshoe Ngũ Hồ',who:'Cả 4 người',mode:'Khoảng 2 giờ lái xe',drive:2,night:'utoro',cover:['abashiri',0],
   segs:[{pts:['abashiri',[400,335],'shari',[660,335],'oshin',[792,238],'utoro',[872,168],'goko']}],
   items:[
    {t:'08:00',x:'Trả phòng, mua đồ ăn trưa ở konbini',s:'Ăn trên xe để kịp tour chiều',st:'abashiri'},
    {t:'09:00',x:'Tới bến tàu ở trạm dừng chân Ryuhyo Kaido, đỗ xe, lấy vé',st:'abashiri'},
    {t:'09:30',x:'Tàu phá băng Aurora',s:'Khoảng 1 giờ giữa biển băng trôi',st:'abashiri'},
    {t:'10:45',x:'Lái dọc biển Okhotsk tới Utoro',s:'Khoảng 1 giờ 45 phút qua ga Kitahama và Shari. Đổ xăng ở Shari',st:'shari'},
    {t:'12:30',x:'Tới Utoro, có mặt ở điểm hẹn tour',st:'utoro'},
    {t:'12:50',x:'Tour snowshoe Ngũ Hồ Shiretoko mùa đông',s:'Khoảng 4 giờ, đi trên mặt hồ đóng băng giữa rừng nguyên sinh',st:'goko'},
    {t:'17:00',x:'Nhận phòng, ngâm onsen, ăn tối ở Utoro',st:'utoro'}]},
  {id:'d21',date:'21/2',wd:'Chủ Nhật',color:'#C0613A',title:'Ice Horizon Walk, tối ở hồ Akan',who:'Cả 4 người',mode:'Khoảng 5 giờ lái xe',drive:5,night:'akan',cover:['notsuke',0],
   segs:[{pts:['utoro',[792,238],'oshin',[728,292],[655,345],'shari',[700,470],'mid','shibetsu',[1000,702],'notsuke']},{pts:['notsuke',[990,730],[900,750],'nakashibetsu',[610,822],'teshikaga',[260,884],'akan']}],
   items:[
    {t:'07:30',x:'Trả phòng, dừng nhanh ở thác Oshinkoshin đóng băng',st:'oshin'},
    {t:'08:00',x:'Lái qua Shari, đèo Konpoku, Shibetsu xuống Notsuke',s:'Khoảng 2 giờ',st:'shibetsu'},
    {t:'10:15',x:'Tới Trung tâm thiên nhiên bán đảo Notsuke',st:'notsuke'},
    {t:'10:30',x:'Tour Todowara và Ice Horizon Walk',s:'Khoảng 2 giờ, đi bộ trên vịnh đóng băng, đã gồm snowshoe',st:'notsuke'},
    {t:'12:30',x:'Ăn trưa ở trung tâm thiên nhiên',st:'notsuke'},
    {t:'13:30',x:'Lái qua Nakashibetsu tới hồ Akan',s:'Khoảng 2,5 giờ, tới trước khi trời tối',st:'nakashibetsu'},
    {t:'16:15',x:'Nhận phòng Akanko Onsen',st:'akan'},
    {t:'Tối',x:'Múa cổ Ainu ở nhà hát Ikor, rồi xem pháo hoa trên mặt hồ',s:'Pháo hoa "Fuyu Hanabi" lúc 20:00',st:'akan'}]},
  {id:'d22',date:'22/2',wd:'Thứ Hai',color:'#9277B8',title:'Hồ Akan, thủ công Ainu, bữa tối cuối ở Abashiri',who:'Cả 4 người',mode:'Khoảng 2 giờ lái xe',drive:2,night:'abashiri',cover:['akan',1],
   segs:[{pts:['akan',[260,884],'teshikaga',[310,790],[230,720],'bihoro',[215,520],[232,380],'abashiri']}],
   items:[
    {t:'08:30',x:'Lễ hội trên mặt hồ Akan đóng băng',s:'Snowmobile, câu cá wakasagi trên băng',st:'akan'},
    {t:'10:00',x:'Trải nghiệm thủ công Ainu cùng người Ainu',s:'Khắc gỗ, thêu hoa văn, chơi đàn môi mukkuri. Đặt qua "Anytime, Ainutime!", tối thiểu 2 người',st:'akan'},
    {t:'11:30',x:'Ăn trưa món Ainu ở quán Poronno, dạo Ainu Kotan',s:'Mua đồ thủ công làm quà',st:'akan'},
    {t:'13:00',x:'Trả phòng, lái về Abashiri qua đèo Bihoro',s:'Khoảng 2 giờ',st:'bihoro'},
    {t:'14:30',x:'Đèo Bihoro, ngắm hồ Kussharo đóng băng',st:'bihoro'},
    {t:'16:00',x:'Về Abashiri, đổ đầy xăng, nhận phòng',st:'abashiri'},
    {t:'17:00',x:'Trả xe ở quầy Toyota trong ga JR Abashiri',s:'Quầy đóng 17:30. Trả xe xong mới đi ăn uống',st:'abashiri'},
    {t:'18:00',x:'Bữa tối cuối: hải sản Okhotsk',s:'Gợi ý: 吉田三八商店 (hải sản giá vừa phải, cơm trứng cá hồi tràn bát), 五十集屋 (nướng than quanh bếp lò), 酒菜亭 喜八 (quán đông người địa phương, có zangi cá hồi và món cá voi). Đặt bàn trước',st:'abashiri'}]},
  {id:'d23',date:'23/2',wd:'Thứ Ba',color:'#8FB0CC',title:'Cả đoàn bay về Haneda',who:'Cả 4 người',mode:'Bus sân bay',drive:0,night:null,cover:['abashiri',1],
   segs:[{bus:1,pts:['abashiri',[232,338],'mmb']}],
   items:[
    {t:'07:00',x:'Trả phòng, ra bến bus sân bay',s:'Bus chạy theo giờ chuyến bay, khoảng 30 phút. Có thể đi taxi nếu muốn chắc ăn',st:'abashiri'},
    {t:'08:15',x:'Tới sân bay Memanbetsu, làm thủ tục',st:'mmb'},
    {t:'09:15',x:'Cả 4 người bay AirDo từ Memanbetsu về Haneda',st:'mmb'},
    {t:'11:10',x:'Tới Haneda. Trí nối chuyến về sân bay Yamaguchi Ube (UBJ)',s:'[Trí: điền giờ bay HND → UBJ]'}]}
];

/* Nơi nghỉ. Điền tên và link đặt phòng khi đã chốt. */
const STAYS = [
  {at:'abashiri',nights:['d19'],who:'Cả 4 người. Chọn khách sạn gần ga JR Abashiri',name:'',url:''},
  {at:'utoro',nights:['d20'],who:'Cả 4 người',name:'',url:''},
  {at:'akan',nights:['d21'],who:'Cả 4 người',name:'',url:''},
  {at:'abashiri',nights:['d22'],who:'Cả 4 người. Có thể đặt cùng khách sạn đêm 19/2: gần quầy trả xe, quán ăn và bus sân bay',name:'',url:''}
];

/* Những thứ cần đặt trước. Đổi done:true khi đã đặt xong. */
const BOOKINGS = [
  {x:'Vé AirDo',s:'HND 7:00 → MMB 8:45 ngày 19/2 cho Quân, Quỳnh, Cụ; MMB 9:15 → HND 11:10 ngày 23/2 cho cả 4 người',done:false},
  {x:'Vé của Trí',s:'Lượt đi tới ga JR Abashiri lúc 15:30 ngày 19/2; ngày 23/2 nối chuyến HND → UBJ sau 11:10',done:false},
  {x:'Xe thuê Toyota, quầy trong ga JR Abashiri',s:'Nhận khoảng 15:45 ngày 19/2, trả trước 17:30 ngày 22/2. Nhận và trả cùng chỗ. Lốp tuyết, 4WD. Điện thoại 0152-67-6678',done:false},
  {x:'Vé bus sân bay và vé bus tham quan 1DAY',s:'Mua vé web của Abashiri Bus cho ba người sáng 19/2',done:false},
  {x:'Tàu phá băng Aurora',s:'Chuyến 9:30 ngày 20/2, 4 người',done:false},
  {x:'Tour snowshoe Ngũ Hồ Shiretoko mùa đông',s:'12:50 ngày 20/2, tối đa 8 người',done:false},
  {x:'Tour Todowara và Ice Horizon Walk',s:'10:30 ngày 21/2, gọi 0153-82-1270',done:false},
  {x:'Vé múa cổ Ainu ở nhà hát Ikor',s:'Tối 21/2, xem lịch diễn tháng 2',done:false},
  {x:'Trải nghiệm thủ công Ainu "Anytime, Ainutime!"',s:'10:00 ngày 22/2',done:false},
  {x:'Nơi nghỉ Abashiri đêm 19/2 và 22/2',s:'Gần ga JR Abashiri, 4 người',done:false},
  {x:'Nơi nghỉ Utoro đêm 20/2',s:'4 người',done:false},
  {x:'Nơi nghỉ Akanko Onsen đêm 21/2',s:'4 người',done:false},
  {x:'Bàn ăn tối 22/2 ở Abashiri',s:'4 người, khoảng 18:00',done:false}
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
    'Khăn nhỏ cho onsen',
    'Ống kính tele nếu muốn chụp đại bàng, thiên nga']},
  {g:'Giấy tờ', items:[
    'Hộ chiếu hoặc thẻ cư trú',
    'Bằng lái hợp lệ ở Nhật (người lái xe)',
    'Tiền mặt, nhiều nơi vùng xa chỉ nhận tiền mặt',
    'Thẻ IC và thẻ tín dụng',
    'Bảo hiểm du lịch']}
];
