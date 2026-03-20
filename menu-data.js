const MENU_DATA = {
  "restaurant": {
    "name": "Aroma Café",
    "logo": "https://via.placeholder.com/80x80/c8a96e/ffffff?text=AC",
    "tagline": "Lezzet & Keyif",
    "address": "İstanbul, Türkiye",
    "phone": "+90 212 000 00 00",
    "hours": "08:00 - 23:00"
  },
  "categories": [
    { "id": "sicak-icecekler", "name": "Sıcak İçecekler", "icon": "☕" },
    { "id": "soguk-icecekler", "name": "Soğuk İçecekler", "icon": "🧋" },
    { "id": "kahvalti",        "name": "Kahvaltı",        "icon": "🍳" },
    { "id": "tatlilar",        "name": "Tatlılar",        "icon": "🍰" },
    { "id": "sandvicler",      "name": "Sandviçler",      "icon": "🥪" },
    { "id": "salatalar",       "name": "Salatalar",       "icon": "🥗" }
  ],
  "items": [
    { "id": 1,  "category": "sicak-icecekler", "name": "Espresso",        "description": "Yoğun aromalı, tek shot İtalyan usulü espresso",                          "price": 45,  "image": "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80", "badge": "Popüler"     },
    { "id": 2,  "category": "sicak-icecekler", "name": "Cappuccino",       "description": "Espresso, buharda ısıtılmış süt ve köpüklü süt katmanları",               "price": 65,  "image": "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80", "badge": null          },
    { "id": 3,  "category": "sicak-icecekler", "name": "Latte",            "description": "Espresso ve bol sütlü, kadifemsi köpüklü içecek",                         "price": 70,  "image": "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400&q=80", "badge": null          },
    { "id": 4,  "category": "sicak-icecekler", "name": "Türk Kahvesi",     "description": "Geleneksel Türk usulü, cezve de pişirilmiş köpüklü kahve",                "price": 50,  "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80", "badge": "Klasik"      },
    { "id": 5,  "category": "sicak-icecekler", "name": "Chai Latte",       "description": "Tarçın ve baharatlı çay ile hazırlanan sıcak içecek",                     "price": 75,  "image": "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&q=80", "badge": null          },
    { "id": 6,  "category": "soguk-icecekler", "name": "Cold Brew",        "description": "12 saat soğuk demlenmiş, yumuşak aromalı filtre kahve",                  "price": 80,  "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80", "badge": "Yeni"        },
    { "id": 7,  "category": "soguk-icecekler", "name": "Iced Latte",       "description": "Buzlu espresso ve soğuk süt karışımı",                                   "price": 75,  "image": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80", "badge": null          },
    { "id": 8,  "category": "soguk-icecekler", "name": "Mango Smoothie",   "description": "Taze mango, yoğurt ve bal ile hazırlanan smoothie",                      "price": 85,  "image": "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80", "badge": "Popüler"     },
    { "id": 9,  "category": "soguk-icecekler", "name": "Limonata",         "description": "Taze sıkılmış limon, nane ve soda ile ferahlatıcı içecek",               "price": 55,  "image": "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80", "badge": null          },
    { "id": 10, "category": "kahvalti",        "name": "Serpme Kahvaltı",  "description": "Peynir çeşitleri, zeytin, domates, salatalık ve ekmek",                  "price": 180, "image": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80", "badge": "Özel"        },
    { "id": 11, "category": "kahvalti",        "name": "Avokado Toast",    "description": "Tam tahıllı ekmek üzerinde ezilmiş avokado ve poşe yumurta",             "price": 120, "image": "https://images.unsplash.com/photo-1603046891744-1f057ef03f4d?w=400&q=80", "badge": null          },
    { "id": 12, "category": "kahvalti",        "name": "Menemen",          "description": "Domates, biber ve yumurta ile hazırlanan geleneksel Türk kahvaltısı",    "price": 95,  "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80", "badge": "Klasik"      },
    { "id": 13, "category": "tatlilar",        "name": "Cheesecake",       "description": "Ev yapımı New York tarzı cheesecake, mevsim meyveleri ile",              "price": 110, "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80", "badge": "Popüler"     },
    { "id": 14, "category": "tatlilar",        "name": "Brownie",          "description": "Çikolatalı, yoğun ve nemli brownie, vanilyalı dondurma ile",             "price": 90,  "image": "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&q=80", "badge": null          },
    { "id": 15, "category": "tatlilar",        "name": "Tiramisu",         "description": "İtalyan usulü mascarpone ve espresso ile hazırlanan tatlı",              "price": 105, "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80", "badge": "Şef Önerisi" },
    { "id": 16, "category": "sandvicler",      "name": "Club Sandwich",    "description": "Tavuk, marul, domates, turşu ve özel sos ile üç katlı sandviç",         "price": 130, "image": "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=400&q=80", "badge": null          },
    { "id": 17, "category": "sandvicler",      "name": "Tost",             "description": "Kaşar peyniri ve sucuk ile hazırlanan çıtır tost",                       "price": 75,  "image": "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&q=80", "badge": "Klasik"      },
    { "id": 18, "category": "salatalar",       "name": "Sezar Salata",     "description": "Marul, kruton, parmesan ve sezar sos ile taze salata",                  "price": 115, "image": "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80", "badge": null          },
    { "id": 19, "category": "salatalar",       "name": "Akdeniz Salata",   "description": "Domates, salatalık, zeytin, feta peyniri ve zeytinyağı",                 "price": 100, "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80", "badge": "Popüler"     }
  ]
};
