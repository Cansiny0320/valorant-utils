import { ipcRenderer } from 'electron'

export function toggleDevTools() {
  window.addEventListener(
    'keydown',
    e => {
      const { altKey, ctrlKey, keyCode } = e
      //  alt + ctrl + (Command | Windows) + l
      if (altKey && ctrlKey && keyCode === 76) {
        ipcRenderer.invoke('toggleDevTools')
        e.preventDefault()
      }
    },
    false,
  )
}
