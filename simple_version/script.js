// Konfiguration für Google Sheet und Kalender
const config = {
    url: `https://sheets.googleapis.com/v4/spreadsheets/10E31jYkhiKE_bjMnlxwVItd_X2Z6Fxs_uO6yhD_9Fxg/values/A:E?key=AIzaSyBhiqVypmyLHYPmqZYtvdSvxEopcLZBdYU`,
    colors: {
        bestätigt: '#4CAF50',
        angefragt: '#FFC107'
    }
};

// App starten wenn DOM geladen ist
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Daten laden und anzeigen
        const data = await loadData();
        showCalendar(data);
        showTable(data);
    } catch (error) {
        showError(error);
    }
});

// Daten vom Google Sheet laden
async function loadData() {
    const response = await fetch(config.url);
    const data = await response.json();
    
    // Header-Zeile überspringen und Daten formatieren
    return data.values.slice(1).map(row => ({
        von: row[0],
        bis: row[1],
        name: row[2],
        personen: Number(row[3]),
        status: row[4]
    }));
}

// Kalender anzeigen
function showCalendar(data) {
    new FullCalendar.Calendar(document.getElementById('calendar'), {
        initialView: 'dayGridMonth',
        locale: 'de',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
        },
        events: data.map(item => ({
            title: `${item.name} (${item.personen} Personen)`,
            start: formatDate(item.von),
            end: formatDate(item.bis),
            backgroundColor: config.colors[item.status]
        }))
    }).render();
}

// Tabelle anzeigen
function showTable(data) {
    const table = document.getElementById('reservations-table');
    table.innerHTML = data.map(item => `
        <tr>
            <td>${item.von}</td>
            <td>${item.bis}</td>
            <td>${item.name}</td>
            <td>${item.personen}</td>
            <td><span class="status-${item.status.toLowerCase()}">${item.status}</span></td>
        </tr>
    `).join('');
}

// Datum für Kalender formatieren (DD.MM.YY -> YYYY-MM-DD)
function formatDate(date) {
    const [day, month, year] = date.split('.');
    return `20${year}-${month}-${day}`;
}

// Fehler anzeigen
function showError(error) {
    document.querySelector('.container').innerHTML += `
        <div class="error-message">
            Fehler beim Laden der Daten. Bitte später erneut versuchen.
            <br><small>${error.message}</small>
        </div>
    `;
} 