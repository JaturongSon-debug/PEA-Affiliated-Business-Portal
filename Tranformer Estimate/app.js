document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Light/Dark Theme Toggle ---
    const themeBtn = document.getElementById('themeToggle');
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    });

    // --- 2. Initialize Signature Pad ---
    const canvas = document.getElementById('modernSignaturePad');
    const signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        penColor: 'rgb(0, 0, 0)'
    });

    const clearButton = document.getElementById('ui_clearSignature');
    clearButton.addEventListener('click', () => {
        signaturePad.clear();
    });

    // --- 3. Number to Thai Text (for Total Text) ---
    function ArabicNumberToText(Number) {
        var Number = Number.toString().replace(/,/g, '');
        if(isNaN(Number)) return "";
        var TxtNumArr = new Array ("ศูนย์", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า", "สิบ");
        var TxtDigitArr = new Array ("", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน");
        var BahtText = "";
        if (Number == "0") return "(ศูนย์บาทถ้วน)";
        
        var BahtArr = Number.split(".");
        var Baht = BahtArr[0];
        var Satang = BahtArr.length > 1 ? BahtArr[1] : "00";
        if(Satang.length == 1) Satang += "0";

        function processPart(numStr) {
            var out = "";
            for (var i = 0; i < numStr.length; i++) {
                var n = parseInt(numStr.charAt(i));
                var digit = numStr.length - i - 1;
                if (n !== 0) {
                    if (n === 1 && digit === 0 && numStr.length > 1) { out += "เอ็ด"; }
                    else if (n === 2 && digit === 1) { out += "ยี่"; }
                    else if (n === 1 && digit === 1) { out += ""; }
                    else { out += TxtNumArr[n]; }
                    out += TxtDigitArr[digit];
                }
            }
            return out;
        }

        BahtText += processPart(Baht) + "บาท";
        if (Satang === "00") {
            BahtText += "ถ้วน";
        } else {
            BahtText += processPart(Satang) + "สตางค์";
        }
        return "(" + BahtText + ")";
    }

    // --- 4. Handle Package Selection & Calculations ---
    const packageSelect = document.getElementById('ui_package_select');
    const formSection = document.getElementById('customerFormSection');
    const signatureSection = document.getElementById('signatureSection');
    
    // UI Elements for Summary
    const sumPkgName = document.getElementById('sum_pkg_name');
    const sumPkgDesc = document.getElementById('sum_pkg_desc');
    const sumPkgPrice = document.getElementById('sum_pkg_price');
    const calcSubtotal = document.getElementById('calc_subtotal');
    const calcVat = document.getElementById('calc_vat');
    const calcTotal = document.getElementById('calc_total');
    const calcText = document.getElementById('calc_text');

    packageSelect.addEventListener('change', (e) => {
        const option = e.target.options[e.target.selectedIndex];
        const val = option.value;
        const price = parseInt(option.dataset.price);
        
        // Calculate VAT and Total
        const vat = price * 0.07;
        const total = price + vat;

        // Update UI Text
        sumPkgName.textContent = `Package ${val}`;
        // Extract description from option text
        const descText = option.textContent.split(': ')[1].split(' (')[0];
        sumPkgDesc.textContent = descText;
        
        sumPkgPrice.textContent = price.toLocaleString() + ' บาท';
        calcSubtotal.textContent = price.toLocaleString() + ' บาท';
        calcVat.textContent = vat.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' บาท';
        calcTotal.textContent = total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        calcText.textContent = ArabicNumberToText(total);

        // Update PDF Template Hidden Elements (Prices)
        document.getElementById('pdf_subtotal').textContent = price.toLocaleString();
        document.getElementById('pdf_vat').textContent = vat.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        document.getElementById('pdf_total').textContent = total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});

        // Enable lower sections
        formSection.style.opacity = '1';
        formSection.style.pointerEvents = 'auto';
        signatureSection.style.opacity = '1';
        signatureSection.style.pointerEvents = 'auto';

        // Clear all checkboxes in the hidden PDF document
        document.querySelectorAll('.cb').forEach(cb => cb.classList.remove('checked'));

        // Check the selected one in the hidden document
        const docCheckbox = document.getElementById(`cb-${val}`);
        if (docCheckbox) {
            docCheckbox.classList.add('checked');
        }
    });

    // --- 5. Helper to format date inputs to Thai string format for the PDF ---
    function parseDateToThai(dateString) {
        if (!dateString) return { day: '', month: '', year: '' };
        const d = new Date(dateString);
        if (isNaN(d)) return { day: '', month: '', year: '' };
        
        const thMonths = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
        return {
            day: d.getDate().toString(),
            month: thMonths[d.getMonth()],
            year: (d.getFullYear() + 543).toString()
        };
    }

    // --- 6. Data Binding mapping (UI ID -> Hidden Template ID) ---
    const dataBindings = {
        'ui_customerName': 'customerName',
        'ui_companyName': 'companyName',
        'ui_addressNo': 'addressNo',
        'ui_street': 'street',
        'ui_subDistrict': 'subDistrict',
        'ui_district': 'district',
        'ui_province': 'province',
        'ui_phone': 'phone',
        
        // Transformers
        'ui_tr1_kva': 'tr1_kva', 'ui_tr1_pea': 'tr1_pea',
        'ui_tr2_kva': 'tr2_kva', 'ui_tr2_pea': 'tr2_pea',
        'ui_tr3_kva': 'tr3_kva', 'ui_tr3_pea': 'tr3_pea',
        'ui_tr4_kva': 'tr4_kva', 'ui_tr4_pea': 'tr4_pea',

        // Signature details
        'ui_signNamePrinted': 'signNamePrinted',
        'ui_signPosition': 'signPosition',
        
        // Appointment times
        'ui_timeStart': 'timeStart',
        'ui_timeEnd': 'timeEnd',
        'ui_contactPerson': 'contactPerson'
    };

    // --- 7. Handle PDF Generation ---
    const btnReport = document.getElementById('ui_btnReport');
    btnReport.addEventListener('click', () => {
        
        // Transfer standard inputs
        for (const [uiId, docId] of Object.entries(dataBindings)) {
            const uiEl = document.getElementById(uiId);
            const docEl = document.getElementById(docId);
            if (uiEl && docEl) {
                // Since we changed inputs to spans, use textContent
                docEl.textContent = uiEl.value; 
            }
        }

        // Special case: Name on signature line
        const signNamePrinted = document.getElementById('ui_signNamePrinted').value;
        const signNameEl = document.getElementById('signName');
        if (signNameEl) {
            signNameEl.textContent = signNamePrinted;
        }

        // Transfer Dates
        const dateStart = parseDateToThai(document.getElementById('ui_dateStart').value);
        document.getElementById('periodDayStart').textContent = dateStart.day;
        document.getElementById('periodMonthStart').textContent = dateStart.month;
        document.getElementById('periodYearStart').textContent = dateStart.year;

        const dateEnd = parseDateToThai(document.getElementById('ui_dateEnd').value);
        document.getElementById('periodDayEnd').textContent = dateEnd.day;
        document.getElementById('periodMonthEnd').textContent = dateEnd.month;
        document.getElementById('periodYearEnd').textContent = dateEnd.year;

        // Prepare Signature Image
        const signatureImage = document.getElementById('signatureImage');
        if (!signaturePad.isEmpty()) {
            signatureImage.src = signaturePad.toDataURL();
            signatureImage.style.display = 'inline-block';
        } else {
            signatureImage.style.display = 'none';
        }

        const originalText = btnReport.innerHTML;
        btnReport.textContent = "กำลังเปิดหน้าพิมพ์เอกสาร...";
        btnReport.disabled = true;

        // Set timeout to ensure signature image is fully loaded and layout is updated
        setTimeout(() => {
            window.print();
            btnReport.innerHTML = originalText;
            btnReport.disabled = false;
        }, 500);
    });

    // --- 8. Auto-fill Header Dates (Current Date for "วันที่เขียน") ---
    const today = new Date();
    const thMonths = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    
    document.getElementById('docDay').textContent = today.getDate();
    document.getElementById('docMonth').textContent = thMonths[today.getMonth()];
    document.getElementById('docYear').textContent = today.getFullYear() + 543;
});
