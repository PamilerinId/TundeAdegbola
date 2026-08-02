/**
 * GALLERY CONTENT
 * ---------------------------------------------------------------------------
 * This is the ONLY file you need to edit to add, remove or reorder gallery
 * items. The tabs, layout, counts and empty states all read from here.
 *
 * To add an item, copy an existing block and change the values:
 *
 *   {
 *     category: 'video',                    // see GalleryCategory below
 *     title: 'Title as published',
 *     description: 'One or two short sentences.',
 *     source: 'Channel, publication or venue',
 *     date: 'March 2024',                   // free text, or omit entirely
 *     url: 'https://...',                   // must be a full, working URL
 *   },
 *
 * Categories: 'video' | 'audio' | 'interview' | 'press' | 'conference' | 'article'
 *
 * Items are grouped by category automatically and displayed in the order they
 * appear in this array. A category with no items shows a friendly placeholder
 * instead of breaking the page, so it is safe to ship with gaps.
 * ---------------------------------------------------------------------------
 */

export type GalleryCategory =
  | 'video'
  | 'audio'
  | 'interview'
  | 'press'
  | 'conference'
  | 'article'

export interface GalleryItem {
  category: GalleryCategory
  title: string
  description?: string
  source?: string
  date?: string
  url: string
}

export interface CategoryMeta {
  id: GalleryCategory
  label: string
  blurb: string
  emptyMessage: string
}

export const GALLERY_CATEGORIES: CategoryMeta[] = [
  {
    id: 'video',
    label: 'Video',
    blurb: 'Talks, lectures and documentary appearances.',
    emptyMessage: 'Video recordings are being catalogued and will appear here soon.',
  },
  {
    id: 'audio',
    label: 'Audio',
    blurb: 'Podcasts, radio features and music recordings.',
    emptyMessage: 'Audio recordings are being catalogued and will appear here soon.',
  },
  {
    id: 'interview',
    label: 'Interview',
    blurb: 'Long-form conversations in print and on air.',
    emptyMessage: 'Interviews are being catalogued and will appear here soon.',
  },
  {
    id: 'press',
    label: 'Press Mention',
    blurb: 'Coverage in the press, in Nigeria and abroad.',
    emptyMessage: 'Press coverage is being catalogued and will appear here soon.',
  },
  {
    id: 'conference',
    label: 'Conference',
    blurb: 'Keynotes, panels and policy forums.',
    emptyMessage: 'Conference appearances are being catalogued and will appear here soon.',
  },
  {
    id: 'article',
    label: 'Articles',
    blurb: 'Papers, essays and opinion pieces.',
    emptyMessage: 'Published writing is being catalogued and will appear here soon.',
  },
]

