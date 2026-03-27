<template>
  <div class="anamnese-page background min-vh-100 py-5">
    <div class="container">
      <div class="text-center mb-5">
        <h1 class="page-title">Ficha de Anamnese</h1>
        <div class="title-line mx-auto"></div>
        <img
          class="logo"
          src="../assets/image/logo-lateralizado.png"
          alt="Logo"
        />
      </div>

      <form @submit.prevent="submitForm" class="anamnese-form">
        <div class="form-section mb-5">
          <h3 class="section-subtitle">Dados Pessoais</h3>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Nome Completo</label>
              <input
                type="text"
                v-model="form.nome"
                class="custom-input"
                placeholder="Digite seu nome"
              />
            </div>
            <div class="col-md-3 mb-3">
              <label class="form-label">Data de Nascimento</label>
              <input
                type="text"
                v-model="dateDisplay"
                @input="handleDateInput"
                placeholder="DD/MM/AAAA"
                maxlength="10"
                inputmode="numeric"
                class="custom-input"
                required
              />
            </div>
            <div class="col-md-3">
              <label class="form-label">Idade</label>
              <input type="number" v-model="form.idade" class="custom-input" />
            </div>
            <div class="col-md-12">
              <label class="form-label">Endereço</label>
              <input
                type="text"
                v-model="form.endereco"
                class="custom-input"
                placeholder="Rua, número, bairro, cidade"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Profissão</label>
              <input
                type="text"
                v-model="form.profissao"
                class="custom-input"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Telefone</label>
              <input
                type="tel"
                v-model="telefoneDisplay"
                @input="handleTelefoneInput"
                class="custom-input"
                placeholder="(00) 00000-0000"
                maxlength="15"
                inputmode="numeric"
              />
            </div>
            <div class="col-md-12">
              <label class="form-label">Como nos conheceu?</label>
              <input
                type="text"
                v-model="form.comoConheceu"
                class="custom-input"
              />
            </div>
          </div>
        </div>

        <div class="form-section mb-5">
          <h3 class="section-subtitle">Queixa Principal</h3>
          <div class="row">
            <div class="col-12">
              <label class="form-label"
                >Qual tratamento gostaria de realizar? O que te incomoda?</label
              >
              <textarea
                v-model="form.queixaPrincipal"
                class="custom-input"
                rows="3"
                placeholder="Descreva aqui suas principais queixas..."
              ></textarea>
            </div>
          </div>
        </div>

        <div class="form-section mb-5">
          <h3 class="section-subtitle">Histórico Patológico</h3>
          <div class="row g-4">
            <div class="col-md-12">
              <label class="form-label">Faz uso de medicação? Quais?</label>
              <input
                type="text"
                v-model="form.medicacao"
                class="custom-input"
              />
            </div>

            <div class="col-md-6">
              <label class="form-label"
                >Faz exame periodicamente? Quando foi a última vez?</label
              >
              <input type="text" v-model="form.exames" class="custom-input" />
            </div>

            <div class="col-md-6">
              <label class="form-label">Tem alergia a algum medicamento?</label>
              <div class="d-flex gap-3 align-items-center mt-2">
                <label class="radio-label"
                  ><input type="radio" v-model="form.alergia" value="sim" />
                  Sim</label
                >
                <label class="radio-label"
                  ><input type="radio" v-model="form.alergia" value="nao" />
                  Não</label
                >
                <input
                  v-if="form.alergia === 'sim'"
                  type="text"
                  v-model="form.alergiaQual"
                  class="custom-input ms-2"
                  placeholder="Qual?"
                />
              </div>
            </div>

            <div class="col-md-6">
              <label class="form-label">Como funciona o intestino?</label>
              <input
                type="text"
                v-model="form.intestino"
                class="custom-input"
              />
            </div>

            <div class="col-md-3">
              <label class="form-label">Ciclo menstrual normal?</label>
              <div class="d-flex gap-3 mt-2">
                <label class="radio-label"
                  ><input
                    type="radio"
                    v-model="form.cicloMenstrual"
                    value="sim"
                  />
                  Sim</label
                >
                <label class="radio-label"
                  ><input
                    type="radio"
                    v-model="form.cicloMenstrual"
                    value="nao"
                  />
                  Não</label
                >
              </div>
            </div>

            <div class="col-md-3">
              <label class="form-label">Usa anticoncepcional?</label>
              <div class="d-flex gap-3 mt-2">
                <label class="radio-label"
                  ><input
                    type="radio"
                    v-model="form.anticoncepcional"
                    value="sim"
                  />
                  Sim</label
                >
                <label class="radio-label"
                  ><input
                    type="radio"
                    v-model="form.anticoncepcional"
                    value="nao"
                  />
                  Não</label
                >
              </div>
            </div>

            <div class="col-md-6">
              <label class="form-label">Hipotensão?</label>
              <div class="d-flex gap-3 mt-2">
                <label class="radio-label"
                  ><input type="radio" v-model="form.hipotensao" value="sim" />
                  Sim</label
                >
                <label class="radio-label"
                  ><input type="radio" v-model="form.hipotensao" value="nao" />
                  Não</label
                >
              </div>
            </div>

            <div class="col-md-6">
              <label class="form-label"
                >Doenças pré-existentes (Diabetes, etc)?</label
              >
              <div class="d-flex gap-3 align-items-center mt-2">
                <label class="radio-label"
                  ><input type="radio" v-model="form.doencasPre" value="sim" />
                  Sim</label
                >
                <label class="radio-label"
                  ><input type="radio" v-model="form.doencasPre" value="nao" />
                  Não</label
                >
                <input
                  v-if="form.doencasPre === 'sim'"
                  type="text"
                  v-model="form.doencasPreQual"
                  class="custom-input ms-2"
                  placeholder="Qual?"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="form-section mb-5">
          <h3 class="section-subtitle">Histórico Social</h3>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Pratica alguma atividade física?</label>
              <input
                type="text"
                v-model="form.atividadeFisica"
                class="custom-input"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Sua alimentação é saudável?</label>
              <input
                type="text"
                v-model="form.alimentacao"
                class="custom-input"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Ingere bastante líquido?</label>
              <input type="text" v-model="form.liquido" class="custom-input" />
            </div>
            <div class="col-md-6">
              <label class="form-label">Fuma?</label>
              <input type="text" v-model="form.fuma" class="custom-input" />
            </div>
            <div class="col-md-6">
              <label class="form-label">Faz uso de bebida alcoólica?</label>
              <input type="text" v-model="form.alcool" class="custom-input" />
            </div>
            <div class="col-md-6">
              <label class="form-label"
                >Já fez algum procedimento estético? Qual?</label
              >
              <input
                type="text"
                v-model="form.procedimentoEstetico"
                class="custom-input"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label"
                >Já fez algum tipo de cirurgia? Qual?</label
              >
              <input type="text" v-model="form.cirurgia" class="custom-input" />
            </div>
            <div class="col-md-6">
              <label class="form-label"
                >No momento está grávida ou com suspeita?</label
              >
              <input type="text" v-model="form.gravida" class="custom-input" />
            </div>
            <div class="col-md-12">
              <label class="form-label">Presença de metais no corpo?</label>
              <input type="text" v-model="form.metais" class="custom-input" />
            </div>
          </div>
        </div>

        <div class="text-center mt-5">
          <button type="submit" class="btn-enviar" :disabled="isSubmitting">
            {{ isSubmitting ? 'Enviando...' : 'Finalizar e Enviar Ficha' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

import AnamneseService from "@/services/anamneseService";

const dateDisplay = ref("");
const telefoneDisplay = ref("");
const isSubmitting = ref(false);
const form = reactive({
  nome: "",
  dataNasc: "",
  idade: "",
  endereco: "",
  profissao: "",
  telefone: "",
  comoConheceu: "",
  queixaPrincipal: "",
  medicacao: "",
  exames: "",
  alergia: "nao",
  alergiaQual: "",
  intestino: "",
  cicloMenstrual: "sim",
  anticoncepcional: "nao",
  hipotensao: "nao",
  doencasPre: "nao",
  doencasPreQual: "",
  atividadeFisica: "",
  alimentacao: "",
  liquido: "",
  fuma: "",
  alcool: "",
  procedimentoEstetico: "",
  cirurgia: "",
  gravida: "",
  metais: "",
});

const handleDateInput = (e) => {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 8) value = value.slice(0, 8);

  if (value.length >= 5) {
    dateDisplay.value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
  } else if (value.length >= 3) {
    dateDisplay.value = `${value.slice(0, 2)}/${value.slice(2)}`;
  } else {
    dateDisplay.value = value;
  }

  if (value.length === 8) {
    const day = parseInt(value.slice(0, 2), 10);
    const month = parseInt(value.slice(2, 4), 10);
    const year = parseInt(value.slice(4), 10);
    form.dataNasc = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;


    const today = new Date();
    let age = today.getFullYear() - year;
    const monthDiff = today.getMonth() + 1 - month;
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
      age--;
    }
    form.idade = age;
  }
};

