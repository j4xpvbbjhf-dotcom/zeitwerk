# Zeitwerk

Arbeitszeiterfassung als Web-App. Läuft im Browser, lässt sich am iPhone als
Icon auf den Homescreen legen und funktioniert auch ohne Empfang.

Die App ist die lauffähige Umsetzung des Claude Designs `Zeitwerk.dc.html`.

## Was die App kann

- Tab **Heute** mit Fortschrittsring auf das Tagessoll, Start, Pause und Stopp
- Notiz zur laufenden Arbeitszeit, darunter Gearbeitet, Pause, Rest bis Soll
- Saldo der laufenden Woche, gerechnet gegen das Soll bis heute
- Bereits abgeschlossene Zeiten des Tages direkt antippbar zum Ändern
- Tab **Verlauf** nach echten Kalenderwochen gruppiert, jede Woche mit Summe
  und Saldo, jeder Eintrag antippbar
- Eintrag von Hand nachtragen über den Knopf „Eintrag“
- Tab **Übersicht** mit Woche und Monat, Saldo, Fortschrittsbalken und
  Säulendiagramm mit Soll-Linie
- Tab **Einstellungen** mit Hell, Dunkel, Automatisch, Wochenstunden in
  halben Stunden, Pausen-Erinnerung, CSV Export und Alles löschen
- Pausen-Erinnerung als Dialog, prüft auch rückwirkend beim Öffnen

## Wie die Zeitmessung funktioniert

Die App zählt keine Sekunden hoch, sondern merkt sich echte Zeitstempel für
Start und für jede Pause. Dadurch läuft die Zeit weiter, wenn du das Handy
sperrst oder die App wegwischst. Beim nächsten Öffnen ist der laufende Zustand
wieder da und die Uhr stimmt.

Eine Erfassung über Mitternacht wird beim Stopp auf den Starttag gebucht.
Wird beim Stopp weniger als eine Minute gemessen, wird nichts gespeichert.

## Wie der Saldo gerechnet wird

Das Tagessoll ist die eingestellte Wochenstundenzahl geteilt durch fünf,
Arbeitstage sind fest Montag bis Freitag.

Das Wochensoll wächst mit jedem vergangenen Arbeitstag inklusive dem heutigen.
Am Mittwochabend steht also drei Tagessoll gegen deine bisherige Arbeitszeit,
nicht das volle Wochensoll. Für abgeschlossene Wochen zählt das volle Soll.
Beim Monat gilt dasselbe, dort zählen alle Arbeitstage des Monats bis heute.

Samstag und Sonntag haben kein Soll. Wer an diesen Tagen arbeitet, sammelt
die Zeit voll als Plus.

## Export

CSV mit Semikolon und Spalten Datum, Wochentag, Start, Ende, Gearbeitet,
Stunden dezimal, Pause und Notiz. Der Zeitraum lässt sich auf Woche, Monat
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
