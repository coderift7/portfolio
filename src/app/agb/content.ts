export const agbMeta = {
  stand: "12.04.2026",
  version: "2.0",
};

export type Paragraph = {
  num: string;
  title: string;
  legal: string[];
  plainTitle: string;
  plain: string[];
};

export const agb: Paragraph[] = [
  {
    num: "§ 1",
    title: "Geltungsbereich",
    legal: [
      "Diese AGB gelten für alle Verträge zwischen Michael Höger (nachfolgend „Auftragnehmer“) und dem jeweiligen Auftraggeber (nachfolgend „Kunde“) über die Erbringung von IT-Beratungs- und Webdesign-Dienstleistungen.",
      "Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, der Auftragnehmer stimmt ihrer Geltung ausdrücklich schriftlich zu.",
    ],
    plainTitle: "Wann gelten diese Regeln?",
    plain: [
      "Diese Regeln gelten, wenn Sie mich mit einem Projekt beauftragen — egal ob Webseite, Beratung oder etwas anderes.",
      "Eigene Bedingungen von Ihrer Seite übernehme ich nur, wenn wir das vorher schriftlich abgesprochen haben.",
    ],
  },
  {
    num: "§ 2",
    title: "Leistungsumfang",
    legal: [
      "Art und Umfang der Leistungen ergeben sich aus dem jeweiligen Angebot bzw. der Auftragsbestätigung.",
      "Änderungswünsche des Kunden, die über den vereinbarten Leistungsumfang hinausgehen, bedürfen einer gesonderten Vereinbarung und werden zusätzlich vergütet.",
      "Der Auftragnehmer erbringt seine Leistungen nach bestem Wissen und Gewissen unter Einsatz aktueller Technologien und Standards.",
    ],
    plainTitle: "Was ich für Sie mache",
    plain: [
      "Was genau ich mache, steht in Ihrem Angebot. Das ist der Maßstab für alle Beteiligten.",
      "Wenn Sie unterwegs zusätzliche Dinge brauchen, die nicht im Angebot stehen, besprechen wir das kurz und ich kalkuliere den Aufwand extra.",
      "Ich arbeite nach bestem Wissen mit aktuellen Werkzeugen — nicht mit veraltetem Zeug von vorgestern.",
    ],
  },
  {
    num: "§ 3",
    title: "Mitwirkungspflichten des Kunden",
    legal: [
      "Der Kunde stellt dem Auftragnehmer alle für die Durchführung des Auftrags erforderlichen Unterlagen, Daten und Zugänge rechtzeitig und kostenlos zur Verfügung (z. B. Texte, Bilder, Logos, Domain-Zugänge, Hosting-Zugangsdaten).",
      "Der Kunde benennt einen Ansprechpartner, der für Rückfragen und Freigaben zur Verfügung steht.",
      "Verzögerungen, die durch fehlende Mitwirkung des Kunden entstehen, gehen nicht zu Lasten des Auftragnehmers. Vereinbarte Termine verschieben sich entsprechend.",
      "Kommt der Kunde seinen Mitwirkungspflichten trotz schriftlicher Aufforderung mit angemessener Fristsetzung (mindestens 14 Kalendertage) nicht nach, ist der Auftragnehmer berechtigt, das Projekt bis zur Bereitstellung der ausstehenden Zuarbeit ruhen zu lassen. Entsteht durch die Verzögerung Mehraufwand (z. B. erneute Einarbeitung, Neuplanung), wird dieser nach Aufwand auf Basis des im Angebot vereinbarten Stundensatzes berechnet.",
      "Bleibt die Mitwirkung des Kunden nach erneuter Fristsetzung von 14 Kalendertagen aus, ist der Auftragnehmer berechtigt, den Vertrag außerordentlich zu kündigen. Die bis dahin erbrachten Leistungen sind vollständig zu vergüten.",
    ],
    plainTitle: "Was Sie mir zuarbeiten müssen",
    plain: [
      "Damit ich arbeiten kann, brauche ich von Ihnen Texte, Bilder, Logo und Zugänge zu Ihrer Domain und Ihrem Hosting. Pünktlich und ohne Extrakosten für mich.",
      "Bitte benennen Sie eine Person bei Ihnen, die ich bei Fragen direkt ansprechen kann und die Freigaben erteilen darf.",
      "Wenn ich wegen fehlender Zuarbeit warten muss, verschieben sich vereinbarte Termine automatisch — dafür kann ich nichts.",
      "Wenn Sie trotz schriftlicher Erinnerung und 14 Tagen Frist nichts liefern, lege ich das Projekt pausiert. Entsteht dadurch Mehraufwand (z. B. weil ich mich später wieder einarbeiten muss), rechne ich den nach Stunden ab.",
      "Bleibt auch nach einer zweiten 14-Tage-Frist die Zuarbeit aus, darf ich den Vertrag beenden. Was bis dahin gemacht ist, wird voll bezahlt.",
    ],
  },
  {
    num: "§ 4",
    title: "Angebot und Vertragsschluss",
    legal: [
      "Angebote des Auftragnehmers sind freibleibend und 14 Tage gültig, sofern nicht anders angegeben.",
      "Der Vertrag kommt durch schriftliche Auftragsbestätigung des Auftragnehmers oder durch Aufnahme der Leistungserbringung zustande. Schriftform umfasst auch E-Mail.",
    ],
    plainTitle: "Wie kommt unser Vertrag zustande?",
    plain: [
      "Meine Angebote sind 14 Tage gültig, wenn nicht anders vereinbart.",
      "Der Vertrag gilt, sobald ich Ihren Auftrag schriftlich bestätige oder mit der Arbeit beginne. E-Mail reicht — kein Fax und keine Unterschrift in Blut nötig.",
    ],
  },
  {
    num: "§ 5",
    title: "Vergütung und Zahlungsbedingungen",
    legal: [
      "Die Vergütung richtet sich nach dem jeweiligen Angebot. Alle Preise verstehen sich als Endpreise. Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.",
      "Bei Projekten mit einem Volumen über 500 € ist eine Anzahlung von 50 % bei Auftragserteilung fällig. Die Restzahlung erfolgt nach Abnahme.",
      "Rechnungen sind innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug zahlbar.",
      "Laufende Leistungen (z. B. Wartungsverträge) werden monatlich im Voraus berechnet.",
      "Bei Zahlungsverzug ist der Auftragnehmer berechtigt, Verzugszinsen in gesetzlicher Höhe zu berechnen und laufende Arbeiten bis zum Zahlungseingang auszusetzen.",
    ],
    plainTitle: "Preise und Zahlung",
    plain: [
      "Was Sie zahlen, steht im Angebot — als Endpreis. Ich bin Kleinunternehmer, deshalb kommt keine Mehrwertsteuer dazu.",
      "Bei Projekten über 500 € zahle ich gerne entspannt: 50 % bei Projektstart, den Rest nach Fertigstellung.",
      "Rechnungen zahlen Sie bitte innerhalb von 14 Tagen.",
      "Laufende Sachen wie Wartungsverträge rechne ich monatlich im Voraus ab.",
      "Wenn eine Zahlung ausbleibt, darf ich gesetzliche Verzugszinsen berechnen und pausiere so lange, bis das Geld da ist.",
    ],
  },
  {
    num: "§ 6",
    title: "Projektablauf und Abnahme",
    legal: [
      "Der Auftragnehmer stellt dem Kunden Zwischenstände zur Abstimmung bereit.",
      "Der Kunde hat je Projektphase Anspruch auf bis zu zwei Korrekturschleifen, die im Projektpreis enthalten sind. Weitere Korrekturen werden nach Aufwand berechnet.",
      "Nach Fertigstellung wird der Kunde zur Abnahme aufgefordert. Die Abnahme gilt als erfolgt, wenn der Kunde nicht innerhalb von 14 Kalendertagen nach Aufforderung schriftlich konkrete Mängel benennt.",
      "Die Abnahme gilt ebenfalls als erteilt, wenn der Kunde die Leistung im produktiven Betrieb nutzt (z. B. Veröffentlichung der Website, Nutzung gegenüber Dritten) — unabhängig davon, ob eine ausdrückliche Abnahmeerklärung vorliegt.",
      "Geringfügige Abweichungen, die die Funktionalität nicht beeinträchtigen, berechtigen nicht zur Verweigerung der Abnahme.",
    ],
    plainTitle: "So läuft das Projekt ab",
    plain: [
      "Ich zeige Ihnen Zwischenstände, damit Sie sehen, wo wir stehen und nicht am Ende eine böse Überraschung erleben.",
      "Pro Projektphase haben Sie zwei Korrekturrunden inklusive. Das reicht erfahrungsgemäß dicke. Weitere Runden kosten extra.",
      "Wenn's fertig ist, bitte ich Sie um Ihr OK („Abnahme“). Wenn Sie innerhalb von 14 Tagen nicht konkret sagen, was noch nicht passt, gilt das Projekt als abgenommen.",
      "Auch wenn Sie die Webseite schon live stellen oder in Ihrem Geschäft verwenden, gilt das automatisch als Abnahme — auch ohne formelle Freigabe.",
      "Kleine Abweichungen, die nichts kaputtmachen, sind kein Grund, die Abnahme zu verweigern.",
    ],
  },
  {
    num: "§ 7",
    title: "Nutzungsrechte",
    legal: [
      "Mit vollständiger Bezahlung erhält der Kunde ein einfaches, zeitlich und räumlich unbeschränktes Nutzungsrecht an den erstellten Werken für den im Vertrag definierten Zweck. Ein ausschließliches (exklusives) Nutzungsrecht wird nur bei ausdrücklicher schriftlicher Vereinbarung eingeräumt.",
      "Das Nutzungsrecht umfasst die Verwendung, Veröffentlichung und Darstellung der Werke im vereinbarten Rahmen. Eine Bearbeitung oder Weiterentwicklung durch den Kunden oder Dritte ist zulässig, sofern der Auftragnehmer nicht als Urheber der veränderten Version genannt wird.",
      "Die Weitergabe der Nutzungsrechte an Dritte bedarf der vorherigen schriftlichen Zustimmung des Auftragnehmers, es sei denn, die Weitergabe erfolgt im Rahmen eines Unternehmensverkaufs oder einer Rechtsnachfolge.",
      "Der Auftragnehmer behält das Recht, die erstellten Arbeiten in seinem Portfolio und zu Referenzzwecken zu verwenden, sofern der Kunde nicht ausdrücklich schriftlich widerspricht.",
      "Verwendete Open-Source-Komponenten und Drittanbieter-Lizenzen unterliegen deren jeweiligen Lizenzbedingungen. Der Auftragnehmer informiert den Kunden hierüber.",
      "Bis zur vollständigen Bezahlung verbleiben sämtliche Nutzungsrechte beim Auftragnehmer.",
    ],
    plainTitle: "Was gehört Ihnen am Ende?",
    plain: [
      "Sobald Sie die Rechnung beglichen haben, dürfen Sie alles, was ich für Sie erstellt habe, unbegrenzt für Ihren Zweck nutzen. Exklusiv-Rechte (niemand sonst darf etwas Ähnliches kriegen) gibt's nur, wenn wir das extra schriftlich vereinbaren.",
      "Sie dürfen alles verwenden, veröffentlichen und auch weiterentwickeln lassen — solange mein Name nicht an einer stark veränderten Version klebt.",
      "Wenn Sie die Rechte an jemand anderen weitergeben wollen, fragen Sie mich bitte kurz. Ausnahme: Sie verkaufen Ihre Firma oder vererben sie — dann geht alles automatisch mit.",
      "Ich darf Ihre Projekte in meinem Portfolio zeigen, um neue Kunden zu gewinnen — es sei denn, Sie widersprechen schriftlich.",
      "Wenn ich fremde Bausteine (z. B. kostenlose Open-Source-Software) verwende, sage ich Ihnen Bescheid und erkläre, welche Regeln dafür gelten.",
      "Bis die Rechnung bezahlt ist, bleiben alle Rechte bei mir.",
    ],
  },
  {
    num: "§ 8",
    title: "Gewährleistung",
    legal: [
      "Der Auftragnehmer gewährleistet, dass die erbrachten Leistungen dem vereinbarten Leistungsumfang entsprechen.",
      "Mängel sind unverzüglich, spätestens innerhalb von 14 Tagen nach Entdeckung, schriftlich zu melden.",
      "Bei berechtigten Mängeln hat der Auftragnehmer das Recht zur Nachbesserung innerhalb einer angemessenen Frist.",
      "Die Gewährleistungsfrist beträgt 12 Monate ab Abnahme.",
      "Von der Gewährleistung ausgenommen sind Mängel, die durch nachträgliche Änderungen des Kunden oder Dritter, durch unsachgemäße Nutzung oder durch Änderungen der technischen Umgebung (Browser-Updates, Hosting-Änderungen etc.) entstehen.",
    ],
    plainTitle: "Was, wenn etwas nicht passt?",
    plain: [
      "Ich garantiere Ihnen, dass Sie das bekommen, was im Angebot vereinbart war.",
      "Wenn Sie einen Fehler entdecken, melden Sie ihn mir bitte innerhalb von 14 Tagen per E-Mail.",
      "Wenn der Fehler berechtigt ist, bessere ich ihn in einer fairen Frist nach — kostenlos.",
      "Die Gewährleistung läuft 12 Monate ab der Abnahme.",
      "Nicht abgedeckt sind Probleme, die entstehen, weil Sie oder jemand anderes nachträglich Änderungen gemacht hat, die Webseite falsch benutzt wurde oder sich die Technik drumherum geändert hat (neuer Browser, neuer Hosting-Anbieter o. ä.).",
    ],
  },
  {
    num: "§ 9",
    title: "Haftung",
    legal: [
      "Der Auftragnehmer haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper und Gesundheit.",
      "Bei leichter Fahrlässigkeit haftet der Auftragnehmer nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten). Die Haftung ist in diesem Fall auf den vorhersehbaren, vertragstypischen Schaden begrenzt.",
      "Die Haftung ist bei Einzelprojekten auf die Höhe der vereinbarten Vergütung begrenzt. Bei laufenden Verträgen (Wartung, Retainer) ist die Haftung auf die Summe der in den letzten 12 Monaten gezahlten Vergütung begrenzt.",
      "Die Haftung für entgangenen Gewinn, Datenverlust und mittelbare Schäden ist bei leichter Fahrlässigkeit ausgeschlossen. Für Datenverlust haftet der Auftragnehmer nur insoweit, als der Kunde eine angemessene Datensicherung unterlassen hat.",
      "Der Auftragnehmer haftet nicht für Störungen, Ausfälle oder Sicherheitsvorfälle, die durch Drittanbieter-Dienste verursacht werden (z. B. Hosting-Provider, Domain-Registrar, externe APIs, Content-Delivery-Netzwerke). Gleiches gilt für Schäden durch höhere Gewalt.",
    ],
    plainTitle: "Wer haftet wofür?",
    plain: [
      "Wenn ich absichtlich oder grob nachlässig Mist baue, oder wenn jemand körperlich zu Schaden kommt, hafte ich voll — ohne Einschränkung.",
      "Bei kleinen Versehen hafte ich nur, wenn ich eine richtig wichtige Vertragspflicht verletze, und auch dann nur für den Schaden, mit dem man typischerweise rechnen muss.",
      "Die Summe, für die ich maximal gerade stehe, ist bei Einzelprojekten der Projektpreis. Bei laufenden Verträgen (Wartung) die Summe, die Sie mir in den letzten 12 Monaten gezahlt haben.",
      "Entgangene Gewinne, Datenverluste oder Folgeschäden sind bei kleinen Versehen nicht dabei. Für verlorene Daten bin ich nur verantwortlich, wenn Sie selbst kein vernünftiges Backup hatten.",
      "Wenn Ihr Hosting-Anbieter, der Domain-Dienst oder ein externer Service (z. B. ein Zahlungsanbieter) ausfällt oder gehackt wird, kann ich nichts dafür. Das gilt auch für höhere Gewalt wie Stromausfälle oder Internet-Probleme.",
    ],
  },
  {
    num: "§ 10",
    title: "Vertraulichkeit",
    legal: [
      "Beide Parteien verpflichten sich, vertrauliche Informationen der jeweils anderen Partei nicht an Dritte weiterzugeben und nur für die Zwecke der Zusammenarbeit zu verwenden.",
      "Diese Verpflichtung besteht auch nach Beendigung des Vertrages fort.",
    ],
    plainTitle: "Was unter uns bleibt",
    plain: [
      "Was Sie mir im Projekt anvertrauen (Passwörter, Geschäftszahlen, Strategien), gebe ich nicht weiter und nutze es nur für unser Projekt. Umgekehrt genauso.",
      "Das gilt auch, wenn unsere Zusammenarbeit längst vorbei ist.",
    ],
  },
  {
    num: "§ 11",
    title: "Kündigung",
    legal: [
      "Festpreisprojekte können vom Kunden jederzeit schriftlich gekündigt werden. In diesem Fall sind die bis dahin erbrachten Leistungen zu vergüten. Die Berechnung erfolgt auf Basis des im Angebot vereinbarten Stundensatzes multipliziert mit den nachweislich geleisteten Stunden, mindestens jedoch in Höhe der vereinbarten Anzahlung. Der Auftragnehmer legt dem Kunden eine Aufstellung der erbrachten Leistungen vor.",
      "Laufende Verträge (Wartung, Retainer) können von beiden Seiten mit einer Frist von 30 Tagen zum Monatsende schriftlich gekündigt werden.",
      "Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt insbesondere vor bei Zahlungsverzug von mehr als 30 Tagen trotz Mahnung, bei wiederholter Verletzung wesentlicher Vertragspflichten oder bei Eröffnung eines Insolvenzverfahrens über das Vermögen einer Partei.",
    ],
    plainTitle: "Wie wir auseinandergehen",
    plain: [
      "Bei Festpreisprojekten können Sie jederzeit aussteigen. Sie zahlen dann, was ich bis dahin geleistet habe — berechnet nach Stundensatz mal den tatsächlichen Stunden, mindestens aber die Anzahlung. Ich zeige Ihnen transparent, was ich schon gemacht habe.",
      "Laufende Verträge (z. B. Wartung) können beide Seiten mit 30 Tagen Frist zum Monatsende kündigen.",
      "Aus wichtigem Grund kann jede Seite sofort raus — zum Beispiel wenn eine Rechnung über 30 Tage trotz Mahnung nicht bezahlt wurde, wesentliche Pflichten immer wieder verletzt werden, oder eine Seite in Insolvenz gerät.",
    ],
  },
  {
    num: "§ 12",
    title: "Schlussbestimmungen",
    legal: [
      "Es gilt das Recht der Bundesrepublik Deutschland.",
      "Gerichtsstand ist Limburg an der Lahn, sofern der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.",
      "Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
      "Änderungen und Ergänzungen dieser AGB bedürfen der Schriftform.",
    ],
    plainTitle: "Das juristische Kleingedruckte",
    plain: [
      "Es gilt deutsches Recht.",
      "Wenn Sie Unternehmer sind und es mal zum Streit kommt, ist das Gericht in Limburg an der Lahn zuständig.",
      "Falls einzelne Punkte dieser AGB rechtlich doch nicht haltbar sind, bleiben alle anderen trotzdem gültig.",
      "Änderungen an diesen AGB müssen schriftlich gemacht werden (E-Mail reicht).",
    ],
  },
];
