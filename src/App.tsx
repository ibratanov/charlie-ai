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
      Please provide specific feedback on the resume provided. The goal is to optimize the resume for
      both applicant tracking systems and human recruiters. Offer detailed suggestions for improvement
      while maintaining a kind and friendly tone. Feel free to address every section of the resume,
      offering specific changes for sentences that lack compelling content. Avoid introducing yourself
      and refrain from recommending proofreading for grammatical errors. If you spot any spelling or
      grammatical errors, please list them as suggestions. Please do not include a revised resume in your response.
      Your response should only contain HTML code and be structured exactly as follows:
      <div>
        <strong>Suggested resume edits:</strong>
        <ol>
          <li><strong>[Suggestion]</strong></li>
          <li><strong>[Suggestion2]</strong>
            <ul>
              <li>[Sub-suggestion]</li>
              <li>[Sub-suggestion2]</li>
              ...
            </ul>
          </li>
          ...
        </ol>
      </div>
      Note: '[Suggestion]' and '[Sub-suggestion]' are placeholders.
      Here's the resume:\n\n
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
          {"role": "system", "content": '{ "prompt": "' + prompt + text + '", "output_format": "html" }'},
        ],
        temperature: 0.2,
        frequency_penalty: 0.8
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