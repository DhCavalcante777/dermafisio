<template>
    <div>
        <section class="background line-bottom">
            <div class="content">
                <p>Realce sua beleza</p>
                <p>cuide do seu bem-estar</p>
                <a href="https://wa.me/5521996641590" target="_blank" class="btn-agendar">Agendar Consulta</a>
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
    background-position: center;
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
    color: var(--color-text-primary);
    width: 100%;
    text-align: center;
    padding: var(--spacing-md);

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
    font-family: var(--font-display);
    font-size: var(--font-size-5xl);
    margin: 0;
    background: var(--gradient-headline);
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
    background-color: var(--color-gold-cta);
    color: var(--color-text-primary);
    border: none;
    cursor: pointer;
    border-radius: var(--radius-sm);
    transition: var(--transition-base);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 15px;
    font-size: var(--font-size-lg);
    padding: 12px 30px;
    text-decoration: none;
    display: inline-block;
    
    @media (min-width: 769px) {
        padding: 15px 40px;
        font-size: 1.1rem;
    }
}

.btn-agendar:hover {
    background-color: var(--color-gold-cta-hover);
    transform: translateY(-2px);
    box-shadow: var(--shadow-cta-hover);
}

.line-bottom {
    border-bottom: 2px solid var(--color-gold);
}

</style>