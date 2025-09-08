
// =========================
// Tema claro/escuro com persistência
// =========================
function setTheme(theme) {
	document.body.setAttribute('data-theme', theme);
	localStorage.setItem('theme', theme);
}
	// =========================
	// QUIZ: questões, pontuação, explicações, localStorage
	// =========================
	if (document.getElementById('quiz-form')) {
		const quiz = [
			{
				pergunta: 'Qual o papel do HTML em um site?',
				opcoes: [
					'Definir a estrutura e o conteúdo',
					'Adicionar interatividade',
					'Estilizar o layout',
					'Gerenciar banco de dados'
				],
				correta: 0,
				explicacao: 'HTML estrutura o conteúdo da página, como títulos, parágrafos e imagens.'
			},
			{
				pergunta: 'Qual seletor CSS aplica estilo a todos os parágrafos?',
				opcoes: [
					'p { ... }',
					'.p { ... }',
					'#p { ... }',
					'paragraph { ... }'
				],
				correta: 0,
				explicacao: 'O seletor p seleciona todos os elementos <p>.'
			},
			{
				pergunta: 'Para que serve o localStorage?',
				opcoes: [
					'Persistir dados no navegador',
					'Executar código JS',
					'Estilizar páginas',
					'Fazer deploy do site'
				],
				correta: 0,
				explicacao: 'localStorage armazena dados localmente, mesmo após fechar o navegador.'
			},
			{
				pergunta: 'Qual é uma boa prática de acessibilidade?',
				opcoes: [
					'Imagens com alt descritivo',
					'Remover todos os outlines',
					'Usar apenas cores para indicar erros',
					'Ignorar labels em formulários'
				],
				correta: 0,
				explicacao: 'Imagens devem ter alt descritivo para leitores de tela.'
			},
			{
				pergunta: 'O que é responsividade?',
				opcoes: [
					'Adaptar o site a diferentes tamanhos de tela',
					'Adicionar animações',
					'Usar apenas JavaScript',
					'Fazer deploy automático'
				],
				correta: 0,
				explicacao: 'Responsividade garante boa experiência em qualquer dispositivo.'
			},
			{
				pergunta: 'Quando usar frameworks como React?',
				opcoes: [
					'Projetos dinâmicos e escaláveis',
					'Sites estáticos simples',
					'Apenas para estilizar',
					'Para bancos de dados'
				],
				correta: 0,
				explicacao: 'React é indicado para SPAs e projetos que exigem reatividade.'
			},
			{
				pergunta: 'Qual comando Git cria um novo branch?',
				opcoes: [
					'git checkout -b nome',
					'git commit -m "nova branch"',
					'git merge nome',
					'git status'
				],
				correta: 0,
				explicacao: 'git checkout -b nome cria e muda para um novo branch.'
			},
			{
				pergunta: 'Qual unidade é relativa ao tamanho da fonte do elemento?',
				opcoes: [
					'em',
					'px',
					'cm',
					'vh'
				],
				correta: 0,
				explicacao: 'em é relativa ao tamanho da fonte do elemento pai.'
			},
			{
				pergunta: 'O que é um commit semântico?',
				opcoes: [
					'Mensagem clara sobre a mudança',
					'Qualquer mensagem',
					'Nome do branch',
					'Push para o repositório'
				],
				correta: 0,
				explicacao: 'Commits semânticos facilitam o entendimento do histórico do projeto.'
			},
			{
				pergunta: 'Qual vantagem do uso de variáveis CSS?',
				opcoes: [
					'Facilita manutenção e consistência',
					'Deixa o site mais lento',
					'Só funciona em JS',
					'Serve para bancos de dados'
				],
				correta: 0,
				explicacao: 'Variáveis CSS tornam o código mais organizado e fácil de alterar.'
			},
		];

		let melhor = parseInt(localStorage.getItem('quiz_melhor') || '0');

		function renderQuiz() {
			const form = document.getElementById('quiz-form');
			form.innerHTML = quiz.map((q, i) => `
				<fieldset style="margin-bottom:2em;border:1px solid var(--color-border);border-radius:8px;padding:1em;">
					<legend style="font-family:var(--font-title);font-size:1.1em;">${i+1}. ${q.pergunta}</legend>
					${q.opcoes.map((op, j) => `
						<label style="display:block;margin:0.5em 0;cursor:pointer;">
							<input type="radio" name="q${i}" value="${j}" required> ${op}
						</label>
					`).join('')}
				</fieldset>
			`).join('') + '<button type="submit" style="margin-top:1em;">Enviar</button>';
		}

		renderQuiz();

		document.getElementById('quiz-form').addEventListener('submit', function(e) {
			e.preventDefault();
			const data = new FormData(this);
			let acertos = 0;
			let explicacoes = '';
			quiz.forEach((q, i) => {
				const resp = parseInt(data.get('q'+i));
				if (resp === q.correta) acertos++;
				explicacoes += `<div style='margin:1em 0;'><strong>${i+1}. ${q.pergunta}</strong><br>Resposta: <b>${q.opcoes[q.correta]}</b><br><span style='color:var(--color-secondary);'>${q.explicacao}</span></div>`;
			});
			let pct = Math.round((acertos/quiz.length)*100);
			document.getElementById('quiz-resultado').innerHTML = `<h2>Você acertou ${acertos} de ${quiz.length} (${pct}%)</h2>${explicacoes}<button onclick='window.location.reload()'>Refazer</button>`;
			document.getElementById('quiz-resultado').style.display = 'block';
			if (acertos > melhor) {
				melhor = acertos;
				localStorage.setItem('quiz_melhor', melhor);
			}
			document.getElementById('quiz-melhor').textContent = `Melhor pontuação: ${melhor} de ${quiz.length}`;
			this.style.display = 'none';
		});

		document.getElementById('quiz-melhor').textContent = `Melhor pontuação: ${melhor} de ${quiz.length}`;
	}

