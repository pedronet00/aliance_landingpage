
// Seleciona todos os botões de perguntas
const faqQuestions = document.querySelectorAll('.faq-question');

// Adiciona o evento de clique para cada pergunta
faqQuestions.forEach((question) => {
    question.addEventListener('click', () => {
    // Alterna a visibilidade da resposta
    const answer = question.nextElementSibling; // Pega a div de resposta ao lado da pergunta

    // Alterna a classe 'open' na resposta (abre ou fecha)
    answer.classList.toggle('open');

    // Alterna a classe 'open' na pergunta para mostrar o ícone de menos (+ ou -)
    question.classList.toggle('open');
    });
});

// Small helpers & behavior: reveal on scroll + modal + form submit
(function(){
    document.getElementById('year').textContent = new Date().getFullYear();

    // Reveal on scroll: simple intersection observer
    const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
        if(e.isIntersecting) e.target.classList.add('in');
    });
    }, {threshold: 0.12});

    document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

    // Card modal logic
    const cards = Array.from(document.querySelectorAll('.card'));
    const modal = document.getElementById('cardModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalClose = document.getElementById('modalClose');

    function openModal(title, desc){
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
    }
    function closeModal(){
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
    }
    cards.forEach(c=>{
    c.addEventListener('click', function(){
        openModal(this.dataset.title || this.querySelector('h4')?.textContent, this.dataset.desc || this.querySelector('p')?.textContent);
    });
    });
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e)=>{
    if(e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') closeModal(); });

    // Contact form submit (uses fetch)
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');
    // Adjust this to your API endpoint if needed:
    const FORM_ENDPOINT = '/contact';

    form.addEventListener('submit', function(ev){
    ev.preventDefault();
    feedback.textContent = 'Enviando...';
    const payload = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim()
    };

    // Basic validation
    if(!payload.name || !payload.email || !payload.message){ feedback.textContent = 'Preencha todos os campos.'; return; }

    fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    })
    .then(async res=>{
        if(!res.ok) throw new Error('HTTP ' + res.status);
        // assume JSON { status: 'success' } like original
        const json = await res.json().catch(()=>({}));
        if(json && (json.status === 'success' || res.status === 200)){
        feedback.style.color = 'green';
        feedback.textContent = 'Mensagem enviada com sucesso!';
        form.reset();
        setTimeout(()=> feedback.textContent = '', 3500);
        } else {
        feedback.style.color = 'crimson';
        feedback.textContent = 'Falha ao enviar. Tente novamente.';
        }
    })
    .catch(err=>{
        console.error('form error', err);
        feedback.style.color = 'crimson';
        feedback.textContent = 'Erro ao conectar com o servidor.';
    });
    });

    // Accessibility: keyboard focus for whatsapp button
    const whatsapp = document.getElementById('whatsappBtn');
    whatsapp.addEventListener('keydown', (e)=> { if(e.key === 'Enter'){ whatsapp.click(); } });

    // Ensure external/background images load fallback: if main hero is 404, set solid color
    const hero = document.querySelector('.hero');
    const img = new Image();
    img.src = "./assets/images/intro-bg.jpg";
    img.onerror = ()=> {
    hero.style.background = "linear-gradient(90deg,#1e3a8a,#5d87ff)";
    };

})();

  const header = document.querySelector('header.nav');
  const hero = document.querySelector('.hero');

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        header.classList.remove('scrolled');
      } else {
        header.classList.add('scrolled');
      }
    },
    {
      root: null,
      threshold: 0,
    }
  );

  observer.observe(hero);

const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });