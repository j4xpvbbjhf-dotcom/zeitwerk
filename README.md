# Zeitwerk

Arbeitszeiterfassung als Web-App. Läuft im Browser, lässt sich am iPhone als
Icon auf den Homescreen legen und funktioniert auch ohne Empfang.

Die App ist die lauffähige Umsetzung des Claude Designs `Zeitwerk.dc.html`.

## Was die App kann

- Tab **Heute** mit Fortschrittsring auf das Tagessoll, Start, Pause und Stopp
- Zweiter Kreis im Arbeitszeitkreis, sobald du auf Pause drückst. Er füllt
  sich bis zum eingestellten Pausenziel und verschwindet beim Weiterarbeiten
  wieder, die Anzeige schaltet dann zurück auf die Arbeitszeit
- Notiz zur laufenden Arbeitszeit, darunter Arbeitszeit, Pausenzeit und Rest
- Saldo der laufenden Woche, wahlweise gegen das volle Wochensoll oder gegen
  das Soll bis heute
- Bereits abgeschlossene Zeiten des Tages direkt antippbar zum Ändern
- Tab **Verlauf** nach echten Kalenderwochen gruppiert, jede Woche mit Summe
  und Saldo, jeder Eintrag antippbar
- Eintrag von Hand nachtragen über den Knopf „Eintrag“
- Tab **Übersicht** mit Woche und Monat, Saldo, Fortschrittsbalken und
  Säulendiagramm mit Soll-Linie
- Tab **Einstellungen** mit Hell, Dunkel, Automatisch, Wochenstunden in
  halben Stunden, Bezug des Saldos, Pausenziel, Pausen-Erinnerung, CSV Export
  und Alles löschen
- Pausen-Erinnerung als Dialog, prüft auch rückwirkend beim Öffnen

## Wie die Zeitmessung funktioniert

Die App zählt keine Sekunden hoch, sondern merkt sich echte Zeitstempel für
Start und für jede Pause. Dadurch läuft die Zeit weiter, wenn du das Handy
sperrst oder die App wegwischst. Beim nächsten Öffnen ist der laufende Zustand
wieder da und die Uhr stimmt.

Eine Erfassung über Mitternacht wird beim Stopp auf den Starttag gebucht.
Wird beim Stopp weniger als eine Minute gemessen, wird nichts gespeichert.

## Wie der Saldo gerechnet wird

Grundlage sind immer die eingestellten Wochenstunden. Ein Monat wird als 4,33
Wochen gerechnet, also 52 Wochen auf 12 Monate. Bei 38,5 Wochenstunden sind
das 166:42 Stunden im Monat.

In den Einstellungen legst du unter „Saldo rechnen gegen“ fest, wogegen
gerechnet wird.

**Volles Soll** ist die Voreinstellung. Der Saldo steht gegen das volle
Wochensoll beziehungsweise gegen das volle Monatssoll. Am Montagmorgen beginnt
die Woche also mit dem vollen Minus und arbeitet sich über die Woche auf null.

**Soll bis heute** rechnet stattdessen anteilig. Das Tagessoll ist die Wochenstunden
geteilt durch fünf und zählt für jeden bereits vergangenen Arbeitstag inklusive
dem heutigen. Am Mittwochabend stehen also drei Tagessoll gegen deine bisherige
Arbeitszeit. Der Monat wird nach demselben Anteil aus den 4,33 Wochen gerechnet.
Abgeschlossene Wochen und Monate zählen in beiden Fällen voll.

Arbeitstage sind fest Montag bis Freitag. Samstag und Sonntag haben kein Soll.
Wer an diesen Tagen arbeitet, sammelt die Zeit voll als Plus.

## Pausenziel

Drückst du auf Pause, startet im Arbeitszeitkreis ein zweiter, gelber Kreis.
Er zeigt die gesamte Pause der laufenden Erfassung und füllt sich bis zum
Pausenziel, voreingestellt 30 Minuten. Pausierst du ein zweites Mal, läuft
derselbe Kreis weiter. Ist das Ziel erreicht, steht das im Kreis.

Beim Weiterarbeiten schaltet die Anzeige zurück auf die Arbeitszeit, der zweite
Kreis verschwindet. Wie viel Pausenzeit du heute schon hast, steht weiterhin in
der Kachel „Pausenzeit“, dort auch das Ziel. Das Pausenziel ist in den Einstellungen in
Fünferschritten einstellbar und mit 0 Minuten abschaltbar.

Getrennt davon gibt es die Pausen-Erinnerung, die sich meldet, wenn du zu lange
ohne Unterbrechung arbeitest.

## Export

CSV mit Semikolon und Spalten Datum, Wochentag, Start, Ende, Arbeitszeit,
Stunden dezimal, Pausenzeit und Notiz. Der Zeitraum lässt sich auf Woche, Monat
oder ein eigenes Von und Bis stellen.

Am iPhone geht der Export über das Teilen-Menü, am Mac als Download. Die Datei
hat ein BOM, damit Excel die Umlaute richtig anzeigt.

## Aufbau der Dateien

| Datei | Zweck |
|-------|-------|
| `index.html` | gesamte App, Aufbau und Logik |
| `support.js` | Laufzeit des Claude Design Formats, lädt React |
| `sw.js` | Service Worker, macht die App offline und installierbar |
| `manifest.webmanifest` | App Name und Icons fürs Installieren |
| `icons/` | App Icons, blaues Ringsymbol |

## Am iPhone installieren

1. Die Adresse in **Safari** öffnen, nicht in Chrome
2. Unten auf das Teilen Symbol tippen
3. „Zum Home-Bildschirm“ wählen, dann „Hinzufügen“

Danach liegt Zeitwerk als eigenes App Icon am Homescreen und startet im
Vollbild ohne Browserleiste.

## Stand und Grenzen

- Die Daten liegen nur auf dem Gerät im Browserspeicher. Es gibt keine
  Synchronisierung zwischen Geräten, der Weg nach draußen ist der CSV Export.
- Die Pausen-Erinnerung ist ein Dialog in der App. Es gibt keine
  Push-Benachrichtigung, wenn die App geschlossen ist. Beim nächsten Öffnen
  wird die überfällige Erinnerung nachgeholt.
- Übersicht zeigt immer die laufende Woche beziehungsweise den laufenden
  Monat. Es gibt kein Blättern in vergangene Zeiträume, dafür ist der Verlauf da.
- Löscht du die Websitedaten im Browser, sind auch die Zeiten weg. Vor einem
  Gerätewechsel exportieren.
