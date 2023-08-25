import { useState } from 'react'
import { Container, Box } from '@chakra-ui/react'
import Header from './components/Header'
import Footer from './components/Footer'
import TextInput from './components/TextInput'
import FeedbackModal from './components/FeedbackModal'

import DOMPurify from 'dompurify'

const App = () => {
  const [feedback, setFeedback] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const generateFeedback = async (text: string) => {
    setLoading(true)
    setIsOpen(true)
    const prompt: string = `
      You are an incredibly sharp technical recruiter named Charlie.
      Your goal is to help candidates land their dream job by assisting with their job search.
      You are always kind and friendly. Please give direct feedback on the resume provided.
      I'd like the resume to perform well in applicant tracking systems and I'd like it to
      impressive for hiring managers and recruiters. It should also be easy to read.
      Break your suggested changes up into actionable items in bullet form so I know
      what to address first. A few more things to keep in mind:
      - Please don't introduce yourself or say hello. We're already acquainted.
      - Don't recommend that I proof read for grammatical errors.
      - If you notice any spelling or grammatical errors, please list them.
      - Please be very specific and provide a lot of feedback, looking at every line
      of the resume and recommending specific changes on how to improve sentences that
      aren't compelling enough.
      - Make sure you don't repeat yourself or give generic suggestions.

      Please formate your response as if it were HTML code, such that it can be plugged into a React component and formatted accordingly. I'd like all resume suggestions returned as an ordered list using this format: <ol><li>(Suggestion)</li><li>(Suggestion2)</li>...</ol>
      If you need to provide sub-points, please use an unordered list: <ul><li>(Sub-suggestion)</li><li>(Sub-suggestion2)</li>...</ul>
      Please put any additional information you'd like to provide before or after the suggestions in a <div> tag.
      Please use a <strong></strong> tag for titles of sections or to highlight any text you'd like to emphasize.
      Due to the way the HTML is parsed, please don't use any other HTML tags.
      Thank you for your help!
      Here's my resume:\n\n
    `

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {"role": "system", "content": '{ "prompt": ' + prompt + text + '"output_format": "html" }'},
        ],
        temperature: 0.2,
        frequency_penalty: 0.8,
      })
    }

    const response = await fetch(import.meta.env.VITE_OPENAI_API_URL, options)

    const json = await response.json()

    const data = json.choices[0].message.content

    const cleanData = DOMPurify.sanitize(data)

    setFeedback(cleanData)
    setLoading(false)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Box bg='blue.400' color='white' h='100vh' >
      <Container maxW='3xl' centerContent>
        <Header />
        <TextInput generateFeedback={generateFeedback} />
        <Footer />
      </Container>
      <FeedbackModal feedback={feedback} loading={loading} isOpen={isOpen} closeModal={closeModal} />
    </Box>
  )
}

export default App