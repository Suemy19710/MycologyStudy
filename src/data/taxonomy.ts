// Content for the "Names & ranks" page (/names).
import type { L } from '../i18n/LanguageContext'
import { photos, type Photo } from './photos'

export interface Rank {
  rank: L
  what: L // plain-language explanation
  ending?: string // standard name ending for fungi at this rank
}

export const ranks: Rank[] = [
  {
    rank: { en: 'Kingdom', vi: 'Giới' },
    what: {
      en: 'The biggest group. All fungi belong to kingdom Fungi, separate from plants and animals.',
      vi: 'Nhóm lớn nhất. Tất cả các loài nấm thuộc giới Nấm (Fungi), tách biệt với thực vật và động vật.',
    },
  },
  {
    rank: { en: 'Phylum', vi: 'Ngành' },
    ending: '-mycota',
    what: {
      en: 'The major branches of fungi. The two largest are split by how they make spores: Ascomycota in a tiny sac, Basidiomycota on club-shaped cells.',
      vi: 'Các nhánh lớn của giới Nấm. Hai ngành lớn nhất khác nhau ở cách tạo bào tử: Ascomycota (nấm túi) tạo bào tử trong một túi nhỏ, Basidiomycota (nấm đảm) tạo bào tử trên tế bào hình chùy.',
    },
  },
  {
    rank: { en: 'Class', vi: 'Lớp' },
    ending: '-mycetes',
    what: { en: 'A large group of related orders within a phylum.', vi: 'Một nhóm lớn gồm các bộ có họ hàng với nhau trong một ngành.' },
  },
  {
    rank: { en: 'Order', vi: 'Bộ' },
    ending: '-ales',
    what: {
      en: 'A group of related families. Members share a common ancestor and often a similar body plan.',
      vi: 'Một nhóm các họ có quan hệ gần. Các thành viên có chung tổ tiên và thường có cấu trúc cơ thể giống nhau.',
    },
  },
  {
    rank: { en: 'Family', vi: 'Họ' },
    ending: '-aceae',
    what: {
      en: 'A group of related genera. At this level, members often look alike to a trained eye.',
      vi: 'Một nhóm các chi có quan hệ gần. Ở cấp này, các thành viên thường trông giống nhau với người có chuyên môn.',
    },
  },
  {
    rank: { en: 'Genus', vi: 'Chi' },
    what: {
      en: 'A group of closely related species. It is the first word of the scientific name and always starts with a capital letter.',
      vi: 'Một nhóm các loài rất gần nhau. Đây là từ đầu tiên của tên khoa học và luôn viết hoa chữ cái đầu.',
    },
  },
  {
    rank: { en: 'Species', vi: 'Loài' },
    what: {
      en: 'The kind of fungus. Its name has two parts, the genus plus a second word, written in italics.',
      vi: '"Kiểu" nấm. Tên loài gồm hai phần: tên chi và một từ thứ hai, viết nghiêng.',
    },
  },
  {
    rank: { en: 'Strain', vi: 'Chủng' },
    what: {
      en: 'One living sample of a species, kept in a collection with its own ID. Strain is not an official rank, but it is the level labs actually work with.',
      vi: 'Một mẫu sống của loài, được lưu giữ trong bộ sưu tập với mã số riêng. Chủng không phải là bậc phân loại chính thức, nhưng là cấp độ mà phòng thí nghiệm thực sự làm việc.',
    },
  },
]

export interface ExampleFungus {
  key: string
  label: L
  photo: Photo
  // One name per rank, in the same order as `ranks`.
  names: string[]
  strainNote: L
}

export const examples: ExampleFungus[] = [
  {
    key: 'aspergillus',
    label: { en: 'A mould', vi: 'Nấm mốc' },
    photo: photos.fumigatusColony,
    names: ['Fungi', 'Ascomycota', 'Eurotiomycetes', 'Eurotiales', 'Aspergillaceae', 'Aspergillus', 'Aspergillus fumigatus', 'Af293'],
    strainNote: {
      en: 'A well-known reference strain, originally from a patient.',
      vi: 'Một chủng tham chiếu nổi tiếng, ban đầu phân lập từ bệnh nhân.',
    },
  },
  {
    key: 'yeast',
    label: { en: "Baker's yeast", vi: 'Nấm men bánh mì' },
    photo: photos.yeastCells,
    names: ['Fungi', 'Ascomycota', 'Saccharomycetes', 'Saccharomycetales', 'Saccharomycetaceae', 'Saccharomyces', 'Saccharomyces cerevisiae', 'S288C'],
    strainNote: {
      en: 'A laboratory strain used in thousands of genetics studies.',
      vi: 'Một chủng phòng thí nghiệm được dùng trong hàng nghìn nghiên cứu di truyền.',
    },
  },
  {
    key: 'mushroom',
    label: { en: 'Button mushroom', vi: 'Nấm mỡ' },
    photo: photos.buttonMushroom,
    names: ['Fungi', 'Basidiomycota', 'Agaricomycetes', 'Agaricales', 'Agaricaceae', 'Agaricus', 'Agaricus bisporus', 'H97'],
    strainNote: {
      en: 'A strain whose full DNA was read to study the mushroom.',
      vi: 'Một chủng đã được giải trình tự toàn bộ DNA để nghiên cứu loài nấm này.',
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
