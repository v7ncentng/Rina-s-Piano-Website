import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties, ReactNode, RefObject } from 'react'
import styles from './App.module.css'
import { currentYear, site } from './content'

type StickerType = (typeof site.stickers)[number]['type']
type StickerItem = (typeof site.stickers)[number]

function PianoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 132 92" fill="none" aria-hidden="true">
      <path d="M15 68 20 32q1-8 9-8h77q8 0 10 8l5 36" fill="#fffdf8" stroke="currentColor" strokeWidth="3" />
      <path d="M11 68h112v9H11zM22 78l-3 10m91-10 3 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M34 25v29m13-29v29m13-29v29m13-29v29m13-29v29m13-29v29" stroke="currentColor" strokeWidth="2" />
      <path d="M40 25v17m26-17v17m26-17v17" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <path d="M29 57h70" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function StickerArt({ type }: { type: StickerType }) {
  if (type === 'piano') return <PianoMark className={styles.stickerPiano} />
  if (type === 'notes') {
    return <svg viewBox="0 0 70 70" aria-hidden="true"><path d="M28 12v37a9 9 0 1 1-5-8V20l29-7v30a9 9 0 1 1-5-8V9z" fill="#d94d35" stroke="#fffefa" strokeWidth="5" strokeLinejoin="round" /><path d="M28 22 52 16" stroke="#fffefa" strokeWidth="3" /></svg>
  }
  if (type === 'treble') {
    return <svg viewBox="0 0 62 100" aria-hidden="true"><path d="M37 9c-9 2-12 13-7 22l13 22c8 14 2 31-13 34-10 2-19-4-19-13 0-7 5-12 12-12 8 0 12 7 9 13M34 12c-10 27-16 42-19 57-5 24 11 34 27 26 12-7 10-20-1-24-9-3-18 2-19 11M24 49c11-6 26-5 31 1" fill="none" stroke="#3c62d9" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="37" cy="10" r="5" fill="#3c62d9" /></svg>
  }
  if (type === 'metronome') {
    return <svg viewBox="0 0 76 88" aria-hidden="true"><path d="m18 75 13-59q2-7 8-7h4q6 0 8 7l13 59q1 6-5 6H23q-6 0-5-6Z" fill="#f1c95d" stroke="#171715" strokeWidth="3" /><path d="m38 57 13-35M28 67h24" stroke="#171715" strokeWidth="4" strokeLinecap="round" /><circle cx="51" cy="22" r="4" fill="#d94d35" /></svg>
  }
  if (type === 'star') {
    return <svg viewBox="0 0 90 90" aria-hidden="true"><path d="m45 5 10 26 28-2-22 18 9 27-25-15-23 17 7-29L6 30l29 1z" fill="#f1c95d" stroke="#fffefa" strokeWidth="6" strokeLinejoin="round" /><text x="45" y="52" textAnchor="middle" fill="#171715" fontSize="11" fontWeight="700">{site.stickerText.great}</text><text x="45" y="63" textAnchor="middle" fill="#171715" fontSize="9" fontWeight="700">{site.stickerText.job}</text></svg>
  }
  if (type === 'keyboard') {
    return <svg viewBox="0 0 170 50" aria-hidden="true"><rect x="3" y="5" width="164" height="40" rx="4" fill="#fffefa" stroke="#171715" strokeWidth="3" /><path d="M26 6v38m24-38v38m24-38v38m24-38v38m24-38v38m24-38v38" stroke="#171715" strokeWidth="2" /><path d="M17 6v22m25-22v22m24-22v22m25-22v22m24-22v22m25-22v22" stroke="#171715" strokeWidth="7" /></svg>
  }
  if (type === 'flower') {
    return <svg viewBox="0 0 90 90" aria-hidden="true"><path d="M45 42C23 43 23 10 43 10c4 10 5 18 2 32Zm2 0c-1-20 30-24 32-6-9 5-17 8-32 6Zm-1 3c19-7 33 21 18 31-8-7-13-15-18-31Zm-4-1c13 15-8 39-24 27 3-10 8-18 24-27Zm-2-3C22 53 7 25 22 15c8 7 14 15 18 26Z" fill="#fffefa" stroke="#d94d35" strokeWidth="3" strokeLinejoin="round" /><circle cx="44" cy="44" r="7" fill="#f1c95d" stroke="#171715" strokeWidth="2" /></svg>
  }
  if (type === 'years' || type === 'mtac') {
    const text = type === 'years' ? <>{site.stickerText.yearsBadge}<tspan x="50" dy="13">{site.stickerText.years}</tspan></> : <>{site.about.membershipAbbreviation}<tspan x="50" dy="13">{site.stickerText.member}</tspan></>
    return <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42" fill={type === 'years' ? '#3c62d9' : '#d94d35'} stroke="#fffefa" strokeWidth="6" /><circle cx="50" cy="50" r="34" fill="none" stroke="#fffefa" strokeWidth="1.5" strokeDasharray="2 3" /><text x="50" y={type === 'years' ? '47' : '48'} textAnchor="middle" fill="#fffefa" fontSize={type === 'years' ? '27' : '17'} fontFamily="Georgia" fontWeight="bold">{text}</text></svg>
  }
  return <span className={styles.tapeLabel}>{site.stickerText.practice}</span>
}

