import {Box, Image, Text, Flex} from '@chakra-ui/react'
import logo from '../assets/openai_white_logo.svg'

const Footer = () => {
  return (
    <Box marginTop={50}>
        <Flex justifyContent='center' alignItems='center'>
            <Image src={ logo } marginRight={2} width={5} />
            <Text>
                Powered by the OpenAI API
            </Text>
        </Flex>
    </Box>
  )
}

export default Footer