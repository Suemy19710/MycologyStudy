import type {L} from '../i18n/LanguageContext'

export type TopicGroup = 'start' | 'traits' 

export interface Topic {
    slug: string 
    navLabel: L 
    field: L 
    title: L 
    summary: L 
    group: TopicGroup
}

export const topics: Topic[] = [
  {
    slug: 'what-is-mycology',
    navLabel: { en: 'What is mycology?', vi: 'Nấm học là gì?' },
    field: { en: 'start here', vi: 'bắt đầu' },
    title: { en: 'What is mycology?', vi: 'Nấm học là gì?' },
    summary: {
      en: 'Mycology is the part of biology that studies fungi: how to name them, how they grow, what chemicals they make, and how people use them.',
      vi: 'Nấm học là ngành sinh học nghiên cứu về nấm: cách đặt tên, cách chúng phát triển, các chất chúng tạo ra và cách con người sử dụng chúng.',
    },
    group: 'start',
  },
  {
    slug: 'species-and-strain',
    navLabel: { en: 'Species & strain', vi: 'Loài & chủng' },
    field: { en: 'identity', vi: 'định danh' },
    title: { en: 'Species and strain', vi: 'Loài và chủng' },
    summary: {
      en: 'A species is the kind of fungus. A strain is one real sample of that kind, with its own permanent number.',
      vi: 'Loài là "kiểu" nấm. Chủng là một mẫu thật của loài đó, có mã số cố định riêng.',
    },
    group: 'start',
  },
  {
    slug: 'morphology',
    navLabel: { en: 'Looks', vi: 'Hình thái' },
    field: { en: 'morphology', vi: 'hình thái học' },
    title: { en: 'What it looks like', vi: 'Nấm trông như thế nào' },
    summary: {
      en: 'Scientists describe a fungus at two scales: what you see on the plate, and what appears under a microscope.',
      vi: 'Các nhà khoa học mô tả nấm ở hai mức: những gì thấy trên đĩa nuôi cấy và những gì thấy dưới kính hiển vi.',
    },
    group: 'traits',
  },
  {
    slug: 'physiology',
    navLabel: { en: 'Behaviour', vi: 'Sinh lý' },
    field: { en: 'physiology', vi: 'sinh lý học' },
    title: { en: 'How it behaves', vi: 'Nấm hoạt động ra sao' },
    summary: {
      en: 'Physiology is about what a fungus can do: which temperatures, acids or foods it can handle.',
      vi: 'Sinh lý học tìm hiểu nấm có thể làm gì: chịu được nhiệt độ nào, độ axit nào và dùng được nguồn thức ăn nào.',
    },
    group: 'traits',
  },
  {
    slug: 'ecology',
    navLabel: { en: 'Lifestyle', vi: 'Sinh thái' },
    field: { en: 'ecology', vi: 'sinh thái học' },
    title: { en: 'Where it lives and how', vi: 'Nấm sống ở đâu và như thế nào' },
    summary: {
      en: 'Ecology records where a fungus was found and its relationship with what is around it.',
      vi: 'Sinh thái học ghi lại nơi tìm thấy nấm và mối quan hệ của nó với môi trường xung quanh.',
    },
    group: 'traits',
  },
  {
    slug: 'mycotoxins',
    navLabel: { en: 'Toxins', vi: 'Độc tố' },
    field: { en: 'chemistry', vi: 'hóa học' },
    title: { en: 'Mycotoxins: harmful by-products', vi: 'Độc tố nấm: sản phẩm phụ có hại' },
    summary: {
      en: 'Some fungi make extra chemicals while they grow. A few of them can harm people and animals in tiny amounts.',
      vi: 'Một số loài nấm tạo ra các chất "thêm" khi phát triển. Một vài chất trong đó có thể gây hại cho người và động vật dù chỉ với lượng rất nhỏ.',
    },
    group: 'traits',
  },
  {
    slug: 'pathogenicity',
    navLabel: { en: 'Disease', vi: 'Gây bệnh' },
    field: { en: 'pathogenicity', vi: 'khả năng gây bệnh' },
    title: { en: 'Can it make you sick?', vi: 'Nấm có làm bạn bị bệnh không?' },
    summary: {
      en: 'Pathogenicity asks whether, and how, a fungus causes disease in people, animals or plants.',
      vi: 'Khả năng gây bệnh cho biết nấm có gây bệnh cho người, động vật hay thực vật không, và gây bệnh bằng cách nào.',
    },
    group: 'traits',
  },
  {
    slug: 'antifungal-susceptibility',
    navLabel: { en: 'Drugs', vi: 'Thuốc' },
    field: { en: 'antifungal susceptibility', vi: 'độ nhạy thuốc kháng nấm' },
    title: { en: 'Does the medicine work?', vi: 'Thuốc có hiệu quả không?' },
    summary: {
      en: 'Labs measure how much antifungal drug it takes to stop a strain from growing. That number is the MIC.',
      vi: 'Phòng thí nghiệm đo lượng thuốc kháng nấm cần thiết để ngăn một chủng phát triển. Con số đó gọi là MIC.',
    },
    group: 'traits',
  },
  {
    slug: 'dna-barcode',
    navLabel: { en: 'DNA', vi: 'DNA' },
    field: { en: 'DNA barcode', vi: 'mã vạch DNA' },
    title: { en: 'Identifying by DNA', vi: 'Định danh bằng DNA' },
    summary: {
      en: 'Scientists read one short, standard stretch of DNA and compare it to a reference library, like scanning a barcode.',
      vi: 'Các nhà khoa học đọc một đoạn DNA ngắn, chuẩn hóa và so sánh với thư viện tham chiếu, giống như quét mã vạch.',
    },
    group: 'traits',
  },
]

export function findTopic(slug: string | undefined) {
  const index = topics.findIndex((t) => t.slug === slug)
  return {
    topic: index >= 0 ? topics[index] : undefined,
    prev: index > 0 ? topics[index - 1] : undefined,
    next: index >= 0 && index < topics.length - 1 ? topics[index + 1] : undefined,
  }
}  
