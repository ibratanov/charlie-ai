import { Heading, Image, Text } from '@chakra-ui/react'
import profile_image from '../assets/charlie.jpg'

const Header = () => {
  return (
    <>
        <Heading color='white' marginBottom='1rem'>
            Hi, I'm Charlie.
        </Heading>
        <Image src={profile_image} alt='charlie.ai' width={100} marginBottom='1rem' borderRadius='full' />
        <Text color='white' fontSize={25} textAlign='center' marginBottom='0.4rem'>
            Paste your resume below and I'll help make it better.
        </Text>
        <Text color='white' opacity={0.9} fontSize={17} textAlign='center'>
            Please <b>don't</b> include any personal information like your name, address, email, or phone number!
        </Text>
    </>
  )
}

export default Header