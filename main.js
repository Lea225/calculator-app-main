document.addEventListener('DOMContentLoaded', () => {
    const toggleIcon = document.getElementById('toggleIcon');
    const body = document.body;
    const output = document.getElementById('output');
    const keys = document.querySelectorAll('.key');
    const del = document.querySelector('.del');
    const reset = document.querySelector('.reset');
    const equal = document.querySelector('.equal');

    let currentNumber = '';
    let previousNumber = '';
    let operation = undefined;

    // Fonction pour afficher les numéros
    function appendNumber(number) {
        if (number === '.' && currentNumber.includes('.')) return;
        currentNumber += number.toString();
        updateDisplay();
    }

    // Fonction pour choisir l'opération
    function chooseOperation(operator) {
        if (currentNumber === '') return;
        if (previousNumber !== '') {
            compute();
        }
        operation = operator;
        previousNumber = currentNumber;
        currentNumber = '';
    }

    // Fonction pour effectuer les calculs
    function compute() {
        let computation;
        const prev = parseFloat(previousNumber);
        const current = parseFloat(currentNumber);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case 'add':
                computation = prev + current;
                break;
            case 'subtract':
                computation = prev - current;
                break;
            case 'multiply':
                computation = prev * current;
                break;
            case 'divide':
                computation = prev / current;
                break;
            default:
                return;
        }
        currentNumber = computation.toString();
        operation = undefined;
        previousNumber = '';
    }

    // Fonction pour mettre à jour l'affichage
    function updateDisplay() {
        output.textContent = currentNumber;
    }

    // Gestion des événements des touches numériques
    keys.forEach(key => {
        key.addEventListener('click', () => {
            appendNumber(key.textContent);
        });
    });

    // Gestion des événements des touches d'opération
    const operators = ['add', 'subtract', 'multiply', 'divide'];
    operators.forEach(operator => {
        document.getElementById(operator).addEventListener('click', () => {
            chooseOperation(operator);
        });
    });

    // Gestion de l'événement de la touche supprimer
    del.addEventListener('click', () => {
        currentNumber = currentNumber.toString().slice(0, -1);
        updateDisplay();
    });

    // Gestion de l'événement de la touche reset
    reset.addEventListener('click', () => {
        currentNumber = '0';
        previousNumber = '';
        operation = undefined;
        updateDisplay();
    });

    // Gestion de l'événement de la touche égale
    equal.addEventListener('click', () => {
        compute();
        updateDisplay();
        previousNumber = '';
    });

    // Toggle de thème
    toggleIcon.addEventListener('click', () => {
        if (body.classList.contains('theme-1')) {
            body.classList.remove('theme-1');
            body.classList.add('theme-2', 'mid-active');
        } else if (body.classList.contains('theme-2')) {
            body.classList.remove('theme-2', 'mid-active');
            body.classList.add('theme-3', 'active');
        } else {
            body.classList.remove('theme-3', 'active');
            body.classList.add('theme-1');
        }
        toggleIcon.classList.toggle('active');
    });

    // Vérifier la préférence de thème de l'utilisateur
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    if (prefersDarkScheme.matches) {
        body.classList.add('theme-2');
        toggleIcon.classList.add('active');
    } else {
        body.classList.add('theme-1', 'mid-active');
    }
});
