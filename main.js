// Warte, bis das HTML geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // document ist representant für ganzes index.html  
    // DOMContentloaded bis ganzes html geladen ist , dann kann allg functions ausgeführt werden
    // function is der block der ausgeführt wird also alles in {}
    
    
    
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
    // Funktion zum Hinzufügen von HTML zur Ausgabe
    function printHTMLToTerminal(htmlString) {
        const newElement = document.createElement('div'); // Nimm div statt p für HTML
        newElement.innerHTML = htmlString; // Setze den HTML-String
        terminalOutput.appendChild(newElement);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    const files = [
        "cv.pdf",
        "liebherr.jpeg",
    ];
    const commands = [
        "help", "clear", "hello", "ls", "get [document]", "echo [text]", "fastfetch", "spin"
    ]
    // Event Listener für die Enter-Taste im Eingabefeld
    terminalInput.addEventListener('keyup', function (event) {
       // es muss ein name mit function uebergeben werden weil wir infos wie key bracuhen
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

//     // Funktion zur Befehlsverarbeitung
//     function processCommand(command) {
// // das hier haette auch in  terminalInput.addEventListener( rein)
//         command = command.toLowerCase(); //kleinmacchen
//         command = command.trim(); // leere spaces weg
//         let command_array = command.split(' ');
//         command = command_array[[0]];
//         let command1 = command_array[1];
//
//         // so ist die ganze eingabe als var gespeichert
//
//         if (command === 'help') {
//             printToTerminal("commands: " + commands.join(', '));
//         } else if (command === 'clear') {
//             terminalOutput.innerHTML = ''; // Leert die Ausgabe
//
//         } else if (command === 'hello') {
//             printToTerminal("Hellooooooooooooo thanks for testing my site:-)!");
//         } else if (command === 'ls') {
//             printToTerminal(files.join('  '))
//             //    macht die files zu einem string 
//
//         } else if (command === 'get') {
//             if (allowed_download(command1)) {
//                 downloadFile(command1);
//                 printToTerminal(`$ ${command1} downloaded!`);
//
//             } else {
//                 printToTerminal(`$ no ${command1} !`);
//             }
//         } else {
//             printToTerminal(`command not found: ${command}`);
//         }
//     }

    // Funktion zur Befehlsverarbeitung
    function processCommand(rawCommand) { // Nimm die rohe Eingabe

        const trimmedCommand = rawCommand.trim(); // Leere spaces weg
        let command_array = trimmedCommand.split(' '); // Teile beim Leerzeichen

        // Nimm das erste Element als Befehl und mach NUR das klein
        let command = command_array[0].toLowerCase();

        // Nimm den REST der Elemente (ab Index 1) und füge sie wieder zusammen
        let argument = command_array.slice(1).join(' ');

        // 'command' ist jetzt z.B. "echo"
        // 'argument' ist jetzt z.B. "Hallo Welt, dies ist ein Test" easy

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
            // Verwende jetzt die 'argument' Variable
            if (argument && allowed_download(argument)) {
                downloadFile(argument);
                printToTerminal(`$ ${argument} downloaded!`);

            } else if (argument) { // Falls Argument da, aber nicht erlaubt
                printToTerminal(`$ no ${argument} !`);
            } else { // Falls kein Argument da
                printToTerminal("Benutzung: get <dateiname>");
            }

        } else if (command === 'echo') { // <<< ECHO BEFEHL
            // Gib einfach die komplette 'argument'-Variable aus
            printToTerminal(argument);
        } else if (command === 'fastfetch') { // <<< NEU HINZUGEFÜGT
            showFastFetch(); // Ruft die neue Funktion auf
        }else if(command === 'spin') {

            printHTMLToTerminal('<p id="loading-spinner">           _..._\n' +
                '         .\'     \'.\n' +
                '        /  _   _  \\\n' +
                '        | (o)_(o) |\n' +
                '         \\(     ) /\n' +
                '         //\'._.\'\\ \\\n' +
                '        //   .   \\ \\\n' +
                '       ||   .     \\ \\\n' +
                '       |\\   :     / |\n' +
                '       \\ `) \'   (`  /_\n' +
                '     _)``".____,.\'"` (_\n' +
                '     )     )\'--\'(     (\n' +
                '      \'---`      `---`\n</p>')
            //image from https://www.ascii-art.de/ascii/jkl/linux.txt
        } else {
            printToTerminal(`command not found: ${command}`);
        }
    }
    

    function allowed_download(dateiname) {
        return files.includes(dateiname);
    }

    // Funktion zum Herunterladen einer Datei
    function downloadFile(dateiname) {


       
        // Wir erstellen ein <a>-Element, so als ob es im HTML stehen würde
        const link = document.createElement('a');
                                    // im ram des browser also nicht zu sehen

        //Pfad zur Datei
        link.href = './src/' + dateiname;
        

        
        // Es sagt dem Browser: "Nicht zu dieser Seite gehen, sondern herunterladen."
        link.download = dateiname;
                    //das ist der name unter der gedoenloaded wird

        // Klicke (unsichtbar) auf den Link
        // Wir simulieren einen Klick auf den Link, um den Download zu starten
        link.click();
    }

    // Fokus immer auf das Input-Feld setzen, wenn man ins Terminal klickt (optional)
    const terminal = document.getElementById('terminal');
    terminal.addEventListener('click', function () {
        terminalInput.focus();
        

    });
    function showFastFetch() {
        // Du kannst jede beliebige ASCII-Art hier einfügen.
        // Diese ist ein einfaches Beispiel.
        const fastfetchOutput = `
               dodo@dudu
    .--.       -----------------------
   |o_o |        OS: Web Browser
   |:_/ |        Host: User's PC
  //   \ \       Kernel: JavaScript (V8)
 (|     | )      Uptime: 42 seconds maybe
/'\_   _/'\      Shell: terminal.js
\___)=(___/      Auflösung: ${window.innerWidth}x${window.innerHeight}
                 CPU: Your Brain :0
//den pinguin habe ich von https://www.ascii-art.de/ascii/jkl/linux.txt preznek borys
              



`;
        // Wir übergeben den ganzen String an printToTerminal.
        // Dank "white-space: pre-wrap;" im CSS wird es korrekt formatiert.
        printToTerminal(fastfetchOutput);
    }

});
    // Ende DOMContentLoaded
