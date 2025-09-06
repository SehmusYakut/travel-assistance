import { GuideData } from '../models/types';

export const malaysiaData = {
  attractions: [
    { 
      name: "Petronas Kuleleri", 
      city: "Kuala Lumpur", 
      description: "İkonik ikiz kuleler, modern Malezya'nın simgesi. 88 katlı bu gökdelenler dünyada en yüksek ikiz kuleler.",
      location: { lat: 3.1579, lng: 101.7114 },
      visitTime: "2-3 saat",
      entryFee: "RM 85 (Skybridge + Observation Deck)",
      bestTime: "Gündoğumu ve gün batımında",
      tips: "Online rezervasyon şart. Ücretsiz fotoğraf çekimi için zemin katta KLCC Park ideal."
    },
    { 
      name: "Batu Mağaraları", 
      city: "Gombak", 
      description: "Hindu tapınağına ev sahipliği yapan kireçtaşı tepesi. 272 basamaklı merdiven ve büyüleyici mağara sistemi.",
      location: { lat: 3.2379, lng: 101.6831 },
      visitTime: "2-4 saat",
      entryFee: "Ücretsiz",
      bestTime: "Sabah erken saatler (daha az kalabalık)",
      tips: "Rahat ayakkabı giyin, su götürün. Maymunlara yiyecek vermeyin, çantanızı dikkatli tutun."
    },
    {
      name: "KLCC Suria Mall & Aquaria",
      city: "Kuala Lumpur",
      description: "Petronas altında lüks AVM ve okyanus akvaryumu. 5000+ deniz canlısı.",
      location: { lat: 3.1578, lng: 101.7123 },
      visitTime: "3-5 saat",
      entryFee: "Aquaria: RM 69 (Yetişkin)",
      bestTime: "Hafta içi öğleden sonra",
      tips: "Aquaria'da köpek balığı tüneli kaçırılmaz. AVM'de Tax Refund imkanı var."
    },
    { 
      name: "Langkawi Adası", 
      city: "Kedah", 
      description: "Duty-free ada cennet. Teleferik, orman, plajlar ve tax-free alışveriş.",
      location: { lat: 6.3521, lng: 99.8142 },
      visitTime: "3-5 gün",
      entryFee: "Ulaşım hariç ücretsiz",
      bestTime: "Aralık-Mart (kuru sezon)",
      tips: "Duty-free alkol ve çikolata alın. Teleferik için sabah erkenden gidin."
    },
    { 
      name: "George Town", 
      city: "Penang", 
      description: "UNESCO Dünya Mirası. Street art, kolonyal binalar ve lezzet cenneti.",
      location: { lat: 5.4141, lng: 100.3288 },
      visitTime: "2-3 gün",
      entryFee: "Ücretsiz (müzeler hariç)",
      bestTime: "Ekim-Mart",
      tips: "Char Kway Teow ve Cendol mutlaka deneyin. Sokak sanatı haritası edinin."
    },
    { 
      name: "Malacca (Melaka)", 
      city: "Malacca", 
      description: "Tarihi liman şehri. Hollanda mimarisi, Jonker Street gece pazarı.",
      location: { lat: 2.1896, lng: 102.2501 },
      visitTime: "1-2 gün",
      entryFee: "Çoğu yer ücretsiz",
      bestTime: "Yıl boyunca",
      tips: "Jonker Street'te cuma-pazar gece pazarına mutlaka gidin. Satay Celup deneyin."
    },
    {
      name: "Genting Highlands",
      city: "Pahang",
      description: "Bulutlar üzerindeki şehir. Casino, tema parkları ve serin hava.",
      location: { lat: 3.4227, lng: 101.7944 },
      visitTime: "1-2 gün",
      entryFee: "Aktivitelere göre değişir",
      bestTime: "Yıl boyunca (hep serin)",
      tips: "Teleferik manzarası muhteşem. Kumar yasal, sadece yabancılara açık."
    },
    { 
      name: "Cameron Highlands", 
      city: "Pahang", 
      description: "Çay tarlaları, çilek çiftlikleri ve serin iklim. BOH çay fabrikası.",
      location: { lat: 4.4702, lng: 101.3769 },
      visitTime: "2-3 gün",
      entryFee: "Tur fiyatları RM 30-100",
      bestTime: "Mart-Eylül (kuru dönem)",
      tips: "BOH çay fabrikasını ziyaret edin. Seyir terası ücretsiz, muhteşem manzara."
    },
    { 
      name: "Perhentian Adaları", 
      city: "Terengganu", 
      description: "Kristal berrak deniz, dalış ve şnorkelle yüzme cennet. Kaplumbağa gözlemi.",
      location: { lat: 5.9167, lng: 102.7333 },
      visitTime: "3-5 gün",
      entryFee: "Koruma ücreti RM 5",
      bestTime: "Mart-Eylül (muson dışı)",
      tips: "Perhentian Kecil genç-backpacker, Perhentian Besar aile dostu. ATM yok, nakit götürün."
    },
    {
      name: "Kuala Lumpur Bird Park",
      city: "Kuala Lumpur",
      description: "Dünyanın en büyük açık kuş parkı. 3000+ kuş, 200+ tür.",
      location: { lat: 3.1412, lng: 101.6865 },
      visitTime: "2-3 saat",
      entryFee: "RM 67 (Yetişkin)",
      bestTime: "Sabah 9-11 (kuşlar daha aktif)",
      tips: "Hornbill'leri kaçırmayın. Fotoğraf için sabah ışığı ideal."
    },
    {
      name: "Putrajaya",
      city: "Putrajaya",
      description: "Idari başkent. Putra Camii, gül bahçesi ve göl turları.",
      location: { lat: 2.9264, lng: 101.6964 },
      visitTime: "Yarım gün",
      entryFee: "Çoğu yer ücretsiz",
      bestTime: "Akşam üstü (aydınlatma)",
      tips: "Putra Camii pembe rengi ile ünlü. Göl turunda sunset manzarası harika."
    }
  ],
  transportation: [
    { 
      type: "Grab",
      description: "En güvenilir taksi uygulaması. Sabit fiyat, temiz araçlar.",
      tips: "GrabPay kullanın, %20 daha ucuz. Havalimanından şehre RM 15-25."
    },
    {
      type: "Touch 'n Go / MyRapid",
      description: "Şehir içi metro, otobüs ve LRT için tek kart sistemi.",
      tips: "Günlük pas alın, unlimited seyahat. KL Sentral ana merkez istasyonu."
    },
    {
      type: "KLIA Ekspres",
      description: "Havalimanından şehre hızlı tren. 28 dakikada KL Sentral'a.",
      tips: "Online alım %10 indirim. Her 15 dakikada bir sefer."
    },
    {
      type: "Intercity Bus",
      description: "Şehirlerarası otobüs. TBS (Terminal Bersepadu Selatan) ana terminal.",
      tips: "RedBus uygulamasından rezervasyon yapın. VIP otobüsler çok rahat."
    },
    {
      type: "AirAsia",
      description: "Bütçe dostu iç hat uçaklar. KL-Penang, KL-Langkawi popüler.",
      tips: "Erken rezervasyon çok ucuz. Extra bagaj önceden alın."
    },
    {
      type: "Ferries",
      description: "Penang, Langkawi ve adalara feribot seferleri.",
      tips: "Penang ferry ücretsiz (arabayla gitme), adalara advance booking gerekli."
    }
  ],
  food: [
    { 
      name: "Nasi Lemak", 
      description: "Ulusal yemek. Hindistancevizi sütlü pilav, sambal, yumurta, hamsi, yer fıstığı.",
      where: "Her yerde, en iyisi Village Park Restaurant (KL)",
      price: "RM 3-15"
    },
    { 
      name: "Char Kway Teow", 
      description: "Wok'ta kızartılmış erişte. Deniz ürünleri, soya sosu ve chili.",
      where: "Penang'ın meşhuru. George Town sokak satıcıları",
      price: "RM 5-12"
    },
    { 
      name: "Laksa", 
      description: "Baharatlı erişte çorbası. Asam laksa (ekşi) vs Curry laksa çeşitleri.",
      where: "Penang ve Sarawak'ta en iyi versiyonlar",
      price: "RM 6-15"
    },
    { 
      name: "Roti Canai", 
      description: "Hint böreği benzeri. Dhal (mercimek köri) ile servis edilir.",
      where: "Mamak stalls (24 saat açık Hint restoranları)",
      price: "RM 1.50-4"
    },
    { 
      name: "Satay", 
      description: "Şiş kebap. Tavuk, dana veya keçi eti. Fıstık ezmesi sosu ile.",
      where: "Kajang'ın Sate Kajang meşhur",
      price: "RM 0.70-1.50/çubuk"
    },
    {
      name: "Bak Kut Teh",
      description: "Domuz kaburgası çorbası. Baharat ve şifalı otlarla pişirilir.",
      where: "Klang'da orijinal versiyon. KL'de Song Kee",
      price: "RM 12-25"
    },
    {
      name: "Cendol",
      description: "Buzlu tatlı. Yeşil erişte, hindistancevizi sütü, gula melaka.",
      where: "Penang'ın Lebuh Keng Kwee'deki dükkân meşhur",
      price: "RM 3-8"
    },
    {
      name: "Durian",
      description: "Meyveler kralı ama koku çok güçlü. Musang King en kaliteli çeşit.",
      where: "SS2 Durian Street (Petaling Jaya) - gece pazarı",
      price: "RM 25-60/kg (çeşide göre)"
    },
    { 
      name: "Teh Tarik", 
      description: "Çekilmiş süt çayı. Malezya'nın milli içeceği.",
      where: "Her mamak stall'da. Old Town White Coffee zinciri",
      price: "RM 2.50-5"
    },
    {
      name: "Milo Dinosaur",
      description: "Buzlu Milo + ekstra Milo tozu üstte. Çocuksu ama lezzetli.",
      where: "Singapurlu ama Malezya'da da popüler",
      price: "RM 4-7"
    }
  ],
  tips: [
    "🏛️ **Kültür:** Malaysia 1Malaysia konsepti - Malay, Chinese, Indian kültürleri harmoni içinde.",
    "📱 **Apps:** Grab (ulaşım), Touch 'n Go eWallet (ödeme), Waze (trafik), foodpanda (yemek)",
    "🎭 **Festival:** Hari Raya (Ramazan Bayramı), Chinese New Year, Deepavali, Wesak Day",
    "🌡️ **İklim:** Yıl boyunca 25-35°C. Yağmur mevsimi Kasım-Mart (batı), Mayıs-Eylül (doğu)",
    "🏨 **Konaklama:** Hostel RM 20-50, mid-range RM 100-300, luxury RM 400+",
    "💰 **Bütçe:** Günlük RM 50-100 backpacker, RM 150-300 mid-range, RM 500+ luxury",
    "🚫 **Yasaklar:** Alkol pahalı (%300 vergi), domuz eti sadece Çin bölgelerinde",
    "📶 **İnternet:** Digi/Maxis/Celcom SIM card. Hotlink prepaid turistler için ideal",
    "🏥 **Sağlık:** Aşı gerekmiyor, tropik hastalık riski düşük, özel hastaneler kaliteli",
    "🎯 **Pazarlık:** Central Market, Petaling Street'te normal. Malls'larda sabit fiyat",
    "⚡ **Elektrik:** 240V, UK plug (Type G). Universal adaptör gerekli",
    "🚗 **Araba kiralama:** International license + pasaport. Soldan trafik (İngiliz sistemi)"
  ],
  safetyWarnings: [
    "🚨 **Dolandırıcılık:** Taksi metre açık olsun, Grab tercih edin. Bukit Bintang'da fake watch satıcıları",
    "🌧️ **Hava:** Muson mevsiminde ani sel. Hava durumu apps takip edin",
    "🦟 **Sağlık:** Dengue fever riski var, sivrisinek kovucu kullanın (DEET %30+)",
    "🌞 **Güneş:** UV index çok yüksek, SPF 50+ krem + şapka şart",
    "💸 **Para:** Ringgit (MYR) kullanılır. 1 USD ≈ 4.7 MYR. Money changer güvenilir",
    "🍖 **Gıda:** Street food genelde güvenli ama kalabalık yerleri tercih edin",
    "🚫 **Yasak maddeler:** Uyuşturucu ölüm cezası! Prescription drugs için reçete götürün",
    "🌙 **Ramadan:** Müslüman bölgelerde gündüz yemek içmek impolite olabilir",
    "👗 **Kıyafet:** Camiler/tapınaklarda kapalı giyinin. Hotpants/tankless OK ama saygılı olun",
    "🚔 **Polis:** Nerede olduğunuzu SMS ile sevdiklerinize gönderin, özellikle gece",
    "💊 **İlaç:** Prescription drugs customs'da problem yaratabilir, doktor raporu götürün",
    "🌴 **Doğa:** Jungle trekking'de guide kullanın, tek başına gitmeyin"
  ],
  usefulLinks: [
    { name: "🏛️ Malaysia Tourism Board", url: "https://www.malaysia.travel/" },
    { name: "🚇 Kuala Lumpur Metro Map", url: "https://www.mrt.com.my/" },
    { name: "✈️ Malaysia Airlines", url: "https://www.malaysiaairlines.com/" },
    { name: "🌴 Langkawi Tourism", url: "https://www.langkawi-insider.com/" },
    { name: "📋 Malaysia Visa Info", url: "https://www.imi.gov.my/portal2017/" },
    { name: "🌦️ Malaysian Weather", url: "https://www.met.gov.my/" },
    { name: "🚌 RedBus Malaysia", url: "https://www.redbus.my/" },
    { name: "🍕 FoodPanda Malaysia", url: "https://www.foodpanda.my/" },
    { name: "📱 Touch n Go eWallet", url: "https://www.touchngo.com.my/" },
    { name: "🏨 Agoda Malaysia Hotels", url: "https://www.agoda.com/country/malaysia.html" }
  ]
};

