import type { ReactNode } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home' 
import Layout from './components/Layout'  
import TopicPage from './components/TopicPage'
import WhatIsMycology from './pages/topics/WhatIsMycology' 
import DnaBarcode from './pages/topics/DnaBarcode'
import Ecology from './pages/topics/Ecology'
import Morphology from './pages/topics/Morphology'
import Mycotoxins from './pages/topics/Mycotoxins'
import Pathogenicity from './pages/topics/Pathogenicity'
import Physiology from './pages/topics/Physiology'
import SpeciesStrain from './pages/topics/SpeciesStrain'
import Susceptibility from './pages/topics/Susceptibility'
import NamesRanks from './pages/NamesRanks'
import NotFound from './pages/NotFound'
// Maps each topic slug (from data/topics.ts) to the content of its page.
// const topicContent: Record<string, ReactNode> = {
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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}