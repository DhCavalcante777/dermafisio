<template>
    <div>
        <section class="background line-bottom">
            <div class="content">
                <p>Realce sua beleza</p>
                <p>cuide do seu bem-estar</p>
                <button class="btn-agendar">Agendar Consulta</button>
            </div>
        </section>
    </div>
</template>
<script setup>

</script>
<style scoped>
.background {
    background-image: url('@/assets/image/estetica_plano_aberto_2560x400.png');
    background-size: cover;
    background-position: right center;
    background-repeat: no-repeat;
    min-height: 40vh;
    display: flex;
    align-items: center;
    position: relative;
}

.background::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.5) 100%);

    @media (min-width: 1200px) {
        background: linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 50%, transparent 100%);
    }
}

.content {
    position: relative;
    z-index: 1;
    color: white;
    width: 100%;
    text-align: center;

    @media (min-width: 769px) {
        max-width: 600px;
        text-align: left;
        padding: 40px 60px;
        margin-right: auto;
        margin-left: 10%;
    }

    @media (min-width: 1200px) {
        margin-left: 15%;
    }
}

.content p {
    font-family: 'Great Vibes', cursive;
    font-size: 45px;
    margin: 0;
    background: linear-gradient(90deg, rgb(192, 133, 57) 0%, #c4978a 50%, #c465db 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (min-width: 481px) {
        font-size: 4rem;
    }

    @media (min-width: 769px) {
        font-size: 4rem;
    }
}

.btn-agendar {
    background-color: #c9a86c;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.3s ease;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 15px;
    font-size: 18px;
    padding: 12px 30px;
    
    @media (min-width: 769px) {
        padding: 15px 40px;
        font-size: 1.1rem;
    }
}

.btn-agendar:hover {
    background-color: #b8975b;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(201, 168, 108, 0.4);
}

.line-bottom {
    border-bottom: 2px solid burlywood;
}

</style>