function getPreferredTheme() {
	const saved = localStorage.getItem('theme');
	if (saved) return saved;
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function toggleTheme() {
	const current = document.body.getAttribute('data-theme') || getPreferredTheme();
	setTheme(current === 'dark' ? 'light' : 'dark');
}

// Inicialização do tema ao carregar
document.addEventListener('DOMContentLoaded', () => {
	setTheme(getPreferredTheme());
	const toggleBtn = document.getElementById('theme-toggle');
	if (toggleBtn) {
		toggleBtn.addEventListener('click', toggleTheme);
		// Acessibilidade
		toggleBtn.setAttribute('aria-pressed', getPreferredTheme() === 'dark');
		toggleBtn.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				toggleTheme();
			}
		});
	}
	// =========================
	// TECNOLOGIAS: Filtros, busca, cards, modal, favoritos, exportar CSV
	// =========================
	if (document.getElementById('tech-grid')) {
		// Dados das tecnologias
		const tecnologias = [
			{
				nome: 'React', categoria: 'frontend', nivel: 'intermediário',
				para: 'Construção de interfaces dinâmicas (SPA).',
				pros: ['Componentização', 'Grande comunidade'],
				contras: ['Curva de aprendizado', 'JSX pode confundir'],
				evitar: 'Projetos muito simples ou estáticos.',
				link: 'https://react.dev',
				resumo: ['Projetos SPA', 'Equipe com JS moderno', 'Precisa de reatividade'],
			},
			{
				nome: 'Vue', categoria: 'frontend', nivel: 'intermediário',
				para: 'Interfaces reativas e progressivas.',
				pros: ['Fácil de aprender', 'Documentação clara'],
				contras: ['Menos vagas', 'Menos recursos corporativos'],
				evitar: 'Projetos que exigem grande escala corporativa.',
				link: 'https://vuejs.org',
				resumo: ['Aprendizado rápido', 'Projetos pequenos/médios', 'Precisa de flexibilidade'],
			},
			{
				nome: 'Angular', categoria: 'frontend', nivel: 'avançado',
				para: 'Aplicações empresariais robustas.',
				pros: ['Completo', 'Padrão corporativo'],
				contras: ['Complexo', 'Muitos conceitos'],
				evitar: 'Projetos pequenos ou sem time experiente.',
				link: 'https://angular.io',
				resumo: ['Grandes equipes', 'Arquitetura sólida', 'Necessita TypeScript'],
			},
			{
				nome: 'Node.js', categoria: 'backend', nivel: 'intermediário',
				para: 'Back-end com JavaScript.',
				pros: ['Alta performance', 'Ecossistema vasto'],
				contras: ['Callback hell', 'Menos indicado para CPU-bound'],
				evitar: 'Processamento intensivo de CPU.',
				link: 'https://nodejs.org',
				resumo: ['APIs rápidas', 'Equipe JS fullstack', 'Muitos pacotes NPM'],
			},
			{
				nome: 'Python/Django', categoria: 'backend', nivel: 'intermediário',
				para: 'Desenvolvimento web rápido e seguro.',
				pros: ['Produtivo', 'Maturidade'],
				contras: ['Menos performático', 'Curva de aprendizado'],
				evitar: 'Apps que exigem máxima performance.',
				link: 'https://www.djangoproject.com',
				resumo: ['Projetos rápidos', 'Segurança', 'Comunidade ativa'],
			},
			{
				nome: 'Java/Spring', categoria: 'backend', nivel: 'avançado',
				para: 'Soluções corporativas robustas.',
				pros: ['Escalável', 'Muito usado em empresas'],
				contras: ['Verboso', 'Curva de aprendizado'],
				evitar: 'Projetos pequenos ou MVPs.',
				link: 'https://spring.io',
				resumo: ['Grandes sistemas', 'Equipe experiente', 'Necessita infraestrutura'],
			},
			{
				nome: 'MySQL', categoria: 'database', nivel: 'básico',
				para: 'Banco de dados relacional.',
				pros: ['Popular', 'Fácil de usar'],
				contras: ['Menos escalável', 'Limitações em big data'],
				evitar: 'Grandes volumes não-relacionais.',
				link: 'https://www.mysql.com',
				resumo: ['Projetos pequenos/médios', 'Fácil hospedagem', 'Necessita SQL'],
			},
			{
				nome: 'PostgreSQL', categoria: 'database', nivel: 'intermediário',
				para: 'Banco relacional avançado.',
				pros: ['Recursos avançados', 'Open source'],
				contras: ['Configuração complexa', 'Curva de aprendizado'],
				evitar: 'Projetos que não usam recursos avançados.',
				link: 'https://www.postgresql.org',
				resumo: ['Necessita recursos avançados', 'Projetos escaláveis', 'Open source'],
			},
			{
				nome: 'MongoDB', categoria: 'database', nivel: 'intermediário',
				para: 'Banco de dados NoSQL.',
				pros: ['Flexível', 'Escalável horizontalmente'],
				contras: ['Menos ACID', 'Consultas complexas'],
				evitar: 'Necessidade de transações complexas.',
				link: 'https://www.mongodb.com',
				resumo: ['Dados flexíveis', 'Escalabilidade', 'Projetos NoSQL'],
			},
			{
				nome: 'Docker', categoria: 'devops', nivel: 'intermediário',
				para: 'Containerização de aplicações.',
				pros: ['Portabilidade', 'Ambientes isolados'],
				contras: ['Curva de aprendizado', 'Overhead'],
				evitar: 'Projetos muito simples.',
				link: 'https://www.docker.com',
				resumo: ['Ambientes replicáveis', 'DevOps', 'Deploy facilitado'],
			},
			{
				nome: 'CI/CD', categoria: 'devops', nivel: 'avançado',
				para: 'Automação de build, testes e deploy.',
				pros: ['Entrega rápida', 'Menos erros humanos'],
				contras: ['Configuração inicial', 'Necessita cultura DevOps'],
				evitar: 'Projetos sem equipe dedicada.',
				link: 'https://www.atlassian.com/continuous-delivery/ci-vs-cd',
				resumo: ['Automação', 'Projetos maduros', 'Equipe DevOps'],
			},
			{
				nome: 'Jest', categoria: 'test', nivel: 'básico',
				para: 'Testes unitários em JS.',
				pros: ['Fácil de usar', 'Rápido'],
				contras: ['Cobertura limitada', 'Focado em JS'],
				evitar: 'Projetos não-JS.',
				link: 'https://jestjs.io',
				resumo: ['Testes JS', 'Projetos pequenos/médios', 'Fácil integração'],
			},
			{
				nome: 'Cypress', categoria: 'test', nivel: 'intermediário',
				para: 'Testes end-to-end.',
				pros: ['Testes reais', 'Fácil de escrever'],
				contras: ['Mais lento', 'Cobertura limitada'],
				evitar: 'Projetos sem front-end.',
				link: 'https://www.cypress.io',
				resumo: ['Testes E2E', 'Projetos web', 'Equipe de QA'],
			},
		];

		// Favoritos
		let favoritos = JSON.parse(localStorage.getItem('tech_favs') || '[]');

		// Filtro
		let filtro = localStorage.getItem('tech_filtro') || 'all';
		let busca = '';

		// Renderização dos cards
		function renderCards() {
			const grid = document.getElementById('tech-grid');
			if (!grid) return;
			let filtradas = tecnologias.filter(t =>
				(filtro === 'all' || t.categoria === filtro) &&
				(busca === '' || t.nome.toLowerCase().includes(busca) || t.para.toLowerCase().includes(busca))
			);
			grid.innerHTML = '';
			if (filtradas.length === 0) {
				grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;">Nenhuma tecnologia encontrada.</p>';
				return;
			}
			filtradas.forEach((t, i) => {
				const card = document.createElement('article');
				card.className = 'tech-card';
				card.tabIndex = 0;
				card.setAttribute('role', 'button');
				card.setAttribute('aria-label', `Detalhes de ${t.nome}`);
				card.setAttribute('data-index', i);
				card.innerHTML = `
					<div style="display:flex;align-items:center;justify-content:space-between;">
						<h3 style="margin:0;">${t.nome}</h3>
						<span class="badge" style="background:var(--color-secondary);color:#fff;padding:0.2em 0.7em;border-radius:1em;font-size:0.9em;">${t.nivel}</span>
						<button class="fav-btn" aria-label="Favoritar ${t.nome}" data-nome="${t.nome}" style="background:none;border:none;font-size:1.3em;cursor:pointer;" tabindex="0">${favoritos.includes(t.nome) ? '★' : '☆'}</button>
					</div>
					<p style="margin:0.7em 0 0.5em 0;">${t.para}</p>
					<ul style="padding-left:1.2em;margin:0 0 0.5em 0;font-size:0.97em;">
						<li><strong>Prós:</strong> ${t.pros.join(', ')}</li>
						<li><strong>Contras:</strong> ${t.contras.join(', ')}</li>
					</ul>
					<p style="margin:0 0 0.5em 0;"><strong>Quando evitar:</strong> ${t.evitar}</p>
					<a href="${t.link}" target="_blank" rel="noopener" style="color:var(--color-primary);font-size:0.98em;">Site oficial</a>
				`;
				card.addEventListener('click', (e) => {
					if (e.target.classList.contains('fav-btn')) return;
					abrirModal(t);
				});
				card.addEventListener('keydown', (e) => {
					if ((e.key === 'Enter' || e.key === ' ') && !e.target.classList.contains('fav-btn')) {
						abrirModal(t);
					}
				});
				card.querySelector('.fav-btn').addEventListener('click', (e) => {
					e.stopPropagation();
					toggleFav(t.nome);
				});
				grid.appendChild(card);
			});
		}

		// Modal
		function abrirModal(tec) {
			const modal = document.getElementById('tech-modal');
			if (!modal) return;
			modal.querySelector('#modal-title').textContent = tec.nome;
			modal.querySelector('#modal-body').innerHTML = `
				<p><strong>Quando escolher ${tec.nome}?</strong></p>
				<ul>${tec.resumo.map(b => `<li>${b}</li>`).join('')}</ul>
			`;
			modal.style.display = 'flex';
			modal.setAttribute('aria-hidden', 'false');
			modal.querySelector('#modal-close').focus();
		}
		function fecharModal() {
			const modal = document.getElementById('tech-modal');
			if (!modal) return;
			modal.style.display = 'none';
			modal.setAttribute('aria-hidden', 'true');
		}
		document.getElementById('modal-close')?.addEventListener('click', fecharModal);
		document.getElementById('tech-modal')?.addEventListener('click', (e) => {
			if (e.target.id === 'tech-modal') fecharModal();
		});
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') fecharModal();
		});

		// Filtros
		document.querySelectorAll('.filter-btn').forEach(btn => {
			btn.addEventListener('click', () => {
				document.querySelectorAll('.filter-btn').forEach(b => b.setAttribute('aria-pressed', 'false'));
				btn.setAttribute('aria-pressed', 'true');
				filtro = btn.dataset.category;
				localStorage.setItem('tech_filtro', filtro);
				renderCards();
			});
		});
		// Aplicar filtro salvo
		document.querySelectorAll('.filter-btn').forEach(btn => {
			if (btn.dataset.category === filtro) btn.setAttribute('aria-pressed', 'true');
			else btn.setAttribute('aria-pressed', 'false');
		});

		// Busca
		document.getElementById('tech-search').addEventListener('input', (e) => {
			busca = e.target.value.trim().toLowerCase();
			renderCards();
		});

		// Favoritos
		function toggleFav(nome) {
			if (favoritos.includes(nome)) favoritos = favoritos.filter(f => f !== nome);
			else favoritos.push(nome);
			localStorage.setItem('tech_favs', JSON.stringify(favoritos));
			renderCards();
		}

		// Exportar CSV
		document.getElementById('export-csv').addEventListener('click', () => {
			let filtradas = tecnologias.filter(t =>
				(filtro === 'all' || t.categoria === filtro) &&
				(busca === '' || t.nome.toLowerCase().includes(busca) || t.para.toLowerCase().includes(busca))
			);
			let csv = 'Nome,Categoria,Prós,Contras\n';
			filtradas.forEach(t => {
				csv += `"${t.nome}","${t.categoria}","${t.pros.join('; ')}","${t.contras.join('; ')}"\n`;
			});
			const blob = new Blob([csv], {type: 'text/csv'});
			const a = document.createElement('a');
			a.href = URL.createObjectURL(blob);
			a.download = 'tecnologias.csv';
			a.click();
		});

		// Atalhos de acessibilidade
		document.addEventListener('keydown', (e) => {
			if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
				e.preventDefault();
				document.getElementById('tech-search').focus();
			}
			if (e.altKey && (e.key === 'm' || e.key === 'M')) {
				e.preventDefault();
				document.getElementById('main-menu').querySelector('a').focus();
			}
			if (e.key === 'Home') {
				e.preventDefault();
				window.scrollTo({top:0,behavior:'smooth'});
			}
		});

		// Inicialização
			renderCards();
		}

		// =========================
		// BOAS PRÁTICAS: Accordion, checklist, progresso
		// =========================
		if (document.getElementById('praticas-accordion')) {
			const praticas = [
					{
						titulo: 'Semântica & Acessibilidade',
						bullets: [
							'Use landmarks: <header>, <nav>, <main>, <footer>.',
							'Imagens sempre com alt descritivo.',
							'Labels conectadas a inputs (for/id).',
							'Contraste mínimo 4.5:1.',
						],
						exemplo: `<code>&lt;nav aria-label="Navegação principal"&gt;...&lt;/nav&gt;</code>`
					},
					{
						titulo: 'Responsividade',
						bullets: [
							'Mobile-first: comece pelo layout menor.',
							'Use Flexbox/Grid para organizar.',
							'Prefira unidades relativas (em, rem, %).',
						],
						exemplo: `<code>@media (max-width: 600px) { body { font-size: 1em; } }</code>`
					},
					{
						titulo: 'Organização de CSS',
						bullets: [
							'Use convenção BEM ou similar.',
							'Comente trechos importantes.',
							'Variáveis CSS para cores/tipografia.',
						],
						exemplo: `<code>.btn--primaria { background: var(--color-primary); }</code>`
					},
					{
						titulo: 'Performance leve',
						bullets: [
							'Imagens otimizadas e com tamanho adequado.',
							'Use loading="lazy" em imagens.',
							'Evite JS desnecessário.',
						],
						exemplo: `<code>&lt;img src="foto.jpg" alt="Descrição" loading="lazy"&gt;</code>`
					},
					{
						titulo: 'Versionamento (Git)',
						bullets: [
							'Commits pequenos e frequentes.',
							'Use branches para features.',
							'Mensagens claras e objetivas.',
						],
						exemplo: `<code>git commit -m "feat: filtro por categoria"</code>`
					},
					{
						titulo: 'Boas práticas de JS',
						bullets: [
							'Prefira funções puras.',
							'Nomes claros e descritivos.',
							'Trate erros de interação.',
						],
						exemplo: `<code>function soma(a, b) { return a + b; }</code>`
					},
				];

				// Checklist salvo
				let checklist = JSON.parse(localStorage.getItem('praticas_checklist') || '[]');
				if (!Array.isArray(checklist) || checklist.length !== praticas.length) checklist = Array(praticas.length).fill(false);

				// Render accordion
				const acc = document.getElementById('praticas-accordion');
				acc.innerHTML = praticas.map((p, i) => `
					<article class="accordion-item" style="border:1px solid var(--color-border);border-radius:8px;margin-bottom:1.2em;">
						<h2 style="margin:0;">
							<button class="accordion-toggle" aria-expanded="false" aria-controls="acc-content-${i}" id="acc-btn-${i}" style="width:100%;text-align:left;padding:1em 2em 1em 1em;background:none;border:none;font-size:1.1em;display:flex;align-items:center;gap:1em;">
								<span style="flex:1;">${p.titulo}</span>
								<span aria-hidden="true">▼</span>
								<input type="checkbox" class="checklist" data-index="${i}" ${checklist[i] ? 'checked' : ''} aria-label="Marcar como concluído">
							</button>
						</h2>
						<div class="accordion-content" id="acc-content-${i}" role="region" aria-labelledby="acc-btn-${i}" style="display:none;padding:1em 2em 1em 2em;">
							<ul>${p.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
							<div style="margin-top:1em;background:var(--color-border);padding:0.7em;border-radius:5px;">Exemplo: ${p.exemplo}</div>
						</div>
					</article>
				`).join('');

				// Accordion toggle
				acc.querySelectorAll('.accordion-toggle').forEach((btn, i) => {
					btn.addEventListener('click', (e) => {
						if (e.target.classList.contains('checklist')) return;
						const content = document.getElementById(`acc-content-${i}`);
						const expanded = btn.getAttribute('aria-expanded') === 'true';
						btn.setAttribute('aria-expanded', !expanded);
						content.style.display = expanded ? 'none' : 'block';
						content.style.transition = 'all 0.3s';
					});
					// Acessibilidade: abrir com Enter/Espaço
					btn.addEventListener('keydown', (e) => {
						if ((e.key === 'Enter' || e.key === ' ') && !e.target.classList.contains('checklist')) {
							e.preventDefault();
							btn.click();
						}
					});
				});

				// Checklist
				acc.querySelectorAll('.checklist').forEach((cb, i) => {
					cb.addEventListener('change', () => {
						checklist[i] = cb.checked;
						localStorage.setItem('praticas_checklist', JSON.stringify(checklist));
						atualizarProgresso();
					});
				});

				// Progresso
				function atualizarProgresso() {
					const total = checklist.length;
					const done = checklist.filter(Boolean).length;
					const percent = Math.round((done/total)*100);
					document.getElementById('praticas-progress').value = percent;
					document.getElementById('praticas-percent').textContent = percent + '%';
				}

					atualizarProgresso();
				}

					// =========================
					// FLUXOGRAMA: tooltips nas etapas
					// =========================
					const etapasFluxo = [
						{
							nome: 'Descoberta',
							entrega: 'Entendimento do problema, pesquisa de mercado, definição de público.',
							riscos: 'Falta de alinhamento, objetivos vagos.'
						},
						{
							nome: 'Requisitos',
							entrega: 'Lista de funcionalidades, critérios de aceitação, escopo.',
							riscos: 'Requisitos mal definidos, mudanças frequentes.'
						},
						{
							nome: 'Protótipo',
							entrega: 'Wireframes, protótipo navegável, validação inicial.',
							riscos: 'Pouco feedback, protótipo não testado.'
						},
						{
							nome: 'Design',
							entrega: 'Layout visual, identidade, assets gráficos.',
							riscos: 'Design desalinhado com requisitos, baixa usabilidade.'
						},
						{
							nome: 'Implementação',
							entrega: 'Código funcional, integração de sistemas, documentação.',
							riscos: 'Débitos técnicos, atrasos, bugs.'
						},
						{
							nome: 'Testes',
							entrega: 'Testes unitários, integração, homologação.',
							riscos: 'Cobertura insuficiente, testes manuais apenas.'
						},
						{
							nome: 'Deploy',
							entrega: 'Publicação em ambiente real, scripts de deploy.',
							riscos: 'Falhas de configuração, downtime.'
						},
						{
							nome: 'Monitoramento',
							entrega: 'Monitoramento, manutenção, suporte.',
							riscos: 'Falta de acompanhamento, incidentes não detectados.'
						},
					];

					function showTooltip(idx, el) {
						const tooltip = document.getElementById('fluxo-tooltip');
						if (!tooltip) return;
						tooltip.innerHTML = `<strong>${etapasFluxo[idx].nome}</strong><br><b>Entregas:</b> ${etapasFluxo[idx].entrega}<br><b>Riscos:</b> ${etapasFluxo[idx].riscos}`;
						tooltip.style.display = 'block';
						tooltip.setAttribute('aria-hidden', 'false');
						// Posição
						const rect = el.getBoundingClientRect();
						tooltip.style.left = (window.scrollX + rect.left + rect.width/2 - 120) + 'px';
						tooltip.style.top = (window.scrollY + rect.top - 80) + 'px';
					}
					function hideTooltip() {
						const tooltip = document.getElementById('fluxo-tooltip');
						if (!tooltip) return;
						tooltip.style.display = 'none';
						tooltip.setAttribute('aria-hidden', 'true');
					}

					// SVG etapas
					document.querySelectorAll('.etapa').forEach((el, idx) => {
						el.addEventListener('mouseenter', () => showTooltip(idx, el));
						el.addEventListener('focus', () => showTooltip(idx, el));
						el.addEventListener('mouseleave', hideTooltip);
						el.addEventListener('blur', hideTooltip);
						el.addEventListener('click', () => showTooltip(idx, el));
						el.addEventListener('keydown', (e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								showTooltip(idx, el);
							}
						});
					});
					// Linha do tempo
					document.querySelectorAll('.etapa-timeline').forEach((el, idx) => {
						el.addEventListener('mouseenter', () => showTooltip(idx, el));
						el.addEventListener('focus', () => showTooltip(idx, el));
						el.addEventListener('mouseleave', hideTooltip);
						el.addEventListener('blur', hideTooltip);
						el.addEventListener('click', () => showTooltip(idx, el));
						el.addEventListener('keydown', (e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								showTooltip(idx, el);
							}
						});
					});
			});
