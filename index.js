
var excel_data;
Swal.fire({
    title: '파일을 선택해주세요',
    input: 'file',
    showCancelButton: true,
    confirmButtonText: '네',
    cancelButtonText: '아니요',
    showLoaderOnConfirm: true,

    preConfirm: function () {
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    var reader = new FileReader();
                    var file = document.querySelector('.swal2-file').files[0];
                    var wb;
                    reader.onload = function () {
                        var fileData = reader.result;
                        wb = XLSX.read(fileData, {type: 'binary'});
                        console.log(wb);
                        excel_data = sheetToJson(wb);
                        resolve();
                    }
                    reader.readAsBinaryString(file);
                }, 0
            );
        });
    }
}).then(()=>{
    function onScanSuccess(decodedText, decodedResult) {
        console.log(`Code scanned = ${decodedText}`, decodedResult);
        alert(decodedResult);
    }
    var html5QrcodeScanner = new Html5QrcodeScanner(
        "barcode-reader", { fps: 10, qrbox: 250 });
    html5QrcodeScanner.render(onScanSuccess);
})

function sheetToJson(wb) {
    let result = new Array();
    wb.SheetNames.forEach(sheetName => {
        let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
        result.push(rowObj);
    })
    return result;
}