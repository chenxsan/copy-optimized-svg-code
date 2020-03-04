import sketch from 'sketch/dom';
import UI from 'sketch/ui';
import SVGO from './svgo';
const svgo = new SVGO.default({
  plugins: [
    {
      removeXMLNS: true
    }
  ]
});
export default function() {
  const document = sketch.getSelectedDocument();
  const selectedLayers = document.selectedLayers;
  const selectedCount = selectedLayers.length;

  if (selectedCount === 0) {
    return UI.alert('Notice', 'No layers selected.');
  }
  if (selectedCount > 1) {
    return UI.alert('Notice', 'More than one layers selected.');
  }

  const buffer = sketch.export(selectedLayers.layers[0], {
    formats: 'svg',
    output: false
  });
  svgo.optimize(buffer.toString()).then(result => {
    const pasteBoard = NSPasteboard.generalPasteboard();
    pasteBoard.declareTypes_owner([NSPasteboardTypeString], null);
    pasteBoard.setString_forType( result.data, NSPasteboardTypeString )
    UI.message('🎉SVG Code Copied!');
  });
}
