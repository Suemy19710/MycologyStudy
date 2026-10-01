// Content for the "Names & ranks" page (/names).
import type { L } from '../i18n/LanguageContext'
import { photos, type Photo } from './photos'

// How formal a level is. Principal ranks are the ones every fungus has;
// secondary ranks are optional steps in between; strain is outside the naming Code.
export type RankTier = 'principal' | 'secondary' | 'infraspecific' | 'informal'

export type RankKey =
  | 'kingdom'
  | 'subkingdom'
  | 'phylum'
  | 'subphylum'
  | 'class'
  | 'subclass'
  | 'order'
  | 'family'
  | 'genus'
  | 'section'
  | 'species'
  | 'infraspecific'
  | 'strain'

export interface Rank {
  key: RankKey
  tier: RankTier
  rank: L
  what: L // plain-language explanation
  ending?: string // standard name ending for fungi at this rank (ICNafp)
}

export const tierLabels: Record<RankTier, L> = {
  principal: { en: 'Main rank', vi: 'Bậc chính' },
  secondary: { en: 'Secondary rank', vi: 'Bậc phụ' },
  infraspecific: { en: 'Below species', vi: 'Dưới loài' },
  informal: { en: 'Not a formal rank', vi: 'Không phải bậc chính thức' },
}

// Ordered from the top of the hierarchy down.
export const ranks: Rank[] = [
  {
    key: 'kingdom',
    tier: 'principal',
    rank: { en: 'Kingdom', vi: 'Giới' },
    what: {
      en: 'The biggest group. All fungi belong to kingdom Fungi, separate from plants and animals.',
      vi: 'Nhóm lớn nhất. Tất cả các loài nấm thuộc giới Nấm (Fungi), tách biệt với thực vật và động vật.',
    },
  },
  {
    key: 'subkingdom',
    tier: 'secondary',
    rank: { en: 'Subkingdom', vi: 'Phân giới' },
    what: {
      en: 'An optional step between kingdom and phylum. Dikarya joins the two largest phyla, whose cells can carry two separate nuclei for part of their life.',
      vi: 'Một bậc tùy chọn giữa giới và ngành. Dikarya gộp hai ngành lớn nhất, có tế bào mang hai nhân riêng biệt trong một phần vòng đời.',
    },
  },
  {
    key: 'phylum',
    tier: 'principal',
    rank: { en: 'Phylum', vi: 'Ngành' },
    ending: '-mycota',
    what: {
      en: 'The major branches of fungi. The two largest are split by how they make spores: Ascomycota in a tiny sac, Basidiomycota on club-shaped cells.',
      vi: 'Các nhánh lớn của giới Nấm. Hai ngành lớn nhất khác nhau ở cách tạo bào tử: Ascomycota (nấm túi) tạo bào tử trong một túi nhỏ, Basidiomycota (nấm đảm) tạo bào tử trên tế bào hình chùy.',
    },
  },
  {
    key: 'subphylum',
    tier: 'secondary',
    rank: { en: 'Subphylum', vi: 'Phân ngành' },
    ending: '-mycotina',
    what: {
      en: 'Splits a phylum into its main lineages: for example Pezizomycotina (most moulds) and Saccharomycotina (budding yeasts) inside Ascomycota.',
      vi: 'Chia một ngành thành các dòng chính: ví dụ Pezizomycotina (phần lớn nấm mốc) và Saccharomycotina (nấm men nảy chồi) trong ngành Ascomycota.',
    },
  },
  {
    key: 'class',
    tier: 'principal',
    rank: { en: 'Class', vi: 'Lớp' },
    ending: '-mycetes',
    what: { en: 'A large group of related orders within a phylum.', vi: 'Một nhóm lớn gồm các bộ có họ hàng với nhau trong một ngành.' },
  },
  {
    key: 'subclass',
    tier: 'secondary',
    rank: { en: 'Subclass', vi: 'Phân lớp' },
    ending: '-mycetidae',
    what: {
      en: 'An optional step inside a very large class. Many classes do not use it at all.',
      vi: 'Một bậc tùy chọn bên trong một lớp rất lớn. Nhiều lớp hoàn toàn không dùng bậc này.',
    },
  },
  {
    key: 'order',
    tier: 'principal',
    rank: { en: 'Order', vi: 'Bộ' },
    ending: '-ales',
    what: {
      en: 'A group of related families. Members share a common ancestor and often a similar body plan.',
      vi: 'Một nhóm các họ có quan hệ gần. Các thành viên có chung tổ tiên và thường có cấu trúc cơ thể giống nhau.',
    },
  },
  {
    key: 'family',
    tier: 'principal',
    rank: { en: 'Family', vi: 'Họ' },
    ending: '-aceae',
    what: {
      en: 'A group of related genera. At this level, members often look alike to a trained eye.',
      vi: 'Một nhóm các chi có quan hệ gần. Ở cấp này, các thành viên thường trông giống nhau với người có chuyên môn.',
    },
  },
  {
    key: 'genus',
    tier: 'principal',
    rank: { en: 'Genus', vi: 'Chi' },
    what: {
      en: 'A group of closely related species. It is the first word of the scientific name and always starts with a capital letter.',
      vi: 'Một nhóm các loài rất gần nhau. Đây là từ đầu tiên của tên khoa học và luôn viết hoa chữ cái đầu.',
    },
  },
  {
    key: 'section',
    tier: 'secondary',
    rank: { en: 'Section', vi: 'Nhánh (section)' },
    what: {
      en: 'A step between genus and species, used in big genera such as Aspergillus. Species in one section look almost identical, so labs often identify a mould "to section" first.',
      vi: 'Một bậc giữa chi và loài, dùng trong các chi lớn như Aspergillus. Các loài trong cùng một section trông gần như giống hệt nhau, nên phòng thí nghiệm thường định danh nấm mốc "đến mức section" trước.',
    },
  },
  {
    key: 'species',
    tier: 'principal',
    rank: { en: 'Species', vi: 'Loài' },
    what: {
      en: 'The kind of fungus. Its name has two parts, the genus plus a second word, written in italics.',
      vi: '"Kiểu" nấm. Tên loài gồm hai phần: tên chi và một từ thứ hai, viết nghiêng.',
    },
  },
  {
    key: 'infraspecific',
    tier: 'infraspecific',
    rank: { en: 'Below species', vi: 'Dưới loài' },
    what: {
      en: 'Finer groups inside one species. Variety (var.) and form (f.) are covered by the naming Code. Forma specialis (f. sp.) names strains that attack one host plant; plant pathologists use it widely, but the Code does not regulate it.',
      vi: 'Các nhóm nhỏ hơn bên trong một loài. Thứ (var.) và dạng (f.) thuộc phạm vi của Bộ luật danh pháp. Dạng chuyên hóa (f. sp.) chỉ các chủng tấn công một loài cây chủ; giới bệnh học thực vật dùng rất rộng rãi, nhưng Bộ luật không quy định nó.',
    },
  },
  {
    key: 'strain',
    tier: 'informal',
    rank: { en: 'Strain', vi: 'Chủng' },
    what: {
      en: 'One living sample of a species, kept in a collection with its own ID. Strain is not a rank and is not governed by the naming Code: the culture collection assigns the ID. Even so, it is the level labs actually work with.',
      vi: 'Một mẫu sống của loài, được lưu giữ trong bộ sưu tập với mã số riêng. Chủng không phải là bậc phân loại và không chịu sự điều chỉnh của Bộ luật danh pháp: bộ sưu tập giống cấp mã số. Dù vậy, đây là cấp độ mà phòng thí nghiệm thực sự làm việc.',
    },
  },
]

