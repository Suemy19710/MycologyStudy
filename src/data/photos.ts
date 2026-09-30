// Real photos used on the site. All come from Wikimedia Commons under open licences.
// The site loads them directly from Wikimedia, so an internet connection is needed.
// To use your own lab photo instead: put the file in /public/photos/ and set `src: '/photos/your-file.jpg'`.
import type { L } from '../i18n/LanguageContext'

export interface Photo {
  file?: string // Wikimedia Commons file name (without "File:")
  src?: string // or a local path such as /photos/my-plate.jpg
  alt: L
  caption: L
  author: string
  license: string
  ratio?: string // force a shape, e.g. '960 / 222' for a very wide image
  fit?: 'cover' | 'contain' // 'contain' never crops (use for images with labels)
}

// Builds an image URL from a Commons file name. `width` asks Wikimedia for a smaller copy.
export function photoUrl(p: Photo, width = 960) {
  if (p.src) return p.src
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(p.file ?? '')}?width=${width}`
}

export function photoPage(p: Photo) {
  return p.file ? `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(p.file.replace(/ /g, '_'))}` : undefined
}

export const photos = {
  mouldyBread: {
    file: 'Mouldy bread.jpg',
    alt: { en: 'Slices of bread covered in fuzzy mould', vi: 'Lát bánh mì phủ đầy mốc xốp' },
    caption: { en: 'Mould on bread after three days in a bread bin.', vi: 'Mốc trên bánh mì sau ba ngày để trong hộp.' },
    author: 'Matt Wharton',
    license: 'CC BY-SA 2.0',
  },
  yeastCells: {
    file: 'S cerevisiae under DIC microscopy.jpg',
    alt: { en: 'Oval yeast cells under a microscope, some with small buds', vi: 'Tế bào nấm men hình bầu dục dưới kính hiển vi, một số đang nảy chồi' },
    caption: { en: "Baker's yeast (Saccharomyces cerevisiae) cells, some budding.", vi: 'Tế bào nấm men bánh mì (Saccharomyces cerevisiae), một số đang nảy chồi.' },
    author: 'Masur',
    license: 'Public domain',
  },
  buttonMushroom: {
    file: 'Agaricus bisporus mushroom.jpg',
    alt: { en: 'White button mushrooms growing on a farm bed', vi: 'Nấm mỡ trắng mọc trên luống trồng' },
    caption: { en: 'Button mushrooms (Agaricus bisporus) on a mushroom farm.', vi: 'Nấm mỡ (Agaricus bisporus) tại trại trồng nấm.' },
    author: 'Мыць Денис',
    license: 'Public domain',
  },
  fumigatusPlateA: {
    file: 'Aspergillus fumigatus growth on SDA.jpg',
    alt: { en: 'Green Aspergillus fumigatus colony on an agar plate', vi: 'Khuẩn lạc Aspergillus fumigatus màu xanh trên đĩa thạch' },
    caption: { en: 'Aspergillus fumigatus culture, lab 1.', vi: 'Mẫu nuôi cấy Aspergillus fumigatus, phòng thí nghiệm 1.' },
    author: 'Ajay Kumar Chaurasiya',
    license: 'CC0',
  },
  fumigatusPlateB: {
    file: 'Aspergillus fumigatus.jpg',
    alt: { en: 'Aspergillus fumigatus colony isolated from soil', vi: 'Khuẩn lạc Aspergillus fumigatus phân lập từ đất' },
    caption: { en: 'Aspergillus fumigatus isolated from soil, lab 2.', vi: 'Aspergillus fumigatus phân lập từ đất, phòng thí nghiệm 2.' },
    author: 'Dr. David Midgley',
    license: 'CC BY-SA 2.5',
  },
  fumigatusColony: {
    file: 'Aspergillus fumigatus colony morphology on Sabouraud dextrose agar (SDA) plate.jpg',
    alt: { en: 'Velvety blue-green colony with a white edge on an agar plate', vi: 'Khuẩn lạc mịn như nhung, màu xanh lam-lục, viền trắng trên đĩa thạch' },
    caption: { en: 'By eye: a velvety, blue-green Aspergillus fumigatus colony with a white edge.', vi: 'Bằng mắt thường: khuẩn lạc Aspergillus fumigatus mịn như nhung, màu xanh lam-lục, viền trắng.' },
    author: 'Ajay Kumar Chaurasiya',
    license: 'CC BY-SA 4.0',
  },
  aspergillusMicro: {
    file: 'Conidia, sterigma, vesicle, conidiophores, foot cell, hyphae, and mycelium of Aspergillus.jpg',
    alt: { en: 'Aspergillus under the microscope, stained blue, showing spore heads on stalks', vi: 'Aspergillus dưới kính hiển vi, nhuộm xanh, thấy các đầu bào tử trên cuống' },
    caption: { en: 'Under the microscope: Aspergillus hyphae and spore-bearing heads, stained blue.', vi: 'Dưới kính hiển vi: sợi nấm và đầu mang bào tử của Aspergillus, nhuộm màu xanh.' },
    author: 'Ajay Kumar Chaurasiya',
    license: 'CC BY-SA 4.0',
    ratio: '16 / 9',
  },
  penicilliumLabelled: {
    file: 'Penicillium labeled cropped.jpg',
    alt: { en: 'Penicillium under the microscope with labels for hypha, septa and conidia', vi: 'Penicillium dưới kính hiển vi có chú thích sợi nấm, vách ngăn và bào tử' },
    caption: { en: 'Penicillium at 200×, with the hypha, septa and conidia labelled.', vi: 'Penicillium phóng đại 200 lần, có chú thích sợi nấm, vách ngăn và bào tử đính.' },
    author: 'Y_tambe; derivative by Adrian J. Hunter',
    license: 'CC BY-SA 3.0',
    fit: 'contain',
  },
  penicilliaPlates: {
    file: 'Penicillia on Petri dish.jpg',
    alt: { en: 'Two Penicillium moulds growing on a petri dish', vi: 'Hai loại nấm mốc Penicillium mọc trên đĩa petri' },
    caption: { en: 'Penicillium commune and P. chrysogenum growing on a plate. Labs test growth on plates like this.', vi: 'Penicillium commune và P. chrysogenum trên đĩa nuôi cấy. Phòng thí nghiệm kiểm tra sự phát triển trên những đĩa như thế này.' },
    author: 'Convallaria majalis',
    license: 'CC BY-SA 4.0',
  },
  fungusOnLog: {
    file: 'Fungus on log.jpg',
    alt: { en: 'Orange bracket fungus on a dead tree stump', vi: 'Nấm dạng giá màu cam trên gốc cây chết' },
    caption: { en: 'A saprotroph breaking down a dead tree stump.', vi: 'Nấm hoại sinh đang phân hủy một gốc cây chết.' },
    author: 'Fir0002',
    license: 'CC BY-SA 3.0',
  },
  cornSmut: {
    file: 'Ustilago maydis J1b.jpg',
    alt: { en: 'Swollen grey galls of corn smut on a maize plant', vi: 'Các u sưng màu xám do nấm than ngô trên cây ngô' },
    caption: { en: 'A pathogen: corn smut (Ustilago maydis) on a maize plant.', vi: 'Tác nhân gây bệnh: nấm than ngô (Ustilago maydis) trên cây ngô.' },
    author: 'Jamain',
    license: 'CC BY-SA 3.0',
  },
  mycorrhiza: {
    file: 'Vesicular Arbuscular Mycorrhizae 40X0031 03.jpg',
    alt: { en: 'Fungal threads inside plant root cells under the microscope', vi: 'Sợi nấm bên trong tế bào rễ cây dưới kính hiển vi' },
    caption: { en: 'A symbiont: mycorrhizal fungus living inside a plant root.', vi: 'Nấm cộng sinh: nấm rễ sống bên trong rễ cây.' },
    author: 'Rajarshi Rit',
    license: 'CC BY 4.0',
  },
  aspergillusFlavus: {
    file: 'Aspergillus flavus in petri dish.png',
    alt: { en: 'Yellow-green granular Aspergillus flavus colony on a petri dish', vi: 'Khuẩn lạc Aspergillus flavus dạng hạt, màu vàng lục trên đĩa petri' },
    caption: { en: 'Aspergillus flavus, a mould that can produce aflatoxin.', vi: 'Aspergillus flavus, loài nấm mốc có thể sinh aflatoxin.' },
    author: 'Dr. Hardin, CDC',
    license: 'Public domain',
  },
  candidaColony: {
    file: 'Candida albicans -ATCC 10231 colony morphology on Sabouraud Dextrose Agar (SDA).jpg',
    alt: { en: 'Creamy white Candida albicans colonies on an agar plate', vi: 'Khuẩn lạc Candida albicans màu trắng kem trên đĩa thạch' },
    caption: { en: 'Candida albicans, a yeast that can infect people, grown on agar.', vi: 'Candida albicans, một loài nấm men có thể gây bệnh ở người, nuôi cấy trên thạch.' },
    author: 'Ajay Kumar Chaurasiya',
    license: 'CC0',
  },
  candidaMicro: {
    file: 'Candida albicans.jpg',
    alt: { en: 'Candida albicans forming thread-like filaments under the microscope', vi: 'Candida albicans tạo sợi dưới kính hiển vi' },
    caption: { en: 'Candida albicans can switch from round cells to threads, one of its virulence tricks.', vi: 'Candida albicans có thể chuyển từ tế bào tròn sang dạng sợi, một "mánh" độc lực của nó.' },
    author: 'Y tambe',
    license: 'CC BY-SA 3.0',
  },
  terreusDisc: {
    file: 'Aspergillus terreus Antifungal Susceptibility Testing on Sabouraud Dextrose Agar.jpg',
    alt: { en: 'Brown mould growing right up to two antifungal paper discs on an agar plate', vi: 'Nấm mốc màu nâu mọc sát hai đĩa giấy tẩm thuốc kháng nấm trên đĩa thạch' },
    caption: {
      en: 'Aspergillus terreus grows right up to two amphotericin B discs: no clear zone, so the drug does not stop it. This species is naturally resistant.',
      vi: 'Aspergillus terreus mọc sát hai đĩa amphotericin B: không có vùng trong, nghĩa là thuốc không ngăn được nấm. Loài này đề kháng tự nhiên.',
    },
    author: 'Ajay Kumar Chaurasiya',
    license: 'CC0',
  },
  microtiterPlate: {
    file: 'Microtiter plate.JPG',
    alt: { en: 'A plastic plate with 96 small wells', vi: 'Một khay nhựa có 96 giếng nhỏ' },
    caption: { en: 'A 96-well plate. MIC tests use plates like this.', vi: 'Khay 96 giếng. Xét nghiệm MIC dùng những khay như thế này.' },
    author: 'Jeffrey M. Vinocur',
    license: 'CC BY 2.5',
  },
  gel: {
    file: 'Gel electrophoresis 2.jpg',
    alt: { en: 'Glowing DNA bands in an electrophoresis gel', vi: 'Các vạch DNA phát sáng trong gel điện di' },
    caption: { en: 'DNA copied by PCR shows up as bands in a gel before it is sequenced.', vi: 'DNA được nhân bản bằng PCR hiện thành các vạch trên gel trước khi giải trình tự.' },
    author: 'Mnolf',
    license: 'CC BY-SA 3.0',
  },
  sangerRead: {
    file: 'Sanger sequencing read display.png',
    alt: { en: 'Coloured peaks of a DNA sequencing read with letters above', vi: 'Các đỉnh màu của kết quả giải trình tự DNA với chữ cái phía trên' },
    caption: { en: 'A sequencing read: each coloured peak is one DNA letter (A, C, G or T).', vi: 'Kết quả giải trình tự: mỗi đỉnh màu là một chữ cái DNA (A, C, G hoặc T).' },
    author: 'Loris',
    license: 'Public domain',
    ratio: '960 / 222',
    fit: 'contain',
  },
  fumigatusMicro: {
    file: 'Aspergillus fumigatus from microscope.jpg',
    alt: { en: 'Aspergillus fumigatus spore heads under the microscope', vi: 'Đầu bào tử Aspergillus fumigatus dưới kính hiển vi' },
    caption: { en: 'Aspergillus fumigatus under the microscope: spore heads with chains of conidia.', vi: 'Aspergillus fumigatus dưới kính hiển vi: đầu bào tử với các chuỗi bào tử đính.' },
    author: 'Szarysweter',
    license: 'CC BY 4.0',
  },
  yeastColonies: {
    file: 'Saccharomyces cerevisiae YGC colonies 50.jpg',
    alt: { en: 'Cream-coloured round yeast colonies on agar', vi: 'Khuẩn lạc nấm men tròn màu kem trên thạch' },
    caption: { en: 'Saccharomyces cerevisiae colonies on agar: smooth, cream and moist.', vi: 'Khuẩn lạc Saccharomyces cerevisiae trên thạch: nhẵn, màu kem, ẩm.' },
    author: 'A doubt',
    license: 'CC BY-SA 4.0',
  },
  yeastSEM: {
    file: 'Saccharomyces cerevisiae SEM.jpg',
    alt: { en: 'Yeast cells seen with an electron microscope, some with bud scars', vi: 'Tế bào nấm men dưới kính hiển vi điện tử, một số có sẹo chồi' },
    caption: { en: 'Yeast cells under an electron microscope. Round marks are scars left by earlier buds.', vi: 'Tế bào nấm men dưới kính hiển vi điện tử. Các vết tròn là sẹo do các chồi trước để lại.' },
    author: 'Mogana Das Murtey, Patchamuthu Ramasamy',
    license: 'CC BY 3.0',
  },
} satisfies Record<string, Photo>