export const indonesiaData = {
  attractions: [
    { 
      name: "Bali Adası - Ubud", 
      city: "Bali", 
      description: "Hindu tapınakları, pirinç tarlaları ve spa merkezleri. Yoga ve wellness turizmi merkezi.",
      location: { lat: -8.5069, lng: 115.2625 }
    },
    { 
      name: "Borobudur Tapınağı", 
      city: "Yogyakarta", 
      description: "Dünyanın en büyük Budist tapınağı. 8. yüzyıldan kalma muhteşem taş eseri. UNESCO Dünya Mirası.",
      location: { lat: -7.6079, lng: 110.2038 }
    },
    { 
      name: "Komodo Ulusal Parkı", 
      city: "Nusa Tenggara Timur", 
      description: "Dev Komodo ejderlerinin doğal yaşam alanı. Eşsiz flora ve fauna. Dalış cennetleri.",
      location: { lat: -8.5874, lng: 119.4897 }
    },
    { 
      name: "Jakarta - Monas", 
      city: "Jakarta", 
      description: "Ulusal Anıt (Monas) ve çevresindeki tarihi bölge. Modern şehrin kalbindeki simgesel yapı.",
      location: { lat: -6.1754, lng: 106.8272 }
    },
    {
      name: "Yogyakarta Sultanlığı",
      city: "Yogyakarta",
      description: "Geleneksel Java kültürü ve sarayı. Batik sanatının merkezi. Malioboro Caddesi alışverişi.",
      location: { lat: -7.8053, lng: 110.3642 }
    },
    {
      name: "Toba Gölü",
      city: "Sumatra",
      description: "Volkanik krater gölü. Dünyanın en büyük kaldera gölü ve Samosir adası kültürü.",
      location: { lat: 2.6845, lng: 98.8756 }
    },
    {
      name: "Bromo Tengger Semeru Ulusal Parkı",
      city: "East Java",
      description: "Aktif volkan Bromo'nun muhteşem manzarası. Gündoğumu turları ve trekking.",
      location: { lat: -7.9425, lng: 112.9530 }
    },
    {
      name: "Kuta Beach & Seminyak",
      city: "Bali",
      description: "Sörf merkezi ve gece hayatı. Lüks resortlar, beach club'lar ve alışveriş.",
      location: { lat: -8.7183, lng: 115.1686 }
    },
    {
      name: "Gili Adaları",
      city: "Lombok",
      description: "3 küçük ada: Gili Trawangan, Gili Meno, Gili Air. Dalış, snorkeling ve plaj keyfi.",
      location: { lat: -8.3484, lng: 116.0417 }
    },
    {
      name: "Bandung Paris van Java",
      city: "West Java",
      description: "Serin dağ iklimi, outlet alışveriş merkezleri ve kolonyal dönem mimarisi.",
      location: { lat: -6.9147, lng: 107.6098 }
    }
  ],
  transportation: [
    { 
      type: "Gojek/Grab", 
      description: "Motosiklet taksi ve araba çağırma uygulamaları. Jakarta ve büyük şehirlerde ideal.",
      tips: "Gojek motosikletleri trafikte çok hızlı, Grab arabalar daha güvenli."
    },
    { 
      type: "TransJakarta", 
      description: "Jakarta'nın hızlı otobüs sistemi. Ekonomik ve etkili şehir içi ulaşım.",
      tips: "Akıllı kart alın, nakit kabul edilmiyor. Rush hour'dan kaçının."
    },
    { 
      type: "Kereta Api", 
      description: "Java adasında şehirlerarası tren seferleri. Jakarta-Yogyakarta-Surabaya hattı popüler.",
      tips: "Eksekutif sınıf konforludur, ekonomi sınıf kalabalık olabilir."
    },
    {
      type: "Blue Bird Taksi",
      description: "Güvenilir taksi şirketi. Metre kullanan ve lisanslı sürücüler.",
      tips: "Uygulama üzerinden çağırın, havalimanından şehir merkezine sabit tarifeler var."
    },
    {
      type: "Lion Air / Garuda Indonesia",
      description: "İç hat uçuşlar için ana havayolları. Adalar arası ulaşım için ideal.",
      tips: "Bagaj ağırlık limitlerine dikkat edin, Lion Air'de ek ücretli."
    },
    {
      type: "Bemos (Angkot)",
      description: "Paylaşımlı minibüsler, yerel ulaşım aracı. Bali ve diğer adalarda yaygın.",
      tips: "Fiyat pazarlık ediliyor, turistler için biraz pahalı olabilir."
    }
  ],
  food: [
    { name: "Nasi Goreng", description: "Endonezya'nın milli yemeği. Baharatlı kızarmış pirinç, yumurta ve et/tavuk ile." },
    { name: "Rendang", description: "Padang mutfağından, hindistan cevizi sütü ve baharat karışımıyla pişirilen et yemeği." },
    { name: "Sate (Satay)", description: "Şişte ızgara et parçaları. Fıstık soslu (sate ayam) veya soya soslu çeşitleri." },
    { name: "Gado-Gado", description: "Fıstık soslu karışık sebze salatası. Vegan dostu geleneksel lezzet." },
    { name: "Bakso", description: "Köfte çorbası. Sokak lezzeti, her köşede bulabilirsiniz." },
    { name: "Gudeg", description: "Yogyakarta'nın özel yemeği. Genç jackfruit ile yapılan tatlı yemek." },
    { name: "Martabak", description: "Tatlı ve tuzlu çeşitleri olan gözleme benzeri. Gece atıştırmalığı." },
    { name: "Es Teler", description: "Taze meyvalarla yapılan buzlu tatlı. Tropikal lezzetler." },
    { name: "Teh Botol / Es Tea", description: "Şişede çay ve buzlu çay. Her yerde bulabileceğiniz ferahlatıcı içecek." },
    { name: "Kopi Luwak", description: "Dünyanın en pahalı kahvesi. Civetten hayvanının sindirim sisteminden geçen kahve." }
  ],
  tips: [
    "Bahasa Indonesia'da temel kelimeler öğrenin: Terima kasih (teşekkürler), Maaf (özür dilerim).",
    "Gojek ve Grab uygulamalarını indirin, ulaşım ve yemek siparişi için vazgeçilmez.",
    "Ramadan ayında lokantaların çoğu gündüz kapalı, iftar sonrası açılır.",
    "Endonezya saati GMT+7 (Java, Sumatra), GMT+8 (Bali, Lombok), GMT+9 (doğu adalar).",
    "Vize: 30 günlük vize muafiyeti var, pasaportunuz en az 6 ay geçerli olmalı.",
    "Islak mendil ve tuvalet kağıdı her zaman yanınızda bulundurun.",
    "Pazarlık yapmak normal, özellikle geleneksel pazarlarda fiyatın %30-50'sine kadar indirilebilir.",
    "Bayramlar: Lebaran (Ramazan Bayramı) en büyük bayram, her şey 2-3 gün kapalı.",
    "Endonezya'da 17.000+ ada var, her adanın kendine özgü kültürü ve lezzeti mevcut.",
    "Tropikal iklim: Yıl boyunca sıcak ve nemli, yağmur mevsimi Ekim-Nisan arası."
  ],
  safetyWarnings: [
    "Volkanik aktivitelere karşı tetikte olun, özellikle Bromo, Merapi, Krakatau çevresinde.",
    "Jakarta'da trafik çok yoğun, yol alma süreleri uzun olabilir, zaman planlayın.",
    "Bali'de alkol pahalıdır, yerel alkol (arak) riskli olabilir, markalı içecek tercih edin.",
    "Su sporları ve dalışta lisanslı operatörleri tercih edin, ekipman kontrolü yaptırın.",
    "Yağmur mevsiminde (Ekim-Nisan) sel ve heyelan riski, hava durumu takip edin.",
    "Rupiah (IDR) kullanılır, 1 USD = ~15.000 IDR, küçük banknotlar bulundurun.",
    "Petty theft (küçük hırsızlık) turist bölgelerinde yaygın, değerli eşyalarınızı güvende tutun.",
    "Güneş çok güçlü, SPF 30+ güneş kremi kullanın, saat 11-15 arası gölgede kalın.",
    "Mabet ve cami ziyaretlerinde kapalı kıyafet giyin, özellikle omuz ve diz kapalı olmalı.",
    "Seyahat sigortası mutlaka yaptırın, özellikle dalış ve volcano trekking için kapsamlı olsun.",
    "Sahte alkol ve uyuşturucu konusunda çok dikkatli olun, ceza çok ağır (ölüm cezası dahi var).",
    "Gece geç saatlerde yalnız dolaşmayın, özellikle tenha sokaklarda ve plajlarda."
  ],
  usefulLinks: [
    { name: "Endonezya Turizm Bakanlığı", url: "https://www.indonesia.travel/" },
    { name: "Bali Resmi Turizm", url: "https://www.balitourismboard.org/" },
    { name: "Jakarta Ulaşım Haritası", url: "https://transjakarta.busway.co.id/" },
    { name: "Garuda Indonesia Havayolları", url: "https://www.garuda-indonesia.com/" },
    { name: "Yogyakarta Turizm Rehberi", url: "https://visitingjogja.com/" },
    { name: "Komodo Ulusal Parkı", url: "https://www.komodonationalpark.org/" },
    { name: "Gojek Uygulaması", url: "https://www.gojek.com/" },
    { name: "Grab Uygulaması", url: "https://www.grab.com/id/" }
  ]
};

export const guideData: GuideData = {
  malaysia: malaysiaData,
  indonesia: indonesiaData
};
