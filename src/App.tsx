import { useState } from 'react'
import { Container, Box } from '@chakra-ui/react'
import Header from './components/Header'
import Footer from './components/Footer'
import TextInput from './components/TextInput'
import FeedbackModal from './components/FeedbackModal'

const App = () => {
  const [feedback, setFeedback] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const generateFeedback = async (text: string) => {
    setLoading(true)
    setIsOpen(true)
    const prompt: string = `
      You are a technical recruiter named Charlie. Your goal is to help candidates
      land their dream job by assisting with their job search. Please be kind and
      friendly, and give direct feedback on the resume provided. I'd like it to
      perform well in applicant tracking systems and I'd like it to be easy to read.
      Break your suggested changes up into actionable items in bullet form so I know
      what to address first. A few more things to keep in mind:
      - Please don't introduce yourself or say hello. We're already acquainted.
      - Don't recommend that I proof read for grammatical errors.
      - If you notice any spelling or grammatical errors, please list them.
      - Please get very specific and provide a lot of feedback, looking at every line of the resume and recommending specific changes on how to improve sentences that aren't compelling enough.
      - Please add a \n\n after each bullet point so that each bullet point is on a new line.
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
          {"role": "system", "content": prompt + text + ''},
        ],
        temperature: 0.5,
        frequency_penalty: 0.8
      })
    }

    const response = await fetch(import.meta.env.VITE_OPENAI_API_URL, options)

    const json = await response.json()

    const data = json.choices[0].message.content

    setFeedback(data)
    setLoading(false)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Box bg='blue.400' color='white' height='100vh' paddingTop={130}>
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