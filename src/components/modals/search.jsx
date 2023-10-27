import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import SearchCard from "../cards/search.jsx";

export default function SearchModal() {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return <>
        <button onClick={onOpen}>
            <div
                className="w-auto md:w-56 border inline-flex justify-between relative items-center py-2.5 px-3 shadow-sm rounded-lg  text-center text-base font-medium leading-5 text-gray-600 ">
                <span className={"hidden md:inline-block"}>Search....</span>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z">
                    </path>
                </svg>
            </div>
        </button>
        <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Search</ModalHeader>
                        <ModalBody>
                            <div>
                                <SearchCard/>
                            </div>
                        </ModalBody>
                        <ModalFooter />
                    </>
                )}
            </ModalContent>
        </Modal>
    </>
}