export interface ExampleFungus {
  key: string
  label: L
  photo: Photo
  // The name at each rank. Ranks this fungus does not use are left out.
  names: Partial<Record<RankKey, string>>
  authority: string // who described the species, and when
  strainNote: L
}

export const examples: ExampleFungus[] = [
  {
    key: 'aspergillus',
    label: { en: 'A mould', vi: 'Nấm mốc' },
    photo: photos.fumigatusColony,
    names: {
      kingdom: 'Fungi',
      subkingdom: 'Dikarya',
      phylum: 'Ascomycota',
      subphylum: 'Pezizomycotina',
      class: 'Eurotiomycetes',
      subclass: 'Eurotiomycetidae',
      order: 'Eurotiales',
      family: 'Aspergillaceae',
      genus: 'Aspergillus',
      section: 'Aspergillus sect. Fumigati',
      species: 'Aspergillus fumigatus',
      strain: 'Af293',
    },
    authority: 'Fresen. 1863',
    strainNote: {
      en: 'A well-known reference strain, originally from a patient.',
      vi: 'Một chủng tham chiếu nổi tiếng, ban đầu phân lập từ bệnh nhân.',
    },
  },
  {
    key: 'yeast',
    label: { en: "Baker's yeast", vi: 'Nấm men bánh mì' },
    photo: photos.yeastCells,
    names: {
      kingdom: 'Fungi',
      subkingdom: 'Dikarya',
      phylum: 'Ascomycota',
      subphylum: 'Saccharomycotina',
      class: 'Saccharomycetes',
      order: 'Saccharomycetales',
      family: 'Saccharomycetaceae',
      genus: 'Saccharomyces',
      species: 'Saccharomyces cerevisiae',
      strain: 'S288C',
    },
    authority: '(Desm.) Meyen 1838',
    strainNote: {
      en: 'A laboratory strain used in thousands of genetics studies.',
      vi: 'Một chủng phòng thí nghiệm được dùng trong hàng nghìn nghiên cứu di truyền.',
    },
  },
  {
    key: 'mushroom',
    label: { en: 'Button mushroom', vi: 'Nấm mỡ' },
    photo: photos.buttonMushroom,
    names: {
      kingdom: 'Fungi',
      subkingdom: 'Dikarya',
      phylum: 'Basidiomycota',
      subphylum: 'Agaricomycotina',
      class: 'Agaricomycetes',
      subclass: 'Agaricomycetidae',
      order: 'Agaricales',
      family: 'Agaricaceae',
      genus: 'Agaricus',
      species: 'Agaricus bisporus',
      strain: 'H97',
    },
    authority: '(J.E. Lange) Imbach 1946',
    strainNote: {
      en: 'A strain whose full DNA was read to study the mushroom.',
      vi: 'Một chủng đã được giải trình tự toàn bộ DNA để nghiên cứu loài nấm này.',
    },
  },
  {
    key: 'fusarium',
    label: { en: 'A plant pathogen', vi: 'Nấm gây bệnh cây' },
    photo: photos.fusariumWilt,
    names: {
      kingdom: 'Fungi',
      subkingdom: 'Dikarya',
      phylum: 'Ascomycota',
      subphylum: 'Pezizomycotina',
      class: 'Sordariomycetes',
      subclass: 'Hypocreomycetidae',
      order: 'Hypocreales',
      family: 'Nectriaceae',
      genus: 'Fusarium',
      species: 'Fusarium oxysporum',
      infraspecific: 'Fusarium oxysporum f. sp. lycopersici',
      strain: '4287',
    },
    authority: 'Schltdl. 1824',
    strainNote: {
      en: 'A reference strain for tomato wilt research. Its full genome was published in 2010.',
      vi: 'Một chủng tham chiếu trong nghiên cứu bệnh héo cà chua. Toàn bộ hệ gen của nó được công bố năm 2010.',
    },
  },
]

