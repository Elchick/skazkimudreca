const stories={forest:{title:'Лес, который помнил звёзды',text:'Когда в лесу погасла последняя звезда, маленький фонарь Люм отправился искать её среди старых сосен. Ветки тихо шептали ему дорогу, а мох под ногами светился, будто помнил каждый добрый сон.'},whale:{title:'Кит, который собирал сны',text:'Высоко над облаками плыл небесный кит. Каждую ночь он собирал забытые сны и бережно складывал их в серебряные раковины, чтобы утром вернуть тем, кто особенно нуждался в чуде.'},house:{title:'Дом на краю вечернего неба',text:'На самой дальней тропинке стоял дом с одним тёплым окном. Оно светилось для всех, кто задержался в пути, и обещало: здесь тебя ждут, здесь можно согреться и никуда не спешить.'}};
const toast=document.querySelector('.player-toast');const toastTitle=toast.querySelector('p');let activeButton=null;
function stopStory(){speechSynthesis.cancel();if(activeButton){activeButton.classList.remove('playing');activeButton.querySelector('span').textContent='▶';activeButton=null}toast.classList.remove('show')}
document.querySelectorAll('.play').forEach(button=>button.addEventListener('click',()=>{const card=button.closest('[data-story]');const story=stories[card.dataset.story];if(activeButton===button){stopStory();return}stopStory();const utterance=new SpeechSynthesisUtterance(story.text);utterance.lang='ru-RU';utterance.rate=.82;utterance.pitch=.92;utterance.volume=1;utterance.onend=stopStory;utterance.onerror=stopStory;activeButton=button;button.classList.add('playing');button.querySelector('span').textContent='Ⅱ';toastTitle.textContent=story.title;toast.classList.add('show');speechSynthesis.speak(utterance)}));toast.querySelector('button').addEventListener('click',stopStory);window.addEventListener('beforeunload',()=>speechSynthesis.cancel());

const checkoutModal=document.querySelector('.checkout-modal');
const checkoutProduct=document.querySelector('.modal-product');
document.querySelectorAll('.buy-link').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();
  checkoutProduct.textContent=link.dataset.product||'выбранный сборник';
  checkoutModal.showModal();
}));
document.querySelectorAll('.modal-close,.modal-action').forEach(button=>button.addEventListener('click',()=>checkoutModal.close()));
checkoutModal.addEventListener('click',event=>{
  const bounds=checkoutModal.getBoundingClientRect();
  const outside=event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom;
  if(outside)checkoutModal.close();
});
