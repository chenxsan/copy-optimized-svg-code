import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import { optimize, extendDefaultPlugins } from 'svgo/dist/svgo.browser.js'

export default function () {
  const document = sketch.getSelectedDocument()
  const selectedLayers = document.selectedLayers
  const selectedCount = selectedLayers.length

  if (selectedCount === 0) {
    return UI.alert('Notice', 'No layers selected.')
  }
  if (selectedCount > 1) {
    return UI.alert('Notice', 'More than one layers selected.')
  }

  const buffer = sketch.export(selectedLayers.layers[0], {
    formats: 'svg',
    output: false,
  })

  try {
    const result = optimize(buffer.toString(), {
      plugins: extendDefaultPlugins([
        {
          name: 'removeXMLNS',
          active: true,
        },
      ]),
    })
    const pasteBoard = NSPasteboard.generalPasteboard()
    pasteBoard.declareTypes_owner([NSPasteboardTypeString], null)
    pasteBoard.setString_forType(result.data, NSPasteboardTypeString)
    UI.message('🎉SVG Code Copied!')
  } catch (e) {
    UI.alert('Notice', e.message)
  }
}
