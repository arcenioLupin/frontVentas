import b64toBlob from 'b64-to-blob';

export default function saveAs(b64Data, contentType, fileName) {
    //IE Compatible
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(b64toBlob(b64Data.replace(/\s/g, ''), contentType), fileName);
        return;
    }

    //Other Browsers
    const a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(b64toBlob(b64Data, contentType));
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}