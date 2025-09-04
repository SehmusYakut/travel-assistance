import { GuideData } from '../models/types';

export const malaysiaData = {
  attractions: [
    { 
      name: "Petronas Kuleleri", 
      city: "Kuala Lumpur", 
      description: "İkonik ikiz kuleler, modern Malezya'nın simgesi. 88 katlı bu gökdelenler dünyada en yüksek ikiz kuleler olarak bilinir." 
    },
    { 
      name: "Batu Mağaraları", 
      city: "Gombak", 
      description: "Hindu tapınağına ev sahipliği yapan kireçtaşı tepesi. 272 basamaklı merdiven ve büyüleyici mağara sistemi." 
    },
    { 
      name: "Langkawi Adası", 
      city: "Kedah", 
      description: "Harika plajları, doğal güzellikleri ve duty-free alışveriş imkanlarıyla ünlü tropikal ada." 
    },
    { 
      name: "George Town", 
      city: "Penang", 
      description: "UNESCO Dünya Mirası olan tarihi şehir merkezi. Kolonyal mimarisi ve sokak sanatıyla ünlü." 
    },
    { 
      name: "Malacca (Melaka)", 
      city: "Malacca", 
      description: "Tarihi ticaret liman şehri. Çok kültürlü mirasıyla UNESCO Dünya Mirası listesinde." 
    }
  ],
  safetyWarnings: [
    "Taksilerde taksimetrenin açıldığından emin olun veya Grab gibi uygulamaları kullanın.",
    "Kalabalık turistik yerlerde yankesicilere dikkat edin.",
    "Muson mevsiminde (Kasım-Mart) ani yağışlara hazırlıklı olun.",
    "Güçlü güneş ışınlarından korunmak için güneş kremi kullanın.",
    "Yerel para birimi Ringgit (MYR) kullanılır, döviz büroları güvenilir yerlerdir."
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
