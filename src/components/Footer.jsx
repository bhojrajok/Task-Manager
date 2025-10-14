import React, { useEffect, useState } from 'react'
import '../index.css'

export default function Footer() {
  const [quote, setQuote] = useState({ text: '', author: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cached = localStorage.getItem('cachedQuote')
    const cacheTime = localStorage.getItem('cachedQuoteTime')

    const now = Date.now()
    const cacheValidDuration = 1000 * 60 * 10

    if (cached && cacheTime && now - parseInt(cacheTime) < cacheValidDuration) {
      setQuote(JSON.parse(cached))
      setLoading(false)
    } else {
      fetchRandomQuote()
    }
  }, [])

  const fetchRandomQuote = async () => {
    setLoading(true)
    try {
      const resp = await fetch('https://api.realinspire.live/v1/quotes/random')
      if (!resp.ok) {
        throw new Error(`HTTP error: ${resp.status}`)
      }
      const data = await resp.json()
      if (Array.isArray(data) && data.length > 0) {
        const { content, author } = data[0]
        const newQuote = { text: content, author }
        setQuote(newQuote)
        localStorage.setItem('cachedQuote', JSON.stringify(newQuote))
        localStorage.setItem('cachedQuoteTime', Date.now().toString())
      } else {
        throw new Error('Unexpected format')
      }
    } catch (err) {
      console.error('Quote fetch failed:', err)
      setQuote({
        text: "Your time is limited, don't waste it living someone else's life.",
        author: "Steve Jobs",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full flex items-center justify-center text-center footer h-full p-4">
      {loading ? (
        <span>Loading quote …</span>
      ) : (
        <div>
          <p className="italic">“{quote.text}”</p>
          <p className="mt-1 font-semibold">— {quote.author || 'Unknown'}</p>
        </div>
      )}
    </div>
  )
}
