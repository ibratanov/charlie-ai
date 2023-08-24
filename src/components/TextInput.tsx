import { useState } from 'react'
import { Textarea, Button, useToast } from '@chakra-ui/react'

type TextInputProps = {
  generateFeedback: (text: string) => void
}

const TextInput = ( { generateFeedback } : TextInputProps) => {
  const [text, setText] = useState('')

  const toast = useToast()

  const submitText = () => {
    if (text === '') {
      toast({
        title: 'Please enter your resume so that I can provide some feedback.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } else {
      generateFeedback(text)
    }
  }

  return (
    <>
      <Textarea
        bg='blue.300'
        color='white'
        padding={4}
        marginTop={5}
        height={200}
        value={text}
        onChange={ (e) => setText(e.target.value) }
        placeholder="Experience, Education, etc."
        _placeholder={{ opacity: 0.7, color: 'white' }}
      />
      <Button
        bg='blue.200'
        color='white'
        marginTop={4}
        width='100%'
        _hover={{ bg: 'blue.300' }}
        onClick={submitText}
      >
        Get feedback on my resume.
      </Button>

    </>
  )
}

export default TextInput