function Sticker({
  item,
  index,
  draggable,
  constraints,
}: {
  item: StickerItem
  index: number
  draggable: boolean
  constraints: RefObject<HTMLElement | null>
}) {
  const reduceMotion = useReducedMotion()
  const position: CSSProperties = {
    top: item.top,
    left: 'left' in item ? item.left : undefined,
    right: 'right' in item ? item.right : undefined,
    rotate: `${item.rotation}deg`,
  }

  return (
    <motion.div
      className={`${styles.sticker} ${styles[`sticker_${item.type}`]}`}
      style={position}
      aria-hidden="true"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.6, rotate: item.rotation - 10 }}
      animate={reduceMotion ? undefined : { opacity: 1, scale: 1, rotate: item.rotation }}
      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: index * 0.04 }}
      whileHover={reduceMotion ? undefined : { rotate: item.rotation + 4, scale: 1.06 }}
      drag={draggable && !reduceMotion}
      dragConstraints={constraints}
      dragMomentum={false}
    >
      <StickerArt type={item.type} />
    </motion.div>
  )
}

function SectionReveal({
  children,
  className,
  id,
  ariaLabelledBy,
}: {
  children: ReactNode
  className?: string
  id?: string
  ariaLabelledBy?: string
}) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.section
      className={className}
      id={id}
      aria-labelledby={ariaLabelledBy}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  )
}

function Header() {
  return (
    <header className={styles.header}>
      <a className={styles.wordmarkSmall} href="#top" aria-label={site.interface.homeLinkLabel}>
        {site.name}<span>{site.interface.headerSubline}</span>
      </a>
      <nav className={styles.nav} aria-label={site.interface.navigationLabel}>
        {site.interface.navigation.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
      </nav>
      <a className={styles.bookButton} href="#contact">{site.interface.bookButton} <span aria-hidden="true">↗</span></a>
    </header>
  )
}

function Hero() {
  const boundary = useRef<HTMLElement>(null)
  const [canDrag, setCanDrag] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 769px) and (pointer: fine)')
    const update = () => setCanDrag(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title" ref={boundary}>
      <div className={styles.heroInner}>
        {site.stickers.map((item, index) => (
          <Sticker key={item.type} item={item} index={index} draggable={canDrag} constraints={boundary} />
        ))}
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>{site.tagline}</p>
          <h1 id="hero-title">{site.name}<span className={styles.heroPeriod}>.</span></h1>
          <p className={styles.heroIntro}>{site.introduction}</p>
          <a className={styles.heroLink} href="#lessons">{site.interface.findLesson} <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  )
}

