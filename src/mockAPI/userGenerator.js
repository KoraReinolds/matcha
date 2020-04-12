import words from './words';
import GPS from '../library/geolocation';

const manNames = JSON.parse('["Руслан","Жерар","Цефас","Осип","Харитон","Сергей","Шарль","Иосиф","Пётр","Давид","Борис","Вадим","Устин","Ираклий","Устин","Игорь","Никита","Лукиллиан","Эрик","Виталий","Аким","Борис","Шерлок","Борис","Павел","Яромир","Жигер","Жерар","Макар","Ефим","Савва","Йосып","Иосиф","Захар","Ленар","Эдуард","Шарль","Эрик","Игорь","Цицерон","Йомер","Ким","Цезарь","Павел","Михаил","Михаил","Шамиль","Даниил","Харитон","Оливер","Игнат","Чарльз","Ждан","Устин","Тарас","Семён","Казбек","Зуфар","Цезарь","Цезарь","Спартак","Йомер","Данила","Донат","Чарльз","Болеслав","Эдуард","Осип","Феликс","Харитон","Карл","Тарас","Йонас","Артём","Даниил","Цицерон","Шарль","Яков","Яков","Зиновий","Нестор","Яромир","Йомер","Устин","Лоренс","Зуфар","Юлий","Захар","Юрий","Харитон","Устин","Йозеф","Жигер","Тарас","Платон","Осип","Закир","Геннадий","Руслан"]');
const manLNames = JSON.parse('["Кличко","Силин","Кузьмин","Щукин","Алексеев","Овчаренко","Соловьёв","Антонов","Павлик","Гущин","Макаров","Павлов","Посидайло","Гриневская","Цушко","Фокин","Коваленко","Максимов","Яковенко","Лукашенко","Блохин","Денисов","Зуев","Воронцов","Федункив","Шуфрич","Исаев","Ефремов","Петровский","Родионов","Романов","Степанов","Воронов","Давыдов","Устинов","Чухрай","Савенко","Яворивский","Симоненко","Юдин","Миклашевский","Яковлев","Комаров","Смирнов","Доронин","Сасько","Батейко","Алчевский","Ткаченко","Гончар","Петрик","Максимов","Евдокимов","Пахомов","Бирюков","Марочко","Суханов","Доронин","Андрейко","Моисеев","Правый","Белов","Павлик","Кириленко","Мазайло","Щербаков","Барановский","Белоусов","Фомичёв","Алексеев","Шкраба","Колобов","Бородай","Яковенко","Шестаков","Иванов","Мамонтов","Давыдов","Беляков","Лебедев","Белов","Нестеров","Саксаганский","Осипов","Гончар","Владимиров","Рымар","Петрик","Игнатов","Некрасов","Фролов","Марочко","Недбайло","Ларионов","Медведев","Карпов","Пономарёв","Худобяк","Сергеев"]');
const womanNames = JSON.parse('["Доминика","Цвета","Ирина","Юзефа","Чилита","Федосья","Полина","Полина","Прасковья","Злата","Татьяна","Лада","Ольга","Таисия","Устинья","Жаклин","Олеся","Марта","Цветелина","Христина","Чеслава","Пелагея","Устинья","Цветелина","Прасковья","Пелагея","Шанетта","Таисия","София","Ника","Светлана","Злата","Дарья","Шанетта","Хильда","Светлана","Чара","Йосифа","Антонина","Прасковья","Цара","Элоиза","Марина","Таисия","Шушана","Лариса","Злата","Полина","Федосья","Люся","Олеся","Жасмин","Алиса","Кристина","Пелагея","Фаина","Ирина","Алина","Регина","Василиса","Светлана","Шарлота","Чара","Валерия","Нонна","Ульяна","Цветелина","Юна","Марта","Рада","Хильда","Харитина","Лариса","Юна","Гертруда","Анжелика","Алла","Гелена","Кристина","Зоя","Ирина","Ольга","Светлана","Пелагея","Кристина","Марина","Маргарита","Валентина","Елизавета","Федосья","Зинаида","Чечилия","Лидия","Георгина","Софья","Йолика","Шанетта","Цезария","Прасковья"]');
const womanLNames = JSON.parse('["Самсонова","Виноградова","Кулакова","Маслова","Чикольба","Андрейко","Блохина","Агафонова","Терентьева","Линник","Сирко","Соболева","Барановска","Пархоменко","Королёва","Тарасова","Зимина","Ковалёва","Пархоменко","Лобанова","Воронова","Гамула","Гайчук","Гуляева","Селезнёва","Никонова","Гребневска","Симоненко","Макарова","Громова","Самойлова","Кулагина","Острожска","Шарапова","Хижняк","Гуляева","Бердник","Копылова","Федункив","Фролова","Денисова","Тимошенко","Кудрявцева","Лыткина","Власова","Трофимова","Козлова","Суворова","Ермакова","Коровяк","Линник","Мирна","Евсеева","Харитонова","Белова","Гайчук","Тетерина","Белозёрова","Овчаренко","Быкова","Коновалова","Ефремова","Титова","Тарасова","Носова","Пономаренко","Федосеева","Рыбакова","Цветкова","Павленко","Кабанова","Медяник","Щербакова","Филатова","Кобзар","Сысоева","Дементьева","Хованска","Попова","Новикова","Андрейко","Ковалёва","Шумейко","Гущина","Ланова","Козлова","Кулакова","Сирко","Кобзар","Каськив","Самсонова","Гордеева","Марочко","Макарова","Владимирова","Капустина","Владимирова","Сафонова","Абрамова"]');
const newwords = words.get();
const gender = ['male', 'female', 'bisexual'];
const tags = ['football', 'TV', 'computer_games', 'poker', 'fishing', 'comics', 'work', 'food', 'rest', 'sex', 'films', 'pizza', 'talk', 'travel'];

