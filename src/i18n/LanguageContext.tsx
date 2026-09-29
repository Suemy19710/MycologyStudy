import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'vi'  

// A piece of content in both languages, e.g. { en: 'Mould', vi: 'Nấm mốc' }.
export type L<T = string> = {en: T, vi: T}


export type LanguageContextValue  = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: <T>(l: L<T>) => T
}


const LangContext = createContext<LanguageContextValue | undefined>(undefined)
const STORAGE_KEY = 'mycologystudy-lang'

function initLang(): Lang { 
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'vi') {
      return saved
    }
  } catch (e) {
    console.error('Failed to initialize language', e)
  }
  return navigator.language?.toLowerCase().startsWith('vi') ? 'vi' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initLang)

  useEffect(() => {
    document.documentElement.lang = lang  
    try{
      localStorage.setItem(STORAGE_KEY, lang)
    } catch (e) {
      console.error('Failed to save language preference', e)
    }
  }, [lang])
  const t = <T,>(l: L<T>) => l[lang]  

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export function useLang(){
  const context = useContext(LangContext)
  if (!context) {
    throw new Error('useLang must be used within a LanguageProvider')
  }
  return context  
}

// the en/vi switch shown in the menu
export function LangSwitch() { 
  const { lang, setLang } = useLang() 
  const options: { value: Lang; short: string; label: string }[] = [
    { value: 'en', short: 'EN', label: 'English' },
    { value: 'vi', short: 'VI', label: 'Tiếng Việt' },
  ]
  return(
   <div className="lang-switch" role="group" aria-label="Language / Ngôn ngữ">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          lang={o.value}
          title={o.label}
          aria-pressed={lang === o.value}
          onClick={() => setLang(o.value)}
        >
          <span className="short">{o.short}</span>
          <span className="long">{o.label}</span>
        </button>
      ))}
    </div>
  )
}
