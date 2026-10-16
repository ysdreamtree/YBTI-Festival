
    /* =========================================================================
       🌐 [구글 Apps Script 웹앱 연동 엔드포인트]
       ========================================================================= */
    const GOOGLE_APP_SCRIPT_URL = "";

    // 기본 로컬 Fallback 샘플 참여자 데이터베이스
    let PARTICIPANTS = [];

    function getOfficialYongYongSVG(typeCode = 'DEFAULT', size = 180) {
      const baseYongYong = `
        <polygon points="76,14 90,6 88,24" fill="#38BDF8" stroke="#0284C7" stroke-width="2.8" stroke-linejoin="round"/>
        <polygon points="86,26 102,20 96,40" fill="#38BDF8" stroke="#0284C7" stroke-width="2.8" stroke-linejoin="round"/>
        <polygon points="94,44 112,40 102,58" fill="#38BDF8" stroke="#0284C7" stroke-width="2.8" stroke-linejoin="round"/>
        <polygon points="96,62 114,64 102,78" fill="#38BDF8" stroke="#0284C7" stroke-width="2.8" stroke-linejoin="round"/>
        <polygon points="98,82 114,88 102,96" fill="#38BDF8" stroke="#0284C7" stroke-width="2.8" stroke-linejoin="round"/>
        <polygon points="106,96 122,100 112,108" fill="#38BDF8" stroke="#0284C7" stroke-width="2.8" stroke-linejoin="round"/>
        <path d="M84 94 C106 94, 120 104, 116 114 C108 120, 92 112, 80 108 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6" stroke-linejoin="round"/>
        <path d="M42 98 C32 94, 28 80, 32 64 C28 40, 42 15, 70 15 C96 15, 102 38, 98 64 C96 80, 98 94, 88 108 C78 116, 52 114, 42 98 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.8" stroke-linejoin="round"/>
        <ellipse cx="44" cy="58" rx="8" ry="6" fill="#FB7185" opacity="0.9"/>
        <ellipse cx="88" cy="58" rx="8" ry="6" fill="#FB7185" opacity="0.9"/>
        <ellipse cx="52" cy="47" rx="5.2" ry="6.8" fill="#0F172A"/>
        <ellipse cx="80" cy="47" rx="5.2" ry="6.8" fill="#0F172A"/>
        <circle cx="50" cy="44.5" r="2" fill="#FFFFFF"/>
        <circle cx="78" cy="44.5" r="2" fill="#FFFFFF"/>
        <path d="M61 53 Q66 60 71 53" fill="none" stroke="#0F172A" stroke-width="3.4" stroke-linecap="round"/>
        <path d="M30 96 C25 88, 40 82, 48 94 C54 102, 46 114, 36 112 C27 110, 27 101, 30 96 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/>
        <path d="M58 98 C54 88, 72 84, 82 92 C88 100, 80 114, 68 114 C60 114, 58 104, 58 98 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/>
      `;

      let customScene = '';
      switch (typeCode) {
        case 'TGIW':
          customScene = `${baseYongYong}<path d="M30 52 C18 42, 14 54, 26 66 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><path d="M80 50 C92 40, 98 52, 88 64 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><circle cx="68" cy="2" r="9" fill="#FDE047" stroke="#CA8A04" stroke-width="2.2"/><rect x="64" y="10" width="8" height="4" rx="1.5" fill="#CBD5E1" stroke="#475569" stroke-width="1.5"/><path d="M68 -9 V-13 M57 -5 L53 -9 M79 -5 L83 -9" stroke="#EAB308" stroke-width="2.5" stroke-linecap="round"/>`;
          break;
        case 'TGIP':
          customScene = `${baseYongYong}<path d="M30 52 C18 42, 14 54, 26 66 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><rect x="74" y="52" width="30" height="40" rx="4" fill="#FEF08A" stroke="#CA8A04" stroke-width="2.2"/><rect x="82" y="48" width="14" height="6" rx="2" fill="#94A3B8" stroke="#475569" stroke-width="1.5"/><line x1="80" y1="62" x2="98" y2="62" stroke="#CA8A04" stroke-width="2.2" stroke-linecap="round"/><line x1="80" y1="72" x2="98" y2="72" stroke="#CA8A04" stroke-width="2.2" stroke-linecap="round"/><polygon points="20,44 26,38 40,64 34,70" fill="#F87171" stroke="#DC2626" stroke-width="1.8"/><polygon points="20,44 16,48 24,50" fill="#1E293B"/>`;
          break;
        case 'TGOP':
          customScene = `<ellipse cx="68" cy="116" rx="58" ry="18" fill="#E0F2FE" stroke="#38BDF8" stroke-width="3.2"/><circle cx="36" cy="110" r="15" fill="#E0F2FE"/><circle cx="100" cy="110" r="15" fill="#E0F2FE"/>${baseYongYong}<path d="M30 52 C18 42, 14 54, 26 66 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><line x1="90" y1="20" x2="90" y2="70" stroke="#475569" stroke-width="3" stroke-linecap="round"/><polygon points="90,20 118,30 90,40" fill="#F472B6" stroke="#DB2777" stroke-width="2"/>`;
          break;
        case 'TGOW':
          customScene = `${baseYongYong}<path d="M30 52 C18 42, 14 54, 26 66 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><path d="M78 68 C88 68, 92 78, 82 82 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><g transform="translate(6, 88) rotate(-22)"><rect x="0" y="0" width="36" height="24" rx="6" fill="#CBD5E1" stroke="#475569" stroke-width="2.5"/><text x="4" y="16" font-size="9" font-family="Plus Jakarta Sans" font-weight="900" fill="#475569">SLUMP</text></g><path d="M42 94 L34 84 M48 100 L40 90" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>`;
          break;
        case 'DGOW':
          customScene = `<rect x="4" y="86" width="34" height="11" rx="2.5" fill="#F87171" stroke="#DC2626" stroke-width="2.2"/><rect x="6" y="75" width="30" height="11" rx="2.5" fill="#60A5FA" stroke="#2563EB" stroke-width="2.2"/><rect x="92" y="80" width="34" height="11" rx="2.5" fill="#FBBF24" stroke="#D97706" stroke-width="2.2"/><rect x="94" y="69" width="30" height="11" rx="2.5" fill="#34D399" stroke="#059669" stroke-width="2.2"/>${baseYongYong}<path d="M30 52 C18 42, 14 54, 26 66 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><path d="M78 68 C88 68, 92 78, 82 82 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/>`;
          break;
        case 'DGOP':
          customScene = `${baseYongYong}<path d="M30 52 C18 42, 14 54, 26 66 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><path d="M78 68 C88 68, 92 78, 82 82 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><path d="M44 42 H60 V52 C60 56 54 57 44 57 Z" fill="#1E293B"/><path d="M72 42 H88 V52 C88 56 82 57 72 57 Z" fill="#1E293B"/><path d="M60 45 H72" stroke="#1E293B" stroke-width="3.5"/><path d="M22 45 Q15 30 25 20 Q32 32 36 28 Q42 42 22 45 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/><circle cx="28" cy="32" r="3" fill="#FDE047"/>`;
          break;
        case 'DSIW':
          customScene = `${baseYongYong}<path d="M30 52 C18 42, 14 54, 26 66 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><polygon points="68,2 96,12 68,22 40,12" fill="#1E293B"/><path d="M50 18 V26 C50 30 86 30 86 26 V18" fill="#1E293B"/><path d="M88 14 V28" stroke="#F59E0B" stroke-width="2"/><circle cx="30" cy="62" r="14" fill="#BAE6FD" opacity="0.75" stroke="#0284C7" stroke-width="3"/><line x1="40" y1="72" x2="52" y2="84" stroke="#78350F" stroke-width="5" stroke-linecap="round"/>`;
          break;
        case 'DSIP':
          customScene = `${baseYongYong}<path d="M30 52 C18 42, 14 54, 26 66 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><path d="M78 68 C88 68, 92 78, 82 82 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><text x="12" y="36" font-family="Plus Jakarta Sans" font-weight="900" font-size="24" fill="#EF4444">?</text><text x="96" y="34" font-family="Plus Jakarta Sans" font-weight="900" font-size="22" fill="#3B82F6">!</text><path d="M68 62 V78 M56 68 H80" stroke="#CA8A04" stroke-width="3" stroke-linecap="round"/><polygon points="52,74 60,74 56,80" fill="#EAB308"/>`;
          break;
        case 'DSOW':
          customScene = `<rect x="6" y="80" width="42" height="30" rx="4" fill="#D97706" stroke="#78350F" stroke-width="2.5"/><circle cx="27" cy="90" r="4.5" fill="#FEF08A"/>${baseYongYong}<path d="M30 52 C18 42, 14 54, 26 66 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><path d="M78 68 C88 68, 92 78, 82 82 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><polygon points="28,42 42,34 54,46 40,54" fill="#A855F7" stroke="#6B21A8" stroke-width="2"/><path d="M50 32 L52 26 M58 34 L64 32" stroke="#FBBF24" stroke-width="2.5" stroke-linecap="round"/>`;
          break;
        case 'DSOP':
          customScene = `<path d="M12 110 L16 35 L32 45 L12 45" fill="none" stroke="#64748B" stroke-width="3"/><polygon points="8,45 36,45 28,30 16,30" fill="#FDE047"/><polygon points="22,45 2,118 60,118" fill="#FEF08A" opacity="0.35"/>${baseYongYong}<path d="M30 52 C18 42, 14 54, 26 66 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><path d="M78 68 C88 68, 92 78, 82 82 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><path d="M96 16 C90 24, 92 34, 100 40 C92 40, 84 32, 86 20 Z" fill="#FDE047" stroke="#EAB308" stroke-width="1.5"/>`;
          break;
        case 'DGIW':
          customScene = `${baseYongYong}<path d="M30 52 C18 42, 14 54, 26 66 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><circle cx="24" cy="64" r="14" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.8"/><polyline points="24,56 24,64 29,64" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round"/><path d="M40 26 C60 12, 80 15, 96 28" fill="none" stroke="#EF4444" stroke-width="5" stroke-linecap="round"/><polyline points="88,24 96,28 94,36" fill="none" stroke="#EF4444" stroke-width="5" stroke-linecap="round"/>`;
          break;
        case 'DGIP':
          customScene = `${baseYongYong}<path d="M30 52 C18 42, 14 54, 26 66 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><path d="M22 26 C16 18, 6 24, 12 33 L22 42 L32 33 C38 24, 28 18, 22 26 Z" fill="#F43F5E"/><path d="M96 20 C92 14, 84 18, 88 25 L96 32 L104 25 Z" fill="#F43F5E"/><path d="M22 42 Q20 54 26 62" fill="none" stroke="#FDA4AF" stroke-width="2"/>`;
          break;
        case 'TSIW':
          customScene = `<polygon points="26,16 28,10 32,15 38,15 33,19 35,25 30,21 25,25 27,19 22,15 28,15" fill="#FDE047"/><polygon points="98,16 100,12 103,15 107,15 104,18 105,22 101,19 97,22 99,18 95,15" fill="#FDE047"/>${baseYongYong}<path d="M30 52 C18 42, 14 54, 26 66 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><path d="M68 15 Q62 2 56 6 Q64 15 68 15 Z" fill="#22C55E" stroke="#15803D" stroke-width="1.8"/><path d="M68 15 Q74 2 80 6 Q72 15 68 15 Z" fill="#22C55E" stroke="#15803D" stroke-width="1.8"/>`;
          break;
        case 'TSIP':
          customScene = `${baseYongYong}<path d="M30 52 C18 42, 14 54, 26 66 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><polygon points="28,22 16,42 26,42 20,62 38,38 28,38" fill="#FBBF24" stroke="#D97706" stroke-width="2"/><circle cx="96" cy="46" r="16" fill="none" stroke="#EF4444" stroke-width="3.5"/><circle cx="96" cy="46" r="5" fill="#EF4444"/>`;
          break;
        case 'TSOW':
          customScene = `${baseYongYong}<path d="M30 52 C18 42, 14 54, 26 66 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><rect x="80" y="78" width="18" height="14" rx="3" fill="#FB7185" stroke="#E11D48" stroke-width="1.8"/><path d="M85 74 Q89 68 85 64" fill="none" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/><polygon points="12,112 28,112 26,96 14,96" fill="#D97706"/><path d="M20 96 Q12 84 20 80 Q28 84 20 96 Z" fill="#22C55E"/>`;
          break;
        case 'TSOP':
          customScene = `${baseYongYong}<path d="M30 52 C18 42, 14 54, 26 66 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><polygon points="56,15 62,4 70,13 78,4 84,15" fill="#FCD34D" stroke="#B45309" stroke-width="2.8"/><circle cx="70" cy="8" r="2.5" fill="#EF4444"/><polygon points="20,44 26,36 34,44 27,52" fill="#C084FC" stroke="#7E22CE" stroke-width="1.8"/>`;
          break;
        default:
          customScene = `${baseYongYong}<path d="M30 52 C18 42, 14 54, 26 66 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/><path d="M78 68 C88 68, 92 78, 82 82 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="3.6"/>`;
      }
      return `<svg viewBox="0 0 140 140" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${customScene}</svg>`;
    }

    const boardQuestions = [
      ["나는 책을 펼치면 기분이 조금 좋아진다.", "나는 책을 읽을 때 가볍게 쉬는 느낌이 더 좋다.", "나는 많은 사람들이 읽는 재미있는 책이 더 편하다.", "나는 요즘 유행하는 책을 보면 괜히 읽어보고 싶어진다.", "나는 책 속 인물들의 마음이 궁금할 때가 많다."],
      ["나는 책을 읽을 때 주로 찾는 장소가 있다.", "나는 책을 펼치면 공부보다는 쉬는 느낌이 더 좋다.", "나는 책보다 사람들과 이야기하는 시간이 더 편할 때가 많다.", "나는 집중해서 읽는 책보다 가볍게 쉬면서 읽을 수 있는 책이 더 좋다.", "나는 책을 고를 때 많은 사람이 추천한 책에 더 마음이 간다."],
      ["나는 표지를 보고, 어떤 책인지 알 수 있는 책이 좋다.", "나는 내가 고른 책을 읽을 때가 더 재밌다.", "요즘 나는 꼭 해보고 싶거나 이루고 싶은 일이 있다.", "나는 내 취향에 맞는 책을 잘 고른다.", "나는 책을 읽을 때 ‘아하!’ 하고 이해되는 순간이 좋다."],
      ["나는 사람들이 서로 좋아하거나 싫어하는 이유를 책에서 알고 싶다.", "나는 여행지에서 내 취향의 책을 펼치면 마음이 편해진다.", "나는 많은 사람들이 추천한 책이라면 배울 점도 많을 것 같다고 생각한다.", "나는 베스트셀러는 웬만하면 다 읽어보는 편이다.", "나는 요즘 사람들의 마음이 왜 그런지 더 알고 싶다."],
      ["나는 사람들이 많이 읽는 책이 더 끌린다.", "나는 목표가 분명한 게 가장 중요하다고 생각한다.", "책을 읽다가 몰랐던 것을 새롭게 알게 되면 뿌듯하다.", "요즘 나는 다른 사람들의 마음이 신경 쓰일 때가 많다.", ""]
    ];

    const ybtiResults = {
      'TGIW': { 
        alias: '성장 발견형', slogan: '어제보다 더 성장하는 나를 발견해요!', 
        desc: '책을 통해 나 자신을 발전시키고 성장하는 데 관심이 많아요. 책에서 배운 내용을 실천하며 긍정적인 변화를 만들어가는 과정에서 뿌듯함을 느낄 수 있어요. 당신의 끊임없는 성장이 멋져요!',
        fortune: '오늘 푸용이의 처방: "작은 한 페이지의 실천이 당신의 미래를 크게 바꿀 거예용! 🦖✨"',
        bestMatch: { code: 'TGIP', name: '실용 지향형', desc: '함께 실천 방안을 고민하며 서로의 성장을 200% 끌어올려 주는 최고의 파트너!' },
        synergyMatch: { code: 'DSOW', name: '선구자형', desc: '나에게 깊은 철학적 질문과 새로운 시야를 열어주는 깊이 있는 멘토 짝꿍!' }
      },
      'TGIP': { 
        alias: '실용 지향형', slogan: '배운 것은 바로 실천해야 활용돼요!', 
        desc: '실생활에 도움이 되는 정보나 기술을 다룬 책을 선호하는 편이에요. 책에서 얻은 지식을 실제 문제 해결에 바로 적용하고, 유용하게 활용하는 모습을 볼 수 있어요. 당신의 실용적인 독서가 도움이 많이 될 거예요!',
        fortune: '오늘 푸용이의 처방: "따뜻한 말 한마디가 담긴 책을 펼쳐보세용. 관계의 실타래가 풀려용! 🦖💬"',
        bestMatch: { code: 'TGIW', name: '성장 발견형', desc: '지식을 실행으로 옮기는 환상의 짝꿍! 같이 읽으면 실행력이 2배가 돼요.' },
        synergyMatch: { code: 'DGIP', name: '카네기형', desc: '사람을 사랑하는 마음이 통하여 함께 독서 모임을 이끌기 가장 좋은 메이트!' }
      },
      'TGOP': { 
        alias: '자유로운 독서가형', slogan: '끌리는 대로 마음껏 읽어요!', 
        desc: '목표를 두지 않고 그때그때 마음이 이끄는 책을 자유롭게 읽는 편이에요. 책이 주는 즐거움 그 자체를 만끽하며 순수한 호기심을 따라가는 모습을 보일 수 있어요. 당신의 자유로운 영혼이 아름다워요!',
        fortune: '오늘 푸용이의 처방: "책장을 덮고 눈을 감아보세용. 당신만의 여유로운 쉼표가 필요해용 ☕🌿"',
        bestMatch: { code: 'TGOW', name: '슬럼프 극복형', desc: '서로의 마음에 깊이 공감해주며 지친 마음을 어루만져 주는 힐링 듀오!' },
        synergyMatch: { code: 'TSOP', name: '절대미각형', desc: '남다른 감각과 취향을 공유하며 새로운 감성의 세계를 열어주는 친구!' }
      },
      'TGOW': { 
        alias: '슬럼프 극복형', slogan: '독서 슬럼프도 문제없어요!', 
        desc: '가끔 독서에 흥미를 잃더라도, 다시 책을 펼쳐 슬럼프를 극복하는 힘을 가지고 있어요. 나만의 페이스를 유지하며 꾸준히 책을 읽어나가는 모습을 볼 수 있어요. 당신의 회복력이 대단해요!',
        fortune: '오늘 푸용이의 처방: "잠깐 멈춰도 괜찮아용! 다시 책을 펼치는 순간 이미 성장한 거예용 🦖🌱"',
        bestMatch: { code: 'TGOP', name: '자유로운 독서가형', desc: '부담 없이 가볍게 읽는 즐거움을 되찾아주는 편안한 독서 버디!' },
        synergyMatch: { code: 'DGIW', name: '일개미형', desc: '꾸준한 페이스와 든든한 실행력을 곁에서 북돋워 주는 든든한 러닝메이트!' }
      },
      'DGOW': { 
        alias: '다독가형', slogan: '다양한 책을 섭렵하는 책 덕후!', 
        desc: '분야를 가리지 않고 다양한 책을 즐겨 읽는 편으로, 새로운 지식에 대한 호기심이 많아 여러 분야의 책을 통해 넓은 세상을 경험하는 것을 좋아해요. 당신의 넓은 독서 세계가 놀라워요!',
        fortune: '오늘 푸용이의 처방: "오늘은 평소 안 가보던 서가의 책을 한 권 골라보세용! 보물이 숨어있어용 📚✨"',
        bestMatch: { code: 'DSIW', name: '독서 전문가형', desc: '방대한 지식과 깊이 있는 통찰을 밤새도록 나눌 수 있는 지적 소울메이트!' },
        synergyMatch: { code: 'DGOP', name: '트렌드 세터형', desc: '고전과 최신 유행을 넘나들며 책에 대한 시야를 끝없이 넓혀주는 짝꿍!' }
      },
      'DGOP': { 
        alias: '트렌드 세터형', slogan: '요즘 핫한 책은 내가 먼저!', 
        desc: '요즘 유행하는 베스트셀러나 인기 있는 책에 관심이 많아요. 새로운 트렌드를 빠르게 파악하고, 남들보다 먼저 화제의 책을 읽으며 즐거움을 느끼는 모습이 보여요. 트렌드를 이끄는 당신의 감각이 빛나요!',
        fortune: '오늘 푸용이의 처방: "당신의 빠른 감각이 빛나는 날! 화제작 속 숨은 메시지를 찾아보세용 🦖🔥"',
        bestMatch: { code: 'DGOW', name: '다독가형', desc: '최신 트렌드와 깊이 있는 배경지식을 환상적으로 주고받는 책 친구!' },
        synergyMatch: { code: 'TSIP', name: '전략적 독서가형', desc: '트렌드를 실전 전략과 기획으로 구체화해주는 스마트한 동반자!' }
      },
      'DSIW': { 
        alias: '독서 전문가형', slogan: '깊이 있는 지식을 탐구하는 학구파', 
        desc: '관심 있는 분야의 전문적인 지식을 깊이 있게 탐구하는 것을 좋아해요. 어려운 책도 꼼꼼하게 이해하며, 깊은 통찰력을 얻는 과정에서 큰 즐거움을 느낄 수 있어요. 당신의 깊이 있는 지식 탐구가 멋져요!',
        fortune: '오늘 푸용이의 처방: "원리를 파고들 때 느껴지는 찌릿한 지적 쾌감을 만끽해보세용 🔭⚡"',
        bestMatch: { code: 'DSIP', name: '대법관형', desc: '논리와 팩트를 바탕으로 세상을 가장 날카롭게 분석하는 지적 동지!' },
        synergyMatch: { code: 'TSIW', name: '무럭무럭 성장형', desc: '깊은 전문지식을 미래기술과 연결해 상상력을 폭발시키는 시너지 메이트!' }
      },
      'DSIP': { 
        alias: '대법관형', slogan: '공정하고 비판적인 시각으로 책을 읽어요!', 
        desc: '책의 내용을 비판적으로 분석하고, 논리적으로 따져 읽는 편이에요. 나만의 주관을 확고히 하며 공정한 시각을 유지하려는 모습을 보일 수 있어요. 당신의 날카로운 통찰력은 대단해요!',
        fortune: '오늘 푸용이의 처방: "진실을 꿰뚫어 보는 당신의 날카로운 혜안이 빛을 발할 거예용 ⚖️📜"',
        bestMatch: { code: 'DSIW', name: '독서 전문가형', desc: '깊은 학술적 근거와 역사적 통찰을 균형 있게 맞추는 최고의 토론 상대!' },
        synergyMatch: { code: 'DGIP', name: '카네기형', desc: '냉철한 이성에 따뜻한 인간미와 포용력을 더해주는 상호보완 짝꿍!' }
      },
      'DSOW': { 
        alias: '선구자형', slogan: '남들이 안 읽는 책에서 보물을 찾아요!', 
        desc: '남들이 잘 읽지 않는 숨겨진 명작이나 독특한 책을 발견하는 것을 좋아해요. 비주류 분야나 낯선 주제에 도전하며, 나만의 보물을 찾아가는 모습을 보일 수 있어요. 당신의 새로운 발견이 기대돼요!',
        fortune: '오늘 푸용이의 처방: "남들의 속도가 아닌 당신만의 방향이 정답이에용! 본질을 믿으세용 🌌🧭"',
        bestMatch: { code: 'DSOP', name: '독서 은둔가형', desc: '말하지 않아도 깊은 고요와 사색을 나눌 수 있는 영혼의 단짝!' },
        synergyMatch: { code: 'TGIW', name: '성장 발견형', desc: '나의 깊은 철학을 현실의 따뜻한 실천으로 이어주는 행동파 친구!' }
      },
      'DSOP': { 
        alias: '독서 은둔가형', slogan: '조용히 나만의 시간에 빠져들어요!', 
        desc: '혼자만의 조용한 공간에서 책에 깊이 몰입하는 것을 좋아해요. 책을 통해 휴식을 취하고 사색하며, 나만의 생각 속에 빠져드는 시간을 보낼 수 있어요. 당신의 소중한 독서 시간이 편안하길 바라요!',
        fortune: '오늘 푸용이의 처방: "가장 아늑한 조명 아래서 나만의 문학 여행을 떠나보세용 🕯️📖"',
        bestMatch: { code: 'DSOW', name: '선구자형', desc: '침묵 속에서도 깊은 울림과 문학적 향기를 함께 느끼는 사색 메이트!' },
        synergyMatch: { code: 'TGOP', name: '자유로운 독서가형', desc: '지나친 고립을 막아주고 따뜻한 감성으로 세상과 연결해주는 친구!' }
      },
      'DGIW': { 
        alias: '일개미형', slogan: '꾸준함이 빛나는 성실한 독서가예요!', 
        desc: '강한 의지로 목표를 향해 꾸준히 책을 읽는 편이에요. 책 읽는 것 자체에서 큰 보람을 느끼고, 차근차근 목표를 이뤄나가는 모습을 보일 수 있어요. 성실하게 책을 읽는 당신의 모습이 멋져요!',
        fortune: '오늘 푸용이의 처방: "당신의 성실한 한 걸음이 모여 거대한 성공의 탑이 될 거예용 📊🏢"',
        bestMatch: { code: 'DGIP', name: '카네기형', desc: '나의 성실함에 넓은 대인관계 스킬을 더해 큰 성공을 돕는 파트너!' },
        synergyMatch: { code: 'TGOW', name: '슬럼프 극복형', desc: '치열한 목표 속에서 건강한 휴식과 완급조절을 챙겨주는 케어 메이트!' }
      },
      'DGIP': { 
        alias: '카네기형', slogan: '사람들과 함께 책으로 성장해요!', 
        desc: '다른 사람들과 함께 책을 읽고 이야기 나누는 것을 좋아해요. 소통을 통해 새로운 생각을 발견하고, 함께 성장하는 독서 경험을 중요하게 여기는 모습을 볼 수 있어요. 책으로 이어지는 당신의 관계가 멋져요!',
        fortune: '오늘 푸용이의 처방: "사람을 향한 당신의 따뜻한 관심이 도서관을 환하게 밝혀용 🤝💖"',
        bestMatch: { code: 'DGIW', name: '일개미형', desc: '따뜻한 리더십과 성실한 실행력이 만나 최고의 시너지를 내는 팀!' },
        synergyMatch: { code: 'DSIP', name: '대법관형', desc: '사람 중심의 온정에 공정한 원칙과 균형감각을 불어넣어 주는 조언자!' }
      },
      'TSIW': { 
        alias: '무럭무럭 성장형', slogan: '책과 함께 꿈을 키워요!', 
        desc: '책을 통해 꿈과 희망을 키우고, 더 나은 미래를 상상하는 것을 좋아해요. 긍정적인 에너지를 주는 책을 읽으며 자신감을 얻고 앞으로 나아갈 힘을 얻는 모습을 볼 수 있어요. 당신의 꿈을 응원해요!',
        fortune: '오늘 푸용이의 처방: "새로운 기술과 지식을 두려워하지 않는 당신의 호기심을 응원해용 🚀💻"',
        bestMatch: { code: 'TSIP', name: '전략적 독서가형', desc: '목적을 위해 전략과 기술을 결합하는 최고의 비즈니스 파트너!' },
        synergyMatch: { code: 'DSIW', name: '독서 전문가형', desc: '탄탄한 기초과학 원리로 나의 기술적 상상력을 든든하게 받쳐주는 스승!' }
      },
      'TSIP': { 
        alias: '전략적 독서가형', slogan: '목적을 위해 효율적으로 읽어요!', 
        desc: '분명한 목적을 가지고 필요한 정보를 효율적으로 찾아 읽는 편이에요. 목표 달성을 위해 전략적으로 책을 선택하고, 핵심 내용을 빠르게 파악하는 능력을 보일 수 있어요. 당신의 스마트한 독서 전략이 돋보여요!',
        fortune: '오늘 푸용이의 처방: "핵심을 꿰뚫어 보는 스마트함! 오늘 선택한 책이 묘수가 될 거예용 ♟️🎯"',
        bestMatch: { code: 'TSIW', name: '무럭무럭 성장형', desc: '미래지향적 비전과 날카로운 전략이 합쳐져 막힘없이 질주하는 파트너!' },
        synergyMatch: { code: 'DGOP', name: '트렌드 세터형', desc: '시장과 대중의 반응을 즉각 알려주어 전략의 정확도를 높여주는 나침반!' }
      },
      'TSOW': { 
        alias: '자기 만족 추구형', slogan: '나만의 행복한 독서 시간을 즐겨요!', 
        desc: '남들의 시선보다는 나 자신의 만족과 즐거움을 위해 책을 읽는 편이에요. 나만의 취향에 맞는 책을 읽으며 소소하지만 확실한 행복을 찾는 모습을 보일 수 있어요. 당신의 행복한 독서가 소중해요!',
        fortune: '오늘 푸용이의 처방: "시각과 감각을 깨우는 아름다운 그림과 디자인 책을 만나보세용 🎨✨"',
        bestMatch: { code: 'TSOP', name: '절대미각형', desc: '남들은 모르는 섬세한 미적 감각과 감동을 함께 나누는 예술 친구!' },
        synergyMatch: { code: 'TGIW', name: '성장 발견형', desc: '감각적인 영감을 현실의 성취물과 작품으로 완성할 수 있게 돕는 조력자!' }
      },
      'TSOP': { 
        alias: '절대미각형', slogan: '나만의 까다로운 취향이 있어요!', 
        desc: '책을 고르는 나만의 확고한 기준과 안목을 가지고 있어요. 까다롭게 선택한 책에서 깊은 감동을 받거나 나만의 독특한 취향을 즐기는 모습을 볼 수 있어요. 당신의 특별한 안목이 멋져요!',
        fortune: '오늘 푸용이의 처방: "당신의 특별한 안목이 선택한 책! 세상에 단 하나뿐인 즐거움이에용 ☕🍰"',
        bestMatch: { code: 'TSOW', name: '자기 만족 추구형', desc: '나만의 까다롭고 아름다운 취향을 100% 존중하고 이해해 주는 짝꿍!' },
        synergyMatch: { code: 'TGOP', name: '자유로운 독서가형', desc: '자유롭고 편안한 감성으로 나의 독서 세계를 더욱 풍요롭게 해주는 벗!' }
      }
    };

    const YBTI_BOOK_PROFILES = {
      'TGIW': {
        keywords: ['성장', '습관', '변화', '실행'],
        kdcs: ['32', '18', '3'], categoryName: '성장·심리·경영',
        picks: [
          { bookname:'아주 작은 습관의 힘', authors:'제임스 클리어', reason:'작은 행동을 꾸준한 변화로 연결하는 성장형 독서에 잘 맞아요.' },
          { bookname:'마인드셋', authors:'캐럴 드웩', reason:'성장 가능성을 믿고 배우는 태도를 단단하게 만들어줘요.' },
          { bookname:'그릿', authors:'앤절라 더크워스', reason:'재능보다 꾸준함과 실행의 힘을 확인하고 싶은 독자에게 어울려요.' }
        ]
      },
      'TGIP': {
        keywords: ['실용', '문제해결', '소통', '적용'],
        kdcs: ['18', '32', '5'], categoryName: '심리·비즈니스·실용',
        picks: [
          { bookname:'말의 품격', authors:'이기주', reason:'일과 관계에서 바로 써볼 수 있는 말과 태도의 감각을 키워줘요.' },
          { bookname:'비폭력대화', authors:'마셜 B. 로젠버그', reason:'갈등 상황에서 실제로 적용할 수 있는 대화 도구를 익힐 수 있어요.' },
          { bookname:'일 잘하는 사람은 단순하게 합니다', authors:'박소연', reason:'복잡한 일을 정리하고 실행하는 실용 독서의 장점을 살려줘요.' }
        ]
      },
      'TGOP': {
        keywords: ['휴식', '감성', '일상', '자유'],
        kdcs: ['81', '8', '98'], categoryName: '문학·에세이·여행',
        picks: [
          { bookname:'불편한 편의점', authors:'김호연', reason:'부담 없이 읽히면서도 사람과 일상의 온기를 느끼게 해줘요.' },
          { bookname:'여행의 이유', authors:'김영하', reason:'정답 없이 흘러가는 여행과 삶을 편안하게 바라보게 해줘요.' },
          { bookname:'나는 나로 살기로 했다', authors:'김수현', reason:'내 속도와 취향을 존중하는 자유로운 독서가에게 잘 맞아요.' }
        ]
      },
      'TGOW': {
        keywords: ['회복', '마음', '위로', '다시시작'],
        kdcs: ['18', '19', '81'], categoryName: '마음·윤리·문학',
        picks: [
          { bookname:'모순', authors:'양귀자', reason:'삶의 복잡한 감정을 따라가며 독서 감각을 천천히 되살려줘요.' },
          { bookname:'죽고 싶지만 떡볶이는 먹고 싶어', authors:'백세희', reason:'지친 마음을 과장 없이 들여다보며 다시 책에 가까워지게 해줘요.' },
          { bookname:'어서 오세요, 휴남동 서점입니다', authors:'황보름', reason:'책과 사람, 쉼이 만나는 이야기가 독서 슬럼프에 부드러운 입구가 돼요.' }
        ]
      },
      'DGOW': {
        keywords: ['확장', '다양성', '지식', '호기심'],
        kdcs: ['0', '3', '9'], categoryName: '교양·사회·역사',
        picks: [
          { bookname:'지적 대화를 위한 넓고 얕은 지식 1', authors:'채사장', reason:'여러 분야를 빠르게 연결해 보는 다독가의 즐거움을 살려줘요.' },
          { bookname:'사피엔스', authors:'유발 하라리', reason:'역사·과학·사회가 한 권 안에서 연결되는 폭넓은 지식 독서에 어울려요.' },
          { bookname:'총, 균, 쇠', authors:'재레드 다이아몬드', reason:'문명과 환경을 큰 시야로 읽으며 지식의 범위를 확장할 수 있어요.' }
        ]
      },
      'DGOP': {
        keywords: ['트렌드', '사회', '콘텐츠', '미래'],
        kdcs: ['33', '32', '5'], categoryName: '트렌드·경영·미래기술',
        picks: [
          { bookname:'트렌드 코리아 2026', authors:'김난도 외', reason:'지금 사회에서 무엇이 움직이는지 빠르게 읽고 싶은 감각에 잘 맞아요.' },
          { bookname:'시대예보: 핵개인의 시대', authors:'송길영', reason:'사람과 조직의 변화 방향을 데이터와 흐름으로 바라보게 해줘요.' },
          { bookname:'넥서스', authors:'유발 하라리', reason:'정보와 기술이 사회를 어떻게 바꾸는지 큰 흐름으로 탐색할 수 있어요.' }
        ]
      },
      'DSIW': {
        keywords: ['탐구', '원리', '과학', '깊이'],
        kdcs: ['4', '5', '0'], categoryName: '자연과학·기술·교양',
        picks: [
          { bookname:'코스모스', authors:'칼 세이건', reason:'한 주제를 끝까지 파고드는 지적 탐구의 즐거움을 크게 느낄 수 있어요.' },
          { bookname:'이기적 유전자', authors:'리처드 도킨스', reason:'생명과 진화의 원리를 논리적으로 이해하고 싶은 독자에게 어울려요.' },
          { bookname:'물고기는 존재하지 않는다', authors:'룰루 밀러', reason:'과학적 분류와 인간의 세계관을 함께 흔드는 깊이 있는 탐구서예요.' }
        ]
      },
      'DSIP': {
        keywords: ['논리', '비판', '근거', '판단'],
        kdcs: ['9', '3', '1'], categoryName: '역사·사회·철학',
        picks: [
          { bookname:'사피엔스', authors:'유발 하라리', reason:'익숙한 역사 해석을 의심하고 큰 관점에서 다시 판단하게 해줘요.' },
          { bookname:'정의란 무엇인가', authors:'마이클 샌델', reason:'가치 충돌을 논리적으로 검토하고 토론하기 좋은 책이에요.' },
          { bookname:'팩트풀니스', authors:'한스 로슬링', reason:'직관 대신 데이터와 근거로 세상을 판단하는 훈련에 잘 맞아요.' }
        ]
      },
      'DSOW': {
        keywords: ['철학', '사유', '발견', '본질'],
        kdcs: ['1', '8', '9'], categoryName: '철학·인문·문학',
        picks: [
          { bookname:'소크라테스 익스프레스', authors:'에릭 와이너', reason:'철학자의 질문을 일상과 연결하며 사유의 폭을 넓혀줘요.' },
          { bookname:'철학은 어떻게 삶의 무기가 되는가', authors:'야마구치 슈', reason:'철학을 현실 문제와 연결해 새로운 관점을 발견하게 해줘요.' },
          { bookname:'명상록', authors:'마르쿠스 아우렐리우스', reason:'유행과 거리를 두고 삶의 본질을 차분히 들여다보게 해줘요.' }
        ]
      },
      'DSOP': {
        keywords: ['고요', '몰입', '문학', '사색'],
        kdcs: ['8', '81', '1'], categoryName: '세계문학·한국문학·철학',
        picks: [
          { bookname:'데미안', authors:'헤르만 헤세', reason:'혼자 깊게 읽고 오래 생각할수록 새로운 의미가 드러나는 작품이에요.' },
          { bookname:'변신', authors:'프란츠 카프카', reason:'짧지만 강한 상징과 여운이 사색적인 독서에 잘 어울려요.' },
          { bookname:'참을 수 없는 존재의 가벼움', authors:'밀란 쿤데라', reason:'관계와 존재를 천천히 곱씹고 싶은 독자에게 깊은 질문을 남겨요.' }
        ]
      },
      'DGIW': {
        keywords: ['꾸준함', '목표', '집중', '성과'],
        kdcs: ['32', '18', '3'], categoryName: '경영·심리·사회',
        picks: [
          { bookname:'원씽', authors:'게리 켈러·제이 파파산', reason:'가장 중요한 한 가지에 꾸준히 집중하는 목표형 독서에 잘 맞아요.' },
          { bookname:'몰입', authors:'황농문', reason:'집중력을 높이고 꾸준한 성과로 연결하는 방법을 탐색할 수 있어요.' },
          { bookname:'타이탄의 도구들', authors:'팀 페리스', reason:'성공한 사람들의 루틴에서 실천 가능한 습관을 골라 적용하기 좋아요.' }
        ]
      },
      'DGIP': {
        keywords: ['관계', '리더십', '공감', '협업'],
        kdcs: ['32', '18', '3'], categoryName: '리더십·심리·조직',
        picks: [
          { bookname:'데일 카네기 인간관계론', authors:'데일 카네기', reason:'사람을 이해하고 관계를 만드는 기본기를 익히기에 좋은 대표책이에요.' },
          { bookname:'어떻게 원하는 것을 얻는가', authors:'스튜어트 다이아몬드', reason:'상대의 관점을 읽고 협상과 소통으로 해법을 만드는 데 도움을 줘요.' },
          { bookname:'똑똑한 사람은 어떻게 생각하고 질문하는가', authors:'이시한', isbn13:'9791191891492', reason:'생각을 구조화하고 핵심을 짚는 질문을 통해 일과 문제 해결의 관점을 넓혀줘요.' }
        ]
      },
      'TSIW': {
        keywords: ['미래', '기술', '혁신', '상상'],
        kdcs: ['5', '4', '3'], categoryName: '기술·과학·미래사회',
        picks: [
          { bookname:'넥서스', authors:'유발 하라리', reason:'정보 네트워크와 기술이 인간 사회를 바꾸는 큰 그림을 보여줘요.' },
          { bookname:'AI 2041', authors:'리카이푸·천치우판', reason:'인공지능 기술이 일상과 산업을 어떻게 바꿀지 구체적으로 상상하게 해줘요.' },
          { bookname:'호모 데우스', authors:'유발 하라리', reason:'과학기술이 만들어낼 인간의 미래를 넓은 관점에서 탐색할 수 있어요.' }
        ]
      },
      'TSIP': {
        keywords: ['전략', '기획', '선택', '효율'],
        kdcs: ['3', '32', '5'], categoryName: '전략·경영·기술',
        picks: [
          { bookname:'좋은 전략 나쁜 전략', authors:'리처드 루멜트', reason:'목표와 핵심 문제를 구분해 실제 전략으로 만드는 사고를 도와줘요.' },
          { bookname:'제로 투 원', authors:'피터 틸·블레이크 매스터스', reason:'남들과 다른 선택과 기획으로 새로운 가치를 만드는 관점을 줘요.' },
          { bookname:'룬샷', authors:'사피 바칼', reason:'혁신 아이디어를 조직 안에서 살리는 구조와 전략을 생각하게 해줘요.' }
        ]
      },
      'TSOW': {
        keywords: ['취향', '예술', '디자인', '감각'],
        kdcs: ['6', '81', '59'], categoryName: '예술·에세이·생활',
        picks: [
          { bookname:'방구석 미술관', authors:'조원재', reason:'부담 없이 예술을 즐기면서 나만의 감각을 발견하기 좋아요.' },
          { bookname:'컬러의 힘', authors:'캐런 할러', reason:'색과 감정, 취향이 연결되는 방식을 흥미롭게 탐색할 수 있어요.' },
          { bookname:'공간의 미래', authors:'유현준', reason:'공간을 보는 감각을 일상과 사회의 변화까지 확장해줘요.' }
        ]
      },
      'TSOP': {
        keywords: ['취향', '여행', '라이프', '발견'],
        kdcs: ['59', '98', '8'], categoryName: '생활·여행·문학',
        picks: [
          { bookname:'여행의 이유', authors:'김영하', reason:'여행을 통해 나만의 취향과 시선을 발견하는 즐거움을 줘요.' },
          { bookname:'무라카미 T', authors:'무라카미 하루키', reason:'한 사람의 아주 개인적인 취향이 어떻게 이야기가 되는지 보여줘요.' },
          { bookname:'아무튼, 술', authors:'김혼비', reason:'확고한 취향을 유쾌하고 솔직한 언어로 즐기고 싶은 독자에게 어울려요.' }
        ]
      }
    };

    const DEFAULT_STATS = Object.fromEntries(Object.keys(ybtiResults).map(code => [code, 0]));

    // 책축제 공식 통계는 브라우저 localStorage가 아니라 새 구글시트 등록 데이터만 사용합니다.
    function getStoredStats() {
      const stats = { ...DEFAULT_STATS };
      PARTICIPANTS.forEach(p => {
        const code = String(p?.ybti || '').trim();
        if (Object.prototype.hasOwnProperty.call(stats, code)) stats[code] += 1;
      });
      return stats;
    }
    function recordYbtiStat(code) {
      // 검사 완료만으로는 공식 참여자 통계에 포함하지 않습니다.
      // 등록폼 제출 후 구글시트에 기록된 데이터만 집계합니다.
      renderYbtiRankingChart();
      renderOrganizationMap();
    }

    const AUTH_KEY = "";
    const DATA4LIBRARY_API_BASE = 'https://data4library.kr/api';
    let curR = 0, curC = 0, stepCount = 1, historyStack = [];
    let userScores = { D: 0, G: 0, I: 0, W: 0 };
    let isBoardOpen = true;
    let currentResultCode = 'TGIW';
    let currentRecommendType = 'mania';
    let currentAgeFilter = '';
    let rankChartInstance = null;

    /* =========================================================================
       🛡️ [API 호출 절감 1차 개선판]
       - 인기대출: 1시간 캐시
       - ISBN 검색: 7일 캐시
       - 책 상세/대출횟수: 12시간 캐시
       - 꼬리물기 추천: 6시간 캐시
       - 같은 URL 동시 요청: 1개의 Promise 공유
       - 신규 호출 실패 시: 최근 정상 캐시(stale) 재사용
       ========================================================================= */
    const DATA4_API_CACHE_PREFIX = 'YBTI_DATA4_API_CACHE_V1:';
    const DATA4_API_INFLIGHT = new Map();

    function getData4CachePolicy(url = '') {
      const u = String(url || '');
      if (u.includes('/loanItemSrch')) {
        return { ttl: 60 * 60 * 1000, staleTtl: 24 * 60 * 60 * 1000, label: '인기대출' };
      }
      if (u.includes('/srchBooks')) {
        return { ttl: 7 * 24 * 60 * 60 * 1000, staleTtl: 30 * 24 * 60 * 60 * 1000, label: 'ISBN검색' };
      }
      if (u.includes('/srchDtlList')) {
        return { ttl: 12 * 60 * 60 * 1000, staleTtl: 7 * 24 * 60 * 60 * 1000, label: '도서상세' };
      }
      if (u.includes('/recommandList')) {
        return { ttl: 6 * 60 * 60 * 1000, staleTtl: 3 * 24 * 60 * 60 * 1000, label: '꼬리물기' };
      }
      return { ttl: 30 * 60 * 1000, staleTtl: 24 * 60 * 60 * 1000, label: '기타' };
    }

    function makeData4CacheKey(url = '') {
      try {
        const parsed = new URL(url, location.href);
        parsed.searchParams.delete('authKey');
        // 공식 호스트 후보가 달라도 같은 API 요청이면 동일 캐시를 사용
        const normalized = `${parsed.pathname}?${[...parsed.searchParams.entries()]
          .sort((a, b) => (a[0] + a[1]).localeCompare(b[0] + b[1]))
          .map(([k, v]) => `${k}=${v}`).join('&')}`;

        let hash = 2166136261;
        for (let i = 0; i < normalized.length; i++) {
          hash ^= normalized.charCodeAt(i);
          hash = Math.imul(hash, 16777619);
        }
        return DATA4_API_CACHE_PREFIX + (hash >>> 0).toString(36);
      } catch (e) {
        return DATA4_API_CACHE_PREFIX + encodeURIComponent(String(url).replace(/authKey=[^&]+/i, 'authKey='));
      }
    }

    function readData4Cache(url, allowStale = false) {
      const key = makeData4CacheKey(url);
      const policy = getData4CachePolicy(url);
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const saved = JSON.parse(raw);
        if (!saved || !saved.data || !saved.savedAt) return null;

        const age = Date.now() - Number(saved.savedAt);
        const limit = allowStale ? policy.staleTtl : policy.ttl;
        if (age > limit) {
          if (age > policy.staleTtl) localStorage.removeItem(key);
          return null;
        }
        return { data: saved.data, age, stale: age > policy.ttl, label: policy.label };
      } catch (e) {
        return null;
      }
    }

    function writeData4Cache(url, data) {
      const key = makeData4CacheKey(url);
      try {
        localStorage.setItem(key, JSON.stringify({
          savedAt: Date.now(),
          data
        }));
      } catch (e) {
        // 저장공간이 부족하면 오래된 YBTI API 캐시를 정리하고 한 번만 재시도
        try {
          Object.keys(localStorage)
            .filter(k => k.startsWith(DATA4_API_CACHE_PREFIX))
            .slice(0, 20)
            .forEach(k => localStorage.removeItem(k));
          localStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), data }));
        } catch (_) {
          console.warn('YBTI API 캐시 저장 공간 부족');
        }
      }
    }

    function getData4InflightKey(url = '') {
      return makeData4CacheKey(url);
    }

    async function fetchData4LibraryJson(url, retries = 1) {
      throw new Error('사전 수집 도서 데이터 준비 중입니다. 유형별 추천도서는 이용할 수 있습니다.');

      // 1) TTL 안의 정상 캐시는 네트워크 호출 없이 즉시 사용
      const freshCache = readData4Cache(url, false);
      if (freshCache) {
        console.info(`♻️ ${freshCache.label} API 캐시 사용 (${Math.max(1, Math.round(freshCache.age / 60000))}분 전)`);
        return freshCache.data;
      }

      // 2) 같은 요청이 이미 진행 중이면 새 API 호출을 만들지 않고 기존 Promise 공유
      const inflightKey = getData4InflightKey(url);
      if (DATA4_API_INFLIGHT.has(inflightKey)) {
        console.info('🔁 동일 API 요청 진행 중 → 기존 요청 공유');
        return DATA4_API_INFLIGHT.get(inflightKey);
      }

      const requestPromise = (async () => {
        let lastError = null;
        const staleCache = readData4Cache(url, true);

        // 호출량 폭증 방지를 위해 직접 호출은 기본 호스트 → www 호스트까지만 1회씩 시도
        const directUrls = [
          url,
          url.replace('https://data4library.kr/', 'https://www.data4library.kr/')
        ].filter((v, i, arr) => arr.indexOf(v) === i);

        for (let i = 0; i < directUrls.length; i++) {
          const directUrl = directUrls[i];
          try {
            const res = await fetchWithTimeout(directUrl, 9000);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();

            const apiError = data?.response?.error || data?.error;
            if (apiError) {
              throw new Error(typeof apiError === 'string' ? apiError : JSON.stringify(apiError));
            }

            writeData4Cache(url, data);
            return data;
          } catch (e) {
            lastError = e;

            // 최근 정상값이 있다면 실패 직후 추가 호스트/프록시 호출을 멈추고 캐시로 복구
            if (staleCache) {
              console.warn(`📦 ${staleCache.label} 신규 호출 실패 → 최근 정상 캐시 재사용`, e);
              return staleCache.data;
            }
          }
        }

        // 캐시도 없고 직접 호출도 실패한 최초 사용자만 프록시 1회 사용
        try {
          const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
          const proxyRes = await fetchWithTimeout(proxyUrl, 12000);
          if (!proxyRes.ok) throw new Error(`Proxy HTTP ${proxyRes.status}`);
          const data = await proxyRes.json();

          const apiError = data?.response?.error || data?.error;
          if (apiError) {
            throw new Error(typeof apiError === 'string' ? apiError : JSON.stringify(apiError));
          }

          writeData4Cache(url, data);
          return data;
        } catch (e) {
          lastError = e;
        }

        throw lastError || new Error('도서관 정보나루 API 연결 실패');
      })();

      DATA4_API_INFLIGHT.set(inflightKey, requestPromise);

      try {
        return await requestPromise;
      } finally {
        DATA4_API_INFLIGHT.delete(inflightKey);
      }
    }

    function setTopBookLoadingState() {
      const label = document.getElementById('card-top-book-label');
      const title = document.getElementById('card-top-book-title');
      const author = document.getElementById('card-top-book-author');
      const img = document.getElementById('card-top-book-img');
      const loan = document.getElementById('card-top-book-loan');
      if (label) label.innerText = '✨ 추천도서를 찾는 중...';
      if (title) title.innerText = '푸용이가 실시간 대출 데이터를 확인하고 있어요';
      if (author) author.innerText = '잠시만 기다려 주세요';
      if (loan) loan.innerText = '대출횟수 자료 없음';
      if (img) { img.removeAttribute('src'); img.style.visibility = 'hidden'; }
    }

    function setTopBookCard(book, isFallback = false) {
      const label = document.getElementById('card-top-book-label');
      const title = document.getElementById('card-top-book-title');
      const author = document.getElementById('card-top-book-author');
      const img = document.getElementById('card-top-book-img');
      const loan = document.getElementById('card-top-book-loan');

      if (label) label.innerText = isFallback ? '📚 푸용이의 YBTI 추천도서' : '✨ 실시간 대출데이터 추천도서';
      if (title) title.innerText = book.bookname || '추천도서';
      if (author) author.innerText = book.authors || '저자 미상';
      if (loan) {
        if (isFallback) {
          loan.innerText = '📚 유형별 추천 · 대출횟수 자료 없음';
          loan.style.color = '#94A3B8';
        } else if (book.loanCount !== undefined && book.loanCount !== null && book.loanCount !== '') {
          loan.innerText = `🔥 ${Number(book.loanCount).toLocaleString()}회 대출`;
          loan.style.color = '#6366F1';
        } else {
          loan.innerText = '대출횟수 자료 없음';
          loan.style.color = '#6366F1';
        }
      }
      if (img) {
        if (book.bookImageURL) {
          img.src = book.bookImageURL;
          img.style.visibility = 'visible';
        } else {
          img.removeAttribute('src');
          img.style.visibility = 'hidden';
        }
      }

      currentTargetBook = {
        isbn13: book.isbn13 || '',
        bookname: book.bookname || '',
        authors: book.authors || '저자 미상',
        bookImageURL: book.bookImageURL || '',
        loanCount: (book.loanCount !== undefined && book.loanCount !== null && book.loanCount !== '') ? Number(book.loanCount) : null,
        publisher: book.publisher || '',
        publication_year: book.publication_year || book.publicationYear || '',
        rank: book.rank || null,
        isFallback
      };
    }

    function applyYbtiFallbackBook() {
      const fallback = YBTI_FALLBACK_BOOKS[currentResultCode] || YBTI_FALLBACK_BOOKS['TGIW'];
      setTopBookCard({ ...fallback, isbn13: '', bookImageURL: '' }, true);
    }

    function getNodeKey(r, c) { return `${['A', 'B', 'C', 'D', 'E'][r]}${c + 1}`; }

    function initBoardGrid() {
      document.getElementById('logo-dino-slot').innerHTML = getOfficialYongYongSVG('DEFAULT', 24);
      document.getElementById('hero-yong-slot').innerHTML = getOfficialYongYongSVG('DEFAULT', 52);
      
      const grid = document.getElementById('board-grid');
      grid.querySelectorAll('.board-cell, .board-res-box').forEach(el => el.remove());

      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          const cell = document.createElement('div');
          cell.className = 'board-cell';
          cell.id = `cell-${getNodeKey(r, c)}`;

          if (r === 4 && c === 4) {
            cell.className = 'board-cell yongyong-cheer-card';
            cell.innerHTML = `
              <div class="yongyong-spin">${getOfficialYongYongSVG('DEFAULT', 55)}</div>
              <span style="font-size:0.75rem; font-weight:900; color:#0369A1; margin-top:2px;">푸용이가 응원해용! 🦖✨</span>
              <span style="font-size:0.65rem; font-weight:800; color:#0284C7;">책나라 완주 화이팅!</span>
            `;
            grid.appendChild(cell);
            continue;
          }

          const qText = boardQuestions[r][c];
          if (qText) {
            cell.innerHTML = `<span>${qText}</span>`;
            if (c < 4 && r < 4) {
              const rBadge = document.createElement('div');
              rBadge.className = 'arrow-badge-right';
              rBadge.innerText = '맞아! ➔';
              cell.appendChild(rBadge);
            }
            if (r < 4 && c < 4) {
              const dBadge = document.createElement('div');
              dBadge.className = 'arrow-badge-down';
              dBadge.innerText = '아니야! ↓';
              cell.appendChild(dBadge);
            }
          } else {
            cell.style.visibility = 'hidden';
          }
          grid.appendChild(cell);
        }

        const resBox = document.createElement('div');
        resBox.className = 'board-res-box';
        let yesCode = '', noCode = '';
        if (r === 0) { yesCode = 'DGOW'; noCode = 'DGOP'; }
        else if (r === 1) { yesCode = 'TGOP'; noCode = 'TSOP'; }
        else if (r === 2) { yesCode = 'DSIW'; noCode = 'DSOW'; }
        else if (r === 3) { yesCode = 'DGIP'; noCode = 'DGIW'; }

        if (yesCode) {
          resBox.innerHTML = `
            <div class="res-pair">
              <div class="res-target" id="target-${yesCode}"><span class="tag-yes">맞아! ➔</span><span class="code-label">❓ 확인</span></div>
              <div class="res-target" id="target-${noCode}"><span class="tag-no">아니야! ➔</span><span class="code-label">❓ 확인</span></div>
            </div>
          `;
        }
        grid.appendChild(resBox);
      }

      const bottomPairs = [
        { y: 'TGOW', n: 'TSOW' },
        { y: 'TGIW', n: 'TGIP' },
        { y: 'DSIP', n: 'DSOP' },
        { y: 'TSIP', n: 'TSIW' }
      ];

      bottomPairs.forEach((pair) => {
        const bottomBox = document.createElement('div');
        bottomBox.className = 'board-res-box';
        bottomBox.innerHTML = `
          <div class="res-pair" style="width:100%;">
            <div class="res-target" id="target-${pair.y}"><span class="tag-yes">맞아! ↓</span><span class="code-label">❓ 확인</span></div>
            <div class="res-target" id="target-${pair.n}"><span class="tag-no">아니야! ↓</span><span class="code-label">❓ 확인</span></div>
          </div>
        `;
        grid.appendChild(bottomBox);
      });

      for(let i=0; i<2; i++) {
        const spacer = document.createElement('div');
        spacer.className = 'board-res-box';
        spacer.style.visibility = 'hidden';
        grid.appendChild(spacer);
      }

      updateBoardVisual();
    }

    function updateJourneyTrailSVG() {
      const polyline = document.getElementById('journey-trail');
      const grid = document.getElementById('board-grid');
      if (!polyline || !grid) return;
      const gridRect = grid.getBoundingClientRect();

      const visitedNodes = [...historyStack.map(s => getNodeKey(s.r, s.c)), getNodeKey(curR, curC)];
      const points = [];

      visitedNodes.forEach(nodeKey => {
        const cell = document.getElementById(`cell-${nodeKey}`);
        if (cell) {
          const cellRect = cell.getBoundingClientRect();
          const centerX = (cellRect.left + cellRect.width / 2) - gridRect.left;
          const centerY = (cellRect.top + cellRect.height / 2) - gridRect.top;
          points.push(`${centerX},${centerY}`);
        }
      });

      polyline.setAttribute('points', points.join(' '));
    }

    function updateBoardVisual() {
      const nodeKey = getNodeKey(curR, curC);
      document.querySelectorAll('.board-cell').forEach(el => el.classList.remove('active'));
      const activeCell = document.getElementById(`cell-${nodeKey}`);

      if (activeCell) {
        activeCell.classList.add('active');
        let token = document.getElementById('player-token');
        if (!token) {
          token = document.createElement('div');
          token.id = 'player-token';
          token.className = 'player-token';
        }
        token.innerHTML = getOfficialYongYongSVG('DEFAULT', 30);
        activeCell.appendChild(token);

        const scrollArea = document.getElementById('board-scroll-area');
        if (scrollArea) {
          // 좌우 이동: 기존처럼 사다리 지도 내부를 부드럽게 가로 추적
          const cellLeft = activeCell.offsetLeft;
          const targetScrollLeft = cellLeft - (scrollArea.clientWidth / 2) + (activeCell.clientWidth / 2);
          scrollArea.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });

          // 상하 이동: 현재 푸용이 칸이 화면 중앙 근처에 오도록 페이지도 부드럽게 추적
          // (지도 컨테이너는 세로 스크롤 영역이 아니라 페이지 자체가 세로로 움직여야 함)
          const cellRect = activeCell.getBoundingClientRect();
          const targetPageTop = window.scrollY + cellRect.top - (window.innerHeight / 2) + (cellRect.height / 2);
          window.scrollTo({ top: Math.max(0, targetPageTop), behavior: 'smooth' });
        }
      }

      syncQuestionModal();
      setTimeout(updateJourneyTrailSVG, 60);
    }

    function syncQuestionModal() {
      const questionEl = document.getElementById('modal-question-text');
      const badgeEl = document.getElementById('modal-step-badge');
      const progressEl = document.getElementById('modal-progress-text');
      const undoEl = document.getElementById('btn-modal-undo');
      if (!questionEl) return;

      badgeEl.innerText = `🌱 독서 탐험 ${stepCount}단계`;
      progressEl.innerText = `STEP ${stepCount}/5`;
      questionEl.innerText = `"${boardQuestions[curR][curC]}"`;
      undoEl.style.display = stepCount > 1 ? 'block' : 'none';

      const finalStep = (curR === 4 || curC === 4);
      document.getElementById('modal-yes-sub').innerText = finalStep ? '🎉 최종 성향 오픈!' : '오른쪽 길로 이동';
      document.getElementById('modal-no-sub').innerText = finalStep ? '🎉 최종 성향 오픈!' : '아래쪽 길로 이동';
    }

    function startModalQuest() {
      document.getElementById('intro-overlay').style.display = 'none';
      document.body.classList.add('quest-modal-open');
      updateBoardVisual();
      openQuestionModal();
    }

    function openQuestionModal() {
      syncQuestionModal();
      const modal = document.getElementById('question-modal-overlay');
      modal.style.display = 'flex';
      document.body.classList.add('quest-modal-open');
    }

    function closeQuestionModal() {
      document.getElementById('question-modal-overlay').style.display = 'none';
      document.body.classList.remove('quest-modal-open');
    }

    function handleChoice(isYes) {
      historyStack.push({ r: curR, c: curC, step: stepCount, scores: { ...userScores } });
      const sign = isYes ? 1 : -1;
      userScores.D += sign; userScores.G += sign; userScores.I += sign; userScores.W += sign;

      const prevCell = document.getElementById(`cell-${getNodeKey(curR, curC)}`);
      if (prevCell) prevCell.classList.add('passed');

      // 마지막 질문: 모달을 닫고 결과 화면으로 즉시 전환
      if (curC === 4 || curR === 4) {
        let finalCode = '';
        if (curC === 4) {
          if (curR === 0) finalCode = isYes ? 'DGOW' : 'DGOP';
          else if (curR === 1) finalCode = isYes ? 'TGOP' : 'TSOP';
          else if (curR === 2) finalCode = isYes ? 'DSIW' : 'DSOW';
          else if (curR === 3) finalCode = isYes ? 'DGIP' : 'DGIW';
        } else if (curR === 4) {
          if (curC === 0) finalCode = isYes ? 'TGOW' : 'TSOW';
          else if (curC === 1) finalCode = isYes ? 'TGIW' : 'TGIP';
          else if (curC === 2) finalCode = isYes ? 'DSIP' : 'DSOP';
          else if (curC === 3) finalCode = isYes ? 'TSIP' : 'TSIW';
        }
        closeQuestionModal();
        showFinalResult(finalCode);
        return;
      }

      // 선택 직후 질문 모달을 닫아 뒤의 사다리 이동을 노출
      closeQuestionModal();
      if (isYes) curC++; else curR++;
      stepCount++;
      updateBoardVisual();

      // 사용자가 이동을 눈으로 확인한 뒤 다음 질문 표시
      setTimeout(() => openQuestionModal(), 500);
    }

    function undoChoice() {
      if (historyStack.length === 0) return;
      const last = historyStack.pop();

      const currentCell = document.getElementById(`cell-${getNodeKey(curR, curC)}`);
      if (currentCell) currentCell.classList.remove('active');

      curR = last.r; curC = last.c; stepCount = last.step; userScores = { ...last.scores };

      document.querySelectorAll('.board-cell').forEach(el => el.classList.remove('passed'));
      historyStack.forEach(h => {
        const cell = document.getElementById(`cell-${getNodeKey(h.r, h.c)}`);
        if (cell) cell.classList.add('passed');
      });

      updateBoardVisual();
      openQuestionModal();
    }

    const YBTI_READING_POWERS = {
      TGIW: [['🌱','성장력'], ['⚡','실천력'], ['🔄','변화력']],
      TGIP: [['🛠️','활용력'], ['🧩','문제해결력'], ['⚡','적용력']],
      TGOP: [['🪽','탐색력'], ['💫','호기심'], ['🌈','감성발견']],
      TGOW: [['🌱','회복력'], ['🐢','꾸준함'], ['💚','마음돌봄']],
      DGOW: [['🌍','확장력'], ['🔎','호기심'], ['🔗','연결력']],
      DGOP: [['🔥','트렌드감각'], ['📡','포착력'], ['👀','변화감지']],
      DSIW: [['🔬','탐구력'], ['🧠','깊이읽기'], ['💎','통찰력']],
      DSIP: [['⚖️','판단력'], ['🔍','비판적사고'], ['🧩','논리력']],
      DSOW: [['🧭','발견력'], ['💡','새로운관점'], ['🌌','본질탐구']],
      DSOP: [['🕯️','몰입력'], ['🌙','사색력'], ['💭','내면탐구']],
      DGIW: [['🐜','꾸준함'], ['🎯','집중력'], ['🏃','실행력']],
      DGIP: [['🤝','공감력'], ['💬','소통력'], ['🌱','동반성장']],
      TSIW: [['🚀','상상력'], ['💡','혁신감각'], ['🔭','가능성발견']],
      TSIP: [['♟️','전략적사고'], ['🎯','핵심파악'], ['⚡','정보활용']],
      TSOW: [['🎨','감각발견'], ['💗','취향존중'], ['✨','영감수집']],
      TSOP: [['👑','선택안목'], ['💎','취향발견'], ['🔎','디테일감각']]
    };

    function renderReadingPowers(typeCode) {
      const wrap = document.getElementById('reading-power-list');
      if (!wrap) return;
      const powers = YBTI_READING_POWERS[typeCode] || YBTI_READING_POWERS.TGIW;
      wrap.innerHTML = powers.map(([icon, label]) => `
        <div class="reading-power-chip">
          <span class="power-icon">${icon}</span>
          <span>${label}</span>
        </div>
      `).join('');
    }

    function showFinalResult(typeCode) {
      window.dispatchEvent(new CustomEvent('ybti:result', {detail:{type:typeCode}}));
      currentResultCode = typeCode;
      const data = ybtiResults[typeCode] || ybtiResults['TGIW'];
      
      const targetBadge = document.getElementById(`target-${typeCode}`);
      if (targetBadge) {
        targetBadge.classList.add('highlight');
        const label = targetBadge.querySelector('.code-label');
        if (label) label.innerText = `${typeCode} ${data.alias}`;
      }

      document.getElementById('character-dino-target').innerHTML = getOfficialYongYongSVG(typeCode, 175);
      document.getElementById('res-code').innerText = typeCode;
      document.getElementById('res-alias').innerText = data.alias;
      document.getElementById('res-slogan').innerText = `"${data.slogan}"`;
      document.getElementById('res-desc').innerText = data.desc;
      document.getElementById('fortune-text').innerText = data.fortune;
      renderReadingPowers(typeCode);


      renderBipolarSpectrum(userScores, typeCode);
      recordYbtiStat(typeCode);
      renderOrganizationMap();

      document.getElementById('board-section-container').style.display = 'none';
      document.getElementById('result-view').style.display = 'block';
      if (typeof confetti === 'function') confetti({ particleCount: 110, spread: 75 });
      
      selectAgeFilter('');
      document.getElementById('result-view').scrollIntoView({ behavior: 'smooth' });
    }

    function renderBipolarSpectrum(scores, typeCode) {
      const dPercent = typeCode[0] === 'D' ? 68 : 32;
      const gPercent = typeCode[1] === 'G' ? 74 : 26;
      const iPercent = typeCode[2] === 'I' ? 62 : 38;
      const wPercent = typeCode[3] === 'W' ? 72 : 28;

      const list = [
        { title: '독서관심정도 (Deep vs Thin)', lCode: 'D (많이 읽는다)', rCode: 'T (많이 안읽는다)', lP: dPercent, rP: 100 - dPercent, col: '#6366F1' },
        { title: '독서관심스타일 (General vs Special)', lCode: 'G (다양한 주제)', rCode: 'S (특정한 주제)', lP: gPercent, rP: 100 - gPercent, col: '#10B981' },
        { title: '독서목적 (In vs Out)', lCode: 'I (나를 채우는)', rCode: 'O (나를 비우는)', lP: iPercent, rP: 100 - iPercent, col: '#F59E0B' },
        { title: '현재고민분야 (Work vs Person)', lCode: 'W (일·목표)', rCode: 'P (사람·관계)', lP: wPercent, rP: 100 - wPercent, col: '#EC4899' }
      ];

      const wrap = document.getElementById('spectrum-bars-list');
      wrap.innerHTML = '';
      list.forEach(item => {
        const isLeftWin = item.lP >= item.rP;
        wrap.innerHTML += `
          <div class="spectrum-card-retro">
            <div style="font-size:0.86rem; font-weight:900; margin-bottom:0.45rem;">${item.title}</div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
              <div class="pole-card-box ${isLeftWin?'winner':'loser'}">
                <span style="font-size:0.75rem; font-weight:800;">${item.lCode}</span><strong>${item.lP}%</strong>
              </div>
              <div class="pole-card-box ${!isLeftWin?'winner':'loser'}">
                <span style="font-size:0.75rem; font-weight:800;">${item.rCode}</span><strong>${item.rP}%</strong>
              </div>
            </div>
            <div class="spectrum-track-wrap">
              <div class="spectrum-fill-bar ${isLeftWin?'from-left':'from-right'}" style="width:${isLeftWin?item.lP:item.rP}%; background:${item.col};"></div>
            </div>
          </div>
        `;
      });
    }

    function renderYbtiRankingChart() {
      const stats = getStoredStats();
      const labels = Object.keys(stats);
      const dataValues = Object.values(stats);
      const total = dataValues.reduce((a, b) => a + b, 0);

      document.getElementById('total-participant-count').innerText = Number(total).toLocaleString();

      const sorted = labels.map(k => ({ code: k, count: stats[k], alias: (ybtiResults[k]?.alias || '') }))
                          .sort((a, b) => b.count - a.count);

      document.getElementById('top3-ranking-box').innerHTML = total > 0 ? `
        🏆 <strong>2026 용산구 책축제 성향 TOP 3</strong> : 
        1위 [${sorted[0].code} ${sorted[0].alias}] · 
        2위 [${sorted[1].code} ${sorted[1].alias}] · 
        3위 [${sorted[2].code} ${sorted[2].alias}]
      ` : '📚 첫 참여자가 등록되면 실시간 YBTI 랭킹이 시작됩니다!';

      const ctx = document.getElementById('ybtiRankChart').getContext('2d');
      if (rankChartInstance) rankChartInstance.destroy();

      if (typeof Chart !== 'function') return;
      rankChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: '참여 인원 수 (명)',
            data: dataValues,
            backgroundColor: labels.map(c => c === currentResultCode ? '#EC4899' : '#6366F1'),
            borderColor: '#1E293B',
            borderWidth: 2,
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, grid: { color: '#E2E8F0' } },
            x: { grid: { display: false }, ticks: { font: { size: 9, weight: '800' } } }
          }
        }
      });
    }

    function switchResultTab(idx) {
      document.querySelectorAll('.res-tab-btn').forEach((b, i) => b.classList.toggle('active', i === idx - 1));
      document.querySelectorAll('.tab-pane').forEach((p, i) => p.classList.toggle('active', i === idx - 1));
    }

    function toggleBoardMap() {
      isBoardOpen = !isBoardOpen;
      document.getElementById('board-scroll-area').style.display = isBoardOpen ? 'block' : 'none';
      document.getElementById('btn-toggle-board').innerHTML = isBoardOpen ? '<i class="fa-solid fa-chevron-up"></i> 지도 접기' : '<i class="fa-solid fa-chevron-down"></i> 지도 펼치기';
      if (isBoardOpen) setTimeout(updateJourneyTrailSVG, 50);
    }

    function resetGame() {
      window.dispatchEvent(new Event('ybti:reset'));
      document.querySelectorAll('#registerModal input, #registerModal textarea').forEach(e=>{if(e.type==='checkbox')e.checked=false;else e.value='';});
      curR = 0; curC = 0; stepCount = 1; historyStack = [];
      userScores = { D: 0, G: 0, I: 0, W: 0 };
      currentResultCode = 'TGIW';

      closeQuestionModal();
      document.getElementById('board-section-container').style.display = 'block';
      document.getElementById('result-view').style.display = 'none';
      document.querySelectorAll('.board-cell').forEach(el => el.classList.remove('passed', 'active'));

      document.querySelectorAll('.res-target').forEach(el => {
        el.classList.remove('highlight');
        const label = el.querySelector('.code-label');
        if (label) label.innerText = '❓ 확인';
      });

      const polyline = document.getElementById('journey-trail');
      if (polyline) polyline.setAttribute('points', '');

      updateBoardVisual();
      document.getElementById('intro-overlay').style.display = 'flex';
      document.body.classList.add('quest-modal-open');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function saveBookmarkImage() {
      switchResultTab(1);
      setTimeout(() => {
        (typeof html2canvas === 'function' ? html2canvas : (()=>{alert('이미지 저장 라이브러리 준비 중입니다.');return Promise.reject(new Error('이미지 저장 준비 중'));}))(document.getElementById('bookmark-card'), { scale: 2.5, useCORS: true }).then(canvas => {
          const link = document.createElement('a');
          link.download = `YBTI_푸용이포토카드_${currentResultCode}.png`;
          link.href = canvas.toDataURL();
          link.click();
        });
      }, 150);
    }

    function shareResult() {
      navigator.clipboard.writeText(window.location.href).then(() => alert('✨ 푸용이의 독서 성향 링크가 복사되었습니다! 친구에게 보내보세용! 🦖'));
    }

    /* =========================================================================
       📊 [2. 2026 용산구 책축제 독서취향 지도 & 구글시트 실시간 데이터]
       ========================================================================= */
    const FESTIVAL_SOURCE = '2026 용산구 책축제';
    const YBTI_PARTICIPANT_CACHE_KEY = 'YBTI_FESTIVAL_PARTICIPANT_CACHE_V1';
    const YBTI_PARTICIPANT_CACHE_TTL = 45 * 1000;

    function calculateYbtiDistribution() {
      const counts = {};
      Object.keys(ybtiResults).forEach(k => counts[k] = 0);
      PARTICIPANTS.forEach(p => {
        const code = String(p?.ybti || '').trim();
        if (counts[code] !== undefined) counts[code] += 1;
      });
      return counts;
    }

    function groupCountBy(field) {
      const map = {};
      PARTICIPANTS.forEach(p => {
        const key = String(p?.[field] || '').trim() || '미선택';
        map[key] = (map[key] || 0) + 1;
      });
      return Object.entries(map).map(([label,count]) => ({label,count})).sort((a,b)=>b.count-a.count || a.label.localeCompare(b.label,'ko'));
    }

    function calculateTopTypeForRows(rows) {
      const counts = {};
      rows.forEach(p => {
        const code = String(p?.ybti || '').trim();
        if (code) counts[code] = (counts[code] || 0) + 1;
      });
      const sorted = Object.entries(counts).sort((a,b)=>b[1]-a[1]);
      return sorted.length ? { code: sorted[0][0], count: sorted[0][1] } : null;
    }

    function renderTasteNeighbors() {
      const total = PARTICIPANTS.length;
      const same = PARTICIPANTS.filter(p => p?.ybti === currentResultCode);
      const sameCount = same.length;
      const ratio = total ? Math.round(sameCount / total * 100) : 0;
      const countEl = document.getElementById('taste-same-count');
      if (!countEl) return;
      countEl.innerText = `${sameCount}명`;
      document.getElementById('taste-same-ratio').innerText = total ? `전체 등록자 중 ${ratio}%` : '아직 등록 데이터가 없어요';

      const topGroup = (field) => {
        const m = {};
        same.forEach(p => { const v=String(p?.[field]||'').trim(); if(v) m[v]=(m[v]||0)+1; });
        const arr=Object.entries(m).sort((a,b)=>b[1]-a[1]);
        return arr[0] ? `${arr[0][0]} · ${arr[0][1]}명` : '-';
      };
      document.getElementById('taste-age-summary').innerText = topGroup('ageGroup');
      document.getElementById('taste-library-summary').innerText = topGroup('library');

      const books = {};
      same.forEach(p => {
        const title=String(p?.bookname||'').trim();
        if(!title) return;
        const author=String(p?.authors||'').trim();
        const key=`${title.toLowerCase()}__${author.toLowerCase()}`;
        if(!books[key]) books[key]={title,author,count:0};
        books[key].count++;
      });
      const topBooks=Object.values(books).sort((a,b)=>b.count-a.count || a.title.localeCompare(b.title,'ko')).slice(0,3);
      document.getElementById('taste-book-summary').innerHTML = topBooks.length
        ? topBooks.map((b,i)=>`<div style="padding:7px 0;border-bottom:${i===topBooks.length-1?'0':'1px dashed #CBD5E1'};"><strong>${i+1}. ${escapeHtml(b.title)}</strong>${b.author?` · ${escapeHtml(b.author)}`:''} <span style="color:#6366F1;">(${b.count}명 PICK)</span></div>`).join('')
        : '아직 같은 YBTI 참여자가 등록한 추천책이 없습니다.';
    }

    function renderOrganizationMap() {
      const total = PARTICIPANTS.length;
      const totalEl = document.getElementById('org-total-count');
      if (!totalEl) return;
      totalEl.innerText = `${total}명`;

      const dist = calculateYbtiDistribution();
      const sortedTypes = Object.keys(dist).map(k => ({
        code:k, alias:ybtiResults[k]?.alias || '', count:dist[k], ratio: total ? Math.round(dist[k]/total*100) : 0
      })).sort((a,b)=>b.count-a.count || a.code.localeCompare(b.code));
      const top=sortedTypes[0];
      const rare=sortedTypes.filter(x=>x.count>0).sort((a,b)=>a.count-b.count || a.code.localeCompare(b.code))[0];
      document.getElementById('org-top-type').innerText = total ? `${top.code} ${top.alias}` : '-';
      document.getElementById('org-top-ratio').innerText = total ? `총 ${top.count}명 (${top.ratio}%)` : '등록을 기다리고 있어요';
      document.getElementById('org-rare-type').innerText = rare ? `${rare.code} ${rare.alias}` : '-';
      document.getElementById('org-rare-ratio').innerText = rare ? `총 ${rare.count}명 (${rare.ratio}%) · 용산의 유니크한 취향!` : '등록을 기다리고 있어요';

      const distWrap=document.getElementById('org-ybti-dist-list');
      distWrap.innerHTML=sortedTypes.map(item=>`<div style="background:#FAF8F5;border:1.5px solid #CBD5E1;border-radius:12px;padding:8px 10px;">
        <div style="display:flex;justify-content:space-between;font-size:0.78rem;font-weight:900;margin-bottom:4px;"><span><strong style="color:#6366F1;">${item.code}</strong> ${item.alias}</span><span>${item.count}명 (${item.ratio}%)</span></div>
        <div style="height:8px;background:#E2E8F0;border-radius:100px;overflow:hidden;"><div style="width:${item.ratio}%;height:100%;background:linear-gradient(90deg,#F59E0B,#6366F1);border-radius:100px;"></div></div></div>`).join('');

      const renderGroupStats=(id, field, icon) => {
        const wrap=document.getElementById(id); if(!wrap) return;
        const groups=groupCountBy(field);
        wrap.innerHTML = groups.length ? groups.slice(0,10).map(g=>{
          const rows=PARTICIPANTS.filter(p=>(String(p?.[field]||'').trim()||'미선택')===g.label);
          const topType=calculateTopTypeForRows(rows);
          return `<div style="padding:8px 0;border-bottom:1px dashed #CBD5E1;"><div style="display:flex;justify-content:space-between;gap:8px;font-size:0.79rem;font-weight:900;"><span>${icon} ${escapeHtml(g.label)}</span><span>${g.count}명</span></div><div style="font-size:0.7rem;color:#64748B;margin-top:2px;">${topType?`대표 ${topType.code} ${ybtiResults[topType.code]?.alias||''} · ${topType.count}명`:'-'}</div></div>`;
        }).join('') : '<div style="font-size:0.78rem;color:#64748B;">아직 등록 데이터가 없습니다.</div>';
      };
      renderGroupStats('org-age-stats-list','ageGroup','👤');
      renderGroupStats('org-library-stats-list','library','📍');

      const commentsWrap=document.getElementById('org-employee-comments-list');
      if(commentsWrap){
        const comments=PARTICIPANTS.filter(p=>String(p?.comment||'').trim()).slice().reverse().slice(0,12);
        commentsWrap.innerHTML=comments.length ? comments.map(p=>{
          const code=String(p.ybti||'-'); const alias=ybtiResults[code]?.alias||'';
          return `<div style="background:#FAF8F5;border:1.5px solid #CBD5E1;border-radius:14px;padding:0.85rem 0.9rem;"><div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;"><span style="font-size:0.7rem;font-weight:900;color:#FFF;background:#6366F1;border:1.5px solid #1E293B;border-radius:100px;padding:2px 8px;">${escapeHtml(code)}</span><strong style="font-size:0.76rem;color:#475569;">${escapeHtml(alias)}</strong></div><p style="font-size:0.82rem;color:#1E293B;font-weight:800;line-height:1.55;">“${escapeHtml(String(p.comment||'').trim())}”</p></div>`;
        }).join('') : '<div style="grid-column:1/-1;background:#F8FAFC;border:1.5px dashed #CBD5E1;border-radius:14px;padding:1rem;text-align:center;font-size:0.78rem;color:#64748B;font-weight:800;">아직 등록된 한마디가 없어요. 첫 독서 한마디를 남겨주세요! 💬</div>';
      }
      renderTasteNeighbors();
      renderYbtiRankingChart();
      renderYbtiParticipantPicks();
    }

    async function loadGoogleSheetsParticipants(forceRefresh = false) {
      if (!GOOGLE_APP_SCRIPT_URL || GOOGLE_APP_SCRIPT_URL.includes('여기에_새_웹앱_URL_입력')) {
        console.info('책축제용 Apps Script 웹앱 URL을 입력하면 실시간 데이터가 연결됩니다.');
        renderOrganizationMap();
        return PARTICIPANTS;
      }
      if (!forceRefresh) {
        try {
          const cached=JSON.parse(localStorage.getItem(YBTI_PARTICIPANT_CACHE_KEY)||'null');
          if(cached?.savedAt && Array.isArray(cached.data) && (Date.now()-cached.savedAt)<YBTI_PARTICIPANT_CACHE_TTL){
            PARTICIPANTS=cached.data;
            renderOrganizationMap();
            return PARTICIPANTS;
          }
        } catch(e) {}
      }
      try {
        const res=await fetch(`${GOOGLE_APP_SCRIPT_URL}?t=${Date.now()}`, {cache:'no-store'});
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        const data=await res.json();
        PARTICIPANTS=Array.isArray(data)?data:[];
        try { localStorage.setItem(YBTI_PARTICIPANT_CACHE_KEY, JSON.stringify({savedAt:Date.now(),data:PARTICIPANTS})); } catch(e) {}
        renderOrganizationMap();
      } catch(e) {
        console.warn('책축제 구글시트 데이터 연결 대기:',e);
        renderOrganizationMap();
      }
      return PARTICIPANTS;
    }

    function openRegisterModal() {
      document.getElementById('regYbti').value=currentResultCode;
      document.getElementById('regBookname').value='';
      document.getElementById('regAuthors').value='';
      document.getElementById('registerModal').style.display='flex';
    }
    function closeRegisterModal(e) {
      if (e && e.target !== e.currentTarget && !e.target.classList.contains('modal-close-btn')) return;
      document.getElementById('registerModal').style.display='none';
    }
    function pickAsMyRecommendBook(title, author) {
      currentTargetBook.bookname=title; currentTargetBook.authors=author;
      openRegisterModal();
      document.getElementById('regBookname').value=title||'';
      document.getElementById('regAuthors').value=author||'';
    }
    function makeEntryId(){ return `YBTI-${Date.now()}-${Math.random().toString(36).slice(2,8)}`; }
    const sleep=(ms)=>new Promise(resolve=>setTimeout(resolve,ms));

    async function handleRegisterSubmit(event) {
      event.preventDefault();
      if (!GOOGLE_APP_SCRIPT_URL || GOOGLE_APP_SCRIPT_URL.includes('여기에_새_웹앱_URL_입력')) {
        alert('새 Apps Script 웹앱 URL을 먼저 입력해 주세요. 현재 파일에는 안전하게 자리표시자만 넣어두었습니다.');
        return;
      }
      const submitBtn=document.getElementById('btn-submit-reg');
      const originalText=submitBtn.innerHTML;
      submitBtn.disabled=true;
      submitBtn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> 독서지도에 등록 중...';
      const payload={
        entryId:makeEntryId(),
        ageGroup:document.getElementById('regAgeGroup').value,
        library:document.getElementById('regLibrary').value,
        ybti:document.getElementById('regYbti').value,
        bookname:document.getElementById('regBookname').value.trim(),
        authors:document.getElementById('regAuthors').value.trim(),
        comment:document.getElementById('regComment').value.trim(),
        source:FESTIVAL_SOURCE,
        publicNoticeShown:true
      };
      try {
        await fetch(GOOGLE_APP_SCRIPT_URL, {method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});
        try { localStorage.removeItem(YBTI_PARTICIPANT_CACHE_KEY); } catch(e) {}
        let confirmed=false;
        for(let i=0;i<3;i++){
          await sleep(550 + i*350);
          await loadGoogleSheetsParticipants(true);
          if(PARTICIPANTS.some(p=>p?.entryId===payload.entryId)){ confirmed=true; break; }
        }
        if(typeof confetti==='function') confetti({particleCount:120,spread:80});
        alert(confirmed ? '🎉 나의 YBTI가 2026 용산구 책축제 독서지도에 등록되었습니다! 🦖✨' : '📚 등록 요청을 전송했습니다. 네트워크 상황에 따라 독서지도 반영에 잠시 차이가 있을 수 있어요.');
        closeRegisterModal();
        document.getElementById('regForm').reset();
        switchResultTab(7);
        renderOrganizationMap();
      } catch(err) {
        alert('등록 중 문제가 발생했습니다: '+err.message);
      } finally {
        submitBtn.disabled=false; submitBtn.innerHTML=originalText;
      }
    }

    /* =========================================================================
       📚 [4-A. YBTI 4단계 추천도서 큐레이션 전용]
       - ① 유형별 대표 추천 3권
       - ② 복수 KDC 실시간 대출 데이터
       - ③ 같은 YBTI 독자 PICK
       - ④ 선택 도서 꼬리물기(기존 기능 그대로 연결)
       ========================================================================= */
    function getYbtiBookProfile(code = currentResultCode) {
      return YBTI_BOOK_PROFILES[code] || YBTI_BOOK_PROFILES['TGIW'];
    }

    function encodeBookObject(book) {
      return encodeURIComponent(JSON.stringify({
        isbn13: book.isbn13 || '',
        bookname: book.bookname || '',
        authors: book.authors || '',
        bookImageURL: book.bookImageURL || '',
        loanCount: (book.loanCount !== undefined ? book.loanCount : null),
        publisher: book.publisher || '',
        publication_year: book.publication_year || '',
        rank: book.rank || null,
        isCurated: !!book.isCurated
      }));
    }

    function renderYbtiRecommendationOverview() {
      const profile = getYbtiBookProfile();
      const result = ybtiResults[currentResultCode] || ybtiResults['TGIW'];

      const profileEl = document.getElementById('ybti-curation-profile');
      if (profileEl) {
        profileEl.innerHTML = `
          <div style="display:flex; align-items:flex-start; gap:10px;">
            <div style="font-size:1.8rem; line-height:1;">🦖</div>
            <div style="flex:1;">
              <span style="font-size:0.7rem; font-weight:900; color:#6366F1;">${currentResultCode} · ${result.alias}</span>
              <h3 style="font-size:1.08rem; font-weight:900; margin:2px 0 5px;">이 유형은 이런 책에 마음이 가요</h3>
              <div style="display:flex; gap:5px; flex-wrap:wrap;">
                ${profile.keywords.map(k => `<span style="font-size:0.72rem;font-weight:900;background:#EEF2FF;color:#4338CA;border:1.5px solid #1E293B;border-radius:100px;padding:2px 8px;">#${k}</span>`).join('')}
              </div>
              <p style="font-size:0.75rem; color:#64748B; line-height:1.5; margin-top:7px;">
                한 분야에 고정하지 않고 <strong>${profile.categoryName}</strong>을 중심으로 취향의 폭을 넓혀 추천해요.
              </p>
            </div>
          </div>`;
      }

      const curatedEl = document.getElementById('ybti-curated-picks-list');
      if (curatedEl) {
        curatedEl.innerHTML = profile.picks.map((book, idx) => {
          const enriched = { ...book, isCurated:true };
          const encoded = encodeBookObject(enriched);
          return `
            <div style="background:#FFFFFF;border:2px solid #1E293B;border-radius:16px;padding:0.9rem;box-shadow:var(--retro-shadow-sm);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <span style="display:inline-block;font-size:0.67rem;font-weight:900;color:#FFFFFF;background:${idx===0?'#8B5CF6':'#6366F1'};border:1.5px solid #1E293B;border-radius:6px;padding:2px 7px;margin-bottom:6px;">${idx===0?'대표 PICK':'PICK '+(idx+1)}</span>
                <h4 style="font-size:0.9rem;font-weight:900;line-height:1.35;color:#1E293B;">${escapeHtml(book.bookname)}</h4>
                <p style="font-size:0.7rem;color:#64748B;margin-top:2px;">${escapeHtml(book.authors)}</p>
                <p style="font-size:0.76rem;color:#475569;line-height:1.48;margin-top:8px;">💡 ${escapeHtml(book.reason)}</p>
              </div>
              <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:10px;">
                <button class="btn-explore-chain-sm" style="background:#0EA5E9;flex:1;justify-content:center;" onclick="openCuratedBookDetail(this, '${encoded}')">📖 책 정보</button>
                <button class="btn-explore-chain-sm" style="background:#8B5CF6;flex:1;justify-content:center;" onclick="startCuratedBookChain(this, '${encoded}')">🔮 꼬리물기</button>
                <button class="btn-explore-chain-sm" style="background:#F59E0B;flex-basis:100%;justify-content:center;" onclick="pickAsMyRecommendBook(decodeURIComponent('${encodeURIComponent(book.bookname)}'), decodeURIComponent('${encodeURIComponent(book.authors)}'))">📌 내 PICK</button>
              </div>
            </div>`;
        }).join('');
      }

      renderYbtiParticipantPicks();
    }

    // 🦖 푸용이 큐레이션 도서는 ISBN을 고정 저장하지 않고,
    // 클릭 시 도서관 정보나루 도서검색(srchBooks)에서 제목/저자를 대조해 ISBN을 보강합니다.
    // 같은 책을 다시 누르면 재검색하지 않도록 세션 내 캐시를 사용합니다.
    const curatedBookResolveCache = new Map();

    function normalizeBookSearchText(value = '') {
      return String(value || '')
        .toLowerCase()
        .replace(/\([^)]*\)|\[[^\]]*\]/g, ' ')
        .replace(/[^0-9a-z가-힣]/g, '');
    }

    function getSearchBookDocs(data) {
      const docs = data?.response?.docs || data?.response?.result?.docs || [];
      return Array.isArray(docs) ? docs.map(item => item?.doc || item).filter(Boolean) : [];
    }

    function scoreCuratedBookCandidate(target, candidate) {
      const targetTitle = normalizeBookSearchText(target.bookname);
      const targetAuthor = normalizeBookSearchText(target.authors);
      const candTitle = normalizeBookSearchText(candidate.bookname || candidate.title || '');
      const candAuthor = normalizeBookSearchText(candidate.authors || candidate.author || '');

      let score = 0;
      if (candTitle === targetTitle) score += 100;
      else if (candTitle.includes(targetTitle) || targetTitle.includes(candTitle)) score += 65;
      else {
        const titleChars = [...new Set(targetTitle)].filter(ch => candTitle.includes(ch)).length;
        score += Math.min(35, titleChars * 2);
      }

      if (targetAuthor && candAuthor) {
        if (candAuthor === targetAuthor) score += 45;
        else if (candAuthor.includes(targetAuthor) || targetAuthor.includes(candAuthor)) score += 35;
        else {
          const authorTokens = String(target.authors || '').split(/[\s,·외]+/).map(normalizeBookSearchText).filter(t => t.length >= 2);
          if (authorTokens.some(t => candAuthor.includes(t))) score += 25;
        }
      }

      if (String(candidate.isbn13 || candidate.isbn || '').replace(/\D/g, '').length >= 13) score += 10;
      return score;
    }

    async function resolveCuratedBookIsbn(book) {
      const cacheKey = `${normalizeBookSearchText(book.bookname)}__${normalizeBookSearchText(book.authors)}`;
      if (curatedBookResolveCache.has(cacheKey)) return curatedBookResolveCache.get(cacheKey);

      const promise = (async () => {
        const keywords = [
          `${book.bookname} ${book.authors || ''}`.trim(),
          book.bookname
        ];
        let allCandidates = [];

        for (const keyword of keywords) {
          try {
            const url = `${DATA4LIBRARY_API_BASE}/srchBooks?authKey=${AUTH_KEY}&keyword=${encodeURIComponent(keyword)}&pageNo=1&pageSize=20&format=json`;
            const data = await fetchData4LibraryJson(url, 1);
            allCandidates.push(...getSearchBookDocs(data));
          } catch (e) {
            console.warn('큐레이션 도서 ISBN 검색 실패:', keyword, e);
          }
          if (allCandidates.length) break;
        }

        const unique = [];
        const seen = new Set();
        for (const candidate of allCandidates) {
          const isbn = String(candidate.isbn13 || candidate.isbn || '').replace(/[^0-9Xx]/g, '');
          const key = isbn || `${candidate.bookname || candidate.title || ''}__${candidate.authors || candidate.author || ''}`;
          if (seen.has(key)) continue;
          seen.add(key);
          unique.push(candidate);
        }

        const ranked = unique
          .map(candidate => ({ candidate, score: scoreCuratedBookCandidate(book, candidate) }))
          .sort((a, b) => b.score - a.score);

        const best = ranked[0];
        // 제목 유사도가 충분히 확보된 경우만 사용해 엉뚱한 판본 연결을 방지합니다.
        if (!best || best.score < 70) return null;

        const isbnRaw = String(best.candidate.isbn13 || best.candidate.isbn || '').replace(/[^0-9Xx]/g, '');
        const isbn13 = isbnRaw.length >= 13 ? isbnRaw.slice(-13) : '';
        if (!isbn13) return null;

        return {
          ...book,
          isbn13,
          bookname: best.candidate.bookname || best.candidate.title || book.bookname,
          authors: best.candidate.authors || best.candidate.author || book.authors,
          publisher: best.candidate.publisher || '',
          publication_year: best.candidate.publication_year || best.candidate.publicationYear || '',
          bookImageURL: best.candidate.bookImageURL || best.candidate.bookImageUrl || '',
          isCurated: true
        };
      })();

      curatedBookResolveCache.set(cacheKey, promise);
      return promise;
    }


    // 📖 큐레이션 도서 '책 정보'도 꼬리물기와 동일하게 ISBN을 먼저 자동 매칭합니다.
    // 정확한 ISBN이 확인되면 상세정보/대출횟수까지 바로 조회하고,
    // 매칭 실패 시에는 기존 제목·저자 정보로 상세 모달을 안전하게 엽니다.
    async function openCuratedBookDetail(buttonEl, encodedBookStr) {
      let book;
      try {
        book = JSON.parse(decodeURIComponent(encodedBookStr));
      } catch (e) {
        console.warn('큐레이션 도서 상세보기 데이터 해석 실패:', e);
        return;
      }

      if (book.isbn13) {
        openBookDetailModal(book);
        return;
      }

      const originalHtml = buttonEl ? buttonEl.innerHTML : '';
      if (buttonEl) {
        buttonEl.disabled = true;
        buttonEl.innerHTML = '🔎 ISBN 찾는 중...';
      }

      try {
        const resolved = await resolveCuratedBookIsbn(book);
        if (resolved?.isbn13) {
          openBookDetailModal(resolved);
        } else {
          // 잘못된 ISBN을 억지로 연결하지 않고 기존 기본정보로 표시
          openBookDetailModal(book);
        }
      } catch (e) {
        console.warn('큐레이션 도서 상세 ISBN 연결 실패:', e);
        openBookDetailModal(book);
      } finally {
        if (buttonEl) {
          buttonEl.disabled = false;
          buttonEl.innerHTML = originalHtml || '📖 책 정보';
        }
      }
    }

    async function startCuratedBookChain(buttonEl, encodedBookStr) {
      let book;
      try {
        book = JSON.parse(decodeURIComponent(encodedBookStr));
      } catch (e) {
        console.error(e);
        alert('도서 정보를 불러오지 못했어요. 다른 책으로 다시 시도해 주세요!');
        return;
      }

      if (book.isbn13) {
        triggerBookChain(encodeBookObject(book));
        return;
      }

      const originalHtml = buttonEl ? buttonEl.innerHTML : '';
      if (buttonEl) {
        buttonEl.disabled = true;
        buttonEl.innerHTML = '🔎 ISBN 찾는 중...';
      }

      try {
        const resolved = await resolveCuratedBookIsbn(book);
        if (!resolved?.isbn13) {
          alert(`📚 「${book.bookname}」의 정확한 ISBN 판본을 자동으로 확인하지 못했어요.\n잘못된 책으로 꼬리물기하지 않도록 연결을 중단했습니다.`);
          return;
        }
        triggerBookChain(encodeBookObject(resolved));
      } catch (e) {
        console.warn('큐레이션 도서 꼬리물기 준비 실패:', e);
        alert('📡 도서 ISBN 확인이 잠시 지연되고 있어요. 잠시 후 다시 시도해 주세요!');
      } finally {
        if (buttonEl) {
          buttonEl.disabled = false;
          buttonEl.innerHTML = originalHtml || '🔮 꼬리물기';
        }
      }
    }

    function renderYbtiParticipantPicks() {
      const wrap=document.getElementById('ybti-employee-picks-list');
      if(!wrap) return;
      const sameType=PARTICIPANTS.filter(p=>p && p.ybti===currentResultCode && String(p.bookname||'').trim());
      if(sameType.length===0){
        wrap.innerHTML=`<div style="background:#FFFFFF;border:1.5px dashed #F59E0B;border-radius:13px;padding:0.85rem;text-align:center;font-size:0.77rem;color:#92400E;line-height:1.5;">아직 <strong>${currentResultCode} ${ybtiResults[currentResultCode]?.alias||''}</strong> 용산 독자의 추천책이 쌓이지 않았어요.<br>내 추천책을 등록하면 실제 책축제 독서 데이터가 됩니다! 📚</div>`;
        return;
      }
      const grouped={};
      sameType.forEach(p=>{
        const title=String(p.bookname||'').trim(); const author=String(p.authors||'').trim();
        const key=`${title.toLowerCase()}__${author.toLowerCase()}`;
        if(!grouped[key]) grouped[key]={bookname:title,authors:author,count:0};
        grouped[key].count++;
      });
      const picks=Object.values(grouped).sort((a,b)=>b.count-a.count || a.bookname.localeCompare(b.bookname,'ko')).slice(0,5);
      wrap.innerHTML=picks.map((book,idx)=>{
        const encoded=encodeBookObject(book);
        return `<div style="background:#FFFFFF;border:1.5px solid #FDBA74;border-radius:12px;padding:0.72rem;margin-top:6px;"><div style="display:flex;align-items:center;gap:9px;"><span style="min-width:27px;height:27px;border-radius:50%;background:${idx===0?'#F59E0B':'#FFEDD5'};color:${idx===0?'#FFFFFF':'#9A3412'};border:1.5px solid #1E293B;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:900;">${idx+1}</span><div style="flex:1;min-width:0;"><button type="button" onclick="openCuratedBookDetail(this, '${encoded}')" style="display:block;width:100%;padding:0;border:0;background:transparent;text-align:left;cursor:pointer;font-family:inherit;"><strong style="display:block;font-size:0.8rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#1E293B;text-decoration:underline;text-decoration-style:dotted;text-underline-offset:3px;">${escapeHtml(book.bookname)}</strong></button><span style="font-size:0.68rem;color:#78716C;">${escapeHtml(book.authors||'저자 미상')} · ${book.count}명 PICK</span></div></div><div style="display:flex;gap:6px;margin-top:8px;padding-left:36px;"><button class="btn-explore-chain-sm" style="background:#0EA5E9;margin:0;flex:1;justify-content:center;" onclick="openCuratedBookDetail(this, '${encoded}')">📖 책 정보</button><button class="btn-explore-chain-sm" style="background:#8B5CF6;margin:0;flex:1;justify-content:center;" onclick="startCuratedBookChain(this, '${encoded}')">🔮 꼬리물기</button></div></div>`;
      }).join('');
    }

    function diversifyLoanDocGroups(groups, limit = 30) {
      const result = [];
      const seen = new Set();
      const maxLen = Math.max(0, ...groups.map(g => g.length));
      for (let i = 0; i < maxLen && result.length < limit; i++) {
        for (const group of groups) {
          const item = group[i];
          if (!item || !item.doc || !item.doc.bookname) continue;
          const d = item.doc;
          const key = String(d.isbn13 || '').trim() || `${String(d.bookname).trim()}__${String(d.authors || '').trim()}`;
          if (seen.has(key)) continue;
          seen.add(key);
          result.push(item);
          if (result.length >= limit) break;
        }
      }
      return result;
    }

    /* =========================================================================
       📚 [4. 도서관 정보나루 빅데이터 도서 큐레이션 및 꼬리물기 연동]
       ========================================================================= */
    function selectAgeFilter(ageCode) {
      currentAgeFilter = ageCode;
      document.querySelectorAll('.age-filter-btn').forEach(btn => btn.classList.remove('active'));
      const activeBtnId = ageCode ? `age-btn-${ageCode}` : 'age-btn-all';
      const targetBtn = document.getElementById(activeBtnId);
      if (targetBtn) targetBtn.classList.add('active');

      const ageBadgeText = ageCode ? `${ageCode === '8' ? '어린이' : ageCode + '대'} 맞춤 큐레이션` : '전체 연령 인기 대출 🌟';
      document.getElementById('user-matched-age-badge').innerText = ageBadgeText;

      const isAdultOrAll = (!ageCode || ['20','30','40','50'].includes(ageCode));
      const comicBadge = document.getElementById('comic-filter-badge');
      if (comicBadge) {
        comicBadge.style.display = isAdultOrAll ? 'inline-block' : 'none';
        comicBadge.innerText = '🛡️ 성인·전체 맞춤: 학습만화·어린이 도서 제외';
      }

      renderYbtiRecommendationOverview();
      loadYBTIAPI(ageCode);
    }

    async function loadYBTIAPI(ageCode = '') {
      const profile = getYbtiBookProfile();
      const kdcs = (profile.kdcs && profile.kdcs.length) ? profile.kdcs : ['8'];
      document.getElementById('ybti-book-type-label').innerText = `[${currentResultCode}] ${profile.categoryName}`;

      const loadingEl = document.getElementById('ybti-book-loading');
      const errorEl = document.getElementById('ybti-book-error');
      const listEl = document.getElementById('ybti-books-list');

      loadingEl.style.display = 'block';
      errorEl.style.display = 'none';
      listEl.innerHTML = '';
      setTopBookLoadingState();

      const today = new Date();

      // 당일 수집분이 아직 반영되지 않은 시간대에도 안정적으로 조회되도록
      // 인기대출 조회 종료일은 2일 전으로 잡습니다.
      const stableEnd = new Date(today);
      stableEnd.setDate(stableEnd.getDate() - 2);
      const endDt = stableEnd.toISOString().split('T')[0];

      const reqSize = (!ageCode || ['20','30','40','50'].includes(ageCode)) ? 40 : 20;

      function getAgeRange(code) {
        const ranges = {
          '8':  { from: 8,  to: 13 },
          '14': { from: 14, to: 19 },
          '20': { from: 20, to: 29 },
          '30': { from: 30, to: 39 },
          '40': { from: 40, to: 49 },
          '50': { from: 50, to: 100 }
        };
        return ranges[String(code || '')] || null;
      }

      function buildLoanUrl(kdc, { useAge = true, useKdc = true, widePeriod = false } = {}) {
        const periodStart = new Date(stableEnd);
        periodStart.setMonth(stableEnd.getMonth() - (widePeriod ? 12 : 3));
        const queryStartDt = periodStart.toISOString().split('T')[0];

        let url = `${DATA4LIBRARY_API_BASE}/loanItemSrch?authKey=${AUTH_KEY}&startDt=${queryStartDt}&endDt=${endDt}&pageSize=${reqSize}&pageNo=1&format=json`;

        // 공식 API 규격: age 단일값이 아니라 from_age / to_age 사용
        if (useAge && ageCode) {
          const range = getAgeRange(ageCode);
          if (range) {
            url += `&from_age=${range.from}&to_age=${range.to}`;
          }
        }

        if (useKdc && kdc) url += `&kdc=${encodeURIComponent(kdc)}`;
        return url;
      }

      async function fetchKdcGroups({ useAge = true, useKdc = true, widePeriod = false } = {}) {
        if (!useKdc) {
          const data = await fetchData4LibraryJson(buildLoanUrl('', { useAge, useKdc:false, widePeriod }), 1);
          return [data?.response?.docs || []];
        }

        const settled = await Promise.allSettled(
          kdcs.map(kdc => fetchData4LibraryJson(buildLoanUrl(kdc, { useAge, useKdc:true, widePeriod }), 1))
        );

        return settled.map(result =>
          result.status === 'fulfilled' ? (result.value?.response?.docs || []) : []
        );
      }

      const requestPlans = [
        { opts:{ useAge:true, useKdc:true, widePeriod:false }, note:'유형별 복수 관심분야' }
      ];
      if (ageCode) requestPlans.push({ opts:{ useAge:false, useKdc:true, widePeriod:false }, note:'전체 연령 + 복수 관심분야' });
      requestPlans.push({ opts:{ useAge:false, useKdc:true, widePeriod:true }, note:'12개월 + 복수 관심분야' });
      requestPlans.push({ opts:{ useAge:false, useKdc:false, widePeriod:true }, note:'12개월 전체 인기대출' });

      try {
        let docs = [];
        let lastError = null;

        // 🛡️ 추천 결과 필터
        // 핵심: API 응답을 받은 "뒤" 한 번만 거르는 것이 아니라,
        // 각 조회 단계마다 필터링한 뒤 실제로 남는 책이 있을 때만 해당 단계를 채택합니다.
        function filterRecommendationCandidates(items) {
          let filtered = (items || []).filter(item => item && item.doc && item.doc.bookname);

          // 성인(20·30·40·50+) 및 '전체' 추천에서는 학습만화/어린이 계열 공통 제외
          // 어린이·청소년(8·14)은 기존대로 유지합니다.
          const shouldApplyAdultBookFilter = (!ageCode || ['20','30','40','50'].includes(ageCode));
          if (shouldApplyAdultBookFilter) {
            const adultBookExcludes = [
              'why?', '흔한남매', '마법천자문', '그리스 로마', '설민석', '쿠키런',
              '에그박사', '신비아파트', '카카오프렌즈', '자두', '살아남기', '보물찾기',
              '도티', '잠뜰', '엉덩이 탐정', '나무집', '추리천재', '급식왕',
              '학습만화', '학습 만화', '만화', '어린이', '의사 어벤져스', '의사어벤져스'
            ];
            filtered = filtered.filter(item => {
              const d = item?.doc || {};
              const haystack = [d.bookname, d.authors, d.publisher]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
              return !adultBookExcludes.some(kw => haystack.includes(String(kw).toLowerCase()));
            });
          }

          // '백앤아'는 어린이(8)에서만 허용
          if (ageCode !== '8') {
            filtered = filtered.filter(item => {
              const d = item?.doc || {};
              const haystack = [d.bookname, d.authors, d.publisher]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
              return !haystack.includes('백앤아');
            });
          }

          return filtered;
        }

        // ① 연령+YBTI 관심분야
        // ② 전체연령+YBTI 관심분야
        // ③ 12개월+YBTI 관심분야
        // ④ 12개월 전체 인기대출
        // 순서대로 시도하되 필터 후 1권이라도 남아야 성공으로 간주합니다.
        for (const plan of requestPlans) {
          try {
            const groups = await fetchKdcGroups(plan.opts);
            const candidateDocs = diversifyLoanDocGroups(groups, 36);
            const usableDocs = filterRecommendationCandidates(candidateDocs);

            if (usableDocs.length > 0) {
              docs = usableDocs;
              console.info(`YBTI 추천도서 조회 성공: ${plan.note} / 필터 후 ${usableDocs.length}권`);
              break;
            }

            console.info(`YBTI 추천도서 재시도: ${plan.note} / 필터 후 0권`);
          } catch (e) {
            lastError = e;
            console.warn(`YBTI 추천도서 조회 단계 실패: ${plan.note}`, e);
          }
        }

        docs = docs.slice(0, 10);

        if (docs.length === 0) {
          applyYbtiFallbackBook();
          listEl.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:1.6rem; font-size:0.82rem; color:#64748B; background:#FFFBEB; border:2px dashed #FDE68A; border-radius:14px;">
              📚 도서관 정보나루 실시간 응답을 받지 못했어요.<br>
              위의 <strong>푸용이 YBTI 대표 PICK 3권</strong>을 먼저 즐겨주세요.<br>
              <span style="font-size:0.74rem; color:#94A3B8;">잠시 후 연령 버튼을 다시 누르면 실시간 데이터를 재조회할 수 있습니다.</span>
            </div>`;
          if (lastError) console.warn('도서관 정보나루 최종 조회 실패:', lastError);
          return;
        }

        // 기존 결과카드의 1권 추천은 실시간 데이터 1위 도서로 유지합니다.
        const topBook = docs[0].doc;
        const topImg = (topBook.bookImageURL && topBook.bookImageURL.startsWith('http')) ? topBook.bookImageURL : '';
        setTopBookCard({
          isbn13: topBook.isbn13 || '',
          bookname: topBook.bookname,
          authors: topBook.authors || '저자 미상',
          bookImageURL: topImg,
          loanCount: topBook.loan_count ?? null,
          publisher: topBook.publisher || '',
          publication_year: topBook.publication_year || '',
          rank: 1
        }, false);

        listEl.innerHTML = docs.map((item, idx) => {
          const b = item.doc;
          const rankNum = idx + 1;
          const img = (b.bookImageURL && b.bookImageURL.startsWith('http')) ? b.bookImageURL : '';
          const naverLink = `https://search.naver.com/search.naver?where=nexearch&query=${encodeURIComponent(b.bookname)}`;

          let rankBadgeBg = '#6366F1';
          if (rankNum === 1) rankBadgeBg = '#F59E0B';
          else if (rankNum === 2) rankBadgeBg = '#64748B';
          else if (rankNum === 3) rankBadgeBg = '#B45309';

          const bookJsonStr = encodeURIComponent(JSON.stringify({
            isbn13: b.isbn13 || '',
            bookname: b.bookname || '',
            authors: b.authors || '',
            bookImageURL: img,
            loanCount: (b.loan_count !== undefined && b.loan_count !== null) ? Number(b.loan_count) : null,
            publisher: b.publisher || '',
            publication_year: b.publication_year || '',
            rank: rankNum
          }));

          const imageHtml = img
            ? `<img src="${img}" style="width:100%; height:100%; object-fit:cover;" loading="lazy" onerror="this.style.display='none'"/>`
            : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#94A3B8;font-size:0.72rem;font-weight:800;">📚 표지 준비 중</div>`;

          return `
            <div style="background:white; border:2px solid #1E293B; border-radius:16px; padding:8px; display:flex; flex-direction:column; justify-content:space-between; text-align:center; box-shadow:var(--retro-shadow-sm); transition:transform 0.15s ease;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
              <div>
                <div style="position:relative; width:100%; height:135px; border-radius:10px; overflow:hidden; margin-bottom:6px; background:#f1f5f9; border:1px solid #1E293B;">
                  <span style="position:absolute; top:4px; left:4px; background:${rankBadgeBg}; color:#fff; font-size:0.65rem; font-weight:900; padding:2px 6px; border-radius:4px; border:1px solid #1E293B; z-index:2;">${rankNum}위</span>
                  ${imageHtml}
                </div>
                <a href="${naverLink}" target="_blank" style="font-size:0.76rem; font-weight:900; color:#1E293B; text-decoration:none; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; line-height:1.3;" title="${escapeHtml(b.bookname)}">
                  ${escapeHtml(b.bookname)}
                </a>
                <p style="font-size:0.65rem; color:#94A3B8; margin-top:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(b.authors || '저자 미상')}</p>
              </div>
              <div>
                <button class="btn-explore-chain-sm" style="width:100%; justify-content:center; margin-top:6px; background:#0EA5E9;" onclick="openBookDetailFromEncoded('${bookJsonStr}')">
                  <i class="fa-solid fa-circle-info"></i> 📖 책 정보
                </button>
                <button class="btn-explore-chain-sm" style="width:100%; justify-content:center; margin-top:4px;" onclick="triggerBookChain('${bookJsonStr}')">
                  <i class="fa-solid fa-wand-magic-sparkles"></i> 🔮 꼬리물기
                </button>
                <div style="margin-top:6px; padding-top:4px; border-top:1px dashed #CBD5E1; font-size:0.68rem; font-weight:900; color:#6366F1;">
                  🔥 ${Number(b.loan_count||0).toLocaleString()}회 대출
                </div>
              </div>
            </div>
          `;
        }).join('');
      } catch (e) {
        console.warn('도서 정보 조회 오류:', e);
        applyYbtiFallbackBook();
        errorEl.innerHTML = `실시간 도서 데이터 연결이 잠시 지연되고 있습니다.<br>위의 <strong>YBTI 대표 추천 3권</strong>과 독자 PICK을 먼저 살펴보세요.`;
        errorEl.style.display = 'block';
      } finally {
        loadingEl.style.display = 'none';
      }
    }

    function startChainFromTopBook() {
      if (!currentTargetBook.isbn13) {
        alert('📚 현재 도서는 실시간 API 연결 지연 시 표시되는 YBTI 추천도서입니다. 꼬리물기는 실시간 도서 데이터가 연결된 뒤 이용해 주세요!');
        return;
      }
      triggerBookChain(encodeURIComponent(JSON.stringify(currentTargetBook)));
    }

    function triggerBookChain(encodedBookStr) {
      try {
        const bookObj = JSON.parse(decodeURIComponent(encodedBookStr));
        currentTargetBook = bookObj;
      } catch (e) {
        console.error(e);
      }

      switchResultTab(6);
      updateChainSourceHeader();
      loadRecommendChainAPI();
    }

    function switchRecommendType(type) {
      currentRecommendType = type;
      document.getElementById('type-btn-mania').classList.toggle('active', type === 'mania');
      document.getElementById('type-btn-reader').classList.toggle('active', type === 'reader');
      loadRecommendChainAPI();
    }

    function updateChainSourceHeader() {
      document.getElementById('chain-source-img').src = currentTargetBook.bookImageURL || './assets/images/book-placeholder.svg';
      document.getElementById('chain-source-title').innerText = currentTargetBook.bookname || '선택한 도서';
      document.getElementById('chain-source-author').innerText = currentTargetBook.authors || '저자 미상';
      const loanEl = document.getElementById('chain-source-loan');
      if (loanEl) {
        loanEl.innerText = (currentTargetBook.loanCount !== undefined && currentTargetBook.loanCount !== null)
          ? `🔥 ${Number(currentTargetBook.loanCount).toLocaleString()}회 대출`
          : '대출횟수 자료 없음';
      }
    }

    // 🔥 꼬리물기 추천도서의 대출횟수는 추천 API 응답에 없을 수 있어
    // 도서상세 API(loaninfoYN=Y)로 비동기 보강합니다. 카드 목록은 먼저 보여주고 횟수만 뒤이어 채웁니다.
    function extractLoanCountFromDetail(data) {
      const preferredKeys = ['loanCnt', 'loan_count', 'loanCount', 'loan_cnt'];
      let found = null;

      function walk(node) {
        if (found !== null || node === null || node === undefined) return;
        if (Array.isArray(node)) {
          for (const item of node) walk(item);
          return;
        }
        if (typeof node !== 'object') return;

        for (const key of preferredKeys) {
          if (Object.prototype.hasOwnProperty.call(node, key)) {
            const n = Number(String(node[key]).replace(/,/g, ''));
            if (Number.isFinite(n)) { found = n; return; }
          }
        }
        for (const value of Object.values(node)) walk(value);
      }

      walk(data);
      return found;
    }

    // 📖 선택 도서 상세 정보 모달
    let bookDetailLoanChartInstance = null;

    function escapeHtml(value = '') {
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function openBookDetailFromEncoded(encodedBookStr) {
      try {
        openBookDetailModal(JSON.parse(decodeURIComponent(encodedBookStr)));
      } catch (e) {
        console.warn('도서 상세보기 데이터 해석 실패:', e);
      }
    }

    function buildYongsanLibrarySearchUrl(book) {
      // 용산꿈나무도서관 검색 화면이지만 검색 범위는 '용산구립도서관 전체'입니다.
      const base = 'https://www.yslibrary.or.kr/dream/menu/10102/program/30037/searchResultList.do';
      const p = new URLSearchParams({
        bookKey: '', currentPageNo: '1', preSearchKey: 'TITLE',
        preSearchKeyword: book.bookname || '', publishFormCode: '', reSearchYn: 'N', recKey: '',
        searchCategory: 'BOOK', searchKdc: '', searchKey: 'TITLE',
        searchKey1: '', searchKey2: '', searchKey3: '', searchKey4: '', searchKey5: '',
        searchKeyword: book.bookname || '', searchKeyword1: '', searchKeyword2: '', searchKeyword3: '', searchKeyword4: '', searchKeyword5: '',
        searchLibrary: '', searchOrder: 'DESC', searchPublishEndYear: '', searchPublishStartYear: '', searchRoom: '',
        searchSort: 'KEY', searchType: 'SIMPLE', viewStatus: 'IMAGE'
      });
      return `${base}?${p.toString()}`;
    }

    function getFirstValueByKeys(data, keys) {
      let found = '';
      function walk(node) {
        if (found !== '' || node == null) return;
        if (Array.isArray(node)) { for (const x of node) walk(x); return; }
        if (typeof node !== 'object') return;
        for (const key of keys) {
          if (Object.prototype.hasOwnProperty.call(node, key) && node[key] !== null && node[key] !== '') {
            found = node[key]; return;
          }
        }
        for (const value of Object.values(node)) walk(value);
      }
      walk(data);
      return found;
    }

    function extractMonthlyLoanTrend(data) {
      let best = [];
      function walk(node) {
        if (Array.isArray(node)) {
          const candidate = node.map(x => {
            if (!x || typeof x !== 'object') return null;
            const rawLabel = x.month || x.ym || x.yearMonth || x.loanMonth || x.date || x.dt || '';
            const rawCount = x.loanCnt ?? x.loan_count ?? x.loanCount ?? x.loan_cnt ?? x.count ?? null;
            const label = String(rawLabel);
            const count = Number(String(rawCount ?? '').replace(/,/g, ''));
            if (!label || !Number.isFinite(count) || !/\d{4}[-./]?\d{1,2}/.test(label)) return null;
            return { label, count };
          }).filter(Boolean);
          if (candidate.length > best.length) best = candidate;
          for (const x of node) walk(x);
          return;
        }
        if (node && typeof node === 'object') for (const value of Object.values(node)) walk(value);
      }
      walk(data);
      return best.slice(-12);
    }

    function renderBookDetailTrend(trend) {
      const section = document.getElementById('book-detail-trend-section');
      if (bookDetailLoanChartInstance) {
        bookDetailLoanChartInstance.destroy();
        bookDetailLoanChartInstance = null;
      }
      if (!trend || trend.length < 2 || typeof Chart === 'undefined') {
        section.style.display = 'none';
        return;
      }
      section.style.display = 'block';
      const ctx = document.getElementById('bookDetailLoanChart').getContext('2d');
      if (typeof Chart !== 'function') return;
      bookDetailLoanChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: trend.map(x => x.label),
          datasets: [{ data: trend.map(x => x.count), borderWidth: 2.5, tension: 0.35, fill: true, pointRadius: 3 }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 9 } } },
            y: { beginAtZero: true, ticks: { font: { size: 9 } } }
          }
        }
      });
    }

    function setBookDetailBasic(book) {
      const coverWrap = document.getElementById('book-detail-cover-wrap');
      if (book.bookImageURL) {
        coverWrap.innerHTML = `<img class="book-detail-cover" src="${escapeHtml(book.bookImageURL)}" alt="${escapeHtml(book.bookname || '도서 표지')}" onerror="this.parentElement.innerHTML='<div class=&quot;book-detail-cover-placeholder&quot;>📚<br>표지 준비 중</div>'">`;
      } else {
        coverWrap.innerHTML = '<div class="book-detail-cover-placeholder">📚<br>표지 준비 중</div>';
      }
      document.getElementById('book-detail-title').innerText = book.bookname || '도서명 없음';
      document.getElementById('book-detail-author').innerText = book.authors || '저자 미상';
      document.getElementById('book-detail-publisher').innerText = book.publisher || '-';
      document.getElementById('book-detail-year').innerText = book.publication_year ? `(${book.publication_year})` : '';
      document.getElementById('book-detail-isbn').innerText = book.isbn13 || '-';
      document.getElementById('book-detail-loan').innerText = (book.loanCount !== null && book.loanCount !== undefined)
        ? `${Number(book.loanCount).toLocaleString()}회` : '확인 중...';
      const rank = document.getElementById('book-detail-rank');
      rank.style.display = book.rank ? 'inline-block' : 'none';
      if (book.rank) rank.innerText = `순위 #${book.rank}`;
      document.getElementById('book-detail-kdc').style.display = 'none';
      document.getElementById('book-detail-description').innerText = book.isFallback
        ? '현재 도서는 실시간 데이터 연결 지연 시 제공되는 YBTI 기본 추천도서입니다.'
        : '책 소개 정보를 확인하고 있습니다.';
      document.getElementById('book-detail-trend-section').style.display = 'none';

      const open = (url) => window.open(url, '_blank', 'noopener,noreferrer');
      document.getElementById('book-detail-library-btn').onclick = () => open(buildYongsanLibrarySearchUrl(book));
      document.getElementById('book-detail-naver-btn').onclick = () => open(`https://search.naver.com/search.naver?where=nexearch&query=${encodeURIComponent((book.bookname || '') + ' 책')}`);
      document.getElementById('book-detail-kyobo-btn').onclick = () => open(`https://search.kyobobook.co.kr/search?keyword=${encodeURIComponent(book.bookname || '')}`);
      document.getElementById('book-detail-aladin-btn').onclick = () => open(`https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=All&SearchWord=${encodeURIComponent(book.bookname || '')}`);
    }

    async function openBookDetailModal(book) {
      if (!book || !book.bookname) return;
      const modal = document.getElementById('bookDetailModal');
      const loading = document.getElementById('book-detail-loading');
      const content = document.getElementById('book-detail-content');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      setBookDetailBasic(book);

      if (!book.isbn13) {
        loading.style.display = 'none';
        content.style.display = 'block';
        document.getElementById('book-detail-loan').innerText = '실시간 ISBN 연결 후 확인 가능';
        return;
      }

      loading.style.display = 'block';
      content.style.display = 'block';
      try {
        const url = `${DATA4LIBRARY_API_BASE}/srchDtlList?authKey=${AUTH_KEY}&isbn13=${encodeURIComponent(book.isbn13)}&loaninfoYN=Y&format=json`;
        const data = await fetchData4LibraryJson(url, 1);

        const detailTitle = getFirstValueByKeys(data, ['bookname', 'bookName', 'title']);
        const authors = getFirstValueByKeys(data, ['authors', 'author']);
        const publisher = getFirstValueByKeys(data, ['publisher']);
        const year = getFirstValueByKeys(data, ['publication_year', 'publicationYear', 'publication_date', 'publicationDate']);
        const image = getFirstValueByKeys(data, ['bookImageURL', 'bookImageUrl', 'imageUrl']);
        const description = getFirstValueByKeys(data, ['description', 'bookDtl', 'bookDescription', 'bookIntro', 'book_intro']);
        const kdc = getFirstValueByKeys(data, ['class_nm', 'className', 'kdcName', 'class_no', 'classNo', 'kdc']);
        const loanCount = extractLoanCountFromDetail(data);

        const merged = {
          ...book,
          bookname: detailTitle || book.bookname,
          authors: authors || book.authors,
          publisher: publisher || book.publisher,
          publication_year: String(year || book.publication_year || '').slice(0, 10),
          bookImageURL: image || book.bookImageURL,
          loanCount: loanCount !== null ? loanCount : book.loanCount
        };
        setBookDetailBasic(merged);

        if (kdc) {
          const kdcEl = document.getElementById('book-detail-kdc');
          kdcEl.innerText = `분류 ${kdc}`;
          kdcEl.style.display = 'inline-block';
        }
        document.getElementById('book-detail-description').innerText = description || '도서관 정보나루에서 제공된 책 소개 정보가 없습니다.';
        document.getElementById('book-detail-loan').innerText = (merged.loanCount !== null && merged.loanCount !== undefined)
          ? `${Number(merged.loanCount).toLocaleString()}회` : '대출횟수 집계 정보 없음';
        renderBookDetailTrend(extractMonthlyLoanTrend(data));
      } catch (e) {
        console.warn('도서 상세 정보 조회 실패:', e);
        document.getElementById('book-detail-description').innerText = '책 상세 정보 연결이 잠시 지연되고 있습니다. 용산구립도서관 소장자료 검색은 바로 이용할 수 있어요.';
        if (book.loanCount === null || book.loanCount === undefined) document.getElementById('book-detail-loan').innerText = '대출횟수 연결 지연';
      } finally {
        loading.style.display = 'none';
      }
    }

    function closeBookDetailModal(e) {
      if (e && e.target !== e.currentTarget && !e.target.classList.contains('modal-close-btn')) return;
      document.getElementById('bookDetailModal').style.display = 'none';
      document.body.style.overflow = '';
      if (bookDetailLoanChartInstance) {
        bookDetailLoanChartInstance.destroy();
        bookDetailLoanChartInstance = null;
      }
    }

    async function fetchBookLoanCount(isbn13) {
      if (!isbn13) return null;
      try {
        const url = `${DATA4LIBRARY_API_BASE}/srchDtlList?authKey=${AUTH_KEY}&isbn13=${encodeURIComponent(isbn13)}&loaninfoYN=Y&format=json`;
        const data = await fetchData4LibraryJson(url, 1);
        return extractLoanCountFromDetail(data);
      } catch (e) {
        console.warn('대출횟수 보강 조회 실패:', isbn13, e);
        return null;
      }
    }

    async function hydrateChainLoanCounts(books) {
      await Promise.allSettled(books.map(async (b, idx) => {
        const count = await fetchBookLoanCount(b.isbn13 || '');
        const el = document.getElementById(`chain-loan-count-${idx}`);
        if (!el) return;
        if (count !== null) {
          el.innerText = `🔥 ${Number(count).toLocaleString()}회 대출`;
        } else {
          el.innerText = '🔥 대출횟수 집계 정보 없음';
          el.style.color = '#94A3B8';
        }
      }));
    }

    async function loadRecommendChainAPI() {
      const loadingEl = document.getElementById('chain-book-loading');
      const emptyEl = document.getElementById('chain-book-empty');
      const listEl = document.getElementById('chain-books-list');

      loadingEl.style.display = 'block';
      emptyEl.style.display = 'none';
      listEl.innerHTML = '';

      const isbn13 = currentTargetBook.isbn13 || '';
      if (!isbn13) {
        loadingEl.style.display = 'none';
        emptyEl.style.display = 'block';
        emptyEl.innerHTML = `📚 현재 선택한 도서는 실시간 API 대체 추천도서라 연관 대출 ISBN이 없습니다.<br>실시간 추천도서가 연결된 뒤 <strong>[🔮 꼬리물기]</strong>를 이용해 주세요! 🦖`;
        return;
      }

      const targetUrl = `${DATA4LIBRARY_API_BASE}/recommandList?authKey=${AUTH_KEY}&isbn13=${encodeURIComponent(isbn13)}&type=${encodeURIComponent(currentRecommendType)}&format=json`;

      try {
        const data = await fetchData4LibraryJson(targetUrl, 2);
        let docs = data?.response?.docs || [];

        if (docs.length === 0) {
          emptyEl.style.display = 'block';
          emptyEl.innerHTML = `💡 이 도서의 연관 추천 데이터가 아직 충분하지 않습니다.<br>다른 실시간 추천 도서의 <strong>[🔮 꼬리물기]</strong>를 눌러보세용! 🦖`;
        } else {
          docs = docs.slice(0, 10);
          listEl.innerHTML = docs.map((item, idx) => {
            const b = item.book || item.doc || {};
            const img = (b.bookImageURL && b.bookImageURL.startsWith('http')) ? b.bookImageURL : '';
            const naverLink = `https://search.naver.com/search.naver?where=nexearch&query=${encodeURIComponent(b.bookname || '')}`;

            const nextBookStr = encodeURIComponent(JSON.stringify({
              isbn13: b.isbn13 || '',
              bookname: b.bookname || '',
              authors: b.authors || '',
              bookImageURL: img,
              loanCount: null,
              publisher: b.publisher || '',
              publication_year: b.publication_year || '',
              rank: null
            }));

            const imageHtml = img
              ? `<img src="${img}" style="width:100%; height:100%; object-fit:cover;" loading="lazy" onerror="this.style.display='none'"/>`
              : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#94A3B8;font-size:0.72rem;font-weight:800;">📚 표지 준비 중</div>`;

            return `
              <div style="background:white; border:2px solid #1E293B; border-radius:16px; padding:8px; display:flex; flex-direction:column; justify-content:space-between; text-align:center; box-shadow:var(--retro-shadow-sm); transition:transform 0.15s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                <div>
                  <div style="position:relative; width:100%; height:135px; border-radius:10px; overflow:hidden; margin-bottom:6px; background:#f5f3ff; border:1px solid #1E293B;">
                    <span style="position:absolute; top:4px; left:4px; background:#8B5CF6; color:#fff; font-size:0.65rem; font-weight:900; padding:2px 6px; border-radius:4px; border:1px solid #1E293B; z-index:2;">추천 ${idx+1}</span>
                    ${imageHtml}
                  </div>
                  <a href="${naverLink}" target="_blank" style="font-size:0.76rem; font-weight:900; color:#1E293B; text-decoration:none; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; line-height:1.3;" title="${b.bookname || ''}">
                    ${b.bookname || '도서명 없음'}
                  </a>
                  <p style="font-size:0.65rem; color:#94A3B8; margin-top:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${b.authors || '저자 미상'}</p>
                  <div id="chain-loan-count-${idx}" style="margin-top:6px; padding-top:4px; border-top:1px dashed #CBD5E1; font-size:0.68rem; font-weight:900; color:#6366F1;">
                    대출횟수 자료 없음
                  </div>
                </div>
                <div style="display:flex; flex-direction:column; gap:4px; margin-top:8px;">
                  <button class="btn-explore-chain-sm" style="width:100%; justify-content:center; background:#0EA5E9;" onclick="openBookDetailFromEncoded('${nextBookStr}')">
                    <i class="fa-solid fa-circle-info"></i> 📖 책 정보
                  </button>
                  <button class="btn-explore-chain-sm" style="width:100%; justify-content:center;" onclick="triggerBookChain('${nextBookStr}')">
                    <i class="fa-solid fa-arrow-right"></i> 또 꼬리물기
                  </button>
                  <button class="btn-explore-chain-sm" style="background:#F59E0B; width:100%; justify-content:center;" onclick="pickAsMyRecommendBook(decodeURIComponent('${encodeURIComponent(b.bookname || '')}'), decodeURIComponent('${encodeURIComponent(b.authors || '')}'))">
                    <i class="fa-solid fa-bookmark"></i> 이 책을 내 추천책으로 픽!
                  </button>
                </div>
              </div>
            `;
          }).join('');
          // 추천카드는 즉시 보여주고, 각 도서의 실제 대출횟수는 백그라운드에서 순차 보강
          hydrateChainLoanCounts(docs.map(item => item.book || item.doc || {}));
        }
      } catch (e) {
        console.warn('연관 추천도서 조회 오류:', e);
        emptyEl.style.display = 'block';
        emptyEl.innerHTML = `📡 연관 추천 데이터 연결이 잠시 지연되고 있습니다.<br>잠시 후 다시 시도하거나 다른 실시간 추천도서에서 <strong>[🔮 꼬리물기]</strong>를 이용해 주세요! 🦖`;
      } finally {
        loadingEl.style.display = 'none';
      }
    }

    /* 📖 16종 도감 모달 */
    function openGalleryModal() {
      const modal = document.getElementById('gallery-modal');
      const grid = document.getElementById('gallery-grid-list');
      grid.innerHTML = Object.keys(ybtiResults).map(code => {
        const item = ybtiResults[code];
        return `
          <div class="gallery-item">
            <div style="width:65px; height:65px; margin:0 auto 4px;">${getOfficialYongYongSVG(code, 65)}</div>
            <span style="font-size:0.75rem; font-weight:900; color:#6366F1; display:block;">${code}</span>
            <h4 style="font-size:0.86rem; font-weight:900; color:#1E293B; margin-bottom:2px;">${item.alias}</h4>
            <p style="font-size:0.7rem; color:#64748B; line-height:1.3;">${item.slogan}</p>
          </div>
        `;
      }).join('');
      modal.style.display = 'flex';
    }

    // 📚 용산 독자 추천책 모달
    function openParticipantBookModal() {
      const modal = document.getElementById('employeeBookModal');
      const listEl = document.getElementById('employee-book-list');
      const summaryEl = document.getElementById('employee-book-summary');
      if (!modal || !listEl || !summaryEl) return;

      const employeesWithBooks = PARTICIPANTS.filter(e =>
        e && String(e.bookname || '').trim()
      );

      if (employeesWithBooks.length === 0) {
        summaryEl.innerText = '아직 등록된 용산 독자 추천책이 없습니다.';
        listEl.innerHTML = `
          <div style="grid-column:1/-1;text-align:center;padding:2rem 1rem;background:#F8FAFC;border:2px dashed #CBD5E1;border-radius:16px;">
            <div style="font-size:2.5rem;margin-bottom:.6rem;">📖</div>
            <strong style="display:block;font-size:1rem;color:#1E293B;margin-bottom:.4rem;">첫 번째 추천책을 등록해 주세요!</strong>
            <span style="font-size:.78rem;color:#64748B;">YBTI 등록 시 선택한 책이 이곳에 함께 쌓입니다.</span>
          </div>`;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        return;
      }

      const grouped = {};
      employeesWithBooks.forEach(e => {
        const title = String(e.bookname || '').trim();
        const author = String(e.authors || '').trim();
        const key = `${title.toLowerCase()}__${author.toLowerCase()}`;

        if (!grouped[key]) {
          grouped[key] = {
            bookname: title,
            authors: author,
            count: 0,
            ybtis: new Set()
          };
        }
        grouped[key].count += 1;
        if (e.ybti) grouped[key].ybtis.add(e.ybti);
      });

      const books = Object.values(grouped)
        .sort((a, b) => b.count - a.count || a.bookname.localeCompare(b.bookname, 'ko'));

      const uniqueTypes = new Set(employeesWithBooks.map(e => e.ybti).filter(Boolean));
      summaryEl.innerText = `총 ${employeesWithBooks.length}건의 독자 추천 · ${books.length}종 도서 · ${uniqueTypes.size}개 YBTI 유형 참여`;

      listEl.innerHTML = books.map((book, idx) => {
        const typeBadges = [...book.ybtis].slice(0, 4).map(code => {
          const alias = ybtiResults[code]?.alias || '';
          return `<span style="display:inline-block;font-size:.64rem;font-weight:900;background:#EEF2FF;color:#4338CA;border:1px solid #CBD5E1;border-radius:999px;padding:2px 7px;margin:2px;">${escapeHtml(code)}${alias ? ` · ${escapeHtml(alias)}` : ''}</span>`;
        }).join('');

        const moreTypeCount = Math.max(0, book.ybtis.size - 4);
        const encoded = encodeBookObject({
          bookname: book.bookname,
          authors: book.authors,
          isCurated: true
        });

        return `
          <div style="background:#FFFFFF;border:2px solid #1E293B;border-radius:15px;padding:.85rem;box-shadow:var(--retro-shadow-sm);">
            <div style="display:flex;align-items:flex-start;gap:9px;">
              <span style="min-width:30px;height:30px;border-radius:50%;background:${idx < 3 ? '#F59E0B' : '#FFEDD5'};color:${idx < 3 ? '#FFFFFF' : '#9A3412'};border:1.5px solid #1E293B;display:flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:900;">${idx+1}</span>
              <div style="flex:1;min-width:0;">
                <button type="button" onclick="openCuratedBookDetail(this, '${encoded}')" style="border:0;background:none;padding:0;text-align:left;cursor:pointer;width:100%;">
                  <strong style="display:block;font-size:.9rem;line-height:1.35;color:#1E293B;">${escapeHtml(book.bookname)}</strong>
                </button>
                <span style="display:block;font-size:.7rem;color:#64748B;margin-top:2px;">${escapeHtml(book.authors || '저자 미상')}</span>
              </div>
              <span style="font-size:.68rem;font-weight:900;color:#B45309;background:#FEF3C7;border:1px solid #F59E0B;border-radius:999px;padding:3px 7px;">${book.count}명 추천</span>
            </div>
            <div style="margin-top:8px;">${typeBadges}${moreTypeCount ? `<span style="font-size:.64rem;font-weight:900;color:#64748B;margin-left:4px;">외 ${moreTypeCount}유형</span>` : ''}</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:9px;">
              <button type="button" class="btn-explore-chain-sm" onclick="openCuratedBookDetail(this, '${encoded}')" style="background:#0EA5E9;">
                📖 책 정보
              </button>
              <button type="button" class="btn-explore-chain-sm" onclick="startCuratedBookChain(this, '${encoded}')">
                🔮 꼬리물기
              </button>
            </div>
          </div>`;
      }).join('');

      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function closeParticipantBookModal(e) {
      if (e && e.target !== e.currentTarget && !e.target.classList.contains('modal-close-btn')) return;
      const modal = document.getElementById('employeeBookModal');
      if (modal) modal.style.display = 'none';
      document.body.style.overflow = '';
    }

    function closeGalleryModal() { document.getElementById('gallery-modal').style.display = 'none'; }

    /* 🔒 관리자 통계 모달 */
    function openStatsModal() {
      document.getElementById('statsModal').style.display = 'flex';
      document.getElementById('authSection').style.display = 'block';
      document.getElementById('statsDashboard').style.display = 'none';
      document.getElementById('adminPw').value = '';
    }
    function closeStatsModal() { document.getElementById('statsModal').style.display = 'none'; }
    function verifyPassword() { alert('중앙 관리자 인증은 아직 연결 전입니다. 로컬 기기 관리·백업은 별도 화면에서 이용하세요.'); }
    function renderAdminStatsList() {
      const stats = getStoredStats();
      const wrap = document.getElementById('adminStatList');
      wrap.innerHTML = Object.keys(stats).map(k => `
        <div style="display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px solid #CBD5E1;">
          <span><strong>${k}</strong> (${ybtiResults[k]?.alias || ''})</span>
          <span><strong>${stats[k]}</strong> 명</span>
        </div>
      `).join('');
    }
    function exportStatsToCSV() {
      const stats = getStoredStats();
      let csv = "\uFEFF유형코드,유형명,누적참여인원수\n";
      Object.keys(stats).forEach(k => {
        csv += `"${k}","${ybtiResults[k]?.alias || ''}","${stats[k]}"\n`;
      });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
      link.download = `2026_용산구_책축제_YBTI_등록통계.csv`;
      link.click();
    }

    window.addEventListener('resize', updateJourneyTrailSVG);
    document.addEventListener("DOMContentLoaded", () => {
      initBoardGrid();
      document.getElementById('intro-yong-slot').innerHTML = getOfficialYongYongSVG('DEFAULT', 96);
      document.body.classList.add('quest-modal-open');
      loadGoogleSheetsParticipants(); // 책축제 새 구글시트 실시간 데이터 로드
    });
  
window.YBTI_LEGACY = {get type(){return currentResultCode;},get target(){return currentTargetBook;},setChainBook(book){currentTargetBook=book;}, get recommendType(){return currentRecommendType;},setParticipants(rows){PARTICIPANTS=rows;},get profiles(){return YBTI_BOOK_PROFILES;},get types(){return ybtiResults;}};
