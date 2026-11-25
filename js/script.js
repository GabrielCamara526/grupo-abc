document.addEventListener("DOMContentLoaded", () => {
  /* =================================================
     1. GENTE & CULTURA: Suporte a toque em dispositivos móveis
     ================================================= */
  const genteCards = document.querySelectorAll(".gente-image-wrapper");
  genteCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("is-open");
    });
  });

  /* =================================================
     2. SERVIÇOS AO COLABORADOR: Modal visual dinâmico
     ================================================= */
  const serviceModalEl = document.getElementById("serviceModal");
  if (serviceModalEl) {
    const modalTitle = document.getElementById("serviceModalTitle");
    const modalDescription = document.getElementById("serviceModalDescription");
    const extraFields = document.getElementById("serviceExtraFields");
    const serviceForm = document.getElementById("serviceRequestForm");
    const feedbackBox = document.getElementById("serviceFeedback");

    const serviceConfigs = {
      atestado: {
        title: "Entrega de Atestado Médico",
        desc: "Envie a foto ou PDF do seu atestado para registro junto ao departamento pessoal.",
        fields: `
          <div class="mb-3">
            <label class="form-label fw-semibold">Data de início do afastamento</label>
            <input type="date" class="form-control" required>
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Anexar Atestado (PDF, JPG ou PNG)</label>
            <input type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" required>
          </div>`
      },
      holerite: {
        title: "Acesso Rápido ao Holerite",
        desc: "Selecione o mês de referência para consultar ou baixar seu demonstrativo de pagamento.",
        fields: `
          <div class="mb-3">
            <label class="form-label fw-semibold">Mês de Referência</label>
            <select class="form-select" required>
              <option value="">Selecione...</option>
              <option>Novembro / 2026</option>
              <option>Outubro / 2026</option>
              <option>Setembro / 2026</option>
              <option>Agosto / 2026</option>
            </select>
          </div>`
      },
      ponto: {
        title: "Espelho de Ponto",
        desc: "Consulte suas marcações diárias, banco de horas e solicite ajustes quando necessário.",
        fields: `
          <div class="mb-3">
            <label class="form-label fw-semibold">Período de Apuração</label>
            <select class="form-select" required>
              <option value="">Selecione o período...</option>
              <option>Ciclo Atual</option>
              <option>Mês Anterior</option>
              <option>Últimos 90 dias</option>
            </select>
          </div>`
      },
      rendimentos: {
        title: "Informe de Rendimentos",
        desc: "Emita o comprovante anual de rendimentos para declaração do Imposto de Renda.",
        fields: `
          <div class="mb-3">
            <label class="form-label fw-semibold">Ano-Calendário</label>
            <select class="form-select" required>
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>`
      },
      calendario: {
        title: "Calendário de Pagamento",
        desc: "Confira as datas previstas de pagamento salarial, adiantamentos e 13º salário.",
        fields: `
          <div class="alert alert-secondary mb-3">
            <strong>Próximas datas previstas:</strong><br>
            • Adiantamento: Dia 20<br>
            • Pagamento mensal: 5º dia útil<br>
            • Vale-Alimentação: 1º dia útil
          </div>`
      },
      beneficios: {
        title: "Gestão de Benefícios",
        desc: "Solicite segunda via, inclusão de dependentes ou informações sobre seus benefícios.",
        fields: `
          <div class="mb-3">
            <label class="form-label fw-semibold">Escolha o Benefício</label>
            <select class="form-select" required>
              <option value="">Selecione...</option>
              <option>Vale-Alimentação</option>
              <option>Plano de Saúde</option>
              <option>Convênios e Parcerias</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Detalhes da solicitação</label>
            <textarea class="form-control" rows="3" placeholder="Descreva sua solicitação..."></textarea>
          </div>`
      },
      chamado: {
        title: "Abertura de Chamado com o RH",
        desc: "Precisa de suporte? Abra um atendimento direto com a equipe de Gente & Gestão.",
        fields: `
          <div class="mb-3">
            <label class="form-label fw-semibold">Assunto do Chamado</label>
            <select class="form-select" required>
              <option value="">Selecione o assunto...</option>
              <option>Férias e Folgas</option>
              <option>Alteração Cadastral</option>
              <option>Dúvidas sobre Folha</option>
              <option>Outros Assuntos</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Descrição</label>
            <textarea class="form-control" rows="3" placeholder="Explique como podemos ajudar..." required></textarea>
          </div>`
      }
    };

    document.querySelectorAll("[data-service]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-service");
        const cfg = serviceConfigs[key];
        if (!cfg) return;

        modalTitle.textContent = cfg.title;
        modalDescription.textContent = cfg.desc;
        extraFields.innerHTML = cfg.fields;
        feedbackBox.classList.add("d-none");
        serviceForm.classList.remove("d-none");
        serviceForm.reset();
      });
    });

    serviceForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const protocolo = "ABC-" + Math.floor(100000 + Math.random() * 900000);
      feedbackBox.innerHTML = `
        <i class="bi bi-check-circle-fill fs-4 d-block mb-2"></i>
        <strong>Solicitação registrada com sucesso!</strong><br>
        Número de protocolo visual: <span class="badge bg-dark">${protocolo}</span>
      `;
      feedbackBox.classList.remove("d-none");
      serviceForm.classList.add("d-none");
    });
  }

  /* =================================================
     3. SEGURANÇA & OPERAÇÃO: Simulação de Download PDF
     ================================================= */
  const pdfButtons = document.querySelectorAll(".btn-simular-pdf");
  const pdfAlert = document.getElementById("pdfDownloadAlert");

  pdfButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const docTitle = btn.getAttribute("data-doc");
      if (pdfAlert) {
        pdfAlert.innerHTML = `
          <i class="bi bi-file-earmark-arrow-down-fill me-2"></i>
          Download simulado iniciado: <strong>${docTitle}.pdf</strong>
        `;
        pdfAlert.classList.remove("d-none");
        setTimeout(() => {
          pdfAlert.classList.add("d-none");
        }, 4000);
      }
    });
  });
});