// Warte, bis das HTML geladen ist
document.addEventListener('DOMContentLoaded', function() {
    //     

    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');

    // Funktion zum Hinzufügen einer Zeile zur Ausgabe
    function printToTerminal(text) {
        const newLine = document.createElement('p'); // wegen newline durch paragraph

        newLine.textContent = text; //gegen rce oder injection
        // wird als reinen text in p riengechireben 
        terminalOutput.appendChild(newLine);
        // der neue <p> wird an terminal output div angehängt 
        // Automatisch nach unten scrollen
        // terminalOutput.scrollTop = terminalOutput.scrollHeight+10;
// scroll auf länge der ganzen scroll height also gang unten im browser
    }

    const files = [
        "cv.pdf",
        "liebherr.jpeg",
    ];
    const commands = [
        "help", "clear", "hello", "ls", "get [document]"
    ]

    // Event Listener für die Enter-Taste im Eingabefeld
    terminalInput.addEventListener('keyup', function (event) {
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

        command = command.toLowerCase(); //kleinmacchen
        command = command.trim(); // leere spaces weg
        let command_array = command.split(' ');
        command = command_array[[0]];
        let command1 = command_array[command_array.length - 1];

        // so ist die ganze eingabe als var gespeichert

        if (command === 'help') {
            printToTerminal("commands: " + commands.join(', '));
        } else if (command === 'clear') {
            terminalOutput.innerHTML = ''; // Leert die Ausgabe

        } else if (command === 'hello') {
            printToTerminal("Hellooooooooooooo thanks for testing my site:-)!");
        } else if (command === 'ls') {
            printToTerminal(files.join('  '))
            //    macht die files zu einem string 

        } else if (command === 'get') {
            if (allowed_download(command1)) {
                downloadFile(command1);
                printToTerminal(`$ ${command1} downloaded!`);

            } else {
                printToTerminal(`$ no ${command1} !`);
            }
        } else {
            printToTerminal(`command not found: ${command}`);
        }
    }


    function allowed_download(dateiname) {
        return files.includes(dateiname);
    }

    // Funktion zum Herunterladen einer Datei
    function downloadFile(dateiname) {


        // 1. Erstelle einen Link im Speicher
        // Wir erstellen ein <a>-Element, so als ob es im HTML stehen würde
        const link = document.createElement('a');


        // 2. Setze den Pfad zur Datei
        // Wir nehmen an, die Datei liegt in einem Ordner namens "files"
        link.href = './src/' + dateiname;

        // 3. Setze den Dateinamen für den Download
        // Das 'download'-Attribut ist der Trick!
        // Es sagt dem Browser: "Nicht zu dieser Seite gehen, sondern herunterladen."
        link.download = dateiname;

        // 4. Klicke (unsichtbar) auf den Link
        // Wir simulieren einen Klick auf den Link, um den Download zu starten
        link.click();
    }

    // Fokus immer auf das Input-Feld setzen, wenn man ins Terminal klickt (optional)
    const terminal = document.getElementById('terminal');
    terminal.addEventListener('click', function () {
        terminalInput.focus();
    });
});
    // Ende DOMContentLoaded
