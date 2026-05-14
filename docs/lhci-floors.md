# LHCI Floor-Werte

Die Lighthouse-CI-Schwellen sind bewusst Floor-Werte: Sie schuetzen vor Regressionen, bilden aber nicht das Zielniveau ab. Wenn Performance-Fixes live sind, werden die Floors schrittweise an die neue Realitaet angehoben.

## Aktuelle Floors

| Profil | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Desktop | 0.65 | 0.90 | 0.95 | 0.95 | 7000ms | 0.05 |
| Mobile | 0.68 | 0.91 | 0.95 | 0.95 | 7500ms | 0.05 |

## Kalibrierung

- Desktop basiert auf dem Live-Audit vom 14.05.2026: Performance 0.73, Accessibility 0.96, Best Practices 1.00, SEO 1.00, LCP 5.2s, CLS 0.
- Mobile wurde am 14.05.2026 mit drei Lighthouse-Runs auf `https://hoeger.dev/` gemessen: Performance 0.78, Accessibility 0.96, Best Practices 1.00, SEO 1.00, LCP 5.2-5.3s, CLS 0.
- Die CI prueft die konfigurierten LHCI-URLs fuer Desktop und Mobile.
