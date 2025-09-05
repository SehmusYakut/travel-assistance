import { GuideData } from '../models/types';

export const malaysiaData = {
  attractions: [
  { name: "Petronas Kuleleri", city: "Kuala Lumpur", description: "İkonik ikiz kuleler, modern Malezya'nın simgesi. 88 katlı bu gökdelenler dünyada en yüksek ikiz kuleler olarak bilinir.", location: { lat: 3.1579, lng: 101.7114 }, transport: "Kuala Lumpur şehir merkezinden LRT ile KLCC istasyonunda inip kısa bir yürüyüşle ulaşabilirsiniz.", mapUrl: "https://www.google.com/maps?q=3.1579,101.7114" },
  { name: "Batu Mağaraları", city: "Gombak", description: "Hindu tapınağına ev sahipliği yapan kireçtaşı tepesi. 272 basamaklı merdiven ve büyüleyici mağara sistemi.", location: { lat: 3.2379, lng: 101.6831 }, transport: "Kuala Lumpur'dan KTM Komuter trenine binip Batu Caves istasyonunda inebilirsiniz.", mapUrl: "https://www.google.com/maps?q=3.2379,101.6831" },
  { name: "Langkawi Adası", city: "Kedah", description: "Harika plajları, doğal güzellikleri ve duty-free alışveriş imkanlarıyla ünlü tropikal ada.", location: { lat: 6.3521, lng: 99.8142 }, transport: "Kuala Lumpur'dan uçakla Langkawi Uluslararası Havalimanı'na ulaşabilirsiniz.", mapUrl: "https://www.google.com/maps?q=6.3521,99.8142" },
  { name: "George Town", city: "Penang", description: "UNESCO Dünya Mirası olan tarihi şehir merkezi. Kolonyal mimarisi ve sokak sanatıyla ünlü.", location: { lat: 5.4141, lng: 100.3288 }, transport: "Kuala Lumpur'dan Penang'a uçak veya otobüsle gidebilirsiniz. Şehir içi ulaşım için bisiklet ve otobüsler kullanılabilir.", mapUrl: "https://www.google.com/maps?q=5.4141,100.3288" },
  { name: "Malacca (Melaka)", city: "Malacca", description: "Tarihi ticaret liman şehri. Çok kültürlü mirasıyla UNESCO Dünya Mirası listesinde.", location: { lat: 2.1896, lng: 102.2501 }, transport: "Kuala Lumpur'dan Melaka'ya otobüsle yaklaşık 2 saatlik bir yolculukla ulaşabilirsiniz.", mapUrl: "https://www.google.com/maps?q=2.1896,102.2501" },
  { name: "Kinabalu Dağı", city: "Sabah", description: "Güneydoğu Asya'nın en yüksek zirvelerinden biri. Doğa yürüyüşü ve tırmanış için ideal.", location: { lat: 6.0754, lng: 116.5582 }, transport: "Kota Kinabalu'dan otobüs veya tur ile Kinabalu Milli Parkı'na ulaşabilirsiniz.", mapUrl: "https://www.google.com/maps?q=6.0754,116.5582" },
  { name: "Cameron Highlands", city: "Pahang", description: "Serin iklimi, çay tarlaları ve doğal yürüyüş parkurlarıyla ünlü yayla bölgesi.", location: { lat: 4.4702, lng: 101.3769 }, transport: "Kuala Lumpur'dan otobüsle Tanah Rata'ya ulaşabilirsiniz.", mapUrl: "https://www.google.com/maps?q=4.4702,101.3769" },
  { name: "Perhentian Adaları", city: "Terengganu", description: "Dalış ve şnorkelle yüzme için mükemmel berrak denizler ve beyaz kumlu plajlar.", location: { lat: 5.9167, lng: 102.7333 }, transport: "Kuala Lumpur'dan otobüsle Kuala Besut'a, oradan feribotla adalara geçebilirsiniz.", mapUrl: "https://www.google.com/maps?q=5.9167,102.7333" },
  { name: "Kuala Lumpur Bird Park", city: "Kuala Lumpur", description: "Dünyanın en büyük açık kuş parkı. 200'den fazla kuş türü barındırır.", location: { lat: 3.1412, lng: 101.6865 }, transport: "Kuala Lumpur şehir merkezinden taksi veya Grab ile kolayca ulaşabilirsiniz.", mapUrl: "https://www.google.com/maps?q=3.1412,101.6865" },
  { name: "Putrajaya", city: "Putrajaya", description: "Modern Malezya'nın idari başkenti. Göl kenarı parkları, camiler ve mimari harikalar.", location: { lat: 2.9264, lng: 101.6964 }, transport: "Kuala Lumpur'dan KLIA Transit trenine binip Putrajaya/Cyberjaya istasyonunda inebilirsiniz.", mapUrl: "https://www.google.com/maps?q=2.9264,101.6964" }
  ],
  food: [
    { name: "Nasi Lemak", description: "Hindistancevizi sütüyle pişmiş pilav, sambal, yumurta, yer fıstığı ve hamsiyle servis edilir. Malezya'nın ulusal yemeği." },
    { name: "Satay", description: "Izgara et şişleri, yer fıstığı sosuyla birlikte sunulur." },
    { name: "Laksa", description: "Baharatlı erişte çorbası, genellikle deniz ürünleri veya tavukla hazırlanır." },
    { name: "Roti Canai", description: "Hint mutfağından etkilenmiş, çıtır ve katmanlı bir ekmek. Köri ile servis edilir." },
    { name: "Teh Tarik", description: "Çekilmiş çay ve süt karışımı, Malezya'nın geleneksel içeceği." }
  ],
  tips: [
    "Grab uygulaması ile uygun fiyatlı ve güvenli ulaşım sağlayabilirsiniz.",
    "Alışverişte pazarlık yapmak yaygındır, özellikle sokak pazarlarında.",
    "Yerel festivalleri takip edin: Hari Raya, Çin Yeni Yılı, Deepavali gibi etkinlikler renkli ve eğlencelidir.",
    "Muson mevsiminde (Kasım-Mart) doğa aktiviteleri için plan yaparken hava durumunu kontrol edin.",
    "Tapınak ve cami ziyaretlerinde uygun kıyafet giyinmeye özen gösterin.",
    "Malezya'da elektrik prizleri İngiliz tipi (G) kullanılır, adaptör bulundurmak faydalı olur.",
    "Sağlık için musluk suyu yerine şişelenmiş su tercih edin."
  ],
  safetyWarnings: [
    "Taksilerde taksimetrenin açıldığından emin olun veya Grab gibi uygulamaları kullanın.",
    "Kalabalık turistik yerlerde yankesicilere dikkat edin.",
    "Muson mevsiminde (Kasım-Mart) ani yağışlara hazırlıklı olun.",
    "Güçlü güneş ışınlarından korunmak için güneş kremi kullanın.",
    "Yerel para birimi Ringgit (MYR) kullanılır, döviz büroları güvenilir yerlerdir.",
    "Tropikal bölgelerde sivrisineklerden korunmak için böcek kovucu kullanın.",
    "Gece geç saatlerde tenha bölgelerden kaçının, özellikle büyük şehirlerde."
  ],
  usefulLinks: [
    { name: "Malezya Turizm Ofisi", url: "https://www.malaysia.travel/" },
    { name: "Kuala Lumpur Metro Haritası", url: "https://www.mrt.com.my/" },
    { name: "Langkawi Gezi Rehberi", url: "https://www.langkawi-insider.com/" },
    { name: "Malezya Vize Bilgileri", url: "https://www.malaysia.gov.my/portal/content/30114" }
  ]
};

