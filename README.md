[ReadMe.md](https://github.com/user-attachments/files/28178490/ReadMe.md)
**FiguVerse - Kurgusal Karakter E-Ticaret Platformu**

- Live Demo (https://img.shields.io/badge/Canl%C4%B1_Siteye_Git-2ea44f?style=for-the-badge&logo=vercel), (https://d2phkhmjeklllt.cloudfront.net/products)
- AWS (https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
- Terraform (https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
- React (https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- Node.js (https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

FiguVerse, kurgusal karakterlerin (figür, aksesuar vb.) satıldığı, bulut tabanlı ve modern mimari prensipleriyle tasarlanmış bir e-ticaret platformudur. Bu proje, yapay zeka araçlarının (Claude, OpenAI) yazılım yaşam döngüsüne (tasarım, kodlama, altyapı kurulumu) entegre edilmesiyle hayata geçirilmiştir.

**Proje Özeti ve Senaryo**

FiguVerse, normal günlerde ortalama 100 kullanıcıya hizmet verirken, her hafta düzenlenen "Çılgın Cuma" etkinlikleri kapsamında Cuma günleri 08:30 - 10:00 saatleri arasında anlık 10.000 kullanıcı trafiğine maruz kalmaktadır. Ayrıca platform, popülerliği sebebiyle sürekli siber saldırı altındadır.

Bu zorlu senaryoyu yönetebilmek için:

\- Anlık trafik artışlarını karşılayacak Otomatik Ölçeklendirme (Auto-Scaling) mekanizmaları,

\- Hızlı sepet işlemleri için Redis tabanlı In-Memory Caching,

\- Saldırıları savuşturmak için AWS WAF (Web Application Firewall) kullanılarak sağlam bir bulut altyapısı (AWS + Terraform) inşa edilmiştir.

**Teknoloji Altyapısı**

Proje uçtan uca modern teknolojiler barındırmaktadır:

**Frontend**

\- React 18 & Vite:Hızlı geliştirme ve optimize edilmiş build süreci.

\- Tailwind CSS: Responsive ve modern arayüz tasarımı.

\- Zustand: Redux'a alternatif, hafif ve hızlı global state (auth, cart) yönetimi.

\- Hosting: AWS S3 + CloudFront (CDN) ile globalde düşük gecikmeli statik yayın.

**Backend**

\- Node.js & Express.js: RESTful API sunucusu.

\- PostgreSQL (AWS RDS): Kullanıcı, ürün ve sipariş verileri için ilişkisel veritabanı.

\- Redis (AWS ElastiCache): Yüksek trafiğe dayanıklı, 7 gün TTL'li sepet yönetimi.

\- Container: Docker (Multi-stage build ile optimize edilmiş imajlar).

**DevOps & Cloud (AWS)**

\- Infrastructure as Code (IaC): Tüm AWS altyapısı Terraform ile kodlanmıştır.

\- Orkestrasyon: AWS ECS Fargate (Serverless Container).

\- Yük Dengeleme: Application Load Balancer (ALB).

\- Güvenlik: AWS WAF, IAM Rolleri, AWS Secrets Manager.

\- CI/CD: GitHub Actions ile Full-Otomatize deployment (Frontend S3'e, Backend ECR ve ECS'e).

**Mühendislik ve Tasarım Prensipleri**

Proje, akademik ve endüstriyel standartlar göz önünde bulundurularak geliştirilmiştir:

\- Mimari Uyum (Katmanlı Mimari): Backend tarafında Route -> Controller -> Service -> Repository katmanları kesin çizgilerle ayrılmıştır. Veritabanı işlemleri Repository'de, iş mantığı Service katmanında izole edilmiştir.

\- SOLID Prensipleri:

\- Single Responsibility (SRP):Her sınıf ve fonksiyon tek bir iş yapar (Örn: Sepet hesaplamaları ile veritabanı kayıt işlemleri ayrı servislerdedir).

\- Dependency Inversion (DIP): Controller'lar servisleri, servisler repoları kullanır, sıkı bağ (tight coupling) engellenmiştir.

\- Clean Code & Okunabilirlik: Anlamlı isimlendirmeler, sihirli rakamlardan (magic numbers) kaçınma, modüler fonksiyonlar ve erken dönüş (early return) prensipleri uygulanmıştır.

\- Test Edilebilirlik: İş mantığının (Services) HTTP isteklerinden (Controllers) bağımsız olması sayesinde, Express request/response objelerini mocklamaya gerek kalmadan iş kuralları kolayca birim (unit) testlerine tabi tutulabilir formattadır.

**Kullanılan Yapay Zeka Araçları**

Geliştirme sürecinde yapay zeka bir "asistan" değil, bir "çift programlama (pair programming)" partneri olarak kullanılmıştır:

\- Claude: Mimari kararların alınması, Terraform scriptlerinin (IaC) yazılması, AWS bileşenleri (VPC, ECS, ALB) arasındaki ağ iletişiminin (Security Groups) tasarlanması.

\- OpenAI (ChatGPT/Open Code): Backend katmanlı mimarisinin (Repository/Service pattern) kurgulanması, SOLID prensiplerine uygun refactoring işlemleri, karmaşık SQL sorguları ve Frontend tarafında Zustand entegrasyonu.

\- GitHub Copilot:Günlük kod yazımında, tekrar eden boilerplate kodların üretilmesinde ve anlık regex oluşturmalarında zaman tasarrufu sağlamak için kullanıldı.

**Karşılaşılan Zorluklar ve Çözümler**

**1\.** "Çılgın Cuma" Trafik Sıçraması (100 -> 10.000 Kullanıcı):

\- Zorluk: Cuma sabahları anlık trafik artışı veritabanını kilitliyor ve sunucuları çökertiyordu.

\- Çözüm: AWS ECS üzerinde CPU metriklerine bağlı \*\*Auto-Scaling (2'den 10 Task'a)\*\* yapılandırıldı. Okuma/yazma yükünü azaltmak için kullanıcı sepetleri PostgreSQL yerine \*\*Redis (ElastiCache)\*\* üzerinde tutuldu.

**2\.** Sürekli Siber Saldırılar:

\- **Zorluk:** Site popülerliğinden ötürü DDoS, SQL Injection ve XSS saldırılarına maruz kalıyordu.

\- **Çözüm:** Sistemin önüne AWS WAF (Web Application Firewall) konumlandırıldı. İstek sınırlandırması (Rate Limiting) ve zararlı payload engelleme kuralları eklendi. Backend tarafında Route parametreleri validasyondan geçirildi.

**3\.** Yapay Zeka Halüsinasyonları (AI Hallucinations):

\- **Zorluk:** YZ'nin ürettiği Terraform kodlarında versiyon uyuşmazlıkları ve birbirine uymayan AWS politikaları ortaya çıktı.

\- **Çözüm:** YZ çıktıları doğrudan kopyalanmamış, resmi AWS ve Terraform dökümantasyonları üzerinden çapraz doğrulama (cross-validation) yapılarak entegre edilmiştir.

**Çıktı Kontrol Metodolojisi**

Yapay zekanın ürettiği kodların kalitesi ve doğruluğu şu adımlarla kontrol edilmiştir:

1\. Lokal İzolasyon: Kodlar önce Docker Compose ile ayağa kalkan lokal izole ortamda test edilmiştir.

2\. Statik Kod Analizi: ESLint kuralları ile kodun Clean Code standartlarına uygunluğu denetlenmiştir.

3\. CI/CD Güvenlik Ağları: GitHub Actions pipeline'ı üzerine, kod derlenmeden önce çalışan kontrol mekanizmaları (Linting, Build check) kurulmuştur. Hatalı bir YZ kodu üretim ortamına (production) asla sızamamaktadır.

**Kullanım Kılavuzu**

Canlı Ortam (Son Kullanıcı İçin)

Platforma doğrudan tarayıcınız üzerinden erişebilirsiniz: https://d2phkhmjeklllt.cloudfront.net/products

1\. Sağ üstten \*\*Giriş Yap / Kayıt Ol\*\* adımını tamamlayın.

2\. Filtreleme seçeneklerini (Kategori, Evren) kullanarak karakterleri keşfedin.

3\. Beğendiğiniz ürünleri sepete ekleyin ve miktarını güncelleyin.

4\. Sepet sayfasından siparişinizi tamamlayın.

**Geliştirici Ortamı (Lokal Kurulum)**

Projeyi kendi bilgisayarınızda çalıştırmak için Docker'ın kurulu olması yeterlidir: Docker Compose ile tüm altyapıyı (Frontend, Backend, DB, Redis) ayağa kaldırın docker compose up -d

Başlangıç verilerini (Admin hesabı ve Kategoriler) veritabanına yükleyin docker compose run --rm seed

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- _Lokal Test Admin Bilgileri:_ (Eğer seed edildiyse) admin@figuverse.com / admin123
