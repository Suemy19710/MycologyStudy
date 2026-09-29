import { useState } from 'react'
import { photoPage, photoUrl, type Photo as PhotoData } from '../data/photos'
import { useLang } from '../i18n/LanguageContext'

// A real photo with its caption and credit line (author · licence · source).
export default function Photo({ photo, ratio = '4 / 3' }: { photo: PhotoData; ratio?: string }) {
  const { t } = useLang()
  const [failed, setFailed] = useState(false)
  const source = photoPage(photo)

  return (
    <figure className="photo">
      <div className="photo-frame" style={{ aspectRatio: photo.ratio ?? ratio }}>
        {failed ? (
          <div className="photo-missing">
            {t({ en: 'Photo could not load. Check your internet connection.', vi: 'Không tải được ảnh. Hãy kiểm tra kết nối mạng.' })}
          </div>
        ) : (
          <img
            src={photoUrl(photo)}
            alt={t(photo.alt)}
            loading="lazy"
            decoding="async"
            style={{ objectFit: photo.fit ?? 'cover' }}
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <figcaption>
        <span>{t(photo.caption)}</span>
        <small>
          {t({ en: 'Photo', vi: 'Ảnh' })}: {photo.author} · {photo.license}
          {source && (
            <>
              {' · '}
              <a href={source} target="_blank" rel="noreferrer">
                Wikimedia Commons
              </a>
            </>
          )}
        </small>
      </figcaption>
    </figure>
  )
}

export function PhotoRow({ photos, ratio }: { photos: PhotoData[]; ratio?: string }) {
  return (
    <div className={`photo-row n${photos.length}`}>
      {photos.map((p) => (
        <Photo key={p.file ?? p.src} photo={p} ratio={ratio} />
      ))}
    </div>
  )
}
