# GitHub'a Yeni Repo Olarak Yükleme Rehberi

## Seçenek 1: Yeni Repo Oluşturma (travel-assistance)

### Adım 1: GitHub'da Yeni Repo Oluşturun

1. https://github.com/new adresine gidin
2. **Repository name:** `travel-assistance`
3. **Description:** "A comprehensive travel assistance web application with multi-language support (English, Turkish, Kurdish)"
4. **Public** seçin (veya Private)
5. **"Add .gitignore"** ve **"Add README"** seçeneklerini SEÇMEYİN (zaten var)
6. **"Create repository"** tıklayın

### Adım 2: Remote URL'i Değiştirin

PowerShell veya Terminal'de şu komutları çalıştırın:

```bash
# Mevcut klasöre gidin
cd c:\Users\sehmu\OneDrive\Desktop\TravelAssistance\gezgin-rehberi

# Eski remote'u kaldırın
git remote remove origin

# Yeni remote ekleyin (YourUsername yerine GitHub kullanıcı adınızı yazın)
git remote add origin https://github.com/SehmusYakut/travel-assistance.git

# Branch adını kontrol edin
git branch -M main

# Push yapın
git push -u origin main
```

### Adım 3: GitHub Repo Ayarlarını Yapın

1. GitHub repo sayfasına gidin
2. **Settings > General** kısmından:
   - **Website** kısmına Netlify URL'inizi ekleyin
   - **Topics** ekleyin: `travel`, `nextjs`, `typescript`, `maps`, `multilingual`, `kurdish`

## Seçenek 2: Mevcut Repo'yu Kullanma (gezgin-rehberi)

Değişiklikler zaten push edildi! ✅

https://github.com/SehmusYakut/gezgin-rehberi

### İsteğe Bağlı: Repo Adını Değiştirme

GitHub'da repo adını değiştirmek isterseniz:

1. Repo sayfasına gidin: https://github.com/SehmusYakut/gezgin-rehberi
2. **Settings** tıklayın
3. **General** bölümünde **Repository name** kısmını bulun
4. `travel-assistance` yazın
5. **Rename** tıklayın

## Seçenek 3: Projeyi Klonlayıp Yeni Repo Oluşturma

Tamamen yeni bir başlangıç isterseniz:

```bash
# Yeni bir klasöre klonlayın
cd c:\Users\sehmu\OneDrive\Desktop
git clone https://github.com/SehmusYakut/gezgin-rehberi.git travel-assistance
cd travel-assistance

# .git klasörünü silin (git geçmişini temizler)
Remove-Item -Recurse -Force .git

# Yeni git repo başlatın
git init
git add .
git commit -m "Initial commit: Travel Assistance app with multi-language support"

# GitHub'da yeni repo oluşturduktan sonra
git remote add origin https://github.com/SehmusYakut/travel-assistance.git
git branch -M main
git push -u origin main
```

## Netlify'a Deploy Etme

Repo hazır olduktan sonra:

1. https://app.netlify.com/ adresine gidin
2. **"Add new site"** > **"Import an existing project"**
3. **GitHub** seçin
4. `travel-assistance` (veya `gezgin-rehberi`) repo'sunu seçin
5. Environment variable ekleyin:
   - **Key:** `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - **Value:** Your Google Maps API key
6. **Deploy** tıklayın

## Sonraki Adımlar

- [ ] GitHub repo description güncelle
- [ ] README'deki badge'leri ekle (build status, license, etc.)
- [ ] GitHub Topics ekle
- [ ] Netlify'a deploy et
- [ ] Google Maps API key'i production domain ile kısıtla
- [ ] README'ye demo link ekle

---

**Not:** Bu dosyayı projenizden silebilirsiniz, sadece referans için oluşturuldu.
