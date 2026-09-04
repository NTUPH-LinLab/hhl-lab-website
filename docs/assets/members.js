const members = [
  ['曾怡蓁','master',''],['馬慶蓉','master',''],['Yoseph Leonardo Samodra','former','Postdoc 2024'],
  ['黃映潔','master',''],['翁咏聖 Yong-Sheng Wong','master',''],['謝昇諺','master',''],
  ['劉耀臨','doctoral',''],['林靜 Jing Lin','doctoral',''],['朱柏威 Po-Wei Chu','doctoral',''],
  ['伍倢瑩 Jenny Wu','research','MSc 2015'],['趙臨梅 April Meirie Hill','research','MSc 2023'],['劉柏辰 Ed Liu','research','MSc 2020'],
  ['陳奕欣 Yi-Hsin Chen','former',''],['邱柏豪 Po-Hao Chiu','research',''],['張姿苒 Stephanie Zhang','former',''],
  ['王敬中','research',''],['林昊璇 Hao-Hsuan Olivia Lin','former',''],['羅苡晅 Yi-Hsuan Lo','former',''],
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

const photoByName = {
  '曾怡蓁':'01.jpg','馬慶蓉':'02.jpg','Yoseph Leonardo Samodra':'03.jpg','黃映潔':'04.jpg',
  '翁咏聖 Yong-Sheng Wong':'05.jpg','謝昇諺':'06.jpg','陳奕欣 Yi-Hsin Chen':'07.jpg','邱柏豪 Po-Hao Chiu':'08.jpg',
  '劉耀臨':'09.jpg','林靜 Jing Lin':'10.jpg','張姿苒 Stephanie Zhang':'11.jpg','王敬中':'12.jpg',
  '林昊璇 Hao-Hsuan Olivia Lin':'13.jpg','羅苡晅 Yi-Hsuan Lo':'14.jpg','江翊潔 Jessie Chiang':'15.jpg',
  '顏佳瑩 Chia-Ying Yen':'16.jpg','胡亭宇':'17.jpg','朱柏威 Po-Wei Chu':'18.jpg','伍倢瑩 Jenny Wu':'19.jpg',
  '趙臨梅 April Meirie Hill':'20.jpg','呂方雯 Fang-Wen Nora Lu':'21.jpg','林子祐 Tzu-You Lin':'22.jpg',
  '藍之辰 Chih-Chan Jessica Lan':'23.jpg','賴思騰 Winston Lie':'24.jpg','施承妤 Cheng-Yu Shih':'25.jpg',
  '沈秉杰 Bing-Jie Shen':'26.jpg','黃佳琪 Chia-Chi Huang':'27.jpg','劉柏辰 Ed Liu':'28.jpg',
  '沈怡伶 Yi-ling Shen':'29.jpg','曾皓楷 Kai Tseng':'30.jpg','楊博傑':'31.jpg','楊芷其 Chih-Chi Yang':'32.jpg',
  '劉澄杰 Jerry Liu':'33.jpg','廖佑荏 Yotie Liao':'34.jpg','曹宇翔 Ian Tsao':'35.jpg',
  '陳鳳君 Fengchun Chen':'36.jpg','盧靖宜 Tiffany Lu':'37.jpg','黃佳馨 Luna Huang':'38.jpg',
  '歐以利 Elias F. Onyoh':'39.jpg','羅偉成 Nicholas Lo':'40.jpg','柯尊皓 Bryant Ko':'41.jpg',
  '施昀汝 Yun Ju Shih':'42.jpg','王稚慧 Chih-Hui Wang':'43.jpg','Jessica Tsay':'44.jpg',
  '江宜庭 Yi-Ting Chiang':'45.jpg','陳建州 Joe Chen':'46.jpg','陳姿婷 Tzu-Ting Chen':'47.jpg',
  '吳昀麇 Lulu':'48.jpg','賴亭君 Lai Ting-chun':'49.jpg','施威利 Willy Shih':'50.jpg',
  '傅涵 Helen Han Fu':'51.jpg','辜鉅璋 Chu-Chang Ku':'52.jpg'
};

const grid = document.querySelector('#member-grid');
const photoRoot = 'assets/members/';
const dialog = document.querySelector('#member-dialog');
const normalizeName = name => name.replace(/\s+/g, ' ').trim();
let memberDetails = new Map();

function openMember(name, meta) {
  const detail = memberDetails.get(normalizeName(name));
  if (!detail || !dialog) return;
  dialog.querySelector('img').src = `${photoRoot}${photoByName[name]}`;
  dialog.querySelector('img').alt = name;
  dialog.querySelector('#member-dialog-title').textContent = name;
  dialog.querySelector('.dialog-meta').textContent = meta;
  const description = dialog.querySelector('.dialog-description');
  const detailLines = detail.split('\n');
  if (normalizeName(detailLines[0] || '') === normalizeName(name)) detailLines.shift();
  description.replaceChildren(...detailLines.join('\n').split(/\n\s*\n/).filter(Boolean).map(text => {
    const paragraph = document.createElement('p');
    paragraph.textContent = text.trim();
    return paragraph;
  }));
  dialog.showModal();
}

function renderMembers(filter = 'all') {
  const visible = members.filter(member => filter === 'all' || member[1] === filter);
  grid.innerHTML = visible.map(([name, category, meta]) => `
    <article class="member-card" data-category="${category}">
      <div class="member-photo">${photoByName[name] ? `<img src="${photoRoot}${photoByName[name]}" alt="${name}" loading="lazy">` : `<span>${name.trim().slice(0, 1)}</span>`}</div>
      <h2>${name}</h2>
      <p>${meta || ({research:'Research staff',master:'Master student',doctoral:'Doctoral student',former:'Former member'})[category]}</p>
      ${memberDetails.has(normalizeName(name)) ? `<button type="button" class="member-info" data-member-name="${name}">See Info <span aria-hidden="true">→</span></button>` : ''}
    </article>`).join('');
  grid.querySelectorAll('.member-info').forEach(button => button.addEventListener('click', () => {
    const member = members.find(([name]) => name === button.dataset.memberName);
    if (member) openMember(member[0], member[2]);
  }));
}

document.querySelectorAll('[data-member-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-member-filter]').forEach(item => item.classList.toggle('active', item === button));
  renderMembers(button.dataset.memberFilter);
}));

dialog?.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

fetch('assets/member-details.json')
  .then(response => response.json())
  .then(records => {
    memberDetails = new Map(records.filter(record => record.detail).map(record => [normalizeName(record.name), record.detail]));
    renderMembers();
  })
  .catch(() => renderMembers());
