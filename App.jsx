import { useState, useEffect } from 'react'

import Navbar from './components/Navbar'

import DashboardPage from './pages/DashboardPage'
import WardrobePage from './pages/WardrobePage'
import OutfitPickerPage from './pages/OutfitPickerPage'
import OutfitHistoryPage from './pages/OutfitHistoryPage'
import WeeklyPlannerPage from './pages/WeeklyPlannerPage'
import StatsPage from './pages/StatsPage'
import DonationPage from './pages/DonationPage'
import ExportWardrobePage from './pages/ExportWardrobePage'

function App() {
  const [activePage, setActivePage] =
    useState('dashboard')

  const [isDarkMode, setIsDarkMode] =
    useState(() => {
      return (
        localStorage.getItem(
          'darkMode'
        ) === 'true'
      )
    })

  const [clothes, setClothes] =
    useState(() => {
      const saved =
        localStorage.getItem(
          'wardrobe_clothes'
        )

      return saved
        ? JSON.parse(saved)
        : []
    })

  const [savedOutfits, setSavedOutfits] =
    useState(() => {
      const saved =
        localStorage.getItem(
          'saved_outfits'
        )

      return saved
        ? JSON.parse(saved)
        : []
    })

  const [outfitHistory, setOutfitHistory] =
    useState(() => {
      const saved =
        localStorage.getItem(
          'outfit_history'
        )

      return saved
        ? JSON.parse(saved)
        : []
    })

  /* ------------------------
     AUTO SAVE
  ------------------------ */

  useEffect(() => {
    localStorage.setItem(
      'wardrobe_clothes',
      JSON.stringify(clothes)
    )
  }, [clothes])

  useEffect(() => {
    localStorage.setItem(
      'saved_outfits',
      JSON.stringify(savedOutfits)
    )
  }, [savedOutfits])

  useEffect(() => {
    localStorage.setItem(
      'outfit_history',
      JSON.stringify(outfitHistory)
    )
  }, [outfitHistory])

  useEffect(() => {
    localStorage.setItem(
      'darkMode',
      isDarkMode
    )
  }, [isDarkMode])

  const bgColor = isDarkMode
    ? '#1a1a1a'
    : '#f5f5f5'

  return (
    <div
      style={{
        background: bgColor,
        minHeight: '100vh',
      }}
    >
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {activePage ===
        'dashboard' && (
        <DashboardPage
          clothes={clothes}
          savedOutfits={savedOutfits}
          outfitHistory={outfitHistory}
          isDarkMode={isDarkMode}
        />
      )}

      {activePage ===
        'wardrobe' && (
        <WardrobePage
          clothes={clothes}
          setClothes={setClothes}
          isDarkMode={isDarkMode}
        />
      )}

      {activePage ===
        'outfit' && (
        <OutfitPickerPage
          clothes={clothes}
          savedOutfits={savedOutfits}
          setSavedOutfits={
            setSavedOutfits
          }
          outfitHistory={
            outfitHistory
          }
          setOutfitHistory={
            setOutfitHistory
          }
          isDarkMode={isDarkMode}
        />
      )}

      {activePage ===
        'history' && (
        <OutfitHistoryPage
          outfitHistory={
            outfitHistory
          }
          setOutfitHistory={
            setOutfitHistory
          }
          clothes={clothes}
          isDarkMode={isDarkMode}
        />
      )}

      {activePage === 'weekly' && (
        <WeeklyPlannerPage
          clothes={clothes}
          isDarkMode={isDarkMode}
        />
      )}

      {activePage === 'stats' && (
        <StatsPage
          clothes={clothes}
          isDarkMode={isDarkMode}
        />
      )}

      {activePage ===
        'donation' && (
        <DonationPage
          clothes={clothes}
          setClothes={setClothes}
          isDarkMode={isDarkMode}
        />
      )}

      {activePage ===
        'export' && (
        <ExportWardrobePage
          clothes={clothes}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  )
}

export default App