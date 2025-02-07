new Vue({
    el: '#app',
    data: {
        columns: [
            [],//Первая колонка
            [],//Вторая
            []//Третья
        ]
    },
    methods: {
        addCard(columnIndex) {
            const title = prompt('Введите название карточки:');
            if (!title) return;

            const items = [];
            let itemCount = 0;

            while (itemCount < 5) {
                const text = prompt(`Введите пункт ${itemCount + 1} (оставьте пустым для завершения):`);
                if (!text) break;
                items.push({ text, completed: false });
                itemCount++;
            }
            if (items.length >= 3) {
                this.columns[columnIndex - 1].push({
                    id: Math.random().toString(36).substr(2, 9),
                    title,
                    items,
                    completedAt: null
            });
            this.saveData();
        }else{
            alert('Карточка должна содержать от 3 до 5 пунктов.');
        }
    },
    updateProgress(card) {
        const total = card.items.length;
        const completed = card.items.filter(item => item.completed).length;
        const progress = completed/total;

        if(progress>0.5 && this.columns[0].includes(card)) {
            this.moveCard(card, 1, 0);
        }
        if (progress === 1 && this.columns[1].includes(card)) {
            this.moveCard(card, 2, 1);
            card.completedAt = new Date().toLocaleString();
        }
        this.saveData();
    },
    
}