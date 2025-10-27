// Small interactive bits: confetti on button click
(function(){
  const colors = ['#ff3b7a','#ffd166','#6bf7d4','#88b7ff','#d9a8ff']

  function makeConfetti(x,y){
    const el = document.createElement('div')
    el.className = 'confetti-piece'
    const w = 8 + Math.random()*10
    el.style.width = w + 'px'
    el.style.height = (w*1.4) + 'px'
    el.style.background = colors[Math.floor(Math.random()*colors.length)]
    el.style.left = x + 'px'
    el.style.top = y + 'px'
    el.style.transform = 'rotate('+ (Math.random()*360) +'deg)'
    document.body.appendChild(el)

    // animate using JS for small bundle
    const dx = (Math.random()-0.5)*300
    const dy = - (150 + Math.random()*300)
    const rot = (Math.random()-0.5)*720
    el.animate([
      {transform: `translate(0,0) rotate(0)`, opacity:1},
      {transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`, opacity:0}
    ],{duration:1200+Math.random()*600,easing:'cubic-bezier(.2,.7,.1,1)'})
    setTimeout(()=>el.remove(),1900)
  }

  // Secret-button behavior: open a small accessible password modal (masked input)
  const secretBtn = document.getElementById('secretBtn')
  function createPasswordModal(){
    if(document.getElementById('passwordModal')) return
    const backdrop = document.createElement('div')
    backdrop.className = 'modal-backdrop'
    backdrop.id = 'passwordModal'
    backdrop.tabIndex = -1

    const modal = document.createElement('div')
    modal.className = 'modal'
    modal.innerHTML = `
      <h4>パスワードで保護されたページ</h4>
      <p class="muted">アクセスするにはパスワードを入力してください。</p>
      <label>パスワード
        <input id="pw-input" type="password" autocomplete="current-password" placeholder="パスワードを入力"> 
      </label>
      <div id="pw-error" style="color:#ffb3b3;margin-top:8px;display:none;font-size:0.95rem">パスワードが違います。</div>
      <div class="actions">
        <button class="btn-ghost" id="pw-cancel">キャンセル</button>
        <button class="btn-primary" id="pw-submit">送信</button>
      </div>
    `

    backdrop.appendChild(modal)
    document.body.appendChild(backdrop)
    // focus the input
    const input = document.getElementById('pw-input')
    setTimeout(()=> input && input.focus(), 50)

    function close(){ backdrop.remove(); document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
    function onKey(e){ if(e.key === 'Escape') close(); if(e.key === 'Enter') submit() }

    document.getElementById('pw-cancel').addEventListener('click', close)
    backdrop.addEventListener('click', function(e){ if(e.target === backdrop) close() })
    document.addEventListener('keydown', onKey)

    function submit(){
      const v = input.value || ''
      const err = document.getElementById('pw-error')
      if(v === 'password'){
        // success
        const rect = secretBtn.getBoundingClientRect()
        for(let i=0;i<28;i++) makeConfetti(rect.left + rect.width/2 + (Math.random()-0.5)*40, rect.top + rect.height/2 + (Math.random()-0.5)*10)
        close()
        setTimeout(()=> { window.location.href = 'secret.html' }, 700)
      } else {
        // show inline error and shake input
        err.style.display = 'block'
        input.animate([
          { transform: 'translateX(0)' },
          { transform: 'translateX(-6px)' },
          { transform: 'translateX(6px)' },
          { transform: 'translateX(0)' }
        ], { duration: 300, easing: 'ease-out' })
        input.focus()
      }
    }

    document.getElementById('pw-submit').addEventListener('click', submit)
  }

  if(secretBtn){
    secretBtn.addEventListener('click', (e)=>{
      e.preventDefault()
      // open password modal, prevent background scroll
      createPasswordModal()
      document.body.style.overflow = 'hidden'
    })
  }

  // small accessibility: allow photo divs to be opened (placeholder behavior)
  document.querySelectorAll('.photo').forEach(p=>{
    p.addEventListener('click', ()=>alert('ここに写真の拡大や説明を入れられます。'))
    p.addEventListener('keypress', (ev)=>{ if(ev.key === 'Enter') p.click() })
  })

  /* Smooth scrolling for internal anchors (except when reserve button will open modal) */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href')
      if(href === '#') return
      // If this is the reserve button, we'll handle separately
      if(this.classList.contains('reserve-btn')) return
      const target = document.querySelector(href)
      if(target){
        e.preventDefault()
        target.scrollIntoView({behavior:'smooth',block:'start'})
        // update focus for accessibility
        setTimeout(()=>{ target.setAttribute('tabindex','-1'); target.focus(); },400)
      }
    })
  })

  /* Reservation modal (created dynamically) */
  function createReservationModal(){
    if(document.getElementById('reservationModal')) return

    const backdrop = document.createElement('div')
    backdrop.className = 'modal-backdrop'
    backdrop.tabIndex = -1

    const modal = document.createElement('div')
    modal.className = 'modal'
    modal.id = 'reservationModal'
    modal.innerHTML = `
      <h4>展示の予約フォーム</h4>
      <p class="muted">必要事項を入力するとメールクライアントで送信準備をします。</p>
      <label>代表者名 <input id="res-name" type="text" placeholder="例：田中 太郎"></label>
      <div class="row">
        <div class="col"><label>来訪予定日 <input id="res-date" type="date"></label></div>
        <div class="col"><label>人数 <input id="res-count" type="number" min="1" placeholder="例：5"></label></div>
      </div>
      <label>メールアドレス <input id="res-email" type="email" placeholder="example@mail.com"></label>
      <label>メッセージ <textarea id="res-msg" rows="3" placeholder="簡単なメッセージ（任意）"></textarea></label>
      <div class="actions">
        <button class="btn-ghost" id="res-cancel">キャンセル</button>
        <button class="btn-primary" id="res-send">送信（メール作成）</button>
      </div>
    `

    backdrop.appendChild(modal)
    document.body.appendChild(backdrop)

    // Focus handling
    const nameInput = document.getElementById('res-name')
    setTimeout(()=>nameInput && nameInput.focus(),60)

    function close(){ backdrop.remove(); document.removeEventListener('keydown', onKey) }
    function onKey(e){ if(e.key === 'Escape') close() }
    document.getElementById('res-cancel').addEventListener('click', close)
    backdrop.addEventListener('click', function(e){ if(e.target === backdrop) close() })
    document.addEventListener('keydown', onKey)

    document.getElementById('res-send').addEventListener('click', function(){
      const name = document.getElementById('res-name').value || '（未入力）'
      const date = document.getElementById('res-date').value || '未定'
      const count = document.getElementById('res-count').value || '未定'
      const email = document.getElementById('res-email').value || ''
      const msg = document.getElementById('res-msg').value || ''

      const to = 'teacher@example.com'
      const subject = encodeURIComponent(`【展示予約】${name} - ${date}`)
      const bodyLines = [
        `代表者名: ${name}`,
        `来訪予定日: ${date}`,
        `人数: ${count}`,
        `連絡先メール: ${email}`,
        '',
        `メッセージ:\n${msg}`
      ]
      const body = encodeURIComponent(bodyLines.join('\n'))
      const mailto = `mailto:${to}?subject=${subject}&body=${body}`
      // open user's mail client
      window.location.href = mailto
      close()
    })
  }

  // Hook reserve button — only open modal for internal anchors. If the button points to an external URL or opens in a new tab, do not intercept.
  const reserve = document.querySelector('.reserve-btn')
  if(reserve){
    const href = reserve.getAttribute('href') || ''
    const isExternal = href.startsWith('http') || reserve.target === '_blank'
    if(!isExternal){
      reserve.addEventListener('click', function(e){
        e.preventDefault()
        createReservationModal()
      })
    } else {
      // ensure safe external linking attributes
      reserve.setAttribute('rel', reserve.getAttribute('rel') || 'noopener noreferrer')
    }
  }

  /* Mobile hamburger menu behavior */
  const menuToggle = document.querySelector('.menu-toggle')
  const mobileNav = document.getElementById('mobile-nav')
  const mobileClose = document.querySelector('.mobile-close')
  if(menuToggle && mobileNav){
    function openMobile(){
      mobileNav.classList.add('open')
      mobileNav.setAttribute('aria-hidden','false')
      menuToggle.setAttribute('aria-expanded','true')
      // focus first link
      const firstLink = mobileNav.querySelector('nav a')
      setTimeout(()=> firstLink && firstLink.focus(), 80)
      // prevent body scroll
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', onEscMobile)
    }
    function closeMobile(){
      mobileNav.classList.remove('open')
      mobileNav.setAttribute('aria-hidden','true')
      menuToggle.setAttribute('aria-expanded','false')
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onEscMobile)
      menuToggle.focus()
    }
    function onEscMobile(e){ if(e.key === 'Escape') closeMobile() }

    menuToggle.addEventListener('click', function(){
      const open = mobileNav.classList.contains('open')
      if(open) closeMobile(); else openMobile()
    })
    if(mobileClose) mobileClose.addEventListener('click', closeMobile)
    // close when clicking any mobile nav link
    mobileNav.querySelectorAll('a').forEach(a=> a.addEventListener('click', closeMobile))
    // close when tapping backdrop (click outside inner)
    mobileNav.addEventListener('click', function(e){ if(e.target === mobileNav) closeMobile() })
  }

})();
