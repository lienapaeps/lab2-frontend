<template>
    <div class="chat-container">
        <!-- Chatberichten -->
        <div v-for="(message, index) in chatMessages" :key="index" class="message"
            :class="{ 'user-message': message.sender === 'Jij', 'farmer-message': message.sender === 'Boer' }">
            <strong>{{ message.sender }}:</strong> {{ message.content }}
        </div>

        <!-- Invoerveld en knop -->
        <div class="input-container">
            <input v-model="newMessage" type="text" placeholder="Typ een bericht" class="input-field">
            <button @click="sendMessage" class="send-button">Verzend</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            chatMessages: [
                { sender: 'Jij', content: 'Hallo! Ik wil graag tomaten planten. Kun je me advies geven?' },
                { sender: 'Matthias', content: 'Natuurlijk! Ik help je graag. Welke specifieke vragen heb je over het planten en verzorgen van tomaten?' },
                // Voeg meer chatberichten toe zoals gewenst
            ],
            newMessage: ''
        };
    },
    methods: {
        sendMessage() {
            if (this.newMessage.trim() !== '') {
                this.chatMessages.push({ sender: 'Jij', content: this.newMessage });
                this.newMessage = '';

                // Voeg hier code toe om reacties van de boer te genereren op basis van de gebruikersvragen
                if (this.chatMessages.length % 2 === 1) {
                    this.chatMessages.push({ sender: 'Matthias', content: 'Dat is een goede vraag. Om tomaten te planten, moet je eerst...' });
                } else {
                    this.chatMessages.push({ sender: 'Matthias', content: 'Vergeet niet om regelmatig water te geven en onkruid te verwijderen voor gezonde tomatenplanten.' });
                }
            }
        }
    }
};
</script>
  
<style scoped>
.chat-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.message {
    margin-bottom: 10px;
    background-color: var(--deepSeaGreen500);
    border-radius: 8px;
    padding: 1rem;
}

.user-message {
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.message strong {
    font-weight: bold;
}

.input-container {
    display: flex;
    margin-top: 20px;
}

.input-field {
    flex-grow: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.send-button {
    margin-left: 10px;
    padding: 8px 16px;
    background-color: var(--deepSeaGreen800);
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.send-button:hover {
    background-color: var(--deepSeaGreen500);
}
</style>