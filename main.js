// Warte, bis das HTML geladen ist
document.addEventListener('DOMContentLoaded', function() {

    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');

    // Funktion zum Hinzufügen einer Zeile zur Ausgabe
    function printToTerminal(text) {
        const newLine = document.createElement('p');
        newLine.textContent = text;
        terminalOutput.appendChild(newLine);
        // Automatisch nach unten scrollen
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Event Listener für die Enter-Taste im Eingabefeld
    terminalInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = terminalInput.value.trim(); // Eingegebenen Text holen und Leerzeichen entfernen

            if (command) { // Nur wenn etwas eingegeben wurde
                // 1. Eingegebenen Befehl anzeigen (mit Prompt)
                printToTerminal(`$ ${command}`);

                // 2. Befehl verarbeiten (sehr simple Beispiele)
                processCommand(command);

                // 3. Eingabefeld leeren
                terminalInput.value = '';
            }
        }
    });

    // Funktion zur Befehlsverarbeitung
    function processCommand(command) {
        if (command.toLowerCase() === 'help') {
            printToTerminal("Verfügbare Befehle: help, clear, hallo");
        } else if (command.toLowerCase() === 'clear') {
            terminalOutput.innerHTML = ''; // Leert die Ausgabe
        } else if (command.toLowerCase() === 'hallo') {
            printToTerminal("Hallo selbst!");
        } else {
            printToTerminal(`Befehl nicht gefunden: ${command}`);
        }
    }

    // Fokus immer auf das Input-Feld setzen, wenn man ins Terminal klickt (optional)
    const terminal = document.getElementById('terminal');
    terminal.addEventListener('click', function() {
        terminalInput.focus();
    });

}); // Ende DOMContentLoaded