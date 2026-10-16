export function isComic(book={}){
 const text=[book.bookname,book.title,book.class_nm,book.className,book.category,book.genre,book.subject,book.format,book.form,book.materialType].filter(Boolean).join(' ');
 const compact=text.replace(/\s+/g,'');
 const verifiedSeries=/타키포오.*(?:얼렁뚱땅상식스쿨|탐정사무소)|슈뻘맨.*(?:숨은과학찾기|슈퍼상식월드컵)|소맥거핀의인체친구들|오은영의마음수호대|토깽이네.*(?:경제오락실|지구구출대작전)|버섯탐정|말이야와좋은습관친구들|우리들의MBTI|빨간내복야코.*과학책|민경장군의수상한운동클럽|꽥만약에|무적이순신|너구리라면가게|놓지마속담/i.test(compact);
 const classification=String(book.class_no||book.kdc||'').trim();
 return verifiedSeries||(/SCP\s*재단/i.test(text)&&/Team\.?\s*StoryG|올드스테어즈/i.test(String(book.authors||'')))||/^657(?:\.|$)/.test(classification)||/학습\s*만화|만화|코믹|웹툰|그래픽\s*(노블|히스토리)|comic|manga|백앤아|흔한\s*남매|에그\s*박사|마법\s*천자문|내일은\s*(실험왕|발명왕)|놓지\s*마\s*과학|설민석.*대모험|(?:\bWhy\s*[?？]|와이\s*[?？])|살아남기/i.test(text);
}
