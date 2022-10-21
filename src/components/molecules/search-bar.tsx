import React, { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useNavigation } from "react-router-dom"
import OSShortcut from "../atoms/os-shortcut"
import SearchIcon from "../fundamentals/icons/search-icon"
import SearchModal from "../templates/search-modal"

const SearchBar: React.FC = () => {
  const [showSearchModal, setShowSearchModal] = useState(false)

  const toggleSearch = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowSearchModal((show) => !show)
  }

  const closeModal = () => {
    setShowSearchModal(false)
  }

  useHotkeys("cmd+k", toggleSearch, {}, [])
  useHotkeys("ctrl+k", toggleSearch, {}, [])
  useHotkeys("/", toggleSearch, {}, [])

  const navigation = useNavigation()
  React.useEffect(() => {
    if (navigation.state === "submitting") {
      closeModal()
    }
  }, [navigation.state])

  return (
    <>
      <button
        onClick={() => setShowSearchModal(true)}
        className="flex basis-1/2 items-center px-small py-[6px]"
      >
        <SearchIcon className="text-grey-40" />
        <div className="ml-5">
          <OSShortcut macModifiers="⌘" winModifiers="Ctrl" keys="K" />
        </div>
        <span className="ml-xsmall text-grey-40 inter-base-regular">
          Search anything...
        </span>
      </button>
      {showSearchModal && <SearchModal handleClose={closeModal} />}
    </>
  )
}

export default SearchBar