export const indonesiaData = {
  attractions: [
    { 
      name: "Bali Adası", 
      city: "Bali", 
      description: "Hindu tapınakları, pirinç tarlaları ve muhteşem plajlarıyla ünlü tropikal cennet." 
    },
    { 
      name: "Borobudur Tapınağı", 
      city: "Yogyakarta", 
      description: "Dünyanın en büyük Budist tapınağı. 8. yüzyıldan kalma muhteşem taş eseri." 
    },
    { 
      name: "Komodo Ulusal Parkı", 
      city: "Nusa Tenggara Timur", 
      description: "Dev Komodo ejderlerinin doğal yaşam alanı. Eşsiz flora ve fauna." 
    },
    { 
      name: "Yogyakarta", 
      city: "Java", 
      description: "Kültür ve sanat merkezi. Geleneksel Java sarayları ve batik sanatının kalbi." 
    },
    { 
      name: "Toba Gölü", 
      city: "Sumatra", 
      description: "Volkanik krater gölü. Dünyanın en büyük kaldera gölü ve Samosir adası." 
    }
  ],
  safetyWarnings: [
    "Volkanik aktivitelere karşı tetikte olun ve resmi uyarıları takip edin.",
    "Trafik yoğun olabilir, özellikle büyük şehirlerde dikkatli olun.",
    "Su sporlarında ve dalgıçlıkta güvenlik kurallarına uyun.",
    "Yağmur mevsiminde (Ekim-Nisan) sel ve heyelan riski artabilir.",
    "Yerel para birimi Rupiah (IDR) kullanılır, küçük banknotlar bulundurun.",
    "Seyahat sigortası yaptırmayı unutmayın, özellikle macera aktiviteleri için."
  ]
};

export const guideData: GuideData = {
  malaysia: malaysiaData,
  indonesia: indonesiaData
};