function NowPlaying() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [audioReady, setAudioReady] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      return
    }

    if (audio.currentTime >= site.player.previewSeconds) audio.currentTime = 0
    try {
      await audio.play()
      setAudioError(false)
    } catch {
      setAudioError(true)
    }
  }

  const seek = (offset: number) => {
    const audio = audioRef.current
    if (!audio) return
    const duration = Number.isFinite(audio.duration)
      ? Math.min(audio.duration, site.player.previewSeconds)
      : site.player.previewSeconds
    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + offset))
  }

  const updatePlayback = () => {
    const audio = audioRef.current
    if (!audio) return
    const time = Math.min(audio.currentTime, site.player.previewSeconds)
    setProgress((time / site.player.previewSeconds) * 100)
    if (time >= site.player.previewSeconds) {
      audio.pause()
      audio.currentTime = site.player.previewSeconds
      setPlaying(false)
    }
  }

  return (
    <>
      <div className={styles.playerWrap}>
        <audio
          ref={audioRef}
          src={site.player.audioSrc}
          preload="metadata"
          onLoadedMetadata={() => {
            setAudioReady(true)
            setAudioError(false)
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={updatePlayback}
          onEnded={() => setPlaying(false)}
          onError={() => {
            setAudioReady(false)
            setPlaying(false)
            setAudioError(true)
          }}
        />
        <div className={styles.playerCover} aria-hidden="true"><PianoMark /></div>
        <div className={styles.playerText}>
          <span className={styles.playerLabel}>{site.interface.nowPracticing}</span>
          <strong>{site.player.title}</strong>
          <span>{site.player.artist}</span>
        </div>
        <div className={styles.playerActions}>
          <button type="button" className={styles.playerButton} aria-label={site.interface.rewindTwoSeconds} onClick={() => seek(-site.player.seekSeconds)} disabled={!audioReady}>↶</button>
          <button type="button" className={`${styles.playerButton} ${styles.playButton}`} aria-label={playing ? site.interface.pause : site.interface.play} onClick={togglePlayback} disabled={!audioReady}>
            {playing ? 'Ⅱ' : '▶'}
          </button>
          <button type="button" className={styles.playerButton} aria-label={site.interface.forwardTwoSeconds} onClick={() => seek(site.player.seekSeconds)} disabled={!audioReady}>↷</button>
        </div>
        <div className={styles.progressTrack} aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      </div>
      <p className={styles.playerNotice} role="status" aria-live="polite">
        {audioError ? site.interface.audioUnavailable : playing ? site.interface.previewLimit : site.interface.audioHelp}
      </p>
    </>
  )
}

function About() {
  return (
    <SectionReveal className={`${styles.section} ${styles.about}`} id="about" ariaLabelledBy="about-heading">
      <div className={styles.aboutCopy}>
        <p className={styles.sectionLabel}>{site.about.label}</p>
        <h2 id="about-heading">{site.about.heading}</h2>
        <p className={styles.bio}>{site.about.bio}</p>
        <div className={styles.aboutBadges}>
          {site.about.badges.map((badge, index) => <span className={styles.badge} key={badge}><span aria-hidden="true">{index === 0 ? '✳' : '♫'}</span> {badge}</span>)}
        </div>
      </div>
      <figure className={styles.photoFrame}>
        {site.about.photoSrc ? (
          <img className={styles.realPhoto} src={site.about.photoSrc} alt={site.about.photoAlt} />
        ) : (
          <div className={styles.photoPlaceholder} role="img" aria-label={site.interface.photoPlaceholderAlt}>
            <PianoMark />
            <span className={styles.photoSun} />
          </div>
        )}
        <span className={styles.photoTape} aria-hidden="true" />
        <figcaption>{site.about.photoCaption}</figcaption>
      </figure>
    </SectionReveal>
  )
}

function Lessons() {
  return (
    <SectionReveal className={`${styles.section} ${styles.lessons}`} id="lessons" ariaLabelledBy="lessons-heading">
      <div className={styles.sectionHeading}>
        <p className={styles.sectionLabel}>{site.lessons.label}</p>
        <h2 id="lessons-heading">{site.lessons.heading}</h2>
      </div>
      <ul className={styles.lessonGrid}>
        {site.lessons.options.map((lesson) => (
          <li key={lesson.minutes}>
            <a className={`${styles.lessonCard} ${styles[lesson.color]}`} href="#contact" aria-label={site.interface.lessonLinkLabel
              .replace('{minutes}', lesson.minutes)
              .replace('{price}', lesson.price)
              .replace('{level}', lesson.level)}>
              <span className={styles.lessonArt}>
                <span className={styles.tileStamp}>{lesson.sticker}</span>
                <span className={styles.lessonNumber}>{lesson.minutes}<small>{site.interface.minuteLabel}</small></span>
                <span className={styles.tileNote} aria-hidden="true">♪</span>
              </span>
              <span className={styles.lessonDetails}>
                <span>{lesson.level}</span>
                <strong>{lesson.price}<small> {site.interface.perLesson}</small></strong>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className={styles.lessonNote}>{site.lessons.note}</p>
    </SectionReveal>
  )
}

function Timeline() {
  return (
    <SectionReveal className={styles.timelineSection} ariaLabelledBy="timeline-heading">
      <div className={styles.timelineHeading}>
        <h2 className={styles.sectionLabel} id="timeline-heading">{site.timeline.label}</h2>
        <span className={styles.timelineHint} aria-hidden="true">{site.timeline.hint}</span>
      </div>
      <div className={styles.timeline} tabIndex={0} aria-label={site.timeline.ariaLabel}>
        <ol className={styles.timelineList}>
          {site.timeline.entries.map((entry, index) => (
            <li className={styles.timelineItem} key={entry.title}>
              <span className={styles.timelineIndex}>0{index + 1}</span>
              <span className={styles.timelineDot} aria-hidden="true" />
              <h3>{entry.title}</h3>
              <p>{entry.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </SectionReveal>
  )
}

function Contact() {
  const [toast, setToast] = useState('')
  const timeout = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timeout.current), [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.contact.email)
      setToast(site.interface.copiedToast)
    } catch {
      setToast(site.interface.copyUnavailable)
    }
    window.clearTimeout(timeout.current)
    timeout.current = window.setTimeout(() => setToast(''), 2400)
  }

  return (
    <SectionReveal className={styles.contactSection} id="contact" ariaLabelledBy="contact-heading">
      <div className={styles.contactStickers} aria-hidden="true">
        <span className={styles.contactStar}>✳</span>
        <span className={styles.contactNote}>♫</span>
      </div>
      <div>
        <p className={styles.sectionLabel}>{site.contact.label}</p>
        <h2 id="contact-heading">{site.contact.heading}</h2>
        <p className={styles.contactPrompt}>{site.interface.contactPrompt}</p>
        <div className={styles.contactActions}>
          <div className={styles.contactItem}>
            <a className={`${styles.contactChip} ${styles.phoneChip}`} href={site.contact.phoneHref}>
              <span aria-hidden="true">☎</span><strong>{site.contact.phone}</strong><small>{site.interface.callRina}</small>
            </a>
            <a className={styles.contactActionLink} href={site.contact.textHref}>{site.interface.textRina}</a>
          </div>
          <div className={styles.contactItem}>
            <a className={styles.contactChip} href={site.contact.emailHref}>
              <span aria-hidden="true">✉</span><strong>{site.contact.email}</strong><small>{site.interface.emailRina}</small>
            </a>
            <button type="button" className={styles.contactActionLink} onClick={copyEmail}>{site.interface.copyEmail}</button>
            <span className={styles.toast} role="status" aria-live="polite">{toast}</span>
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <span>© {currentYear} {site.name} {site.footer.copyrightSuffix}</span>
        <div><a href={site.contact.footerEmailHref}>{site.contact.email}</a><a href={site.contact.phoneHref}>{site.contact.phone}</a></div>
      </div>
      <p>{site.footer.memberLine}</p>
    </footer>
  )
}

function App() {
  return (
    <>
      <a className={styles.skipLink} href="#main">{site.interface.skipLink}</a>
      <Header />
      <main id="main">
        <Hero />
        <div className={styles.mainContent}>
          <NowPlaying />
          <About />
          <Lessons />
          <Timeline />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
