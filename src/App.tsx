import type { ReactNode } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home' 
import Layout from './components/Layout'  

// Maps each topic slug (from data/topics.ts) to the content of its page.
// const topicContent: Record<string, ReactNode> = {

// }

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}
