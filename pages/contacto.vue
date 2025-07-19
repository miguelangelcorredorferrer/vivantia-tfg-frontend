<script setup>


const handleButton = () => {
    console.log('Boton pulsado')
}

</script>



<template>
    <div>
        <h1>Hola a todos!!</h1>

        <button
            @click="handleButton"
        >
            PULSA
        </button>

    </div>
</template>

