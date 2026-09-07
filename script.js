/* EVENT SETTINGS — edit these dates and links without touching the animations. */
const eventSettings = {
  nikkahAt: '2026-09-25T19:00:00+05:00',
  venueUrl: 'https://www.google.com/search?q=iqbal+marquee+address&ludocid=15321858878210199577',
};
// Local background audio starts only after a guest taps.
const translations = {
  en: {
    invitationLine: 'You are invited to celebrate with us', littleSecret: 'A LITTLE SECRET', nikkahCardTitle: 'Nikkah Invitation', songTitle: 'Our celebration song', youtubeLink: 'Open song on YouTube ↗', closeSong: 'Close song player',
    invited: 'YOU’RE INVITED', openingTitle: 'Let the celebrations begin.', open: 'Tap to play the dhol',
    skip: 'Open without music', musicOff: 'Music off', musicOn: 'Music on',
    groom: 'Ali Sufian', bride: 'Hamna Ansari', and: '&', mehndiEvent: 'Mehndi Celebration', date: '25 September 2026',
    cloudTitle: 'We have a surprise for you…', tapReveal: 'Tap to reveal ✨', surpriseHeading: 'A LITTLE MORE TO CELEBRATE',
    nikkahTitle: 'It’s our Nikkah too!', nikkahInvite: 'Join us as we begin our forever.', nikkahTime: 'Nikkah · 7:00 PM',
    venue: 'Iqbal Marquee', address: '6F2H+64X Water Works, Road, Qila Kuhna Qasim Bagh, Multan, Pakistan', theEvening: 'THE EVENING', timings: 'A night to remember',
    six: '6 PM', sixThirty: '6:30 PM', seven: '7 PM', eight: '8 PM', nine: '9 PM', ten: '10 PM', toConfirm: 'To confirm',
    welcome: 'Welcome', nikkah: 'Nikkah', mehndi: 'Mehndi', dinner: 'Dinner', timingNote: '6 PM & 10 PM details to follow · Pakistan time',
    directions: 'Get directions ↗', counting: 'COUNTING THE MOMENTS', countdownTitle: 'Until our forever begins',
    days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds', celebrate: 'Our celebration has begun!', calendar: 'Save the date',
    withLove: 'WITH LOVE', family: 'Find us & get in touch', ajaz: 'Ajaz Ansari', faraz: 'Faraz Ansari',
    closing: 'We can’t wait to see you.', replay: 'Play the welcome again', countdownLabel: 'Time until Nikkah', scrollLabel: 'Scroll to event timings'
  },
  ur: {
    invitationLine: 'ہماری خوشیوں میں شرکت کی دعوت قبول کریں', littleSecret: 'ایک چھوٹا سا راز', nikkahCardTitle: 'دعوتِ نکاح', songTitle: 'ہماری خوشیوں کا گیت', youtubeLink: 'یوٹیوب پر گانا سنیں ↗', closeSong: 'گانے کا پلیئر بند کریں',
    invited: 'آپ کو محبت بھری دعوت', openingTitle: 'آئیے، خوشیاں منائیں', open: 'ڈھول کی تھاپ پر آغاز کریں',
    skip: 'موسیقی کے بغیر کھولیں', musicOff: 'گانا سنیں', musicOn: 'گانا بند کریں',
    groom: 'علی سفیان', bride: 'حمنہ انصاری', and: 'اور', mehndiEvent: 'رسمِ مہندی', date: '۲۵ ستمبر ۲۰۲۶',
    cloudTitle: 'آپ کے لیے ایک سرپرائز ہے…', tapReveal: 'جاننے کے لیے چھوئیں ✨', surpriseHeading: 'ایک اور خوش خبری',
    nikkahTitle: 'ہمارا نکاح بھی ہے!', nikkahInvite: 'ہماری نئی زندگی کے آغاز پر شریک ہوں۔', nikkahTime: 'نکاح · شام ۷ بجے',
    venue: 'اقبال مارکی', address: '6F2H+64X واٹر ورکس روڈ، قلعہ کہنہ قاسم باغ، ملتان، پاکستان', theEvening: 'تقریب کی تفصیلات', timings: 'ایک یادگار شام',
    six: 'شام ۶', sixThirty: 'شام ۶:۳۰', seven: 'شام ۷', eight: 'رات ۸', nine: 'رات ۹', ten: 'رات ۱۰', toConfirm: 'تفصیل جلد',
    welcome: 'استقبال', nikkah: 'نکاح', mehndi: 'مہندی', dinner: 'عشائیہ', timingNote: '۶ اور ۱۰ بجے کی تفصیل جلد · پاکستان کا مقامی وقت',
    directions: 'راستہ دیکھیں ↗', counting: 'خوشیوں کا انتظار', countdownTitle: 'ہماری نئی زندگی کے آغاز تک',
    days: 'دن', hours: 'گھنٹے', minutes: 'منٹ', seconds: 'سیکنڈ', celebrate: 'ہماری خوشیوں کی شام شروع ہو گئی!', calendar: 'کیلنڈر میں محفوظ کریں',
    withLove: 'محبت کے ساتھ', family: 'مقام اور رابطہ', ajaz: 'اعجاز انصاری', faraz: 'ڈاکٹر عبداللہ محمد',
    closing: 'آپ کی آمد کے منتظر', replay: 'استقبال دوبارہ دیکھیں', countdownLabel: 'نکاح شروع ہونے میں باقی وقت', scrollLabel: 'تقریب کے اوقات دیکھیں'
  }
};
const $ = selector => document.querySelector(selector);
const songPlayer = $('#background-music');
const cover = $('#cover');
const main = $('#invitation');
let language = 'en';
let opening = false;
let musicWanted = false;
let openTimer;
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateSoundLabel() {
  const playing = !songPlayer.paused;
  const label = $('#music-toggle [data-text]');
  label.dataset.text = playing ? 'musicOn' : 'musicOff';
  label.textContent = translations[language][label.dataset.text];
  $('#music-toggle').setAttribute('aria-pressed', String(playing));
  $('#music-toggle').setAttribute('aria-label', translations[language][playing ? 'musicOn' : 'musicOff']);
}
function setLanguage(next) {
  language = next;
  document.documentElement.lang = next;
  document.documentElement.dir = next === 'ur' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-text]').forEach(el => { el.textContent = translations[next][el.dataset.text]; });
  document.querySelectorAll('[data-language]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.language === next)));
  $('#open').setAttribute('aria-label', translations[next].open);
  $('.scroll-cue').setAttribute('aria-label', translations[next].scrollLabel);
  updateSoundLabel();
}
async function setMusic(enabled) {
  musicWanted = enabled;
  if (enabled) {
    songPlayer.volume = .65;
    try { await songPlayer.play(); } catch { musicWanted = false; }
  } else { songPlayer.pause(); }
  updateSoundLabel();
}
['play','pause','error'].forEach(event => songPlayer.addEventListener(event, updateSoundLabel));
function openCard(withMusic = true) {
  if (opening) return;
  opening = true;
  if (withMusic) setMusic(true); else setMusic(false);
  cover.classList.add('opening');
  openTimer = setTimeout(() => {
    cover.classList.add('opened');
    main.inert = false;
    document.body.style.overflow = '';
    main.setAttribute('tabindex', '-1');
    main.focus({ preventScroll: true });
  }, reducedMotion() ? 0 : 2100);
}
document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
$('#music-toggle').addEventListener('click', () => setMusic(songPlayer.paused));
$('#open').addEventListener('click', () => openCard(true));
$('#skip').addEventListener('click', () => openCard(false));
$('#replay').addEventListener('click', () => {
  clearTimeout(openTimer); opening = false;
  cover.classList.remove('opening', 'opened'); main.inert = true;
  setMusic(false); document.body.style.overflow = 'hidden';
  window.scrollTo({ top:0, behavior:'instant' }); $('#open').focus();
});
$('#venue-link').href = eventSettings.venueUrl;
document.body.style.overflow = 'hidden';
setLanguage('en');

// Animate each hand as it reaches the reader. Hands remain visible if motion is unavailable.
const timelineItems = [...document.querySelectorAll('.time-row li')];

if ('IntersectionObserver' in window) {
  const itemObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = timelineItems.indexOf(entry.target);
      const fromSide = index % 2 === 0 ? '-105%' : '105%';
      entry.target.classList.add('is-visible');
      entry.target.animate([
        { opacity: 0, transform: `translateX(${fromSide}) rotate(${index % 2 === 0 ? '-3deg' : '3deg'})`, filter: 'blur(3px)' },
        { opacity: 1, transform: 'translateX(0) rotate(0)', filter: 'blur(0)' }
      ], { duration: 1750, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' });
      itemObserver.unobserve(entry.target);
    }
  }), { threshold: .08, rootMargin: '0px 0px -4% 0px' });
  timelineItems.forEach(item => itemObserver.observe(item));
} else {
  timelineItems.forEach(item => item.classList.add('is-visible'));
}