export const GALLERY_ITEMS: GalleryItem[] = [
  // ------------------------------- VIDEO -------------------------------
  {
    category: 'video',
    title: 'Education — development or title?',
    description:
      'A TEDx talk asking whether Nigerian education delivers real development, or merely confers credentials and titles.',
    source: 'TEDxPortHarcourt',
    date: '2014',
    url: 'https://www.youtube.com/watch?v=fAxMsJsi_W0',
  },
  {
    category: 'video',
    title: 'Yoruba Culture as a Culture of Intellection',
    description:
      'A lecture arguing that Yoruba culture is fundamentally intellectual, spanning language, cognition and indigenous knowledge systems.',
    source: 'YouTube',
    url: 'https://www.youtube.com/watch?v=KyFwmBFO6rM',
  },
  {
    category: 'video',
    title: 'The Mathematics of Ifá',
    description:
      'On the binary mathematical structure underlying Ifá divination, and what it shares with modern computing.',
    source: 'DAWN Commission',
    url: 'https://www.youtube.com/watch?v=8VFXbMxyyS0',
  },
  {
    category: 'video',
    title: 'The Mathematics of Ifá, Part 2',
    description:
      'The second part of the lecture, tracing how Boolean algebra is prefigured in the logic of Ifá.',
    source: 'DAWN Commission',
    url: 'https://www.youtube.com/watch?v=_L9_FYjq8WI',
  },
  {
    category: 'video',
    title: 'Ifá Divination and Mathematics (full lecture)',
    description:
      'The full-length lecture on Ifá divination and mathematics, hosted by the filmmaker Tunde Kelani.',
    source: 'YouTube',
    url: 'https://www.youtube.com/watch?v=k9ZyzLle6cQ',
  },

  // ------------------------------- AUDIO -------------------------------
  {
    category: 'audio',
    title: 'Ancient Text Messages: Batá Drums in a Changing World',
    description:
      'A radio documentary on Yoruba drum speech and the talking drum as a language technology of its own.',
    source: 'Afropop Worldwide',
    date: 'August 2020',
    url: 'https://www.afropop.org/audio-programs/ancient-text-messages-bata-drums-in-a-changing-world',
  },
  {
    category: 'audio',
    title: 'Ancient Text Messages — Batá Drums In A Changing World',
    description:
      'The podcast edition of the Afropop programme, on Nigerian and Cuban batá drum language.',
    source: 'Apple Podcasts',
    date: 'August 2020',
    url: 'https://podcasts.apple.com/us/podcast/ancient-text-messages-bat%C3%A1-drums-in-a-changing-world/id121621170?i=1000488013271',
  },

  // ----------------------------- INTERVIEW -----------------------------
  {
    category: 'interview',
    title: 'Túndé Adégbọlá Talks With Ned Sublette',
    description:
      'A long conversation on dùndún and batá drum language, Yoruba tone, and computationally decoding drum speech.',
    source: 'Afropop Worldwide',
    date: 'February 2016',
    url: 'https://www.afropop.org/articles/27499',
  },
  {
    category: 'interview',
    title: 'Conversation with a Language Engineer',
    description:
      'An extended interview by Kọ́lá Túbọ̀sún covering Alt-i, the Yoruba keyboard, Microsoft localisation and mother-tongue education.',
    source: 'Kọ́lá Túbọ̀sún, Medium',
    date: 'July 2020',
    url: 'https://medium.com/@baroka/conversation-with-a-language-engineer-5f81a1d6d6cf',
  },
  {
    category: 'interview',
    title: 'Bridging the language gap of the digital divide for Africa',
    description:
      'On founding Alt-i, the obstacles facing African language technology, and a vision for digital African languages.',
    source: 'Rising Voices, Global Voices',
    date: 'August 2020',
    url: 'https://rising.globalvoices.org/blog/2020/08/31/tunde-adegbolas-work-bridges-the-language-gap-of-the-digital-divide-for-africa-through-technology/',
  },

  // ------------------------------- PRESS -------------------------------
  {
    category: 'press',
    title: 'Adegbola… 60 cheers for pioneer ICT, digital engineer',
    description:
      'A profile of his broadcast engineering career and his pioneering of desktop publishing and digital video in Nigeria.',
    source: 'The Guardian Nigeria',
    date: 'August 2015',
    url: 'https://guardian.ng/features/media/adegbola-60-cheers-for-pioneer-ict-digital-engineer/',
  },
  {
    category: 'press',
    title: 'IbaFest celebrates scholar and cultural visionary Dr Tunde Adegbola',
    description:
      'Coverage of “The Polymath’s Journey”, an evening in his honour at the NuStreams Conference and Culture Centre, Ibadan.',
    source: 'The Lagos Review',
    date: 'August 2025',
    url: 'https://thelagosreview.ng/ibafest-celebrates-scholar-cultural-visionary-dr-tunde-adegbola/',
  },
  {
    category: 'press',
    title: 'The Polymath’s Journey: Dr. Tunde Adegbola Speaks at IbaFest Prelude',
    description:
      'A report on his IbaFest conversation about humanity, technology and the Yoruba worldview.',
    source: 'JAY Lit',
    date: 'August 2025',
    url: 'https://jaylit.com/the-polymaths-journey-dr-tunde-adegbola-speaks-at-ibafest-prelude-in-ibadan/',
  },
  {
    category: 'press',
    title: 'Profile of Engr. Dr. Tunde Adegbola',
    description:
      'A profile covering his tonology research, the Yoruba spell checker, and machine translation work at Alt-i.',
    source: 'My Engineers Nigeria',
    date: 'August 2022',
    url: 'https://www.myengineers.com.ng/2022/08/20/profile-of-engr-dr-tunde-adegbola/',
  },
  {
    category: 'press',
    title: 'Nigeria: Unique keyboard developed to write Yoruba language',
    description:
      'Early coverage of the award-winning tone-aware Yoruba keyboard, which needs only two keystrokes per character.',
    source: 'Cultural Survival',
    date: 'June 2003',
    url: 'https://www.culturalsurvival.org/news/nigeria-unique-keyboard-developed-write-yoruba-language',
  },

  // ----------------------------- CONFERENCE ----------------------------
  {
    category: 'conference',
    title: 'Convenience, Random or Purposive Sampling: African Languages and Global NLP',
    description:
      'A talk on sampling bias in global natural language processing, and what it costs African languages.',
    source: 'AfricaNLP Workshop, Masakhane',
    url: 'https://africanlp.masakhane.io/authors/tundeea/',
  },
  {
    category: 'conference',
    title: 'Algorithmic Systems and African Languages',
    description:
      'Panel moderated at the Symposium on African Digital Humanities: African Archives and Digital Recovery.',
    source: 'University of Kansas',
    date: 'October 2022',
    url: 'https://africandh.ku.edu/symposium/2022',
  },
  {
    category: 'conference',
    title: 'TEDxPortHarcourt — Speaker Profile',
    description:
      'The official speaker page for his TEDxPortHarcourt appearance, including his work on Cellular Automata Transforms.',
    source: 'TEDxPortHarcourt',
    date: '2014',
    url: 'https://www.tedxportharcourt.com/speakers/9fd65073-09c7-448f-b321-2a86d81aef8d',
  },

  // ------------------------------ ARTICLES -----------------------------
  {
    category: 'article',
    title: 'Automatic Detection of Morphological Processes in the Yorùbá Language',
    description:
      'A peer-reviewed paper on computationally detecting morphological processes in Yoruba.',
    source: 'ACL Anthology, SIGUL 2022',
    date: '2022',
    url: 'https://aclanthology.org/2022.sigul-1.19/',
  },
  {
    category: 'article',
    title: 'Building Capacities in Human Language Technology for African Languages',
    description:
      'On developing human language technology capacity across the African continent.',
    source: 'ACL Anthology, AfLaT 2009',
    date: '2009',
    url: 'https://aclanthology.org/W09-0708/',
  },
  {
    category: 'article',
    title: 'Ibadan: Nigeria’s renascent art, culture and intellectual hub',
    description:
      'An essay on Ibadan’s revival as an artistic and intellectual centre.',
    source: 'Premium Times',
    url: 'https://www.premiumtimesng.com/opinion/575019-ibadan-nigerias-renascent-art-culture-and-intellectual-hub-by-tunde-adegbola.html',
  },
  {
    category: 'article',
    title: 'Publications on the ACL Anthology',
    description:
      'The full index of his peer-reviewed computational linguistics publications.',
    source: 'ACL Anthology',
    url: 'https://aclanthology.org/people/t/tunde-adegbola/',
  },
  {
    category: 'article',
    title: 'Research profile',
    description:
      'Papers on Yoruba tone identification, Igbo text analysis and automatic language identification.',
    source: 'ResearchGate',
    url: 'https://www.researchgate.net/profile/Tunde-Adegbola',
  },
]

export function itemsByCategory(category: GalleryCategory): GalleryItem[] {
  return GALLERY_ITEMS.filter((item) => item.category === category)
}
