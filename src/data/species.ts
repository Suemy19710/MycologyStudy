// Species profiles: one worked example per species, covering all eight MycoBase categories.
// To add a species, copy one object below and fill in every section.
// TypeScript will complain if you forget a section, because `sections` is a Record over all eight keys.
import type { L } from '../i18n/LanguageContext'
import { photos, type Photo } from './photos'

export type SectionKey =
  | 'identity'
  | 'morphology'
  | 'physiology'
  | 'ecology'
  | 'chemistry'
  | 'pathogenicity'
  | 'susceptibility'
  | 'dna'

// Order of sections on the page, their labels, and the topic page that explains each one.
export const sectionInfo: { key: SectionKey; label: L; topic: string }[] = [
  { key: 'identity', label: { en: 'Identity', vi: 'Định danh' }, topic: '/learn/species-and-strain' },
  { key: 'morphology', label: { en: 'Morphology', vi: 'Hình thái' }, topic: '/learn/morphology' },
  { key: 'physiology', label: { en: 'Physiology', vi: 'Sinh lý' }, topic: '/learn/physiology' },
  { key: 'ecology', label: { en: 'Ecology', vi: 'Sinh thái' }, topic: '/learn/ecology' },
  { key: 'chemistry', label: { en: 'Chemistry', vi: 'Hóa học' }, topic: '/learn/mycotoxins' },
  { key: 'pathogenicity', label: { en: 'Pathogenicity', vi: 'Khả năng gây bệnh' }, topic: '/learn/pathogenicity' },
  { key: 'susceptibility', label: { en: 'Drug response', vi: 'Phản ứng với thuốc' }, topic: '/learn/antifungal-susceptibility' },
  { key: 'dna', label: { en: 'DNA barcode', vi: 'Mã vạch DNA' }, topic: '/learn/dna-barcode' },
]

export interface Fact {
  label: L
  value: L
}

export interface Section {
  summary: L
  facts: Fact[]
  photos?: Photo[]
  refs: string[] // ids from data/references.ts
}

export interface SpeciesProfile {
  slug: string
  name: string // scientific name
  commonName: L
  form: L // mould, yeast, mushroom
  tags: L[] // short badges shown at the top
  photo: Photo
  lineage: string[] // kingdom → genus
  sections: Record<SectionKey, Section>
}

