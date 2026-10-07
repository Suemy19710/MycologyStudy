// How species profile sections are labelled and ordered on the page, and which topic page explains each.
// This is page layout, not content, so it stays in the app bundle instead of the API.
import type { SectionKeyT } from '../api/schemas'
import type { L } from '../i18n/LanguageContext'

export const sectionInfo: { key: SectionKeyT; label: L; topic: string }[] = [
  { key: 'identity', label: { en: 'Identity', vi: 'Định danh' }, topic: '/learn/species-and-strain' },
  { key: 'morphology', label: { en: 'Morphology', vi: 'Hình thái' }, topic: '/learn/morphology' },
  { key: 'physiology', label: { en: 'Physiology', vi: 'Sinh lý' }, topic: '/learn/physiology' },
  { key: 'ecology', label: { en: 'Ecology', vi: 'Sinh thái' }, topic: '/learn/ecology' },
  { key: 'chemistry', label: { en: 'Chemistry', vi: 'Hóa học' }, topic: '/learn/mycotoxins' },
  { key: 'pathogenicity', label: { en: 'Pathogenicity', vi: 'Khả năng gây bệnh' }, topic: '/learn/pathogenicity' },
  { key: 'susceptibility', label: { en: 'Drug response', vi: 'Phản ứng với thuốc' }, topic: '/learn/antifungal-susceptibility' },
  { key: 'dna', label: { en: 'DNA barcode', vi: 'Mã vạch DNA' }, topic: '/learn/dna-barcode' },
]