// random value
const r = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

// returns random value from array
const rand = (arr) => arr[r(0, arr.length - 1)];

// returns new array with unique values from 'arr'
const randArr = (min, max, arr) => {
  const na = [];
  for (let i = 0; i < r(min, max); i += 1) {
    const val = rand(arr);
    if (!na.includes(val)) {
      na.push(val);
    }
  }
  return na;
};

// returns strung with values from 'arr'
const randText = (min, max, arr) => {
  let na = '';
  const n = r(min, max);
  for (let i = 0; i < n; i += 1) {
    na += (` ${rand(arr)}`);
  }
  return na;
};

// returns new array with length from 'min' to 'max' and unique values from 'minNum' to 'maxNum'
const randArrNum = (min, max, minNum, maxNum) => {
  const na = [];
  const n = r(min, max);
  for (let i = 0; i < n; i += 1) {
    const val = r(minNum, maxNum);
    if (!na.includes(val)) {
      na.push(val);
    }
  }
  return na;
};

// distance in km between two points on map
const distance = ([x, y], [ourX, ourY]) => {
  const diffX = Math.abs(ourX - x);
  const diffY = Math.abs(ourY - y);
  return Math.floor(Math.sqrt(diffX * diffX + diffY * diffY) * 100 * 111.3) / 100;
};

let likeList = [];
let visitorLikeList = [];
let historyList = [];
let visitorList = [];
const userList = [];
const chatList = {};


