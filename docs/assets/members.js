const members = [
  ['曾怡蓁','master',''],['馬慶蓉','master',''],['Yoseph Leonardo Samodra','research','Postdoc 2024'],
  ['黃映潔','master',''],['翁咏聖 Yong-Sheng Wong','master',''],['謝昇諺','master',''],
  ['劉耀臨','doctoral',''],['林靜 Jing Lin','doctoral',''],['朱柏威 Po-Wei Chu','doctoral',''],
  ['伍倢瑩 Jenny Wu','research','MSc 2015'],['趙臨梅 April Meirie Hill','research','MSc 2023'],['劉柏辰 Ed Liu','research','MSc 2020'],
  ['陳奕欣 Yi-Hsin Chen','former',''],['邱柏豪 Po-Hao Chiu','former',''],['張姿苒 Stephanie Zhang','former',''],
  ['王敬中','former',''],['林昊璇 Hao-Hsuan Olivia Lin','former',''],['羅苡晅 Yi-Hsuan Lo','former',''],
  ['江翊潔 Jessie Chiang','former',''],['顏佳瑩 Chia-Ying Yen','former',''],['胡亭宇','former',''],
  ['呂方雯 Fang-Wen Nora Lu','former','MSc 2022'],['林子祐 Tzu-You Lin','former','MSc 2022'],
  ['藍之辰 Chih-Chan Jessica Lan','former','MSc 2022'],['賴思騰 Winston Lie','former','MSc 2022'],
  ['施承妤 Cheng-Yu Shih','former','MSc 2022'],['沈秉杰 Bing-Jie Shen','former','PhD 2021'],
  ['黃佳琪 Chia-Chi Huang','former','MPH 2021'],['沈怡伶 Yi-ling Shen','former','MSc 2020'],
  ['曾皓楷 Kai Tseng','former','RA 2020'],['楊博傑','former','PostDoc'],['楊芷其 Chih-Chi Yang','former','MSc 2019'],
  ['劉澄杰 Jerry Liu','former','MSc 2019'],['廖佑荏 Yotie Liao','former','MSc 2019'],
  ['曹宇翔 Ian Tsao','former','MSc 2019'],['陳鳳君 Fengchun Chen','former','MSc 2019'],
  ['盧靖宜 Tiffany Lu','former','MSc 2019'],['黃佳馨 Luna Huang','former','MPH 2019'],
  ['歐以利 Elias F. Onyoh','former','PhD 2018'],['羅偉成 Nicholas Lo','former','PhD 2018'],
  ['柯尊皓 Bryant Ko','former','MSc 2018'],['施昀汝 Yun Ju Shih','former','MSc 2017'],
  ['王稚慧 Chih-Hui Wang','former','MSc 2016'],['Jessica Tsay','former',''],
  ['江宜庭 Yi-Ting Chiang','former',''],['陳建州 Joe Chen','former',''],['陳姿婷 Tzu-Ting Chen','former',''],
  ['吳昀麇 Lulu','former',''],['賴亭君 Lai Ting-chun','former','MSc'],['施威利 Willy Shih','former','MSc 2015'],
  ['傅涵 Helen Han Fu','former','MSc 2014'],['辜鉅璋 Chu-Chang Ku','former','MSc 2014']
];

const photos = ['01.jpg','02.jpg','03.jpg','','05.jpg','06.jpg','07.jpg','08.jpg','09.jpg','10.jpg','11.jpg','12.jpg'];

const grid = document.querySelector('#member-grid');
const photoRoot = 'assets/members/';

function renderMembers(filter = 'all') {
  const visible = members.map((member, index) => ({ member, index })).filter(({ member }) => filter === 'all' || member[1] === filter);
  grid.innerHTML = visible.map(({ member: [name, category, meta], index }) => `
    <article class="member-card" data-category="${category}">
      <div class="member-photo">${photos[index] ? `<img src="${photoRoot}${photos[index]}" alt="${name}" loading="lazy">` : `<span>${name.trim().slice(0, 1)}</span>`}</div>
      <h2>${name}</h2>
      <p>${meta || ({research:'Research staff',master:'Master student',doctoral:'Doctoral student',former:'Former member'})[category]}</p>
    </article>`).join('');
}

document.querySelectorAll('[data-member-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-member-filter]').forEach(item => item.classList.toggle('active', item === button));
  renderMembers(button.dataset.memberFilter);
}));

renderMembers();
