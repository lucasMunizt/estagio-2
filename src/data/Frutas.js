 const frutas = [
    {
      id: 1,
      nome: "Maçã",
      sobre: "Fruta doce e crocante, muito consumida fresca.",
      kcal: Math.floor(Math.random() * 100) + 50, // kcal aleatório entre 50 e 150
      peso: Math.floor(Math.random() * 100) + 100, // peso aleatório entre 100g e 200g
    },
    {
      id: 2,
      nome: "Banana",
      sobre: "Fonte de potássio e energia rápida.",
      kcal: Math.floor(Math.random() * 100) + 80, // kcal aleatório entre 80 e 180
      peso: Math.floor(Math.random() * 50) + 100, // peso aleatório entre 100g e 150g
    },
    {
      id: 3,
      nome: "Laranja",
      sobre: "Rica em vitamina C, muito consumida em sucos.",
      kcal: Math.floor(Math.random() * 100) + 40, // kcal aleatório entre 40 e 140
      peso: Math.floor(Math.random() * 100) + 120, // peso aleatório entre 120g e 220g
    },
    {
      id: 4,
      nome: "Manga",
      sobre: "Fruta tropical doce, ótima para sobremesas.",
      kcal: Math.floor(Math.random() * 100) + 60, // kcal aleatório entre 60 e 160
      peso: Math.floor(Math.random() * 100) + 200, // peso aleatório entre 200g e 300g
    },
    {
      id: 5,
      nome: "Abacaxi",
      sobre: "Fruta tropical ácida e refrescante.",
      kcal: Math.floor(Math.random() * 100) + 40, // kcal aleatório entre 40 e 140
      peso: Math.floor(Math.random() * 300) + 800, // peso aleatório entre 800g e 1100g
    },
    {
      id: 6,
      nome: "Morango",
      sobre: "Fruta pequena e doce, rica em antioxidantes.",
      kcal: Math.floor(Math.random() * 50) + 30, // kcal aleatório entre 30 e 80
      peso: Math.floor(Math.random() * 20) + 50, // peso aleatório entre 50g e 70g
    },
    {
      id: 7,
      nome: "Uva",
      sobre: "Frutas pequenas e doces, consumidas frescas ou em sucos.",
      kcal: Math.floor(Math.random() * 60) + 50, // kcal aleatório entre 50 e 110
      peso: Math.floor(Math.random() * 50) + 100, // peso aleatório entre 100g e 150g
    },
    {
      id: 8,
      nome: "Pera",
      sobre: "Fruta suave e doce, geralmente consumida fresca.",
      kcal: Math.floor(Math.random() * 90) + 50, // kcal aleatório entre 50 e 140
      peso: Math.floor(Math.random() * 100) + 150, // peso aleatório entre 150g e 250g
    },
    {
      id: 9,
      nome: "Melancia",
      sobre: "Fruta grande, doce e refrescante, com alto teor de água.",
      kcal: Math.floor(Math.random() * 30) + 30, // kcal aleatório entre 30 e 60
      peso: Math.floor(Math.random() * 2000) + 4000, // peso aleatório entre 4000g e 6000g
    },
    {
      id: 10,
      nome: "Limão",
      sobre: "Fruta ácida, rica em vitamina C, muito usada em sucos e temperos.",
      kcal: Math.floor(Math.random() * 50) + 20, // kcal aleatório entre 20 e 70
      peso: Math.floor(Math.random() * 50) + 100, // peso aleatório entre 100g e 150g
    },
    {
      id: 11,
      nome: "Mamão",
      sobre: "Fruta tropical doce e macia, excelente para o sistema digestivo.",
      kcal: Math.floor(Math.random() * 80) + 50, // kcal aleatório entre 50 e 130
      peso: Math.floor(Math.random() * 300) + 500, // peso aleatório entre 500g e 800g
    },
    {
      id: 12,
      nome: "Cereja",
      sobre: "Frutas pequenas e doces, usadas em sobremesas e geleias.",
      kcal: Math.floor(Math.random() * 60) + 40, // kcal aleatório entre 40 e 100
      peso: Math.floor(Math.random() * 10) + 5, // peso aleatório entre 5g e 15g
    },
    {
      id: 13,
      nome: "Pêssego",
      sobre: "Fruta macia e doce, muito apreciada no verão.",
      kcal: Math.floor(Math.random() * 70) + 40, // kcal aleatório entre 40 e 110
      peso: Math.floor(Math.random() * 100) + 120, // peso aleatório entre 120g e 220g
    },
    {
      id: 14,
      nome: "Abacate",
      sobre: "Fruta rica em gorduras saudáveis, ótima para saladas.",
      kcal: Math.floor(Math.random() * 150) + 150, // kcal aleatório entre 150 e 300
      peso: Math.floor(Math.random() * 200) + 250, // peso aleatório entre 250g e 450g
    },
    {
      id: 15,
      nome: "Kiwi",
      sobre: "Fruta exótica, rica em vitamina C e fibras.",
      kcal: Math.floor(Math.random() * 60) + 50, // kcal aleatório entre 50 e 110
      peso: Math.floor(Math.random() * 30) + 50, // peso aleatório entre 50g e 80g
    },
    {
      id: 16,
      nome: "Coco",
      sobre: "Fruta tropical rica em água e gordura saudável.",
      kcal: Math.floor(Math.random() * 150) + 100, // kcal aleatório entre 100 e 250
      peso: Math.floor(Math.random() * 500) + 800, // peso aleatório entre 800g e 1300g
    },
    {
      id: 17,
      nome: "Ameixa",
      sobre: "Fruta doce e levemente ácida, conhecida por suas propriedades digestivas.",
      kcal: Math.floor(Math.random() * 70) + 30, // kcal aleatório entre 30 e 100
      peso: Math.floor(Math.random() * 50) + 70, // peso aleatório entre 70g e 120g
    },
    {
      id: 18,
      nome: "Goiaba",
      sobre: "Fruta tropical rica em vitamina C e fibras.",
      kcal: Math.floor(Math.random() * 80) + 40, // kcal aleatório entre 40 e 120
      peso: Math.floor(Math.random() * 100) + 200, // peso aleatório entre 200g e 300g
    },
    {
      id: 19,
      nome: "Melão",
      sobre: "Fruta refrescante e doce, com alto teor de água.",
      kcal: Math.floor(Math.random() * 50) + 30, // kcal aleatório entre 30 e 80
      peso: Math.floor(Math.random() * 500) + 1500, // peso aleatório entre 1500g e 2000g
    },
    {
      id: 20,
      nome: "Maracujá",
      sobre: "Fruta ácida e aromática, muito usada em sucos e doces.",
      kcal: Math.floor(Math.random() * 40) + 30, // kcal aleatório entre 30 e 70
      peso: Math.floor(Math.random() * 30) + 50, // peso aleatório entre 50g e 80g
    },
  ];
  export default frutas
  