export default {


  async getUsers(n) {
    const myLocation = await GPS.byGPS()
      .then((loc) => [loc.x, loc.y])
      .catch(() => [55.7965312, 37.575065599999995]);
    likeList = randArrNum(1, 5, 0, n);
    visitorLikeList = randArrNum(1, 5, 0, n);
    historyList = randArrNum(1, 5, 0, n);
    visitorList = randArrNum(1, 5, 0, n);
    const tagList = {};
    let user = {};

    // generate 3 people who match each other with random messages
    for (let i = 0; i < 3; i += 1) {
      const id = r(0, n);
      likeList.push(id);
      visitorLikeList.push(id);
      const messages = [];
      for (let j = 0; j < 10; j += 1) {
        const message = {
          text: randText(1, 10, newwords),
          from: r(0, 1),
        };
        messages.push(message);
      }
      chatList[id] = {
        messages,
      };
    }
    const genereateUser = (i) => {
      const location = [
        (myLocation[0] * 10000000 - r(-2000000, 2000000)) / 10000000,
        (myLocation[1] * 10000000 - r(-2000000, 2000000)) / 10000000,
      ];
      const usertags = randArr(1, 5, tags);
      usertags.forEach((e) => {
        if (tagList[e]) tagList[e].push(i);
        else tagList[e] = [i];
      });

      const userGender = rand(gender);

      return {
        id: i,
        changes: false,
        dist: distance(myLocation, location),
        time: Date.now(),
        firstName: rand(userGender === 'male' ? manNames : womanNames),
        lastName: rand(userGender === 'male' ? manLNames : womanLNames),
        mail: `${rand(newwords).split(' ')[0]}@mail.ru`,
        age: r(18, 55),
        gender: userGender,
        preferences: randArr(1, 10, gender),
        biography: randText(1, 5, newwords),
        tags: usertags,
        pictures: [
          {
            id: i,
            main: true,
            src: `https://i.picsum.photos/id/${i}/200/300.jpg`,
          },
          {
            id: i + 1,
            main: false,
            src: `https://i.picsum.photos/id/${i + 1}/200/300.jpg`,
          },
        ],
        fameRating: r(0, 1000),
        mailConfirmed: true,
        informationFilled: true,
      };
    };

    user = genereateUser(0);
    user.location = myLocation;
    user.mailConfirmed = true;
    user.informationFilled = true;
    userList.push(user);

    for (let i = 1; i < n; i += 1) {
      userList.push(genereateUser(i));
    }
    return new Promise((resolve) => {
      // setTimeout(() => {
      resolve({
        token: 'user',
        user,
        userList,
        tagList,
        likeList,
        visitorLikeList,
        historyList,
        visitorList,
        chatList,
      });
      // }, 1000);
    });
  },

  getNotifications: () => new Promise((resolve) => {
    setTimeout(() => {
      const result = [];
      const like = [];
      const dislike = [];
      const visit = [];
      const messages = [];
      const actions = ['like', '', 'visit', 'message', '', '', '', '', '', ''];


      for (let i = 0; i < r(0, 10); i += 1) {
        const action = actions[r(0, actions.length - 1)];
        if (action === 'visit') {
          visit.push(r(0, userList.length - 1));
        } else if (action === 'dislike') {
          const index = r(0, visitorLikeList.length);
          const idArr = visitorLikeList.splice(index, 1);
          if (idArr[0]) dislike.push(idArr[0]);
          if (chatList[idArr[0]]) delete chatList[idArr[0]];
        } else if (action === 'like') {
          const id = r(1, 1000);
          if (!visitorLikeList.includes(id) && !dislike.includes(id)) {
            visitorLikeList.push(id);
            like.push(id);
          }
        } else if (action === 'message') {
          const chatUsers = Object.keys(chatList);
          if (chatUsers.length) {
            const id = chatUsers[r(0, chatUsers.length - 1)];
            messages.push({
              id,
              text: randText(10, 100, newwords),
            });
          }
        }
      }
      if (dislike.length) result.push({ status: 'dislike', who: dislike });
      if (like.length) result.push({ status: 'like', who: like });
      if (visit.length) result.push({ status: 'visit', who: visit });
      if (messages.length) result.push({ status: 'message', who: messages });
      resolve(result);
    }, 1000);
  }),
  login() { return this.getUsers(10); },
  saveChanges: () => new Promise((resolve) => {
    resolve({
      status: 'ok',
    });
  }),
  like: () => new Promise((resolve) => {
    resolve({
      status: 'ok',
    });
  }),
  ban: () => new Promise((resolve) => {
    resolve({
      status: 'ok',
    });
  }),
  block: () => new Promise((resolve) => {
    resolve({
      status: 'ok',
    });
  }),

};