const handleTelefoneInput = (e) => {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);

  if (value.length > 6) {
    telefoneDisplay.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
  } else if (value.length > 2) {
    telefoneDisplay.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
  } else if (value.length > 0) {
    telefoneDisplay.value = `(${value}`;
  } else {
    telefoneDisplay.value = "";
  }

  form.telefone = value;
};

const submitForm = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  try {
    console.log("Enviando dados para o Railway...", form);

    const response = await AnamneseService.create(form);

    console.log("Resposta da API:", response.data);
    alert("Ficha enviada com sucesso para a SL DERMAFÍSIO!");

    Object.assign(form, {
      nome: "",
      dataNasc: "",
      idade: "",
      endereco: "",
      profissao: "",
      telefone: "",
      comoConheceu: "",
      queixaPrincipal: "",
      medicacao: "",
      exames: "",
      alergia: "nao",
      alergiaQual: "",
      intestino: "",
      cicloMenstrual: "sim",
      anticoncepcional: "nao",
      hipotensao: "nao",
      doencasPre: "nao",
      doencasPreQual: "",
      atividadeFisica: "",
      alimentacao: "",
      liquido: "",
      fuma: "",
      alcool: "",
      procedimentoEstetico: "",
      cirurgia: "",
      gravida: "",
      metais: "",
    });
    dateDisplay.value = "";
    telefoneDisplay.value = "";
  } catch (error) {
    console.error("Erro ao salvar:", error);
    const msgErro =
      error.response?.data?.error || "Erro ao conectar com o servidor.";
    alert("Ops! " + msgErro);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.logo {
  height: 130px;
  margin: 40px 0;
}

.background {
  background-color: #272427;
  background-image:
    repeating-linear-gradient(
      87deg,
      rgba(255, 255, 255, 0.03) 0px,
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px,
      transparent 2px
    ),
    repeating-linear-gradient(
      168deg,
      rgba(0, 0, 0, 0.05) 0px,
      rgba(0, 0, 0, 0.05) 1px,
      transparent 1px,
      transparent 2px
    );
  background-size: 6px 6px;
}

.page-title {
  color: burlywood;
  font-family: "Great Vibes", cursive;
  font-size: 45px;
  margin-bottom: 5px;
}
.brand-name {
  color: #d4a574;
  font-family: "Playfair Display", serif;
  letter-spacing: 3px;
  font-size: 14px;
}
.title-line {
  width: 100px;
  height: 2px;
  background: linear-gradient(to right, transparent, burlywood, transparent);
  margin-bottom: 10px;
}

.form-section {
  background: rgba(255, 255, 255, 0.02);
  padding: 30px;
  border-radius: 15px;
  border: 1px solid rgba(222, 184, 135, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.section-subtitle {
  color: #d4a574;
  font-family: "Playfair Display", serif;
  font-size: 24px;
  margin-bottom: 25px;
  border-bottom: 1px solid rgba(212, 165, 116, 0.2);
  padding-bottom: 10px;
}

.form-label {
  color: burlywood;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  margin-bottom: 8px;
}

.custom-input {
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(222, 184, 135, 0.2);
  border-radius: 8px;
  padding: 12px 15px;
  color: white;
  font-family: "Poppins", sans-serif;
  transition: all 0.3s ease;
}

.custom-input:focus {
  outline: none;
  border-color: burlywood;
  box-shadow: 0 0 10px rgba(222, 184, 135, 0.1);
}

.radio-label {
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: "Poppins", sans-serif;
}

.btn-enviar {
  background-color: #c9a86c;
  color: white;
  border: none;
  padding: 15px 60px;
  font-family: "Playfair Display", serif;
  font-weight: bold;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-enviar:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  filter: brightness(1.1);
}
.btn-enviar:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .form-section {
    padding: 20px;
  }
  .page-title {
    font-size: 35px;
  }
}
</style>