export const species: SpeciesProfile[] = [
  {
    slug: 'aspergillus-fumigatus',
    name: 'Aspergillus fumigatus',
    commonName: { en: 'A heat-loving compost mould', vi: 'Nấm mốc ưa nhiệt trong phân ủ' },
    form: { en: 'Mould', vi: 'Nấm mốc' },
    tags: [
      { en: 'Grows at 50 °C', vi: 'Mọc được ở 50 °C' },
      { en: 'Opportunistic pathogen', vi: 'Tác nhân gây bệnh cơ hội' },
      { en: 'WHO critical priority', vi: 'WHO ưu tiên nghiêm trọng' },
    ],
    photo: photos.fumigatusColony,
    lineage: ['Fungi', 'Ascomycota', 'Eurotiomycetes', 'Eurotiales', 'Aspergillaceae', 'Aspergillus'],
    sections: {
      identity: {
        summary: {
          en: 'A very common mould and the most important Aspergillus in medicine.',
          vi: 'Một loài nấm mốc rất phổ biến và là loài Aspergillus quan trọng nhất trong y học.',
        },
        facts: [
          {
            label: { en: 'Name meaning', vi: 'Ý nghĩa tên' },
            value: {
              en: '"fumigatus" means smoky, after the grey-green, smoke-coloured spores.',
              vi: '"fumigatus" nghĩa là "khói", theo màu xám lục như khói của bào tử.',
            },
          },
          {
            label: { en: 'Reference strain', vi: 'Chủng tham chiếu' },
            value: {
              en: 'Af293, a clinical isolate whose full genome was published in 2005.',
              vi: 'Af293, chủng phân lập lâm sàng, được công bố toàn bộ bộ gen năm 2005.',
            },
          },
          {
            label: { en: 'Close relatives', vi: 'Họ hàng gần' },
            value: {
              en: 'Belongs to Aspergillus section Fumigati, together with look-alikes such as A. lentulus.',
              vi: 'Thuộc nhóm Aspergillus section Fumigati, cùng các loài trông giống như A. lentulus.',
            },
          },
        ],
        refs: ['nierman2005', 'samson2014'],
      },
      morphology: {
        summary: {
          en: 'Fast-growing blue-green colonies; tiny spores in long columns.',
          vi: 'Khuẩn lạc xanh lam-lục mọc nhanh; bào tử rất nhỏ xếp thành cột dài.',
        },
        facts: [
          {
            label: { en: 'By eye', vi: 'Bằng mắt thường' },
            value: {
              en: 'Velvety to powdery, blue-green to grey-green colony with a white edge. Grows fast, covering a plate within days.',
              vi: 'Khuẩn lạc mịn như nhung đến dạng bột, xanh lam-lục đến xám lục, mép trắng. Mọc nhanh, phủ kín đĩa trong vài ngày.',
            },
          },
          {
            label: { en: 'Under the microscope', vi: 'Dưới kính hiển vi' },
            value: {
              en: 'Septate, colourless hyphae. Each spore-bearing stalk ends in a flask-shaped swelling with one row of phialides on its upper part.',
              vi: 'Sợi nấm có vách ngăn, không màu. Mỗi cuống mang bào tử kết thúc bằng một phần phình hình bình, với một hàng thể bình ở nửa trên.',
            },
          },
          {
            label: { en: 'Spores', vi: 'Bào tử' },
            value: {
              en: 'Round, slightly rough conidia, only about 2–3 µm across, in long chains.',
              vi: 'Bào tử đính tròn, hơi nhám, chỉ khoảng 2–3 µm, xếp thành chuỗi dài.',
            },
          },
        ],
        photos: [photos.fumigatusColony, photos.fumigatusMicro],
        refs: ['samson2014', 'latge1999'],
      },
      physiology: {
        summary: {
          en: 'Unusually heat-tolerant, which helps it survive in compost and in the human body.',
          vi: 'Chịu nhiệt khác thường, giúp nấm sống được trong phân ủ và trong cơ thể người.',
        },
        facts: [
          {
            label: { en: 'Temperature', vi: 'Nhiệt độ' },
            value: {
              en: 'Grows well at 37 °C and can still grow at 50–55 °C. Its spores survive up to about 70 °C.',
              vi: 'Mọc tốt ở 37 °C và vẫn mọc được ở 50–55 °C. Bào tử sống sót đến khoảng 70 °C.',
            },
          },
          {
            label: { en: 'Useful lab test', vi: 'Xét nghiệm hữu ích' },
            value: {
              en: 'Growth at 50 °C helps tell it apart from most other Aspergillus species.',
              vi: 'Khả năng mọc ở 50 °C giúp phân biệt với hầu hết các loài Aspergillus khác.',
            },
          },
        ],
        refs: ['latge1999'],
      },
      ecology: {
        summary: {
          en: 'A saprotroph in soil and compost that recycles plant material.',
          vi: 'Nấm hoại sinh trong đất và phân ủ, tái chế vật chất thực vật.',
        },
        facts: [
          {
            label: { en: 'Where it lives', vi: 'Nơi sống' },
            value: {
              en: 'Soil, compost heaps and rotting plant material. Hot compost suits it well.',
              vi: 'Đất, đống phân ủ và vật chất thực vật đang phân hủy. Phân ủ nóng rất phù hợp với nó.',
            },
          },
          {
            label: { en: 'In the air', vi: 'Trong không khí' },
            value: {
              en: 'Its spores float everywhere; a person breathes in several hundred every day, usually without harm.',
              vi: 'Bào tử bay khắp nơi; mỗi người hít vào vài trăm bào tử mỗi ngày, thường không gây hại.',
            },
          },
        ],
        refs: ['latge1999'],
      },
      chemistry: {
        summary: {
          en: 'Makes several secondary metabolites that help it survive and compete.',
          vi: 'Tạo ra nhiều chất chuyển hóa thứ cấp giúp nấm tồn tại và cạnh tranh.',
        },
        facts: [
          {
            label: { en: 'Known compounds', vi: 'Hợp chất đã biết' },
            value: {
              en: 'Gliotoxin, which weakens immune cells, plus fumagillin and helvolic acid.',
              vi: 'Gliotoxin, chất làm suy yếu tế bào miễn dịch, cùng fumagillin và axit helvolic.',
            },
          },
          {
            label: { en: 'Spore pigment', vi: 'Sắc tố bào tử' },
            value: {
              en: 'A melanin pigment gives the spores their colour and protects them.',
              vi: 'Sắc tố melanin tạo màu cho bào tử và bảo vệ chúng.',
            },
          },
        ],
        refs: ['latge1999'],
      },
      pathogenicity: {
        summary: {
          en: 'Harmless for most people, but a serious threat to people with a weak immune system.',
          vi: 'Vô hại với đa số người, nhưng là mối đe dọa nghiêm trọng với người có hệ miễn dịch yếu.',
        },
        facts: [
          {
            label: { en: 'Diseases', vi: 'Bệnh' },
            value: {
              en: 'Aspergillosis: invasive lung infection in immunocompromised patients, allergic disease in people with asthma or cystic fibrosis, and fungus balls in old lung cavities.',
              vi: 'Bệnh aspergillosis: nhiễm trùng phổi xâm lấn ở bệnh nhân suy giảm miễn dịch, bệnh dị ứng ở người hen suyễn hoặc xơ nang, và u nấm trong các hang phổi cũ.',
            },
          },
          {
            label: { en: 'Virulence factors', vi: 'Yếu tố độc lực' },
            value: {
              en: 'Tiny spores that reach deep into the lungs, growth at body temperature, gliotoxin, and a spore coat that hides it from the immune system.',
              vi: 'Bào tử rất nhỏ đi sâu vào phổi, mọc được ở thân nhiệt, gliotoxin, và lớp vỏ bào tử giúp lẩn tránh hệ miễn dịch.',
            },
          },
          {
            label: { en: 'Global status', vi: 'Mức độ toàn cầu' },
            value: {
              en: 'One of four fungi in the "critical" group of the WHO fungal priority pathogens list (2022).',
              vi: 'Một trong bốn loài nấm thuộc nhóm "nghiêm trọng" trong danh sách nấm gây bệnh ưu tiên của WHO (2022).',
            },
          },
        ],
        refs: ['latge1999', 'who2022'],
      },
      susceptibility: {
        summary: {
          en: 'Usually treatable with azoles, but azole resistance is rising.',
          vi: 'Thường điều trị được bằng nhóm azole, nhưng tình trạng kháng azole đang tăng.',
        },
        facts: [
          {
            label: { en: 'Drugs that usually work', vi: 'Thuốc thường có hiệu quả' },
            value: {
              en: 'Voriconazole and other mould-active azoles, and amphotericin B.',
              vi: 'Voriconazole và các azole khác có tác dụng với nấm mốc, cùng amphotericin B.',
            },
          },
          {
            label: { en: 'Naturally resistant to', vi: 'Đề kháng tự nhiên với' },
            value: { en: 'Fluconazole.', vi: 'Fluconazole.' },
          },
          {
            label: { en: 'Resistance', vi: 'Tình trạng kháng thuốc' },
            value: {
              en: 'Azole-resistant strains with the TR34/L98H change in the cyp51A gene spread in the Netherlands and beyond, linked to azole fungicides used in farming.',
              vi: 'Các chủng kháng azole mang biến đổi TR34/L98H ở gen cyp51A đã lan rộng tại Hà Lan và nhiều nơi khác, có liên quan đến thuốc diệt nấm nhóm azole dùng trong nông nghiệp.',
            },
          },
        ],
        refs: ['snelders2008', 'eucast2022'],
      },
      dna: {
        summary: {
          en: 'ITS finds the right group, but a second gene is needed to name the exact species.',
          vi: 'ITS xác định đúng nhóm, nhưng cần thêm một gen nữa để gọi đúng tên loài.',
        },
        facts: [
          {
            label: { en: 'ITS', vi: 'ITS' },
            value: {
              en: 'Places it in section Fumigati, but cannot reliably separate it from close relatives.',
              vi: 'Xếp được vào nhóm Fumigati, nhưng không phân biệt chắc chắn với các loài họ hàng gần.',
            },
          },
          {
            label: { en: 'Extra barcodes', vi: 'Mã vạch bổ sung' },
            value: {
              en: 'β-tubulin (benA) or calmodulin (CaM) genes separate the species.',
              vi: 'Gen β-tubulin (benA) hoặc calmodulin (CaM) giúp phân biệt các loài.',
            },
          },
        ],
        refs: ['schoch2012', 'samson2014'],
      },
    },
  },
  {
    slug: 'saccharomyces-cerevisiae',
    name: 'Saccharomyces cerevisiae',
    commonName: { en: "Baker's and brewer's yeast", vi: 'Nấm men làm bánh mì và nấu bia' },
    form: { en: 'Yeast', vi: 'Nấm men' },
    tags: [
      { en: 'Used in food', vi: 'Dùng trong thực phẩm' },
      { en: 'Lab model organism', vi: 'Sinh vật mô hình' },
      { en: 'Rarely causes disease', vi: 'Hiếm khi gây bệnh' },
    ],
    photo: photos.yeastColonies,
    lineage: ['Fungi', 'Ascomycota', 'Saccharomycetes', 'Saccharomycetales', 'Saccharomycetaceae', 'Saccharomyces'],
    sections: {
      identity: {
        summary: {
          en: 'The yeast in bread, beer and wine, and one of the best-studied organisms on Earth.',
          vi: 'Loài nấm men trong bánh mì, bia và rượu vang, và là một trong những sinh vật được nghiên cứu nhiều nhất.',
        },
        facts: [
          {
            label: { en: 'Name meaning', vi: 'Ý nghĩa tên' },
            value: {
              en: 'Saccharomyces means "sugar fungus"; cerevisiae comes from the Latin word for beer.',
              vi: 'Saccharomyces nghĩa là "nấm đường"; cerevisiae bắt nguồn từ từ Latin chỉ bia.',
            },
          },
          {
            label: { en: 'Reference strain', vi: 'Chủng tham chiếu' },
            value: {
              en: 'S288C. In 1996 its genome was the first of any eukaryote (organism with a cell nucleus) to be fully read.',
              vi: 'S288C. Năm 1996, bộ gen của nó là bộ gen sinh vật nhân thực đầu tiên được giải trình tự hoàn chỉnh.',
            },
          },
        ],
        refs: ['goffeau1996'],
      },
      morphology: {
        summary: {
          en: 'Single oval cells that multiply by budding.',
          vi: 'Tế bào đơn hình bầu dục, sinh sản bằng cách nảy chồi.',
        },
        facts: [
          {
            label: { en: 'By eye', vi: 'Bằng mắt thường' },
            value: {
              en: 'Smooth, moist, cream-coloured colonies that look like drops of butter.',
              vi: 'Khuẩn lạc nhẵn, ẩm, màu kem, trông như những giọt bơ.',
            },
          },
          {
            label: { en: 'Under the microscope', vi: 'Dưới kính hiển vi' },
            value: {
              en: 'Round to oval cells, roughly 5–10 µm. Each bud leaves a scar on the mother cell.',
              vi: 'Tế bào tròn đến bầu dục, khoảng 5–10 µm. Mỗi lần nảy chồi để lại một vết sẹo trên tế bào mẹ.',
            },
          },
          {
            label: { en: 'Sexual spores', vi: 'Bào tử hữu tính' },
            value: {
              en: 'Under stress it forms up to four ascospores inside a small sac (ascus).',
              vi: 'Khi gặp điều kiện bất lợi, nó tạo tối đa bốn bào tử túi bên trong một túi nhỏ (ascus).',
            },
          },
        ],
        photos: [photos.yeastColonies, photos.yeastSEM],
        refs: ['webster2007'],
      },
      physiology: {
        summary: {
          en: 'A champion fermenter: turns sugar into alcohol and carbon dioxide.',
          vi: 'Chuyên gia lên men: biến đường thành rượu và khí CO₂.',
        },
        facts: [
          {
            label: { en: 'Fermentation', vi: 'Lên men' },
            value: {
              en: 'Ferments sugar to ethanol and CO₂, even when oxygen is available.',
              vi: 'Lên men đường thành ethanol và CO₂, kể cả khi có oxy.',
            },
          },
          {
            label: { en: 'Temperature', vi: 'Nhiệt độ' },
            value: { en: 'Grows best at around 30 °C.', vi: 'Mọc tốt nhất ở khoảng 30 °C.' },
          },
          {
            label: { en: 'Tolerance', vi: 'Khả năng chịu đựng' },
            value: {
              en: 'Copes with high sugar and alcohol levels that stop many other microbes.',
              vi: 'Chịu được nồng độ đường và cồn cao, mức làm nhiều vi sinh vật khác ngừng phát triển.',
            },
          },
        ],
        refs: ['webster2007'],
      },
      ecology: {
        summary: {
          en: 'Lives on sugary surfaces in nature and has been domesticated by people for thousands of years.',
          vi: 'Sống trên bề mặt có đường trong tự nhiên và đã được con người thuần hóa hàng nghìn năm.',
        },
        facts: [
          {
            label: { en: 'In nature', vi: 'Trong tự nhiên' },
            value: {
              en: 'Fruit, flowers and tree sap. Social wasps carry it through winter and spread it to grapes.',
              vi: 'Trái cây, hoa và nhựa cây. Ong vò vẽ mang nấm men qua mùa đông và lan truyền sang nho.',
            },
          },
          {
            label: { en: 'With people', vi: 'Với con người' },
            value: {
              en: 'Bread, beer, wine and biotechnology. Domesticated strains differ from wild ones.',
              vi: 'Bánh mì, bia, rượu vang và công nghệ sinh học. Các chủng thuần hóa khác với chủng hoang dã.',
            },
          },
        ],
        refs: ['stefanini2012'],
      },
      chemistry: {
        summary: {
          en: 'Makes useful products, not toxins.',
          vi: 'Tạo ra các sản phẩm hữu ích, không phải độc tố.',
        },
        facts: [
          {
            label: { en: 'Main products', vi: 'Sản phẩm chính' },
            value: {
              en: 'Ethanol, carbon dioxide (makes dough rise) and flavour compounds such as esters.',
              vi: 'Ethanol, khí CO₂ (làm bột nở) và các hợp chất tạo hương như ester.',
            },
          },
          {
            label: { en: 'Mycotoxins', vi: 'Độc tố nấm' },
            value: { en: 'None known.', vi: 'Chưa ghi nhận.' },
          },
        ],
        refs: ['webster2007'],
      },
      pathogenicity: {
        summary: {
          en: 'Considered safe. Infections are very rare.',
          vi: 'Được coi là an toàn. Nhiễm trùng rất hiếm gặp.',
        },
        facts: [
          {
            label: { en: 'Risk', vi: 'Nguy cơ' },
            value: {
              en: 'Only very rarely infects people, and almost only those who are severely ill or immunocompromised.',
              vi: 'Rất hiếm khi gây nhiễm cho người, và hầu như chỉ ở người bệnh nặng hoặc suy giảm miễn dịch.',
            },
          },
          {
            label: { en: 'Compare', vi: 'So sánh' },
            value: {
              en: 'Unlike A. fumigatus, it is not on the WHO fungal priority list.',
              vi: 'Khác với A. fumigatus, loài này không có trong danh sách ưu tiên của WHO.',
            },
          },
        ],
        refs: ['who2022'],
      },
      susceptibility: {
        summary: {
          en: 'Rarely tested in hospitals, but important in research on how antifungals work.',
          vi: 'Hiếm khi được xét nghiệm ở bệnh viện, nhưng quan trọng trong nghiên cứu cơ chế thuốc kháng nấm.',
        },
        facts: [
          {
            label: { en: 'In research', vi: 'Trong nghiên cứu' },
            value: {
              en: 'Used as a model to study how azoles block ergosterol, a key part of the fungal cell membrane.',
              vi: 'Được dùng làm mô hình để nghiên cứu cách azole ngăn tổng hợp ergosterol, thành phần chính của màng tế bào nấm.',
            },
          },
        ],
        refs: ['webster2007'],
      },
      dna: {
        summary: {
          en: 'ITS works well; yeast labs also use the D1/D2 region.',
          vi: 'ITS cho kết quả tốt; phòng thí nghiệm nấm men còn dùng vùng D1/D2.',
        },
        facts: [
          {
            label: { en: 'Barcodes', vi: 'Mã vạch' },
            value: {
              en: 'ITS plus the D1/D2 part of the large ribosomal subunit gene, the classic marker for yeasts.',
              vi: 'ITS cùng vùng D1/D2 của gen tiểu phần ribosome lớn, dấu chuẩn kinh điển cho nấm men.',
            },
          },
        ],
        refs: ['schoch2012', 'kurtzman1998'],
      },
    },
  },
]

export function findSpecies(slug: string | undefined) {
  return species.find((s) => s.slug === slug)
}
