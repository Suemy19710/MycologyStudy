import type { ReactNode } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import TopicPage from './components/TopicPage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import NamesRanks from './pages/NamesRanks'
import References from './pages/References'
import SpeciesList from './pages/SpeciesList'
import SpeciesProfile from './pages/SpeciesProfile'
import WhatIsMycology from './pages/topics/WhatIsMycology'
import SpeciesStrain from './pages/topics/SpeciesStrain'
import Morphology from './pages/topics/Morphology'
import Physiology from './pages/topics/Physiology'
import Ecology from './pages/topics/Ecology'
import Mycotoxins from './pages/topics/Mycotoxins'
import Pathogenicity from './pages/topics/Pathogenicity'
import Susceptibility from './pages/topics/Susceptibility'
import DnaBarcode from './pages/topics/DnaBarcode'

// Maps each topic slug (from data/topics.ts) to the content of its page.
const topicContent: Record<string, ReactNode> = {
  'what-is-mycology': <WhatIsMycology />,
  'species-and-strain': <SpeciesStrain />,
  morphology: <Morphology />,
  physiology: <Physiology />,
  ecology: <Ecology />,
  mycotoxins: <Mycotoxins />,
  pathogenicity: <Pathogenicity />,
  'antifungal-susceptibility': <Susceptibility />,
  'dna-barcode': <DnaBarcode />,
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="learn/:slug" element={<TopicPage content={topicContent} />} />
        <Route path="names" element={<NamesRanks />} />
        <Route path="species" element={<SpeciesList />} />
        <Route path="species/:slug" element={<SpeciesProfile />} />
        <Route path="references" element={<References />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
