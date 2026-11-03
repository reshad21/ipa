export type PressRelease = {
  id: string;
  tag?: string;
  tagBn?: string;
  title: string;
  titleBn: string;
  date: string;
  image: string;
  body: string[];
  bodyBn: string[];
};

export const PRESS_RELEASES: PressRelease[] = [
  {
    id: 'press-1',
    tag: 'Press Release',
    tagBn: 'প্রেস বিজ্ঞপ্তি',
    title: 'IPA Launches New Media Observatory Dashboard for Real-Time Monitoring',
    titleBn: 'রিয়েল-টাইম মনিটরিংয়ের জন্য আইপিএ চালু করল নতুন মিডিয়া অবজারভেটরি ড্যাশবোর্ড',
    date: '2025-03-15',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=85',
    body: [
      'The Institute of Public Accountability (IPA) today announced the launch of its new Media Observatory Dashboard, a real-time platform for monitoring broadcast, print, and digital media across the country.',
      'The dashboard aggregates signals from over 18 television channels, 32 national dailies, and 120 digital portals, enabling researchers and journalists to track emerging narratives as they unfold.',
      'IPA invites researchers, newsrooms, and civic organizations to explore the dashboard and contribute feedback during the open beta period.',
    ],
    bodyBn: [
      'ইনস্টিটিউট অব পাবলিক অ্যাকাউন্টেবিলিটি (আইপিএ) আজ ঘোষণা করেছে তাদের নতুন মিডিয়া অবজারভেটরি ড্যাশবোর্ডের উদ্বোধন, যা সারা দেশে সম্প্রচার, মুদ্রিত ও ডিজিটাল গণমাধ্যম রিয়েল-টাইমে মনিটর করার একটি প্ল্যাটফর্ম।',
      'ড্যাশবোর্ডটি ১৮টি টেলিভিশন চ্যানেল, ৩২টি জাতীয় দৈনিক ও ১২০টি ডিজিটাল পোর্টাল থেকে সংকেত সংগ্রহ করে, যা গবেষক ও সাংবাদিকদের উদীয়মান বর্ণনার গতিপথ তাৎক্ষণিকভাবে পর্যবেক্ষণের সুযোগ দেয়।',
      'আইপিএ গবেষক, সংবাদকক্ষ ও নাগরিক প্রতিষ্ঠানগুলোকে ওপেন বেটা সময়কালে ড্যাশবোর্ড অন্বেষণ ও মতামত দেওয়ার আমন্ত্রণ জানিয়েছে।',
    ],
  },
  {
    id: 'press-2',
    tag: 'Announcement',
    tagBn: 'ঘোষণা',
    title: 'Call for Applications: Summer Research Fellowship 2025',
    titleBn: 'আবেদনের আহ্বান: গ্রীষ্মকালীন গবেষণা ফেলোশিপ ২০২৫',
    date: '2025-02-28',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=85',
    body: [
      'IPA is now accepting applications for its Summer Research Fellowship 2025, open to early-career researchers and graduate students.',
      'Fellows will work alongside IPA researchers on projects spanning media trust, platform governance, and misinformation analysis.',
      'The application deadline is April 15, 2025. Details are available on the IPA website.',
    ],
    bodyBn: [
      'আইপিএ এখন গ্রীষ্মকালীন গবেষণা ফেলোশিপ ২০২৫-এর জন্য আবেদন গ্রহণ করছে, যা প্রাথমিক পর্যায়ের গবেষক ও স্নাতকোত্তর শিক্ষার্থীদের জন্য উন্মুক্ত।',
      'ফেলোরা আইপিএ গবেষকদের সঙ্গে গণমাধ্যমে আস্থা, প্ল্যাটফর্ম গভর্ন্যান্স ও ভুল তথ্য বিশ্লেষণ বিষয়ক প্রকল্পে কাজ করবেন।',
      'আবেদনের শেষ তারিখ ১৫ এপ্রিল ২০২৫। বিস্তারিত আইপিএ-এর ওয়েবসাইটে পাওয়া যাবে।',
    ],
  },
  {
    id: 'press-3',
    tag: 'Report',
    tagBn: 'প্রতিবেদন',
    title: 'New Study Finds Declining Trust in Television News Among Urban Youth',
    titleBn: 'নতুন গবেষণায় শহরের তরুণদের মধ্যে টেলিভিশন সংবাদে আস্থা হ্রাসের তথ্য',
    date: '2025-01-20',
    image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1600&q=85',
    body: [
      'A new IPA study documents a steady decline in trust in television news among urban audiences aged 18-34 over the past five years.',
      'The findings highlight the growing influence of short-form digital platforms as primary news sources for younger demographics.',
      'IPA recommends targeted media literacy initiatives and greater transparency in broadcast editorial practices.',
    ],
    bodyBn: [
      'একটি নতুন আইপিএ গবেষণায় গত পাঁচ বছরে ১৮-৩৪ বয়সী শহরের দর্শকদের মধ্যে টেলিভিশন সংবাদে আস্থা ক্রমাগত হ্রাসের তথ্য উঠে এসেছে।',
      'ফলাফলগুলো তরুণ প্রজন্মের প্রাথমিক সংবাদ উৎস হিসেবে সংক্ষিপ্ত ডিজিটাল প্ল্যাটফর্মের ক্রমবর্ধমান প্রভাব তুলে ধরে।',
      'আইপিএ লক্ষ্যভিত্তিক মিডিয়া সাক্ষরতা উদ্যোগ এবং সম্প্রচার সম্পাদকীয় প্রক্রিয়ায় আরও স্বচ্ছতার সুপারিশ করেছে।',
    ],
  },
  {
    id: 'press-4',
    tag: 'Partnership',
    tagBn: 'অংশীদারিত্ব',
    title: 'IPA Partners with University of Dhaka on Media Research Lab',
    titleBn: 'গণমাধ্যম গবেষণা ল্যাবে আইপিএ ও ঢাকা বিশ্ববিদ্যালয়ের অংশীদারিত্ব',
    date: '2024-11-10',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=85',
    body: [
      'IPA and the University of Dhaka have signed a memorandum of understanding to establish a joint Media Research Lab.',
      'The lab will support collaborative research, data sharing, and training for graduate students in media and communication studies.',
      'The partnership aims to strengthen evidence-based media scholarship in Bangladesh.',
    ],
    bodyBn: [
      'আইপিএ ও ঢাকা বিশ্ববিদ্যালয় একটি যৌথ গণমাধ্যম গবেষণা ল্যাব প্রতিষ্ঠার জন্য সমঝোতা স্মারক স্বাক্ষর করেছে।',
      'ল্যাবটি স্নাতকোত্তর শিক্ষার্থীদের জন্য সহযোগিতামূলক গবেষণা, তথ্য ভাগাভাগি ও প্রশিক্ষণ সমর্থন করবে।',
      'অংশীদারিত্বটির লক্ষ্য বাংলাদেশে প্রমাণভিত্তিক গণমাধ্যম গবেষণাকে শক্তিশালী করা।',
    ],
  },
  {
    id: 'press-5',
    tag: 'Event',
    tagBn: 'অনুষ্ঠান',
    title: 'IPA Hosts National Dialogue on Media Freedom and Accountability',
    titleBn: 'গণমাধ্যমের স্বাধীনতা ও জবাবদিহিতা নিয়ে আইপিএ-এর জাতীয় সংলাপ',
    date: '2024-09-05',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1600&q=85',
    body: [
      'IPA convened a national dialogue bringing together journalists, policymakers, and civil society leaders to discuss media freedom and accountability.',
      'The event featured panel discussions on regulatory frameworks, newsroom independence, and public trust.',
      'A summary report of the dialogue will be published later this month.',
    ],
    bodyBn: [
      'গণমাধ্যমের স্বাধীনতা ও জবাবদিহিতা নিয়ে আলোচনার জন্য আইপিএ সাংবাদিক, নীতিনির্ধারক ও নাগরিক সমাজের নেতাদের নিয়ে একটি জাতীয় সংলাপ আয়োজন করে।',
      'অনুষ্ঠানে নিয়ন্ত্রক কাঠামো, সংবাদকক্ষের স্বাধীনতা ও জনআস্থা নিয়ে প্যানেল আলোচনা অনুষ্ঠিত হয়।',
      'সংলাপের একটি সারসংক্ষেপ প্রতিবেদন এই মাসের শেষে প্রকাশিত হবে।',
    ],
  },
];

export function formatPressDate(iso: string, isBn: boolean): string {
  const [y, m, d] = iso.split('-');
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  const locale = isBn ? 'bn-BD' : 'en-GB';
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
