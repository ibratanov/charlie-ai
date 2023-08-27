import {
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    CircularProgress,
} from '@chakra-ui/react'

import parse from 'html-react-parser'

type FeedbackModalProps = {
  feedback: string
  loading: boolean
  isOpen: boolean
  closeModal: () => void
}
  
const FeedbackModal = ({ feedback, loading, isOpen, closeModal }: FeedbackModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {loading ? 'Sit tight! I\'m looking over your resume...' : 'I have some ideas!'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display='flex' alignItems='center' justifyContent='center'>
            {loading ? (
              <CircularProgress isIndeterminate color='blue.200' />
            ) : (
              <Text color='black' fontSize={15} marginBottom='0.4rem'>
                {parse(feedback)}
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FeedbackModal