export type TermGroup = 'naming' | 'tree' | 'collections'

export const termGroups: { value: TermGroup | 'all'; label: L }[] = [
  { value: 'all', label: { en: 'All', vi: 'Tất cả' } },
  { value: 'naming', label: { en: 'Naming', vi: 'Đặt tên' } },
  { value: 'tree', label: { en: 'Family tree', vi: 'Cây phát sinh' } },
  { value: 'collections', label: { en: 'Samples & collections', vi: 'Mẫu & bộ sưu tập' } },
]

export interface Term {
  term: L
  group: TermGroup
  meaning: L
  example?: L
}

export const terms: Term[] = [
  // Naming
  {
    term: { en: 'Taxonomy', vi: 'Phân loại học' },
    group: 'naming',
    meaning: {
      en: 'The science of describing, naming and sorting living things into groups.',
      vi: 'Khoa học mô tả, đặt tên và sắp xếp sinh vật thành các nhóm.',
    },
  },
  {
    term: { en: 'Taxon (plural: taxa)', vi: 'Đơn vị phân loại (taxon, số nhiều: taxa)' },
    group: 'naming',
    meaning: {
      en: 'Any named group of organisms, at any rank. A genus is a taxon, a species is a taxon, and so is the whole kingdom Fungi.',
      vi: 'Bất kỳ nhóm sinh vật nào đã được đặt tên, ở bất kỳ bậc nào. Một chi là một taxon, một loài là một taxon, và cả giới Nấm cũng vậy.',
    },
    example: {
      en: 'Fungi, Aspergillus and Aspergillus fumigatus are all taxa',
      vi: 'Fungi, Aspergillus và Aspergillus fumigatus đều là các taxon',
    },
  },
  {
    term: { en: 'Rank', vi: 'Bậc phân loại' },
    group: 'naming',
    meaning: {
      en: 'A level in the naming hierarchy, such as family, genus or species.',
      vi: 'Một cấp trong hệ thống phân loại, như họ, chi hoặc loài.',
    },
  },
  {
    term: { en: 'Scientific name (binomial)', vi: 'Tên khoa học (danh pháp hai phần)' },
    group: 'naming',
    meaning: {
      en: 'The official two-part name of a species: genus plus a second word. Written in italics, with only the genus capitalised.',
      vi: 'Tên chính thức gồm hai phần của một loài: tên chi và một từ thứ hai. Viết nghiêng, chỉ viết hoa chữ cái đầu của tên chi.',
    },
    example: { en: 'Penicillium chrysogenum', vi: 'Penicillium chrysogenum' },
  },
  {
    term: { en: 'Specific epithet', vi: 'Tính ngữ loài' },
    group: 'naming',
    meaning: {
      en: 'The second word of a species name. It only has meaning together with the genus.',
      vi: 'Từ thứ hai trong tên loài. Nó chỉ có nghĩa khi đi cùng tên chi.',
    },
    example: { en: '"fumigatus" in Aspergillus fumigatus', vi: '"fumigatus" trong Aspergillus fumigatus' },
  },
  {
    term: { en: 'Authority (author citation)', vi: 'Tác giả (trích dẫn tác giả)' },
    group: 'naming',
    meaning: {
      en: 'The name of the scientist who described a taxon, written after it in upright letters. A name in brackets is the person who first described the species in another genus.',
      vi: 'Tên nhà khoa học đã mô tả đơn vị phân loại, viết đứng (không nghiêng) ngay sau tên. Tên trong ngoặc là người đầu tiên mô tả loài đó trong một chi khác.',
    },
    example: { en: 'Saccharomyces cerevisiae (Desm.) Meyen', vi: 'Saccharomyces cerevisiae (Desm.) Meyen' },
  },
  {
    term: { en: 'Section (sect.)', vi: 'Section (sect.)' },
    group: 'naming',
    meaning: {
      en: 'A rank between genus and species, used to sort a large genus into groups of near-identical species.',
      vi: 'Một bậc giữa chi và loài, dùng để chia một chi lớn thành các nhóm loài gần như giống hệt nhau.',
    },
    example: { en: 'Aspergillus sect. Fumigati', vi: 'Aspergillus sect. Fumigati' },
  },
  {
    term: { en: 'Forma specialis (f. sp.)', vi: 'Dạng chuyên hóa (f. sp.)' },
    group: 'naming',
    meaning: {
      en: 'A group of strains within one species that can only infect a particular host plant. Widely used in plant pathology, but not regulated by the naming Code.',
      vi: 'Một nhóm chủng trong cùng một loài chỉ có thể lây nhiễm một loài cây chủ nhất định. Được dùng rộng rãi trong bệnh học thực vật nhưng không do Bộ luật danh pháp quy định.',
    },
    example: { en: 'Fusarium oxysporum f. sp. lycopersici (tomato)', vi: 'Fusarium oxysporum f. sp. lycopersici (cà chua)' },
  },
  {
    term: { en: 'sp. and spp.', vi: 'sp. và spp.' },
    group: 'naming',
    meaning: {
      en: '"sp." means one species that has not been identified further. "spp." means several species of that genus.',
      vi: '"sp." chỉ một loài chưa được định danh cụ thể. "spp." chỉ nhiều loài trong cùng chi.',
    },
    example: { en: 'Aspergillus sp. · Candida spp.', vi: 'Aspergillus sp. · Candida spp.' },
  },
  {
    term: { en: 'Synonym', vi: 'Tên đồng nghĩa' },
    group: 'naming',
    meaning: {
      en: 'Another name for the same species, often an older one. Names change when new evidence, such as DNA, shows a fungus belongs in a different group.',
      vi: 'Một tên khác của cùng một loài, thường là tên cũ. Tên thay đổi khi bằng chứng mới, như DNA, cho thấy loài nấm thuộc về nhóm khác.',
    },
  },
  {
    term: { en: 'One fungus, one name', vi: 'Một nấm, một tên' },
    group: 'naming',
    meaning: {
      en: 'Many fungi used to have two names: one for the sexual form and one for the asexual form. Since 2013 the rules allow only one name per fungus.',
      vi: 'Trước đây nhiều loài nấm có hai tên: một cho dạng hữu tính và một cho dạng vô tính. Từ năm 2013, quy tắc chỉ cho phép mỗi loài nấm có một tên.',
    },
  },
  {
    term: { en: 'MycoBank', vi: 'MycoBank' },
    group: 'naming',
    meaning: {
      en: 'An online database where new fungal names are registered. Since 2013 a new fungal name must be registered in a recognised database like this to be valid. It is run from the Westerdijk Institute.',
      vi: 'Cơ sở dữ liệu trực tuyến nơi đăng ký tên nấm mới. Từ năm 2013, tên nấm mới phải được đăng ký ở một cơ sở dữ liệu được công nhận như thế này mới hợp lệ. MycoBank được vận hành tại Viện Westerdijk.',
    },
  },
  // Family tree
  {
    term: { en: 'Phylogeny', vi: 'Phát sinh chủng loại' },
    group: 'tree',
    meaning: {
      en: 'The family tree of a group of organisms, usually worked out by comparing DNA.',
      vi: 'Cây gia phả của một nhóm sinh vật, thường được xây dựng bằng cách so sánh DNA.',
    },
  },
  {
    term: { en: 'Clade', vi: 'Nhánh (clade)' },
    group: 'tree',
    meaning: {
      en: 'One complete branch of the family tree: an ancestor and all of its descendants.',
      vi: 'Một nhánh hoàn chỉnh của cây phát sinh: một tổ tiên và toàn bộ hậu duệ của nó.',
    },
  },
  {
    term: { en: 'Species complex', vi: 'Phức hợp loài' },
    group: 'tree',
    meaning: {
      en: 'A group of species that look almost identical and can often only be told apart by DNA.',
      vi: 'Một nhóm loài trông gần như giống hệt nhau và thường chỉ phân biệt được bằng DNA.',
    },
  },
  {
    term: { en: 'Sexual and asexual forms', vi: 'Dạng hữu tính và vô tính' },
    group: 'tree',
    meaning: {
      en: 'Many fungi can reproduce in two ways, and the two forms can look completely different. This is why some fungi once had two names.',
      vi: 'Nhiều loài nấm có thể sinh sản theo hai cách, và hai dạng có thể trông hoàn toàn khác nhau. Đó là lý do một số loài nấm từng có hai tên.',
    },
  },
  // Samples & collections
  {
    term: { en: 'Specimen', vi: 'Mẫu vật (tiêu bản)' },
    group: 'collections',
    meaning: {
      en: 'A physical sample kept for study, such as a dried mushroom or a slide.',
      vi: 'Mẫu vật thật được lưu giữ để nghiên cứu, như nấm sấy khô hoặc tiêu bản trên lam kính.',
    },
  },
  {
    term: { en: 'Isolate', vi: 'Mẫu phân lập' },
    group: 'collections',
    meaning: {
      en: 'A fungus grown out of a sample (soil, food, a patient) until only that one fungus is left on the plate.',
      vi: 'Nấm được nuôi tách ra từ một mẫu (đất, thực phẩm, bệnh nhân) cho đến khi trên đĩa chỉ còn đúng loài nấm đó.',
    },
  },
  {
    term: { en: 'Strain', vi: 'Chủng' },
    group: 'collections',
    meaning: {
      en: 'A characterised isolate kept alive in a collection under a permanent ID. In practice the words isolate and strain are often used almost the same way.',
      vi: 'Mẫu phân lập đã được mô tả đặc điểm và lưu giữ sống trong bộ sưu tập với mã số cố định. Trong thực tế, "mẫu phân lập" và "chủng" thường được dùng gần như nhau.',
    },
  },
  {
    term: { en: 'Pure culture', vi: 'Nuôi cấy thuần khiết' },
    group: 'collections',
    meaning: {
      en: 'A plate or tube in which only one organism is growing, with no contamination.',
      vi: 'Đĩa hoặc ống nuôi cấy chỉ có một loại sinh vật, không bị nhiễm tạp.',
    },
  },
  {
    term: { en: 'Culture collection', vi: 'Bộ sưu tập giống vi sinh' },
    group: 'collections',
    meaning: {
      en: 'A living library of strains, stored frozen or freeze-dried so scientists anywhere can request the same material.',
      vi: 'Một "thư viện sống" các chủng, được bảo quản đông lạnh hoặc đông khô để các nhà khoa học ở bất cứ đâu cũng có thể yêu cầu cùng một mẫu.',
    },
    example: { en: 'The CBS collection at the Westerdijk Institute', vi: 'Bộ sưu tập CBS tại Viện Westerdijk' },
  },
  {
    term: { en: 'Accession number', vi: 'Số hiệu lưu trữ' },
    group: 'collections',
    meaning: {
      en: 'The permanent ID a strain gets in a collection. It never changes, even if the species name does.',
      vi: 'Mã số cố định của một chủng trong bộ sưu tập. Mã này không bao giờ đổi, kể cả khi tên loài thay đổi.',
    },
    example: { en: 'CBS followed by a number', vi: 'CBS kèm theo một con số' },
  },
  {
    term: { en: 'Type specimen', vi: 'Mẫu chuẩn (mẫu điển hình)' },
    group: 'collections',
    meaning: {
      en: 'The one specimen a species name is permanently tied to. If there is ever doubt about what a name means, this is the reference.',
      vi: 'Mẫu vật duy nhất mà tên loài được gắn cố định. Khi có nghi ngờ về ý nghĩa của một tên, đây là mẫu tham chiếu.',
    },
  },
  {
    term: { en: 'Ex-type strain', vi: 'Chủng ex-type' },
    group: 'collections',
    meaning: {
      en: 'A living culture grown from the type material. It is the reference strain scientists compare new DNA sequences against.',
      vi: 'Mẫu nuôi cấy sống được tạo ra từ mẫu chuẩn. Đây là chủng tham chiếu để các nhà khoa học so sánh các trình tự DNA mới.',
    },
  },
]
