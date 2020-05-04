require('dotenv').config()

module.exports = {

    head: {
      title: 'ELP',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '{{ escape description }}' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/elp.ico' }
      ]
    },

    loading: { color: '#3B8070' },
  
    
    buildModules: [
      '@nuxtjs/axios',
      ['@nuxtjs/vuetify', {  
        icons: {
          iconfont: 'mdi', 
        }
      }]
    ],

    axios: {
        baseURL: process.env.API_URL,
    },

    modules: [
      [
        'nuxt-i18n',
         {  vueI18nLoader: true }
      ]
    ],

    i18n: {
    locales: ['en', 'ru', 'fi'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          "signin": "Log In",
          "email": "E-mail",
          "password": "Password",

          "no-records": "No Records",
          "no-files": "No images",
          "create": "Create",
          "update": "Update",
          "add": "Add",
          "cancel": "Cancel",
          "actions": "Actions",
            "text": "Text",
            "icon": "Icon",
            "text-req": "Text is a required field",
            "text-max": "Text field is very large",
            "icon-req": "Icon is a required field",
            "icon-max": "Icon field is very large",

            "title": "Title",
            "text-req": "Title is a required field",
            "text-max": "Title field is very large",

            "images": "Images",
            "imgs-req": "Add images",
            "imgs-qua": "Number of images must be less than 15",
            "imgs-size": "Image size must be less than 3 MB",
            "img-form": "Images must be in JPEG, PNG, BMP, GIF or SVG format",

            "description": "Description",
            "cost": "Cost",
            "categories": "Categories",
            "desc-req": "Description is a required field",
            "desc-max": "Description field is very large",
            "cost-req": "Cost is a required field",
            "cost-max": "Cost field is very large",

            "name": "Name",
            "phone": "Phone number",
            "comment": "Comment",
            "send": "Send",
            "name-req": "Name is a required field",
            "name-max": "Name field is very large",
            "phone-max": "Phone number field is very large",
            "email-max": "Email field is very large",
            "email-correct": "Invalid email",
            "comment-req": "Comment is a required field",
            "comment-max": "Comment field is very large",
            "contacts": "Contacts",
            "order": "Order",
            "date": "Date",
            "remove": "Remove", 

            "review": "Review",
            "review-req": "Review is a required field",
            "review-max": "Review field is very large",

            "add-adv": "Add benefit record",
            "add-item": "Add entry to price list",
            "add-cat": "Add category to price list",
            "add-port": "Add portfolio entry",
            "add-review": "Add a review",
            "links": "Quick links",

            "subtitle": "Subtitle",
            "about": "Text about",
            "map": "Map",
            "save": "Save",
            "subtitle-max": "Subtitle field is very large",
            "about-max": "Text field is very large",
            "url": "URL is very large",
            "map-max": "Map field is very large",

            "add-main-img": "Add main image"



        },
        ru: {
          "signin": "Войти",
          "email": "Электронная почта",
          "password": "Пароль",

          "no-records": "Нет записей",
          "no-files": "Изображений нет",
          "create": "Создать",
          "update": "Обновить",
          "add": "Добавить",
          "cancel": "Отмена",
          "actions": "Действия",
            "text": "Текст",
            "icon": "Значек",
            "text-req": "Описание - обязательное поле",
            "text-max": "Описание слишком большое",
            "icon-req": "Значек - обязательное поле",
            "icon-max": 'Поле "Значек" слишком длинное',

            "title": "Название",
            "text-req": "Название - обязательное поле",
            "text-max": "Название слишком большое",

            "images": "Изображения",
            "imgs-req": "Добавьте изображения",
            "imgs-qua": "Количество изображений должно быть менее 15",
            "imgs-size": "Размер изображения должен быть менее 3 МБ",
            "img-form": "Изображения должны быть в формате JPEG, PNG, BMP, GIF или SVG",

            "description": "Описание",
            "cost": "Цена",
            "categories": "Категории",
            "desc-req": "Описание - обязательное поле",
            "desc-max": "Описание слишком большое",
            "cost-req": "Цена - обязательное поле",
            "cost-max": "Цена слишком большая",

            "name": "Имя",
            "phone": "Номер телефона",
            "comment": "Комментарий",
            "send": "Отправить",
            "name-req": "Имя - обязательное поле",
            "name-max": "Имя слишком большое",
            "phone-max": "Номер телефона слишком большой",
            "email-max": "Адрес электронной почты очень большой",
            "email-correct": "Некорректный адрес электронной почты",
            "comment-req": "Комментарий - обязательное поле",
            "comment-max": "Комментарий слишком большой",
            "contacts": "Контакты",
            "order": "Заявка",
            "date": "Дата",
            "remove": "Удалить",

            "review": "Отзыв",
            "review-req": "Отзыв - обязательное поле",
            "review-max": "Отзыв слишком большой",

            "add-adv": "Добавить запись о преимуществах",
            "add-item": "Добавить запись в прайслист",
            "add-cat": "Добавить категорию в прайслист",
            "add-port": "Добавить запись в портфолио",
            "add-rev": "Добавить отзыв",
            "links": "Быстрые ссылки",

            "subtitle": "Подзаголовок",
            "about": "Об организации",
            "map": "Карта",
            "save": "Сохранить",
            "subtitle-max": "Подзаголовок слишком большой",
            "about-max": "Текст об организации слишком большой",
            "url": "URL слишком длинный",
            "map-max": "Поле карта слишком большое",

            "add-main-img": "Добавить главное изображение"


        },
        fi: {
          "signin": "Kirjaudu",
          "email": "Sähköposti",
          "password": "Salasana",

          "no-records": "Ei levyä",
          "no-files": "Ei kuvia",
          "create": "Luo",
          "update": "Päivitys",
          "add": "Lisää",
          "cancel": "Peruuttaa",
          "actions": "Toiminnot",
            "text": "Teksti",
            "icon": "Kuvake",
            "text-req": "Teksti on pakollinen kenttä",
            "text-max": "Tekstikenttä on erittäin suuri",
            "icon-req": "Kuvake on pakollinen kenttä",
            "icon-max": "Kuvake on erittäin suuri",

            "title": "Otsikko",
            "text-req": "Otsikko on pakollinen kenttä",
            "text-max": "Otsikko on erittäin suuri",

            "images": "Kuvien",
            "imgs-req": "Lisää kuvien",
            "imgs-qua": "Kuvien lukumäärän on oltava alle 15",
            "imgs-size": "Kuvan koon on oltava alle 3 Mt",
            "imgs-form": "Kuvien on oltava JPEG-, PNG-, BMP-, GIF- tai SVG-muodossa",

            "description": "Kuvaus",
            "cost": "Kustannus",
            "categories": "Luokat",
            "desc-req": "Kuvaus on pakollinen kenttä",
            "desc-max": "Kuvaus on erittäin suuri",
            "cost-req": "Kustannus on pakollinen kenttä",
            "cost-max": "Kustannus on erittäin suuri",

            "name": "Nimi",
            "phone": "Puhelinnumero",
            "comment": "Kommentti",
            "send": "Lähetä",
            "name-req": "Nimi on pakollinen kenttä",
            "name-max": "Nimi on erittäin suuri",
            "phone-max": "Puhelinnumero on erittäin suuri",
            "email-max": "Sähköpostikenttä on erittäin suuri",
            "email-correct": "Virheellinen sähköposti",
            "comment-req": "Kommentti on pakollinen kenttä",
            "comment-max": "Kommentti on erittäin suuri",
            "contacts": "Yhteystiedot",
            "order": "Tilaus",
            "date": "Päivämäärä",
            "remove": "Poistaa", 

            "review": "Arvostelu",
            "review-req": "Arvostelu on pakollinen kenttä",
            "review-max": "Arvostelu on erittäin suuri",

            "add-adv": "Lisää etuustiedot",
            "add-item": "Lisää merkintä hinnastoon",
            "add-cat":  "Lisää luokka hinnastoon",
            "add-port": "Lisää portfolio-merkintä",
            "add-rev": "Lisää arvostelu",
            "links": "Pikalinkit",

            "subtitle": "Tekstitys",
            "about": "Organisaatiosta",
            "map": "Kartta",
            "save": "Tallenna",
            "subtitle-max": "Tekstitys on erittäin suuri",
            "about-max": "Tekstikenttä on erittäin suuri",
            "url": "URL on erittäin suuri",
            "map-max": "Karttakenttä on erittäin suuri",

            "add-main-img": "Lisää pääkuva"



        }
      }
    }
  }
}