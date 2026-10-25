document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Light/Dark Theme Toggle with Global Sync ---
    const themeBtn = document.getElementById('themeToggle');
    const moonIcon = document.getElementById('moonIcon');
    const sunIcon = document.getElementById('sunIcon');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('pea_global_theme', theme);
        if (theme === 'dark') {
            moonIcon.classList.remove('icon-visible');
            moonIcon.classList.add('icon-hidden');
            sunIcon.classList.remove('icon-hidden');
            sunIcon.classList.add('icon-visible');
        } else {
            sunIcon.classList.remove('icon-visible');
            sunIcon.classList.add('icon-hidden');
            moonIcon.classList.remove('icon-hidden');
            moonIcon.classList.add('icon-visible');
        }
    }

    const savedTheme = localStorage.getItem('pea_global_theme') || 'dark';
    applyTheme(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    window.addEventListener('storage', (e) => {
        if (e.key === 'pea_global_theme' && e.newValue) {
            applyTheme(e.newValue);
        }
    });

    // --- 2. Number to Thai Text (for Total Text) ---
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

    // --- 3. Handle Package Selection & Calculations ---
    const packageSelect = document.getElementById('ui_package_select');
    const formSection = document.getElementById('customerFormSection');
    
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
        const descText = option.textContent.split(': ')[1]?.split(' (')[0] || '';
        sumPkgDesc.textContent = descText;
        
        sumPkgPrice.textContent = price.toLocaleString() + ' บาท';
        calcSubtotal.textContent = price.toLocaleString() + ' บาท';
        calcVat.textContent = vat.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' บาท';
        calcTotal.textContent = total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        calcText.textContent = ArabicNumberToText(total);

        // Enable customer form section
        if (formSection) {
            formSection.style.opacity = '1';
            formSection.style.pointerEvents = 'auto';
        }
    });

    // --- 9. Package Cards & Tabs Switcher ---
    const tabPkgA = document.getElementById('tabPkgA');
    const tabPkgB = document.getElementById('tabPkgB');
    const pkgGridA = document.getElementById('pkgGridA');
    const pkgGridB = document.getElementById('pkgGridB');
    const pkgCards = document.querySelectorAll('.pkg-card');

    if (tabPkgA && tabPkgB) {
        tabPkgA.addEventListener('click', () => {
            tabPkgA.classList.add('active');
            tabPkgB.classList.remove('active');
            pkgGridA.style.display = 'grid';
            pkgGridB.style.display = 'none';
        });
        tabPkgB.addEventListener('click', () => {
            tabPkgB.classList.add('active');
            tabPkgA.classList.remove('active');
            pkgGridB.style.display = 'grid';
            pkgGridA.style.display = 'none';
        });
    }

    pkgCards.forEach(card => {
        card.addEventListener('click', () => {
            pkgCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const val = card.dataset.val;
            if (packageSelect) {
                packageSelect.value = val;
                packageSelect.dispatchEvent(new Event('change'));
            }
        });
    });

    // Also update active card when dropdown changes
    packageSelect.addEventListener('change', () => {
        const val = packageSelect.value;
        pkgCards.forEach(c => {
            c.classList.toggle('active', c.dataset.val === val);
        });
        if (val.startsWith('A')) {
            if (tabPkgA && !tabPkgA.classList.contains('active')) tabPkgA.click();
        } else if (val.startsWith('B')) {
            if (tabPkgB && !tabPkgB.classList.contains('active')) tabPkgB.click();
        }
    });

    // --- 10. Transformer Quotation Modal Logic ---
    const openTfQuoteBtn = document.getElementById('openTransformerQuoteBtn');
    const tfModal = document.getElementById('transformerQuoteModal');
    const closeTfModal = document.getElementById('closeTfModal');
    const closeTfModal2 = document.getElementById('closeTfModal2');
    const printTfBtn = document.getElementById('printTfBtn');

    if (openTfQuoteBtn && tfModal) {
        openTfQuoteBtn.addEventListener('click', () => {
            if (!packageSelect.value) {
                alert('กรุณาเลือกแพ็กเกจการบำรุงรักษาก่อนออกใบประมาณการ');
                return;
            }
            const custName = document.getElementById('ui_customerName').value.trim() || 'ผู้ขอใช้บริการทั่วไป';
            const compName = document.getElementById('ui_companyName').value.trim() || '-';
            const addrNo = document.getElementById('ui_addressNo').value.trim();
            const street = document.getElementById('ui_street').value.trim();
            const subDist = document.getElementById('ui_subDistrict').value.trim();
            const dist = document.getElementById('ui_district').value.trim();
            const prov = document.getElementById('ui_province').value.trim();
            const fullAddr = [addrNo, street, subDist, dist, prov].filter(Boolean).join(' ') || '-';
            const phone = document.getElementById('ui_phone').value.trim() || '-';

            const opt = packageSelect.options[packageSelect.selectedIndex];
            const price = parseInt(opt.dataset.price) || 0;
            const vat = price * 0.07;
            const total = price + vat;

            const dateStart = document.getElementById('ui_dateStart').value;
            const dateEnd = document.getElementById('ui_dateEnd').value;
            const timeStart = document.getElementById('ui_timeStart').value;
            const timeEnd = document.getElementById('ui_timeEnd').value;
            let periodText = '-';
            if (dateStart || dateEnd) {
                periodText = `${dateStart || ''} ถึง ${dateEnd || ''} ${timeStart ? '(' + timeStart + ' - ' + timeEnd + ' น.)' : ''}`;
            }
            const contactPerson = document.getElementById('ui_contactPerson').value.trim() || '-';

            // Gather transformer list
            const trList = [];
            for (let i = 1; i <= 4; i++) {
                const kva = document.getElementById(`ui_tr${i}_kva`)?.value.trim();
                const pea = document.getElementById(`ui_tr${i}_pea`)?.value.trim();
                if (kva || pea) {
                    trList.push(`เครื่องที่ ${i}: ขนาด ${kva || '-'} kVA, หมายเลข PEA: ${pea || '-'}`);
                }
            }

            document.getElementById('q-tf-doc-id').textContent = Math.floor(1000 + Math.random() * 9000);
            document.getElementById('q-tf-cust').textContent = custName;
            document.getElementById('q-tf-comp').textContent = compName;
            document.getElementById('q-tf-addr').textContent = fullAddr;
            document.getElementById('q-tf-phone').textContent = phone;
            document.getElementById('q-tf-date').textContent = new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
            document.getElementById('q-tf-period').textContent = periodText;
            document.getElementById('q-tf-contact').textContent = contactPerson;

            document.getElementById('q-tf-list').textContent = trList.length > 0 ? trList.join(' | ') : 'ไม่ได้ระบุหมายเลขหม้อแปลง';

            document.getElementById('q-tf-pkg-title').textContent = `บริการบำรุงรักษาหม้อแปลงไฟฟ้า (${opt.value.startsWith('A') ? 'Package A ขั้นพื้นฐาน' : 'Package B ครบวงจร'})`;
            document.getElementById('q-tf-pkg-desc').textContent = opt.textContent;
            document.getElementById('q-tf-pkg-code').textContent = `Package ${opt.value}`;
            document.getElementById('q-tf-pkg-price').textContent = price.toLocaleString('th-TH') + ' บาท';

            document.getElementById('q-tf-subtotal').textContent = price.toLocaleString('th-TH') + ' บาท';
            document.getElementById('q-tf-vat').textContent = vat.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' บาท';
            document.getElementById('q-tf-total').textContent = total.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' บาท';
            document.getElementById('q-tf-baht-text').textContent = ArabicNumberToText(total);

            tfModal.style.display = 'flex';
        });

        const hideTfModal = () => { tfModal.style.display = 'none'; };
        if (closeTfModal) closeTfModal.addEventListener('click', hideTfModal);
        if (closeTfModal2) closeTfModal2.addEventListener('click', hideTfModal);
        tfModal.addEventListener('click', (e) => {
            if (e.target === tfModal) hideTfModal();
        });

        if (printTfBtn) {
            printTfBtn.addEventListener('click', () => {
                try {
                    const totalEl = document.getElementById('calc_total');
                    let amt = 0;
                    if (totalEl) {
                        amt = parseFloat(totalEl.textContent.replace(/[^0-9.]/g, '')) || 0;
                    }
                    if (window.PEATracker) {
                        const pkgName = document.getElementById('sum_pkg_name') ? document.getElementById('sum_pkg_name').textContent : '';
                        window.PEATracker.recordEstimate({
                            systemKey: 'transformer',
                            systemName: 'บำรุงรักษาหม้อแปลง',
                            amount: amt,
                            details: pkgName
                        });
                    }
                } catch (err) {
                    console.warn(err);
                }
                window.print();
            });
        }
    }
});
